/* ~yihuang — a resume that doubles as a shell.
   Vanilla JS + xterm.js. Documents are commands, tools live in /bin,
   pipes work. Modeled after ~jyy's homepage shell. */

"use strict";

/* ------------------------------------------------------------------ */
/* Resume content (from resume.tex / *.tex)                            */
/* ------------------------------------------------------------------ */

const CONTACT = {
  name: "Yi Huang (Timothy)",
  title: "Staff Embedded Security Engineer",
  email: "yi.huang2027@gmail.com",
  phone: "(585) 957-1590",
  linkedin: "https://www.linkedin.com/in/yhtim",
  github: "https://github.com/yxh1126",
};

const SUMMARY = `
An engineer dedicated to mastering Low-Level Principles in an era
where "Code is Cheap". A self-driven person who thrives on breathing
life into cold hardware. Working as an Embedded Security Engineer
not because it's a career, but driven by a deep passion for Firmware
Development, Systems Architecture, and Hardware Security.`.trim();

const SKILLS = [
  ["Languages", "C, C++, OpenSSL, Python, Shell Scripting (Bash)"],
  ["Operating Systems", "Linux (Kernel & Application layers), Embedded Linux, RTOS"],
  ["Tools & Environments", "Git, GDB, CI/CD, Yocto, Agile"],
  ["Domain Expertise", "Systems Programming, Cryptography, Hardware Security, Secure Boot"],
];

