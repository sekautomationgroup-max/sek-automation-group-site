# SEK Waterline — voice agent knowledge

Append this to `SEK-Vapi-KnowledgeBase.md` (the file attached to the Main Line
Receptionist assistant in Vapi). Written for speech: short sentences, numbers
spelled the way they should be said aloud.

Sources: `SEKVoiceAgentHandoff.md` (sections 2.G and 3) and
`waterline-website-handoff.md`. If the live page at
sekautomationgroup.org/waterline.html disagrees, the site wins and this is stale.

Pricing here is the confirmed set: **$50 a month, $475 one-time setup.** The
`$45 / $415` figures in the older voice handoff are wrong — ignore them wherever
they still appear.

---

## What SEK Waterline is

The complete online home for a small water district: a modern public website,
online bill pay, the office's billing and customer system, a phone-friendly
meter-reading app, and an AI assistant that answers customers on the website and
on the phone. One monthly price.

It is SEK's second in-house product, alongside SiteWorks.

The distinction that matters most on a call: **this is a billing system, not a
payment link bolted onto a website.** The competition sells a website and hands
billing off to somebody else.

### Who it is for

Rural water districts, water supply corporations, special utility districts,
municipal water departments, and small co-ops. Typically **100 to 5,000
connections**, with **one to five office staff** and one or two field techs.

Also a fit for boards that want ADA compliance and public transparency without
hiring a web developer, and offices tired of paper bills, phone tag about
balances, and typing readings off a clipboard.

---

## The three surfaces

Explain it as three parts. Most callers only care about one or two.

### 1. The public website — what residents see

Modern, mobile-first, editable by office staff with no coding.

- Home page with hours, phone numbers, emergency line, and a live "service is
  normal / N active notices" status
- **Alerts** — banner on every page, residents sign up for email and text alerts,
  one-click unsubscribe, and a "send to subscribers" button in the office
- **Forms and documents library** — rate schedules, applications, agendas,
  minutes, audits, reports, by category with dates; permanent short link for the
  annual water quality report
- **FAQ and conservation tips**, editable, and used by the AI assistant
- News, board meeting schedule, staff and board directory
- Local weather strip
- Bill Pay page describing every way to pay
- **Accessibility** — skip links, keyboard focus states, reduced-motion support,
  WCAG-minded contrast, accessibility statement page
- Custom domain per district

### 2. The customer portal — Pay Online

- **Self-service registration** with account number, last name, and service ZIP
  from the paper bill. No office involvement.
- Balance, due date, past-due status, water-use chart, recent activity, and every
  past bill with meter readings and line items
- **Pay by card or bank draft** through Stripe — the district never touches card
  numbers
- Partial payments, a convenience fee the district sets, emailed receipts,
  printable PDF bills
- **Autopay** on the due date or five days early, with the leak safeguard
- Paperless billing and text reminders
- **Multiple service addresses under one login** — landlords, farms with several
  meters

### 3. The office system — district side

A full billing and customer system.

- **Dashboard** — collected today, outstanding, past due, shutoff-eligible, cycle
  progress, and a "needs attention" list
- **Customers** — search and filters, full ledger per customer, window payments
  (cash, check, money order), adjustments with a required note, deposits,
  multiple service addresses, move-out with final bill
- **Import wizard** — bring the existing customer list in from any spreadsheet
  export; columns auto-match, existing accounts update rather than duplicate
- **Meter readings** — manual entry with sanity flags (unusually high, lower than
  last month), CSV upload from a handheld, one-click estimates for missed meters
- **Billing run** — pre-flight checklist, sample bill, one-click generation of
  every bill, emails queued, printed batch for paper customers
- **Rates and fees** — base charge, usage tiers, extra line items like sewer or
  debt service, late fee, shutoff timing, convenience fees; **versioned by
  effective date so old bills never change**
- **Reports** — daily payment register, A/R aging, usage and consumption,
  QuickBooks export, all downloadable as CSV
- **Notices** — past-due reminders and shutoff warnings by email, text, and
  printed letter
- **Website content** — alerts, news, meetings, FAQ, documents, directory, all
  edited from the office
- **Staff roles** — administrator, clerk, meter reader, and read-only for a board
  treasurer or auditor, with an audit log of who changed what

