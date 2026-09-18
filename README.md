# Yash Munshi — Cybersecurity Portfolio

A responsive portfolio web app showcasing application security, AI security, systems projects, and professional experience.

## Features

- Responsive desktop and phone layouts
- Project category filters and expandable project details
- Interactive professional profile
- Searchable quick navigation (Command/Ctrl + K)
- Resume download, email, LinkedIn, and GitHub links
- Web app manifest and service worker for installation and offline access
- Security headers configured for Vercel

## Run locally

No dependencies or build step are required. From the repository root:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000.

## Deploy to Vercel

Import this GitHub repository into Vercel. Use the repository root as the Root Directory, select Other as the framework, leave the Build Command empty, and set the Output Directory to `dist`. The included `vercel.json` configures the output directory and response headers.

Deployment is not yet verified publicly accessible. Use the production URL on a resume only after confirming it opens without signing in.

## Edit

- `dist/index.html`: portfolio content
- `dist/styles.css`: visual design and responsive layouts
- `dist/app.js`: interactive controls
- `dist/sw.js`: offline caching
- `dist/manifest.webmanifest`: installation metadata
- `dist/Yash_Munshi_Resume.pdf`: downloadable resume

Design inspiration: [Brittany Chiang](https://brittanychiang.com/), [Bruno Simon](https://bruno-simon.com/), and [Lee Robinson](https://leerob.com/).
