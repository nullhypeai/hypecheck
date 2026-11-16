import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const outDir = path.join(process.cwd(), 'docs', 'product-hunt-assets')
const galleryWidth = 1270
const galleryHeight = 760

const colors = {
  bg: '#0A0A0A',
  panel: '#111111',
  panel2: '#0F0F0F',
  border: '#242424',
  borderStrong: '#2A2A2A',
  text: '#F5F5F5',
  muted: '#999999',
  dim: '#666666',
  blue: '#2563EB',
  blueLight: '#60A5FA',
  blueSoft: '#93C5FD',
  green: '#22C55E',
  amber: '#F59E0B',
  red: '#EF4444',
}

const esc = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

function wrapText(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = candidate
    }
  }

  if (current) lines.push(current)
  return lines
}

function textBlock({
  text,
  x,
  y,
  size = 36,
  weight = 700,
  color = colors.text,
  maxChars = 24,
  lineHeight = 1.18,
  anchor = 'start',
  opacity = 1,
}) {
  const lines = wrapText(text, maxChars)
  return `<text x="${x}" y="${y}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}" opacity="${opacity}">
${lines
  .map(
    (line, index) =>
      `<tspan x="${x}" dy="${index === 0 ? 0 : size * lineHeight}">${esc(line)}</tspan>`,
  )
  .join('\n')}
</text>`
}

function card({ x, y, w, h, r = 28, fill = colors.panel, stroke = colors.border }) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" />`
}

function pill({ x, y, text, color = colors.blue, textColor = colors.text, width }) {
  const w = width ?? text.length * 11 + 34
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="38" rx="19" fill="${color}" opacity="0.16" stroke="${color}" />
    <text x="${x + w / 2}" y="${y + 25}" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700" fill="${textColor}" text-anchor="middle">${esc(text)}</text>
  </g>`
}

function scoreRing({ cx, cy, score, r = 78 }) {
  const circumference = 2 * Math.PI * r
  const dash = (score / 100) * circumference
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1A1A1A" stroke-width="20" />
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors.blue}" stroke-width="20" stroke-linecap="round"
      stroke-dasharray="${dash} ${circumference - dash}" transform="rotate(-90 ${cx} ${cy})" />
    <text x="${cx}" y="${cy + 10}" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800" fill="${colors.text}" text-anchor="middle">${score}</text>
    <text x="${cx}" y="${cy + 45}" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700" fill="${colors.blueLight}" text-anchor="middle">HYPE SCORE</text>
  </g>`
}

function bg(title, subtitle) {
  const titleLines = wrapText(title, 17).length
  const subtitleY = 190 + (titleLines - 1) * 64 * 1.05 + 78

  return `<svg width="${galleryWidth}" height="${galleryHeight}" viewBox="0 0 ${galleryWidth} ${galleryHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="16%" r="70%">
      <stop offset="0%" stop-color="${colors.blue}" stop-opacity="0.28" />
      <stop offset="52%" stop-color="${colors.blue}" stop-opacity="0.06" />
      <stop offset="100%" stop-color="${colors.bg}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="blueLine" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${colors.blueLight}" />
      <stop offset="100%" stop-color="${colors.blue}" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#000000" flood-opacity="0.38" />
    </filter>
  </defs>
  <rect width="1270" height="760" fill="${colors.bg}" />
  <rect width="1270" height="760" fill="url(#glow)" />
  <path d="M0 612 C220 560 340 690 570 612 S930 520 1270 650" stroke="${colors.blue}" stroke-opacity="0.18" stroke-width="2" fill="none" />
  <g opacity="0.16">
    ${Array.from({ length: 12 }, (_, i) => `<line x1="${90 + i * 98}" y1="0" x2="${90 + i * 98}" y2="760" stroke="#FFFFFF" stroke-opacity="0.08" />`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${95 + i * 90}" x2="1270" y2="${95 + i * 90}" stroke="#FFFFFF" stroke-opacity="0.08" />`).join('')}
  </g>
  <g transform="translate(64 58)">
    <polygon points="20,0 5,42 27,42 13,82 58,28 34,28 48,0" fill="url(#blueLine)" />
    <text x="78" y="45" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="${colors.text}">HypeCheck</text>
    <text x="78" y="76" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="600" fill="${colors.muted}">AI startup idea validator</text>
  </g>
  ${textBlock({ text: title, x: 64, y: 190, size: 64, weight: 850, maxChars: 17, lineHeight: 1.05 })}
  ${textBlock({ text: subtitle, x: 68, y: subtitleY, size: 24, weight: 500, color: colors.muted, maxChars: 44, lineHeight: 1.28 })}
