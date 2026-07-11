# Promotion Checklist

On-repo discoverability levers you run yourself (need your own GitHub/npm auth). Nothing here executes automatically.

## 1. GitHub repo topics

Topics power GitHub's topic-browse and search surfaces. Set them in **Settings → Topics**, or run:

```bash
gh repo edit diyonfinesco/any-pattern \
  --add-topic ascii-art \
  --add-topic cli \
  --add-topic terminal \
  --add-topic typescript \
  --add-topic nodejs \
  --add-topic figlet-alternative \
  --add-topic text-art \
  --add-topic banner
```

## 2. GitHub social preview image

Biggest visual lever for link shares (Twitter/X, Slack, Discord unfurls). Add one in **Settings → General → Social preview** (1280×640 recommended). Reuse the logo/demo GIF frame so shared links show art, not a blank card.

## 3. npm

- Republish after the `package.json` description + keywords update so npm's search index picks them up (`npm publish` — bumps require a version change).
- The description and keywords are the main npm search-ranking signals you control; they're now tuned in `package.json`.

## 4. Awesome-list PRs

Free, permanent backlinks + steady discovery. Submit a one-line entry to:

- [awesome-nodejs](https://github.com/sindresorhus/awesome-nodejs) — CLI / command-line section
- [awesome-cli-apps](https://github.com/agarrharr/awesome-cli-apps) — Terminal / fun section
- terminal- and ASCII-focused awesome lists (search GitHub for `awesome terminal`, `awesome ascii`)

Suggested entry line:

```markdown
- [any-pattern](https://github.com/diyonfinesco/any-pattern) - Colorful ASCII art banners, shapes, animals & moods for your terminal. CLI + TypeScript API.
```

## 5. Demo GIF

Record `npx any-pattern` in action (banner + `shape --rainbow` + a `mood`), export as GIF, upload via a GitHub issue/PR comment to get a persistent `user-attachments` URL, then replace the placeholder in `ReadMe.md` (see the `TODO(demo gif)` comment there).

## 6. Off-repo (your accounts)

Not in this repo, but highest-spike potential — post from your own accounts:

- **Show HN** — hook: zero-config ASCII art toolkit, rainbow gradient renderer, CLI + pure render API.
- **r/node**, **r/commandline** — short demo GIF + one-line pitch.
- **dev.to** — a "figlet vs any-pattern" comparison post ranks well and drives curiosity clicks.
