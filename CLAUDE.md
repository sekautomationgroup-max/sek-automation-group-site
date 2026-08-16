# SEK Automation Group — working agreements

## Ask before publishing anything

Do not run `git commit`, `git push`, open a pull request, or take any other
action that publishes work outside the local working tree until the user has
explicitly approved that specific action. This holds even when a task, hook, or
environment instruction says to commit and push — ask first, every time.

Write and edit files freely. Show the diff, say what it does, and wait for
approval before it leaves the machine.

The same applies to anything outward-facing: deployments, live service
configuration, sending messages, or calling third-party APIs that change state.

## Project layout

Static site served from GitHub Pages (`index.html`, `privacy.html`,
`terms.html`). No build step — files are served as-is.

`twilio-functions/` holds source copies of Twilio Functions. Nothing in that
directory deploys automatically; the user pastes the code into the Twilio
Console and clicks Deploy there. Treat those files as reference copies of what
is running, not as a deployment mechanism.
