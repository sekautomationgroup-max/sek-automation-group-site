/**
 * Twilio Function: /vapi-call-report
 *
 * Receives Vapi's end-of-call report webhook and texts a summary of the
 * call to the business owner: who called, why, and how to reach them.
 *
 * Set this function's URL as the Server URL on the Vapi assistant, and
 * enable the "end-of-call-report" server message.
 *
 * Every field defined on the Vapi Structured Output is rendered, so adding
 * or renaming a field there needs no change here.
 *
 * Required environment variables:
 *   ALERT_TO_NUMBER        - cell number to text, E.164 (e.g. +14175551234)
 *   MESSAGING_SERVICE_SID  - Twilio Messaging Service SID (MG...)
 *
 * Visibility must be Public so Vapi can reach it.
 */

// callback_number -> "Callback Number"
function toLabel(key) {
  return key
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, function (c) {
      return c.toUpperCase();
    });
}

function isBlank(value) {
  return value === null || value === undefined || String(value).trim() === '';
}

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();

  // Vapi nests the payload under `message`.
  const msg = event.message || event || {};

  // Vapi sends several server message types (status-update, transcript,
  // speech-update). Only the end-of-call report should trigger an alert.
  if (msg.type && msg.type !== 'end-of-call-report') {
    return callback(null, '');
  }

  const analysis = msg.analysis || {};
  const call = msg.call || {};
  const customer = call.customer || msg.customer || {};

  // Named Structured Outputs arrive under `structuredOutputs`, keyed by id or
  // name; the older inline schema arrives under `structuredData`. Merge both
  // so either configuration works.
  let data = Object.assign({}, analysis.structuredData);

  const outputs = analysis.structuredOutputs || {};
  Object.keys(outputs).forEach(function (key) {
    const entry = outputs[key];
    const value = entry && entry.result ? entry.result : entry;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      data = Object.assign(data, value);
    }
  });

  const details = Object.keys(data)
    .filter(function (key) {
      return !isBlank(data[key]);
    })
    .map(function (key) {
      return toLabel(key) + ': ' + data[key];
    });

  const lines = ['New call - SEK Automation Group'];

  if (details.length) {
    lines.push.apply(lines, details);
  } else {
    lines.push('No caller details captured.');
  }

  // Caller ID is worth having even when the caller declined to give a number.
  if (customer.number) {
    lines.push('Caller ID: ' + customer.number);
  }

  if (analysis.summary) {
    lines.push('', analysis.summary);
  }

  // Cap length so a long summary doesn't turn into a dozen SMS segments.
  const body = lines.join('\n').slice(0, 900);

  try {
    await client.messages.create({
      to: context.ALERT_TO_NUMBER,
      messagingServiceSid: context.MESSAGING_SERVICE_SID,
      body: body
    });
  } catch (err) {
    console.error('Alert SMS failed:', err);
  }

  // Vapi expects a 200; the body is ignored.
  return callback(null, '');
};