const EXPERIENCE = [
  {
    role: "Staff Embedded Security Engineer",
    company: "Inceptio Technology",
    location: "Santa Clara, CA",
    period: "Sep. 2021 - Present",
    items: [
      "Secure Boot and Secure OTA solutions tailored for diverse SoC architectures.",
      "Hardware Security (TPM, TEE, HSM/SHE) based solution for Data Storage & Secure Communication.",
      "System bring-up including Driver & Device Tree integration, Uboot updating and peripheral validation.",
      "Asymmetrical key based Identity Authentication solution for AD (Autonomous Driving) hardware platform.",
    ],
  },
  {
    role: "Senior Firmware Engineer",
    company: "Advanced Micro Devices",
    location: "Santa Clara, CA",
    period: "Oct. 2020 - Aug. 2021",
    items: [
      "Endorsement Key Certificate verification for firmware based TPM (Trusted Platform Module).",
      "Regression Test for firmware TPM functionality on Microsoft Windows.",
    ],
  },
  {
    role: "Cybersecurity Software Engineer",
    company: "Magna International",
    location: "Auburn Hills, MI",
    period: "Nov. 2019 - Sep. 2020",
    items: [
      "In-vehicle key management based on SHE (Secure Hardware Extension) specification.",
      "Secure Boot on an AUTOSAR-based software architecture.",
    ],
  },
  {
    role: "Embedded Software Engineer",
    company: "Delphi Technologies",
    location: "Troy, MI",
    period: "Jul. 2016 - Nov. 2019",
    items: [
      "Vehicle ECU software development, including feature design, development, code review, and testing.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Secure Lightweight Storage Engine",
    stack: "C, Filesystem, Cryptography, Unix Kernel",
    period: "Feb. 2026 - Present",
    items: [
      "Built upon a lightweight block filesystem optimized for minimalist, high-performance embedded systems.",
      "Implemented block-level Full Disk Encryption (FDE) to secure the filesystem blocks against physical extraction.",
      "Integrated a crypto verification chain using Merkle trees to check immutable system image integrity during runtime.",
    ],
  },
  {
    name: "Hardware Security Abstraction Layer",
    stack: "C, C++, PKCS#11, OpenSSL",
    period: "Mar. 2025 - Feb. 2026",
    items: [
      "Architected a plug-and-play cryptographic abstraction layer for multi-SoC platforms by implementing standardized PKCS#11 interfaces for heterogeneous Hardware Security Devices.",
      "Developed an OpenSSL Provider wrapping PKCS#11 interfaces, enabling uniform Crypto and Key APIs that work across different Hardware Security Modules.",
      "Built a conditional compilation pipeline to target-compile the same codebase across different hardware platforms.",
    ],
  },
];

const EDUCATION = [
  {
    school: "Rochester Institute of Technology",
    location: "Rochester, NY",
    degree: "Master of Science in Computer Science",
    year: "2016",
  },
  {
    school: "Beihang University",
    location: "Beijing, China",
    degree: "Master of Engineering in Electronic and Communication Engineering",
    year: "2013",
  },
  {
    school: "Beihang University",
    location: "Beijing, China",
    degree: "Bachelor of Engineering in Integrated Circuit Design",
    year: "2010",
  },
];

/* ------------------------------------------------------------------ */
/* Pages — documents that double as commands                           */
/* ------------------------------------------------------------------ */

const PAGES = {
  home: { title: "Home", body: () => "```plain\n" + LOGO.join("\n") + "\n```\n\n" +
    "**Yi Huang (Timothy)** · Staff Embedded Security Engineer\n\n" +
    "> " + CONTACT.email + " · " + CONTACT.phone + "\n" +
    "> " + CONTACT.linkedin + " · " + CONTACT.github + "\n\n" +
    "*An engineer dedicated to mastering Low-Level Principles in an era where \"Code is Cheap\".*\n\n" +
    "- This page doubles as a shell.\n" +
    "  Try: `bio`, `help`, `tree bin/ | less`.\n\n" +
    "Last update: " + new Date().toDateString() + "\n" },

  bio: { title: "Bio", body: () => "# Bio\n\n" + SUMMARY.split("\n").join("\n") + "\n" },

  skills: { title: "Skills", body: () => "# Technical Skills\n\n" +
    SKILLS.map(([k, v]) => "- **" + k + "**: " + v).join("\n") + "\n" },

  experience: { title: "Experience", body: () => "# Experience\n\n" +
    EXPERIENCE.map(e =>
      "## " + e.company + " — " + e.location + "\n\n" +
      "### " + e.role + " · " + e.period + "\n\n" +
      e.items.map(i => "- " + i).join("\n")).join("\n\n") + "\n" },

  projects: { title: "Projects", body: () => "# Key Projects\n\n" +
    PROJECTS.map(p =>
      "## " + p.name + "\n\n" +
      "### " + p.stack + " · " + p.period + "\n\n" +
      p.items.map(i => "- " + i).join("\n")).join("\n\n") + "\n" },

  education: { title: "Education", body: () => "# Education\n\n" +
    EDUCATION.map(e =>
      "## " + e.school + " — " + e.location + "\n\n" +
      "- " + e.degree + " (" + e.year + ")").join("\n\n") + "\n" },

  contact: { title: "Contact", body: () => "# Contact\n\n" +
    "- email: " + CONTACT.email + "\n" +
    "- phone: " + CONTACT.phone + "\n" +
    "- linkedin: " + CONTACT.linkedin + "\n" +
    "- github: " + CONTACT.github + "\n" },

  resume: { title: "Resume", body: () => "# " + CONTACT.name + "\n\n" +
    PAGES.bio.body() + "\n" + PAGES.skills.body() + "\n" +
    PAGES.experience.body() + "\n" + PAGES.projects.body() + "\n" +
    PAGES.education.body() + "\n" + PAGES.contact.body() },

  help: { title: "Help", body: () => `# Help

This site is a terminal. Documents are commands — \`home\`, \`help\`, \`bio\` —
and tools live in \`/bin\`.

## commands

- \`ls [dir]\`    list a directory (try \`ls /bin\`)
- \`cat <path>\`  print a document (pipe-friendly)
- \`head [path]\` first lines (\`head -n 5 bio\`, \`cat bio | head\`)
- \`tail [path]\` last lines (\`tail -n 3 bio\`)
- \`grep <pat>\`  filter lines (\`cat bio | grep hardware\`)
- \`find [path]\` walk the FS (\`find /bin -type f\`, \`find -name bio\`)
- \`tree [path]\` draw the FS as a tree
- \`more [path]\` page a document or stdin (space/b/q)
- \`less [path]\` same pager, with PageUp/PageDown
- \`cd <dir>\`    change directory (\`cd /bin\`, \`cd ..\`, \`cd /\`)
- \`clear\`       clear the screen
- \`wc\`          count lines/words/bytes from stdin
- \`exit\`        return to the home page (same as Ctrl-D on an empty line)

## pages

- \`home\`    this page · \`bio\` · \`skills\` · \`experience\` (\`exp\`)
- \`projects\` · \`education\` (\`edu\`) · \`contact\` · \`resume\`

## extras

- \`banner\`    re-print the logo
- \`neofetch\`  system info, obviously
- \`sudo hire-me\` — you know what to do

## tips

- Run a page like \`home\` to open it (clears the screen).
- Pipes work: \`cat home | wc -l\`.
- Paths: \`./bio\`, \`/help\`, \`../\`.
- History: ↑/↓ or Ctrl-P/N. Cancel: Ctrl-C. Clear: Ctrl-L.
` },
};

// short aliases for pages
const PAGE_ALIASES = {
  index: "home",
  exp: "experience",
  proj: "projects",
  edu: "education",
};

function pageBody(slug) {
  return PAGES[slug].body();
}

/* ------------------------------------------------------------------ */
/* Terminal setup                                                      */
/* ------------------------------------------------------------------ */

const term = new window.Terminal({
  cursorBlink: true,
  cursorStyle: "bar",
  fontFamily: '"SFMono-Regular", "Menlo", "Consolas", "DejaVu Sans Mono", monospace',
  fontSize: 15,
  // transparent so the paper sheet (and its grain) shows through
  allowTransparency: true,
  theme: {
    background: "rgba(0,0,0,0)",
    foreground: "#2e3338",
    cursor: "#4a5158",
    cursorAccent: "#fafafa",
    selectionBackground: "#d0d7de",
    black: "#2e3338",
    red: "#cf222e",
    green: "#1a7f37",
    yellow: "#9a6700",
    blue: "#0969da",
    magenta: "#8250df",
    cyan: "#1b7c83",
    white: "#6e7781",
    brightBlack: "#57606a",
    brightGreen: "#116329",
    brightBlue: "#0550ae",
    brightCyan: "#0b6b75",
    brightYellow: "#7d4e00",
  },
});

const fitAddon = new window.FitAddon.FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById("term-screen"));