`
}

function close() {
  return '</svg>'
}

function miniReport(x, y) {
  return `<g filter="url(#shadow)">
  ${card({ x, y, w: 486, h: 436, r: 30, stroke: colors.borderStrong })}
  ${pill({ x: x + 32, y: y + 30, text: 'VALIDATE FIRST', color: colors.amber, width: 156 })}
  ${textBlock({ text: 'AI cofounder for solo SaaS builders', x: x + 32, y: y + 104, size: 28, weight: 800, maxChars: 24 })}
  ${scoreRing({ cx: x + 364, cy: y + 118, score: 72, r: 54 })}
  ${['Competitor density is high', 'Strong willingness to pay', 'Distribution is the main risk', 'Narrower wedge recommended']
    .map(
      (item, i) => `<g>
        <circle cx="${x + 44}" cy="${y + 210 + i * 48}" r="7" fill="${i === 1 ? colors.green : colors.blueLight}" />
        <text x="${x + 64}" y="${y + 217 + i * 48}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="600" fill="${colors.text}">${esc(item)}</text>
      </g>`,
    )
    .join('')}
  <rect x="${x + 32}" y="${y + 376}" width="422" height="1" fill="${colors.border}" />
  <text x="${x + 32}" y="${y + 410}" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="700" fill="${colors.blueLight}">Build, but validate the wedge first</text>
  </g>`
}

function galleryOne() {
  return `${bg('Stop building things nobody wants', 'Turn a rough startup idea into a structured validation report before you spend nights and weekends shipping the wrong thing.')}
  <g filter="url(#shadow)">
    ${card({ x: 650, y: 152, w: 520, h: 178 })}
    <text x="684" y="204" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="700" fill="${colors.blueLight}">PASTE YOUR IDEA</text>
    ${textBlock({ text: 'Developer tool that finds profitable side project ideas...', x: 684, y: 248, size: 24, weight: 800, maxChars: 34, lineHeight: 1.12 })}
    <rect x="684" y="286" width="174" height="32" rx="16" fill="${colors.blue}" />
    <text x="771" y="308" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="800" fill="${colors.text}" text-anchor="middle">RUN HYPECHECK</text>
  </g>
  ${miniReport(690, 318)}
${close()}`
}

function galleryTwo() {
  return `${bg('Get a clear build verdict', 'A Hype Score, verdict, market read, risks, and next steps in one report that is easy to share.')}
  <g filter="url(#shadow)">
    ${card({ x: 608, y: 122, w: 562, h: 548 })}
    ${scoreRing({ cx: 752, cy: 266, score: 68, r: 84 })}
    ${pill({ x: 875, y: 190, text: 'VALIDATE FIRST', color: colors.amber, width: 178 })}
    ${textBlock({ text: 'AI analytics layer for indie hackers', x: 875, y: 266, size: 30, weight: 800, maxChars: 21 })}
    <rect x="648" y="390" width="482" height="1" fill="${colors.border}" />
    ${['Build after interviewing 10 target users', 'Lower market risk than execution risk', 'Best wedge: narrow developer workflow']
      .map(
        (item, i) => `<g>
          <rect x="648" y="${422 + i * 58}" width="482" height="40" rx="20" fill="#171717" stroke="${colors.border}" />
          <text x="674" y="${448 + i * 58}" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="650" fill="${colors.text}">${esc(item)}</text>
        </g>`,
      )
      .join('')}
  </g>
${close()}`
}

function galleryThree() {
  return `${bg('Competitors, risks, demand signals', 'HypeCheck pushes past generic chatbot feedback and forces the idea through the parts founders usually hand-wave.')}
  <g filter="url(#shadow)">
    ${[
      ['Competitor Landscape', 'Incumbents exist, but most serve teams. Solo builder workflow is the opening.', colors.blueLight],
      ['Execution Risk', 'The hard part is reliable data collection, not the first interface.', colors.amber],
      ['Demand Signals', 'Reddit and X show recurring frustration around idea validation and wasted builds.', colors.green],
    ]
      .map(
        ([heading, body, color], i) => `<g>
          ${card({ x: 620, y: 136 + i * 166, w: 560, h: 132, r: 24 })}
          <rect x="650" y="${166 + i * 166}" width="10" height="70" rx="5" fill="${color}" />
          <text x="680" y="${178 + i * 166}" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="800" fill="${colors.text}">${esc(heading)}</text>
          ${textBlock({ text: body, x: 680, y: 214 + i * 166, size: 19, weight: 520, color: colors.muted, maxChars: 42, lineHeight: 1.2 })}
        </g>`,
      )
      .join('')}
  </g>
${close()}`
}

function galleryFour() {
  return `${bg('Share validation in one link', 'Every report gets a permanent public URL so builders can ask friends, co-founders, and followers for better feedback.')}
  <g filter="url(#shadow)">
    ${card({ x: 626, y: 126, w: 548, h: 206 })}
    <text x="660" y="184" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="${colors.text}">Public report URL</text>
    <rect x="660" y="212" width="456" height="54" rx="16" fill="#171717" stroke="${colors.border}" />
    <text x="686" y="247" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="650" fill="${colors.blueLight}">hypecheck.nullhype.tech/report/K7TQ9AB2X</text>
    <rect x="660" y="286" width="120" height="40" rx="20" fill="${colors.blue}" />
    <text x="720" y="312" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="800" fill="${colors.text}" text-anchor="middle">COPY LINK</text>
    ${card({ x: 710, y: 376, w: 430, h: 224, r: 28 })}
    <text x="746" y="432" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="${colors.text}">X preview</text>
    ${textBlock({ text: 'Got a Hype Score of 72/100 for my idea. Validate yours:', x: 746, y: 474, size: 22, weight: 560, color: colors.muted, maxChars: 30, lineHeight: 1.22 })}
    <rect x="746" y="548" width="178" height="42" rx="21" fill="${colors.blue}" />
    <text x="835" y="576" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="800" fill="${colors.text}" text-anchor="middle">SHARE ON X</text>
  </g>
