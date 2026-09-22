# ~yihuang — terminal-style resume page

A personal homepage cloned from [~jyy](https://jiangyy.github.io/)
([jiangyy/jiangyy.github.io](https://github.com/jiangyy/jiangyy.github.io))
with the content adapted to Yi Huang's resume. The page pretends to be a
terminal; the resume is a directory of markdown documents that double as
shell commands (`resume`, `bio`, `experience` …), with a real `/bin` of
tools (`ls`, `cat`, `grep`, `tree`, pipes, pager, history).

Same architecture as upstream — four decoupled layers:

```
content/*.md ──[compiler]──▶ src/generated/content.ts (manifest)
                                   │
index.html ──vite──▶ dist/         ▼
                     runtime:   main.ts
                        ├─ term/     xterm.js wrapper + ANSI/TUI primitives
                        ├─ shell/    Registry + Parser + REPL (pipes, history)
                        ├─ content/  manifest store + markdown→ANSI renderer
                        └─ apps/     oneshot & TUI commands, plugin-registered
```

## Update the resume

All content lives in `content/*.md` (mirrored from `../resume.tex` and
`../{skill,exp,proj,edu}.tex`). The file tree is the structure: add
`content/awards.md` and an `awards` command appears. `{{displayDate(y,m,d)}}`
expands at build time. When the LaTeX resume changes, edit the matching
markdown and rebuild.

Personal branding lives in a few code spots:

- prompt + tab title: `src/shell/shell.ts` (`yihuang: …`)
- `whoami`: `src/apps/whoami.ts`
- page title/meta: `index.html`
- logo/contact block: `content/index.md`

## Develop / build

Needs Node 20+ (vite 8). If the system Node is older, nvm works:

```sh
nvm install 22
npm install
npm run dev       # dev server at :5173, content recompiles on save
npm test          # 38 unit tests
npm run typecheck
npm run build     # compile content + production bundle to dist/
npm run preview   # serve the built dist/ locally
```

## Deploy to GitHub Pages

For a user page (`<username>.github.io`), push this directory to the repo
root and either use the "GitHub Actions" Pages deploy (build `dist/`), or:

```sh
npm run deploy    # builds and pushes dist/ to the gh-pages branch
```

## Try it

`help`, `ls`, `resume`, `cat experience`, `resume | wc -l`, `tree`,
`more help`, `grep Secure resume`. Links inside pages are commands too.
