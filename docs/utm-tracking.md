# HypeCheck UTM Tracking Convention

Use UTM parameters on every public launch, SEO, and community link so Vercel Analytics can show which channels are actually working.

## Fields

- `utm_source`: The platform or origin, such as `x`, `product_hunt`, `reddit`, `github`, `google`, or `newsletter`.
- `utm_medium`: The traffic type, such as `social`, `launch`, `community`, `organic`, `profile`, or `referral`.
- `utm_campaign`: The campaign or content push, written in lowercase snake case.
- `utm_content`: Optional variant identifier for A/B copy, carousel slide, reply, bio link, or specific post.

## Naming Rules

- Use lowercase.
- Use underscores, not spaces.
- Keep campaign names durable enough to compare later.
- Do not include personal data, email addresses, or private report slugs in UTM values.
- Keep one canonical campaign name per launch or content push.

## Current Campaigns

### SEO Article 1

Article:
`https://hypecheck.nullhype.tech/blog/how-to-validate-a-startup-idea-before-building-mvp`

X post:
`https://hypecheck.nullhype.tech/blog/how-to-validate-a-startup-idea-before-building-mvp?utm_source=x&utm_medium=social&utm_campaign=seo_article_1&utm_content=launch_post`

X bio/profile:
`https://hypecheck.nullhype.tech?utm_source=x&utm_medium=profile&utm_campaign=phase_1_launch&utm_content=bio`

Reddit:
`https://hypecheck.nullhype.tech/blog/how-to-validate-a-startup-idea-before-building-mvp?utm_source=reddit&utm_medium=community&utm_campaign=seo_article_1&utm_content=validation_discussion`

GitHub README:
`https://hypecheck.nullhype.tech?utm_source=github&utm_medium=referral&utm_campaign=phase_1_launch&utm_content=readme`

### Product Hunt Launch

Product Hunt maker comment:
`https://hypecheck.nullhype.tech?utm_source=product_hunt&utm_medium=launch&utm_campaign=product_hunt_launch&utm_content=maker_comment`

Product Hunt gallery CTA:
`https://hypecheck.nullhype.tech/check?utm_source=product_hunt&utm_medium=launch&utm_campaign=product_hunt_launch&utm_content=gallery_cta`

Launch-day X post:
`https://hypecheck.nullhype.tech?utm_source=x&utm_medium=social&utm_campaign=product_hunt_launch&utm_content=launch_post`

## Weekly Review

Check Vercel Analytics once a week and record:

- Top pages by views.
- Referrers by page.
- Traffic sources from UTM-tagged links.
- Blog article views.
- Landing page to `/check` movement.
- Any spike from X, Product Hunt, GitHub, Reddit, or Google.

Double down only when a channel sends qualified traffic, not just visits.
