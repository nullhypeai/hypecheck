---
title: "Smoke Test Landing Page Conversion Rate: What Proves Demand"
description: Is 4% a good smoke test landing page conversion rate? Learn why traffic source decides the number, how many visitors you need, and how to set pass/fail first.
dek: A 4% signup rate means nothing until you know who visited, what you asked them to do, and what number you promised yourself before launch.
kicker: Demand testing
date: 2026-11-16
keywords:
  - smoke test landing page conversion rate
  - landing page validation
  - fake door test
  - waitlist conversion rate
draft: true
sources:
  - title: Conversion Benchmark Report
    url: https://unbounce.com/conversion-benchmark-report/
    publisher: Unbounce
  - title: The Unbounce Conversion Benchmark Report 2020
    url: https://unbounce.com/conversion-benchmark-report-2020/
    publisher: Unbounce
  - title: The Mom Test by Rob Fitzpatrick
    url: https://jimbouman.com/the-mom-test-rob-fitzpatrick/
    publisher: Jim Bouman
  - title: 7 Concept Testing Examples + How to Validate Ideas
    url: https://www.figma.com/resource-library/concept-testing-examples/
    publisher: Figma
  - title: Sample Size Calculator (Evan's Awesome A/B Tools)
    url: https://www.evanmiller.org/ab-testing/sample-size.html
    publisher: Evan Miller
---

You ran a landing page with a signup form and got 4 percent. Is that demand or noise? Nobody can answer that from the number alone, and anyone who quotes you a single benchmark is guessing.

By the end of this post you will be able to read your 4 percent in context, estimate whether you had enough visitors, and write a pass/fail rule for the next test before you launch it. If you want the wider process first, see [How to Validate a Startup Idea Before Building an MVP](/blog/how-to-validate-a-startup-idea-before-building-mvp).

## Where the published benchmarks come from

The numbers you see quoted mostly trace back to one vendor dataset. Unbounce, a landing page builder, publishes a [Conversion Benchmark Report](https://unbounce.com/conversion-benchmark-report/). The current edition says the median conversion rate across all industries is 6.6 percent, drawn from more than 41,000 landing pages and 57 million conversions. That is Unbounce's claim about its own customers' data.

The [2020 edition](https://unbounce.com/conversion-benchmark-report-2020/) reported a median of 3.2 percent for the pages it analyzed, and a mean of 9.7 percent. It also put the top quarter of pages at a median of 25 percent. Same publisher, same kind of data, and the headline moved from 3.2 to 6.6 in a few years. That tells you how much to trust any one figure.

Three reasons these numbers are a poor yardstick for a smoke test:

- **Selection.** The pages come from people who pay for a landing page tool and run campaigns. Your side-project page is not that population.
- **Mixed goals.** A page selling a product, collecting a lead and offering a download all sit in one pool. I could not confirm from the pages I read exactly how each goal was counted, so treat the pooling as something to check.
- **Median versus mean.** The 2020 gap between 3.2 and 9.7 shows a few very high pages pull the average up. Quote the median, never the mean.

Use these as a rough sanity check that your 4 percent is not absurd. Do not use them as a pass line.

## Traffic source decides the number

I did not find a good primary dataset that splits smoke test conversion by source, so what follows is a reasoning framework, not a published benchmark. The logic is simple: conversion rate equals how many visitors had the problem and cared, times how many of those you convinced. Source changes the first part a lot.

| Traffic source | Who they are | What a signup tells you | Typical bias |
|---|---|---|---|
| Friends, family, your followers | People who like you | Almost nothing about the market | Inflates the rate, often by a large multiple |
| Community post (Reddit, forum, Slack) | People already discussing the problem | Real interest, but self-selected | Inflates it; the post's framing does half the work |
| Cold paid ads (search or social) | Strangers with no loyalty to you | The closest you get to a market signal | Lowest rate, hardest to hit, most honest |
| Search ads on problem keywords | Strangers actively looking | Strong intent signal | Depends on keyword match |

A reasonable rule of thumb: the warmer the traffic, the higher the rate, and the less it proves. Your 4 percent from a friends-and-Twitter launch might be a weak result. The same 4 percent from cold ads on a problem keyword might be a strong one. Always record the source next to the rate, and never mix sources into one blended percentage.

Two habits keep this clean:

1. Tag every link with its source so you can split results afterward.
2. Judge the test on the coldest source you used. Warm traffic is a bonus, not the verdict.

## Signup, buy-click and deposit are different tests

What you ask visitors to do matters as much as who they are. Rob Fitzpatrick's [The Mom Test](https://jimbouman.com/the-mom-test-rob-fitzpatrick/) (here via a reader's summary) argues that compliments are worth nothing and that real signal comes from commitment: time, reputation risk or cash. Apply that to a landing page and you get a ladder:

1. **Email signup.** Costs the visitor ten seconds. Cheapest, noisiest.
2. **Fake door click** (a "Buy now" or "Start free trial" button that leads to a "not ready yet" page). Shows they wanted the specific offer at a specific price.
3. **Pricing page plus click.** Joel Gascoigne's early Buffer test, as [described by Figma](https://www.figma.com/resource-library/concept-testing-examples/), added a pricing table with a free plan, a $5 plan and a $20 plan after the signups came in.
4. **Deposit or preorder.** Real money. Smallest numbers, strongest proof.

Each step down the ladder loses most of the people above it. I have no published universal drop rate to give you, and I would distrust anyone who does. What you can do is measure your own funnel and set a threshold per step. As a planning guess, expect each step to cut the rate by something like half or more, then adjust once you see data.

The practical point: a 4 percent email rate and a 4 percent deposit rate are not the same result. The second is extraordinary. If you only collected emails, your 4 percent is the weakest form of evidence, so follow up with a second test that asks for more.

## How many visitors before the rate means anything

No heavy math needed. A conversion rate from a small sample wobbles a lot. A quick way to see how much: the usual rough margin on a rate is about two times the square root of (rate times one minus rate, divided by visitors).

Here is that arithmetic for a true rate of 4 percent (my calculation, rounded):

| Visitors | Signups at 4% | Plausible true range |
|---|---|---|
| 100 | 4 | roughly 0% to 8% |
| 250 | 10 | roughly 1.6% to 6.4% |
| 500 | 20 | roughly 2.4% to 5.6% |
| 1,000 | 40 | roughly 2.8% to 5.2% |

The "plausible range" is the band the real rate probably sits in if you reran the test. At 100 visitors, 4 signups could easily be a true rate of 1 percent or 7 percent. At 1,000, you can tell 3 from 5.

Two rules follow:

- Aim for at least 20 to 30 conversions, not just a visitor count. Below that, a few people either way swing the result.
- If you want to compare two pages or two audiences, you need far more traffic than for a single rate. Use [Evan Miller's sample size calculator](https://www.evanmiller.org/ab-testing/sample-size.html), which asks for your baseline rate and the smallest difference you care about.

Also fix the stopping point in advance. Checking daily and stopping when the number looks good is how founders fool themselves.

## A worked example (hypothetical)

Say a founder named Dana is testing a invoicing tool for freelance translators. She has $300 for ads and one week.

- **Offer:** email signup, then a second screen with a "Reserve for $9/month" button.
- **Traffic:** cold search and social ads aimed at translators. At roughly $1.50 per click she buys about 200 visitors.
- **Problem:** 200 visitors at a 4 percent signup rate gives 8 signups. From the table, the true rate could be anywhere from about 1 to 7 percent. The test cannot separate good from mediocre.

Dana has two options. Spend the full $300 and decide on a coarse rule (below), or accept that a 200-visitor test only catches disasters and clear wins. She picks the second and writes her rule down: fewer than 4 signups is a kill, 12 or more is a pass, anything between triggers a second test with a higher ask. That is honest about what 200 visitors can show.

Now suppose she gets 9 signups and 2 people click "Reserve." The signup rate looks fine. The reserve click is 22 percent of signups, which is the number that deserves attention, and she still only has 2 people. She follows up with those 2 by email and asks for a 15 minute call.

## Pre-registration template

Pre-registration just means writing down your pass line and your decision before you see results. It stops you from moving the goalposts after a mediocre number. Copy this into a doc and timestamp it.

```
HYPOTHESIS: [Who] will [action] because [problem].
OFFER SHOWN: [headline, price if any, what the button says]
ASK (circle one): email / fake-door click / preorder / deposit
TRAFFIC: [source], budget [$], planned visitors [N], end date [date]
SOURCES EXCLUDED FROM THE VERDICT: [friends, own followers, etc.]
PRIMARY METRIC: [action] / [unique visitors from cold source]
KILL if below: [X]%  (or fewer than [N] conversions)
PASS if at or above: [Y]%  (and at least [N] conversions)
IN BETWEEN: [specific next test, e.g. raise the ask to a deposit]
IF PASS, I WILL: [e.g. interview 5 signups, then build the smallest version]
IF KILL, I WILL: [e.g. change audience or drop the idea]
STOP RULE: stop at [N] visitors or [date], whichever first. No early peeking verdicts.
```

### How to pick X and Y

There is no honest universal answer, so derive them from your own economics:

1. Decide what a paying customer is worth, and what you can afford to pay to acquire one.
2. Guess the share of signups who would pay. Be pessimistic, for example 10 percent.
3. Work backward: if you can pay $30 per customer and 10 percent of signups pay, you can pay $3 per signup. At $1.50 per click, you need at least 1 signup per 2 clicks, or 50 percent, which is implausible. That is a useful kill before you spend anything.

If the arithmetic says you need a rate far above anything cold traffic produces, the idea or the price is wrong, not the landing page copy.

## What 4 percent means for you right now

Run your number through four questions:

- Was it cold traffic or warm? If warm, discount it heavily.
- How many conversions was it? Under 20, treat it as a rough hint.
- What did the visitor have to give up? An email is the weakest form of commitment.
- Did you set a line before launching? If not, you cannot call it a pass now. Write the line, then run a fresh test.

A 4 percent signup rate from 1,000 cold visitors is a decent, not conclusive, result. The same rate from 80 friends is nearly meaningless.

## What to do this week

1. Split your existing results by traffic source and write down the cold-source rate and conversion count.
2. Fill in the pre-registration template above for your next test, and save it with today's date.
3. Run the economics backward calculation to set your kill line.
4. Add one harder step to the page: a fake door button with a price, or a deposit link.
5. Buy cold traffic sized so you expect at least 20 to 30 conversions at your pass rate. If the budget does not allow it, say so in the template and treat the test as a disaster filter only.
6. Email every signup within 48 hours and ask for a short call. Their answers matter more than the percentage.
7. At the stop date, apply the rule you wrote. Do not renegotiate it.
