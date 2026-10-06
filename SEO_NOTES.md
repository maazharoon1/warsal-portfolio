# Performance and SEO

- Canonical origin: SITE_URL, falling back to https://www.warsal-portfolio.com. Set SITE_URL to the final public origin before deploying under a different domain.
- Home, category, and video pages have distinct titles, descriptions, canonical URLs, and social metadata.
- /work/[category] provides crawlable, statically generated collections. Existing home hash tabs still work.
- /sitemap.xml includes home, collections, and video pages; /robots.txt references it.
- /share-image generates a 1200 x 630 social image. Video pages use actual project thumbnails.
- JSON-LD is escaped and describes visible page content. Video upload dates and durations have not been invented; VideoObject rich-result markup can be added when those verified fields are available.
- Initial card data includes only fields needed by the grid. Full gallery data is deferred until a popup opens.
- Native video controls use preload="none". Posters are optimized through Cloudinary.
- Web Dev image revisions are still managed in libs/projectVariable.tsx.
- Hero text is server-rendered and visible immediately. Images use responsive sizes; the unused font and continuously animated hero glow were removed.
- Submit /sitemap.xml in Google Search Console after deploying. Search Console ownership verification and production Core Web Vitals need the live site/account; source changes alone do not verify indexing or rankings.
