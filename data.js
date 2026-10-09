// Sample feature request data. Loaded as a plain script so the dashboard works over file://.
window.FEATURE_STATUSES = ["New", "Under review", "Planned", "In progress", "Shipped", "Declined"];

window.FEATURE_PRIORITIES = ["High", "Medium", "Low"];

window.FEATURE_REQUESTS = [
  { id: "FR-101", title: "Dark mode for the canvas editor", requester: "Maya Johnson", votes: 42, status: "In progress", priority: "High", updated: "2026-09-28" },
  { id: "FR-102", title: "Export roadmap to GitHub issues", requester: "Jordan Blake", votes: 35, status: "Planned", priority: "High", updated: "2026-09-22" },
  { id: "FR-103", title: "M365 calendar grounding for milestones", requester: "Elena Volkov", votes: 28, status: "Under review", priority: "Medium", updated: "2026-10-02" },
  { id: "FR-104", title: "Keyboard shortcuts cheat sheet", requester: "Liam Chen", votes: 19, status: "Shipped", priority: "Low", updated: "2026-08-30" },
  { id: "FR-105", title: "Bulk edit milestone owners", requester: "Priya Nair", votes: 14, status: "New", priority: "Medium", updated: "2026-10-07" },
  { id: "FR-106", title: "Slack notifications for blocked items", requester: "Sam Ortiz", votes: 23, status: "Planned", priority: "Medium", updated: "2026-09-18" },
  { id: "FR-107", title: "Custom status colors", requester: "Ana Silva", votes: 9, status: "Declined", priority: "Low", updated: "2026-09-05" },
  { id: "FR-108", title: "CSV import for risks", requester: "Jordan Blake", votes: 17, status: "Under review", priority: "Low", updated: "2026-10-04" },
  { id: "FR-109", title: "Offline mode for dogfood testers", requester: "Liam Chen", votes: 11, status: "New", priority: "High", updated: "2026-10-08" },
  { id: "FR-110", title: "Launch readiness scorecard", requester: "Maya Johnson", votes: 31, status: "In progress", priority: "High", updated: "2026-10-01" },
  { id: "FR-111", title: "Share read-only dashboard links", requester: "Elena Volkov", votes: 26, status: "Shipped", priority: "Medium", updated: "2026-09-12" }
];
