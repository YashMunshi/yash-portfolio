# Yash Munshi | Cybersecurity Portfolio

**Good software. Stronger defenses.**

My personal portfolio showcasing work in application security, AI security, and software engineering, alongside my experience and Computer Science studies at Arizona State University.

**[View the live portfolio](https://yash-munshi-portfolio.vercel.app)** · [LinkedIn](https://www.linkedin.com/in/yashmunshi/) · [GitHub](https://github.com/YashMunshi)

## Overview

A responsive, static web app built with HTML, CSS, and vanilla JavaScript. It runs without a package manager, third-party JavaScript libraries, or a build step.

The interface pairs a terminal-inspired profile with project cards, professional experience, education, skills, and contact links.

## Features

- **Responsive layout:** desktop, tablet, and mobile views with a collapsible navigation menu.
- **Project explorer:** filter projects by application security, AI security, or systems and software, then expand individual project details.
- **Interactive profile:** explore my security interests, systems work, and education.
- **Quick navigation:** press `Command + K` on macOS or `Ctrl + K` on Windows and Linux to search sections.
- **Resume and contact:** view or download my resume, copy my email address, and visit my professional profiles.
- **Web app support:** install on supported browsers and revisit cached pages offline after an initial visit. The resume PDF is excluded from offline caching.
- **Accessibility features:** semantic sections, a skip link, labeled controls, and keyboard navigation.
- **Response headers:** Vercel configuration includes a Content Security Policy, content-type protection, and restrictions on framing and browser permissions.

## Featured projects

| Project | Focus |
| --- | --- |
| KAIRO | AI agent security evaluations, model judgments, and reporting |
| Forge | Authentication, role-based access, and entity-scoped authorization |
| UniFi | Personal finance tracking and collaborative goals |
| Virtualized Security Lab | Security assessment practice in an isolated lab |
| Discussion Board | JavaFX question-and-answer workflows with role-based access |

Additional work includes Linux kernel development, Java file synchronization, and MATLAB robot navigation.

## Run locally

With Python 3 installed, clone the repository and serve the `dist` directory:

```sh
git clone https://github.com/YashMunshi/yash-portfolio.git
cd yash-portfolio
python3 -m http.server 8000 --directory dist
```

Open [localhost:8000](http://localhost:8000).

## Deploy to Vercel

Import this repository with the following settings:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Root directory | Repository root |
| Build command | None — enable the override and leave the field empty |
| Output directory | `dist` |

The repository already contains the files to publish. No compilation step is needed. The included `vercel.json` sets the framework, output directory, and response headers.

**Production:** [yash-munshi-portfolio.vercel.app](https://yash-munshi-portfolio.vercel.app)

## Customize

| File | Purpose |
| --- | --- |
| `dist/index.html` | Portfolio content, projects, experience, and links |
| `dist/styles.css` | Colors, typography, layout, and responsive styles |
| `dist/app.js` | Filters, navigation, profile controls, and installation |
| `dist/manifest.webmanifest` | App name, icons, and installation metadata |
| `dist/sw.js` | Service worker and offline cache |
| `dist/Yash_Munshi_Resume.pdf` | Downloadable resume |
| `dist/favicon.svg` and `dist/icon-*.png` | Browser and app icons |
| `vercel.json` | Hosting configuration and security headers |

Edit the files directly in `dist`. When changing cached assets, update the cache version in `dist/sw.js` so the next service worker activation clears the previous cache.

## Design inspiration

Inspired by the portfolios of [Brittany Chiang](https://brittanychiang.com/), [Bruno Simon](https://bruno-simon.com/), and [Lee Robinson](https://leerob.com/).

## Contact

[Yash Munshi](https://www.linkedin.com/in/yashmunshi/) · [yashmunshi2@gmail.com](mailto:yashmunshi2@gmail.com)