---

## Meter reading in the field

A dedicated role for whoever reads the meters, on their own phone, **no app store
install**.

- Signs in on the same staff login, lands on a phone-first page; the rest of the
  office system is hidden
- Cycle progress ("61 of 73 read") and a next-up list by route
- Search by name, address, account number, or meter number
- Entry screen shows customer, address, meter, previous reading, and typical use;
  gallons update as they type, with an instant warning if the number is lower than
  last month or more than double the usual
- **"Is this reading correct?"** confirmation restates previous, new, and gallons
  used before anything saves
- After saving, one tap opens the next unread meter on the route
- Readings flow straight into the office readings page and the billing run, logged
  under the tech's name

---

## The AI assistant

- **Website chat** on every page. Answers from the district's own live data —
  rates, alerts, meetings, FAQs, documents, staff, hours, payment options.
  Signed-in customers can ask about their balance, bills, water use, and autopay.
  Anyone can request a callback, which is logged for the office.
- **Phone assistant.** Callers reach a natural-voice assistant that answers the
  same questions, looks up a balance by account number and last name, logs
  callback requests, and transfers to the office when a person is needed. Falls
  back to the office line automatically if unavailable.
- Name and on/off switch controlled by the district. Every conversation is stored
  for the office to review.

See the honesty guard below before describing the phone assistant as reachable.

---

## Pricing

**The agent may say:** "from fifty dollars a month, plus a one-time four hundred
seventy-five dollar setup."

Always pair it with: the exact rate depends on the number of connections, and the
full quote comes in a proposal.

Never invent or extrapolate any other number. No per-connection math out loud, no
annual totals for a tier the caller hasn't been quoted, no discounts.

An older version of the voice handoff said $45 and $415. Those numbers are wrong.
**$50 and $475** are correct.

### Structure (context for the agent — do not read tiers aloud)

Implementation fee is one-time, same on all tiers, and covers site build, customer
and balance import, rate setup, and staff training.

| Tier | Connections | Monthly | Annual |
|---|---|---|---|
| 1 | 0 – 750 | $50 | $550 |
| 2 | 751 – 1,500 | $60 | $660 |
| 3 | 1,501 – 3,000 | $70 | $770 |
| 4 | 3,001 + | $75 | $825 |

Two add-ons, $10/month each: **meter reading in the field**, and **the AI
assistant** (chat plus phone).

Annual plans are eleven times monthly — one month free. Custom work outside scope
is $125 an hour, quoted in advance. Stripe processing passes through (about 2.9%
plus 30 cents per card, 0.8% capped at $5 per bank draft) and is covered by the
district's convenience fee. **No contract.**

The agent may say "no contract" and "annual billing saves you a month." It should
not recite the tier table — ask the connection count and let Josh quote.

---

## Competitive framing

**Never name the competitor.** Not on any call, for any reason. The name does not
belong in the agent's vocabulary.

Approved lines:

> "Most districts pay more than this for a website alone."

> "For less than the going rate for just a website, you get the website, the bill
> pay, the billing system, and the meter-reading app."

If a caller names the competitor themselves, don't confirm, compare, or
disparage — pivot to what Waterline includes:

> "I can't speak to what anybody else charges. What I can tell you is what's
> included here — website, bill pay, the full billing system, and meter reading,
> all in one monthly price."

The honest substance behind the framing: the incumbent sells an ADA-compliant
website with alerts. Online bill pay is optional through a separate third-party
provider with its own agreement, fees, and a four-to-eight-week setup. There is no
customer self-service account, no billing system, no meter reading app, no office
reports. Customer list import is content migration at extra cost.

---

## Honesty guard — do not promise these as live today

Built but awaiting connection. Describe what the product does, not what is
switched on this minute. If asked directly, say Josh can walk them through exactly
where it stands.

- **Email and SMS delivery** of bills, receipts, reminders, and alert broadcasts —
  queued and logged today, provider connection pending
- **Automatic nightly late fees and autopay runs** — the functions exist, the
  scheduler is pending
- **Customer password reset by email** — the office resets access today
- **The phone assistant** needs a Twilio number; **the chat assistant** needs an
  API key on the deployment

