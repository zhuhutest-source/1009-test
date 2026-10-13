(function () {
  const sections = [
    {
      title: "Planning",
      description: "Align the team on what is shipping and when.",
      tasks: [
        "Confirm launch goals and success metrics",
        "Lock the launch date and owner",
        "Review the final scope and known risks",
        "Share the launch plan with the team"
      ]
    },
    {
      title: "Content",
      description: "Prepare the materials customers and teammates need.",
      tasks: [
        "Finalize release notes",
        "Review screenshots, demos, and product copy",
        "Prepare the announcement and help documentation",
        "Create internal talking points"
      ]
    },
    {
      title: "Approvals",
      description: "Get the right people to review and sign off.",
      tasks: [
        "Complete product and engineering review",
        "Get legal, privacy, and security approval",
        "Confirm support and operations readiness",
        "Record final go / no-go decision"
      ]
    },
    {
      title: "Launch day",
      description: "Coordinate the rollout and keep everyone informed.",
      tasks: [
        "Run the launch-day smoke test",
        "Publish the announcement",
        "Monitor feedback and key metrics",
        "Post the launch recap and next steps"
      ]
    }
  ];

  const storageKey = "team-launch-checklist";
  const checklist = document.getElementById("checklist");
  const progressBar = document.getElementById("progress-bar");
  const progressLabel = document.getElementById("progress-label");
  const progressPercent = document.getElementById("progress-percent");
  const progressTrack = document.querySelector("[role='progressbar']");
  const resetButton = document.getElementById("reset-button");
  const totalTasks = sections.reduce((total, section) => total + section.tasks.length, 0);

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      return saved && typeof saved === "object" ? saved : {};
    } catch (error) {
      return {};
    }
  }

  let completed = loadState();

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completed));
    } catch (error) {
      // The checklist remains usable when storage is unavailable.
    }
  }

  function updateProgress() {
    const done = Object.values(completed).filter(Boolean).length;
    const percent = Math.round((done / totalTasks) * 100);
    progressBar.style.width = `${percent}%`;
    progressLabel.textContent = `${done} of ${totalTasks} tasks complete`;
    progressPercent.textContent = `${percent}%`;
    progressTrack.setAttribute("aria-valuenow", percent);
  }

  function render() {
    checklist.replaceChildren(...sections.map((section, sectionIndex) => {
      const card = document.createElement("section");
      card.className = "checklist-section";

      const heading = document.createElement("div");
      heading.className = "section-heading";
      heading.innerHTML = `<span class="section-number">${String(sectionIndex + 1).padStart(2, "0")}</span>`;
      const copy = document.createElement("div");
      const title = document.createElement("h2");
      title.textContent = section.title;
      const description = document.createElement("p");
      description.textContent = section.description;
      copy.append(title, description);
      heading.append(copy);
      card.append(heading);

      const list = document.createElement("div");
      list.className = "task-list";
      section.tasks.forEach((task, taskIndex) => {
        const id = `${sectionIndex}-${taskIndex}`;
        const label = document.createElement("label");
        label.className = "task";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Boolean(completed[id]);
        checkbox.addEventListener("change", () => {
          completed[id] = checkbox.checked;
          saveState();
          label.classList.toggle("complete", checkbox.checked);
          updateProgress();
        });
        const text = document.createElement("span");
        text.textContent = task;
        label.append(checkbox, text);
        label.classList.toggle("complete", checkbox.checked);
        list.append(label);
      });
      card.append(list);
      return card;
    }));
    updateProgress();
  }

  resetButton.addEventListener("click", () => {
    if (!window.confirm("Reset all checklist progress?")) return;
    completed = {};
    saveState();
    render();
  });

  render();
})();
