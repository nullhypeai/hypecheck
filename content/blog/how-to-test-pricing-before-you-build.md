---
title: How to Test Pricing for a Startup Before You Build Anything
description: "How to test pricing for a startup with no product: ask about current spend, run a fake door checkout, then pre-sell with a refund. Includes a worked B2B example."
dek: Three zero-product tests give you a real price signal, and each one fails in a different way you can plan around.
kicker: Pricing research
date: 2026-11-16
keywords:
  - how to test pricing for a startup
  - pricing validation
  - willingness to pay
  - price testing MVP
draft: true
sources:
  - title: Van Westendorp's Price Sensitivity Meter
    url: https://en.wikipedia.org/wiki/Van_Westendorp%27s_Price_Sensitivity_Meter
    publisher: Wikipedia
  - title: How to Pre-Sell a SaaS Before You Build It (2026) - LaunchList
    url: https://getlaunchlist.com/blog/how-to-pre-sell-a-saas
    publisher: LaunchList
  - title: "Fake Door Testing: What It Is and How to Run One"
    url: https://learningloop.io/plays/fake-door-testing
    publisher: Learning Loop
  - title: Ramit Sethi and Patrick McKenzie On Why Your Customers Would Be Happier If You Charged More
    url: https://www.kalzumeus.com/2012/09/21/ramit-sethi-and-patrick-mckenzie-on-why-your-customers-would-be-happier-if-you-charged-more/
    publisher: Kalzumeus
  - title: "The Mom Test: Customer Interviews That Don't Lie to You - RoadmapOne"
    url: https://roadmap.one/blog/posts/blog44-6-mom-test/
    publisher: RoadmapOne
---

You have a landing page idea and no product. You can't decide between $9 and $49 a month. Surveys won't settle it, and you have no customers to run a split test on.

By the end of this post you will have three tests you can start this week. Each measures something different, and each can mislead you in its own way. You will also have a decision rule that sets the price and the "build or don't build" threshold before the results come in.

## What each test actually measures

People overstate what they will pay and understate how much they care about price. Fix that by raising the cost of saying yes, as in the table below.

| Test | Cost to the buyer | What it measures | Main way it lies |
|---|---|---|---|
| Van Westendorp survey | A few seconds | Stated price perceptions | Hypothetical answers, no money at stake |
| Current-spend interview | 20 minutes | The budget that already exists | Founder leads the witness |
| Fake door checkout | A click | Interest at one specific price | Clicks are cheap |
| Pre-sale with refund | Real money | Willingness to pay | Friends and early adopters skew it |

Rob Fitzpatrick's [The Mom Test](https://roadmap.one/blog/posts/blog44-6-mom-test/) makes the same point about interviews: compliments are worthless, and what counts is commitment (time, reputation or money). Use the tests in order, from cheapest to most expensive.

## Start with what they already spend

The cheapest price signal is the budget that exists today. If your reader's customer already pays for a bookkeeper, a freelancer or a clunky tool to solve this problem, that spend is your anchor. You aren't asking anyone to imagine a number. You're asking what they do now.

Ask five to ten people who have the problem, using questions about the past:

1. How do you handle [problem] today?
2. How many hours a week or month does it take, and who does it?
3. What tools or contractors do you pay for it? What do they cost?
4. When did you last pay for something to fix this, and why then?
5. What have you tried and dropped?

Then turn the answers into a spend line:

**Current spend = tool fees + (hours x hourly cost of whoever does the work) + contractor fees**

A reasonable rule of thumb (my judgment, not a published standard) is that a new tool priced at roughly 10 to 25 percent of current monthly spend feels like an easy decision. Above that, you need to replace the whole cost, not just trim it. If the current spend is zero, that is a finding too. People who spend nothing on a problem rarely start because you showed up.

