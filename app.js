(function () {
  const statuses = window.FEATURE_STATUSES;
  const requests = window.FEATURE_REQUESTS;

  const select = document.getElementById("status-filter");
  const rows = document.getElementById("request-rows");
  const summary = document.getElementById("summary");
  const resultCount = document.getElementById("result-count");
  const emptyState = document.getElementById("empty-state");

  const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

  function countByStatus() {
    const counts = Object.fromEntries(statuses.map((s) => [s, 0]));
    requests.forEach((r) => { counts[r.status] = (counts[r.status] || 0) + 1; });
    return counts;
  }

  function statusFromUrl() {
    const value = new URLSearchParams(window.location.search).get("status");
    return value && statuses.some((s) => slug(s) === value) ? value : "all";
  }

  function syncUrl(value) {
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("status");
    else url.searchParams.set("status", value);
    // Browsers may reject history updates for file:// URLs; filtering still works.
    try {
      window.history.replaceState(null, "", url);
    } catch (error) {
      // Keep the static dashboard usable when opened directly from disk.
    }
  }

  function renderOptions(counts) {
    statuses.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = slug(s);
      opt.textContent = `${s} (${counts[s]})`;
      select.appendChild(opt);
    });
    select.options[0].textContent = `All statuses (${requests.length})`;
  }

  function renderSummary(counts, active) {
    summary.replaceChildren(...statuses.map((s) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `card status-${slug(s)}`;
      btn.setAttribute("aria-pressed", String(active === slug(s)));
      btn.innerHTML = `<span class="count"></span><span class="label"></span>`;
      btn.querySelector(".count").textContent = counts[s];
      btn.querySelector(".label").textContent = s;
      btn.addEventListener("click", () => applyFilter(active === slug(s) ? "all" : slug(s)));
      return btn;
    }));
  }

  function renderRows(active) {
    const visible = requests
      .filter((r) => active === "all" || slug(r.status) === active)
      .sort((a, b) => b.votes - a.votes);

    rows.replaceChildren(...visible.map((r) => {
      const tr = document.createElement("tr");
      [r.id, r.title, r.requester, r.votes].forEach((value, i) => {
        const td = document.createElement("td");
        td.textContent = value;
        if (i === 3) td.className = "num";
        tr.appendChild(td);
      });
      const statusTd = document.createElement("td");
      const pill = document.createElement("span");
      pill.className = `pill status-${slug(r.status)}`;
      pill.textContent = r.status;
      statusTd.appendChild(pill);
      tr.appendChild(statusTd);
      const updated = document.createElement("td");
      updated.textContent = r.updated;
      tr.appendChild(updated);
      return tr;
    }));

    emptyState.hidden = visible.length > 0;
    resultCount.textContent = `Showing ${visible.length} of ${requests.length}`;
  }

  const counts = countByStatus();

  function applyFilter(value) {
    select.value = value;
    syncUrl(value);
    renderSummary(counts, value);
    renderRows(value);
  }

  renderOptions(counts);
  select.addEventListener("change", () => applyFilter(select.value));
  applyFilter(statusFromUrl());
})();
