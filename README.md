# yxh1126.github.io (gh-pages)

This is the **deployed** branch for [yxh1126.github.io](https://yxh1126.github.io) — the built, static version of the terminal-style homepage served by GitHub Pages.

## What's on this branch

Only the production build output:

- `index.html` — entry point (loads the bundled JS/CSS from `/assets/`).
- `style.css`, `assets/`, `fonts/`, `favicon.svg` — styles, bundled scripts, fonts, icon.

There is no source code, no `package.json`, no build tooling here. This branch is
not meant to be edited directly.

## Where the source lives

The source project — Vite + TypeScript, with the résumé as a directory of
markdown files that double as shell commands — lives on the **`master`** branch
of this same repo ([yxh1126/yxh1126.github.io](https://github.com/yxh1126/yxh1126.github.io)).
See `master`'s `README.md` for the full architecture, develop/build instructions,
and the content model.

## How this branch gets updated

From a checkout of `master`:

```sh
npm install
npm run build     # compile content + production bundle to dist/
npm run deploy    # builds and pushes dist/ to this gh-pages branch
```

`npm run deploy` (which runs `gh-pages` under the hood) rebuilds `dist/` and
force-pushes it here, so GitHub Pages serves the latest version. After it lands,
GitHub Actions/Pages picks it up automatically.

## As a submodule

This repo is also consumed as a git submodule from the
[résumé repo](https://github.com/yxh1126/resume) under `website/`, where it
tracks the `master` (source) branch — not this `gh-pages` branch. To pull the
latest source into the résumé repo:

```sh
git submodule update --remote website
```
