# bitpixi.com

Kasey Robinson's portfolio, exported from the current Lovable Portfolio project
on 14 September 2026. The source, design, writing, images, and downloadable CV
are maintained here. GitHub Pages hosts the portfolio at <https://bitpixi.com>,
with HTTPS enforced and `www.bitpixi.com` redirecting to the main address.

## Local development

Use Node.js 22 and npm:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run dev
```

To build and preview the production files:

```sh
npm run build
npm run preview
```

The production build prerenders every portfolio page and blog post into `dist/`
so direct links work on static hosting. It also creates GitHub Pages' `404.html`.
When adding a page, add its route to `src/prerender.tsx`. Blog post routes come
from `src/data/blogPosts.ts` automatically.

## Deployment

Push to `main` to run `.github/workflows/pages.yml`, or run it manually from the
Actions tab. The workflow builds the site and deploys only `dist/` to GitHub Pages.
Repository Settings → Pages must use
GitHub Actions with the custom domain `bitpixi.com` and HTTPS enforced.

DNS is managed by Vercel. The apex domain uses GitHub Pages' A records
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
The `www` hostname is a CNAME to `bitpixi2.github.io`.

## External services

- The Hire Me form keeps its existing Formspree endpoint. Receiving messages
  depends on that Formspree account.
- External embeds and links keep their original destinations.
- The exported Supabase client and migrations are retained for reference.
  Current portfolio routes do not import that client, and the production build
  needs no Supabase environment variables or Lovable backend.
- `.env` is excluded from Git. `.env.example` documents the old optional client
  configuration; do not commit credentials.

Original Lovable project:
<https://lovable.dev/projects/1f375f39-da06-491a-9ffd-3b296500ad7e>.