/* ------------------------------------------------------------------ */
/* Paper sizing — the sheet of paper has a fixed width and grows        */
/* downward with the content. The terminal keeps NO scrollback: every   */
/* time output lands, its rows are resized to the full buffer length,  */
/* so all history stays visible and the paper (not xterm) extends.     */
/* ------------------------------------------------------------------ */

let syncQueued = false;
let nearBottom = true;

const raf = window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : (fn) => setTimeout(fn, 0);

function syncPaper() {
  if (syncQueued) return;
  syncQueued = true;
  raf(() => {
    syncQueued = false;
    // fit columns to the paper's (fixed) inner width only
    const dims = fitAddon.proposeDimensions();
    if (dims && dims.cols >= 2 && dims.cols !== term.cols) {
      term.resize(dims.cols, term.rows);
    }
    // grow rows to cover the whole buffer — no internal scrolling
    const lines = term.buffer.active.length;
    if (lines !== term.rows && lines >= 1) {
      term.resize(term.cols, lines);
    }
    // keep the prompt in view, but don't yank the page if the
    // reader has scrolled up to re-read earlier content
    if (nearBottom && window.scrollTo) {
      window.scrollTo(0, document.documentElement.scrollHeight);
    }
  });
}

window.addEventListener("resize", syncPaper);
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  nearBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 160;
}, { passive: true });

// clicking anywhere on the sheet focuses the terminal
{
  const paperEl = document.getElementById("paper");
  if (paperEl) paperEl.addEventListener("click", () => term.focus());
}

// every write may extend the paper
const _write = term.write.bind(term);
const _writeln = term.writeln.bind(term);
term.write = (data, callback) => { _write(data, callback); syncPaper(); };
term.writeln = (data, callback) => { _writeln(data, callback); syncPaper(); };

// initial fit to the sheet width
{
  const dims = fitAddon.proposeDimensions();
  if (dims && dims.cols >= 2) term.resize(dims.cols, term.rows);
}

/* ------------------------------------------------------------------ */
/* ANSI helpers — one escape per style, no nesting (inner resets leak) */
/* ------------------------------------------------------------------ */

const ESC = "\x1b[";
const style = (code) => (s) => ESC + code + "m" + s + ESC + "0m";

const green = style("32");
const amber = style("33");
const cyan = style("36");
const blue = style("34");
const magenta = style("35");
const red = style("31");
const dim = style("2");

const boldGreen = style("1;32");
const boldBlue = style("1;34");
const boldCyan = style("1;36");
const boldWhite = style("1;37");

const line = (s) => term.writeln(s === undefined ? "" : s);

// write a (possibly multi-line) string as terminal output
function printOut(s) {
  if (!s) return;
  const t = s.endsWith("\n") ? s.slice(0, -1) : s;
  t.split("\n").forEach((l) => term.writeln(l));
}

/* ------------------------------------------------------------------ */
/* Banner                                                              */
/* ------------------------------------------------------------------ */

const LOGO = [
"█   █ ███    █   █ █   █  ███  █   █  ███",
"█   █  █     █   █ █   █ █   █ ██  █ █   █",
" █ █   █     █████ █   █ █████ █ █ █ █   ",
"  █    █     █   █ █   █ █   █ █  ██ █  ██",
"  █   ███    █   █  ███  █   █ █   █  ███",
];

const BANNER = LOGO.map((l) => green(l)).join("\n") + [
  "",
  boldWhite(CONTACT.name) + dim(" · " + CONTACT.title),
  "",
  dim("Last login: " + new Date().toDateString() + " on ttys001"),
  dim("This page doubles as a shell. Try: ") + amber("bio") +
    dim(", ") + amber("help") + dim(", ") + amber("tree bin/ | less"),
].join("\n");

/* ------------------------------------------------------------------ */
/* Mini markdown renderer (for page bodies)                            */
/* ------------------------------------------------------------------ */

const viewWidth = () => Math.max(40, term.cols - 2);

function wrapText(text, width) {
  const out = [];
  for (const raw of text.split("\n")) {
    if (raw.length <= width) { out.push(raw); continue; }
    const words = raw.split(" ");
    let cur = "";
    for (const w of words) {
      if ((cur + (cur ? " " : "") + w).length > width && cur) {
        out.push(cur);
        cur = w;
      } else {
        cur = cur ? cur + " " + w : w;
      }
    }
    if (cur) out.push(cur);
  }
  return out;
}

