"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const expectedEssentialQuestionCount = 68;

const katexVendorRoot = path.resolve(__dirname, "vendor", "katex");
const pathIsInside = (root, candidate) => {
  const relative = path.relative(root, candidate);
  return relative === "" || (!path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`));
};
const requireVendorFile = relativePath => {
  const target = path.resolve(katexVendorRoot, relativePath);
  if (!pathIsInside(katexVendorRoot, target)) {
    throw new Error(`KaTeX asset zapušča vendor/katex: ${relativePath}`);
  }
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    throw new Error(`Manjka lokalni KaTeX asset: ${target}`);
  }
  if (fs.statSync(target).size === 0) {
    throw new Error(`Lokalni KaTeX asset je prazen: ${target}`);
  }
  return target;
};

const katexPath = requireVendorFile("katex.min.js");
const katexCssPath = requireVendorFile("katex.min.css");
requireVendorFile(path.join("contrib", "auto-render.min.js"));
requireVendorFile("LICENSE");

const katexCss = fs.readFileSync(katexCssPath, "utf8");
const cssUrlPattern = /url\(\s*(?:"([^"]+)"|'([^']+)'|([^)'"\s]+))\s*\)/g;
const katexFontFiles = new Set();
let cssUrlMatch;
while ((cssUrlMatch = cssUrlPattern.exec(katexCss))) {
  const rawUrl = cssUrlMatch[1] || cssUrlMatch[2] || cssUrlMatch[3];
  if (/^(?:data:|https?:|\/\/)/iu.test(rawUrl)) {
    throw new Error(`KaTeX CSS vsebuje nelokalni URL: ${rawUrl}`);
  }
  const filePart = rawUrl.split(/[?#]/u, 1)[0];
  let decodedFilePart;
  try {
    decodedFilePart = decodeURIComponent(filePart);
  } catch {
    throw new Error(`KaTeX CSS vsebuje neveljavno kodiran URL: ${rawUrl}`);
  }
  const target = path.resolve(path.dirname(katexCssPath), decodedFilePart);
  if (!pathIsInside(katexVendorRoot, target)) {
    throw new Error(`KaTeX CSS URL zapušča vendor/katex: ${rawUrl}`);
  }
  if (!fs.existsSync(target) || !fs.statSync(target).isFile() || fs.statSync(target).size === 0) {
    throw new Error(`KaTeX CSS kaže na manjkajoč ali prazen asset: ${rawUrl}`);
  }
  if (/\.(?:woff2?|ttf|otf)$/iu.test(target)) katexFontFiles.add(target);
}
if (katexFontFiles.size === 0) {
  throw new Error("KaTeX CSS ne vsebuje nobene lokalne pisave.");
}

const katex = require(katexPath);

const base = __dirname;
const moduleFiles = [
  "content-logic.js",
  "content-counting.js",
  "content-algebra.js",
  "content-graphs.js",
  "practice-data.js",
  "data.js"
];

const requiredGlobals = [
  "ADM_MODULE_LOGIC",
  "ADM_MODULE_COUNTING",
  "ADM_MODULE_ALGEBRA",
  "ADM_MODULE_GRAPHS",
  "ADM_MODULE_THEORY_EXAMS",
  "ADM_DATA"
];

const expectedSources = new Map([
  ["izjavni", "../teorija/IzjavniRacun.pdf"],
  ["predikati", "../teorija/ADM-Predikati.pdf"],
  ["mnozice", "../teorija/MnozRel.pdf"],
  ["kombinatorika", "../teorija/ADM-Kombinatorika.pdf"],
  ["stevila-algebra", "../teorija/ADM-StevilaAlgebra.pdf"],
  ["stevila-razsirjeno", "../teorija/TeorijaStevilVer2.pdf"],
  ["grafi", "../teorija/ADM-Grafi.pdf"],
  ["teorija-2021", "../izpit teorija/IzpitTeorija2021.pdf"],
  ["teorija-2021-roki", "../izpit teorija/IzpitTeorija_20-21.pdf"],
  ["teorija-zbirka", "../izpit teorija/teoreticni_izpit_adm.pdf"]
]);

const fail = message => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const nonEmpty = value => typeof value === "string" && value.trim().length > 0;
const normalizeFile = file => String(file).replace(/\\/g, "/");

const context = { window: {}, console };
vm.createContext(context);
for (const file of moduleFiles) {
  const source = fs.readFileSync(path.join(base, file), "utf8");
  try {
    vm.runInContext(source, context, { filename: file });
  } catch (error) {
    fail(`Nalaganje ${file} ni uspelo: ${error.message}`);
  }
}

for (const globalName of requiredGlobals) {
  assert(context.window[globalName], `Manjka izvoženi modul window.${globalName}.`);
}

const data = context.window.ADM_DATA;
assert(data.meta?.mode === "theory-only", "ADM_DATA.meta.mode mora biti 'theory-only'.");

const collections = ["topics", "flashcards", "quiz", "questions", "exercises", "sources"];
for (const key of collections) {
  assert(Array.isArray(data[key]), `${key} ni tabela.`);
}

assert(data.topics.length === 13, `Pričakovanih je 13 tem, najdenih ${data.topics.length}.`);
assert(data.exercises.length === 0, `Theory-only stran ne sme vsebovati vaj; najdenih ${data.exercises.length}.`);
assert(data.questions.length >= 185,
  `Celovita teorijska zbirka mora imeti najmanj 185 odprtih vprašanj; najdenih ${data.questions.length}.`);
assert(Array.isArray(data.essentialQuestionIds), "ADM_DATA nima zbirke essentialQuestionIds.");
assert(data.essentialQuestionIds.length === expectedEssentialQuestionCount,
  `Nujna zbirka mora imeti natanko ${expectedEssentialQuestionCount} vprašanj; najdenih ${data.essentialQuestionIds.length}.`);
assert(data.sources.length === expectedSources.size,
  `Pričakovanih je natanko ${expectedSources.size} dovoljenih virov, najdenih ${data.sources.length}.`);

const idsByCollection = new Map();
for (const key of collections) {
  const ids = data[key].map(item => item?.id);
  assert(ids.every(nonEmpty), `${key} vsebuje element brez veljavnega ID-ja.`);
  assert(new Set(ids).size === ids.length, `${key} vsebuje podvojene ID-je.`);
  idsByCollection.set(key, ids);
}

const contentIds = ["topics", "flashcards", "quiz", "questions"]
  .flatMap(key => idsByCollection.get(key));
assert(new Set(contentIds).size === contentIds.length,
  "ID-ji tem, kartic, kvizov in odprtih vprašanj morajo biti med seboj enolični.");

assert(data.topics.every((topic, index) => topic.number === index + 1),
  "Številke tem niso zaporedne od 1 do 13.");

const topicIds = new Set(idsByCollection.get("topics"));
const sourceIds = new Set(idsByCollection.get("sources"));
const allowedSourceFileNames = [...expectedSources.values()].map(file => path.basename(file));
const groups = new Set(["logika-mnozice", "kombinatorika", "stevila-algebra", "grafi"]);
const theoremKinds = new Set(["theorem", "proof", "lemma", "proposition", "corollary", "identity"]);
const allSectionIds = [];

for (const source of data.sources) {
  const expectedFile = expectedSources.get(source.id);
  assert(expectedFile, `Vir ${source.id} ni med desetimi dovoljenimi theory-only viri.`);
  const normalizedFile = normalizeFile(source.file);
  assert(normalizedFile === expectedFile,
    `Vir ${source.id} kaže na ${source.file}, pričakovan pa je ${expectedFile}.`);
  assert(nonEmpty(source.title), `Vir ${source.id} nima naslova.`);
  assert(source.kind === (expectedFile.startsWith("../teorija/") ? "teorija" : "teorijski izpit"),
    `Vir ${source.id} ima napačno vrsto '${source.kind}'.`);
  const target = path.resolve(base, normalizedFile);
  assert(fs.existsSync(target), `Manjka vir: ${normalizedFile}`);
  assert(fs.statSync(target).isFile(), `Vir ni datoteka: ${normalizedFile}`);
}

for (const [sourceId, expectedFile] of expectedSources) {
  assert(sourceIds.has(sourceId), `Manjka obvezni vir ${sourceId} (${expectedFile}).`);
}

for (const topic of data.topics) {
  assert(groups.has(topic.group), `Tema ${topic.id} ima neznan sklop ${topic.group}.`);
  assert(nonEmpty(topic.title) && nonEmpty(topic.short), `Tema ${topic.id} nima naslova ali povzetka.`);
  assert(Array.isArray(topic.outcomes) && topic.outcomes.length >= 3,
    `Tema ${topic.id} nima najmanj treh učnih ciljev.`);
  assert(Array.isArray(topic.checklist) && topic.checklist.length >= 3,
    `Tema ${topic.id} nima najmanj treh kontrolnih točk.`);
  assert(Array.isArray(topic.sources) && topic.sources.length >= 1,
    `Tema ${topic.id} nima povezave na teorijski vir.`);
  for (const sourceId of topic.sources) {
    assert(sourceIds.has(sourceId), `Tema ${topic.id} navaja neznani vir ${sourceId}.`);
  }

  assert(Array.isArray(topic.sections) && topic.sections.length >= 8,
    `Tema ${topic.id} ima premalo teorijskih razdelkov.`);
  const sectionIds = topic.sections.map(section => section?.id);
  assert(sectionIds.every(nonEmpty), `Tema ${topic.id} vsebuje razdelek brez ID-ja.`);
  assert(new Set(sectionIds).size === sectionIds.length,
    `Tema ${topic.id} vsebuje podvojene ID-je razdelkov.`);
  allSectionIds.push(...sectionIds);

  for (const section of topic.sections) {
    assert(nonEmpty(section.title), `Razdelek ${topic.id}/${section.id} nima naslova.`);
    assert(nonEmpty(section.kind), `Razdelek ${topic.id}/${section.id} nima vrste.`);
    assert(nonEmpty(section.html), `Razdelek ${topic.id}/${section.id} nima vsebine.`);
  }

  assert(topic.sections.some(section => section.kind === "definition"),
    `Tema ${topic.id} nima nobenega definicijskega razdelka.`);
  assert(topic.sections.some(section => theoremKinds.has(section.kind)),
    `Tema ${topic.id} nima nobenega izreka, leme, trditve, identitete ali dokaza.`);
}

assert(new Set(allSectionIds).size === allSectionIds.length,
  "ID-ji teorijskih razdelkov morajo biti enolični tudi med različnimi temami.");
const everyRuntimeId = [...contentIds, ...idsByCollection.get("sources"), ...allSectionIds];
assert(new Set(everyRuntimeId).size === everyRuntimeId.length,
  "Vsi ID-ji tem, razdelkov, učnih elementov in virov morajo biti globalno enolični.");

// Preverjamo končno besedilo vseh razdelkov teme, ne posameznega naslova ali ID-ja.
// Tako se lahko vsebina preuredi, validator pa še vedno varuje pokritje osnovnih pojmov.
const normalizeCoverageText = value => String(value)
  .replace(/<[^>]*>/gu, " ")
  .replace(/&(?:nbsp|ensp|emsp);/giu, " ")
  .replace(/&(?:amp|lt|gt|quot|apos);/giu, " ")
  .normalize("NFD")
  .replace(/\p{M}/gu, "")
  .toLocaleLowerCase("sl")
  .replace(/\s+/gu, " ")
  .trim();

const topicSectionCorpus = topicId => {
  const topic = data.topics.find(candidate => candidate.id === topicId);
  assert(topic, `Vsebinski pregled ne najde teme ${topicId}.`);
  return normalizeCoverageText(topic.sections
    .flatMap(section => [section.label, section.title, section.html])
    .filter(nonEmpty)
    .join(" "));
};

const assertTopicConceptCoverage = (topicId, concepts) => {
  const corpus = topicSectionCorpus(topicId);
  for (const [concept, alternatives] of Object.entries(concepts)) {
    assert(alternatives.some(pattern => pattern.test(corpus)),
      `Tema ${topicId} v končnem besedilu razdelkov ne pokrije osnovnega pojma: ${concept}.`);
  }
};

assertTopicConceptCoverage("mnozice-preslikave", {
  "unija": [/\bunij\w*/u, /\\cup/u],
  "presek": [/\bpresek\w*/u, /\\cap/u],
  "razlika množic": [/\brazlik(?:a|e|i|o|ama|ah)\b/u, /\\setminus/u],
  "komplement": [/\bkomplement\w*/u],
  "univerzalna množica": [/\buniverzaln\w*\s+mnozic\w*/u],
  "simetrična razlika": [/\bsimetricn\w*\s+razlik\w*/u, /\\triangle/u, /\\oplus/u],
  "potenčna množica": [/\bpotencn\w*\s+mnozic\w*/u, /\\mathcal\s*\{?p/u],
  "kartezični produkt": [/\bkartezi\w*\s+produkt\w*/u, /\\times/u],
  "podmnožica": [/\bpodmnozic\w*/u, /\\subset(?:eq)?/u]
});

assertTopicConceptCoverage("grafi-osnove", {
  "graf, vozlišča in povezave": [/\bvozlis\w*/u, /\bpovezav\w*/u],
  "sosednost": [/\bsosedn\w*/u],
  "incidenca": [/\bincidentn\w*/u, /\bincidenc\w*/u],
  "red in velikost grafa": [/\bred\b/u, /\bvelikost\w*/u],
  "sosedstvo": [/\bsosedstv\w*/u],
  "stopnja vozlišča": [/\bstopnj\w*/u, /\\deg/u],
  "multigraf, zanke in vzporedne povezave": [/\bmultigraf\w*/u, /\bzank\w*/u, /\bvzporedn\w*/u],
  "usmerjeni graf": [/\busmerjen\w*\s+graf\w*/u, /\bdigraf\w*/u],
  "lema o rokovanju": [/\brokovanj\w*/u],
  "podgraf": [/\bpodgraf\w*/u],
  "sprehod, pot in cikel": [/\bsprehod\w*/u, /\bpot\w*/u, /\bcikel\w*/u],
  "povezanost in komponente": [/\bpovezan\w*/u, /\bkomponent\w*/u],
  "dvodelnost": [/\bdvodeln\w*/u],
  "komplement grafa": [/\bkomplement\w*/u],
  "izomorfizem": [/\bizomorf\w*/u]
});

assertTopicConceptCoverage("drevesa-vpeta", {
  "gozd": [/\bgozd\w*/u],
  "most": [/\bmost(?:u|a|ovi|ovih|om)?\b/u]
});

assertTopicConceptCoverage("barvanje-izomorfnost", {
  "ravninskost": [/\bravninsk\w*/u, /\bplanarn\w*/u],
  "ravninska vložitev": [/\bvlozit\w*/u, /\bvlozen\w*/u]
});

for (const key of ["flashcards", "quiz", "questions"]) {
  for (const item of data[key]) {
    assert(topicIds.has(item.topic), `${key}/${item.id} kaže na neznano temo ${item.topic}.`);
  }
}

for (const card of data.flashcards) {
  assert(nonEmpty(card.front) && nonEmpty(card.back), `Kartica ${card.id} nima sprednje ali zadnje strani.`);
}

for (const item of data.quiz) {
  assert(nonEmpty(item.prompt), `Kviz ${item.id} nima vprašanja.`);
  assert(Array.isArray(item.options) && item.options.length >= 2,
    `Kviz ${item.id} nima dovolj možnosti.`);
  assert(item.options.every(nonEmpty), `Kviz ${item.id} vsebuje prazno možnost.`);
  assert(Number.isInteger(item.correct) && item.correct >= 0 && item.correct < item.options.length,
    `Kviz ${item.id} ima neveljaven indeks pravilnega odgovora.`);
  assert(nonEmpty(item.explanation), `Kviz ${item.id} nima razlage pravilnega odgovora.`);
}

const externalPromptReferencePattern = /(?:iz|v)\s+(?:razdelk|poglavj|zapisk|gradiv)\w*|\bpdf(?:-ja)?\b|\b(?:trditev|lema|lemo|izrek)\s+\d+(?:\.\d+)*\b|\bzbirka zahteva\b|\bvprašanje iz teorijskega izpita\b/iu;
for (const item of data.questions) {
  assert(nonEmpty(item.prompt) && nonEmpty(item.answer),
    `Odprto vprašanje ${item.id} nima vprašanja ali odgovora.`);
  assert(!externalPromptReferencePattern.test(item.prompt),
    `Odprto vprašanje ${item.id} se sklicuje na zunanji razdelek ali gradivo namesto na samostojno formulacijo.`);
  assert(Array.isArray(item.rubric) && item.rubric.length >= 2 && item.rubric.every(nonEmpty),
    `Odprto vprašanje ${item.id} nima uporabne rubrike.`);
  if (typeof item.source === "string") {
    assert(allowedSourceFileNames.some(fileName => item.source.includes(fileName)),
      `Odprto vprašanje ${item.id} nima vira iz dovoljenih desetih PDF-jev: ${item.source}`);
  } else {
    assert(item.source && sourceIds.has(item.source.sourceId),
      `Odprto vprašanje ${item.id} nima veljavne strukturirane reference na dovoljeni PDF.`);
  }
  if (item.officialVariants !== undefined) {
    assert(Array.isArray(item.officialVariants),
      `Odprto vprašanje ${item.id} ima officialVariants, ki ni tabela.`);
    for (const [index, variant] of item.officialVariants.entries()) {
      assert(nonEmpty(variant?.id) && nonEmpty(variant?.prompt),
        `Uradna različica ${item.id}/officialVariants[${index}] nima ID-ja ali formulacije.`);
      assert(variant.source && sourceIds.has(variant.source.sourceId),
        `Uradna različica ${variant?.id || `${item.id}/${index}`} nima veljavnega teorijskega vira.`);
    }
  }
}

const normalizedQuestionPrompts = new Map();
for (const item of data.questions) {
  const promptKey = String(item.prompt)
    .replace(/<[^>]*>/g, " ")
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("sl");
  const previous = normalizedQuestionPrompts.get(promptKey);
  assert(!previous,
    `Podvojena formulacija odprtega vprašanja: ${previous} in ${item.id}.`);
  normalizedQuestionPrompts.set(promptKey, item.id);
}

for (const topic of data.topics) {
  const id = topic.id;
  assert(data.flashcards.filter(item => item.topic === id).length >= 4,
    `Tema ${id} ima premalo kartic.`);
  assert(data.quiz.filter(item => item.topic === id).length >= 4,
    `Tema ${id} ima premalo kviz vprašanj.`);
  assert(data.questions.filter(item => item.topic === id).length >= 7,
    `Tema ${id} ima premalo odprtih vprašanj.`);
}

for (const group of groups) {
  assert(data.questions.some(item => data.topics.find(topic => topic.id === item.topic)?.group === group),
    `Teorijski sklop ${group} nima odprtega vprašanja.`);
}

const structuredReferences = [];
const collectSourceReferences = (value, trail = "data") => {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectSourceReferences(entry, `${trail}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  if (Object.prototype.hasOwnProperty.call(value, "sourceId")) {
    structuredReferences.push([`${trail}.sourceId`, value.sourceId]);
  }
  for (const [key, entry] of Object.entries(value)) {
    collectSourceReferences(entry, `${trail}.${key}`);
  }
};
collectSourceReferences(data);
for (const [trail, sourceId] of structuredReferences) {
  assert(sourceIds.has(sourceId), `Neznana referenca na vir ${sourceId} v ${trail}.`);
}

const theoryExamIds = new Set(
  data.sources
    .filter(source => normalizeFile(source.file).startsWith("../izpit teorija/"))
    .map(source => source.id)
);
assert(theoryExamIds.size === 3, `Pričakovani so trije viri teorijskih izpitov, najdenih ${theoryExamIds.size}.`);

const officialQuestionEntries = data.questions.flatMap(question => {
  const variants = Array.isArray(question.officialVariants) ? question.officialVariants : [];
  if (variants.length) {
    assert(question.official === true,
      `Vprašanje ${question.id} vsebuje uradne formulacije, vendar ni označeno z official: true.`);
    return variants.map(variant => ({ ...variant, parentId: question.id }));
  }
  return question.official === true ? [{ id: question.id, prompt: question.prompt, source: question.source, parentId: question.id }] : [];
});
const officialEntryIds = officialQuestionEntries.map(entry => entry.id);
assert(officialEntryIds.every(nonEmpty), "Vsaka uradna formulacija mora imeti ID.");
assert(new Set(officialEntryIds).size === officialEntryIds.length,
  "ID-ji samostojnih uradnih vprašanj in uradnih formulacij morajo biti enolični.");
assert(officialQuestionEntries.length >= 15,
  `Potrebnih je najmanj 15 uradnih teorijskih formulacij, najdenih ${officialQuestionEntries.length}.`);
for (const question of officialQuestionEntries) {
  const sourceId = question.source?.sourceId;
  assert(theoryExamIds.has(sourceId),
    `Uradna formulacija ${question.id} ni strukturirano povezana z dovoljenim teorijskim izpitom.`);
}
for (const sourceId of theoryExamIds) {
  assert(officialQuestionEntries.some(question => question.source?.sourceId === sourceId),
    `Teorijski izpit ${sourceId} ni povezan z nobeno uradno formulacijo.`);
}

const essentialQuestionIdSet = new Set(data.essentialQuestionIds);
assert(essentialQuestionIdSet.size === data.essentialQuestionIds.length,
  "Nujna zbirka vsebuje podvojene ID-je.");
assert(data.essentialQuestionIds.every(id => idsByCollection.get("questions").includes(id)),
  "Nujna zbirka vsebuje ID, ki ne pripada kanoničnemu teorijskemu vprašanju.");
const essentialQuestions = data.essentialQuestionIds.map(id => data.questions.find(question => question.id === id));
assert(new Set(essentialQuestions.map(question => question.topic)).size === data.topics.length,
  "Nujna zbirka mora pokriti vseh 13 teorijskih tem.");
assert(officialQuestionEntries.every(entry => essentialQuestionIdSet.has(entry.parentId)),
  "Nujna zbirka mora vsebovati vse kanonične kartice z uradnimi formulacijami.");
assert(officialQuestionEntries.filter(entry => essentialQuestionIdSet.has(entry.parentId)).length === officialQuestionEntries.length,
  "Nujna zbirka ne ohrani vseh uradnih teorijskih formulacij.");
for (const requiredId of ["oq-ru-11", "oq-ru-07", "oq-ru-17", "oq-ru-04"]) {
  assert(essentialQuestionIdSet.has(requiredId),
    `Nujna zbirka mora vsebovati temeljno vprašanje o relacijah in urejenostih ${requiredId}.`);
}

const strings = [];
const collectStrings = (value, trail = "data") => {
  if (typeof value === "string") {
    strings.push([trail, value]);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectStrings(entry, `${trail}[${index}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) collectStrings(entry, `${trail}.${key}`);
  }
};
collectStrings(data);

const controlCharacter = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u;
const mojibake = /\uFFFD|\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF\u00AB\u00BB]|\u00E2[\u0080-\u00BF\u0100-\u017F\u2000-\u20FF]|\u00C4[\u0080-\u00BF\u0100-\u017F]|\u00C5[\u0080-\u00BF\u0100-\u017F]|\u0102[\u0080-\u00BF\u0100-\u20FF]|\u010E[\u0080-\u00BF\u0100-\u20FF]|\u010F\u017C|\u0139[\u0080-\u00BF\u0100-\u20FF]|\u013D[\u0080-\u00BF\u0100-\u20FF]/u;
const forbiddenRuntimeText = /\.\.[\\/](?:Izpiti|vaje)(?:[\\/]|\b)|cheatsheet|\bpisn(?:i|ega|em|ih|e|o)?\s+izpit(?:a|u|om|i|ov)?\b/iu;
const mathDelimiterPairs = new Map([
  ["\\(", "\\)"],
  ["\\[", "\\]"],
  ["$$", "$$"]
]);
const closingMathDelimiters = new Set(["\\)", "\\]"]);
const mathDelimiters = [...mathDelimiterPairs.keys(), ...closingMathDelimiters];

const delimiterSnippet = (value, index) => {
  const start = Math.max(0, index - 24);
  const end = Math.min(value.length, index + 48);
  return value.slice(start, end).replace(/\s+/g, " ");
};

const nextMathDelimiter = (value, fromIndex) => {
  let found = null;
  for (const delimiter of mathDelimiters) {
    const index = value.indexOf(delimiter, fromIndex);
    if (index !== -1 && (!found || index < found.index ||
      (index === found.index && delimiter.length > found.delimiter.length))) {
      found = { delimiter, index };
    }
  }
  return found;
};

const validateRuntimeMath = (trail, value) => {
  let cursor = 0;
  let open = null;
  while (cursor < value.length) {
    const found = nextMathDelimiter(value, cursor);
    if (!found) break;

    const { delimiter, index } = found;
    const slashDelimiter = delimiter.startsWith("\\");
    const precededBySlash = slashDelimiter && index > 0 && value[index - 1] === "\\";

    // Znotraj formule je npr. `\\[4pt]` veljaven TeX-ov prelom vrstice.
    // Zunaj formule pa enak dodatni backslash pomeni dobesedni/podvojeni delimiter.
    if (precededBySlash) {
      assert(open,
        `Podvojen KaTeX delimiter '\\${delimiter}' v ${trail}: "${delimiterSnippet(value, index - 1)}". ` +
        "Preverja se dejanska runtime vrednost niza; delimiter mora imeti natanko eno poševnico.");
      cursor = index + delimiter.length;
      continue;
    }

    if (!open) {
      assert(!closingMathDelimiters.has(delimiter),
        `KaTeX zaključni delimiter '${delimiter}' brez začetnega v ${trail}: "${delimiterSnippet(value, index)}".`);
      open = {
        delimiter,
        close: mathDelimiterPairs.get(delimiter),
        contentStart: index + delimiter.length,
        index
      };
      cursor = open.contentStart;
      continue;
    }

    assert(delimiter === open.close,
      `Neujemajoč ali gnezden KaTeX delimiter '${delimiter}' v ${trail}; ` +
      `za '${open.delimiter}' je pričakovan '${open.close}': "${delimiterSnippet(value, index)}".`);

    const formula = value.slice(open.contentStart, index);
    assert(formula.trim().length > 0,
      `Prazen KaTeX izraz med '${open.delimiter}${open.close}' v ${trail}.`);
    try {
      katex.renderToString(formula, {
        displayMode: open.delimiter !== "\\(",
        throwOnError: true,
        strict: "ignore"
      });
      formulaCount += 1;
    } catch (error) {
      fail(`KaTeX napaka v ${trail}: ${error.message}`);
    }
    cursor = index + delimiter.length;
    open = null;
  }

  assert(!open,
    `KaTeX začetni delimiter '${open?.delimiter}' brez zaključnega '${open?.close}' v ${trail}: ` +
    `"${delimiterSnippet(value, open?.index ?? 0)}".`);
};
let formulaCount = 0;

for (const [trail, value] of strings) {
  assert(!controlCharacter.test(value), `Kontrolni znak v ${trail}.`);
  assert(!mojibake.test(value), `Možna napačna pretvorba UTF-8 (mojibake) v ${trail}.`);
  assert(!forbiddenRuntimeText.test(value),
    `Theory-only podatki v ${trail} vsebujejo prepovedan vir ali omembo pisnega izpita.`);
  assert(!value.includes("\\pmod{,"), `Napačen zapis \\pmod v ${trail}.`);

  validateRuntimeMath(trail, value);
}

assert(formulaCount > 0, "V naloženih podatkih ni bila najdena nobena KaTeX formula.");

const appSource = fs.readFileSync(path.join(base, "app.js"), "utf8");
const stylesSource = fs.readFileSync(path.join(base, "styles.css"), "utf8");
const requiredQuestionUiContracts = [
  'data-testid="question-card"',
  'data-testid="question-select"',
  'data-testid="question-selection-toolbar"',
  'data-action="select-visible-questions"',
  'data-action="select-topic-questions"',
  'data-action="select-all-questions"',
  'data-action="clear-question-selection"',
  'data-action="export-selected-pdf"',
  'data-action="export-topic-pdf"',
  'data-testid="essential-question-collection"',
  'data-action="show-essential-questions"',
  'data-action="show-all-questions"',
  'data-action="select-essential-questions"',
  'data-action="export-essential-pdf"',
  'data-testid="topic-pdf-export"'
];
for (const contract of requiredQuestionUiContracts) {
  assert(appSource.includes(contract), `Uporabniški vmesnik vprašanj nima pogodbe ${contract}.`);
}
assert(appSource.includes("selectedQuestions: [...state.selectedQuestions]"),
  "Izbor vprašanj za PDF se ne shranjuje lokalno.");
assert(appSource.includes("officialVariants"),
  "Uporabniški vmesnik ne podpira združenih uradnih formulacij vprašanj.");
assert(stylesSource.includes(".question-card.selected") && stylesSource.includes(".answer-workspace"),
  "Manjkajo vizualna stanja izbrane kartice ali zaprtega prostora za odgovor.");
assert(stylesSource.includes(".essential-collection") && stylesSource.includes(".question-meta .essential"),
  "Manjka vizualno ločena nujna zbirka ali njena oznaka na karticah.");
assert(appSource.includes('data-core-size="${essentialQuestions.length}"') &&
  stylesSource.includes("content: attr(data-core-size)"),
  "Velika številka nujne zbirke mora biti vezana na dejansko število vprašanj.");
assert(!appSource.includes("Nujnih 35") && !stylesSource.includes('content: "35"'),
  "V vmesniku je ostal zastarel trdo zapisan obseg Nujnih 35.");
assert(!appSource.includes("V popolnem odgovoru zajemi") && !appSource.includes('data-testid="question-answer-plan"'),
  "Izpitni prikaz ne sme vnaprej razkrivati rubrike ali načrta odgovora.");

const pdfFunctionStart = appSource.indexOf("function exportQuestionsPdf(");
const pdfFunctionEnd = appSource.indexOf("\n  function renderQuestions(", pdfFunctionStart);
assert(pdfFunctionStart >= 0 && pdfFunctionEnd > pdfFunctionStart,
  "Funkcije za PDF-izvoz vprašanj ni mogoče najti.");
const pdfFunctionSource = appSource.slice(pdfFunctionStart, pdfFunctionEnd);
assert(pdfFunctionSource.includes('class="pdf-question"') &&
  pdfFunctionSource.includes("width:210mm") &&
  pdfFunctionSource.includes("height:295mm") &&
  pdfFunctionSource.includes("overflow:hidden") &&
  pdfFunctionSource.includes("page-break-inside:avoid") &&
  pdfFunctionSource.includes("page-break-after:always") &&
  pdfFunctionSource.includes(".pdf-question:last-child{page-break-after:auto}") &&
  pdfFunctionSource.includes("@page{size:A4 portrait;margin:0}") &&
  pdfFunctionSource.includes("html,body{width:210mm;margin:0!important;background:#fff}"),
"PDF-izvoz ne zagotavlja varne ene A4-strani za vsako vprašanje.");
assert((pdfFunctionSource.match(/page-break-after:always/gu) || []).length === 1,
  "PDF-izvoz mora imeti natanko eno pravilo za prelom med vprašanji.");
assert(pdfFunctionSource.includes("font-weight:400!important") &&
  pdfFunctionSource.includes("h1 *{font-weight:400!important}"),
"Besedilo vprašanja v PDF-ju mora biti izpisano z navadno, ne krepko pisavo.");
assert(pdfFunctionSource.includes('data-testid="pdf-official-wording"') &&
  pdfFunctionSource.includes("printableHtml(variant.prompt)"),
"PDF-izvoz mora pri vprašanju ohraniti pripeto dejansko uradno formulacijo.");
const pdfWithoutLegacyBreaks = pdfFunctionSource
  .replace(/page-break-(?:after|inside)/gu, "legacy-page-break");
assert(!/\bbreak-(?:after|inside)\s*:/u.test(pdfWithoutLegacyBreaks),
  "PDF-izvoz ne sme kombinirati WebKit-občutljivih modernih in starejših pravil za prelom strani.");
for (const forbiddenPdfLayout of ["pdf-writing", "repeating-linear-gradient", "height:297mm"]) {
  assert(!pdfFunctionSource.includes(forbiddenPdfLayout),
    `PDF-izvoz vsebuje prepovedano črtasto ali nestabilno postavitev (${forbiddenPdfLayout}).`);
}
for (const forbiddenPdfContent of ["question.answer", "question.hint", "question.rubric"]) {
  assert(!pdfFunctionSource.includes(forbiddenPdfContent),
    `PDF-izvoz ne sme vključiti rešitev, namigov ali rubrik (${forbiddenPdfContent}).`);
}

const counts = {
  topics: data.topics.length,
  sections: data.topics.reduce((sum, topic) => sum + topic.sections.length, 0),
  flashcards: data.flashcards.length,
  quiz: data.quiz.length,
  questions: data.questions.length,
  essentialQuestions: data.essentialQuestionIds.length,
  essentialTopics: new Set(essentialQuestions.map(question => question.topic)).size,
  essentialOfficialQuestions: officialQuestionEntries.filter(entry => essentialQuestionIdSet.has(entry.parentId)).length,
  officialQuestions: officialQuestionEntries.length,
  exercises: data.exercises.length,
  sources: data.sources.length,
  formulas: formulaCount,
  katexFontFiles: katexFontFiles.size
};

console.log("ADM theory-only validation OK");
console.log(JSON.stringify(counts, null, 2));
