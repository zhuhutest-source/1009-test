# Team launch checklist and feature dashboard

This repository contains two small static tools for the product team:

- **Team launch checklist** — a four-section checklist for planning, content, approvals, and launch day. Completion progress is saved in the browser.
- **Feature request dashboard** — a status-filterable view of sample feature requests alongside the [Q3 roadmap](Q3-Roadmap.md).

Both tools use plain HTML, CSS, and JavaScript. There are no dependencies and no build step.

## Run locally

To open the launch checklist directly, open `launch-checklist.html` in a browser. To open the feature dashboard, open `index.html`.

For a local HTTP server, run:

```sh
python -m http.server 8000
# then visit http://localhost:8000/launch-checklist.html
```

The checklist works offline and stores its checked items in `localStorage` for the current browser. Use **Reset checklist** to clear the saved progress.

## Files

| File | Purpose |
|---|---|
| `launch-checklist.html` | Checklist page markup |
| `launch-checklist.css` | Checklist layout and styling |
| `launch-checklist.js` | Checklist sections, progress, and browser persistence |
| `index.html` | Feature dashboard page |
| `styles.css` | Dashboard styling and status colors |
| `data.js` | Dashboard status list and sample requests |
| `app.js` | Dashboard rendering and filter logic |