// inline markdown: **bold**, `code`, [text](url)
function inlineMd(s) {
  return s
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, t) => blue(t))
    .replace(/`([^`]+)`/g, (_m, t) => amber(t))
    .replace(/\*\*([^*]+)\*\*/g, (_m, t) => boldWhite(t))
    .replace(/\*([^*]+)\*/g, (_m, t) => dim(t));
}

function renderMarkdown(md, width) {
  const out = [];
  let inFence = false;
  const fence = [];
  let para = [];

  const flushPara = () => {
    if (para.length) {
      wrapText(para.join(" "), width).forEach((l) => out.push("  " + inlineMd(l)));
      out.push("");
      para = [];
    }
  };

  for (const raw of md.split("\n")) {
    if (raw.startsWith("```")) {
      flushPara();
      if (inFence) {
        fence.forEach((l) => out.push("  " + l));
        out.push("");
        fence.length = 0;
        inFence = false;
      } else {
        inFence = true;
      }
      continue;
    }
    if (inFence) { fence.push(raw); continue; }

    const h = raw.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushPara();
      if (h[1].length === 1) out.push(boldCyan(h[2]), "");
      else if (h[1].length === 2) out.push(cyan(h[2]));
      else out.push("  " + amber(h[2]));
      continue;
    }
    if (/^\s*[-*]\s+/.test(raw)) {
      flushPara();
      out.push("  " + green("• ") + inlineMd(raw.replace(/^\s*[-*]\s+/, "")));
      continue;
    }
    if (/^>\s?/.test(raw)) {
      flushPara();
      out.push("  " + dim("│ ") + inlineMd(raw.replace(/^>\s?/, "")));
      continue;
    }
    if (/^---+$/.test(raw.trim())) {
      flushPara();
      out.push(dim("─".repeat(40)), "");
      continue;
    }
    if (raw.trim() === "") { flushPara(); continue; }
    para.push(raw.trim());
  }
  flushPara();
  return out.join("\n");
}

/* ------------------------------------------------------------------ */
/* Virtual filesystem: / (pages) + /bin (tools)                        */
/* ------------------------------------------------------------------ */

let cwd = "/";

function resolvePath(arg, base) {
  let p = arg;
  if (!p.startsWith("/")) p = (base === "/" ? "" : base) + "/" + p;
  const stack = [];
  for (const part of p.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") { stack.pop(); continue; }
    stack.push(part);
  }
  return "/" + stack.join("/");
}

function fsIsDir(path) {
  const parts = path.split("/").filter(Boolean);
  return parts.length === 0 || (parts.length === 1 && parts[0] === "bin");
}

// returns file text or null; `file` also matches page slugs without .md
function fsGet(path) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 1 && parts[0] !== "bin") {
    const slug = parts[0].replace(/\.md$/, "");
    if (PAGES[slug]) return pageBody(slug);
  }
  if (parts[0] === "bin" && parts.length === 2 && COMMANDS[parts[1]]) {
    return COMMANDS[parts[1]].desc + "\n";
  }
  return null;
}

function fsList(path) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) {
    return [{ name: "bin", dir: true }]
      .concat(Object.keys(PAGES).sort().map((n) => ({ name: n + ".md", dir: false })));
  }
  if (parts.length === 1 && parts[0] === "bin") {
    return Object.keys(COMMANDS).sort().map((n) => ({ name: n, dir: false }));
  }
  return null; // not a directory
}

/* glob pattern (* and ?) to anchored RegExp */
function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp("^" + escaped + "$");
}

/* ------------------------------------------------------------------ */
/* Commands in /bin — each returns its output as text                  */
/* ctx.tty is true when this stage is the last of the pipeline         */
/* ------------------------------------------------------------------ */

