// Single source for URLs that change when someone self-hosts HypeCheck.
// Set NEXT_PUBLIC_APP_URL to your deployment's public URL (no trailing slash).
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL?.trim() || 'https://hypecheck.nullhype.tech').replace(/\/$/, '')

export const REPO_URL = 'https://github.com/nullhypeai/hypecheck'
export const SELF_HOSTING_URL = `${REPO_URL}/blob/main/docs/self-hosting.md`

// Shown as the author and publisher of blog posts (JSON-LD, RSS).
export const PUBLISHER_NAME = 'NullHype AI'

// Search engine ownership checks. Paste only the token from the verification meta tag
// (the content="..." value), not the whole tag. Unset values emit no tag.
export const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined
export const BING_SITE_VERIFICATION = process.env.BING_SITE_VERIFICATION?.trim() || undefined
