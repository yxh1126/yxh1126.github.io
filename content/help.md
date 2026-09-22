# Help

This site is a terminal. Documents are commands — `index`, `help`, `resume` —
and tools live in `/bin`.

## commands

- `ls [dir]`    list a directory (try `ls /bin`)
- `cat <path>`  print a document (no clear; pipe-friendly)
- `head [path]` first lines (`head -n 5 resume`, `cat resume | head`)
- `tail [path]` last lines (`tail -n 3 resume`)
- `grep <pat>`  filter lines (`cat resume | grep secure`)
- `find [path]` walk the FS (`find /bin -type f`, `find -name resume`)
- `tree [path]` draw the FS as a tree
- `more [path]` page a document or stdin (space/b/q)
- `less [path]` same pager, with PageUp/PageDown
- `cd <dir>`    change directory (`cd /bin`, `cd ..`, `cd /`)
- `clear`       clear the screen
- `wc`          count lines/words/bytes from stdin
- `exit`        return to the home page (same as Ctrl-D on an empty line)

## tips

- Run a page like `resume` to open it (clears the screen).
- Pipes work: `cat resume | wc -l`.
- Paths: `./projects`, `/help`, `../`.
- History: ↑/↓ or Ctrl-P/N. Cancel: Ctrl-C. Clear: Ctrl-L.