const COMMANDS = {
  ls: {
    desc: "list directory contents: ls [dir]",
    run: (ctx, argv) => {
      const target = resolvePath(argv[0] ?? ".", cwd);
      const entries = fsList(target);
      if (!entries) return "ls: " + (argv[0] ?? ".") + ": not a directory\n";
      if (entries.length === 0) return "(empty)\n";
      return entries.map((e) =>
        "  " + (e.dir ? boldBlue(e.name + "/") : green(e.name))).join("\n") + "\n";
    },
  },

  cat: {
    desc: "print documents: cat <path> [path...]",
    run: (ctx, argv) => {
      if (argv.length === 0) return "usage: cat <path> [path...]\n";
      const parts = [];
      for (const a of argv) {
        const text = fsGet(resolvePath(a, cwd));
        if (text === null) {
          parts.push("cat: " + a + ": no such file\n");
          continue;
        }
        wrapText(text.replace(/\n$/, ""), viewWidth())
          .forEach((l) => parts.push(l));
      }
      return parts.join("\n") + "\n";
    },
  },

  head: {
    desc: "first lines: head [-n N | -N] [path...]",
    run: (ctx, argv, stdin) => parseHeadTail(argv, stdin, cwd, "head"),
  },

  tail: {
    desc: "last lines: tail [-n N | -N] [path...]",
    run: (ctx, argv, stdin) => parseHeadTail(argv, stdin, cwd, "tail"),
  },

  grep: {
    desc: "lines matching a pattern: grep <pattern> [path...]",
    run: (ctx, argv, stdin) => {
      const args = argv.filter((a) => !a.startsWith("-"));
      const pattern = args[0];
      if (!pattern) return "usage: grep <pattern> [path...]\n";
      let re;
      try { re = new RegExp(pattern); }
      catch { re = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); }

      const files = args.slice(1);
      const sources = [];
      if (files.length === 0) {
        if (stdin === null) return "grep: no input\n";
        sources.push({ name: "(stdin)", text: stdin });
      } else {
        for (const f of files) {
          const text = fsGet(resolvePath(f, cwd));
          sources.push(text === null ? { name: f, text: null } : { name: f, text });
        }
      }
      const multi = sources.length > 1;
      const hits = [];
      for (const s of sources) {
        if (s.text === null) { hits.push("grep: " + s.name + ": no such file"); continue; }
        for (const l of s.text.replace(/\n$/, "").split("\n")) {
          if (re.test(l)) hits.push(multi ? s.name + ":" + l : l);
        }
      }
      return hits.length ? hits.join("\n") + "\n" : "";
    },
  },

  find: {
    desc: "walk the FS: find [path...] [-name GLOB] [-type f|d]",
    run: (ctx, argv) => {
      let name = null, type = null;
      const starts = [];
      for (let i = 0; i < argv.length; i++) {
        if (argv[i] === "-name") name = globToRegExp(argv[++i]);
        else if (argv[i] === "-type") type = argv[++i];
        else starts.push(argv[i]);
      }
      const results = [];
      const walk = (path, label) => {
        if (fsIsDir(path)) {
          const isDirMatch = type === "d";
          if (!type || isDirMatch) maybePush(label);
          for (const e of fsList(path) ?? []) {
            walk(path === "/" ? "/" + e.name : path + "/" + e.name,
                 (label === "/" ? "" : label) + "/" + e.name);
          }
        } else if (!type || type === "f") {
          maybePush(label);
        }
        function maybePush(l) {
          if (name) {
            const base = l.split("/").pop() ?? l;
            const stem = base.replace(/\.md$/, "");
            if (!name.test(base) && !name.test(stem)) return;
          }
          results.push(l);
        }
      };
      for (const s of starts.length ? starts : ["."]) {
        const resolved = resolvePath(s, cwd);
        const label = s.startsWith("/") ? resolved.replace(/\/+$/, "") || "/" : s;
        walk(resolved, label);
      }      return results.join("\n") + (results.length ? "\n" : "");
    },
  },

  tree: {
    desc: "draw the FS as a tree: tree [path]",
    run: (ctx, argv) => {
      const arg = argv[0] ?? ".";
      const target = resolvePath(arg, cwd);
      if (!fsIsDir(target)) return "tree: " + arg + ": not a directory\n";
      const header = arg.replace(/\/+$/, "") || "/";
      const out = [header];
      const stats = { dirs: 0, files: 0 };
      drawTree(target, "", out, stats);
      out.push("");
      out.push(stats.dirs + " director" + (stats.dirs === 1 ? "y" : "ies") +
        ", " + stats.files + " file" + (stats.files === 1 ? "" : "s"));
      return out.join("\n") + "\n";
    },
  },

  more: {
    desc: "page a document or stdin: more [path]",
    run: (ctx, argv, stdin) => runPager(ctx, argv, stdin, "more"),
  },

  less: {
    desc: "page a document or stdin: less [path]",
    run: (ctx, argv, stdin) => runPager(ctx, argv, stdin, "less"),
  },

  cd: {
    desc: "change directory: cd <dir>",
    run: (ctx, argv) => {
      const target = resolvePath(argv[0] ?? "/", cwd);
      if (!fsIsDir(target)) return "cd: " + argv[0] + ": not a directory\n";
      cwd = target;
      return "";
    },
  },

  pwd: {
    desc: "print the working directory",
    run: () => (cwd === "/" ? "/" : cwd) + "\n",
  },

  wc: {
    desc: "count lines/words/bytes from stdin: wc [-lwc]",
    run: (ctx, argv, stdin) => {
      const flagArg = argv.find((a) => /^-[lwc]+$/.test(a)) ?? "-lwc";
      const files = argv.filter((a) => !/^-[lwc]+$/.test(a));
      let text = stdin;
      if (files.length) {
        const t = fsGet(resolvePath(files[0], cwd));
        if (t === null) return "wc: " + files[0] + ": no such file\n";
        text = t;
      }
      if (text === null) return "wc: no input\n";
      const lines = text.replace(/\n$/, "").split("\n").length;
      const words = text.split(/\s+/).filter(Boolean).length;
      const bytes = text.length;
      const show = [];
      for (const f of flagArg.slice(1)) {
        if (f === "l") show.push(String(lines));
        if (f === "w") show.push(String(words));
        if (f === "c") show.push(String(bytes));
      }
      return show.map((n) => n.padStart(7)).join("") + (files.length ? " " + files[0] : "") + "\n";
    },
  },

  clear: {
    desc: "clear the screen",
    run: (ctx) => { if (ctx.tty) term.clear(); return ""; },
  },

  exit: {
    desc: "return to the home page (same as Ctrl-D on an empty line)",
    run: (ctx) => { if (ctx.tty) goHome(); return ""; },
  },

  whoami: {
    desc: "who runs this site",
    run: () => "yi\n",
  },

  banner: {
    desc: "re-print the logo",
    run: () => BANNER + "\n",
  },

  neofetch: {
    desc: "system info, obviously",
    run: () => {
      const art = [
        green("     .--.      "),
        green("    |o_o |     "),
        green("    |:_/ |     "),
        green("   //   \\ \\    "),
        green("  (|     | )   "),
        green(" /'\\_   _/`\\   "),
        green(" \\___)=(___/   "),
      ];
      const info = [
        boldCyan("yi") + "@" + boldCyan("firmware"),
        dim("-----------------"),
        amber("Title") + ": " + CONTACT.title,
        amber("OS") + ": Embedded Linux (kernel & userspace)",
        amber("Shell") + ": this page",
        amber("Languages") + ": C, C++, Python, Bash",
        amber("Uptime") + ": in the industry since 2016",
        amber("Security") + ": Secure Boot, TPM, TEE, HSM/SHE",
        amber("GitHub") + ": " + CONTACT.github,
      ];
      const rows = Math.max(art.length, info.length);
      const out = [];
      for (let i = 0; i < rows; i++) {
        out.push((art[i] || " ".repeat(15)) + "  " + (info[i] || ""));
      }
      return out.join("\n") + "\n";
    },
  },

  sudo: {
    desc: "do you feel lucky?",
    run: (ctx, argv) => {
      if (argv.join(" ").match(/hire/)) {
        return green("Permission granted. ") + CONTACT.email +
          "\n(references available upon request)\n";
      }
      return amber("yi is not in the sudoers file. This incident has been reported.") +
        dim(" (to: " + CONTACT.email + ")\n");
    },
  },

  echo: {
    desc: "print arguments",
    run: (ctx, argv) => argv.join(" ") + "\n",
  },

  date: {
    desc: "print the date",
    run: () => new Date().toString() + "\n",
  },

  uname: {
    desc: "print system name (-a for more)",
    run: (ctx, argv) => argv.includes("-a")
      ? "silicon bootloader-secure 6.1.0-yi #1 SMP PREEMPT aarch64 GNU/Linux\n"
      : "Linux\n",
  },

  uptime: {
    desc: "how long has it been",
    run: () => {
      const years = new Date().getFullYear() - 2016;
      return "up " + years + " years (embedded), load average: hardware, firmware, crypto\n";
    },
  },
};

