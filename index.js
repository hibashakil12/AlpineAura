/* =========================================================
   ALPINE ASCENTS — HAZARD ATLAS
   js/script.js
   ========================================================= */

(function () {
  "use strict";

  const CATEGORY_ICON = {
    Terrain: "icon-terrain",
    Weather: "icon-weather",
    Altitude: "icon-altitude",
    Environmental: "icon-environmental",
    Technical: "icon-technical",
    Wildlife: "icon-wildlife",
    Human: "icon-human"
  };

  const RISK_VAR = {
    Low: "var(--risk-low)",
    Moderate: "var(--risk-moderate)",
    High: "var(--risk-high)",
    Extreme: "var(--risk-extreme)"
  };

  const RISK_EMOJI = {
    Low: "🟢",
    Moderate: "🟡",
    High: "🟠",
    Extreme: "🔴"
  };

  const state = {
    all: [],
    category: "All",
    risk: "All",
    query: ""
  };

  const grid = document.getElementById("hazard-grid");
  const resultCount = document.getElementById("result-count");
  const categoryFilters = document.getElementById("category-filters");
  const riskFilters = document.getElementById("risk-filters");
  const searchInput = document.getElementById("hazard-search");

  // ---------------------------------------------------------
  // Data loading — tries data/hazards.json first (works when
  // served over http/https or via a local dev server). Falls
  // back to an embedded copy so the page still works when
  // opened directly as a file:// URL, where fetch() of local
  // JSON is blocked by the browser.
  // ---------------------------------------------------------
  async function loadHazards() {
    try {
      const res = await fetch("data/hazards.json");
      if (!res.ok) throw new Error("bad response");
      return await res.json();
    } catch (err) {
      console.warn("Falling back to embedded hazard data (fetch of data/hazards.json failed — likely a file:// restriction). Run a local server for live JSON editing.");
      return window.HAZARD_FALLBACK_DATA || [];
    }
  }

  function uniqueCategories(data) {
    return [...new Set(data.map((h) => h.category))];
  }

  // ---------------------------------------------------------
  // Filter bar construction
  // ---------------------------------------------------------
  function buildFilters(data) {
    const categories = ["All", ...uniqueCategories(data)];
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "pill" + (cat === "All" ? " is-active" : "");
      btn.textContent = cat;
      btn.type = "button";
      btn.dataset.category = cat;
      btn.addEventListener("click", () => {
        state.category = cat;
        [...categoryFilters.querySelectorAll(".pill")].forEach((p) =>
          p.classList.toggle("is-active", p === btn)
        );
        render();
      });
      categoryFilters.appendChild(btn);
    });

    const risks = ["All", "Low", "Moderate", "High", "Extreme"];
    risks.forEach((risk) => {
      const btn = document.createElement("button");
      btn.className = "pill" + (risk === "All" ? " is-active" : "");
      btn.textContent = risk === "All" ? "All Levels" : risk;
      btn.type = "button";
      btn.dataset.risk = risk;
      btn.addEventListener("click", () => {
        state.risk = risk;
        [...riskFilters.querySelectorAll(".pill")].forEach((p) =>
          p.classList.toggle("is-active", p === btn)
        );
        render();
      });
      riskFilters.appendChild(btn);
    });
  }

  // ---------------------------------------------------------
  // Card rendering
  // ---------------------------------------------------------
  function cardTemplate(hazard) {
    const icon = CATEGORY_ICON[hazard.category] || "icon-terrain";
    const riskColor = RISK_VAR[hazard.risk] || RISK_VAR.Moderate;

    const card = document.createElement("article");
    card.className = "hazard-card";
    card.style.setProperty("--risk-color", riskColor);
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `${hazard.name} — ${hazard.risk} risk. View details.`);
    card.dataset.id = hazard.id;

    card.innerHTML = `
      <div class="hazard-card__top">
        <span class="hazard-card__icon"><svg><use href="#${icon}"/></svg></span>
        <span class="risk-pennant risk-pennant--${hazard.risk}">${RISK_EMOJI[hazard.risk]} ${hazard.risk}</span>
      </div>
      <div class="hazard-card__category">${hazard.category}</div>
      <h3>${hazard.name}</h3>
      <p>${hazard.description}</p>
      <span class="hazard-card__cta">View bulletin <svg viewBox="0 0 24 24"><use href="#icon-arrow"/></svg></span>
    `;

    card.addEventListener("click", () => openModal(hazard));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(hazard);
      }
    });

    return card;
  }

  function matchesFilters(h) {
    const catOk = state.category === "All" || h.category === state.category;
    const riskOk = state.risk === "All" || h.risk === state.risk;
    const q = state.query.trim().toLowerCase();
    const queryOk =
      !q ||
      h.name.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q) ||
      h.category.toLowerCase().includes(q);
    return catOk && riskOk && queryOk;
  }

  function render() {
    const filtered = state.all.filter(matchesFilters);
    grid.innerHTML = "";

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No hazards match those filters. Try a different category, risk level, or search term.";
      grid.appendChild(empty);
    } else {
      filtered.forEach((h) => grid.appendChild(cardTemplate(h)));
    }

    resultCount.textContent = `Showing ${filtered.length} of ${state.all.length} hazards`;
    observeCards();
  }

  // ---------------------------------------------------------
  // Scroll reveal
  // ---------------------------------------------------------
  let observer;
  function observeCards() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".hazard-card").forEach((c) => c.classList.add("is-visible"));
      return;
    }
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("is-visible"), i * 35);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".hazard-card:not(.is-visible)").forEach((c) => observer.observe(c));
  }

  // ---------------------------------------------------------
  // Modal
  // ---------------------------------------------------------
  const overlay = document.getElementById("modal-overlay");
  const modal = document.getElementById("hazard-modal");
  const modalClose = document.getElementById("modal-close");
  let lastFocused = null;

  function openModal(hazard) {
    document.getElementById("modal-category").textContent = hazard.category + " Hazard";
    document.getElementById("modal-title").textContent = hazard.name;
    document.getElementById("modal-meta").textContent =
      `${RISK_EMOJI[hazard.risk]} ${hazard.risk.toUpperCase()} RISK`;
    document.getElementById("modal-desc").textContent = hazard.description;
    document.getElementById("modal-warning").textContent = hazard.warningSigns;
    document.getElementById("modal-prevention").textContent = hazard.prevention;
    document.getElementById("modal-action").textContent = hazard.action;

    lastFocused = document.activeElement;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
  });

  // Basic focus trap within modal
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = modal.querySelectorAll("button, [href], input, [tabindex]:not([tabindex='-1'])");
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // ---------------------------------------------------------
  // Search
  // ---------------------------------------------------------
  let searchTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = e.target.value;
      render();
    }, 150);
  });

  // ---------------------------------------------------------
  // Init
  // ---------------------------------------------------------
  loadHazards().then((data) => {
    state.all = data;
    buildFilters(data);
    render();
  });
})();