# Vertex Tutors — site files

## What's here
- `index.html`, `gcse.html`, `a-level.html`, `medicine-oxbridge.html`, `ucat.html`, `contact.html`
- `css/style.css` — one shared stylesheet for every page
- `js/main.js` — nav behaviour, scroll animations, contact form (shared across all pages)
- `js/ucat-demo.js` — the interactive UCAT timer/quiz widget (only runs on `ucat.html`)

Each page has its own `<header>` and `<footer>` copied in directly (no build step, no server
needed) — that's a deliberate simplification so the site works anywhere, including opened
straight from disk. The trade-off: if you change the nav or footer, you're editing it in six
places. If that gets annoying later, moving to Jekyll (which GitHub Pages runs natively) lets
you write the header/footer once — worth doing once the site is more settled.

## Publishing on GitHub Pages

1. Create a new repository on GitHub (public repos get free Pages hosting).
2. Push these files to the repo root:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → main → / (root) → Save.**
4. Your site goes live at `https://YOUR-USERNAME.github.io/YOUR-REPO/` within a couple of minutes.
5. Optional: add a custom domain under the same Pages settings once you own one (e.g. from
   Namecheap or Cloudflare) — GitHub gives you a CNAME record to point at.

## Before it's fully "real"

**Contact form.** Right now `contact.html`'s form just shows a success message locally — it
doesn't send anywhere, because GitHub Pages only serves static files (no backend to receive it).
Two ways to fix that without running your own server:
- **Formspree** (formspree.io) — sign up, get a form endpoint URL, then change the `<form>`
  tag in `contact.html` to `<form id="consultForm" action="https://formspree.io/f/YOUR_ID" method="POST">`.
  Free tier covers a small tutoring site easily.
- **Getform** (getform.io) — same idea, different provider.

Either way, you'd remove the `e.preventDefault()` line in `js/main.js`'s form handler (or adapt
it to show your success message *after* the fetch to the form endpoint succeeds), so it still
submits for real.

**Brand name.** "Vertex" is a placeholder — it appears in every page's header/footer and in
each page's `<title>`. Find-and-replace "Vertex" across all files once you've picked a real name.

**Testimonials.** The quote cards on `index.html` are marked "Sample" — swap in real ones once
you have your first few students, or ask me to replace that section with something else (an
"how it works" step-by-step, for instance) if you'd rather not use placeholders at all.

**Email address.** `hello@vertextutors.co.uk` is a placeholder in `contact.html` — swap for a
real inbox (Google Workspace or similar) once you've got a domain.
