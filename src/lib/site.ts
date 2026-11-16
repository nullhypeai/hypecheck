// Single source for URLs that change when someone self-hosts HypeCheck.
// Set NEXT_PUBLIC_APP_URL to your deployment's public URL (no trailing slash).
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL?.trim() || 'https://hypecheck.nullhype.tech').replace(/\/$/, '')

export const REPO_URL = 'https://github.com/nullhypeai/hypecheck'
export const SELF_HOSTING_URL = `${REPO_URL}/blob/main/docs/self-hosting.md`
