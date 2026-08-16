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

## Vapi structured data schema

The alert is most useful when the assistant extracts structured fields from the
conversation. In the Vapi assistant's Analysis settings, set the structured data
schema to:

```json
{
  "type": "object",
  "properties": {
    "caller_name": {
      "type": "string",
      "description": "The caller's full name"
    },
    "business_name": {
      "type": "string",
      "description": "The name of the caller's business, if mentioned"
    },
    "callback_number": {
      "type": "string",
      "description": "Best callback number in E.164 format"
    },
    "email": {
      "type": "string",
      "description": "The caller's email address, if given"
    },
    "preferred_callback_time": {
      "type": "string",
      "description": "Day and time the caller asked to be reached"
    },
    "reason_for_call": {
      "type": "string",
      "description": "One or two sentences on why they called and what they need"
    }
  }
}
```

Fields the caller never mentioned come back empty; the function falls back to
the call summary and the caller ID in that case.
