/**
 * Twilio Function: /vapi-call-report
 *
 * Receives Vapi's end-of-call report webhook and texts a summary of the
 * call to the business owner: who called, why, and how to reach them.
 *
 * Set this function's URL as the Server URL on the Vapi assistant, and
 * enable the "end-of-call-report" server message.
 *
 * Required environment variables:
 *   ALERT_TO_NUMBER        - cell number to text, E.164 (e.g. +14175551234)
 *   MESSAGING_SERVICE_SID  - Twilio Messaging Service SID (MG...)
 *
 * Visibility must be Public so Vapi can reach it.
 */

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();

  // Vapi nests the payload under `message`.
  const msg = event.message || event || {};

  // Vapi sends several server message types (status-update, transcript,
  // speech-update). Only the end-of-call report should trigger an alert.
  if (msg.type && msg.type !== 'end-of-call-report') {
    return callback(null, '');
  }

  const call = msg.call || {};
  const analysis = msg.analysis || {};
  const data = analysis.structuredData || {};
  const customer = call.customer || msg.customer || {};

  const name = data.caller_name || 'Not given';
  const business = data.business_name || '';
  const phone = data.callback_number || customer.number || 'Unknown';
  const email = data.email || 'Not given';
  const callbackTime = data.preferred_callback_time || '';
  const reason =
    data.reason_for_call || analysis.summary || 'No summary available';

  const lines = [
    'New call - SEK Automation Group',
    `Name: ${name}`,
    business ? `Business: ${business}` : null,
    `Phone: ${phone}`,
    `Email: ${email}`,
    callbackTime ? `Callback: ${callbackTime}` : null,
    '',
    `Why: ${reason}`
  ].filter(Boolean);

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
