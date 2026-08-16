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

  // A tool with no server URL of its own falls back to the assistant's, which
  // means tool calls land here. Answering with an empty 200 leaves the
  // assistant waiting on a result that never arrives, so the caller hears dead
  // air until the silence timeout kills the call. Always hand back a result.
  if (msg.type === 'tool-calls') {
    const calls = msg.toolCallList || msg.toolCalls || [];

    return callback(null, {
      results: calls.map(function (toolCall) {
        return {
          toolCallId: toolCall.id,
          result:
            'This tool is not connected yet. Tell the caller you have noted ' +
            'their preferred time and that someone will confirm it shortly, ' +
            'then carry on with the conversation.'
        };
      })
    });
  }

  // Vapi sends several other server message types (status-update, transcript,
  // speech-update). Only the end-of-call report should trigger an alert.
  if (msg.type && msg.type !== 'end-of-call-report') {
    return callback(null, '');
  }

  const analysis = msg.analysis || {};
  const call = msg.call || {};
  const customer = call.customer || msg.customer || {};

  // Temporary: Vapi has moved structured output between payload locations
  // across versions. Log the shape so the mapping below can be confirmed.
  console.log('MSG KEYS: ' + Object.keys(msg).join(','));
  console.log('ANALYSIS: ' + JSON.stringify(analysis).slice(0, 1200));

  // Vapi has placed extracted fields in several spots across versions: the
  // legacy inline schema under `structuredData`, named Structured Outputs
  // under `structuredOutputs` (keyed by id, each wrapping a `result`), and
  // sometimes on the artifact rather than the analysis. Merge every shape
  // that turns up so the alert works regardless of which one is in play.
  const artifact = msg.artifact || {};
  const sources = [
    analysis.structuredData,
    analysis.structuredOutputs,
    artifact.structuredData,
    artifact.structuredOutputs,
    (call.analysis || {}).structuredData,
    (call.analysis || {}).structuredOutputs
  ];

  let data = {};

  sources.forEach(function (source) {
    if (!source || typeof source !== 'object') {
      return;
    }

    Object.keys(source).forEach(function (key) {
      const value = source[key];

      // A wrapper entry like { result: {...} } holds the fields one level in;
      // a plain scalar is already the field itself.
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const inner = value.result !== undefined ? value.result : value;

        if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
          data = Object.assign(data, inner);
        } else if (!isBlank(inner)) {
          data[key] = inner;
        }
      } else if (!isBlank(value)) {
        data[key] = value;
      }
    });
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
