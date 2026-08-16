# Twilio Functions

Source copies of the Twilio Functions used by SEK Automation Group. These are
deployed by hand through the Twilio Console (Functions and Assets → Services →
`call-alerts`); this directory exists so the code is version controlled and
reviewable.

## Functions

| File | Path | Purpose |
| --- | --- | --- |
| `vapi-call-report.js` | `/vapi-call-report` | Receives Vapi's end-of-call report and texts the caller's name, number, and reason for calling. |

## Environment variables

Set these in the Twilio Console under Settings & More → Environment Variables.
They are not stored in this repo.

| Key | Value |
| --- | --- |
| `ALERT_TO_NUMBER` | Cell number to receive alerts, E.164 format |
| `MESSAGING_SERVICE_SID` | Messaging Service SID (`MG...`) tied to the approved A2P campaign |

## Deploying

Paste the file contents into the matching function in the Twilio Console, set
visibility to **Public**, then click **Deploy All**.

## Vapi structured output

Extraction is configured in Vapi under Structured Outputs (`call_details`),
attached to the assistant on its Analysis tab. Fields there are currently
`name`, `email`, `phone`, `interest`, and `timeline`.

The function does not hardcode those names. It renders every non-empty field
the structured output returns, converting keys to readable labels
(`callback_number` becomes "Callback Number"), so fields can be added or
renamed in Vapi without editing this code. Fields the caller never mentioned
come back empty and are omitted from the text.

Both payload shapes are handled: named Structured Outputs arrive under
`analysis.structuredOutputs`, the older inline schema under
`analysis.structuredData`. The caller ID and the call summary are appended when
available, so an alert still carries useful information even if extraction
returns nothing.