Safe: "Waterline handles bill delivery and late fees as part of the billing
system — Josh can show you exactly how that runs for your district."

Unsafe: "Your customers will get an automatic text when their bill is ready."

---

## Never share

**Demo logins and passwords, for any product, with anyone, ever.** Sandbox
credentials exist for Waterline and they must never reach a caller. Demos are
scheduled through Josh, period.

The sandbox URL is not public either. Do not read it out.

---

## Proof points worth citing

- **Live in days** — the sandbox district was imported, seeded, and deployed the
  same day
- **Sixty bills in one click**, with a pre-flight checklist before anything sends
- **Registration takes about a minute** with the paper bill in hand
- **Autopay leak safeguard** — a customer-set limit above which a bill is never
  auto-charged
- Every office change is logged with who and when
- Hosted with automatic backups; no servers for the district to maintain
- Card and bank details are entered in Stripe-hosted fields — Waterline never
  stores them

---

## Call flow: water district caller

Water district, utility, water supply corporation, co-op, or municipal water
department:

1. Short pitch — the parts that match what they asked about.
2. Offer a demo with Josh.
3. **Capture the district name and the connection count.** The connection count
   sizes the proposal, so it matters more than anything else collected.
4. Standard capture: name, phone number read back to confirm, best time to call.
5. Promise a callback within one business day. **Never say an appointment is on
   the calendar** — there is no live calendar integration.

### Fifteen-second pitch

> "Waterline is the whole online side of a water district in one place — your
> public website, online bill pay, the billing system your office runs on, and a
> meter-reading app that works on any phone. It's built for districts about your
> size. How many connections do you have?"

Ending on the question keeps things moving and gets what's needed to quote.

---

## FAQ — voice-length answers

**"How much is it?"**
> "It starts at fifty dollars a month, plus a one-time four-hundred-seventy-five
> dollar setup. The exact rate depends on how many connections you have — Josh
> puts together a proposal sized to your district. Roughly how many connections
> have you got?"

**"We already have a website."**
> "A lot of districts do. The difference is this connects the website to your
> billing — customers pay online and it lands in the same system your office works
> in, instead of two separate things you reconcile by hand."

**"Our customers won't use online bill pay."**
> "That's the usual worry. What we found is registration is the barrier, not the
> paying — a customer signs themselves up straight from the paper bill in about a
> minute. And autopay has a leak safeguard, so a bill over their limit never gets
> charged automatically. That's what gets people to actually sign up."

**"How do we get our customer data in?"**
> "Import from whatever spreadsheet you're keeping now — that's included, and it's
> part of the setup fee. You're not re-entering anything."

**"Do we need to buy phones or tablets for meter reading?"**
> "No. Whoever reads the routes uses their own phone, and there's nothing to
> install. It warns them right on the screen if a reading looks off."

**"What happens when we change rates?"**
> "Rates are versioned, so old bills never change. What you billed last year stays
> exactly what you billed last year."

**"Is it secure? Where does the card data go?"**
> "Payments run through Stripe, so card numbers never touch our systems, and every
> staff action is logged. Josh can go as deep on security as you want."

**"Can our board treasurer see it without changing anything?"**
> "Yes — there's a read-only role for exactly that. Board treasurer or auditor can
> look at everything and change nothing."

**"How long does setup take?"**
> "Days, not months. Setup covers the site build, importing your customers and
> balances, setting up your rates, and training your staff."

**"Are we locked into a contract?"**
> "No contract. And if you pay annually you get a month free."

**"Can we see it?"**
> "Josh does a walkthrough sized to your district. Can I grab your name and
> number, and how many connections you've got?"

---

## Changes needed elsewhere in the knowledge base

**The catalog count.** The system prompt says SEK offers five things. With Custom
Website Building, SiteWorks, and Waterline, it is **seven**. Update the count and
the list.

**The "what do you do?" answer:**

> "We do automation, custom software, and websites for small businesses — plus two
> products of our own: SiteWorks for field service crews, and SEK Waterline for
> water districts. What kind of business do you run?"

**The intent routing table** needs a row: water district, utility, water supply
corporation, or co-op → Waterline pitch, offer demo, capture district name and
connection count.
