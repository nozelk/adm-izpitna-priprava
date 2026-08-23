(() => {
  "use strict";

  const DATA = window.ADM_DATA || {
    meta: { title: "Algebra in diskretna matematika — teorija", subtitle: "Priprava na teorijski izpit" },
    topics: [], flashcards: [], quiz: [], questions: [], exercises: [], sources: []
  };

  const view = document.querySelector("#view");
  const breadcrumb = document.querySelector("#breadcrumb");
  const sidebar = document.querySelector("#sidebar");
  const sidebarScrim = document.querySelector("#sidebar-scrim");
  const toastEl = document.querySelector("#toast");
  const searchInput = document.querySelector("#global-search");
  const searchResults = document.querySelector("#search-results");

  if (!view || !breadcrumb || !sidebar || !sidebarScrim || !toastEl || !searchInput || !searchResults) {
    throw new Error("ADM Teorija: manjka osnovni element uporabniškega vmesnika.");
  }

  const topics = Array.isArray(DATA.topics) ? DATA.topics : [];
  const flashcards = Array.isArray(DATA.flashcards) ? DATA.flashcards : [];
  const quizItems = Array.isArray(DATA.quiz) ? DATA.quiz : [];
  const questions = Array.isArray(DATA.questions) ? DATA.questions : [];
  const sources = Array.isArray(DATA.sources) ? DATA.sources : [];
  const topicById = new Map(topics.map(topic => [topic.id, topic]));
  const sourceById = new Map(sources.map(source => [source.id, source]));
  const STORAGE_KEY = DATA.meta?.storageKey || "admTheoryAtlasStateV1";

  const ROUTE_LABELS = {
    domov: "Pregled",
    nacrt: "Učni načrt",
    teorija: "Vsa teorija",
    izreki: "Definicije in izreki",
    vprasanja: "Teorijska vprašanja",
    kartice: "Kartice",
    kviz: "Kviz",
    izpit: "Teorijski izpit",
    viri: "Viri"
  };

  const GROUP_LABELS = {
    logic: "Logika, množice in relacije",
    logika: "Logika, množice in relacije",
    "logika-mnozice": "Logika, množice in relacije",
    counting: "Kombinatorika",
    kombinatorika: "Kombinatorika",
    algebra: "Teorija števil in algebra",
    "number-algebra": "Teorija števil in algebra",
    "stevila-algebra": "Teorija števil in algebra",
    stevila: "Teorija števil in algebra",
    graphs: "Grafi",
    grafi: "Grafi"
  };

  const KIND_LABELS = {
    definition: "Definicija",
    theorem: "Izrek",
    proof: "Dokaz",
    example: "Primer",
    counterexample: "Protiprimer",
    pitfall: "Izpitna past",
    method: "Postopek",
    explanation: "Razlaga",
    proposition: "Trditev",
    lemma: "Lema",
    corollary: "Posledica",
    identity: "Identiteta",
    recap: "Povzetek",
    theory: "Teorija",
    exam: "Teorijski izpit",
    "old-exam": "Teorijski izpit"
  };

  let toastTimer = 0;
  let examTimer = 0;
  let mathRuntimeWarningShown = false;
  const persisted = readStorage();
  const state = {
    completedTopics: toSet(persisted.completedTopics),
    checkedChecklist: toSet(persisted.checkedChecklist),
    knownCards: toSet(persisted.knownCards),
    theoryAnswers: objectOrEmpty(persisted.theoryAnswers),
    selfRatings: objectOrEmpty(persisted.selfRatings),
    quizBest: Number(persisted.quizBest) || 0,
    lastTopic: persisted.lastTopic || topics[0]?.id || "",
    flashFilter: persisted.flashFilter || "core",
    flashDeck: [],
    flashIndex: 0,
    flashFlipped: false,
    quizSession: null,
    theoryGroup: "all",
    theoremKind: "all",
    questionTopic: "all",
    questionStatus: "all",
    questionOrigin: "all",
    selectedQuestions: toSet(persisted.selectedQuestions),
    openQuestionHints: new Set(),
    openModelAnswers: new Set(),
    openExamHints: new Set(),
    currentExamId: persisted.currentExamId || null,
    examSessions: objectOrEmpty(persisted.examSessions)
  };
  const questionIds = new Set(questions.map(question => question.id));
  state.selectedQuestions = new Set([...state.selectedQuestions].filter(id => questionIds.has(id)));

  function toSet(value) {
    return new Set(Array.isArray(value) ? value.filter(item => typeof item === "string") : []);
  }

  function objectOrEmpty(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  }

  function readStorage() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function persist(update = true) {
    const payload = {
      completedTopics: [...state.completedTopics],
      checkedChecklist: [...state.checkedChecklist],
      knownCards: [...state.knownCards],
      theoryAnswers: state.theoryAnswers,
      selfRatings: state.selfRatings,
      quizBest: state.quizBest,
      lastTopic: state.lastTopic,
      flashFilter: state.flashFilter,
      selectedQuestions: [...state.selectedQuestions],
      currentExamId: state.currentExamId,
      examSessions: state.examSessions
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      toast("Brskalnik ni mogel shraniti napredka.");
    }
    if (update) updateProgress();
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[char]);
  }

  function stripHtml(value = "") {
    const template = document.createElement("template");
    template.innerHTML = String(value);
    return (template.content.textContent || "").replace(/\s+/g, " ").trim();
  }

  function normalize(value = "") {
    return stripHtml(value).toLocaleLowerCase("sl").normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
  }

  function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function officialFormulationCount(collection = questions) {
    return collection.reduce((count, question) => {
      const variants = Array.isArray(question.officialVariants) ? question.officialVariants.length : 0;
      return count + (variants || (question.official ? 1 : 0));
    }, 0);
  }

  function groupLabel(group) {
    if (!group) return "Splošno";
    return GROUP_LABELS[group] || String(group).replaceAll("-", " ").replace(/^./, char => char.toUpperCase());
  }

  function kindLabel(kind) {
    return KIND_LABELS[kind] || String(kind || "vsebina").replaceAll("-", " ").replace(/^./, char => char.toUpperCase());
  }

  function importanceWeight(value) {
    if (typeof value === "number") return value;
    const normalized = normalize(value);
    if (["nujno", "must", "kljucno", "zelo visoka", "a"].includes(normalized)) return 4;
    if (["visoka", "high", "pomembno", "b"].includes(normalized)) return 3;
    if (["srednja", "medium", "c"].includes(normalized)) return 2;
    return 1;
  }

  function importanceLabel(value) {
    const weight = importanceWeight(value);
    return weight >= 4 ? "nujno za izpit" : weight === 3 ? "visoka prioriteta" : weight === 2 ? "srednja prioriteta" : "dopolnilno";
  }

  function difficultyScore(value) {
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 0) return Math.min(4, Math.max(1, Math.round(numeric)));
    const label = normalize(value);
    if (["zelo tezko", "zelo zahtevno", "expert"].includes(label)) return 4;
    if (["tezko", "zahtevno", "hard"].includes(label)) return 3;
    if (["srednje", "srednje zahtevno", "medium"].includes(label)) return 2;
    return 1;
  }

  function difficultyLabel(value) {
    const score = difficultyScore(value);
    return `${["", "osnovno", "srednje", "težko", "zelo težko"][score]} · ${score}/4`;
  }

  function sourceTitle(reference) {
    if (!reference) return "Gradivo";
    if (typeof reference === "string") return sourceById.get(reference)?.title || reference;
    const id = reference.sourceId || reference.id;
    const source = sourceById.get(id);
    const pages = reference.pages || reference.page;
    return `${reference.title || source?.title || id || "Gradivo"}${pages ? ` · str. ${pages}` : ""}`;
  }

  function sourceHref(reference) {
    if (!reference) return "";
    if (typeof reference === "object" && reference.file) return reference.file;
    const id = typeof reference === "string" ? reference : (reference.sourceId || reference.id);
    return sourceById.get(id)?.file || "";
  }

  function toast(message) {
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add("show");
    toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  function routeInfo() {
    const raw = location.hash.replace(/^#\/?/, "") || "domov";
    const [path, query = ""] = raw.split("?");
    return { parts: path.split("/").filter(Boolean), params: new URLSearchParams(query) };
  }

  function setView(html, targetId = "") {
    clearInterval(examTimer);
    view.innerHTML = html;
    typesetMath(view);
    view.classList.remove("view-enter");
    void view.offsetWidth;
    view.classList.add("view-enter");
    requestAnimationFrame(() => {
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) target.scrollIntoView({ block: "start" });
      else window.scrollTo({ top: 0, behavior: "auto" });
      view.focus({ preventScroll: true });
    });
  }

  function markMalformedRuntimeDelimiters(root) {
    const delimiterPairs = new Map([["\\(", "\\)"], ["\\[", "\\]"], ["$$", "$$"]]);
    const delimiters = ["\\(", "\\)", "\\[", "\\]", "$$"];
    const ignoredSelector = "script, noscript, style, textarea, pre, code, .katex, .answer-editor";
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let malformedCount = 0;
    let textNode;

    const findDuplicatedDelimiterOutsideMath = value => {
      let cursor = 0;
      let expectedClose = "";
      while (cursor < value.length) {
        let found = null;
        delimiters.forEach(delimiter => {
          const index = value.indexOf(delimiter, cursor);
          if (index !== -1 && (!found || index < found.index)) found = { delimiter, index };
        });
        if (!found) return "";
        const precededBySlash = found.delimiter.startsWith("\\") &&
          found.index > 0 && value[found.index - 1] === "\\";
        if (precededBySlash) {
          if (!expectedClose) return `\\${found.delimiter}`;
          cursor = found.index + found.delimiter.length;
          continue;
        }
        if (!expectedClose && delimiterPairs.has(found.delimiter)) {
          expectedClose = delimiterPairs.get(found.delimiter);
        } else if (expectedClose === found.delimiter) {
          expectedClose = "";
        }
        cursor = found.index + found.delimiter.length;
      }
      return "";
    };

    while ((textNode = walker.nextNode())) {
      const parent = textNode.parentElement;
      if (!parent || parent.closest(ignoredSelector)) continue;
      const delimiter = findDuplicatedDelimiterOutsideMath(textNode.data);
      if (!delimiter) continue;
      malformedCount += 1;
      parent.classList.add("math-delimiter-error", "math-error");
      console.error(
        `ADM Teorija — podvojen runtime KaTeX delimiter '${delimiter}'.`,
        textNode.data.trim().slice(0, 180)
      );
    }
    return malformedCount;
  }

  function typesetMath(root) {
    markMalformedRuntimeDelimiters(root);

    const missingMathRuntime = [];
    if (!window.katex) missingMathRuntime.push("katex.min.js");
    if (typeof window.renderMathInElement !== "function") missingMathRuntime.push("auto-render.min.js");
    if (missingMathRuntime.length) {
      root.classList.add("math-render-unavailable");
      if (!mathRuntimeWarningShown) {
        mathRuntimeWarningShown = true;
        const message = `Matematični prikaz ni naložen (${missingMathRuntime.join(", ")}).`;
        console.error(`ADM Teorija — ${message} Preveri lokalne vendor/katex datoteke.`);
        toast(`${message} Osveži stran po popravku datotek.`);
      }
      return;
    }
    root.classList.remove("math-render-unavailable");

    root.querySelectorAll("[data-tex]:not([data-math-ready])").forEach(node => {
      const fallback = node.textContent;
      try {
        window.katex.render(node.dataset.tex, node, {
          displayMode: node.dataset.display === "block",
          output: "htmlAndMathml",
          throwOnError: true,
          strict: "ignore",
          trust: false
        });
        node.dataset.mathReady = "true";
      } catch (error) {
        node.textContent = fallback;
        node.classList.add("math-error");
        console.warn("ADM Teorija — KaTeX:", error.message);
      }
    });

    window.renderMathInElement(root, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false },
        { left: "$$", right: "$$", display: true }
      ],
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
      ignoredClasses: ["katex", "answer-editor", "math-delimiter-error"],
      throwOnError: false,
      strict: "ignore",
      macros: {
        "\\N": "\\mathbb{N}", "\\Z": "\\mathbb{Z}", "\\Q": "\\mathbb{Q}",
        "\\R": "\\mathbb{R}", "\\C": "\\mathbb{C}"
      }
    });
  }

  function checklistItemId(topic, item, index) {
    const ownId = item && typeof item === "object" ? item.id : "";
    return `${topic.id}::${ownId || index + 1}`;
  }

  function checklistItemText(item) {
    return typeof item === "string" ? item : (item?.text || item?.label || item?.title || "Korak opravljen");
  }

  function progressStats() {
    const validTopics = topics.filter(topic => state.completedTopics.has(topic.id)).length;
    const checklistKeys = topics.flatMap(topic => (topic.checklist || []).map((item, index) => checklistItemId(topic, item, index)));
    const checked = checklistKeys.filter(key => state.checkedChecklist.has(key)).length;
    const total = topics.length + checklistKeys.length;
    const done = validTopics + checked;
    return { validTopics, checked, checklistTotal: checklistKeys.length, total, done, percent: total ? Math.round(done / total * 100) : 0 };
  }

  function updateProgress() {
    const stats = progressStats();
    const ring = document.querySelector(".ring-value");
    const label = document.querySelector("#sidebar-progress span");
    const copy = document.querySelector("#progress-copy");
    if (ring) ring.style.strokeDashoffset = String(119.38 * (1 - stats.percent / 100));
    if (label) label.textContent = `${stats.percent}%`;
    if (copy) copy.textContent = `${stats.validTopics}/${topics.length} tem · ${stats.checked}/${stats.checklistTotal} korakov`;
  }

  function updateChrome(parts) {
    const base = parts[0] || "domov";
    document.querySelectorAll(".main-nav a").forEach(link => {
      link.classList.toggle("active", link.dataset.route === base || (base === "teorija" && link.dataset.route === "teorija"));
    });
    const topic = base === "teorija" && parts[1] ? topicById.get(parts[1]) : null;
    const current = topic?.title || ROUTE_LABELS[base] || "Pregled";
    breadcrumb.innerHTML = `ADM Teorija <span>/</span> ${escapeHtml(current)}`;
    document.title = `${current} — ADM Teorija`;
  }

  function openMobileMenu() {
    sidebar.classList.add("open");
    sidebarScrim.hidden = false;
    document.querySelector("#mobile-menu")?.setAttribute("aria-expanded", "true");
  }

  function closeMobileMenu() {
    sidebar.classList.remove("open");
    sidebarScrim.hidden = true;
    document.querySelector("#mobile-menu")?.setAttribute("aria-expanded", "false");
  }

  function topicCard(topic) {
    const done = state.completedTopics.has(topic.id);
    return `<a class="topic-card ${done ? "done" : ""}" href="#/teorija/${escapeHtml(topic.id)}" data-number="${escapeHtml(topic.number)}" style="--accent:${escapeHtml(topic.accent || "#67dfb1")}">
      <div class="topic-card-top"><span>${escapeHtml(groupLabel(topic.group))}</span>${done ? '<i class="done-mark">✓</i>' : `<span>${escapeHtml(importanceLabel(topic.importance))}</span>`}</div>
      <h3>${topic.title || "Neimenovana tema"}</h3>
      <p>${topic.short || ""}</p>
      <footer>${Number(topic.minutes) || 30} min · ${(topic.sections || []).length} sklopov</footer>
    </a>`;
  }

  function emptyState(title, copy = "Vsebina še ni dodana.") {
    return `<div class="empty-state"><strong>${escapeHtml(title)}</strong>${escapeHtml(copy)}</div>`;
  }

  function renderHome() {
    const stats = progressStats();
    const next = topicById.get(state.lastTopic) || topics.find(topic => !state.completedTopics.has(topic.id)) || topics[0];
    const priority = [...topics].sort((a, b) => importanceWeight(b.importance) - importanceWeight(a.importance) || a.number - b.number).slice(0, 3);
    const rated = Object.values(state.selfRatings).filter(value => Number(value) > 0).length;
    const coreBlocks = topics.flatMap(topic => (topic.sections || []).filter(section => ["definition", "theorem", "proof", "lemma", "proposition", "corollary", "identity"].includes(section.kind)));
    const officialFormulations = officialFormulationCount();
    setView(`
      <section class="hero">
        <span class="eyebrow">Samo teorija · samo teorijski viri</span>
        <h1 class="hero-title">Najprej razumeš.<br><em>Nato dokažeš.</em></h1>
        <p class="hero-lead">Vsebina je izdelana izključno iz sedmih PDF-jev v mapi <strong>teorija</strong> in treh PDF-jev v mapi <strong>izpit teorija</strong>. Vsak pojem vodi od natančne definicije prek razlage in izreka do dokaza, primera, protiprimera ter samostojnega odgovora.</p>
        <div class="hero-actions">
          <a class="button" href="#/teorija/${escapeHtml(next?.id || "")}">${state.completedTopics.size ? "Nadaljuj z učenjem" : "Začni s teorijo"}</a>
          <a class="button secondary" href="#/vprasanja">Odgovarjaj brez zapiskov</a>
          <a class="button secondary" href="#/izpit">Sestavi teorijski izpit</a>
        </div>
      </section>

      <section class="stat-grid" aria-label="Statistika gradiva">
        <article class="stat-card"><small>Celotna teorija</small><strong>${topics.length}</strong><span>poglobljenih tem</span></article>
        <article class="stat-card"><small>Jedro snovi</small><strong>${coreBlocks.length}</strong><span>definicij, izrekov in dokazov</span></article>
        <article class="stat-card"><small>Izpit teorija</small><strong>${officialFormulations}</strong><span>uradnih formulacij iz PDF-jev</span></article>
        <article class="stat-card"><small>Tvoj napredek</small><strong>${stats.percent}%</strong><span>${rated} samoocenjenih odgovorov</span></article>
      </section>

      <div class="section-head"><div><span class="eyebrow">Najprej obvladaj jedro</span><h2>Teorijske prioritete</h2></div><p>Razvrstitev temelji samo na teorijskih zapiskih in ponovitvah v teorijskih izpitih.</p></div>
      <section class="focus-strip">${priority.length ? priority.map((topic, index) => `
        <a class="focus-card" ${index === 0 ? 'data-tone="hot"' : ""} href="#/teorija/${escapeHtml(topic.id)}" style="text-decoration:none">
          <small>${escapeHtml(importanceLabel(topic.importance))}</small><h3>${topic.title}</h3><p>${topic.examNote || topic.short || ""}</p>
        </a>`).join("") : emptyState("Teme se še nalagajo")}</section>

      <div class="section-head"><div><span class="eyebrow">Učni zemljevid</span><h2>Vse teme</h2></div><a class="button secondary small" href="#/nacrt">Odpri učni načrt →</a></div>
      <section class="topic-grid">${topics.length ? topics.map(topicCard).join("") : emptyState("Ni naloženih tem")}</section>`);
  }

  function renderPlan() {
    const groups = unique(topics.map(topic => topic.group));
    const phases = groups.map((group, index) => {
      const groupTopics = topics.filter(topic => topic.group === group);
      const minutes = groupTopics.reduce((sum, topic) => sum + (Number(topic.minutes) || 30), 0);
      return `<article class="plan-day">
        <time>FAZA ${String(index + 1).padStart(2, "0")}</time>
        <div><h3>${escapeHtml(groupLabel(group))}</h3><p>${groupTopics.map(topic => topic.title).join(" · ")}</p></div>
        <span>≈ ${minutes} min teorije</span>
      </article>`;
    });
    setView(`
      <header class="page-head"><span class="eyebrow">Aktivno učenje</span><h1 class="page-title">Učni načrt</h1><p class="page-lead">Vsako fazo naredi v treh prehodih: najprej razumevanje, nato zapis definicij in dokazov, na koncu odgovor brez gledanja.</p></header>
      <section class="focus-strip">
        <article class="focus-card" data-tone="hot"><small>1 · Razumi</small><h3>Teorija in primer</h3><p>Preberi definicijo, povej jo po domače in preveri mejo pojma s protiprimerom.</p></article>
        <article class="focus-card"><small>2 · Utemelji</small><h3>Izrek in dokaz</h3><p>Vedno loči predpostavke, sklep in idejo dokaza.</p></article>
        <article class="focus-card"><small>3 · Prikliči</small><h3>Odgovori sam</h3><p>Najprej napiši odgovor, šele nato odpri vzorčni odgovor in se oceni.</p></article>
      </section>
      <div class="section-head"><div><span class="eyebrow">Predlagani vrstni red</span><h2>En krog čez predmet</h2></div><p>Časi so ocena za prvi temeljit prehod. Ponovitve naj bodo krajše in aktivne.</p></div>
      <section class="study-plan">${phases.length ? phases.join("") : emptyState("Načrt še nima tem")}</section>
      <div class="hero-actions"><a class="button" href="#/teorija">Začni prvi prehod</a><a class="button secondary" href="#/kartice">Hitra ponovitev</a><a class="button secondary" href="#/vprasanja">Preveri odgovore</a></div>`);
  }

  function renderTheoryIndex() {
    const groups = unique(topics.map(topic => topic.group));
    const filtered = state.theoryGroup === "all" ? topics : topics.filter(topic => topic.group === state.theoryGroup);
    setView(`
      <header class="page-head"><span class="eyebrow">Od intuicije do dokaza</span><h1 class="page-title">Vsa teorija</h1><p class="page-lead">Vsaka tema vsebuje natančne definicije, ključne izreke, dokazne ideje, primere, protiprimere in izpitne pasti.</p></header>
      <div class="filter-bar"><button class="filter-button ${state.theoryGroup === "all" ? "active" : ""}" data-action="theory-filter" data-value="all" type="button">Vse teme</button>${groups.map(group => `<button class="filter-button ${state.theoryGroup === group ? "active" : ""}" data-action="theory-filter" data-value="${escapeHtml(group)}" type="button">${escapeHtml(groupLabel(group))}</button>`).join("")}</div>
      <section class="topic-grid">${filtered.length ? filtered.map(topicCard).join("") : emptyState("V tem sklopu ni tem")}</section>`);
  }

  function renderTopic(topic, targetId = "") {
    state.lastTopic = topic.id;
    persist();
    const done = state.completedTopics.has(topic.id);
    const sections = Array.isArray(topic.sections) ? topic.sections : [];
    const sourceLinks = (topic.sources || []).map(reference => {
      const href = sourceHref(reference);
      return href ? `<a class="tag" href="${escapeHtml(encodeURI(href))}" target="_blank" rel="noopener">↗ ${escapeHtml(sourceTitle(reference))}</a>` : `<span class="tag">${escapeHtml(sourceTitle(reference))}</span>`;
    }).join("");
    const content = sections.map((section, index) => {
      const id = section.id || `sklop-${index + 1}`;
      return `<section class="theory-section" id="${escapeHtml(id)}" data-kind="${escapeHtml(section.kind || "theory")}" data-label="${escapeHtml(section.label || kindLabel(section.kind))}">
        <h2>${section.title || "Sklop"}</h2>${section.html || ""}
      </section>`;
    }).join("");
    const checklist = (topic.checklist || []).map((item, index) => {
      const key = checklistItemId(topic, item, index);
      return `<label class="check-item"><input type="checkbox" data-checklist="${escapeHtml(key)}" ${state.checkedChecklist.has(key) ? "checked" : ""}><span>${checklistItemText(item)}</span></label>`;
    }).join("");
    const relatedQuestions = questions.filter(question => question.topic === topic.id).length;
    const topicIndex = topics.findIndex(item => item.id === topic.id);
    const previous = topics[topicIndex - 1];
    const next = topics[topicIndex + 1];

    setView(`
      <header class="topic-hero" style="--accent:${escapeHtml(topic.accent || "#67dfb1")}">
        <div><span class="topic-number">Tema ${escapeHtml(topic.number)} · ${escapeHtml(groupLabel(topic.group))}</span><h1>${topic.title}</h1><p>${topic.short || ""}</p>
          <div class="tag-row" style="margin-top:16px">${(topic.outcomes || []).map(outcome => `<span class="tag">${outcome}</span>`).join("")}</div>
        </div>
        <aside class="topic-meta">
          <div><span>Prioriteta</span><strong>${escapeHtml(importanceLabel(topic.importance))}</strong></div>
          <div><span>Predviden čas</span><strong>${Number(topic.minutes) || 30} min</strong></div>
          <div><span>Teorijska vprašanja</span><strong>${relatedQuestions}</strong></div>
          <div class="topic-actions"><button class="button ${done ? "secondary" : ""} small" type="button" data-action="toggle-topic" data-topic="${escapeHtml(topic.id)}">${done ? "Označi za ponovitev" : "Označi kot opravljeno"}</button>${relatedQuestions ? `<button class="button secondary small" type="button" data-action="export-topic-pdf" data-topic="${escapeHtml(topic.id)}" data-testid="topic-pdf-export">PDF vprašanj te teme</button>` : ""}</div>
        </aside>
      </header>
      ${topic.examNote ? `<aside class="focus-card" data-tone="hot" style="margin-bottom:16px"><small>Izpitni signal</small><h3>Kaj moraš znati povedati</h3><p>${topic.examNote}</p></aside>` : ""}
      <div class="topic-layout">
        <nav class="topic-toc" aria-label="Kazalo teme"><strong>Na tej strani</strong>${sections.map((section, index) => `<a href="#/teorija/${escapeHtml(topic.id)}?section=${encodeURIComponent(section.id || `sklop-${index + 1}`)}">${index + 1}. ${section.title}</a>`).join("")}${topic.checklist?.length ? `<a href="#/teorija/${escapeHtml(topic.id)}?section=preveri-temo">Preveri temo</a>` : ""}</nav>
        <article class="content-stack">${content || emptyState("Vsebina teme še ni dodana")}
          ${topic.checklist?.length ? `<section class="theory-section" id="preveri-temo" data-kind="recap" data-label="Aktivni priklic"><h2>Preden označiš temo</h2><div class="checklist">${checklist}</div><div class="hero-actions"><a class="button secondary small" href="#/vprasanja?topic=${escapeHtml(topic.id)}">Odgovori na ${relatedQuestions} vprašanj →</a></div></section>` : ""}
          <section class="theory-section" data-kind="recap" data-label="Viri in nadaljevanje"><h2>Od kod je vsebina</h2><div class="tag-row">${sourceLinks || '<span class="tag">Viri so navedeni v gradivu</span>'}</div><div class="hero-actions">${previous ? `<a class="button secondary small" href="#/teorija/${escapeHtml(previous.id)}">← ${previous.title}</a>` : '<a class="button secondary small" href="#/teorija">← Vse teme</a>'}${next ? `<a class="button small" href="#/teorija/${escapeHtml(next.id)}">${next.title} →</a>` : '<a class="button small" href="#/vprasanja">Na vprašanja →</a>'}</div></section>
        </article>
      </div>`, targetId);
  }

  function renderTheorems() {
    const statementKinds = new Set(["theorem", "lemma", "proposition", "corollary", "identity"]);
    const allowedKinds = new Set(["definition", "proof", ...statementKinds]);
    const entries = topics.flatMap(topic => (topic.sections || [])
      .filter(section => allowedKinds.has(section.kind))
      .map(section => ({ topic, section })));
    const filtered = state.theoremKind === "all"
      ? entries
      : state.theoremKind === "theorem"
        ? entries.filter(entry => statementKinds.has(entry.section.kind))
        : entries.filter(entry => entry.section.kind === state.theoremKind);
    setView(`
      <header class="page-head"><span class="eyebrow">Jedro za ustni odgovor</span><h1 class="page-title">Definicije in izreki</h1><p class="page-lead">Zbrani formalni zapisi iz vseh tem. Pri izreku vedno povej predpostavke, zaključek in vsaj idejo dokaza.</p></header>
      <div class="filter-bar">${[
        ["all", "Vse"], ["definition", "Definicije"], ["theorem", "Izreki, leme in posledice"], ["proof", "Dokazi"]
      ].map(([value, label]) => `<button class="filter-button ${state.theoremKind === value ? "active" : ""}" data-action="theorem-filter" data-value="${value}" type="button">${label}</button>`).join("")}</div>
      <section class="theorem-list">${filtered.length ? filtered.map(({ topic, section }) => `
        <article class="theorem-card">
          <header class="theorem-head"><div><div class="question-meta"><span class="tag">${escapeHtml(groupLabel(topic.group))}</span><span class="tag">${escapeHtml(kindLabel(section.kind))}</span></div><h3>${section.title}</h3></div><a class="button secondary small" href="#/teorija/${escapeHtml(topic.id)}?section=${encodeURIComponent(section.id)}">V temo →</a></header>
          <div class="theorem-body">${section.html || ""}</div>
        </article>`).join("") : emptyState("Ni zadetkov", "Za ta filter ni definicij, izrekov ali dokazov.")}</section>`);
  }

  function filteredQuestions() {
    let result = questions.filter(question => state.questionTopic === "all" || question.topic === state.questionTopic);
    if (state.questionOrigin === "official") result = result.filter(question => question.official);
    if (state.questionOrigin === "notes") result = result.filter(question => !question.official);
    if (state.questionStatus === "unrated") result = result.filter(question => !Number(state.selfRatings[question.id]));
    if (state.questionStatus === "repeat") result = result.filter(question => Number(state.selfRatings[question.id]) === 1);
    if (state.questionStatus === "known") result = result.filter(question => Number(state.selfRatings[question.id]) === 3);
    return result;
  }

  function questionCard(question, index) {
    const topic = topicById.get(question.topic);
    const answer = state.theoryAnswers[question.id] || "";
    const rating = Number(state.selfRatings[question.id]) || 0;
    const hintOpen = state.openQuestionHints.has(question.id);
    const answerOpen = state.openModelAnswers.has(question.id);
    const selected = state.selectedQuestions.has(question.id);
    const source = sourceTitle(question.source);
    const officialVariants = Array.isArray(question.officialVariants) ? question.officialVariants.filter(variant => variant?.prompt) : [];
    const headingId = `question-title-${question.id}`;
    return `<article class="question-card ${selected ? "selected" : ""}" id="question-${escapeHtml(question.id)}" data-question-card="${escapeHtml(question.id)}" data-testid="question-card" aria-labelledby="${escapeHtml(headingId)}">
      <header class="question-head">
        <div class="question-title-block">
          <div class="question-kicker"><span class="question-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><span>teorijsko vprašanje</span></div>
          <div class="question-meta"><span class="tag">${escapeHtml(topic?.title || question.topic)}</span><span class="tag">zahtevnost ${escapeHtml(difficultyLabel(question.difficulty))}</span>${question.official || officialVariants.length ? '<span class="tag official">iz teorijskega izpita</span>' : ""}${question.source ? `<span class="tag">${escapeHtml(source)}</span>` : ""}</div>
          <h3 id="${escapeHtml(headingId)}">${question.prompt || "Vprašanje"}</h3>
          ${officialVariants.length ? `<aside class="official-wording"><strong>Uradna formulacija</strong>${officialVariants.map(variant => `<div><p>${variant.prompt}</p>${variant.source ? `<small>${escapeHtml(sourceTitle(variant.source))}</small>` : ""}</div>`).join("")}</aside>` : ""}
        </div>
        <label class="question-select" title="Dodaj vprašanje v PDF">
          <input type="checkbox" data-question-select="${escapeHtml(question.id)}" data-testid="question-select" aria-label="Izberi vprašanje ${index + 1} za PDF" ${selected ? "checked" : ""}>
          <span><strong>${selected ? "Izbrano" : "Izberi"}</strong><small>za PDF</small></span>
        </label>
      </header>
      <div class="question-body">
        <details class="answer-workspace" ${answer ? "data-has-draft=\"true\"" : ""}>
          <summary><span><strong>Napiši svoj odgovor</strong><small>${answer ? "Osnutek je lokalno shranjen" : "Aktivni priklic brez gledanja"}</small></span><span aria-hidden="true">⌄</span></summary>
          <label><span class="sr-only">Tvoj odgovor</span><textarea class="answer-editor" data-question-answer="${escapeHtml(question.id)}" placeholder="Definicija · pogoji · trditev · dokazna ideja · primer ali protiprimer …">${escapeHtml(answer)}</textarea></label>
        </details>
        <div class="answer-actions">
          ${question.hint ? `<button class="button secondary small" type="button" data-action="question-hint" data-question="${escapeHtml(question.id)}">${hintOpen ? "Skrij namig" : "Pokaži namig"}</button>` : ""}
          <button class="button secondary small" type="button" data-action="model-answer" data-question="${escapeHtml(question.id)}">${answerOpen ? "Skrij vzorčni odgovor" : "Odpri vzorčni odgovor"}</button>
        </div>
        ${hintOpen ? `<aside class="hint-box"><h4>Namig</h4>${question.hint}</aside>` : ""}
        ${answerOpen ? `<aside class="model-answer"><h4>Vzorčni odgovor</h4>${question.answer || "Odgovor še ni dodan."}<div class="self-rating" aria-label="Samoocena">${[[1, "Ponovi"], [2, "Skoraj"], [3, "Znam"]].map(([value, label]) => `<button class="${rating === value ? "active" : ""}" type="button" data-action="self-rate" data-question="${escapeHtml(question.id)}" data-value="${value}">${label}</button>`).join("")}</div></aside>` : ""}
      </div>
    </article>`;
  }

  function updateQuestionSelectionUi() {
    const count = state.selectedQuestions.size;
    document.querySelectorAll("[data-selected-question-count]").forEach(node => { node.textContent = String(count); });
    document.querySelectorAll("[data-question-card]").forEach(card => {
      const id = card.dataset.questionCard;
      const selected = state.selectedQuestions.has(id);
      card.classList.toggle("selected", selected);
      const input = card.querySelector("[data-question-select]");
      if (input) input.checked = selected;
      const strong = card.querySelector(".question-select strong");
      if (strong) strong.textContent = selected ? "Izbrano" : "Izberi";
    });
    document.querySelectorAll("[data-action='export-selected-pdf']").forEach(button => { button.disabled = count === 0; });
    document.querySelectorAll("[data-action='clear-question-selection']").forEach(button => { button.disabled = count === 0; });
  }

  function printableHtml(html) {
    const container = document.createElement("div");
    container.innerHTML = html || "";
    typesetMath(container);
    return container.innerHTML;
  }

  function fileSlug(value) {
    return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70) || "vprasanja";
  }

  function exportQuestionsPdf(collection, scopeLabel = "Izbrana vprašanja") {
    const order = new Map(questions.map((question, index) => [question.id, index]));
    const seen = new Set();
    const items = collection.filter(question => question && !seen.has(question.id) && seen.add(question.id))
      .sort((a, b) => (order.get(a.id) || 0) - (order.get(b.id) || 0));
    if (!items.length) {
      toast("Najprej izberi vsaj eno vprašanje.");
      return;
    }

    const printWindow = window.open("", "_blank", "width=980,height=760");
    if (!printWindow) {
      toast("Brskalnik je preprečil PDF-predogled. Dovoli pojavna okna in poskusi znova.");
      return;
    }

    const katexCssHref = new URL("vendor/katex/katex.min.css", document.baseURI).href;
    const title = `ADM-${fileSlug(scopeLabel)}`;
    const pages = items.map((question, index) => {
      const topic = topicById.get(question.topic);
      const renderedPrompt = printableHtml(question.prompt || "Vprašanje");
      return `<article class="pdf-question" data-testid="pdf-question-page">
        <div class="pdf-page-inner">
          <header class="pdf-header"><span>ADM · TEORIJSKA VPRAŠANJA</span><span>${index + 1} / ${items.length}</span></header>
          <div class="pdf-meta"><span>${escapeHtml(topic ? `Tema ${topic.number} · ${topic.title}` : question.topic)}</span>${question.official ? "<span>vprašanje iz teorijskega izpita</span>" : ""}</div>
          <h1>${renderedPrompt}</h1>
        </div>
        <footer><span>${escapeHtml(scopeLabel)}</span><span>${escapeHtml(sourceTitle(question.source))}</span></footer>
      </article>`;
    }).join("");

    printWindow.document.open();
    printWindow.document.write(`<!doctype html><html lang="sl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><link rel="stylesheet" href="${escapeHtml(katexCssHref)}"><style>
      @page{size:A4 portrait;margin:0}
      *{box-sizing:border-box}html,body{margin:0;background:#e7e7e3;color:#172019;font-family:Arial,Helvetica,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .print-help{position:sticky;z-index:20;top:0;display:flex;align-items:center;justify-content:center;gap:18px;padding:13px 18px;background:#172019;color:#fff;box-shadow:0 8px 25px #0003;font-size:14px}
      .print-help strong{color:#c8f36a}.print-help button{padding:9px 14px;border:0;border-radius:7px;background:#c8f36a;color:#172019;font-weight:800;cursor:pointer}
      .pdf-question{--pdf-scale:1;position:relative;width:210mm;height:295mm;margin:12mm auto;padding:17mm 18mm 15mm;overflow:hidden;page-break-inside:avoid;page-break-after:always;background:#fff;box-shadow:0 8px 32px #0002}
      .pdf-question:last-child{page-break-after:auto}.pdf-page-inner{max-height:254mm;overflow:hidden}
      .pdf-header{display:flex;justify-content:space-between;padding-bottom:4mm;border-bottom:.45mm solid #172019;color:#4b5b50;font-size:calc(8.5pt * var(--pdf-scale));font-weight:800;letter-spacing:.08em}
      .pdf-meta{display:flex;flex-wrap:wrap;gap:2mm;margin:7mm 0 4mm}.pdf-meta span{padding:1.5mm 2.5mm;border:.25mm solid #cbd2cc;border-radius:99px;color:#445249;font-size:calc(8.5pt * var(--pdf-scale));font-weight:700}
      h1{margin:0 0 8mm;font-family:Georgia,'Times New Roman',serif;font-size:calc(23pt * var(--pdf-scale));line-height:1.25;letter-spacing:-.015em}h1 p{margin:0}
      .katex{font-size:1em}.katex-display{margin:3mm 0;overflow:hidden}.pdf-question footer{position:absolute;right:18mm;bottom:8mm;left:18mm;display:flex;justify-content:space-between;gap:6mm;padding-top:2.5mm;border-top:.2mm solid #d3d8d4;color:#657168;font-size:7.5pt}.pdf-question footer span:last-child{text-align:right}
      @media print{html,body{width:210mm;margin:0!important;background:#fff}.print-help{display:none!important}.pdf-question{width:210mm;height:295mm;margin:0!important;box-shadow:none}}
    </style></head><body><div class="print-help" data-testid="pdf-save-help"><strong>PDF je pripravljen.</strong><span>V tiskalnem oknu izberi <b>Shrani kot PDF</b>. Vsako vprašanje je na svoji strani.</span><button type="button" onclick="window.print()">Odpri tiskanje</button></div>${pages}</body></html>`);
    printWindow.document.close();
    printWindow.opener = null;

    const preparePrint = async () => {
      try {
        if (printWindow.document.fonts?.ready) await printWindow.document.fonts.ready;
        printWindow.document.querySelectorAll(".pdf-question").forEach(page => {
          const inner = page.querySelector(".pdf-page-inner");
          let scale = 1;
          while (inner && inner.scrollHeight > inner.clientHeight && scale > 0.68) {
            scale = Math.max(0.68, scale - 0.04);
            page.style.setProperty("--pdf-scale", scale.toFixed(2));
          }
        });
        printWindow.focus();
        printWindow.print();
      } catch {
        toast("Predogled je odprt. V njem klikni »Odpri tiskanje« in izberi »Shrani kot PDF«.");
      }
    };
    if (printWindow.document.readyState === "complete") preparePrint();
    else printWindow.addEventListener("load", preparePrint, { once: true });
    toast(`Pripravljenih je ${items.length} vprašanj · eno na vsaki strani.`);
  }

  function renderQuestions(params = new URLSearchParams()) {
    const requestedTopic = params.get("topic");
    if (requestedTopic && topicById.has(requestedTopic)) {
      state.questionTopic = requestedTopic;
      state.questionOrigin = "all";
      state.questionStatus = "all";
    }
    const requestedQuestion = params.get("question");
    const requestedItem = requestedQuestion ? questions.find(question => question.id === requestedQuestion) : null;
    if (requestedItem) {
      if (state.questionTopic !== "all" && state.questionTopic !== requestedItem.topic) state.questionTopic = requestedItem.topic;
      if ((state.questionOrigin === "official" && !requestedItem.official) || (state.questionOrigin === "notes" && requestedItem.official)) state.questionOrigin = "all";
      const rating = Number(state.selfRatings[requestedItem.id]) || 0;
      const hiddenByStatus = (state.questionStatus === "unrated" && rating > 0) ||
        (state.questionStatus === "repeat" && rating !== 1) ||
        (state.questionStatus === "known" && rating !== 3);
      if (hiddenByStatus) state.questionStatus = "all";
    }
    const topicOptions = topics.filter(topic => questions.some(question => question.topic === topic.id));
    const filtered = filteredQuestions();
    const topicQuestions = state.questionTopic === "all" ? [] : questions.filter(question => question.topic === state.questionTopic);
    const selectedTopic = topicById.get(state.questionTopic);
    const rated = questions.filter(question => Number(state.selfRatings[question.id]) > 0).length;
    setView(`
      <header class="page-head question-page-head"><span class="eyebrow">Piši, razloži, dokaži</span><h1 class="page-title">Teorijska vprašanja</h1><p class="page-lead">Vprašanja so prikazana v izpitni obliki, brez vnaprej razkritih namigov ali meril. Svoj odgovor, namig in vzorčni odgovor odpreš šele, ko jih želiš uporabiti.</p></header>
      <section class="question-controls" data-testid="question-controls">
        <div class="question-filter-grid">
          <label><span>Tema</span><select id="question-topic" aria-label="Tema vprašanj" data-testid="question-topic-filter"><option value="all">Vse teme</option>${topicOptions.map(topic => `<option value="${escapeHtml(topic.id)}" ${state.questionTopic === topic.id ? "selected" : ""}>${topic.number} · ${topic.title}</option>`).join("")}</select></label>
          <label><span>Vir</span><select id="question-origin" aria-label="Vir vprašanj"><option value="all" ${state.questionOrigin === "all" ? "selected" : ""}>Vsa teorijska vprašanja</option><option value="official" ${state.questionOrigin === "official" ? "selected" : ""}>Iz teorijskih izpitov</option><option value="notes" ${state.questionOrigin === "notes" ? "selected" : ""}>Iz teorijskih PDF-jev</option></select></label>
          <label><span>Znanje</span><select id="question-status" aria-label="Stanje odgovorov"><option value="all" ${state.questionStatus === "all" ? "selected" : ""}>Vsa vprašanja</option><option value="unrated" ${state.questionStatus === "unrated" ? "selected" : ""}>Še neocenjena</option><option value="repeat" ${state.questionStatus === "repeat" ? "selected" : ""}>Za ponovitev</option><option value="known" ${state.questionStatus === "known" ? "selected" : ""}>Znam</option></select></label>
          <div class="question-filter-result"><strong>${filtered.length}</strong><span>prikazanih</span><small>${rated}/${questions.length} samoocenjenih</small></div>
        </div>
        <div class="question-selection-bar" data-testid="question-selection-toolbar">
          <div class="selection-count" aria-live="polite"><strong><span data-selected-question-count>${state.selectedQuestions.size}</span> izbranih</strong><small>Izbor se shrani v tem brskalniku.</small></div>
          <div class="selection-actions">
            <button class="button secondary small" type="button" data-action="select-visible-questions" data-testid="select-visible-questions">Izberi prikazana (${filtered.length})</button>
            ${selectedTopic ? `<button class="button secondary small" type="button" data-action="select-topic-questions" data-topic="${escapeHtml(selectedTopic.id)}" data-testid="select-topic-questions">Izberi celo temo (${topicQuestions.length})</button>` : ""}
            <button class="button secondary small" type="button" data-action="select-all-questions">Izberi vsa (${questions.length})</button>
            <button class="button ghost small" type="button" data-action="clear-question-selection" ${state.selectedQuestions.size ? "" : "disabled"}>Počisti</button>
          </div>
          <div class="pdf-actions">
            ${selectedTopic ? `<button class="button secondary" type="button" data-action="export-topic-pdf" data-topic="${escapeHtml(selectedTopic.id)}" data-testid="export-topic-pdf">PDF: vsa vprašanja teme</button>` : ""}
            <button class="button" type="button" data-action="export-selected-pdf" data-testid="export-selected-pdf" ${state.selectedQuestions.size ? "" : "disabled"}>PDF izbranih vprašanj</button>
          </div>
          <p class="pdf-help">PDF vsebuje samo vprašanja in prostor za odgovor — brez namigov, meril ali rešitev. V A4-predogledu izberi <strong>Shrani kot PDF</strong>; vsako vprašanje je na svoji strani.</p>
        </div>
      </section>
      <div class="question-list-heading"><span>${selectedTopic ? `Tema ${escapeHtml(selectedTopic.number)} · ${selectedTopic.title}` : "Celotna teorijska banka"}</span><button class="button secondary small" type="button" data-action="random-question">Naključno vprašanje</button></div>
      <section class="question-list" data-testid="question-list">${filtered.length ? filtered.map(questionCard).join("") : emptyState("Ni vprašanj", "Spremeni enega od filtrov in znova prikaži vprašanja.")}</section>`, requestedQuestion ? `question-${requestedQuestion}` : "");
    updateQuestionSelectionUi();
  }

  function resetFlashDeck(filter = state.flashFilter, shuffled = false, requestedId = "") {
    state.flashFilter = filter;
    let pool = flashcards.filter(card => filter === "all" || (filter === "core" ? card.core : card.topic === filter));
    if (!pool.length && filter === "core") pool = flashcards;
    if (shuffled) pool = shuffle(pool);
    state.flashDeck = pool.map(card => card.id);
    const requestedIndex = requestedId ? state.flashDeck.indexOf(requestedId) : -1;
    state.flashIndex = requestedIndex >= 0 ? requestedIndex : 0;
    state.flashFlipped = false;
    persist();
  }

  function renderFlashcards(params = new URLSearchParams()) {
    const requestedId = params.get("card") || "";
    const requestedCard = requestedId ? flashcards.find(card => card.id === requestedId) : null;
    if (requestedCard && state.flashFilter !== "all" && state.flashFilter !== requestedCard.topic && !(state.flashFilter === "core" && requestedCard.core)) {
      state.flashFilter = requestedCard.topic;
    }
    if (!state.flashDeck.length || requestedId) resetFlashDeck(state.flashFilter, false, requestedId);
    const deck = state.flashDeck.map(id => flashcards.find(card => card.id === id)).filter(Boolean);
    if (!deck.length) {
      setView(`<header class="page-head"><span class="eyebrow">Aktivni priklic</span><h1 class="page-title">Kartice</h1></header>${emptyState("Ni kartic", "Za izbrani filter ni kartic.")}`);
      return;
    }
    state.flashIndex = Math.min(state.flashIndex, deck.length - 1);
    const card = deck[state.flashIndex];
    const topic = topicById.get(card.topic);
    const known = state.knownCards.has(card.id);
    setView(`
      <header class="page-head"><span class="eyebrow">Aktivni priklic</span><h1 class="page-title">Kartice</h1><p class="page-lead">Odgovori na glas, nato obrni kartico. Preslednica obrne; puščici menjata kartico.</p></header>
      <section class="flash-shell">
        <article class="flash-card" tabindex="0" role="button" data-action="flash-flip" aria-label="Obrni kartico">
          <small>${escapeHtml(topic?.title || card.topic)} · ${known ? "označeno: znam" : "vprašanje"}</small>
          ${state.flashFlipped ? `<div class="flash-answer" style="margin-top:70px">${card.back}</div>` : `<h2>${card.front}</h2>`}
          <div class="flash-hint">${state.flashFlipped ? "Odgovor še enkrat povej s svojimi besedami." : "Klikni ali pritisni preslednico za odgovor."}</div>
        </article>
        <aside class="flash-controls">
          <label><span class="eyebrow">Izbor</span><select id="flash-filter"><option value="core" ${state.flashFilter === "core" ? "selected" : ""}>Ključne kartice</option><option value="all" ${state.flashFilter === "all" ? "selected" : ""}>Vse kartice</option>${topics.map(item => `<option value="${escapeHtml(item.id)}" ${state.flashFilter === item.id ? "selected" : ""}>${item.number} · ${item.title}</option>`).join("")}</select></label>
          <span class="flash-counter">${state.flashIndex + 1} / ${deck.length} · ${state.knownCards.size} označenih “znam”</span>
          <button class="button secondary" type="button" data-action="flash-shuffle">Premešaj</button>
          <div class="answer-actions"><button class="button secondary small" type="button" data-action="flash-prev">← Prejšnja</button><button class="button secondary small" type="button" data-action="flash-next">Naslednja →</button></div>
          <button class="button ${known ? "danger" : ""}" type="button" data-action="${known ? "flash-repeat" : "flash-known"}">${known ? "↺ Ponovi" : "Znam ✓"}</button>
        </aside>
      </section>`);
  }

  function renderQuiz() {
    const session = state.quizSession;
    if (!session) {
      setView(`
        <header class="page-head"><span class="eyebrow">Takojšnja povratna informacija</span><h1 class="page-title">Kviz</h1><p class="page-lead">Izberi temo in dolžino kroga. Pri vsakem odgovoru dobiš razlago, zato napačen odgovor spremeni v novo kartico za razumevanje.</p></header>
        <section class="config-card" style="max-width:760px"><div class="exam-config">
          <div class="config-card"><label for="quiz-topic">Tema</label><select id="quiz-topic"><option value="all">Vse teme</option>${topics.map(topic => `<option value="${escapeHtml(topic.id)}">${topic.number} · ${topic.title}</option>`).join("")}</select></div>
          <div class="config-card"><label for="quiz-count">Število vprašanj</label><select id="quiz-count"><option value="5">5</option><option value="10" selected>10</option><option value="20">20</option></select></div>
          <div class="config-card"><label>Najboljši rezultat</label><strong style="color:var(--lime);font-size:30px">${state.quizBest}%</strong></div>
        </div><div class="hero-actions"><button class="button" type="button" data-action="quiz-start">Začni kviz →</button></div></section>`);
      return;
    }

    if (session.finished) {
      const percent = session.items.length ? Math.round(session.score / session.items.length * 100) : 0;
      const copy = percent >= 85 ? "Odlično. Zdaj enak pojem še razloži brez možnosti." : percent >= 65 ? "Dobra osnova. Ponovi razlage pri napačnih odgovorih." : "Vrni se na definicije in naredi nov, krajši krog.";
      setView(`<section class="quiz-shell"><header class="page-head"><span class="eyebrow">Rezultat</span><h1 class="page-title">Krog je končan</h1></header><div class="score-orbit">${percent}%</div><h2 style="text-align:center">${session.score} / ${session.items.length} pravilno</h2><p class="page-lead" style="margin-inline:auto;text-align:center">${copy}</p><div class="hero-actions" style="justify-content:center"><button class="button" type="button" data-action="quiz-reset">Nov krog</button><a class="button secondary" href="#/teorija">Nazaj na teorijo</a></div></section>`);
      return;
    }

    const item = session.items[session.index];
    const response = session.responses[session.index];
    const topic = topicById.get(item.topic);
    const progress = (session.index + 1) / session.items.length * 100;
    setView(`<section class="quiz-shell"><div class="question-meta"><span class="tag">Vprašanje ${session.index + 1}/${session.items.length}</span><span class="tag">${escapeHtml(topic?.title || item.topic)}</span><span class="tag">${session.score} pravilno</span></div><div class="quiz-progress"><span style="width:${progress}%"></span></div><article class="quiz-question"><h2>${item.prompt}</h2><div class="quiz-options">${item.choices.map((choice, index) => {
      let className = "";
      if (response && choice.correct) className = "correct";
      else if (response && response.index === index && !choice.correct) className = "wrong";
      return `<button class="quiz-option ${className}" type="button" data-action="quiz-answer" data-index="${index}" ${response ? "disabled" : ""}><span>${String.fromCharCode(65 + index)}</span><b>${choice.text}</b></button>`;
    }).join("")}</div>${response ? `<div class="quiz-feedback"><strong>${response.correct ? "Pravilno." : "Ne še."}</strong> ${item.explanation || ""}</div><div class="hero-actions"><button class="button" type="button" data-action="quiz-next">${session.index + 1 === session.items.length ? "Poglej rezultat" : "Naslednje →"}</button></div>` : ""}</article></section>`);
  }

  function startQuiz() {
    const topic = document.querySelector("#quiz-topic")?.value || "all";
    const count = Math.max(1, Number(document.querySelector("#quiz-count")?.value) || 10);
    const pool = quizItems.filter(item => topic === "all" || item.topic === topic);
    if (!pool.length) {
      toast("Za ta izbor še ni kviz vprašanj.");
      return;
    }
    const selected = shuffle(pool).slice(0, Math.min(count, pool.length)).map(item => ({
      ...item,
      choices: shuffle((item.options || []).map((text, index) => ({ text, correct: index === Number(item.correct) })))
    }));
    state.quizSession = { items: selected, index: 0, score: 0, responses: [], finished: false };
    renderQuiz();
  }

  function orderedGroups(collection = topics) {
    const order = { logic: 1, logika: 1, "logika-mnozice": 1, counting: 2, kombinatorika: 2, algebra: 3, "number-algebra": 3, "stevila-algebra": 3, stevila: 3, graphs: 4, grafi: 4 };
    return unique(collection.map(item => item.group)).sort((a, b) => (order[a] || 50) - (order[b] || 50));
  }

  function isProofQuestion(question) {
    const text = normalize([question.prompt, ...(question.tags || []), ...(question.rubric || [])].join(" "));
    return ["dokaz", "dokazi", "dokazi", "utemelji", "izpelji"].some(word => text.includes(word));
  }

  function toExamItem(question) {
    return {
      id: question.id,
      sourceType: "question",
      topic: question.topic,
      group: topicById.get(question.topic)?.group || question.group || "other",
      prompt: question.prompt,
      hint: question.hint || "",
      modelAnswer: question.answer || "",
      rubric: question.rubric || [],
      source: sourceTitle(question.source),
      difficulty: difficultyScore(question.difficulty),
      points: Number(question.points) || 10,
      official: Boolean(question.official)
    };
  }

  function createExam(poolMode, duration) {
    const stamp = new Date();
    const candidates = poolMode === "official" ? questions.filter(question => question.official) : [...questions];
    const targetCount = poolMode === "official" ? 3 : 4;
    const selected = [];
    const selectedIds = new Set();
    const selectedGroups = new Set();
    const groupOf = question => topicById.get(question.topic)?.group || question.group || "other";
    const add = question => {
      if (!question || selectedIds.has(question.id)) return false;
      selected.push(question);
      selectedIds.add(question.id);
      selectedGroups.add(groupOf(question));
      return true;
    };

    // Vsak poskus vsebuje vsaj eno vprašanje »dokaži/utemelji«. Pri celotni
    // teoriji je začetno vprašanje, če je mogoče, hkrati iz starega teorijskega izpita.
    const proofPool = candidates.filter(isProofQuestion);
    const preferredProofs = poolMode === "official" ? proofPool : proofPool.filter(question => question.official);
    add(shuffle(preferredProofs.length ? preferredProofs : proofPool)[0]);

    for (const group of shuffle(unique(candidates.map(groupOf)))) {
      if (selected.length >= targetCount) break;
      if (selectedGroups.has(group)) continue;
      const pool = candidates.filter(question => groupOf(question) === group && !selectedIds.has(question.id));
      add(shuffle(pool)[0]);
    }

    for (const question of shuffle(candidates)) {
      if (selected.length >= targetCount) break;
      add(question);
    }

    if (selected.length < targetCount) {
      toast(`Za ta teorijski izpit potrebujem vsaj ${targetCount} primernih vprašanj.`);
      return null;
    }

    const items = selected.slice(0, targetCount).map(toExamItem);
    const id = `ADM-T-${String(stamp.getFullYear()).slice(-2)}${String(stamp.getMonth() + 1).padStart(2, "0")}${String(stamp.getDate()).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const session = {
      id,
      type: "theory",
      poolMode,
      duration,
      created: stamp.toISOString(),
      startedAt: Date.now(),
      items,
      answers: {},
      finishedAt: null
    };
    state.examSessions[id] = session;
    state.currentExamId = id;
    persist();
    return session;
  }

  function currentExam() {
    return state.currentExamId ? state.examSessions[state.currentExamId] || null : null;
  }

  function renderExamSetup() {
    const officialCount = officialFormulationCount();
    const officialCardCount = questions.filter(question => question.official).length;
    setView(`
      <header class="page-head"><span class="eyebrow">Samo teorija</span><h1 class="page-title">Teorijski izpit</h1><p class="page-lead">Izberi zgodovinska vprašanja iz mape <strong>izpit teorija</strong> ali celotno teorijo iz sedmih teorijskih PDF-jev. Poskus vedno vsebuje različna področja in vsaj eno vprašanje z dokazom oziroma utemeljitvijo.</p></header>
      <section class="exam-config">
        <article class="config-card"><label for="exam-pool">Banka vprašanj</label><select id="exam-pool"><option value="official">Samo zgodovinski teorijski izpiti · 3 vprašanja</option><option value="all">Celotna teorija · 4 področja</option></select><p style="margin:10px 0 0;color:var(--muted);font-size:11px">${officialCount} uradnih formulacij iz treh teorijskih izpitov je združenih v ${officialCardCount} celovitih vprašanj.</p></article>
        <article class="config-card"><label for="exam-duration">Čas v minutah</label><input id="exam-duration" type="number" min="10" max="120" step="5" value="${Number(DATA.meta?.theoryExamDuration) || 45}"></article>
        <article class="config-card"><label>Način dela</label><p style="margin:0;color:var(--muted);font-size:11px">Odgovori se sproti shranijo. Po koncu dobiš vzorčni odgovor in natančna merila: definicija, pogoji, trditev, dokaz in primer.</p></article>
      </section>
      <div class="hero-actions"><button class="button" type="button" data-action="exam-generate">Generiraj teorijski izpit →</button></div>
      ${Object.keys(state.examSessions).length ? `<div class="section-head"><div><span class="eyebrow">Lokalno shranjeno</span><h2>Prejšnji teorijski poskusi</h2></div></div><div class="filter-bar">${Object.values(state.examSessions).slice(-6).reverse().map(exam => `<button class="filter-button" type="button" data-action="exam-open" data-exam="${escapeHtml(exam.id)}">${escapeHtml(exam.id)} · ${exam.poolMode === "official" ? "izpitna vprašanja" : "celotna teorija"}</button>`).join("")}</div>` : ""}`);
  }

  function formatRemaining(milliseconds) {
    const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startExamTimer(exam) {
    const timer = document.querySelector("#exam-timer");
    if (!timer || exam.finishedAt) return;
    const update = () => {
      const remaining = exam.duration * 60000 - (Date.now() - exam.startedAt);
      timer.textContent = remaining > 0 ? formatRemaining(remaining) : "00:00 · čas je potekel";
      if (remaining <= 0) clearInterval(examTimer);
    };
    update();
    examTimer = window.setInterval(update, 1000);
  }

  function examMarkdown(exam) {
    const title = "Teorijski poskusni izpit";
    const parts = exam.items.map((item, index) => {
      const answer = String(exam.answers[item.id] || "").trim() || "_Brez odgovora._";
      return `## ${index + 1}. ${stripHtml(item.prompt)}\n\n**Tema:** ${topicById.get(item.topic)?.title || item.topic}  \n**Vir:** ${stripHtml(item.source || "Gradivo")}\n\n### Moj odgovor\n\n${answer}`;
    });
    return `# ${title} — ${exam.id}\n\n**Čas:** ${exam.duration} minut  \n**Generirano:** ${new Date(exam.created).toLocaleString("sl-SI")}\n\n---\n\n${parts.join("\n\n---\n\n")}\n`;
  }

  async function copyExam(exam) {
    const markdown = examMarkdown(exam);
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      const area = document.createElement("textarea");
      area.value = markdown;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    toast("Izpit in odgovori so kopirani kot Markdown.");
  }

  function renderExam() {
    const exam = currentExam();
    if (!exam) {
      renderExamSetup();
      return;
    }
    const finished = Boolean(exam.finishedAt);
    const totalWeight = exam.items.reduce((sum, item) => sum + (Number(item.points) || 0), 0);
    setView(`
      <header class="page-head"><span class="eyebrow">Teorijska simulacija · aktivni priklic</span><h1 class="page-title">${escapeHtml(exam.id)}</h1><p class="page-lead">${exam.duration} minut · ${exam.items.length} vprašanj · interna učna utež ${totalWeight} (ni uradno točkovanje). ${finished ? "Poskus je končan; primerjaj odgovore z vzorčnimi odgovori in merili." : "Piši samostojno. Vsi odgovori se shranjujejo lokalno."}</p></header>
      <div class="exam-top"><div><span class="exam-timer" id="exam-timer">${finished ? "končano" : "--:--"}</span><span class="tag" style="margin-left:9px">${new Date(exam.created).toLocaleString("sl-SI")}</span></div><div class="answer-actions"><button class="button secondary small" type="button" data-action="exam-copy">Kopiraj MD</button><button class="button secondary small" type="button" data-action="exam-new">Nov izpit</button>${finished ? "" : '<button class="button small" type="button" data-action="exam-finish">Končaj in preveri</button>'}</div></div>
      <section class="exam-paper">${exam.items.map(item => {
        const topic = topicById.get(item.topic);
        const hintKey = `exam::${exam.id}::${item.id}`;
        const hintOpen = state.openExamHints.has(hintKey);
        return `<article class="exam-question"><div class="question-meta"><span class="tag">${escapeHtml(groupLabel(item.group))}</span><span class="tag">${escapeHtml(topic?.title || item.topic)}</span>${item.official ? '<span class="tag">iz PDF-ja izpit teorija</span>' : ""}<span class="tag">učna utež ${Number(item.points) || 0}</span></div><h3>${item.prompt}</h3><textarea class="answer-editor" data-exam-answer="${escapeHtml(item.id)}" placeholder="Definicija · pogoji · izrek · dokaz · primer …" ${finished ? "readonly" : ""}>${escapeHtml(exam.answers[item.id] || "")}</textarea><div class="answer-actions">${item.hint && !finished ? `<button class="button secondary small" type="button" data-action="exam-hint" data-key="${escapeHtml(hintKey)}">${hintOpen ? "Skrij namig" : "Namig"}</button>` : ""}</div>${hintOpen && !finished ? `<aside class="hint-box"><h4>Namig</h4>${item.hint}</aside>` : ""}${finished ? `<aside class="model-answer"><h4>Vzorčni odgovor</h4>${item.modelAnswer || "Odgovor še ni dodan."}${item.rubric?.length ? `<div class="rubric">${item.rubric.map(point => `<div class="rubric-item">${point}</div>`).join("")}</div>` : ""}</aside>` : ""}</article>`;
      }).join("")}</section>`);
    startExamTimer(exam);
  }

  function renderSources() {
    const kinds = unique(sources.map(source => source.kind));
    setView(`
      <header class="page-head"><span class="eyebrow">Sledljivost</span><h1 class="page-title">Samo dovoljeni teorijski viri</h1><p class="page-lead">Spodaj je vseh sedem PDF-jev iz mape <strong>teorija</strong> in vsi trije PDF-ji iz mape <strong>izpit teorija</strong>. Vaje, navadni pisni izpiti in cheatsheet niso uporabljeni.</p></header>
      ${kinds.length ? kinds.map(kind => `<div class="section-head"><div><span class="eyebrow">${escapeHtml(kind)}</span><h2>${escapeHtml(kindLabel(kind))}</h2></div></div><section class="source-grid">${sources.filter(source => source.kind === kind).map(source => `<a class="source-card" href="${escapeHtml(encodeURI(source.file || "#"))}" target="_blank" rel="noopener"><div><small>${escapeHtml(source.kind)}</small><strong>${source.title}</strong><p>${source.note || ""}</p></div><span>↗</span></a>`).join("")}</section>`).join("") : emptyState("Viri še niso naloženi")}`);
  }

  function renderNotFound() {
    setView(`<div class="empty-state"><strong>Te strani ni.</strong><p>Pot je morda napačna ali pa vsebina še ni naložena.</p><a class="button" href="#/domov">Nazaj na pregled</a></div>`);
  }

  const searchIndex = buildSearchIndex();

  function buildSearchIndex() {
    const entries = [];
    topics.forEach(topic => {
      entries.push({
        href: `#/teorija/${topic.id}`,
        title: topic.title,
        meta: `Tema ${topic.number} · ${groupLabel(topic.group)}`,
        text: [topic.title, topic.short, topic.examNote, ...(topic.outcomes || []), ...(topic.checklist || []).map(checklistItemText)].join(" ")
      });
      (topic.sections || []).forEach((section, index) => entries.push({
        href: `#/teorija/${topic.id}?section=${encodeURIComponent(section.id || `sklop-${index + 1}`)}`,
        title: section.title || topic.title,
        meta: `${kindLabel(section.kind)} · ${topic.title}`,
        text: [topic.title, section.title, section.label, section.html].join(" ")
      }));
    });
    questions.forEach(question => entries.push({
      href: `#/vprasanja?question=${encodeURIComponent(question.id)}`,
      title: stripHtml(question.prompt),
      meta: `Teorijsko vprašanje · ${topicById.get(question.topic)?.title || question.topic}`,
      text: [question.prompt, question.answer, question.hint, ...(question.rubric || []), ...(question.tags || []), ...((question.officialVariants || []).flatMap(variant => [variant?.prompt, sourceTitle(variant?.source)]))].join(" ")
    }));
    flashcards.forEach(card => entries.push({
      href: `#/kartice?card=${encodeURIComponent(card.id)}`,
      title: stripHtml(card.front),
      meta: `Kartica · ${topicById.get(card.topic)?.title || card.topic}`,
      text: [card.front, card.back].join(" ")
    }));
    sources.forEach(source => entries.push({
      href: "#/viri",
      title: source.title,
      meta: kindLabel(source.kind),
      text: [source.title, source.note, source.kind].join(" ")
    }));
    return entries.map(entry => ({ ...entry, normalizedTitle: normalize(entry.title), normalizedText: normalize(entry.text) }));
  }

  function showSearch(query) {
    const normalized = normalize(query);
    if (normalized.length < 2) {
      searchResults.hidden = true;
      searchResults.innerHTML = "";
      return;
    }
    const tokens = normalized.split(" ").filter(Boolean);
    const results = searchIndex.filter(entry => tokens.every(token => entry.normalizedText.includes(token)))
      .map(entry => ({ ...entry, score: entry.normalizedTitle === normalized ? 4 : entry.normalizedTitle.startsWith(normalized) ? 3 : entry.normalizedTitle.includes(normalized) ? 2 : 1 }))
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, "sl"))
      .slice(0, 10);
    searchResults.innerHTML = results.length ? results.map(result => `<a class="search-result" href="${escapeHtml(result.href)}"><strong>${escapeHtml(result.title)}</strong><small>${escapeHtml(result.meta)}</small></a>`).join("") : '<div class="search-empty">Ni zadetkov. Poskusi ime pojma, izreka ali postopka.</div>';
    searchResults.hidden = false;
  }

  function renderRoute() {
    const { parts, params } = routeInfo();
    updateChrome(parts);
    closeMobileMenu();
    const base = parts[0] || "domov";
    if (base === "domov") renderHome();
    else if (base === "nacrt") renderPlan();
    else if (base === "teorija" && !parts[1]) renderTheoryIndex();
    else if (base === "teorija" && topicById.has(parts[1])) renderTopic(topicById.get(parts[1]), params.get("section") || "");
    else if (base === "izreki") renderTheorems();
    else if (base === "vprasanja") renderQuestions(params);
    else if (base === "kartice") renderFlashcards(params);
    else if (base === "kviz") renderQuiz();
    else if (base === "vaje") {
      location.hash = "#/vprasanja";
      return;
    }
    else if (base === "izpit") renderExam();
    else if (base === "viri") renderSources();
    else renderNotFound();
    updateProgress();
  }

  document.querySelector("#mobile-menu")?.addEventListener("click", () => {
    if (sidebar.classList.contains("open")) closeMobileMenu();
    else openMobileMenu();
  });
  sidebar.addEventListener("click", event => {
    if (event.target.closest("a")) closeMobileMenu();
  });
  sidebarScrim.addEventListener("click", closeMobileMenu);
  window.addEventListener("hashchange", renderRoute);

  searchInput.addEventListener("input", event => showSearch(event.target.value));
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.target.value = "";
      showSearch("");
      event.target.blur();
    }
  });
  searchResults.addEventListener("click", () => {
    searchResults.hidden = true;
    searchInput.value = "";
  });

  document.querySelector("#quick-random")?.addEventListener("click", () => {
    if (!questions.length) {
      toast("Banka teorijskih vprašanj je prazna.");
      return;
    }
    state.questionTopic = "all";
    state.questionStatus = "all";
    const question = questions[Math.floor(Math.random() * questions.length)];
    const targetHash = `#/vprasanja?question=${encodeURIComponent(question.id)}`;
    if (location.hash === targetHash) renderQuestions(new URLSearchParams(`question=${encodeURIComponent(question.id)}`));
    else location.hash = targetHash;
  });

  view.addEventListener("input", event => {
    const questionEditor = event.target.closest("[data-question-answer]");
    if (questionEditor) {
      state.theoryAnswers[questionEditor.dataset.questionAnswer] = questionEditor.value;
      persist(false);
      return;
    }
    const examEditor = event.target.closest("[data-exam-answer]");
    if (examEditor) {
      const exam = currentExam();
      if (!exam || exam.finishedAt) return;
      exam.answers[examEditor.dataset.examAnswer] = examEditor.value;
      persist(false);
    }
  });

  view.addEventListener("change", event => {
    const questionSelection = event.target.closest("[data-question-select]");
    if (questionSelection) {
      const id = questionSelection.dataset.questionSelect;
      if (!questionIds.has(id)) return;
      if (questionSelection.checked) state.selectedQuestions.add(id);
      else state.selectedQuestions.delete(id);
      persist(false);
      updateQuestionSelectionUi();
      return;
    }
    const checklist = event.target.closest("[data-checklist]");
    if (checklist) {
      if (checklist.checked) state.checkedChecklist.add(checklist.dataset.checklist);
      else state.checkedChecklist.delete(checklist.dataset.checklist);
      persist();
      toast(checklist.checked ? "Korak je označen kot opravljen." : "Korak je spet odprt.");
      return;
    }
    if (event.target.id === "question-topic") {
      state.questionTopic = event.target.value;
      renderQuestions();
      return;
    }
    if (event.target.id === "question-status") {
      state.questionStatus = event.target.value;
      renderQuestions();
      return;
    }
    if (event.target.id === "question-origin") {
      state.questionOrigin = event.target.value;
      renderQuestions();
      return;
    }
    if (event.target.id === "flash-filter") {
      resetFlashDeck(event.target.value);
      renderFlashcards();
      return;
    }
    if (event.target.id === "exam-pool") {
      const duration = document.querySelector("#exam-duration");
      if (duration) duration.value = event.target.value === "official" ? "45" : "60";
    }
  });

  view.addEventListener("click", event => {
    const trigger = event.target.closest("[data-action]");
    if (!trigger) return;
    const action = trigger.dataset.action;

    if (action === "theory-filter") {
      state.theoryGroup = trigger.dataset.value;
      renderTheoryIndex();
      return;
    }
    if (action === "theorem-filter") {
      state.theoremKind = trigger.dataset.value;
      renderTheorems();
      return;
    }
    if (action === "toggle-topic") {
      const topicId = trigger.dataset.topic;
      if (!topicById.has(topicId)) return;
      if (state.completedTopics.has(topicId)) state.completedTopics.delete(topicId);
      else state.completedTopics.add(topicId);
      persist();
      renderTopic(topicById.get(topicId));
      toast(state.completedTopics.has(topicId) ? "Tema je označena kot opravljena." : "Tema je spet označena za ponovitev.");
      return;
    }
    if (action === "select-visible-questions") {
      filteredQuestions().forEach(question => state.selectedQuestions.add(question.id));
      persist(false);
      updateQuestionSelectionUi();
      toast("Prikazana vprašanja so dodana v izbor za PDF.");
      return;
    }
    if (action === "select-topic-questions") {
      const topicId = trigger.dataset.topic;
      questions.filter(question => question.topic === topicId).forEach(question => state.selectedQuestions.add(question.id));
      persist(false);
      updateQuestionSelectionUi();
      toast("Vsa vprašanja te teme so dodana v izbor.");
      return;
    }
    if (action === "select-all-questions") {
      questions.forEach(question => state.selectedQuestions.add(question.id));
      persist(false);
      updateQuestionSelectionUi();
      toast("Vsa teorijska vprašanja so dodana v izbor.");
      return;
    }
    if (action === "clear-question-selection") {
      state.selectedQuestions.clear();
      persist(false);
      updateQuestionSelectionUi();
      toast("Izbor vprašanj je počiščen.");
      return;
    }
    if (action === "export-selected-pdf") {
      const selected = questions.filter(question => state.selectedQuestions.has(question.id));
      exportQuestionsPdf(selected, "Izbrana teorijska vprašanja");
      return;
    }
    if (action === "export-topic-pdf") {
      const topic = topicById.get(trigger.dataset.topic);
      if (!topic) return;
      exportQuestionsPdf(
        questions.filter(question => question.topic === topic.id),
        `Tema ${topic.number} — ${stripHtml(topic.title)}`
      );
      return;
    }
    if (action === "question-hint") {
      const id = trigger.dataset.question;
      if (state.openQuestionHints.has(id)) state.openQuestionHints.delete(id);
      else state.openQuestionHints.add(id);
      renderQuestions(new URLSearchParams(`question=${encodeURIComponent(id)}`));
      return;
    }
    if (action === "model-answer") {
      const id = trigger.dataset.question;
      if (state.openModelAnswers.has(id)) state.openModelAnswers.delete(id);
      else state.openModelAnswers.add(id);
      renderQuestions(new URLSearchParams(`question=${encodeURIComponent(id)}`));
      return;
    }
    if (action === "self-rate") {
      const id = trigger.dataset.question;
      state.selfRatings[id] = Number(trigger.dataset.value);
      persist();
      state.openModelAnswers.add(id);
      renderQuestions(new URLSearchParams(`question=${encodeURIComponent(id)}`));
      toast(Number(trigger.dataset.value) === 3 ? "Odgovor je označen kot znan." : "Vprašanje ostaja v krogu ponavljanja.");
      return;
    }
    if (action === "random-question") {
      const pool = questions.filter(question => state.questionTopic === "all" || question.topic === state.questionTopic);
      if (!pool.length) return;
      state.questionStatus = "all";
      const question = pool[Math.floor(Math.random() * pool.length)];
      renderQuestions(new URLSearchParams(`question=${encodeURIComponent(question.id)}`));
      return;
    }
    if (action === "flash-flip") {
      state.flashFlipped = !state.flashFlipped;
      renderFlashcards();
      return;
    }
    if (action === "flash-shuffle") {
      resetFlashDeck(state.flashFilter, true);
      renderFlashcards();
      return;
    }
    if (["flash-prev", "flash-next", "flash-known", "flash-repeat"].includes(action)) {
      if (!state.flashDeck.length) return;
      const currentId = state.flashDeck[state.flashIndex];
      if (action === "flash-known") state.knownCards.add(currentId);
      if (action === "flash-repeat") state.knownCards.delete(currentId);
      if (action === "flash-prev") state.flashIndex = (state.flashIndex - 1 + state.flashDeck.length) % state.flashDeck.length;
      else state.flashIndex = (state.flashIndex + 1) % state.flashDeck.length;
      state.flashFlipped = false;
      persist();
      renderFlashcards();
      return;
    }
    if (action === "quiz-start") {
      startQuiz();
      return;
    }
    if (action === "quiz-answer") {
      const session = state.quizSession;
      if (!session || session.responses[session.index]) return;
      const index = Number(trigger.dataset.index);
      const correct = Boolean(session.items[session.index].choices[index]?.correct);
      session.responses[session.index] = { index, correct };
      if (correct) session.score += 1;
      renderQuiz();
      return;
    }
    if (action === "quiz-next") {
      const session = state.quizSession;
      if (!session) return;
      if (session.index + 1 >= session.items.length) {
        session.finished = true;
        const percent = Math.round(session.score / session.items.length * 100);
        state.quizBest = Math.max(state.quizBest, percent);
        persist();
      } else session.index += 1;
      renderQuiz();
      return;
    }
    if (action === "quiz-reset") {
      state.quizSession = null;
      renderQuiz();
      return;
    }
    if (action === "exam-generate") {
      const poolMode = document.querySelector("#exam-pool")?.value === "all" ? "all" : "official";
      const duration = Math.min(120, Math.max(10, Number(document.querySelector("#exam-duration")?.value) || (poolMode === "official" ? 45 : 60)));
      if (createExam(poolMode, duration)) renderExam();
      return;
    }
    if (action === "exam-new") {
      state.currentExamId = null;
      persist();
      renderExamSetup();
      return;
    }
    if (action === "exam-open") {
      if (!state.examSessions[trigger.dataset.exam]) return;
      state.currentExamId = trigger.dataset.exam;
      persist();
      renderExam();
      return;
    }
    if (action === "exam-hint") {
      const key = trigger.dataset.key;
      if (state.openExamHints.has(key)) state.openExamHints.delete(key);
      else state.openExamHints.add(key);
      renderExam();
      return;
    }
    if (action === "exam-finish") {
      const exam = currentExam();
      if (!exam) return;
      exam.finishedAt = new Date().toISOString();
      persist();
      renderExam();
      toast("Poskus je končan. Zdaj primerjaj odgovore z merili.");
      return;
    }
    if (action === "exam-copy") {
      const exam = currentExam();
      if (exam) copyExam(exam);
    }
  });

  document.addEventListener("keydown", event => {
    const target = event.target instanceof Element ? event.target : document.activeElement;
    const editable = Boolean(target?.matches("input, select, textarea, [contenteditable='true']"));
    const interactive = editable || Boolean(target?.closest("button, a"));
    if (!editable && event.key === "/") {
      event.preventDefault();
      searchInput.focus();
      return;
    }
    if (event.key === "Escape") {
      closeMobileMenu();
      searchResults.hidden = true;
    }
    if (interactive || routeInfo().parts[0] !== "kartice" || !state.flashDeck.length) return;
    if (event.code === "Space") {
      event.preventDefault();
      state.flashFlipped = !state.flashFlipped;
      renderFlashcards();
    } else if (event.key === "ArrowRight") {
      state.flashIndex = (state.flashIndex + 1) % state.flashDeck.length;
      state.flashFlipped = false;
      renderFlashcards();
    } else if (event.key === "ArrowLeft") {
      state.flashIndex = (state.flashIndex - 1 + state.flashDeck.length) % state.flashDeck.length;
      state.flashFlipped = false;
      renderFlashcards();
    }
  });

  // A final pass at window.load also covers unusually slow local vendor loading.
  window.addEventListener("load", () => typesetMath(view), { once: true });

  if (!location.hash) location.hash = "#/domov";
  else renderRoute();
})();
