# ADM — priprava na teorijski izpit

Interaktivna, statična priprava na **teorijski izpit iz Algebre in diskretne matematike**. Vsebina je organizirana po 13 temah in poudarja natančne definicije, izreke, dokaze, dokazne ideje, primere, protiprimere ter samostojno odgovarjanje na teorijska vprašanja.

## Strogo omejeni viri

Stran uporablja samo naslednje gradivo:

- sedem skript PDF iz mape `teorija`;
- tri stare teorijske izpite PDF iz mape `izpit teorija`.

Vaje, mapa `vaje`, navadni pisni izpiti iz mape `Izpiti` in `cheatsheet.tex` so namenoma izključeni. Ne vplivajo na vsebino, prioritete, vprašanja ali generator teorijskega izpita.

## Zagon

Stran ne potrebuje nameščanja paketov. KaTeX 0.16.22 in njegove pisave so vključeni lokalno v `vendor/katex`, zato matematični prikaz ne potrebuje interneta ali stare predloge. Iz korenske mape gradiva zaženi lokalni strežnik:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Nato odpri:

```text
http://127.0.0.1:4173/adm-izpitna-priprava/
```

Neposredno odpiranje `index.html` večinoma deluje, lokalni strežnik pa je zanesljivejši za povezave do PDF-jev.

## Kaj vsebuje

- podrobno teorijo po vseh 13 temah;
- kazalo definicij, izrekov in dokazov;
- kartice in kvize z razlagami;
- pregledne, oštevilčene kartice teorijskih vprašanj z zložljivim prostorom za lasten odgovor ter ločeno skritima namigom in vzorčnim odgovorom;
- najmanj 15 uradnih formulacij iz treh starih teorijskih izpitov; podvojene formulacije so združene z vsebinsko celovitim vprašanjem;
- kurirano jedro **Nujnih 35**, ki pokrije vseh 13 tem in vključuje vseh 15 dejanskih izpitnih formulacij, s preklopom nazaj na celotno banko 185 vprašanj;
- trajen izbor posameznih, prikazanih, tematskih ali vseh vprašanj ter čist A4-izvoz za ukaz »Shrani kot PDF«, vedno z enim vprašanjem na belem listu, pripeto uradno formulacijo in brez črt, namigov, rubrik ali rešitev;
- generator poskusnega teorijskega izpita;
- lokalno shranjevanje napredka v brskalniku pod ključem `admTheoryAtlasStateV1`.

Oznake zahtevnosti, predlagani časi in »učne uteži« so interne učne ocene aplikacije. Niso prepisane iz PDF-jev in ne predstavljajo uradnega točkovanja izpita.

## Preverjanje vsebine

Po spremembi katerekoli podatkovne datoteke iz korenske mape zaženi:

```powershell
node adm-izpitna-priprava/validate.cjs
```

Validator naloži vse štiri vsebinske module, banko teorijskih izpitov in končno podatkovno plast. Med drugim preveri:

- natanko 13 tem in nič vaj;
- natanko deset dovoljenih PDF-virov ter njihov obstoj na disku;
- odsotnost referenc na vaje, navadne pisne izpite in `cheatsheet`;
- enoličnost ID-jev ter veljavnost povezav med temami, vprašanji in viri;
- pokritost vsake teme z definicijami, izreki ali dokazi, karticami, kvizi in odprtimi vprašanji;
- najmanj 15 uradnih formulacij in povezavo z vsemi tremi teorijskimi izpiti;
- prisotnost izbornih kontrol ter pogodbo PDF-izvoza brez namigov, rubrik in rešitev, z eno A4-stranjo na vprašanje;
- pravilnost indeksov odgovorov v kvizih;
- izris vsake matematične formule s KaTeXom;
- kontrolne znake in pokvarjeno kodiranje besedila.

Uspešen pregled se konča z izpisom `ADM theory-only validation OK` in povzetkom števila vsebinskih elementov.
