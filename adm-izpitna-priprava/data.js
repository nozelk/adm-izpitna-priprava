(() => {
  "use strict";

  const modules = [
    window.ADM_MODULE_LOGIC,
    window.ADM_MODULE_COUNTING,
    window.ADM_MODULE_ALGEBRA,
    window.ADM_MODULE_GRAPHS,
    window.ADM_MODULE_THEORY_EXAMS
  ].filter(Boolean);

  const merge = key => modules.flatMap(module => Array.isArray(module[key]) ? module[key] : []);
  const topics = merge("topics").sort((a, b) => Number(a.number) - Number(b.number));
  const flashcards = merge("flashcards");
  const quiz = merge("quiz");
  const rawQuestions = merge("questions");

  // Isto zgodovinsko izpitno vprašanje je bilo prej prikazano še enkrat kot
  // ločeno vprašanje iz zapiskov. Ohranimo eno, širšo učno kartico, natančno
  // uradno formulacijo in vir pa pripnemo kot različico istega vprašanja.
  const canonicalQuestions = rawQuestions
    .filter(question => !question.canonicalId)
    .map(question => ({
      ...question,
      tags: Array.isArray(question.tags) ? [...question.tags] : [],
      rubric: Array.isArray(question.rubric) ? [...question.rubric] : [],
      officialVariants: Array.isArray(question.officialVariants) ? [...question.officialVariants] : []
    }));
  const questionById = new Map(canonicalQuestions.map(question => [question.id, question]));

  for (const variant of rawQuestions.filter(question => question.canonicalId)) {
    const canonical = questionById.get(variant.canonicalId);
    if (!canonical) throw new Error(`Manjka kanonično vprašanje ${variant.canonicalId} za ${variant.id}.`);
    canonical.official = true;
    canonical.officialVariants.push({
      id: variant.id,
      prompt: variant.prompt,
      source: variant.source,
      tags: Array.isArray(variant.tags) ? [...variant.tags] : []
    });
    canonical.tags = [...new Set([...canonical.tags, ...(variant.tags || [])])];
    canonical.rubric = [...new Set([...canonical.rubric, ...(variant.rubric || [])])];
    // Če je uradni modelni odgovor podrobnejši, obdržimo daljšega. Tako
    // združevanje nikoli ne osiromaši razlage na strani.
    if (String(variant.answer || "").length > String(canonical.answer || "").length) canonical.answer = variant.answer;
    if (!canonical.hint && variant.hint) canonical.hint = variant.hint;
  }
  const questions = canonicalQuestions;

  // Najkrajši še smiseln prvi krog za pripravo: vseh 15 dejanskih formulacij
  // iz teorijskih izpitov ter temeljne definicije in izreki vseh 13 tem.
  // Vrstni red sledi učnemu toku po poglavjih, ne oceni verjetnosti na izpitu.
  const essentialQuestionIds = Object.freeze([
    "oq-ir-06", "oq-ir-07", "oq-ir-16",
    "oq-pr-06", "oq-pr-07", "oq-pr-18",
    "oq-mp-01", "oq-mp-15", "oq-mp-06", "oq-mp-16",
    "oq-ru-06", "oq-ru-03", "oq-ru-18",
    "cc-o03", "cc-o04", "cc-o05", "cc-o06", "cc-o09",
    "aa-o02", "aa-o05", "aa-o06", "aa-o07", "aa-o08", "aa-o09", "aa-o27",
    "gr-o01", "gr-o34", "gr-o36", "gr-o50",
    "gr-o25", "gr-o26", "gr-o08",
    "gr-o11", "gr-o15", "gr-o31"
  ]);
  const essentialIdSet = new Set(essentialQuestionIds);
  if (essentialIdSet.size !== essentialQuestionIds.length) throw new Error("Podvojeni ID-ji v zbirki Nujnih 35.");
  for (const id of essentialQuestionIds) {
    if (!questionById.has(id)) throw new Error(`Neznano vprašanje v zbirki Nujnih 35: ${id}.`);
  }

  // Stran je namenoma samo za teorijo. Tudi če bi vsebinski modul pomotoma
  // izvozil vaje, jih podatkovna plast ne naloži.
  const exercises = [];

  const topicIds = new Set(topics.map(topic => topic.id));
  if (topicIds.size !== topics.length) throw new Error("Podvojeni identifikatorji tem.");
  for (const collection of [flashcards, quiz, questions]) {
    for (const item of collection) {
      if (!topicIds.has(item.topic)) throw new Error(`Neznana tema pri elementu ${item.id}: ${item.topic}`);
    }
  }

  const sources = [
    { id: "izjavni", kind: "teorija", title: "Izjavni račun", file: "../teorija/IzjavniRacun.pdf", pages: 17, note: "Vezniki, resničnostne tabele, normalne oblike, veljavnost in formalni dokazi." },
    { id: "predikati", kind: "teorija", title: "Predikatni račun", file: "../teorija/ADM-Predikati.pdf", pages: 7, note: "Interpretacije, kvantifikatorji, negacije, vrstni red kvantifikatorjev in protiprimeri." },
    { id: "mnozice", kind: "teorija", title: "Množice in relacije", file: "../teorija/MnozRel.pdf", pages: 10, note: "Množice, moči, relacije, ekvivalence, razbitja in urejenosti." },
    { id: "kombinatorika", kind: "teorija", title: "Kombinatorika", file: "../teorija/ADM-Kombinatorika.pdf", pages: 25, note: "Izbori, binomski koeficienti, multimnožice, Stirlingova števila, razbitja, vključitve–izključitve, Dirichlet in preslikave." },
    { id: "stevila-algebra", kind: "teorija", title: "Teorija števil in algebrske strukture", file: "../teorija/ADM-StevilaAlgebra.pdf", pages: 19, note: "Deljivost, praštevila, diofantske enačbe, kongruence, operacije, grupe, kolobarji in polinomi." },
    { id: "stevila-razsirjeno", kind: "teorija", title: "Teorija števil — razširjena verzija", file: "../teorija/TeorijaStevilVer2.pdf", pages: 13, note: "Eulerjeva funkcija, mali Fermatov izrek, Eulerjev izrek in RSA." },
    { id: "grafi", kind: "teorija", title: "Grafi", file: "../teorija/ADM-Grafi.pdf", pages: 14, note: "Osnovni pojmi, drevesa, vpeta drevesa, Eulerjevi in Hamiltonovi grafi ter barvanje." },
    { id: "teorija-2021", kind: "teorijski izpit", title: "Teorijski izpit 2021", file: "../izpit teorija/IzpitTeorija2021.pdf", pages: 2, note: "Predikati, binomska simetrija ter enota in inverzi." },
    { id: "teorija-2021-roki", kind: "teorijski izpit", title: "Teorijski izpit 2020/21 — 1. rok", file: "../izpit teorija/IzpitTeorija_20-21.pdf", pages: 1, note: "Asimetričnost, Brooks in multimnožice." },
    { id: "teorija-zbirka", kind: "teorijski izpit", title: "Zbirka teorijskih izpitov", file: "../izpit teorija/teoreticni_izpit_adm.pdf", pages: 6, note: "Devet zgodovinskih vprašanj iz logike, kombinatorike, algebre, teorije števil in grafov." }
  ];

  window.ADM_DATA = {
    meta: {
      title: "Algebra in diskretna matematika — teorija",
      subtitle: "Od definicije do dokaza in popolnega teorijskega odgovora",
      version: "2.0-theory-only",
      mode: "theory-only",
      storageKey: "admTheoryAtlasStateV1",
      theoryExamDuration: 45
    },
    topics,
    flashcards,
    quiz,
    questions,
    essentialQuestionIds,
    exercises,
    sources
  };
})();
