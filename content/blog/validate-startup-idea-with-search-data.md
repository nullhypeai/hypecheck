---
title: Validate a Startup Idea With Google Trends (Without Fooling Yourself)
description: "Learn to validate a startup idea with Google Trends: what the 0 to 100 index means, problem vs solution searches, free tools, traps, and a two-idea worked example."
dek: Search data gives a cheap first read on whether people are looking for help, but only if you know it measures relative interest and not demand or willingness to pay.
kicker: Demand testing
date: 2026-11-24
keywords:
  - validate startup idea with google trends
  - keyword research for startup ideas
  - search demand validation
  - google trends startup
draft: true
sources:
  - title: FAQ about Google Trends data - Trends Help
    url: https://support.google.com/trends/answer/4365533?hl=en
    publisher: Google
  - title: How are you performing on Google? - Search Console Help
    url: https://support.google.com/webmasters/answer/10268906
    publisher: Google
  - title: "The 5 Stages of Awareness: Schwartz's 5 Levels + Examples"
    url: https://selzee.com/eugene-schwartz-5-levels-of-awareness
    publisher: Selzee
---

You have an idea and a free afternoon. You want to know whether anyone is typing anything into Google that your product would answer. Search data can tell you that, but it is easy to misread, and a misread chart feels just as convincing as a correct one.

By the end of this post you will be able to read Google Trends correctly, sort queries into problem searches and solution searches, run a one-hour comparison of two ideas, and decide what to do next. You will also know when a flat or empty chart means nothing.

## What the Google Trends number actually means

Google Trends does not show search volume. Google's own [FAQ about Google Trends data](https://support.google.com/trends/answer/4365533?hl=en) says each data point is divided by the total searches for that place and time range, then scaled from 0 to 100. The index shows a topic's share of all searches, not a count of searches.

Three consequences follow from that.

- **100 is the peak of your chosen range, not a big number.** A term at 100 could be searched a thousand times or a million times that week. The chart cannot tell you which.
- **A line going up means growing share, not necessarily more searchers.** It is still a useful signal for direction.
- **Comparisons only work inside one chart.** If you compare two terms in the same view, they share a scale. Two separate charts each peaking at 100 tell you nothing about which term is bigger.

