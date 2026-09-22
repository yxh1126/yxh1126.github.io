# ~yihuang — terminal-style resume page

A personal homepage modeled after [~jyy](https://jiangyy.github.io/):
the content lives on a centered **A4 sheet of paper** (fixed width,
subtle grain) sitting on a grey desk, and the resume is a fake Unix
filesystem — documents are commands, tools live in `/bin`, pipes work.
As the terminal prints more output, the sheet extends downward
(the width never changes) and the page scrolls.

No build step. Plain HTML/CSS/JS with [xterm.js](https://xtermjs.org/)
vendored under `vendor/` — deployable to GitHub Pages as-is.

## Files

| File          | Purpose                                          |
|---------------|--------------------------------------------------|
| `index.html`  | Page shell, `<noscript>` fallback              |
| `style.css`   | Desk + A4 paper layout and paper texture         |
| `main.js`     | The shell: pages, /bin tools, pipes, pager, history |
| `vendor/`     | xterm.js 5.3.0 + fit addon (from jsDelivr)       |

## How the "growing paper" works

The terminal keeps **no scrollback**: after every write, `main.js`
resizes `term.rows` to the full buffer length (`syncPaper()`), so all
history stays visible and the paper's height grows instead. Column
width is fitted to the sheet's fixed inner width only. Deep links are
supported: `#resume`, `#cat bio | grep hardware`, or `;`-separated
commands run automatically after boot.

## Update the resume

All content lives in the data blocks at the top of `main.js`
(`CONTACT`, `SUMMARY`, `SKILLS`, `EXPERIENCE`, `PROJECTS`, `EDUCATION`) —
mirrored from `../resume.tex` and `../{skill,exp,proj,edu}.tex`.
When the LaTeX resume changes, update those blocks.

## Run locally

```sh
cd page
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repo named `<username>.github.io` (for your user page), or push
   this directory to the `gh-pages` branch / `docs/` folder of any repo.
2. Copy the contents of `page/` (not the directory itself) to the repo root.
3. Enable "Pages" in the repo settings if it isn't automatic.

## The shell

Pages (run them like commands — they clear the screen and render):

`home`, `bio`, `skills`, `experience` (`exp`), `projects`, `education`
(`edu`), `contact`, `resume`, `help`

Tools in `/bin`:

- `ls [dir]` — list a directory (try `ls /bin`)
- `cat <path>` — print a document (pipe-friendly)
- `head` / `tail [-n N | -N] [path...]` — first/last lines
- `grep <pattern> [path...]` — filter lines (regex; falls back to literal)
- `find [path...] [-name GLOB] [-type f|d]` — walk the FS
- `tree [path]` — draw the FS as a tree
- `more` / `less [path]` — pager (space/b/q; PageUp/PageDown in `less`)
- `cd <dir>`, `pwd` — navigate (`cd /bin`, `cd ..`, `cd /`)
- `wc [-lwc]` — count lines/words/bytes
- `clear`, `exit` (same as Ctrl-D on an empty line), `whoami`
- fun: `banner`, `neofetch`, `sudo hire-me`, `echo`, `date`, `uname -a`, `uptime`

Extras:

- Pipes: `cat home | wc -l`, `tree bin/ | less`, `cat bio | grep hardware`
- Paths: `./bio`, `/help`, `../` — relative to the current directory
- Line editing (arrows, Home/End, backspace), `↑`/`↓` or Ctrl-P/N history,
  `Tab` completion (commands and paths), Ctrl-C / Ctrl-L