${close()}`
}

function galleryFive() {
  return `${bg('3 free reports, no subscription', 'Launch-friendly pricing for builders: try the product free, then buy one-time credits only if it helps.')}
  <g filter="url(#shadow)">
    ${[
      ['Free', '$0', '3 reports per account', 'Try before paying'],
      ['Single', '$5', '1 report credit', 'One-time purchase'],
      ['Best value', '$8.99', '10 report credits', '$0.90 per report'],
    ]
      .map(
        ([label, price, line1, line2], i) => `<g>
          ${card({ x: 604 + i * 190, y: 206, w: 174, h: 292, r: 26, stroke: i === 2 ? colors.blue : colors.borderStrong })}
          <text x="${691 + i * 190}" y="262" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="800" fill="${i === 2 ? colors.blueLight : colors.muted}" text-anchor="middle">${esc(label)}</text>
          <text x="${691 + i * 190}" y="334" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="900" fill="${colors.text}" text-anchor="middle">${esc(price)}</text>
          ${textBlock({ text: line1, x: 691 + i * 190, y: 388, size: 18, weight: 650, color: colors.text, maxChars: 14, anchor: 'middle', lineHeight: 1.2 })}
          ${textBlock({ text: line2, x: 691 + i * 190, y: 452, size: 16, weight: 550, color: colors.muted, maxChars: 15, anchor: 'middle', lineHeight: 1.2 })}
        </g>`,
      )
      .join('')}
    <text x="794" y="560" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="850" fill="${colors.blueLight}" text-anchor="middle">No recurring charges. Credits never expire.</text>
  </g>
${close()}`
}

function gallerySix() {
  return `${bg('Open source by NullHype AI', 'Built in public with a simple stack: Next.js, Supabase, Claude, Dodo Payments, and Vercel.')}
  <g filter="url(#shadow)">
    ${card({ x: 640, y: 142, w: 520, h: 360 })}
    <text x="676" y="208" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="850" fill="${colors.text}">github.com/nullhypeai/hypecheck</text>
    <rect x="676" y="244" width="448" height="1" fill="${colors.border}" />
    ${[
      ['Next.js', 'App Router + TypeScript'],
      ['Supabase', 'Auth, Postgres, report history'],
      ['Claude', 'Structured validation reports'],
      ['Dodo Payments', 'One-time paid credits'],
    ]
      .map(
        ([tool, detail], i) => `<g>
          <circle cx="690" cy="${294 + i * 56}" r="7" fill="${i % 2 === 0 ? colors.blueLight : colors.green}" />
          <text x="714" y="${302 + i * 56}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="${colors.text}">${esc(tool)}</text>
          <text x="908" y="${302 + i * 56}" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="560" fill="${colors.muted}">${esc(detail)}</text>
        </g>`,
      )
      .join('')}
  </g>
${close()}`
}

function thumbnail() {
  return `<svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="thumbBg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#60A5FA" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
  </defs>
  <rect width="240" height="240" rx="48" fill="#0A0A0A" />
  <circle cx="120" cy="104" r="94" fill="url(#thumbBg)" opacity="0.24" />
  <polygon points="118,30 78,124 118,124 94,210 172,96 130,96 154,30" fill="url(#thumbBg)" />
  <text x="120" y="216" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#F5F5F5" text-anchor="middle">HypeCheck</text>
</svg>`
}

const assets = [
  ['hypecheck-product-hunt-thumbnail.png', thumbnail(), 240, 240],
  ['01-stop-building-things-nobody-wants.png', galleryOne(), galleryWidth, galleryHeight],
  ['02-clear-build-verdict.png', galleryTwo(), galleryWidth, galleryHeight],
  ['03-competitors-risks-demand.png', galleryThree(), galleryWidth, galleryHeight],
  ['04-shareable-report-links.png', galleryFour(), galleryWidth, galleryHeight],
  ['05-three-free-no-subscription.png', galleryFive(), galleryWidth, galleryHeight],
  ['06-open-source-build.png', gallerySix(), galleryWidth, galleryHeight],
]

await mkdir(outDir, { recursive: true })

for (const [filename, svg, width, height] of assets) {
  await sharp(Buffer.from(svg)).resize(width, height).png().toFile(path.join(outDir, filename))
  console.log(`wrote docs/product-hunt-assets/${filename}`)
}