Google also warns that terms searched by very few people appear as 0, and that [statistical noise is most noticeable on low-interest queries](https://support.google.com/trends/answer/4365533?hl=en). So a tiny spike on an obscure term is probably noise. A flat zero does not prove nobody searches. It means the tool will not show you.

Google's own advice for judging scale is to compare against a common reference term. That is the trick to use: put your term next to something familiar (a weather or food term, for instance) and see how it sits. If your phrase is a thin line on the floor beside it, you know it is small, even without a number.

The same page notes that Trends is not a poll, and a spike does not mean a topic is winning. Treat it as one data point among others.

## Problem searches versus solution searches

The most useful thing you can do with search data is sort queries by what the searcher already knows. Eugene Schwartz's 1966 book Breakthrough Advertising describes [five stages of awareness](https://selzee.com/eugene-schwartz-5-levels-of-awareness): unaware, problem aware, solution aware, product aware and most aware. For search research, the middle two matter most.

| Type | What the searcher knows | Example queries (illustrative) | What it tells you |
|---|---|---|---|
| Problem-aware | Feels the pain, no solution in mind | "invoices paid late", "how to stop chasing clients for payment" | The pain exists in words people use |
| Solution-aware | Knows a category of fix exists | "invoice reminder software", "automatic payment reminders" | People already shop for this kind of tool |
| Product-aware / brand | Knows a specific product | "[competitor] pricing", "[competitor] alternatives" | A market exists, and you have competitors |

Each type answers a different question.

- **Problem searches** tell you whether the pain is common and how people describe it. Their words become your landing page copy.
- **Solution searches** tell you whether people already look for a product like yours. Steady interest here suggests a category people understand, which also means you will compete.
- **Brand searches** tell you about someone else's company. A rising brand term is a weak signal for your idea, because it may reflect their ad budget or a news story.

A good first read has problem searches present and at least some solution searches. Lots of problem searches and no solution searches can mean an opening, or it can mean people accept the pain and will not pay to fix it. Search data cannot separate those two cases. A customer conversation can.

## The free sources, and what each one misses

| Source | Good for | Limit |
|---|---|---|
| Google Trends | Direction over time, comparing two or three terms, regional differences | Relative index only, low volume shows as 0, noisy on small terms |
| Autocomplete | Real phrasing people use, specific sub-problems | Filtered by policy and personalised, so it does not always show the most popular terms (per Google's FAQ above) |
| People also ask | Questions around a topic, the shape of the pain | No counts at all, changes by query and over time |
| Search Console | Real queries that already reach your site | Only works once you have a verified site with impressions |

### Autocomplete

Type the start of a problem phrase and read the completions: "how do I stop...", "why is my ... so...", "best way to track...". Try it in a private window, since Google says predictions can relate to your location and previous searches. Write down every completion that names a specific pain. Ten of them is a better dataset than one broad keyword.

### People also ask

Search your problem phrase and expand the questions in the box. Look for repeated themes. If five of eight questions are about the same step in a workflow, that step is probably where the pain is. You get no numbers here, only shape.

### Search Console, once you are live

If you put up a landing page, verify the site in Search Console. The [Performance report](https://support.google.com/webmasters/answer/10268906) shows clicks, impressions and average click-through rate by query. That is real data about your own page, and it shows which phrases surface your page before anyone converts. It only starts being useful after your page has been indexed and shown for a while, so treat it as a second-week tool, not a day-one tool.

## The traps

**Seasonality.** A term for tax prep, gift ideas or school supplies will spike every year. Set the range to five years, not 12 months, and check whether the peaks repeat. A "growing" line that is just the seasonal peak arriving is not growth. Compare the same month year over year.

**Brand terms.** Searching for a competitor's name measures their marketing. Use it to find competitors, then drop it from your demand read.

**Tiny absolute numbers.** A low line is not a verdict. Neither is a jagged line on a small term, since Google says noise is [most visible on low-interest queries](https://support.google.com/trends/answer/4365533?hl=en). Do not argue from a spike.

**Ambiguous words.** A term with two meanings mixes unrelated searches. Use the Topic option in Trends where it exists, and add context words.

**Interest is not willingness to pay.** People search for free answers. Someone typing "how to track freelance invoices" may want a spreadsheet template. Search tells you attention exists. It says nothing about whether anyone will pay. You need a price test or a preorder for that. Our guide to [validating a startup idea before building an MVP](/blog/how-to-validate-a-startup-idea-before-building-mvp) covers the next steps.

**AI answers.** Google says Trends excludes searches made internally by AI Mode and AI Overviews. Trends reflects searches people typed, not what those AI features ran behind the scenes. Some questions that used to become searches may now be answered without a click, which affects what Search Console later shows you. How much is hard to say.

## A worked example: two ideas, one hour

This is a hypothetical. Say a solo developer is choosing between two ideas.

- **Idea A:** a tool that sends polite payment reminders for freelancers' late invoices.
- **Idea B:** a dashboard that tracks podcast sponsorship deals for small shows.

The founder runs these steps. The numbers below are made up to show how to read the output. They are not real data.

1. **Trends, same chart.** Compare "invoice reminder", "late payment invoice" and "podcast sponsorship tracker", worldwide, past five years.
2. **Read the shape.** Suppose the invoice terms sit around 40 to 60 on the index with a small dip every December, and the podcast term reads 0 to 2 with random spikes.
3. **Check the noise.** The podcast term is the low-interest case Google warns about, so those spikes mean nothing. The founder adds a familiar reference term to see scale, and it dwarfs everything else.
4. **Autocomplete.** "Late invoice" gives eight completions, five about chasing clients and two about legal rights. "Podcast sponsorship" gives completions about rates and finding sponsors, not tracking.
5. **People also ask.** Invoice questions cluster on wording for reminder emails. Podcast questions are about getting sponsors in the first place.
6. **Sort the queries.** Idea A has problem searches ("client won't pay invoice") and solution searches ("invoice reminder software"). Idea B has almost no searches for tracking, which is the solution step.

**Reading it.** Idea A shows demand that exists, with a December dip the founder should plan around, but it also shows competition, since solution searches mean tools already exist. Idea B shows no measurable searches, which is ambiguous: tiny market, or a niche that does not search this way. The founder should not kill B on this alone, and should not build A yet either. Next step: five conversations with each audience, and a landing page for A that tests a price.

## When low search volume is fine

Search data is least reliable in exactly the cases where good ideas often hide.

- **New categories.** If your product creates a category, nobody searches for it by name. The problem searches are what you have, and they may be scattered across many phrasings.
- **B2B niches.** A product for 3,000 compliance officers needs no big search market. Ten searches a month is a lot if each lead is worth thousands of dollars. Trends will show 0, and that is fine.
- **Buyers who do not search.** Some purchases come from referrals, communities, or a vendor's outreach. Search is one channel, not the market.

A reasonable rule of thumb: if Trends shows nothing, the lack of data should move you to other evidence, not to a conclusion. Look in forums, subreddits, job posts, support threads and competitor reviews. Interview people. Absence of search is a gap in your evidence, not proof of no demand.

## A decision rule you can copy

After your hour, score each idea on four questions.

1. Do **problem searches** exist, in autocomplete or People also ask, in words you did not invent?
2. Do **solution searches** exist, even small ones, beyond competitor brand names?
3. Is the trend **flat or rising** over five years once you account for seasonality?
4. Can you name **who pays**, and for what, based on something other than search?

Three or four yes answers: move to interviews and a price test. Two: you have a hypothesis, so gather non-search evidence. One or none, with a mainstream audience: be skeptical. One or none, with a B2B niche or new category: search is the wrong instrument, so use outreach.

## What to do this week

1. **Monday:** write your idea as three problem phrases and three solution phrases, in your customer's words.
2. **Tuesday:** put the phrases in Trends at a five-year range, in groups of up to five, with a familiar reference term. Screenshot the charts. Note seasonality.
3. **Wednesday:** collect autocomplete completions and People also ask questions for each phrase into one document. Tag each as problem, solution or brand.
4. **Thursday:** run the four-question score above. If you are comparing two ideas, score both.
5. **Friday:** book five conversations with people who have the problem, using the phrases you found as your opening question. Ask about the last time it happened and what they did.
6. **Weekend:** if the idea survives, build a one-page site with a price, verify it in Search Console, and start collecting query data.
