(function () {
  const statuses = window.FEATURE_STATUSES;
  const priorities = window.FEATURE_PRIORITIES;
  const requests = window.FEATURE_REQUESTS;

  const statusSelect = document.getElementById("status-filter");
  const prioritySelect = document.getElementById("priority-filter");
  const rows = document.getElementById("request-rows");
  const summary = document.getElementById("summary");
  const resultCount = document.getElementById("result-count");
  const emptyState = document.getElementById("empty-state");

  const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

  // Single source of truth for all filters; every change merges into this
  // so updating one filter never resets the others.
  const filters = { status: "all", priority: "all" };
  const allowed = { status: statuses.map(slug), priority: priorities.map(slug) };

  const matches = (r, f) =>
    (f.status === "all" || slug(r.status) === f.status) &&
    (f.priority === "all" || slug(r.priority) === f.priority);

  // Counts for one dimension, respecting the other active filters.
  function countBy(key, values) {
    const others = { ...filters, [key]: "all" };
    const pool = requests.filter((r) => matches(r, others));
    const counts = Object.fromEntries(values.map((v) => [v, 0]));
    pool.forEach((r) => { counts[r[key]] = (counts[r[key]] || 0) + 1; });
    return { counts, total: pool.length };
  }

  function readUrl() {
    const params = new URLSearchParams(window.location.search);
    Object.keys(filters).forEach((key) => {
      const value = params.get(key);
      filters[key] = value && allowed[key].includes(value) ? value : "all";
    });
  }

  function syncUrl() {
    const url = new URL(window.location.href);
    Object.entries(filters).forEach(([key, value]) => {
      if (value === "all") url.searchParams.delete(key);
      else url.searchParams.set(key, value);
    });
    window.history.replaceState(null, "", url);
  }

  function renderOptions(select, key, values, allLabel) {
    const { counts, total } = countBy(key, values);
    const options = [["all", `${allLabel} (${total})`]].concat(
      values.map((v) => [slug(v), `${v} (${counts[v]})`])
    );
    select.replaceChildren(...options.map(([value, label]) => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = label;
      return opt;
    }));
    select.value = filters[key];
  }

  function renderSummary() {
    const { counts } = countBy("status", statuses);
    summary.replaceChildren(...statuses.map((s) => {
      const value = slug(s);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `card status-${value}`;
      btn.setAttribute("aria-pressed", String(filters.status === value));
      btn.innerHTML = `<span class="count"></span><span class="label"></span>`;
      btn.querySelector(".count").textContent = counts[s];
      btn.querySelector(".label").textContent = s;
      btn.addEventListener("click", () =>
        setFilters({ status: filters.status === value ? "all" : value })
      );
      return btn;
    }));
  }

  function renderRows() {
    const visible = requests
      .filter((r) => matches(r, filters))
      .sort((a, b) => b.votes - a.votes);

    rows.replaceChildren(...visible.map((r) => {
      const tr = document.createElement("tr");
      const cell = (content, className) => {
        const td = document.createElement("td");
        if (className) td.className = className;
        td.append(content);
        tr.appendChild(td);
      };
      const pill = (text, prefix) => {
        const span = document.createElement("span");
        span.className = `pill ${prefix}-${slug(text)}`;
        span.textContent = text;
        return span;
      };
      cell(r.id);
      cell(r.title);
      cell(r.requester);
      cell(String(r.votes), "num");
      cell(pill(r.priority, "priority"));
      cell(pill(r.status, "status"));
      cell(r.updated);
      return tr;
    }));

    emptyState.hidden = visible.length > 0;
    resultCount.textContent = `Showing ${visible.length} of ${requests.length}`;
  }

  function render() {
    renderOptions(statusSelect, "status", statuses, "All statuses");
    renderOptions(prioritySelect, "priority", priorities, "All priorities");
    renderSummary();
    renderRows();
  }

  function setFilters(changes) {
    Object.assign(filters, changes);
    syncUrl();
    render();
  }

  statusSelect.addEventListener("change", () => setFilters({ status: statusSelect.value }));
  prioritySelect.addEventListener("change", () => setFilters({ priority: prioritySelect.value }));

  readUrl();
  syncUrl();
  render();
})();