This is also where B2B beats consumer. Patrick McKenzie has long argued that [software sold to businesses should charge more](https://www.kalzumeus.com/2012/09/21/ramit-sethi-and-patrick-mckenzie-on-why-your-customers-would-be-happier-if-you-charged-more/), partly because customers who pay more tend to use the product more seriously. Business buyers compare your price to payroll, not to a coffee.

**How it misleads:** you hear what people want you to hear if you describe your product first. Ask about the past before you pitch anything. Also, sample the right people. Ten friends who dislike the task are not ten buyers.

## Use Van Westendorp for a range, not a price

Van Westendorp's Price Sensitivity Meter was [introduced in 1976 by Dutch economist Peter van Westendorp](https://en.wikipedia.org/wiki/Van_Westendorp%27s_Price_Sensitivity_Meter). It asks four questions, which you can paste into a form:

1. At what price would this be so expensive that you would not consider buying it? (too expensive)
2. At what price would it be so cheap that you would doubt the quality? (too cheap)
3. At what price would it start to feel expensive, so you would have to think about buying? (expensive)
4. At what price would it feel like a bargain? (cheap)

You plot the four cumulative distributions. Where the lines cross gives you a lower bound, an upper bound, an "indifference" point and an "optimal" point, as [the Wikipedia overview](https://en.wikipedia.org/wiki/Van_Westendorp%27s_Price_Sensitivity_Meter) explains. Wikipedia also notes that the method assumes respondents can picture a price landscape and that price signals value.

**What it's good at:** ruling out absurd numbers. If most respondents say $49 is too expensive and $9 is too cheap to trust, you have a plausible band to test.

**What it's bad at:**

- Nobody pays anything, so the answers are stated, not revealed.
- Respondents have to understand the product, and with no product they are pricing your description.
- Van Westendorp himself did not try to estimate demand. The [extensions that add purchase-likelihood questions](https://en.wikipedia.org/wiki/Van_Westendorp%27s_Price_Sensitivity_Meter) came later.
- With 15 to 30 respondents, the crossing points wobble. Treat them as a range.

So use it to pick two or three prices to test with money. Don't use it to pick the price.

## Read a fake door click correctly

A fake door (or painted door) test shows a button, plan or pricing tier that looks real, then measures who clicks. [Learning Loop's overview](https://learningloop.io/plays/fake-door-testing) describes it as offering something before you build it to measure demand. For pricing, your landing page lists a plan at a specific price, and the button leads to checkout or a waitlist.

The key is to read each step of the funnel as a different level of commitment:

- **Click on the pricing button:** mild curiosity, at that price.
- **Start checkout or enter an email:** moderate intent.
- **Enter card details and pay:** the signal you want.

A click tells you the headline and price didn't scare people off. It does not tell you they would pay. The gap between clicks and payments is where most hopeful founders fool themselves.

Two cautions:

1. **Traffic quality dominates the result.** Cold paid traffic and a post in a community of your peers give different click rates for the same page. Note the source.
2. **Don't run a many-price split test on small traffic.** At a few hundred visitors, three price variants leave you with a handful of conversions each, which is noise. Test one price per week, or compare two prices that are far apart (say $29 and $99).

If you use a fake door with real payment, decide in advance what happens next. Either you deliver, or you refund and say so on the page. Don't take money under false pretenses.

## Pre-sell with a refund promise

Money changing hands is the strongest signal you can get without a product, because it costs the buyer something real. A pre-sale means selling a specific outcome with a delivery date and a written refund promise. [LaunchList's pre-sale guide](https://getlaunchlist.com/blog/how-to-pre-sell-a-saas) (a vendor of waitlist software, so read it as practitioner advice, not research) recommends a fixed scope, a date and refund terms for people who have the problem now.

The refund promise is what makes the ask reasonable. You are not asking anyone to gamble. You are asking them to put money down and get it back if you fail.

A few practical points, all from the same guide:

- Annual prepay at a discount suits a solo founder selling to small businesses. A refundable deposit fits when the price is high or the buyer needs approval.
- A card hold lasts only about seven days, so charging at purchase and refunding if you cancel is simpler.
- Stripe does not return processing fees on refunds, so budget a small loss on every refund.
- For business buyers, put scope, date, price and refund terms in the order form.
- Don't sell a lifetime deal. It tells you nothing about recurring payment.

The guide's pre-sale terms template covers what you are buying, the delivery date, what happens if you are late, what happens if you cancel, and a no-questions refund window. Copy that structure and have it checked for your country. I'm not giving legal advice.

**How it misleads:**

- Friends and followers pay out of kindness. Count only strangers.
- Early adopters tolerate more risk than your later market.
- A discounted pre-sale price is not your launch price. Test the real price if you can.
- Many refunds after you ship means you sold the promise, not the product.

## Worked example (hypothetical)

Say a solo founder wants to build a tool that matches client payments to invoices for small marketing agencies. She has no product. All numbers below are invented.

**Step 1: current spend.** She interviews eight agency owners. Six say someone does this by hand. Typical answers: 3 hours a week at about $50 an hour, plus a $29 a month accounting add-on that doesn't quite do it.

- Labor: 3 hours x $50 x 4.33 weeks, about $650 a month
- Tool: $29
- Current spend: about $680 a month

Using the 10 to 25 percent rule of thumb, a fair price band is $68 to $170 a month. A $9 price would be far too low, and it would signal a toy.

**Step 2: Van Westendorp with 20 respondents** from the same pool. Suppose the "expensive" median is $120 and the "too expensive" median is $200. That fits the band. She picks $79 a month as the test price.

**Step 3: fake door.** She sends 800 visitors to a page showing $79 a month. Suppose 56 click the pricing button (7%), 9 start checkout, and 3 pay for an annual plan of $790 with a refund promise. Three strangers paying is real. Fifty-six clicks alone was not.

**Step 4: threshold, set before she started.** Build cost out of pocket is $3,000. Money floor: $3,000 / $790, about 4 buyers. Her own signal floor (a judgment call) is 5 paying strangers. She takes the higher, 5. She has 3, so she extends the window two weeks with outreach to the six agency owners who described the manual work. If she reaches 5, she builds. If she's stuck at 3, she tests $49 or narrows the scope.

The lesson is that the answer arrived in dollars. The $9-versus-$49 question became "will five strangers pay $790 a year?"

## A copyable decision rule

Write this down before the tests start:

1. **Price band:** 10 to 25 percent of current monthly spend, checked against Van Westendorp's range.
2. **Test price:** the middle of the overlap. Don't discount it.
3. **Build threshold:** the higher of (build cost / pre-sale price) and your signal floor of paying strangers.
4. **Read the funnel:** clicks mean curiosity, checkout starts mean intent, payments mean demand.
5. **If you miss the threshold:** change one thing (price, audience or scope) and run one more round. Don't lower the bar after the fact.

For the problem-validation steps that come before pricing, see [How to Validate a Startup Idea Before Building an MVP](/blog/how-to-validate-a-startup-idea-before-building-mvp).

## What to do this week

- **Monday:** list 15 people who have the problem and book 5 to 8 spend interviews. Use the five questions above.
- **Tuesday and Wednesday:** run the interviews and compute current spend for each. Write down the price band.
- **Thursday:** put the four Van Westendorp questions in a form and send it to the same pool, plus anyone who declined an interview.
- **Friday:** write your pre-sale terms (scope, date, refund) and set your build threshold in writing.
- **Next weekend:** publish one landing page with one price and a real checkout. Drive traffic from a source you can name, and record clicks, checkout starts and payments separately.
- **After two weeks:** compare payments to your threshold. Build, adjust one variable, or stop.