/* head/tail shared implementation */
function parseHeadTail(argv, stdin, base, which) {
  let n = 10;
  const files = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-n") n = parseInt(argv[++i], 10) || 10;
    else if (/^-\d+$/.test(a)) n = parseInt(a.slice(1), 10);
    else files.push(a);
  }
  const sources = [];
  if (files.length === 0) {
    if (stdin === null) return "usage: " + which + " [-n N | -N] [path...]\n";
    sources.push({ name: null, text: stdin });
  } else {
    for (const f of files) {
      const text = fsGet(resolvePath(f, base));
      sources.push(text === null ? { name: f, text: null } : { name: f, text });
    }
  }
  const multi = sources.length > 1;
  const parts = [];
  for (const s of sources) {
    if (s.text === null) { parts.push(which + ": " + s.name + ": no such file"); continue; }
    if (multi) parts.push("==> " + s.name + " <==");
    let ls = s.text.replace(/\n$/, "").split("\n");
    ls = which === "head" ? ls.slice(0, n) : ls.slice(-n);
    parts.push(ls.join("\n"));
  }
  return parts.join("\n") + "\n";
}

/* tree shared implementation */
function drawTree(path, prefix, out, stats) {
  const entries = fsList(path) ?? [];
  entries.forEach((e, i) => {
    const last = i === entries.length - 1;
    const branch = last ? "└── " : "├── ";
    const name = e.dir ? boldBlue(e.name + "/") : green(e.name);
    out.push(dim(prefix + branch) + name);
    if (e.dir) {
      stats.dirs++;
      drawTree(path === "/" ? "/" + e.name : path + "/" + e.name,
               prefix + (last ? "    " : "│   "), out, stats);
    } else {
      stats.files++;
    }
  });
}

/* pager backend for more/less */
function runPager(ctx, argv, stdin, which) {
  let text = null;
  if (argv.length) {
    text = fsGet(resolvePath(argv[0], cwd));
    if (text === null) return which + ": " + argv[0] + ": no such file\n";
    text = wrapText(text.replace(/\n$/, ""), viewWidth()).join("\n");
  } else if (stdin !== null) {
    text = stdin;
  } else {
    return "usage: " + which + " [path]\n";
  }
  if (!ctx.tty) return text + "\n"; // piped further: just dump
  return startPager(text, which === "less").then(() => "");
}

/* ------------------------------------------------------------------ */
/* Page runner — running a page clears the screen and renders it       */
/* ------------------------------------------------------------------ */

function goHome() {
  term.write("\x1b[2J\x1b[3J\x1b[H");
  printOut(BANNER);
}

