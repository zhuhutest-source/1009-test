# Feature Request Dashboard

A static dashboard for tracking feature requests alongside the [Q3 roadmap](Q3-Roadmap.md). It uses plain HTML, CSS, and JavaScript, so there are no dependencies and no build step.

## Run locally

Open `index.html` in a browser. Optionally, serve the folder:

```sh
python -m http.server 8000
# then visit http://localhost:8000
```

## Features

- Summary cards with the number of requests in each status. Click a card to filter by that status, and click it again to clear the filter.
- **Status** and **Priority** dropdown filters. They combine: changing one keeps the other's current value. Each option's count reflects the other active filter.
- The selected filters are saved in the URL (for example, `?status=in-progress&priority=high`), so filtered views can be bookmarked and shared.
- Requests are sorted by votes.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page markup |
| `styles.css` | Styling and status colors |
| `data.js` | Status and priority lists and sample feature requests (edit this to change the data) |
| `app.js` | Rendering and filter logic |
