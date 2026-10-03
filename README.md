# Portfolio — Om Vilas Shinde
Static portfolio (HTML, CSS, vanilla JS) for GitHub Pages. No backend, no API keys.

## Structure
`index.html` · `css/` (style, responsive) · `js/` (config, projects, gallery, main) · `assets/` (images, projects, resume, icons) · `favicon.svg`

## Run locally
Open `index.html` in a browser, or run `python -m http.server 8000` and visit http://localhost:8000.

## Deploy
1. Create a GitHub repo and upload all files (keep `index.html` at the root).
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. Site goes live at `https://USERNAME.github.io/REPOSITORY/` in about a minute.

## Customize
- **Name, email, phone, GitHub, LinkedIn, socials, about text, skills, education, experience, certifications, achievements, stats:** `js/config.js`. Values like `[ADD LINK]` are hidden automatically.
- **Projects:** add an object to the `projects` array in `js/projects.js` (use a unique `id`). No HTML edits needed.
- **Project images:** `assets/projects/project-XX/cover.jpg`, `image-01.jpg`, … (paths set in `projects.js`). Missing images show a "PROJECT IMAGE" placeholder.
- **Profile photo:** `assets/images/profile.jpg`. **Resume:** `assets/resume/resume.pdf`.
- **Certifications:** add `{name, org, date, id, link}` objects to `certifications` in config.js.
- **Skills:** edit the `skills` array in config.js.
- **Colors:** CSS variables at the top of `css/style.css` (`--accent`, `--a2`, `--bg`...; light theme under `[data-theme=light]`).
- **Fonts:** change the Google Fonts `<link>` in `index.html` and the font names in `style.css`.
- All paths are relative (`assets/...`), so it works under a repo sub-path.