function runPage(slug, ctx) {
  if (slug === "home") {
    if (ctx.tty) { goHome(); return Promise.resolve(""); }
    return Promise.resolve(LOGO.join("\n") + "\n\n" +
      CONTACT.name + " - " + CONTACT.title + "\n" +
      CONTACT.email + " | " + CONTACT.phone + "\n" +
      CONTACT.linkedin + " | " + CONTACT.github + "\n");
  }
  const rendered = renderMarkdown(pageBody(slug), viewWidth());
  if (ctx.tty) {
    term.write("\x1b[2J\x1b[3J\x1b[H");
    printOut(rendered);
    return Promise.resolve("");
  }
  return Promise.resolve(rendered);
}

/* ------------------------------------------------------------------ */
/* Pipeline engine: split on |, thread stdin, print final output       */
/* ------------------------------------------------------------------ */

async function runPipeline(cmdline) {
  const stages = cmdline.split("|").map((s) => s.trim()).filter(Boolean);
  let stdin = null;
  let out = "";
  for (let i = 0; i < stages.length; i++) {
    const tty = i === stages.length - 1;
    out = await runOne(stages[i], stdin, tty);
    stdin = out;
  }
  printOut(out);
}

async function runOne(stage, stdin, tty) {
  // strip surrounding quotes from each token ('b*' -> b*)
  const argv = stage.split(/\s+/).filter(Boolean)
    .map((t) => t.replace(/^(['"])(.*)\1$/, "$2"));
  const name = argv[0];
  if (!name) return "";
  const ctx = { tty, argv };

  if (COMMANDS[name]) return COMMANDS[name].run(ctx, argv.slice(1), stdin);
  const page = PAGE_ALIASES[name] ?? name;
  if (PAGES[page]) return runPage(page, ctx);
  return red(name + ": command not found") + dim("  (try `help`)\n");
}

/* ------------------------------------------------------------------ */
/* Pager — takes over the keyboard while active                        */
/* ------------------------------------------------------------------ */

let pager = null;

// the paper grows with content, so term.rows is the whole sheet —
// the pager pages through documents in fixed page-sized chunks instead
const pagerH = () => Math.max(1, Math.min(term.rows, 24) - 1);

function startPager(text, isLess) {
  return new Promise((resolve) => {
    pager = { lines: text.split("\n"), top: 0, resolve, less: isLess, name: isLess ? "less" : "more" };
    drawPager();
  });
}

function drawPager() {
  term.clear();
  const h = pagerH();
  const slice = pager.lines.slice(pager.top, pager.top + h);
  slice.forEach((l) => term.writeln(l));
  const atEnd = pager.top + h >= pager.lines.length;
  const keys = pager.less ? "space/b/q, PgUp/PgDn" : "space/b/q";
  term.write(atEnd ? dim("(END) — q to quit")
    : dim("--" + pager.name + "-- " + keys));
}

function pagerKey(data) {
  const h = pagerH();
  const max = Math.max(0, pager.lines.length - h);
  switch (data) {
    case " ": case "\r": case "\n":
      pager.top = Math.min(max, pager.top + h); break;
    case "b":
      pager.top = Math.max(0, pager.top - h); break;
    case "q": case "\x1b": case "\x03":
      pager.resolve();
      pager = null;
      line();
      return;
    case "\x1b[A": pager.top = Math.max(0, pager.top - 1); break;
    case "\x1b[B": pager.top = Math.min(max, pager.top + 1); break;
    case "\x1b[5~": pager.top = Math.max(0, pager.top - h); break;
    case "\x1b[6~": pager.top = Math.min(max, pager.top + h); break;
    case "\x1b[H": case "\x1b[1~": pager.top = 0; break;
    case "\x1b[F": case "\x1b[4~": pager.top = max; break;
  }
  drawPager();
}

/* ------------------------------------------------------------------ */
/* Shell loop: line editing, history, tab completion                   */
/* ------------------------------------------------------------------ */

function promptStr() {
  return boldGreen("yi@firmware") + ":" + boldBlue(cwd === "/" ? "/" : cwd) + "$ ";
}

let buffer = "";
let cursor = 0;            // cursor position within buffer
let history = [];
let histIdx = -1;
let busy = false;          // a command is executing — swallow keystrokes

function redrawInput() {
  // rewrite the current input line: prompt + buffer, cursor at `cursor`
  term.write("\r" + ESC + "2K" + promptStr() + buffer);
  if (cursor < buffer.length) {
    term.write(ESC + (buffer.length - cursor) + "D");
  }
}

async function runCommand(raw) {
  const trimmed = raw.trim();
  line(); // finish the echoed input line
  if (trimmed) {
    history.push(trimmed);
    histIdx = -1;
    await runPipeline(trimmed);
  }
  buffer = "";
  cursor = 0;
  term.write("\r" + promptStr());
}function complete() {
  const parts = buffer.split(/\s+/);
  if (parts.length <= 1) {
    // complete command or page name
    const prefix = parts[0] || "";
    const pool = Object.keys(COMMANDS)
      .concat(Object.keys(PAGES))
      .concat(Object.values(PAGE_ALIASES));
    const matches = [...new Set(pool)].filter((c) => c.startsWith(prefix));
    if (matches.length === 1) {
      buffer = matches[0];
      cursor = buffer.length;
      redrawInput();
    } else if (matches.length > 1) {
      line();
      line(matches.map((m) => cyan(m)).join("  "));
      term.write(promptStr() + buffer);
    }
  } else {
    // complete a path argument against its directory
    const token = parts[parts.length - 1];
    const slash = token.lastIndexOf("/");
    const dirPart = slash >= 0 ? token.slice(0, slash + 1) : "";
    const base = slash >= 0 ? token.slice(slash + 1) : token;
    const dirPath = dirPart === "" ? cwd : resolvePath(dirPart, cwd);
    const entries = fsIsDir(dirPath) ? (fsList(dirPath) ?? []) : [];
    const matches = entries.map((e) => e.dir ? e.name + "/" : e.name)
      .filter((n) => n.startsWith(base));
    if (matches.length === 1) {
      parts[parts.length - 1] = dirPart + matches[0];
      buffer = parts.join(" ");
      cursor = buffer.length;
      redrawInput();
    } else if (matches.length > 1) {
      line();
      line(matches.map((m) => cyan(m)).join("  "));
      term.write(promptStr() + buffer);
    }
  }
}

function handleKey(data) {
  if (pager) { pagerKey(data); return; }
  if (busy) return; // command executing — swallow keystrokes

  switch (data) {
    case "\r": // Enter
      busy = true;
      runCommand(buffer).finally(() => { busy = false; });
      return;

    case "\x03": // Ctrl-C
      term.write("^C");
      line();
      buffer = "";
      cursor = 0;
      term.write("\r" + promptStr());
      return;

    case "\x04": // Ctrl-D — empty line returns home, else delete forward
      if (buffer.length === 0) {
        line();
        goHome();
        term.write("\r" + promptStr());
      } else if (cursor < buffer.length) {
        buffer = buffer.slice(0, cursor) + buffer.slice(cursor + 1);
        redrawInput();
      }
      return;

    case "\x0c": // Ctrl-L
      term.clear();
      term.write("\r" + promptStr() + buffer);
      if (cursor < buffer.length) term.write(ESC + (buffer.length - cursor) + "D");
      return;

    case "\x10": // Ctrl-P — history up
      historyUp();
      return;

    case "\x0e": // Ctrl-N — history down
      historyDown();
      return;

    case "\x7f": // Backspace
      if (cursor > 0) {
        buffer = buffer.slice(0, cursor - 1) + buffer.slice(cursor);
        cursor--;
        redrawInput();
      }
      return;

    case "\x1b[A": // Up
      historyUp();
      return;

    case "\x1b[B": // Down
      historyDown();
      return;

    case "\x1b[C": // Right
      if (cursor < buffer.length) { cursor++; term.write(ESC + "1C"); }
      return;

    case "\x1b[D": // Left
      if (cursor > 0) { cursor--; term.write(ESC + "1D"); }
      return;

    case "\x1b[H": case "\x1b[1~": // Home
      if (cursor > 0) { term.write(ESC + cursor + "D"); cursor = 0; }
      return;

    case "\x1b[F": case "\x1b[4~": // End
      if (cursor < buffer.length) {
        term.write(ESC + (buffer.length - cursor) + "C");
        cursor = buffer.length;
      }
      return;

    case "\t": // Tab
      complete();
      return;

    default:
      if (data.length === 1 && data >= " " && data <= "~") {
        buffer = buffer.slice(0, cursor) + data + buffer.slice(cursor);
        cursor++;
        redrawInput();
      }
      return;
  }
}

function historyUp() {
  if (!history.length) return;
  histIdx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
  buffer = history[histIdx];
  cursor = buffer.length;
  redrawInput();
}

function historyDown() {
  if (histIdx < 0) return;
  histIdx++;
  if (histIdx >= history.length) {
    histIdx = -1;
    buffer = "";
  } else {
    buffer = history[histIdx];
  }
  cursor = buffer.length;
  redrawInput();
}

// xterm delivers each key as a complete chunk: single chars, or a full
// escape sequence like "\x1b[A" in one onData event.
term.onData(handleKey);

/* ------------------------------------------------------------------ */
/* Boot sequence                                                       */
/* ------------------------------------------------------------------ */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function boot() {
  const bootLines = [
    dim("BIOS date 09/21/2026 ver 24.05.12"),
    dim("POST: cpu ..... ok    ddr ..... ok"),
    dim("POST: tpm ..... ok    secure-boot verified"),
    "",
  ];
  for (const l of bootLines) {
    line(l);
    await sleep(150);
  }
  line(BANNER);
  line();
  term.write("\r" + promptStr());
  term.focus();

  // deep links: #resume or #cat%20bio%20|%20wc%20-l runs after boot
  const hash = (typeof location !== "undefined" && location.hash) || "";
  const auto = decodeURIComponent(hash.slice(1))
    .split(";").map((s) => s.trim()).filter(Boolean);
  for (const cmd of auto) {
    await sleep(350);
    line("\r" + ESC + "2K" + promptStr() + cmd);
    await runCommand(cmd);
  }
}

boot();
