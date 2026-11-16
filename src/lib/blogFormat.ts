// Formatting helpers shared by the blog pages. Dates are YYYY-MM-DD strings read as UTC
// so a build in any timezone prints the same day.
export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/** JSON for a <script type="application/ld+json"> tag, with `<` escaped so content can't close the tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
