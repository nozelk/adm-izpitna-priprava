(() => {
  "use strict";

  const H = String.raw;
  const GROUP = "logika-mnozice";

  const topics = [
    {
      id: "izjavni-racun",
      number: 1,
      group: GROUP,
      title: "Izjavni račun",
      short: "Od resničnostnih tabel do formalnega dokaza",
      accent: "#56c596",
      minutes: 95,
      importance: "nujno",
      sources: ["izjavni", "teorija-zbirka"],
      examNote: "Teorijski izpit izrecno preverja definicijo veljavnega sklepa, veljaven in neveljaven zgled ter prepoznavanje tavtologij. Odgovor mora vsebovati definicijo, utemeljitev in pri neveljavnosti konkretno določilo.",
      outcomes: [
        "prepoznam izjavo in pravilno zgrajen izjavni izraz",
        "brez ugibanja sestavim resničnostno tabelo",
        "uporabim osnovne logične enakovrednosti",
        "iz tabele zgradim izbrano DNO ali KNO",
        "veljaven sklep dokažem, neveljavnega pa ovržem s pravim protiprimerom",
        "zapišem kratek formalni dokaz z osnovnimi pravili sklepanja"
      ],
      sections: [
        {
          id: "ir-izjava",
          kind: "definition",
          label: "Temelj",
          title: "Izjava, resničnost in formalni jezik",
          html: `<p><strong>Izjava</strong> je smiseln povedni stavek, ki ima natanko eno logično vrednost: resnično \\(1\\) ali neresnično \\(0\\). Vprašanje, ukaz in odprta poved z nedoločeno spremenljivko niso izjave.</p>
          <p>Formalni jezik loči <em>sintakso</em> (kateri zapisi so dovoljeni) od <em>semantike</em> (kaj zapis pomeni in kdaj je resničen). To razlikovanje je osnova celotnega poglavja.</p>`
        },
        {
          id: "ir-vezniki",
          kind: "definition",
          label: "Definicije",
          title: "Logični vezniki",
          html: `<p>Za izjavi \\(A,B\\) uporabljamo:</p>
          <ul>
            <li>negacijo \\(\\neg A\\): resnična je natanko tedaj, ko je \\(A\\) napačna;</li>
            <li>konjunkcijo \\(A\\land B\\): resnična je natanko tedaj, ko sta resnični obe;</li>
            <li>disjunkcijo \\(A\\lor B\\): resnična je, ko je resnična vsaj ena, lahko tudi obe;</li>
            <li>implikacijo \\(A\\Rightarrow B\\): napačna je samo pri \\(A=1,B=0\\);</li>
            <li>ekvivalenco \\(A\\Leftrightarrow B\\): resnična je, ko imata izjavi isto vrednost;</li>
            <li>ekskluzivni ali \\(A\\mathbin{\\veebar}B\\): resnična je pri različnih vrednostih;</li>
            <li>NOR \\(A\\downarrow B=\\neg(A\\lor B)\\) in NAND \\(A\\uparrow B=\\neg(A\\land B)\\).</li>
          </ul>
          <p><strong>Določilo</strong> je nabor vrednosti vseh nastopajočih spremenljivk. Izraz z \\(n\\) spremenljivkami ima \\(2^n\\) določil. Dvomestnih logičnih operacij je \\(2^{2^2}=16\\).</p>`
        },
        {
          id: "ir-sintaksa",
          kind: "method",
          label: "Postopek",
          title: "Kako prepoznam izjavni izraz",
          html: `<p>Izjavne izraze gradimo induktivno:</p>
          <ol>
            <li>konstanti \\(0,1\\) sta izraza;</li>
            <li>izjavne spremenljivke \\(p,q,r,\\ldots\\) so izrazi;</li>
            <li>če je \\(A\\) izraz, je \\((\\neg A)\\) izraz;</li>
            <li>če sta \\(A,B\\) izraza in je \\(\\circ\\) dvomestni veznik, je \\((A\\circ B)\\) izraz.</li>
          </ol>
          <p>Pri izpuščanju oklepajev uporabljamo prednost \\(\\neg\\), nato \\(\\land,\\uparrow,\\downarrow,\\lor,\\veebar,\\Rightarrow,\\Leftrightarrow\\). Konstrukcijsko drevo je zanesljiv način preverjanja, kateri veznik je glavni.</p>`
        },
        {
          id: "ir-tabela",
          kind: "method",
          label: "Algoritem",
          title: "Resničnostna tabela brez izpuščenih vrstic",
          html: `<ol>
            <li>Naštej vse spremenljivke in vseh \\(2^n\\) določil v stalnem vrstnem redu.</li>
            <li>Dodaj stolpce za podizraze od najglobljega proti glavnemu vezniku.</li>
            <li>Vsak stolpec izračunaj le iz že izpolnjenih stolpcev.</li>
            <li>Zadnji stolpec klasificiraj: same enice pomenijo tavtologijo, same ničle protislovje, mešan stolpec pa izpolnljiv, a ne splošno veljaven izraz.</li>
          </ol>
          <p>Za primerjavo izrazov morata imeti njuna končna stolpca pri <em>istem vrstnem redu določil</em> enake vrednosti.</p>`
        },
        {
          id: "ir-klasifikacija",
          kind: "definition",
          label: "Semantika",
          title: "Tavtologija, protislovje, enakovrednost in posledica",
          html: `<p>Izraz \\(A\\) je <strong>tavtologija</strong>, če je resničen pri vsakem določilu; pišemo \\(\\models A\\). Je <strong>protislovje</strong>, če je pri vsakem določilu napačen.</p>
          <p>Izraz je <strong>izpolnljiv</strong>, če je resničen pri vsaj enem določilu. Izraz, ki je izpolnljiv, a ni tavtologija, ima v tabeli tako enice kot ničle. Zato je protislovje natanko izraz, ki ni izpolnljiv.</p>
          <p>Izraza sta logično enakovredna, \\(A\\equiv B\\), natanko tedaj, ko je \\(A\\Leftrightarrow B\\) tavtologija. Izraz \\(B\\) je logična posledica \\(A\\), \\(A\\models B\\), natanko tedaj, ko je \\(A\\Rightarrow B\\) tavtologija.</p>`
        },
        {
          id: "ir-zakoni",
          kind: "theorem",
          label: "Izpitno jedro",
          title: "Osnovne logične enakovrednosti",
          html: `<div class="formula-grid">
          <p>\\(\\neg\\neg A\\equiv A\\)</p>
          <p>\\(A\\land A\\equiv A\\), \\(A\\lor A\\equiv A\\)</p>
          <p>\\(A\\land B\\equiv B\\land A\\), \\(A\\lor B\\equiv B\\lor A\\)</p>
          <p>\\((A\\land B)\\land C\\equiv A\\land(B\\land C)\\)</p>
          <p>\\((A\\lor B)\\lor C\\equiv A\\lor(B\\lor C)\\)</p>
          <p>\\(A\\land(B\\lor C)\\equiv(A\\land B)\\lor(A\\land C)\\)</p>
          <p>\\(A\\lor(B\\land C)\\equiv(A\\lor B)\\land(A\\lor C)\\)</p>
          <p>\\(\\neg(A\\land B)\\equiv\\neg A\\lor\\neg B\\)</p>
          <p>\\(\\neg(A\\lor B)\\equiv\\neg A\\land\\neg B\\)</p>
          <p>\\(A\\Rightarrow B\\equiv\\neg A\\lor B\\)</p>
          <p>\\(A\\Rightarrow B\\equiv\\neg B\\Rightarrow\\neg A\\)</p>
          <p>\\(A\\lor(A\\land B)\\equiv A\\), \\(A\\land(A\\lor B)\\equiv A\\)</p>
          </div>
          <p>Dodaj še zakona \\(A\\lor\\neg A\\equiv1\\), \\(A\\land\\neg A\\equiv0\\) in pravila z \\(0,1\\). Pri računu vedno napiši ime uporabljenega zakona.</p>`
        },
        {
          id: "ir-zakoni-dopolnilo",
          kind: "theorem",
          label: "Celoten seznam iz PDF",
          title: "Preostale enakovrednosti in logični posledici",
          html: `<div class="formula-grid">
            <p>\\(A\\Leftrightarrow B\\equiv B\\Leftrightarrow A\\)</p>
            <p>\\(A\\Leftrightarrow B\\equiv\\neg A\\Leftrightarrow\\neg B\\)</p>
            <p>\\(\\neg(A\\Leftrightarrow B)\\equiv A\\Leftrightarrow\\neg B\\)</p>
            <p>\\(A\\land0\\equiv0\\), \\(A\\land1\\equiv A\\)</p>
            <p>\\(A\\lor0\\equiv A\\), \\(A\\lor1\\equiv1\\)</p>
            <p>\\(A\\lor\\neg A\\equiv1\\), \\(A\\land\\neg A\\equiv0\\)</p>
            <p>\\(A\\land B\\models A\\)</p>
            <p>\\(A\\models A\\lor B\\)</p>
          </div>
          <p>Logična enakovrednost je refleksivna, simetrična in tranzitivna: \\(A\\equiv A\\); iz \\(A\\equiv B\\) sledi \\(B\\equiv A\\); iz \\(A\\equiv B\\) in \\(B\\equiv C\\) sledi \\(A\\equiv C\\). Zato lahko enakovrednosti dokazujemo z verigo pravilnih preoblikovanj.</p>`
        },
        {
          id: "ir-normalne",
          kind: "theorem",
          label: "Normalne oblike",
          title: "Izbrana disjunktivna in konjunktivna oblika",
          html: `<p>Za določilo \\(D\\) sestavimo <strong>osnovno konjunkcijo</strong> tako, da vzamemo \\(p_i\\), če je njegova vrednost 1, in \\(\\neg p_i\\), če je 0. Ta konjunkcija je resnična natanko pri \\(D\\). Disjunkcija mintermov vseh vrstic, kjer je \\(A=1\\), je izbrana DNO izraza \\(A\\).</p>
          <p>Za osnovno disjunkcijo vzamemo nasprotno: \\(\\neg p_i\\) pri vrednosti 1 in \\(p_i\\) pri vrednosti 0. Napačna je natanko pri izbranem določilu. Konjunkcija maxtermov vseh vrstic, kjer je \\(A=0\\), je izbrana KNO.</p>
          <p><strong>Izrek.</strong> Vsak izraz, ki ni protislovje, ima izbrano DNO; vsak izraz, ki ni tavtologija, ima izbrano KNO. Dobljena oblika je enakovredna prvotnemu izrazu.</p>`
        },
        {
          id: "ir-polnost",
          kind: "proof",
          label: "Ideja dokaza",
          title: "Zakaj sta NAND in NOR sama zase dovolj",
          html: `<p>Normalne oblike pokažejo, da je \\(\\{\\neg,\\land,\\lor\\}\\) poln nabor. Nato izrazimo manjkajoče veznike:</p>
          \\[\\neg A\\equiv A\\downarrow A,\\qquad A\\lor B\\equiv(A\\downarrow B)\\downarrow(A\\downarrow B).\\]
          <p>Zato je že \\(\\{\\downarrow\\}\\) poln. Podobno:</p>
          \\[\\neg A\\equiv A\\uparrow A,\\qquad A\\land B\\equiv(A\\uparrow B)\\uparrow(A\\uparrow B),\\]
          <p>zato je poln tudi \\(\\{\\uparrow\\}\\).</p>`
        },
        {
          id: "ir-sklep",
          kind: "definition",
          label: "Sklepanje",
          title: "Veljaven sklep in formalni dokaz",
          html: `<p>Sklep \\(A_1,\\ldots,A_n\\models B\\) je veljaven natanko tedaj, ko je</p>
          \\[(A_1\\land\\cdots\\land A_n)\\Rightarrow B\\]
          <p>tavtologija. Semantično: ne obstaja določilo, pri katerem bi bile vse premise resnične, zaključek pa napačen.</p>
          <p>Dokaz iz premis je zaporedje formul, kjer je vsaka vrstica premisa, tavtologija ali posledica prejšnjih vrstic po veljavnem pravilu; zadnja vrstica je zahtevani zaključek.</p>`
        },
        {
          id: "ir-pravila",
          kind: "theorem",
          label: "Na pamet",
          title: "Sedem osnovnih pravil sklepanja",
          html: `<ul>
            <li>MP: \\(A, A\\Rightarrow B\\models B\\);</li>
            <li>MT: \\(A\\Rightarrow B,\\neg B\\models\\neg A\\);</li>
            <li>DS: \\(A\\lor B,\\neg A\\models B\\);</li>
            <li>HS: \\(A\\Rightarrow B,B\\Rightarrow C\\models A\\Rightarrow C\\);</li>
            <li>poenostavitev: \\(A\\land B\\models A\\);</li>
            <li>združitev: \\(A,B\\models A\\land B\\);</li>
            <li>pridružitev: \\(A\\models A\\lor B\\).</li>
          </ul>`
        },
        {
          id: "ir-primer",
          kind: "example",
          label: "Lahek primer",
          title: "Kratek veljaven sklep",
          html: `<p>Premise: \\(p\\land q\\) in \\(p\\Rightarrow r\\). Iz prve premise s poenostavitvijo dobimo \\(p\\), nato iz \\(p\\) in \\(p\\Rightarrow r\\) z modus ponens dobimo \\(r\\). Torej</p>
          \\[p\\land q,\\ p\\Rightarrow r\\models r.\\]`
        },
        {
          id: "ir-protiprimer",
          kind: "counterexample",
          label: "Protiprimer",
          title: "Kako pravilno ovržem sklep",
          html: `<p>Sklep \\(p\\lor q,\\neg r\\Rightarrow q,\\neg p\\models\\neg r\\) ni veljaven. Vzemi</p>
          \\[p=0,\\qquad q=1,\\qquad r=1.\\]
          <p>Vse tri premise imajo vrednost 1, zaključek \\(\\neg r\\) pa 0. To je popoln protiprimer. Pogosta napačna izbira \\(p=1,q=0,r=1\\) ne deluje, ker je tedaj premisa \\(\\neg p\\) napačna.</p>`
        },
        {
          id: "ir-izpit-tavtologije",
          kind: "example",
          label: "Zbirka teorijskih izpitov",
          title: "Katere od treh natisnjenih formul so tavtologije",
          html: `<ol>
            <li>\\((p\\land q)\\Rightarrow(p\\lor q)\\) je <strong>tavtologija</strong>. Če je antecedent resničen, sta \\(p,q\\) resnična, zato je resničen tudi konsekvent; če antecedent ni resničen, je implikacija avtomatično resnična.</li>
            <li>\\(\\neg(p\\Rightarrow q)\\Leftrightarrow(\\neg p\\Rightarrow\\neg q)\\) <strong>ni</strong> tavtologija. Pri \\(p=0,q=0\\) je leva stran ekvivalence \\(0\\), desna pa \\(1\\), zato je celotna ekvivalenca napačna.</li>
            <li>\\((p\\land(p\\Rightarrow q))\\Leftrightarrow q\\) <strong>ni</strong> tavtologija. Pri \\(p=0,q=1\\) je leva stran \\(0\\), desna pa \\(1\\).</li>
          </ol>
          <p>Pri vprašanju »katere so tavtologije« moraš za tavtologijo utemeljiti <em>vsa</em> določila, za netavtologijo pa zadostuje eno napačno določilo.</p>`
        },
        {
          id: "ir-ds-dokaz",
          kind: "proof",
          label: "Izrek 1.10",
          title: "Kako se dokaže veljavnost pravila sklepanja",
          html: `<p>Za disjunktivni silogizem \\(A\\lor B,\\neg A\\models B\\) preverimo tavtološkost pripadajoče implikacije:</p>
          \\[((A\\lor B)\\land\\neg A)\\Rightarrow B.\\]
          <p>Če sta premisi resnični, iz \\(A\\lor B\\) vemo, da velja vsaj ena od \\(A,B\\), premisa \\(\\neg A\\) pa možnost \\(A\\) izključi; zato mora veljati \\(B\\). Semantično to pomeni, da ni določila z obema premisama 1 in zaključkom 0. Enako lahko vsako od sedmih pravil dokažemo z resničnostno tabelo ali osnovnimi enakovrednostmi.</p>`
        },
        {
          id: "ir-pasti",
          kind: "pitfall",
          label: "Izpitne pasti",
          title: "Pet napak, ki odnesejo točke",
          html: `<ul>
            <li>»Ali« v matematiki praviloma pomeni vključujočo disjunkcijo.</li>
            <li>Iz \\(A\\Rightarrow B\\) in \\(B\\) ne smeš sklepati \\(A\\) — to je potrjevanje posledice.</li>
            <li>Iz \\(A\\Rightarrow B\\) in \\(\\neg A\\) ne smeš sklepati \\(\\neg B\\).</li>
            <li>Neveljaven sklep zahteva eno vrstico z resničnimi premisami in napačnim zaključkom.</li>
            <li>Pri DNO izbiramo vrstice z 1, pri KNO vrstice z 0.</li>
          </ul>`
        },
        {
          id: "ir-ustni-odgovor",
          kind: "explanation",
          label: "Teorijski odgovor",
          title: "Kako popolno odgovoriš na teorijsko vprašanje",
          html: `<p>Pri vsakem pojmu najprej povej formalno definicijo, nato jo razloži z besedami. Pri izreku navedi vse predpostavke in sklep, zatem jedro dokaza. Pri veljavnem sklepu pokaži, da je pripadajoča implikacija tavtologija ali sestavi formalni dokaz; pri neveljavnem sklepu navedi določilo z vsemi premisami enakimi 1 in zaključkom 0.</p>`
        },
        {
          id: "ir-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Izjavni račun v enem dihu",
          html: `<p>Izjava ima vrednost 0 ali 1. Tabela obdela vseh \\(2^n\\) določil. Enakovrednost pomeni enaka končna stolpca; veljaven sklep pomeni, da ni vrstice z vsemi premisami 1 in zaključkom 0. Implikacijo odpravi z \\(A\\Rightarrow B\\equiv\\neg A\\lor B\\), negacijo potisni z De Morganom. DNO gradi iz enic, KNO iz ničel. Dokazuj z MP, MT, DS in HS.</p>`
        }
      ],
      checklist: [
        "Znam formalno definirati izjavo, izraz, določilo in vseh pet glavnih veznikov.",
        "Znam vseh pet glavnih resničnostnih tabel in ločim vključujoči od izključujočega ali.",
        "Znam našteti vsa določila brez izpuščanja.",
        "Znam navesti osnovne enakovrednosti, jih uporabiti z imenom zakona in odpraviti implikacijo.",
        "Znam zgraditi DNO in KNO.",
        "Znam navesti sedem pravil sklepanja.",
        "Pri neveljavnem sklepu znam dati pravo vrednotenje."
      ]
    },
    {
      id: "predikatni-racun",
      number: 2,
      group: GROUP,
      title: "Predikatni račun",
      short: "Interpretacije, kvantifikatorji in protiprimeri",
      accent: "#78b7ff",
      minutes: 75,
      importance: "nujno",
      sources: ["predikati", "teorija-2021", "teorija-zbirka"],
      examNote: "Teorijski izpiti zahtevajo zapis trditev s kvantifikatorji in presojo formul. En PDF zahteva resnično in neresnično interpretacijo iste formule, toda natisnjena formula je splošno veljavna, zato napačna interpretacija ne obstaja; glej posebno opozorilo spodaj.",
      outcomes: [
        "ločim formulo od izjave in podam njeno interpretacijo",
        "pravilno prevedem med naravnim in formalnim jezikom",
        "negiram poljubno dolgo verigo kvantifikatorjev",
        "ločim univerzalno pričo, eksistenčno pričo in protiprimer",
        "razumem, zakaj vrstnega reda kvantifikatorjev ne smemo poljubno menjati",
        "sestavim interpretacijo, ki ovrže splošno veljavnost"
      ],
      sections: [
        {
          id: "pr-predikat",
          kind: "definition",
          label: "Osnove",
          title: "Jezik, term, predikat in atomska formula",
          html: H`<p><strong>Jezik predikatnega računa</strong> določi spremenljivke, morebitne konstante in funkcijske simbole, predikatske simbole z določeno mestnostjo ter logične veznike in kvantifikatorja. <strong>Term</strong> poimenuje objekt: spremenljivka in konstanta sta terma, iz termov pa s \(k\)-mestnim funkcijskim simbolom \(f\) dobimo term \(f(t_1,\ldots,t_k)\).</p>
          <p><strong>Predikat</strong> je simbol za lastnost ali relacijo. \(P\) je enomesten, \(R\) dvomesten in \(T\) tromesten predikatski simbol, če sprejmejo po en, dva oziroma tri argumente. <strong>Atomska formula</strong> je najenostavnejša formula, na primer \(P(t)\), \(R(t_1,t_2)\) ali \(t_1=t_2\); iz atomskih formul gradimo sestavljene formule z vezniki in kvantifikatorjema.</p>
          <p><strong>Primer.</strong> V jeziku s konstanto \(0\), funkcijo \(s\) in dvomestnim predikatom \(<\) je \(s(s(0))\) term, \(x<s(0)\) atomska formula, \(\forall x\,(x<s(0)\lor x=s(0))\) pa zaprta formula. Sam zapis \(\forall x\) ni formula, \(<(x)\) pa je napačno zgrajen, ker je \(<\) dvomesten.</p>
          <p>Formula z vsaj eno prosto spremenljivko je <strong>odprta</strong> in njena resničnost je odvisna tudi od prireditve tem spremenljivkam. Formula brez prostih spremenljivk je <strong>zaprta</strong> oziroma stavek; po izbiri interpretacije ima logično vrednost. Pogosta napaka je enačiti predikatni simbol \(P\), ki še nima pomena, z množico objektov, za katere velja: to množico mu šele priredi interpretacija.</p>`
        },
        {
          id: "pr-interpretacija",
          kind: "definition",
          label: "Semantika",
          title: "Kaj vsebuje interpretacija",
          html: `<p><strong>Struktura oziroma interpretacija</strong> \\(\\mathcal M\\) jeziku priredi matematični pomen:</p>
          <ol>
            <li>neprazno področje pogovora \\(U\\);</li>
            <li>vsakemu konstantnemu simbolu \\(c\\) element \\(c^{\\mathcal M}\\in U\\);</li>
            <li>vsakemu \\(k\\)-mestnemu funkcijskemu simbolu \\(f\\) funkcijo \\(f^{\\mathcal M}:U^k\\to U\\);</li>
            <li>vsakemu \\(k\\)-mestnemu predikatskemu simbolu \\(P\\) relacijo \\(P^{\\mathcal M}\\subseteq U^k\\).</li>
          </ol>
          <p>Za vrednotenje <em>odprte</em> formule dodatno izberemo <strong>prireditev spremenljivk</strong> \\(s:\\mathrm{Var}\\to U\\). Ta prireditev ni del strukture; kvantifikator spremeni vrednost svoje vezane spremenljivke samo znotraj svojega dosega. Zaprta formula od prireditve prostim spremenljivkam ni odvisna.</p>
          <p>Ista zaprta formula je lahko pri eni interpretaciji resnična in pri drugi napačna. Formula \\(\\forall y\\exists x(x<y)\\) je na \\(\\mathbb R\\) resnična, na \\(\\mathbb N=\\{1,2,\\ldots\\}\\) pa napačna.</p>`
        },
        {
          id: "pr-proste",
          kind: "explanation",
          label: "Doseg",
          title: "Proste in vezane spremenljivke",
          html: `<p>Pojavitev \\(x\\) je <strong>vezana</strong>, če leži v dosegu \\(\\forall x\\) ali \\(\\exists x\\); sicer je prosta. V \\(\\forall x\\,R(x,y)\\) je \\(x\\) vezana, \\(y\\) pa prosta. Formula je zaprta in zato kandidatka za izjavo šele, ko nima prostih spremenljivk.</p>
          <p>Vezano spremenljivko smemo dosledno preimenovati, če ne ujamemo druge proste spremenljivke: \\(\\forall xP(x)\\equiv\\forall zP(z)\\).</p>`
        },
        {
          id: "pr-kvantifikatorja",
          kind: "definition",
          label: "Definiciji",
          title: "Univerzalni in eksistenčni kvantifikator",
          html: `<p>\\(\\forall xP(x)\\) je resnična natanko tedaj, ko \\(P(a)\\) velja za vsak \\(a\\in U\\). Za dokaz vzamemo poljuben \\(a\\) in brez dodatnih predpostavk dokažemo \\(P(a)\\). Za ovržbo zadostuje en <strong>protiprimer</strong>.</p>
          <p>\\(\\exists xP(x)\\) je resnična natanko tedaj, ko obstaja vsaj ena <strong>priča</strong> \\(a\\in U\\) s \\(P(a)\\). Za ovržbo moramo dokazati \\(\\forall x\\neg P(x)\\).</p>`
        },
        {
          id: "pr-negacije",
          kind: "theorem",
          label: "De Morgan",
          title: "Negiranje kvantificiranih izjav",
          html: `\\[\\neg\\forall xP(x)\\equiv\\exists x\\neg P(x),\\qquad
          \\neg\\exists xP(x)\\equiv\\forall x\\neg P(x).\\]
          <p>Pri negiranju daljše formule negacijo premikamo od zunaj navznoter: zamenjamo \\(\\forall\\leftrightarrow\\exists\\), nato negiramo jedro in uporabimo pravila izjavnega računa. Primer:</p>
          \\[\\neg\\forall x\\exists y\\,R(x,y)\\equiv\\exists x\\forall y\\,\\neg R(x,y).\\]`
        },
        {
          id: "pr-omejeni",
          kind: "theorem",
          label: "Popravljena formula",
          title: "Omejeni kvantifikatorji",
          html: `<p>Za množico \\(A\\subseteq U\\) pravilno velja:</p>
          \\[(\\forall x\\in A)P(x)\\equiv\\forall x(x\\in A\\Rightarrow P(x)),\\]
          \\[(\\exists x\\in A)P(x)\\equiv\\exists x(x\\in A\\land P(x)).\\]
          <p>Pri eksistenčnem kvantifikatorju mora biti <strong>konjunkcija</strong>, ne implikacija. Z implikacijo bi vsak \\(x\\notin A\\) avtomatično postal priča. Negaciji sta:</p>
          \\[\\neg(\\forall x\\in A)P(x)\\equiv(\\exists x\\in A)\\neg P(x),\\]
          \\[\\neg(\\exists x\\in A)P(x)\\equiv(\\forall x\\in A)\\neg P(x).\\]`
        },
        {
          id: "pr-porazdelitev",
          kind: "theorem",
          label: "Velja / ne velja",
          title: "Kvantifikatorji in vezniki",
          html: `<p>Veljata enakovrednosti:</p>
          \\[\\forall x(P(x)\\land Q(x))\\equiv(\\forall xP(x))\\land(\\forall xQ(x)),\\]
          \\[\\exists x(P(x)\\lor Q(x))\\equiv(\\exists xP(x))\\lor(\\exists xQ(x)).\\]
          <p>Pri preostalih dveh kombinacijah praviloma dobimo le eno smer:</p>
          \\[\\exists x(P\\land Q)\\Rightarrow(\\exists xP)\\land(\\exists xQ),\\]
          \\[(\\forall xP)\\lor(\\forall xQ)\\Rightarrow\\forall x(P\\lor Q).\\]
          <p>Obrata obeh zadnjih implikacij sta lahko napačna. Na \\(U=\\{1,2\\}\\) naj \\(P\\) velja samo za 1, \\(Q\\) pa samo za 2. Tedaj sta \\(\\exists xP(x)\\) in \\(\\exists xQ(x)\\) resnični, vendar skupne priče za \\(P\\land Q\\) ni. Hkrati za vsak \\(x\\) velja \\(P(x)\\lor Q(x)\\), vendar niti \\(P\\) niti \\(Q\\) ne velja za vse elemente. Torej ne veljata</p>
          \\[(\\exists xP)\\land(\\exists xQ)\\Rightarrow\\exists x(P\\land Q),\\]
          \\[\\forall x(P\\lor Q)\\Rightarrow(\\forall xP)\\lor(\\forall xQ).\\]
          <p>Prva napaka zamenja dve morebiti različni priči za eno skupno, druga pa iz lastnosti, ki se lahko od elementa do elementa menja, neupravičeno izbere eno lastnost za vse elemente.</p>`
        },
        {
          id: "pr-vrstni-red",
          kind: "theorem",
          label: "Dva kvantifikatorja",
          title: "Vrstni red spremeni pomen",
          html: `<p>Vedno velja</p>
          \\[\\exists y\\forall xP(x,y)\\Rightarrow\\forall x\\exists yP(x,y),\\]
          <p>ker lahko isto eksistenčno pričo \\(y\\) uporabimo za vsak \\(x\\). Obrat ne velja: pri \\(\\forall x\\exists y\\) je priča \\(y\\) lahko odvisna od \\(x\\).</p>
          <p>Na \\(\\mathbb N\\) je \\(\\forall x\\exists y(y>x)\\) resnična, \\(\\exists y\\forall x(y>x)\\) pa napačna.</p>`
        },
        {
          id: "pr-sokrat",
          kind: "example",
          label: "Lahek primer",
          title: "Notranja zgradba Sokratovega sklepa",
          html: `<p>Naj \\(C(x)\\) pomeni »\\(x\\) je človek«, \\(S(x)\\) pa »\\(x\\) je smrten«. Tedaj:</p>
          \\[\\forall x(C(x)\\Rightarrow S(x)),\\quad C(s)\\models S(s).\\]
          <p>Univerzalno premiso uporabimo pri konkretnem \\(s\\), dobimo \\(C(s)\\Rightarrow S(s)\\), nato uporabimo modus ponens.</p>`
        },
        {
          id: "pr-izpit-premice",
          kind: "example",
          label: "Teorijski izpit 2021",
          title: "Prevod trditev o premicah v kvantifikatorje",
          html: `<p>Področje pogovora so vse premice v ravnini. Naj \\(P(x,y)\\) pomeni »\\(x\\) je pravokotna na \\(y\\)«, \\(Q(x,y)\\) pa »\\(x\\) je vzporedna z \\(y\\)«. Tedaj:</p>
          <ul>
            <li>vsaka premica je vzporedna sama sebi: \\(\\forall x\\,Q(x,x)\\);</li>
            <li>nobena premica ni pravokotna sama nase: \\(\\forall x\\,\\neg P(x,x)\\), enakovredno \\(\\neg\\exists x\\,P(x,x)\\);</li>
            <li>za vsako premico obstaja pravokotnica: \\(\\forall x\\exists y\\,P(x,y)\\);</li>
            <li>če je premica pravokotna na drugi dve, sta ti vzporedni:
              \\(\\forall x\\forall y\\forall z\\big((P(x,y)\\land P(x,z))\\Rightarrow Q(y,z)\\big)\\).</li>
          </ul>
          <p>Pri zadnji formuli morajo biti vsi trije kvantifikatorji zunaj implikacije. Spremenljivka \\(x\\) označuje skupno pravokotnico, \\(y,z\\) pa premici, katerih vzporednost sklepamo.</p>`
        },
        {
          id: "pr-izpit-formula-napaka",
          kind: "pitfall",
          label: "Zbirka teorijskih izpitov",
          title: "Formula, ki je po zapisu že splošno veljavna",
          html: `<p>V zbirki je natisnjena zahteva po resnični in neresnični interpretaciji formule</p>
          \\[\\forall x\\exists y\\big(P(y,x)\\Rightarrow P(x,y)\\big).\\]
          <p>Za zapisano formulo <strong>neresnična interpretacija ne obstaja</strong> (pri običajno nepraznem področju pogovora): za vsak \\(x\\) izberemo \\(y=x\\). Jedro postane \\(P(x,x)\\Rightarrow P(x,x)\\), kar je tavtologija ne glede na pomen \\(P\\). Zato je formula splošno veljavna. Če je bila mišljena dodatna zahteva \\(y\\ne x\\) ali drug veznik, bi šele tedaj lahko poiskali neresnično interpretacijo.</p>
          <p>To je pomemben teorijski pregled: pred iskanjem modela vedno preveri, ali lahko kvantificirani spremenljivki izenačiš.</p>`
        },
        {
          id: "pr-protiprimer",
          kind: "counterexample",
          label: "Jasen protiprimer",
          title: "Dve priči nista nujno ista priča",
          html: `<p>Na \\(U=\\{1,2\\}\\) naj velja samo \\(P(1)\\) in samo \\(Q(2)\\). Tedaj je</p>
          \\[(\\exists xP(x))\\land(\\exists xQ(x))\\]
          <p>resnična, vendar je \\(\\exists x(P(x)\\land Q(x))\\) napačna. Zato teh formul ne smemo zamenjati.</p>`
        },
        {
          id: "pr-splosna",
          kind: "definition",
          label: "Modeli",
          title: "Splošna veljavnost in protiprimer",
          html: `<p>Formula je <strong>splošno veljavna</strong>, če je resnična pri vsaki interpretaciji. Za dokaz splošne veljavnosti argument ne sme uporabiti posebnih lastnosti izbranega univerzuma. Za ovržbo zadostuje ena interpretacija, kjer formula postane napačna.</p>
          <p>Formula \\(\\forall x\\forall y(P(x,y)\\Rightarrow P(y,x))\\) ni splošno veljavna: na \\(\\mathbb N\\) vzemi \\(P(x,y)\\equiv x\\le y\\) ter \\(x=2,y=3\\).</p>`
        },
        {
          id: "pr-metoda",
          kind: "method",
          label: "Izpitni postopek",
          title: "Negacija in presoja v štirih korakih",
          html: `<ol>
            <li>Zapiši univerzum in prevedi pomen vseh predikatov.</li>
            <li>Negacijo potisni navznoter do atomov; kvantifikatorje zamenjaj.</li>
            <li>Za resnični \\(\\exists\\) navedi pričo, za napačni \\(\\forall\\) protiprimer.</li>
            <li>Pri \\(\\forall x\\exists y\\) povej, kako iz poljubnega \\(x\\) izbereš \\(y\\); pri napačnem \\(\\exists x\\forall y\\) po vsakem kandidatu izberi nasprotni \\(y\\).</li>
          </ol>`
        },
        {
          id: "pr-pasti",
          kind: "pitfall",
          label: "Izpitne pasti",
          title: "Kje se pomen neopazno spremeni",
          html: `<ul>
            <li>Ne zamenjaj \\(\\forall x\\exists y\\) in \\(\\exists y\\forall x\\).</li>
            <li>Omejeni \\(\\exists\\) uporablja \\(\\land\\), omejeni \\(\\forall\\) pa \\(\\Rightarrow\\).</li>
            <li>Negacija \\(x<y\\) je \\(x\\ge y\\), ne le \\(x>y\\).</li>
            <li>Priča za \\(\\exists\\) mora pripadati področju pogovora.</li>
            <li>En primer ne dokazuje univerzalne izjave; en protiprimer jo ovrže.</li>
          </ul>`
        },
        {
          id: "pr-ustni-odgovor",
          kind: "explanation",
          label: "Teorijski odgovor",
          title: "Od formule do popolne utemeljitve",
          html: `<p>Dober teorijski odgovor ne ostane pri »pravilna« ali »napačna«. Zapiše interpretacijo, nato za resnični \\(\\exists\\) pokaže pričo, za resnični \\(\\forall\\) poda splošni argument, za napačni \\(\\forall\\) protiprimer in za napačni \\(\\exists\\) dokaže, da ne deluje noben kandidat. Zveznost \\(\\forall\\varepsilon\\exists\\delta\\) je model za razumevanje, da je druga priča lahko odvisna od prve spremenljivke.</p>`
        },
        {
          id: "pr-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Predikatni račun v enem dihu",
          html: `<p>Predikat dobi pomen šele z interpretacijo. \\(\\forall\\) dokazujemo s poljubnim elementom in ovržemo z enim protiprimerom; \\(\\exists\\) dokazujemo z eno pričo in ovržemo univerzalno. Negacija zamenja \\(\\forall\\leftrightarrow\\exists\\). Omejeni \\(\\forall\\) skriva implikacijo, omejeni \\(\\exists\\) konjunkcijo. Vrstni red kvantifikatorjev je del pomena.</p>`
        }
      ],
      checklist: [
        "Ločim term, predikatni simbol, atomsko, odprto in zaprto formulo.",
        "Znam določiti proste in vezane spremenljivke.",
        "Znam navesti vse dele interpretacije.",
        "Negacijo potisnem do atomskih formul.",
        "Znam zapisati vse štiri trditve o premicah iz teorijskega izpita 2021.",
        "Pred iskanjem interpretacij preverim, ali je formula morda splošno veljavna.",
        "Omejeni eksistenčni kvantifikator vedno zapišem s konjunkcijo.",
        "Znam dati protiprimer napačni menjavi kvantifikatorjev.",
        "Pri resničnosti navedem pričo ali splošni argument."
      ]
    },
    {
      id: "mnozice-preslikave",
      number: 3,
      group: GROUP,
      title: "Množice in preslikave",
      short: "Operacije, družine, produkti in moč množic",
      accent: "#f1b96b",
      minutes: 90,
      importance: "zelo pomembno",
      sources: ["mnozice"],
      examNote: "Vsebinski okvir sledi poglavjem 3.1–3.7 v MnozRel.pdf: definicije, zakoni množic, družine, intervali, potenčna množica, kartezični produkt in moč množic. Dodani dokazi, primeri in protiprimeri so izpeljave teh pojmov za lažje razumevanje.",
      outcomes: [
        "enakost množic dokažem z dvojno vsebovanostjo",
        "zanesljivo računam z unijo, presekom, razliko in komplementom",
        "pravilno obravnavam indeksirane družine in intervale",
        "sestavim potenčno množico in kartezični produkt",
        "formalno ločim injekcijo, surjekcijo in bijekcijo",
        "primerjam moči končnih in osnovnih neskončnih množic"
      ],
      sections: [
        {
          id: "mp-osnove",
          kind: "definition",
          label: "Temelj I",
          title: "Pripadnost, podmnožica, prava podmnožica in enakost",
          html: H`<p><strong>Množica</strong> je zbirka med seboj razločljivih objektov. Zapis \(x\in A\) pomeni, da je \(x\) <em>element</em> množice \(A\), zapis \(x\notin A\) pa, da ni.</p>
          <p><strong>Podmnožica.</strong> \(A\) je podmnožica \(B\), če je vsak element \(A\) tudi element \(B\):</p>
          \[A\subseteq B\iff\forall x\,(x\in A\Rightarrow x\in B).\]
          <p><strong>Prava podmnožica.</strong> \(A\subsetneq B\) pomeni \(A\subseteq B\) in \(A\ne B\). <strong>Enakost</strong> je ekstenzionalna:</p>
          \[A=B\iff\forall x\,(x\in A\Leftrightarrow x\in B)
          \iff A\subseteq B\land B\subseteq A.\]
          <p><strong>Primer.</strong> Za \(A=\{1,2\}\) in \(B=\{1,2,3\}\) veljajo \(1\in A\), \(A\subsetneq B\), \(A\subseteq A\) in \(A\ne B\).</p>
          <p><strong>Pogosta napaka.</strong> Pripadnost in vsebovanost nista isti odnos. Pri \(A=\{1,2\}\) je \(1\in A\), medtem ko \(\{1\}\subseteq A\) in \(\{1\}\notin A\). Zapisa \(1\subseteq A\) ne smemo uporabljati kot zamenjavo za \(1\in A\): v elementarnem zapisu števila navadno obravnavamo kot osnovne objekte, v von Neumannovi konstrukciji pa je \(1=\{\varnothing\}\) res množica, zato je zapis formalno smiseln, vendar je za ta \(A\) napačen, ker \(\varnothing\notin A\).</p>`
        },
        {
          id: "mp-prazna-univerzalna",
          kind: "definition",
          label: "Temelj II",
          title: "Prazna in univerzalna množica",
          html: H`<p><strong>Prazna množica</strong> \(\varnothing\) nima nobenega elementa:</p>
          \[\forall x\;x\notin\varnothing.\]
          <p>Ker je implikacija \(x\in\varnothing\Rightarrow x\in A\) vedno resnična, velja \(\varnothing\subseteq A\) za vsako množico \(A\). Prazna množica je enolična.</p>
          <p><strong>Univerzalna množica</strong> \(U\) je vnaprej izbrana množica vseh objektov, ki jih v danem kontekstu obravnavamo. Vse trenutne množice so njene podmnožice. Če je \(U=\{1,2,3,4\}\) in \(A=\{1,3\}\), sta \(\varnothing\subseteq A\subseteq U\).</p>
          <p><strong>Pogosti napaki.</strong> \(\varnothing\) in \(\{\varnothing\}\) nista enaki: prva ima 0 elementov, druga ima 1 element, namreč prazno množico. Prav tako univerzalna množica ni absolutna. Množica sodih naravnih števil je lahko univerzum v enem vprašanju, v drugem pa le podmnožica \(\mathbb Z\).</p>`
        },
        {
          id: "mp-disjunktnost",
          kind: "definition",
          label: "Temelj III",
          title: "Disjunktni množici in paroma disjunktna družina",
          html: H`<p>Množici \(A,B\) sta <strong>disjunktni</strong>, če nimata skupnega elementa:</p>
          \[A\cap B=\varnothing
          \iff\neg\exists x\,(x\in A\land x\in B).\]
          <p><strong>Primer.</strong> Množici \(\{1,3,5\}\) in \(\{2,4\}\) sta disjunktni. Množici \(\{1,2\}\) in \(\{2,3\}\) nista, saj je njun presek \(\{2\}\).</p>
          <p>Indeksirana družina \((A_i)_{i\in I}\) je <strong>paroma disjunktna</strong>, če za vsaka različna indeksa \(i\ne j\) velja \(A_i\cap A_j=\varnothing\). To ne zahteva, da so členi neprazni ali da njihova unija pokrije univerzum; oba dodatna pogoja potrebujemo pri razbitju.</p>
          <p><strong>Pogosta napaka.</strong> Različni množici nista nujno disjunktni. \(\{1,2\}\ne\{2,3\}\), vendar imata skupni element 2. Tudi \(A\subseteq B\) ne pomeni disjunktnosti; če je \(A\ne\varnothing\), je \(A\cap B=A\).</p>`
        },
        {
          id: "mp-operacije",
          kind: "definition",
          label: "Operacija I",
          title: "Unija množic",
          html: H`<p><strong>Besedna definicija.</strong> Unija \(A\cup B\) vsebuje vse elemente, ki pripadajo množici \(A\), množici \(B\) ali obema. Beseda »ali« je vključujoča.</p>
          \[A\cup B=\{x:x\in A\lor x\in B\}.\]
          <p><strong>Izračunan primer.</strong> Naj bodo \(U=\{1,2,3,4,5\}\), \(A=\{1,2,4\}\) in \(B=\{2,3,4\}\). Tedaj je</p>
          \[A\cup B=\{1,2,3,4\}.\]
          <p>Elementa 2 in 4 zapišemo samo enkrat, ker množica ne beleži večkratnosti.</p>
          <p><strong>Napačna trditev.</strong> »V uniji so elementi, ki ležijo v natanko eni množici.« To opisuje simetrično razliko, ne unije. Protiprimer je \(2\in A\cap B\), vendar kljub temu \(2\in A\cup B\). Tudi formula \(|A\cup B|=|A|+|B|\) velja le za disjunktni končni množici; splošno odštejemo \(|A\cap B|\).</p>`
        },
        {
          id: "mp-presek",
          kind: "definition",
          label: "Operacija II",
          title: "Presek množic",
          html: H`<p><strong>Besedna definicija.</strong> Presek \(A\cap B\) vsebuje natanko elemente, ki hkrati pripadajo obema množicama.</p>
          \[A\cap B=\{x:x\in A\land x\in B\}.\]
          <p><strong>Izračunan primer.</strong> Za \(A=\{1,2,4\}\) in \(B=\{2,3,4\}\) dobimo</p>
          \[A\cap B=\{2,4\}.\]
          <p>Množici sta disjunktni natanko tedaj, ko je njun presek prazen.</p>
          <p><strong>Napačna trditev.</strong> »Če sta \(A\ne B\), je \(A\cap B=\varnothing\).« Protiprimer sta zgornji različni množici, ki imata skupna elementa 2 in 4. Prav tako iz \(A\cap B=A\) ne sledi \(A=B\); sledi le \(A\subseteq B\). Na primer \(\{1\}\cap\{1,2\}=\{1\}\).</p>`
        },
        {
          id: "mp-razlika",
          kind: "definition",
          label: "Operacija III",
          title: "Razlika množic",
          html: H`<p><strong>Besedna definicija.</strong> Razlika \(A\setminus B\) vsebuje elemente \(A\), ki ne pripadajo \(B\). Vrstni red je bistven.</p>
          \[A\setminus B=\{x:x\in A\land x\notin B\}=A\cap B^c.\]
          <p><strong>Izračunan primer.</strong> Za \(A=\{1,2,4\}\) in \(B=\{2,3,4\}\) velja</p>
          \[A\setminus B=\{1\},\qquad B\setminus A=\{3\}.\]
          <p><strong>Napačna trditev.</strong> »Razlika je komutativna: \(A\setminus B=B\setminus A\).« Zgornji izračun je protiprimer. Tudi \(A\setminus B\) ni isto kot \(B^c\): prvi izraz mora ostati znotraj \(A\), medtem ko \(B^c\) vsebuje vse elemente univerzuma zunaj \(B\). Pri \(U=\{1,2,3,4,5\}\) je \(B^c=\{1,5\}\), ne \(\{1\}\).</p>`
        },
        {
          id: "mp-komplement",
          kind: "definition",
          label: "Operacija IV",
          title: "Komplement glede na univerzalno množico",
          html: H`<p><strong>Besedna definicija.</strong> Ko je določen univerzum \(U\) in \(A\subseteq U\), komplement \(A^c\) vsebuje vse elemente univerzuma, ki niso v \(A\).</p>
          \[A^c=U\setminus A=\{x\in U:x\notin A\}.\]
          <p><strong>Izračunan primer.</strong> Pri \(U=\{1,2,3,4,5\}\) in \(A=\{1,2,4\}\) je</p>
          \[A^c=\{3,5\}.\]
          <p>Vedno veljajo \(A\cup A^c=U\), \(A\cap A^c=\varnothing\), \((A^c)^c=A\), \(U^c=\varnothing\) in \(\varnothing^c=U\).</p>
          <p><strong>Napačna trditev.</strong> »Komplement množice je določen brez podatka o univerzumu.« Če isto \(A=\{1,2,4\}\) obravnavamo v \(U_1=\{1,2,3,4,5\}\), je komplement \(\{3,5\}\); v \(U_2=\{1,2,3,4,5,6\}\) pa \(\{3,5,6\}\). Zato mora biti univerzum znan.</p>`
        },
        {
          id: "mp-simetricna-razlika",
          kind: "definition",
          label: "Operacija V",
          title: "Simetrična razlika",
          html: H`<p><strong>Besedna definicija.</strong> Simetrična razlika vsebuje elemente, ki pripadajo natanko eni od množic \(A,B\), ne pa obema.</p>
          \[A\triangle B=(A\setminus B)\cup(B\setminus A)
          =(A\cup B)\setminus(A\cap B).\]
          <p><strong>Izračunan primer.</strong> Za \(A=\{1,2,4\}\) in \(B=\{2,3,4\}\) je</p>
          \[A\triangle B=\{1,3\}.\]
          <p>Operacija je komutativna in asociativna, velja \(A\triangle\varnothing=A\) ter \(A\triangle A=\varnothing\).</p>
          <p><strong>Napačna trditev.</strong> »\(A\triangle B=A\cup B\).« To velja le pri disjunktnih množicah. V našem primeru je \(A\cup B=\{1,2,3,4\}\), simetrična razlika pa izloči skupna elementa 2 in 4. Prav tako simetrična razlika ni isto kot enostranska razlika \(A\setminus B\).</p>`
        },
        {
          id: "mp-zakoni",
          kind: "theorem",
          label: "Algebra množic",
          title: "Ključni zakoni operacij z množicami",
          html: H`<p><strong>Komutativnost, asociativnost in idempotentnost</strong></p>
          <div class="formula-grid">
            <p>\(A\cup B=B\cup A\), \(A\cap B=B\cap A\)</p>
            <p>\((A\cup B)\cup C=A\cup(B\cup C)\)</p>
            <p>\((A\cap B)\cap C=A\cap(B\cap C)\)</p>
            <p>\(A\cup A=A\), \(A\cap A=A\)</p>
          </div>
          <p><strong>Nevtralni in absorpcijski elementi</strong></p>
          <div class="formula-grid">
            <p>\(A\cup\varnothing=A\), \(A\cap U=A\)</p>
            <p>\(A\cap\varnothing=\varnothing\), \(A\cup U=U\)</p>
            <p>\(A\cup(A\cap B)=A\)</p>
            <p>\(A\cap(A\cup B)=A\)</p>
          </div>
          <p><strong>Distributivnost</strong></p>
          \[A\cap(B\cup C)=(A\cap B)\cup(A\cap C),\]
          \[A\cup(B\cap C)=(A\cup B)\cap(A\cup C).\]
          <p><strong>Komplement in De Morganova zakona</strong></p>
          <div class="formula-grid">
            <p>\(A\cup A^c=U\), \(A\cap A^c=\varnothing\)</p>
            <p>\((A^c)^c=A\), \(U^c=\varnothing\), \(\varnothing^c=U\)</p>
            <p>\((A\cup B)^c=A^c\cap B^c\)</p>
            <p>\((A\cap B)^c=A^c\cup B^c\)</p>
          </div>
          <p><strong>Razlika in simetrična razlika</strong></p>
          \[A\setminus B=A\cap B^c,\qquad
          A\triangle B=(A\cup B)\setminus(A\cap B).\]
          <p><strong>Kako zakon dokažemo.</strong> Vzamemo poljuben \(x\), pripadnost obema stranema prevedemo v logični formuli in uporabimo ustrezno logično enakovrednost. Na primer</p>
          \[x\in(A\cup B)^c
          \iff\neg(x\in A\lor x\in B)
          \iff x\in A^c\land x\in B^c.\]
          <p><strong>Pogosta napaka.</strong> Operacije niso navadna aritmetika. Iz \(A\cup B=A\cup C\) ne smemo »krajšati \(A\)« in sklepati \(B=C\). Protiprimer: \(A=\{1,2\}\), \(B=\{1\}\), \(C=\{2\}\); obe uniji sta \(A\), toda \(B\ne C\).</p>`
        },
        {
          id: "mp-dokaz-enakosti",
          kind: "proof",
          label: "Vzorec dokaza",
          title: "Dvojna vsebovanost",
          html: `<p>Za dokaz \\(A=B\\) napiši dva ločena dela.</p>
          <p><strong>1.</strong> Naj bo \\(x\\in A\\). Iz definicij izpelji \\(x\\in B\\), torej \\(A\\subseteq B\\).</p>
          <p><strong>2.</strong> Naj bo \\(x\\in B\\). Analogno pokaži \\(x\\in A\\), torej \\(B\\subseteq A\\).</p>
          <p>Vennov diagram je odlična intuicija, vendar na teorijskem vprašanju praviloma ni nadomestilo za elementni dokaz.</p>`
        },
        {
          id: "mp-druzine",
          kind: "definition",
          label: "Indeksirane množice",
          title: "Družina množic ter posplošena unija in presek",
          html: H`<p><strong>Indeksirana družina množic</strong> je zapis \(\mathcal A=(A_i)_{i\in I}\), formalno preslikava \(i\mapsto A_i\), kjer je \(I\) indeksna množica. Vsak indeks \(i\) določa člen \(A_i\), različna indeksa pa lahko določata isto množico. Zato družina ohrani indekse in ponovitve ter nosi več podatkov kot gola množica različnih členov \(\{A_i\mid i\in I\}\).</p>
          <p><strong>Posplošena unija</strong> vsebuje element, če ta leži v vsaj enem členu družine:</p>
          \[x\in\bigcup_{i\in I}A_i
          \iff\exists i\in I\;x\in A_i.\]
          <p><strong>Posplošeni presek</strong> vsebuje element, če leži v vsakem členu:</p>
          \[x\in\bigcap_{i\in I}A_i
          \iff\forall i\in I\;x\in A_i.\]
          <p><strong>Izračunan primer.</strong> Za \(A_1=\{1,2\}\), \(A_2=\{2,3\}\), \(A_3=\{2,4\}\) je</p>
          \[\bigcup_{i=1}^3A_i=\{1,2,3,4\},\qquad
          \bigcap_{i=1}^3A_i=\{2\}.\]
          <p>Ob fiksnem univerzumu \(U\) uporabljamo robna dogovora \(\bigcup_{i\in\varnothing}A_i=\varnothing\) in \(\bigcap_{i\in\varnothing}A_i=U\). Drugi dogovor je odvisen od znanega univerzuma. Posplošena De Morganova zakona sta</p>
          \[\left(\bigcup_{i\in I}A_i\right)^c=\bigcap_{i\in I}A_i^c,\qquad
          \left(\bigcap_{i\in I}A_i\right)^c=\bigcup_{i\in I}A_i^c.\]
          <p><strong>Pogosta napaka.</strong> Pri uniji ni treba najti enega indeksa, ki deluje za vse elemente; indeks je lahko za vsak element drugačen. Pri preseku pa ni dovolj, da element nastopi v »večini« členov — biti mora v vsakem.</p>`
        },
        {
          id: "mp-intervali",
          kind: "definition",
          label: "Popravljene definicije",
          title: "Intervali brez OCR-napak",
          html: `\\[(a,b)=\\{x\\in\\mathbb R:a<x<b\\},\\qquad [a,b]=\\{x:a\\le x\\le b\\},\\]
          \\[[a,b)=\\{x:a\\le x<b\\},\\qquad(a,b]=\\{x:a<x\\le b\\},\\]
          \\[(a,\\infty)=\\{x:a<x\\},\\qquad[a,\\infty)=\\{x:a\\le x\\},\\]
          \\[(-\\infty,b)=\\{x:x<b\\},\\qquad(-\\infty,b]=\\{x:x\\le b\\}.\\]
          <p>Neskončnost ni realno krajišče, zato je oklepaj ob \\(\\pm\\infty\\) vedno okrogel.</p>`
        },
        {
          id: "mp-interval-primer",
          kind: "example",
          label: "Lahek primer",
          title: "Presek in unija krčečih intervalov",
          html: `<p>Velja</p>
          \\[\\bigcap_{n\\ge1}[0,1/n)=\\{0\\},\\qquad
          \\bigcap_{n\\ge1}(0,1/n]=\\varnothing.\\]
          <p>Število 0 je v prvem intervalu za vsak \\(n\\); nobeno pozitivno \\(x\\) pa ni manjše od \\(1/n\\) za vse \\(n\\). V drugem preseku je 0 izključena, vsak pozitiven kandidat pa odpove pri dovolj velikem \\(n\\).</p>`
        },
        {
          id: "mp-potencna",
          kind: "definition",
          label: "Konstrukcija I",
          title: "Potenčna množica",
          html: H`<p><strong>Potenčna množica</strong> \(\mathcal P(A)\) je množica vseh podmnožic množice \(A\):</p>
          \[\mathcal P(A)=\{X:X\subseteq A\}.\]
          <p><strong>Izračunan primer.</strong> Če je \(A=\{a,b\}\), potem</p>
          \[\mathcal P(A)=\{\varnothing,\{a\},\{b\},\{a,b\}\}.\]
          <p>Vedno sta \(\varnothing\in\mathcal P(A)\) in \(A\in\mathcal P(A)\). Če je \(|A|=n\), velja \(|\mathcal P(A)|=2^n\), ker se za vsak element neodvisno odločimo, ali ga vključimo. Posebej \(\mathcal P(\varnothing)=\{\varnothing\}\), zato ima en element.</p>
          <p><strong>Pogosta napaka.</strong> \(a\in A\) ni isto kot \(a\in\mathcal P(A)\). Iz \(a\in A\) sledi \(\{a\}\subseteq A\) in zato \(\{a\}\in\mathcal P(A)\), ne pa nujno \(a\in\mathcal P(A)\). Elementi potenčne množice so sami množice.</p>`
        },
        {
          id: "mp-kartezicni-produkt",
          kind: "definition",
          label: "Konstrukcija II",
          title: "Urejeni par in kartezični produkt",
          html: H`<p><strong>Urejeni par</strong> razlikuje prvo in drugo komponento; velja</p>
          \[(a,b)=(c,d)\iff a=c\land b=d.\]
          <p><strong>Kartezični produkt</strong> je množica vseh urejenih parov s prvo komponento iz \(A\) in drugo iz \(B\):</p>
          \[A\times B=\{(a,b):a\in A\land b\in B\}.\]
          <p><strong>Izračunan primer.</strong> Za \(A=\{1,2\}\) in \(B=\{x,y\}\) je</p>
          \[A\times B=\{(1,x),(1,y),(2,x),(2,y)\}.\]
          <p>Za končni množici velja \(|A\times B|=|A||B|\). Če je katerikoli faktor prazen, je produkt prazen. Splošni produkt \(A_1\times\cdots\times A_n\) sestavljajo urejene \(n\)-terice.</p>
          <p><strong>Pogosta napaka.</strong> Produkt na splošno ni komutativen: \(B\times A\) vsebuje pare \((x,1)\), ne \((1,x)\). Množici imata sicer pri končnih \(A,B\) enako moč, vendar praviloma nista enaki. Prav tako \((a,b)\) ni isto kot neurejena množica \(\{a,b\}\).</p>`
        },
        {
          id: "mp-preslikava",
          kind: "definition",
          label: "Preslikave I",
          title: "Preslikava, domena, kodomena in graf preslikave",
          html: H`<p>Preslikava \(f:A\to B\) vsakemu elementu \(a\in A\) priredi <strong>natanko en</strong> element \(f(a)\in B\). \(A\) je domena, \(B\) kodomena. Besedi »vsakemu« in »natanko en« sta oba nujna.</p>
          <p>Graf preslikave je relacija</p>
          \[\Gamma_f=\{(a,f(a)):a\in A\}\subseteq A\times B,\]
          <p>v kateri ima vsak \(a\in A\) natanko en par s prvo komponento \(a\).</p>
          <p><strong>Primer.</strong> Predpis \(f:\{1,2,3\}\to\{a,b,c\}\), \(f(1)=a,f(2)=a,f(3)=c\), je preslikava; različna vhoda smeta imeti isto sliko. Relacija \(\{(1,a),(1,b),(2,c)\}\) ni graf preslikave iz \(\{1,2\}\), ker ima 1 dve sliki. Relacija \(\{(1,a)\}\) prav tako ni taka preslikava, ker element 2 nima slike.</p>
          <p><strong>Pogosta napaka.</strong> Formula sama ne določi vedno preslikave, dokler ne navedemo domene in kodomene. Predpis \(x\mapsto1/x\) ni preslikava \(\mathbb R\to\mathbb R\), je pa preslikava \(\mathbb R\setminus\{0\}\to\mathbb R\).</p>`
        },
        {
          id: "mp-slika-predslika",
          kind: "definition",
          label: "Preslikave II",
          title: "Slika preslikave, slika množice in predslika",
          html: H`<p><strong>Slika preslikave</strong> je množica dejansko doseženih vrednosti:</p>
          \[\operatorname{Im}f=f[A]=\{f(a):a\in A\}\subseteq B.\]
          <p>Za \(X\subseteq A\) je slika množice \(X\)</p>
          \[f[X]=\{f(x):x\in X\},\]
          <p>za \(Y\subseteq B\) pa je njena predslika</p>
          \[f^{-1}[Y]=\{x\in A:f(x)\in Y\}.\]
          <p><strong>Izračunan primer.</strong> Pri \(f(1)=a,f(2)=a,f(3)=c\), \(A=\{1,2,3\}\), \(B=\{a,b,c,d\}\), velja \(\operatorname{Im}f=\{a,c\}\), \(f[\{2,3\}]=\{a,c\}\) in \(f^{-1}[\{a,d\}]=\{1,2\}\).</p>
          <p><strong>Pogosti napaki.</strong> Slika ni nujno kodomena: tukaj sta \(b,d\in B\), vendar nista dosežena. Zapis \(f^{-1}[Y]\) za predsliko množice ne pomeni, da obstaja inverzna preslikava; predsliko ima vsaka preslikava. Inverzna preslikava obstaja šele pri bijekciji.</p>`
        },
        {
          id: "mp-kompozicija-preslikav",
          kind: "definition",
          label: "Preslikave III",
          title: "Identiteta, kompozicija in inverzna preslikava",
          html: H`<p>Identična preslikava na \(A\) je \(\operatorname{id}_A(a)=a\). Če sta \(f:A\to B\) in \(g:B\to C\), je njuna kompozicija</p>
          \[g\circ f:A\to C,\qquad (g\circ f)(a)=g(f(a)).\]
          <p>Najprej uporabimo \(f\), nato \(g\); vrstni red zapisa je zato nasproten vrstnemu redu izvajanja. Veljata \(\operatorname{id}_B\circ f=f=f\circ\operatorname{id}_A\) in asociativnost \(h\circ(g\circ f)=(h\circ g)\circ f\).</p>
          <p><strong>Primer.</strong> Za \(f(x)=x+1\) in \(g(x)=x^2\) je \((g\circ f)(x)=(x+1)^2\), medtem ko je \((f\circ g)(x)=x^2+1\); kompozicija praviloma ni komutativna.</p>
          <p>Preslikava \(f:A\to B\) ima inverz \(f^{-1}:B\to A\), če velja \(f^{-1}\circ f=\operatorname{id}_A\) in \(f\circ f^{-1}=\operatorname{id}_B\). To je mogoče natanko tedaj, ko je \(f\) bijektivna.</p>`
        },
        {
          id: "mp-inj-surj",
          kind: "definition",
          label: "Tri lastnosti",
          title: "Injekcija, surjekcija in bijekcija",
          html: `<ul>
            <li>\\(f\\) je injektivna, če \\(f(x_1)=f(x_2)\\Rightarrow x_1=x_2\\); različna argumenta nimata iste slike.</li>
            <li>\\(f\\) je surjektivna, če \\(\\forall y\\in B\\ \\exists x\\in A:f(x)=y\\); slika je vsa kodomena.</li>
            <li>Bijekcija je hkrati injekcija in surjekcija; tedaj obstaja inverzna preslikava \\(f^{-1}:B\\to A\\).</li>
          </ul>
          <p>Pri končnih množicah enake moči injektivnost že implicira surjektivnost in obratno; pri različnih ali neskončnih množicah tega ne smemo uporabiti brez pogojev.</p>`
        },
        {
          id: "mp-moc",
          kind: "definition",
          label: "Kardinalnost",
          title: "Enaka moč, primerjava moči in števnost",
          html: `<p>Množici imata enako moč, \\(|A|=|B|\\), če obstaja bijekcija \\(A\\to B\\). Pišemo \\(|A|\\le |B|\\), če obstaja injekcija \\(A\\to B\\), in \\(|A|<|B|\\), če taka injekcija obstaja, bijekcija pa ne.</p>
          <p>Množica je <strong>števno neskončna</strong>, če je bijektivna z \\(\\mathbb N_0\\). Je <strong>števna</strong> (kvečjemu števna), če je končna ali števno neskončna, in <strong>neštevna</strong>, če ni števna. Po Dedekindu je množica neskončna, če je enako močna kaki svoji pravi podmnožici.</p>
          <p>Primer: \\(n\\mapsto n+1\\) je bijekcija iz \\(\\mathbb N_0\\) na \\(\\mathbb N_0\\setminus\\{0\\}\\), velja pa tudi \\(|\\mathbb N|=|\\mathbb Q|\\). Za zvezo z realnimi števili vsakemu \\(A\\subseteq\\mathbb N_0\\) priredimo karakteristično zaporedje \\(\\chi_A\\in\\{0,1\\}^{\\mathbb N_0}\\). To je bijekcija \\(\\mathcal P(\\mathbb N_0)\\leftrightarrow\\{0,1\\}^{\\mathbb N_0}\\). Zaporedje \\((a_n)\\) injiciramo v \\([0,1]\\) s ternarnim zapisom \\(\\sum_{n\\ge0}2a_n/3^{n+1}\\). Obratno realna števila najprej injiciramo v \\((0,1)\\), nato pa vsakemu izberemo njegov kanonični binarni zapis. Cantor–Bernsteinov izrek zato da</p>
          \\[|\\mathcal P(\\mathbb N_0)|=|\\{0,1\\}^{\\mathbb N_0}|=|\\mathbb R|.\\]
          <p>Zato Cantorjev izrek za \\(X=\\mathbb N_0\\) res da \\(|\\mathbb N_0|<|\\mathbb R|\\): realna števila so neštevna.</p>`
        },
        {
          id: "mp-cantor-realna-diagonala",
          kind: "proof",
          label: "Neposredni diagonalni dokaz",
          title: "Zakaj realnih števil ne moremo našteti",
          html: H`
            <p><strong>Izrek.</strong> Interval \((0,1)\), zato pa tudi \(\mathbb R\), ni števna množica.</p>
            <p><strong>Dokaz.</strong> Predpostavimo nasprotno: da neka preslikava \(f:\mathbb N\to(0,1)\) našteje vsa števila tega intervala. Vsako število zapišimo v njegovem <strong>kanoničnem decimalnem zapisu</strong>, ki se ne konča z neskončnim repom devetic:</p>
            <div class="formula-panel">\[
              f(1)=0,a_{11}a_{12}a_{13}\ldots,\quad
              f(2)=0,a_{21}a_{22}a_{23}\ldots,\quad\ldots
            \]</div>
            <p>Sestavimo novo število \(y=0,b_1b_2b_3\ldots\), kjer izberemo</p>
            <div class="formula-panel">\[
              b_n=\begin{cases}
                1,&a_{nn}\ne1,\\
                2,&a_{nn}=1.
              \end{cases}
            \]</div>
            <p>Število \(y\) leži v \((0,1)\), njegov zapis uporablja samo števki 1 in 2, pri \(n\)-ti decimalki pa se razlikuje od \(f(n)\). Zato \(y\ne f(n)\) za vsak \(n\), kar nasprotuje surjektivnosti \(f\). Torej \((0,1)\) ni števno; ker je podmnožica \(\mathbb R\), tudi \(\mathbb R\) ne more biti števna.</p>
            <p><strong>Zakaj potrebujemo kanonične zapise?</strong> Brez dogovora bi isto število lahko imelo zapisa \(0,25000\ldots=0,24999\ldots\), zato zgolj razlika v eni zapisani decimalki ne bi nujno pomenila različnih števil. Izbrani zapis in števki 1, 2 to past odpravijo.</p>
            <p><strong>Povezava s splošnim Cantorjevim izrekom.</strong> Tu diagonalno spremenimo \(n\)-to števko \(n\)-tega člena. Pri dokazu \(|X|<|\mathcal P(X)|\) pa diagonalno množico sestavimo tako, da za vsak \(x\) obrnemo odločitev \(x\in f(x)\). Ideja je ista: domnevni seznam premagamo z objektom, ki se od njegovega \(n\)-tega člena razlikuje na \(n\)-tem mestu.</p>`
        },
        {
          id: "mp-interval-unija",
          kind: "example",
          label: "Primer iz zapiskov",
          title: "Unija intervalov \\([1/n,1]\\)",
          html: `<p>Velja</p>
          \\[\\bigcup_{n\\ge1}[1/n,1]=(0,1].\\]
          <p>Vsak člen družine je vsebovan v \\((0,1]\\), zato je taka tudi unija. Obratno naj bo \\(0<x\\le1\\). Po arhimedski lastnosti obstaja \\(n\\) z \\(n\\ge1/x\\), zato \\(1/n\\le x\\le1\\) in \\(x\\in[1/n,1]\\). To dokaže drugo vsebovanost. Število \\(0\\) ni v nobenem členu.</p>`
        },
        {
          id: "mp-naravna-rekurzija",
          kind: "definition",
          label: "Definicija 3.2",
          title: "Rekurzivna konstrukcija naravnih števil",
          html: `<p>V množični konstrukciji postavimo</p>
          \\[0:=\\varnothing,\\qquad n^+:=n\\cup\\{n\\}.\\]
          <p>Rekurzivna definicija nato zahteva: <strong>(B)</strong> \\(\\varnothing\\) je naravno število; <strong>(N)</strong> če je \\(n\\) naravno, je naraven tudi naslednik \\(n^+\\). Tako dobimo \\(1=\\{\\varnothing\\}\\), \\(2=\\{\\varnothing,\\{\\varnothing\\}\\}\\) itd. V tem razdelku zapiskov je \\(0\\in\\mathbb N_0\\); drugod se \\(\\mathbb N\\) začne z 1.</p>
          <p>Množica \\(X\\) je končna, če je bijektivna z nekim tako zgrajenim naravnim številom \\(n\\); sicer je neskončna. Ekvivalentna Dedekindova definicija pravi, da je \\(X\\) neskončna natanko tedaj, ko je bijektivna s kako svojo pravo podmnožico.</p>`
        },
        {
          id: "mp-cantor",
          kind: "theorem",
          label: "Moč množic",
          title: "Cantor: množica ni enako močna svoji potenčni množici",
          html: `<p><strong>Izrek.</strong> Za nobeno množico \\(X\\) ne obstaja surjekcija \\(f:X\\to\\mathcal P(X)\\); zato \\(|X|\\ne|\\mathcal P(X)|\\).</p>
          <p><strong>Diagonalni dokaz.</strong> Predpostavimo, da je \\(f\\) surjektivna, in definirajmo</p>
          \\[D=\\{x\\in X:x\\notin f(x)\\}.\\]
          <p>Ker je \\(D\\subseteq X\\), bi obstajal \\(d\\in X\\) s \\(f(d)=D\\). Tedaj</p>
          \\[d\\in D\\iff d\\notin f(d)\\iff d\\notin D,\\]
          <p>kar je protislovje. Po drugi strani je \\(i:X\\to\\mathcal P(X)\\), \\(i(x)=\\{x\\}\\), injektivna. Torej \\(|X|\\le|\\mathcal P(X)|\\), ne obstaja pa bijekcija med njima, saj bi bila vsaka bijekcija tudi surjekcija \\(X\\to\\mathcal P(X)\\). Po definiciji zato \\(|X|<|\\mathcal P(X)|\\). Posebej dobimo neskončno verigo vedno večjih neskončnih moči.</p>`
        },
        {
          id: "mp-protiprimer",
          kind: "counterexample",
          label: "Protiprimer",
          title: "Injektivno ni isto kot surjektivno",
          html: `<p>Preslikava \\(f:\\mathbb N\\to\\mathbb N\\), \\(f(n)=n+1\\), je injektivna, ni pa surjektivna, če \\(\\mathbb N=\\{1,2,\\ldots\\}\\), saj 1 nima predslike. Preslikava \\(g:\\mathbb Z\\to\\mathbb N_0\\), \\(g(z)=|z|\\), je surjektivna, ni pa injektivna, ker \\(g(1)=g(-1)\\).</p>`
        },
        {
          id: "mp-pasti",
          kind: "pitfall",
          label: "Izpitne pasti",
          title: "Pripadnost ni vsebovanost",
          html: `<ul>
            <li>Če je \\(a\\in A\\), še ne pomeni \\(a\\subseteq A\\).</li>
            <li>\\(\\varnothing\\subseteq A\\) vedno, toda \\(\\varnothing\\in A\\) le včasih.</li>
            <li>\\(\\{a\\}\\in\\mathcal P(A)\\) natanko tedaj, ko je \\(a\\in A\\).</li>
            <li>Pri preseku družine je kvantifikator \\(\\forall\\), pri uniji \\(\\exists\\).</li>
            <li>Kodomena ni nujno enaka sliki.</li>
          </ul>`
        },
        {
          id: "mp-ustni-odgovor",
          kind: "explanation",
          label: "Teorijski odgovor",
          title: "Kako utemeljiš trditev o množicah",
          html: `<p>Enakost množic dokaži elementno v obe smeri. Lastnost končne moči utemelji z bijekcijo ali neodvisnimi izbirami. Enako moč poljubnih množic utemelji z eksplicitno bijekcijo. Pri neskončnosti jasno navedi pravo podmnožico in bijekcijo nanjo.</p>`
        },
        {
          id: "mp-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Množice in preslikave v enem dihu",
          html: `<p>Enakost množic je dvojna vsebovanost. Unija pomeni \\(\\exists\\), presek \\(\\forall\\); komplement negira pogoj. Potenčna množica ima \\(2^n\\) elementov, produkt \\(nm\\). Injekcija ne združuje različnih vhodov, surjekcija zadene vso kodomeno, bijekcija naredi oboje in primerja moči.</p>`
        }
      ],
      checklist: [
        "Definiram pripadnost, podmnožico, pravo podmnožico, prazno in univerzalno množico ter disjunktnost.",
        "Razlikujem \\(\\in\\), \\(\\subseteq\\), \\(\\subsetneq\\), \\(\\varnothing\\) in \\(\\{\\varnothing\\}\\).",
        "Enakost množic dokažem v obe smeri.",
        "Vsako od operacij \\(\\cup,\\cap,\\setminus,{}^c,\\triangle\\) definiram in izračunam na konkretnem primeru.",
        "Znam ključne zakone množic, oba De Morganova zakona in elementni način dokaza.",
        "Pri družini množic pravilno uporabim \\(\\exists\\) za unijo in \\(\\forall\\) za presek.",
        "Intervale z neskončnostjo zapišem pravilno.",
        "Znam našteti potenčno množico in kartezični produkt.",
        "Pri preslikavi ločim domeno, kodomeno, sliko, sliko podmnožice in predsliko.",
        "Injektivnost, surjektivnost in obstoj inverza preverjam po definiciji."
      ]
    },
    {
      id: "relacije-urejenosti",
      number: 4,
      group: GROUP,
      title: "Relacije in urejenosti",
      short: "Lastnosti relacij, ekvivalenčni razredi in delne urejenosti",
      accent: "#d695e8",
      minutes: 85,
      importance: "zelo pomembno",
      sources: ["mnozice", "teorija-2021-roki"],
      examNote: "Na teorijskem izpitu je bilo neposredno vprašanje: definiraj irefleksivnost in asimetričnost ter dokaži, da asimetričnost implicira irefleksivnost. Zato so spodaj vse lastnosti, njihove logične zveze, dokazi in protiprimeri razpisani posebej.",
      outcomes: [
        "relacijo predstavim kot podmnožico kartezičnega produkta ali usmerjen graf",
        "po definiciji preverim vseh osem standardnih lastnosti",
        "ločim simetričnost, asimetričnost in antisimetričnost",
        "izračunam ekvivalenčni razred in faktorsko množico",
        "prevedem med ekvivalenčnimi relacijami in razbitji",
        "ločim delno, linearno, strogo delno in strogo linearno urejenost"
      ],
      sections: [
        {
          id: "ru-relacija",
          kind: "definition",
          label: "Definicija",
          title: "Relacija med množicama in relacija na množici",
          html: H`<p><strong>Dvomestna relacija iz \(A\) v \(B\)</strong> je poljubna podmnožica kartezičnega produkta \(R\subseteq A\times B\). Zapis \(aRb\) je okrajšava za \((a,b)\in R\). Relacija <strong>na</strong> \(A\) je poseben primer \(R\subseteq A\times A\). Šele pri relaciji na eni množici imajo lastnosti, kot so refleksivnost, simetričnost in tranzitivnost, običajno obliko iz tega poglavja.</p>
          <p><strong>\(n\)-mestna relacija</strong> med \(A_1,\ldots,A_n\) je podmnožica \(A_1\times\cdots\times A_n\); \(n\)-mestna relacija na \(A\) je podmnožica \(A^n\). Prazna in univerzalna relacija sta zato \(\varnothing\) ter \(A\times B\) oziroma \(A^n\), odvisno od tipa.</p>
          <p><strong>Primer.</strong> Za \(A=\{1,2\}\), \(B=\{a,b\}\) je \(R=\{(1,a),(2,a)\}\subseteq A\times B\) relacija iz \(A\) v \(B\), ni pa relacija na \(A\). Pri končni relaciji na \(A\) lahko uporabimo usmerjen graf: elementi \(A\) so vozlišča, lok \(x\to y\) obstaja natanko tedaj, ko \(xRy\), zanka pri \(x\) pa predstavlja \(xRx\).</p>
          <p><strong>Pogosta napaka.</strong> Relacija ni nujno preslikava. V relaciji sme element domene imeti nič, eno ali več povezanih vrednosti; graf preslikave \(A\to B\) pa mora vsakemu \(a\in A\) prirediti natanko en \(b\in B\).</p>`
        },
        {
          id: "ru-domena",
          kind: "definition",
          label: "Osnovni podatki",
          title: "Domena, zaloga vrednosti, inverz in kompozicija",
          html: H`<p>Za \(R\subseteq A\times B\) sta <strong>domena</strong> in <strong>zaloga vrednosti</strong></p>
          \[D_R=\{a\in A:\exists b\in B\;aRb\},\qquad
          Z_R=\{b\in B:\exists a\in A\;aRb\}.\]
          <p>Polje relacije je \(D_R\cup Z_R\), kadar vse elemente smiselno obravnavamo v skupnem okolju. Vedno velja \(R\subseteq D_R\times Z_R\), vendar enakost praviloma ne: za \(R=\{(1,a),(2,b)\}\) je produkt večji in vsebuje tudi \((1,b)\) in \((2,a)\).</p>
          <p><strong>Inverzna relacija</strong> obrne vse pare:</p>
          \[R^{-1}=\{(b,a):(a,b)\in R\}\subseteq B\times A,
          \qquad bR^{-1}a\iff aRb.\]
          <p>Če sta \(R\subseteq A\times B\) in \(S\subseteq B\times C\), je njuna <strong>kompozicija</strong></p>
          \[S\circ R=\{(a,c):\exists b\in B\;(aRb\land bSc)\}\subseteq A\times C.\]
          <p>Najprej naredimo korak po \(R\), nato po \(S\). Srednja množica oziroma tip povezav mora ustrezati. Inverz ni isto kot komplement: prvi obrne komponente, drugi pa glede na izbrani produkt odstrani pare relacije.</p>`
        },
        {
          id: "ru-lastnosti1",
          kind: "definition",
          label: "Lastnosti I",
          title: "Refleksivnost, irefleksivnost in tri vrste simetrije",
          html: `<ul>
            <li>refleksivna: \\(\\forall x\\in A:\ xRx\\);</li>
            <li>irefleksivna: \\(\\forall x\\in A:\ \\neg xRx\\);</li>
            <li>simetrična: \\(\\forall x,y\\in A:\ xRy\\Rightarrow yRx\\);</li>
            <li>asimetrična: \\(\\forall x,y\\in A:\ xRy\\Rightarrow\\neg yRx\\);</li>
            <li>antisimetrična: \\(\\forall x,y\\in A:\ xRy\\land yRx\\Rightarrow x=y\\).</li>
          </ul>
          <p>Asimetrična relacija je nujno irefleksivna. Antisimetrična pa sme imeti zanke in ni »skoraj simetrična«: prepoveduje le dvosmerni par med <em>različnima</em> elementoma.</p>`
        },
        {
          id: "ru-lastnosti2",
          kind: "definition",
          label: "Lastnosti II",
          title: "Tranzitivnost in sovisnost",
          html: `<ul>
            <li>tranzitivna: \\(\\forall x,y,z\\in A:\ xRy\\land yRz\\Rightarrow xRz\\);</li>
            <li>sovisna: \\(\\forall x,y\\in A:\ x\\ne y\\Rightarrow(xRy\\lor yRx)\\);</li>
            <li>strogo sovisna: \\(\\forall x,y\\in A:\ xRy\\lor yRx\\), tudi ko je \\(x=y\\).</li>
          </ul>
          <p>Vsaka strogo sovisna relacija je refleksivna: v definiciji vzamemo \\(y=x\\). Navadna sovisnost o zankah ne pove ničesar.</p>`
        },
        {
          id: "ru-metoda",
          kind: "method",
          label: "Postopek",
          title: "Kako lastnost dokažem ali ovržem",
          html: `<p>Za dokaz lastnosti začni z njenimi kvantifikatorji: »Naj bodo \\(x,y,z\\in A\\) poljubni in naj velja …«. Nato uporabi predpis relacije.</p>
          <p>Za ovržbo zadostujejo konkretni elementi:</p>
          <ul>
            <li>nerefleksivnost: en \\(x\\) z \\(\\neg xRx\\);</li>
            <li>neirefleksivnost: en \\(x\\) z \\(xRx\\);</li>
            <li>nesimetričnost: \\(xRy\\), a ne \\(yRx\\);</li>
            <li>neasimetričnost: \\(xRy\\) in \\(yRx\\); dovoljena je tudi izbira \\(x=y\\);</li>
            <li>neantisimetričnost: različna \\(x,y\\) z obema smerema;</li>
            <li>netranzitivnost: \\(xRy,yRz\\), a ne \\(xRz\\);</li>
            <li>nesovisnost: različna neprimerljiva \\(x,y\\);</li>
            <li>relacija ni strogo sovisna: obstajata \\(x,y\\), ki nista povezana v nobeni smeri; tu je lahko \\(x=y\\).</li>
          </ul>`
        },
        {
          id: "ru-graf-lastnosti",
          kind: "explanation",
          label: "Pomen definicij",
          title: "Kako se vseh osem lastnosti vidi v grafu relacije",
          html: `<ul>
            <li><strong>refleksivna:</strong> vsako vozlišče ima zanko;</li>
            <li><strong>irefleksivna:</strong> nobeno vozlišče nima zanke;</li>
            <li><strong>simetrična:</strong> ob vsakem loku \\(x\\to y\\) je tudi \\(y\\to x\\);</li>
            <li><strong>asimetrična:</strong> ob loku \\(x\\to y\\) obratnega loka ni; s tem so prepovedane tudi zanke;</li>
            <li><strong>antisimetrična:</strong> med različnima vozliščema ne smeta biti loka v obe smeri; zanke so dovoljene;</li>
            <li><strong>tranzitivna:</strong> ob \\(x\\to y\\) in \\(y\\to z\\) mora biti tudi bližnjica \\(x\\to z\\); to velja tudi, če se kateri od elementov ponovi;</li>
            <li><strong>sovisna:</strong> vsaki različni vozlišči sta povezani v vsaj eni smeri;</li>
            <li><strong>strogo sovisna:</strong> prejšnji pogoj velja tudi za \\(x=y\\), zato mora biti pri vsakem vozlišču zanka.</li>
          </ul>`
        },
        {
          id: "ru-asim-irref-dokaz",
          kind: "proof",
          label: "Vprašanje s teorijskega izpita",
          title: "Dokaz: vsaka asimetrična relacija je irefleksivna",
          html: `<p><strong>Izrek.</strong> Če je \\(R\\) asimetrična relacija na \\(A\\), je \\(R\\) irefleksivna.</p>
          <p><strong>Dokaz.</strong> Naj bo \\(x\\in A\\) poljuben. Če bi veljalo \\(xRx\\), bi iz asimetričnosti pri izbiri \\(y=x\\) sledilo \\(\\neg(xRx)\\). Dobili bi protislovje. Zato \\(xRx\\) ne velja za noben \\(x\\in A\\), kar je natanko irefleksivnost. \\(\\square\\)</p>
          <p>Ključ je, da definicija asimetričnosti velja tudi za par \\(x=x\\); ni omejena le na različna elementa.</p>`
        },
        {
          id: "ru-asim-karakterizacija",
          kind: "theorem",
          label: "Pomembna zveza",
          title: "Asimetrična natanko tedaj, ko je irefleksivna in antisimetrična",
          html: `<p>Za vsako relacijo \\(R\\) velja</p>
          \\[R\\text{ je asimetrična}\\iff R\\text{ je irefleksivna in antisimetrična}.\\]
          <p><strong>Naprej:</strong> irefleksivnost sledi iz prejšnjega dokaza. Če bi ob \\(xRy\\) veljalo tudi \\(yRx\\), bi asimetričnost dala \\(\\neg yRx\\); zato se antecedent antisimetričnosti pri različnih elementih ne more zgoditi in \\(R\\) je antisimetrična.</p>
          <p><strong>Nazaj:</strong> naj velja \\(xRy\\). Če bi veljalo še \\(yRx\\), bi antisimetričnost dala \\(x=y\\), zato bi veljalo \\(xRx\\), v nasprotju z irefleksivnostjo. Torej \\(\\neg yRx\\), kar je asimetričnost.</p>
          <p><strong>Posledica.</strong> Vsaka tranzitivna in irefleksivna relacija je asimetrična: iz \\(xRy\\) in \\(yRx\\) bi tranzitivnost dala prepovedano zanko \\(xRx\\).</p>`
        },
        {
          id: "ru-simetrija-ni-tranzitivnost",
          kind: "counterexample",
          label: "Nobeno ugibanje",
          title: "Simetričnost ne pomeni tranzitivnosti — in obratno",
          html: `<p>Na \\(A=\\{1,2\\}\\) je relacija \\(R=\\{(1,2),(2,1)\\}\\) simetrična, ker ima vsak lok obratni lok. Ni tranzitivna: iz \\(1R2\\) in \\(2R1\\) bi moral slediti \\(1R1\\), ki ga ni.</p>
          <p>Relacija \\(<\\) na \\(\\mathbb R\\) je tranzitivna, ni pa simetrična: iz \\(1<2\\) ne sledi \\(2<1\\).</p>
          <p>Tudi irefleksivnost sama ne pomeni asimetričnosti: zgornji \\(R\\) je irefleksiven, a ni asimetričen. Antisimetričnost sama je prav tako ne implicira: identiteta \\(I_A=\\{(x,x):x\\in A\\}\\) je antisimetrična, toda na nepraznem \\(A\\) ni asimetrična.</p>`
        },
        {
          id: "ru-sim-tranz-polje",
          kind: "theorem",
          label: "Natančna meja",
          title: "Kaj simetričnost skupaj s tranzitivnostjo vendarle zagotovi",
          html: `<p>Simetrična in tranzitivna relacija ni nujno refleksivna na vsej množici \\(A\\). Primer je \\(R=\\{(1,1)\\}\\) na \\(A=\\{1,2\\}\\): je simetrična in tranzitivna, vendar \\(2R2\\) ne velja.</p>
          <p>Je pa refleksivna na svojem polju \\(D_R\\cup Z_R\\). Če element \\(x\\) nastopa v nekem paru, imamo bodisi \\(xRy\\) bodisi \\(yRx\\). Po simetričnosti dobimo oba loka, po tranzitivnosti pa \\(xRx\\). Zato je pomembno vedno povedati, <em>na kateri množici</em> preverjamo refleksivnost.</p>`
        },
        {
          id: "ru-implikacije-povzetek",
          kind: "recap",
          label: "Mreža implikacij",
          title: "Katere implikacije med lastnostmi res veljajo",
          html: `<ul>
            <li>asimetrična \\(\\Rightarrow\\) irefleksivna in antisimetrična;</li>
            <li>irefleksivna + antisimetrična \\(\\Rightarrow\\) asimetrična;</li>
            <li>irefleksivna + tranzitivna \\(\\Rightarrow\\) asimetrična;</li>
            <li>strogo sovisna \\(\\Rightarrow\\) sovisna in refleksivna;</li>
            <li>refleksivna + sovisna \\(\\Rightarrow\\) strogo sovisna;</li>
            <li>simetrična + antisimetrična \\(\\Rightarrow R\\subseteq I_A\\): dovoljene so samo zanke;</li>
            <li>simetrična + asimetrična \\(\\Rightarrow R=\\varnothing\\);</li>
            <li>nobena od lastnosti »simetrična«, »antisimetrična«, »irefleksivna« ali »tranzitivna« sama zase ne implicira katere od ostalih treh.</li>
          </ul>
          <p>Torej je stroga sovisnost ekvivalentna konjunkciji refleksivnosti in sovisnosti.</p>
          <p>Na neprazni množici relacija ne more biti hkrati refleksivna in irefleksivna. Na prazni množici sta oba univerzalna pogoja vakuozno resnična.</p>`
        },
        {
          id: "ru-tabela",
          kind: "example",
          label: "Kanonični primeri",
          title: "Popolna primerjava kanoničnih relacij",
          html: `<div class="table-wrap"><table>
            <thead><tr><th>relacija</th><th>ref.</th><th>iref.</th><th>sim.</th><th>asim.</th><th>antisim.</th><th>tranz.</th><th>sovisna</th><th>strogo sov.</th></tr></thead>
            <tbody>
              <tr><td>\\(<\\) na \\(\\mathbb R\\)</td><td>ne</td><td>da</td><td>ne</td><td>da</td><td>da</td><td>da</td><td>da</td><td>ne</td></tr>
              <tr><td>\\(\\le\\) na \\(\\mathbb R\\)</td><td>da</td><td>ne</td><td>ne</td><td>ne</td><td>da</td><td>da</td><td>da</td><td>da</td></tr>
              <tr><td>\\(\\equiv\\pmod m\\) na \\(\\mathbb Z\\), \\(m\\ge2\\)</td><td>da</td><td>ne</td><td>da</td><td>ne</td><td>ne</td><td>da</td><td>ne</td><td>ne</td></tr>
              <tr><td>\\(\\subseteq\\) na \\(\\mathcal P(A)\\), \\(|A|\\ge2\\)</td><td>da</td><td>ne</td><td>ne</td><td>ne</td><td>da</td><td>da</td><td>ne</td><td>ne</td></tr>
            </tbody>
          </table></div>
          <p>Pri \\(<\\) antisimetričnost velja vakuozno: oba pogoja \\(x<y\\) in \\(y<x\\) ne moreta veljati hkrati. Pri kongruenci antisimetričnost odpove, na primer \\(0\\equiv m\\pmod m\\), čeprav \\(0\\ne m\\). Pri vsebovanosti sta \\(\\{a\\}\\) in \\(\\{b\\}\\) neprimerljivi, kadar \\(a\\ne b\\).</p>`
        },
        {
          id: "ru-protiprimer",
          kind: "counterexample",
          label: "Jasen protiprimer",
          title: "Antisimetrično ne pomeni asimetrično",
          html: `<p>Relacija \\(\\le\\) je antisimetrična: če \\(x\\le y\\) in \\(y\\le x\\), potem \\(x=y\\). Ni asimetrična, saj \\(x\\le x\\) velja, asimetričnost pa bi zahtevala, da iz tega sledi \\(\\neg(x\\le x)\\). Ta primer prepreči najpogostejšo zamenjavo definicij.</p>`
        },
        {
          id: "ru-ekvivalenca",
          kind: "definition",
          label: "Ekvivalenca",
          title: "Ekvivalenčna relacija in razredi",
          html: `<p>Relacija je ekvivalenčna, če je refleksivna, simetrična in tranzitivna. Razred elementa \\(a\\) je</p>
          \\[[a]_R=\\{x\\in A:aRx\\}.\\]
          <p>Faktorska množica je \\(A/R=\\{[a]_R:a\\in A\\}\\). Pri ekvivalenčni relaciji sta razreda bodisi enaka bodisi disjunktna; vsak element leži v svojem razredu.</p>`
        },
        {
          id: "ru-ekv-izrek",
          kind: "theorem",
          label: "Karakterizacija",
          title: "Kdaj dva predstavnika določata isti razred",
          html: `<p>Za ekvivalenčno relacijo veljajo ekvivalence</p>
          \\[aRb\\iff[a]_R=[b]_R\\iff[a]_R\\cap[b]_R\\ne\\varnothing.\\]
          <p><strong>Dokaz \\(aRb\\Rightarrow[a]=[b]\\).</strong> Če je \\(x\\in[a]\\), velja \\(aRx\\). Iz \\(aRb\\) po simetričnosti dobimo \\(bRa\\), nato iz \\(bRa\\) in \\(aRx\\) po tranzitivnosti \\(bRx\\), zato \\(x\\in[b]\\). Sledi \\([a]\\subseteq[b]\\); druga vsebovanost je simetrična.</p>
          <p><strong>Obrat.</strong> Če je \\([a]=[b]\\), je zaradi refleksivnosti \\(b\\in[b]=[a]\\), zato \\(aRb\\).</p>
          <p><strong>Presek.</strong> Iz \\(aRb\\) dobimo \\(b\\in[a]\\cap[b]\\). Če pa je \\(c\\in[a]\\cap[b]\\), veljata \\(aRc\\) in \\(bRc\\); iz druge zveze po simetričnosti dobimo \\(cRb\\), nato iz tranzitivnosti \\(aRb\\). Tako so vsi trije pogoji res enakovredni.</p>`
        },
        {
          id: "ru-razbitje",
          kind: "theorem",
          label: "Temeljni izrek",
          title: "Ekvivalenčne relacije so isto kot razbitja",
          html: `<p><strong>Izrek.</strong> Faktorska množica \\(A/R\\) vsake ekvivalenčne relacije tvori razbitje \\(A\\): deli so neprazni, paroma disjunktni in njihova unija je \\(A\\).</p>
          <p><strong>Dokaz.</strong> Razred \\([a]\\) je neprazen, ker zaradi refleksivnosti vsebuje \\(a\\). Zato vsak \\(a\\in A\\) leži vsaj v \\([a]\\), kar dokaže \\(\\bigcup(A/R)=A\\). Če se razreda sekata, sta po prejšnjem izreku enaka; dva različna razreda sta torej disjunktna.</p>
          <p>Obratno, če je \\(\\mathcal P\\) razbitje \\(A\\), predpis</p>
          \\[xRy\\iff x\\text{ in }y\\text{ ležita v istem delu }\\mathcal P\\]
          <p>določa ekvivalenčno relacijo: vsak element je v istem delu kot sam, »biti v istem delu« je simetrično, iz tega, da sta \\(x,y\\) v istem delu in \\(y,z\\) v istem delu, pa zaradi paroma disjunktnih delov sledi, da so vsi trije v istem delu. Razredi so natanko deli razbitja.</p>`
        },
        {
          id: "ru-inverz-kompozit",
          kind: "theorem",
          label: "Alternativni kriterij",
          title: "Ekvivalenca z inverzom in kompozicijo",
          html: `<p>Relacija \\(R\\) na \\(A\\) je ekvivalenčna natanko tedaj, ko je \\(D_R=A\\) in</p>
          \\[R^{-1}\\circ R=R.\\]
          <p>Uporabljamo konvencijo \\(x(S\\circ R)z\\iff\\exists y(xRy\\land ySz)\\). Če je \\(R\\) ekvivalenčna, je \\(D_R=A\\), \\(R^{-1}=R\\) zaradi simetričnosti in \\(R\\circ R=R\\): tranzitivnost da vključitev \\(R\\circ R\\subseteq R\\), refleksivnost pa \\(R\\subseteq R\\circ R\\).</p>
          <p>Obratno naj veljata navedena pogoja. Za \\(x\\in A=D_R\\) izberemo \\(y\\) z \\(xRy\\); tedaj \\(x(R^{-1}\\circ R)x\\), zato po enakosti \\(xRx\\). Če \\(xRy\\), uporabimo \\(yRy\\) in dobimo \\(y(R^{-1}\\circ R)x\\), zato \\(yRx\\). Če \\(xRy\\) in \\(yRz\\), iz simetričnosti sledi \\(zRy\\), zato \\(x(R^{-1}\\circ R)z\\) in torej \\(xRz\\). Tako je \\(R\\) refleksivna, simetrična in tranzitivna.</p>`
        },
        {
          id: "ru-urejenosti",
          kind: "definition",
          label: "Urejenosti",
          title: "Štiri vrste urejenosti",
          html: `<p>Ob predpostavljeni tranzitivnosti je relacija:</p>
          <ul>
            <li><strong>delna urejenost</strong>, če je refleksivna in antisimetrična;</li>
            <li><strong>linearna urejenost</strong>, če je antisimetrična in strogo sovisna;</li>
            <li><strong>stroga delna urejenost</strong>, če je asimetrična;</li>
            <li><strong>stroga linearna urejenost</strong>, če je asimetrična in sovisna.</li>
          </ul>
          <p>Ker stroga sovisnost implicira refleksivnost, je linearna urejenost tudi delna. Stroga linearna je stroga delna.</p>`
        },
        {
          id: "ru-stroga-sovisna-dokaz",
          kind: "proof",
          label: "Trditev 4.6",
          title: "Dokaz, da stroga sovisnost implicira refleksivnost",
          html: `<p>Naj bo \\(R\\) strogo sovisna na \\(A\\). Po definiciji za vsaka \\(x,y\\in A\\) velja \\(xRy\\lor yRx\\). Vzemimo \\(y=x\\). Dobimo \\(xRx\\lor xRx\\), torej \\(xRx\\). Ker je bil \\(x\\) poljuben, je \\(R\\) refleksivna.</p>
          <p>Zato je vsaka linearna urejenost tudi delna urejenost: tranzitivnost in antisimetričnost sta že v definiciji, refleksivnost pa sledi iz stroge sovisnosti. Prav tako je vsaka stroga linearna urejenost stroga delna, ker ima poleg asimetričnosti in tranzitivnosti le še dodatno sovisnost.</p>`
        },
        {
          id: "ru-pasti",
          kind: "pitfall",
          label: "Izpitne pasti",
          title: "Kvantifikator določa vrsto protiprimera",
          html: `<ul>
            <li>Simetričnost in antisimetričnost se ne izključujeta; enakost ima obe.</li>
            <li>Irefleksivnost sama ne pomeni asimetričnosti.</li>
            <li>Pri ekvivalenčnem razredu vstavi fiksni predstavnik v pravi argument relacije.</li>
            <li>Razredi niso dodatne kopije: enak razred se v faktorski množici pojavi enkrat.</li>
            <li>Delna urejenost ne zahteva primerljivosti vseh parov.</li>
          </ul>`
        },
        {
          id: "ru-ustni-odgovor",
          kind: "explanation",
          label: "Teorijski odgovor",
          title: "Standard popolnega odgovora o relaciji",
          html: `<p>Najprej povej univerzum in formalno definicijo lastnosti. Za dokaz vzemi poljubne elemente, ki izpolnjujejo antecedent definicije, in izpelji zaključek. Za ovržbo navedi elemente, ki naredijo antecedent resničen in zaključek napačen. Če vprašanje zahteva implikacijo med lastnostmi, izhajaj samo iz njunih definicij; če implikacija ne velja, podaj celotno relacijo kot množico urejenih parov in preveri obe lastnosti.</p>`
        },
        {
          id: "ru-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Relacije in urejenosti v enem dihu",
          html: `<p>Relacija je množica parov. Ekvivalenca = refleksivna + simetrična + tranzitivna in njeni razredi razbijejo množico. Delna urejenost = refleksivna + antisimetrična + tranzitivna; linearna doda primerljivost. Lastnost dokazuješ s poljubnimi elementi, ovržeš pa z enim pravilno oblikovanim protiprimerom.</p>`
        }
      ],
      checklist: [
        "Poznam formalne definicije osmih lastnosti relacij.",
        "Ne zamenjam simetrične, asimetrične in antisimetrične relacije.",
        "Znam dokazati, da asimetričnost implicira irefleksivnost in antisimetričnost.",
        "Znam dokazati karakterizacijo: asimetrična je isto kot irefleksivna in antisimetrična.",
        "Znam s konkretnima relacijama pokazati, da simetričnost in tranzitivnost ne implicirata druga druge.",
        "Za vsako napačno lastnost znam obliko protiprimera.",
        "Znam izračunati in parametrizirati ekvivalenčni razred.",
        "Znam dokazati zvezo med razbitji in ekvivalencami.",
        "Ločim vse štiri vrste urejenosti."
      ]
    }
  ];

  const flashcards = [
    {
      id: "fc-ir-01",
      topic: "izjavni-racun",
      front: "Kdaj je implikacija \\(A\\Rightarrow B\\) napačna?",
      back: "Samo pri \\(A=1\\) in \\(B=0\\). V vseh drugih treh primerih je resnična.",
      core: true
    },
    {
      id: "fc-ir-02",
      topic: "izjavni-racun",
      front: "Kaj pomeni \\(A\\equiv B\\)?",
      back: "Izraza imata pri vsakem skupnem določilu enako vrednost; ekvivalentno je \\(A\\Leftrightarrow B\\) tavtologija.",
      core: true
    },
    {
      id: "fc-ir-03",
      topic: "izjavni-racun",
      front: "Kako zgradimo minterm za določilo?",
      back: "Za vsako spremenljivko vzamemo \\(p_i\\), če ima vrednost 1, in \\(\\neg p_i\\), če ima 0, nato vse literale povežemo s konjunkcijo. Resničen je natanko pri tem določilu."
    },
    {
      id: "fc-ir-04",
      topic: "izjavni-racun",
      front: "Kako iz tabele zgradimo izbrano DNO?",
      back: "Sestavimo minterm za vsako vrstico, kjer je vrednost izraza 1, in vse te minterme povežemo z disjunkcijo.",
      core: true
    },
    {
      id: "fc-ir-05",
      topic: "izjavni-racun",
      front: "Kaj je pravilen protiprimer neveljavnemu sklepu?",
      back: "Eno določilo, pri katerem so vse premise resnične, zaključek pa napačen.",
      core: true
    },
    {
      id: "fc-ir-06",
      topic: "izjavni-racun",
      front: "Navedi modus tollens.",
      back: "\\(A\\Rightarrow B,\\ \\neg B\\models\\neg A\\). Ne zamenjaj ga z napačnim zanikanjem premise."
    },
    {
      id: "fc-ir-07",
      topic: "izjavni-racun",
      front: "Kako izrazimo negacijo samo z NOR ali NAND?",
      back: "\\(\\neg A\\equiv A\\downarrow A\\) in tudi \\(\\neg A\\equiv A\\uparrow A\\)."
    },
    {
      id: "fc-ir-08",
      topic: "izjavni-racun",
      front: "Koliko določil ima izraz s \\(n\\) spremenljivkami?",
      back: "\\(2^n\\), ker ima vsaka spremenljivka dve možni vrednosti, izbire pa so neodvisne."
    },

    {
      id: "fc-pr-01",
      topic: "predikatni-racun",
      front: "Kaj mora podati interpretacija predikatne formule?",
      back: "Neprazno področje pogovora, pomen predikatov in konstant ter vrednosti oziroma vezavo vseh prostih spremenljivk.",
      core: true
    },
    {
      id: "fc-pr-02",
      topic: "predikatni-racun",
      front: "Kako negiramo \\(\\forall xP(x)\\)?",
      back: "\\(\\neg\\forall xP(x)\\equiv\\exists x\\neg P(x)\\): obstaja vsaj en protiprimer.",
      core: true
    },
    {
      id: "fc-pr-03",
      topic: "predikatni-racun",
      front: "Kako negiramo \\(\\exists xP(x)\\)?",
      back: "\\(\\neg\\exists xP(x)\\equiv\\forall x\\neg P(x)\\): noben objekt nima lastnosti \\(P\\).",
      core: true
    },
    {
      id: "fc-pr-04",
      topic: "predikatni-racun",
      front: "Kako pravilno razpišemo omejeni eksistenčni kvantifikator?",
      back: "\\((\\exists x\\in A)P(x)\\equiv\\exists x(x\\in A\\land P(x))\\). Nujna je konjunkcija, ne implikacija.",
      core: true
    },
    {
      id: "fc-pr-05",
      topic: "predikatni-racun",
      front: "Ali iz \\(\\forall x\\exists yP(x,y)\\) sledi \\(\\exists y\\forall xP(x,y)\\)?",
      back: "Ne. Pri prvi formuli je priča \\(y\\) lahko odvisna od \\(x\\); druga zahteva en sam \\(y\\) za vse \\(x\\)."
    },
    {
      id: "fc-pr-06",
      topic: "predikatni-racun",
      front: "Kako dokažemo univerzalno izjavo in kako jo ovržemo?",
      back: "Za dokaz vzamemo poljuben element in dokažemo lastnost; za ovržbo navedemo en element, pri katerem lastnost ne velja."
    },
    {
      id: "fc-pr-07",
      topic: "predikatni-racun",
      front: "Katera porazdelitev kvantifikatorja čez konjunkcijo vedno velja?",
      back: "\\(\\forall x(P(x)\\land Q(x))\\equiv(\\forall xP(x))\\land(\\forall xQ(x))\\)."
    },
    {
      id: "fc-pr-08",
      topic: "predikatni-racun",
      front: "Kaj je protiprimer splošni veljavnosti formule?",
      back: "Celotna interpretacija — univerzum in pomen simbolov — pri kateri formula postane napačna."
    },

    {
      id: "fc-mp-01",
      topic: "mnozice-preslikave",
      front: "Kako formalno dokažemo \\(A=B\\)?",
      back: "Dokažemo obe vsebovanosti: \\(A\\subseteq B\\) in \\(B\\subseteq A\\).",
      core: true
    },
    {
      id: "fc-mp-02",
      topic: "mnozice-preslikave",
      front: "Kakšna je logična razlika med unijo in presekom družine?",
      back: "\\(x\\in\\bigcup_iA_i\\) pomeni, da obstaja indeks z \\(x\\in A_i\\); \\(x\\in\\bigcap_iA_i\\) pomeni, da to velja za vsak indeks.",
      core: true
    },
    {
      id: "fc-mp-03",
      topic: "mnozice-preslikave",
      front: "Koliko elementov ima \\(\\mathcal P(A)\\), če je \\(|A|=n\\)?",
      back: "\\(2^n\\), ker se za vsak element neodvisno odločimo, ali pripada izbrani podmnožici.",
      core: true
    },
    {
      id: "fc-mp-04",
      topic: "mnozice-preslikave",
      front: "Kaj pomeni injektivnost?",
      back: "\\(f(x_1)=f(x_2)\\Rightarrow x_1=x_2\\); ekvivalentno različna argumenta imata različni sliki."
    },
    {
      id: "fc-mp-05",
      topic: "mnozice-preslikave",
      front: "Kaj pomeni surjektivnost \\(f:A\\to B\\)?",
      back: "Vsak \\(y\\in B\\) ima vsaj eno predsliko \\(x\\in A\\), torej \\(\\operatorname{Im}f=B\\)."
    },
    {
      id: "fc-mp-06",
      topic: "mnozice-preslikave",
      front: "Kaj pomeni, da imata množici enako moč?",
      back: "Med njima obstaja bijektivna preslikava. To je definicija tudi za neskončni množici."
    },
    {
      id: "fc-mp-07",
      topic: "mnozice-preslikave",
      front: "Kako pravilno zapišemo neomejena intervala do \\(b\\)?",
      back: "\\((-\\infty,b)=\\{x:x<b\\}\\) in \\((-\\infty,b]=\\{x:x\\le b\\}\\). Ob \\(-\\infty\\) je vedno okrogli oklepaj."
    },
    {
      id: "fc-mp-08",
      topic: "mnozice-preslikave",
      front: "Kaj pomeni Dedekindova neskončnost?",
      back: "Množica je neskončna, če je bijektivna s kako svojo pravo podmnožico."
    },

    {
      id: "fc-ru-01",
      topic: "relacije-urejenosti",
      front: "Kaj je dvomestna relacija na \\(A\\)?",
      back: "Poljubna podmnožica \\(R\\subseteq A\\times A\\); zapis \\(xRy\\) pomeni \\((x,y)\\in R\\).",
      core: true
    },
    {
      id: "fc-ru-02",
      topic: "relacije-urejenosti",
      front: "Katere tri lastnosti določajo ekvivalenčno relacijo?",
      back: "Refleksivnost, simetričnost in tranzitivnost.",
      core: true
    },
    {
      id: "fc-ru-03",
      topic: "relacije-urejenosti",
      front: "Kaj pomeni antisimetričnost?",
      back: "\\(xRy\\land yRx\\Rightarrow x=y\\). Dvosmerna relacija med različnima elementoma je prepovedana, zanke pa so dovoljene.",
      core: true
    },
    {
      id: "fc-ru-04",
      topic: "relacije-urejenosti",
      front: "Kdaj sta razreda \\([a]_R\\) in \\([b]_R\\) enaka?",
      back: "Pri ekvivalenčni relaciji natanko tedaj, ko \\(aRb\\); ekvivalentno, ko imata razreda neprazen presek."
    },
    {
      id: "fc-ru-05",
      topic: "relacije-urejenosti",
      front: "Kaj je delna urejenost?",
      back: "Refleksivna, antisimetrična in tranzitivna relacija."
    },
    {
      id: "fc-ru-06",
      topic: "relacije-urejenosti",
      front: "Kaj linearna urejenost doda delni urejenosti?",
      back: "Primerljivost vsakega para: za vsak \\(x,y\\) velja \\(xRy\\) ali \\(yRx\\)."
    },
    {
      id: "fc-ru-07",
      topic: "relacije-urejenosti",
      front: "Kako razbitje množice določi ekvivalenčno relacijo?",
      back: "Definiramo \\(xRy\\) natanko tedaj, ko \\(x\\) in \\(y\\) ležita v istem delu razbitja."
    },
    {
      id: "fc-ru-08",
      topic: "relacije-urejenosti",
      front: "Kako ovržemo tranzitivnost?",
      back: "Najdemo \\(x,y,z\\) z \\(xRy\\) in \\(yRz\\), vendar \\(\\neg xRz\\)."
    },
    {
      id: "fc-ru-09",
      topic: "relacije-urejenosti",
      front: "Definiraj irefleksivnost.",
      back: "\\(\\forall x\\in A\\,\\neg xRx\\): noben element ni v relaciji sam s seboj oziroma graf nima zank.",
      core: true
    },
    {
      id: "fc-ru-10",
      topic: "relacije-urejenosti",
      front: "Zakaj asimetričnost implicira irefleksivnost?",
      back: "Če bi veljalo \\(xRx\\), bi asimetričnost pri \\(y=x\\) dala \\(\\neg xRx\\). Protislovje, zato ni nobene zanke.",
      core: true
    },
    {
      id: "fc-ru-11",
      topic: "relacije-urejenosti",
      front: "Ali simetričnost implicira tranzitivnost?",
      back: "Ne. \\(R=\\{(1,2),(2,1)\\}\\) je simetrična, ni pa tranzitivna, ker manjkata \\((1,1)\\) in \\((2,2)\\).",
      core: true
    },
    {
      id: "fc-ru-12",
      topic: "relacije-urejenosti",
      front: "Kdaj je relacija asimetrična v jeziku irefleksivnosti in antisimetričnosti?",
      back: "Natanko tedaj, ko je hkrati irefleksivna in antisimetrična."
    },
    {
      id: "fc-ru-13",
      topic: "relacije-urejenosti",
      front: "Definiraj sovisnost in strogo sovisnost.",
      back: "Sovisnost: različna x,y sta povezana v vsaj eni smeri. Stroga sovisnost zahteva \\(xRy\\lor yRx\\) za vse x,y, tudi enake, zato implicira refleksivnost."
    },
    {
      id: "fc-ru-14",
      topic: "relacije-urejenosti",
      front: "Kaj je faktorska množica \\(A/R\\)?",
      back: "Množica vseh različnih ekvivalenčnih razredov \\(\\{[a]_R:a\\in A\\}\\); ti razredi tvorijo razbitje A."
    },
    {
      id: "fc-ru-15",
      topic: "relacije-urejenosti",
      front: "Katere štiri vrste urejenosti definira MnozRel.pdf?",
      back: "Ob tranzitivnosti: delna = refleksivna + antisimetrična; linearna = antisimetrična + strogo sovisna; stroga delna = asimetrična; stroga linearna = asimetrična + sovisna."
    },
    {
      id: "fc-ru-16",
      topic: "relacije-urejenosti",
      front: "Kdaj velja \\([a]_R=[b]_R\\) pri ekvivalenčni relaciji?",
      back: "Natanko tedaj, ko \\(aRb\\); ekvivalentno, ko se razreda vsaj v enem elementu sekata."
    }
  ];

  const quiz = [
    {
      id: "mcq-ir-01",
      topic: "izjavni-racun",
      prompt: "Pri katerem določilu je \\(p\\Rightarrow q\\) napačna?",
      options: ["\\(p=0,q=0\\)", "\\(p=0,q=1\\)", "\\(p=1,q=0\\)", "\\(p=1,q=1\\)"],
      correct: 2,
      explanation: "Implikacija je napačna samo, ko je premisa resnična in posledica napačna."
    },
    {
      id: "mcq-ir-02",
      topic: "izjavni-racun",
      prompt: "Kateri izraz je enakovreden \\(\\neg(p\\land q)\\)?",
      options: ["\\(\\neg p\\land\\neg q\\)", "\\(\\neg p\\lor\\neg q\\)", "\\(p\\lor q\\)", "\\(p\\Rightarrow\\neg q\\land p\\)"],
      correct: 1,
      explanation: "Prvi De Morganov zakon zamenja konjunkcijo z disjunkcijo in negira oba člena."
    },
    {
      id: "mcq-ir-03",
      topic: "izjavni-racun",
      prompt: "Kaj mora pokazati protiprimer neveljavnemu sklepu \\(A_1,A_2\\models B\\)?",
      options: ["Vse formule so napačne.", "Vsaj ena premisa je napačna.", "Vse premise so resnične, \\(B\\) pa napačen.", "Premise imajo različne vrednosti."],
      correct: 2,
      explanation: "Veljavnost prepoveduje natanko vrstico z resničnimi premisami in napačnim zaključkom."
    },
    {
      id: "mcq-ir-04",
      topic: "izjavni-racun",
      prompt: "Katera oblika je modus tollens?",
      options: ["\\(A,A\\Rightarrow B\\models B\\)", "\\(A\\Rightarrow B,\\neg B\\models\\neg A\\)", "\\(A\\Rightarrow B,B\\models A\\)", "\\(A\\lor B,\\neg A\\models B\\)"],
      correct: 1,
      explanation: "Modus tollens iz zanikanja posledice sklepa zanikanje premise."
    },
    {
      id: "mcq-ir-05",
      topic: "izjavni-racun",
      prompt: "Iz katerih vrstic tabele sestavimo izbrano KNO?",
      options: ["Iz vrstic, kjer je izraz 1.", "Samo iz prve in zadnje vrstice.", "Iz vrstic, kjer je izraz 0.", "Iz vseh vrstic brez izjem."],
      correct: 2,
      explanation: "Za vsako ničelno vrstico sestavimo maxterm, ki je napačen prav v tej vrstici, nato jih konjunktivno povežemo."
    },
    {
      id: "mcq-ir-06",
      topic: "izjavni-racun",
      prompt: "Kateri posamezni veznik tvori poln nabor?",
      options: ["Samo \\(\\land\\)", "Samo \\(\\Rightarrow\\)", "Samo \\(\\uparrow\\) (NAND)", "Samo \\(\\Leftrightarrow\\)"],
      correct: 2,
      explanation: "Z NAND izrazimo negacijo in konjunkcijo, zato prek normalnih oblik vse logične operacije."
    },

    {
      id: "mcq-pr-01",
      topic: "predikatni-racun",
      prompt: "Katera je pravilna negacija \\(\\forall x\\exists yP(x,y)\\)?",
      options: ["\\(\\forall x\\forall y\\neg P(x,y)\\)", "\\(\\exists x\\forall y\\neg P(x,y)\\)", "\\(\\exists x\\exists y\\neg P(x,y)\\)", "\\(\\forall y\\exists x\\neg P(x,y)\\)"],
      correct: 1,
      explanation: "Vsak kvantifikator zamenjamo in negacijo potisnemo do jedra. Vrstnega reda ne obrnemo."
    },
    {
      id: "mcq-pr-02",
      topic: "predikatni-racun",
      prompt: "Kateri razpis omejenega eksistenčnega kvantifikatorja je pravilen?",
      options: ["\\(\\exists x(x\\in A\\Rightarrow P(x))\\)", "\\(\\forall x(x\\in A\\land P(x))\\)", "\\(\\exists x(x\\in A\\land P(x))\\)", "\\(\\exists x(x\\notin A\\land P(x))\\)"],
      correct: 2,
      explanation: "Priča mora hkrati pripadati \\(A\\) in imeti lastnost \\(P\\). Implikacija bi dovolila pričo zunaj \\(A\\)."
    },
    {
      id: "mcq-pr-03",
      topic: "predikatni-racun",
      prompt: "Katera implikacija je splošno veljavna?",
      options: ["\\(\\forall x\\exists yP(x,y)\\Rightarrow\\exists y\\forall xP(x,y)\\)", "\\(\\exists y\\forall xP(x,y)\\Rightarrow\\forall x\\exists yP(x,y)\\)", "\\(\\exists xP(x)\\Rightarrow\\forall xP(x)\\)", "\\(\\forall x(P\\lor Q)\\Rightarrow\\forall xP\\lor\\forall xQ\\)"],
      correct: 1,
      explanation: "Če obstaja en \\(y\\), ki deluje za vse \\(x\\), ga lahko uporabimo kot pričo za vsak posamezen \\(x\\)."
    },
    {
      id: "mcq-pr-04",
      topic: "predikatni-racun",
      prompt: "Kaj zadošča za ovržbo \\(\\forall xP(x)\\)?",
      options: ["En \\(a\\) s \\(P(a)\\).", "En \\(a\\) z \\(\\neg P(a)\\).", "Dokaz \\(\\exists xP(x)\\).", "Dve različni priči."],
      correct: 1,
      explanation: "Univerzalna izjava trdi, da ni nobene izjeme, zato jo ena izjema ovrže."
    },
    {
      id: "mcq-pr-05",
      topic: "predikatni-racun",
      prompt: "Na \\(U=\\{1,2\\}\\) velja samo \\(P(1)\\) in samo \\(Q(2)\\). Katera formula je napačna?",
      options: ["\\(\\exists xP(x)\\)", "\\(\\exists xQ(x)\\)", "\\(\\exists xP(x)\\land\\exists xQ(x)\\)", "\\(\\exists x(P(x)\\land Q(x))\\)"],
      correct: 3,
      explanation: "Za obe ločeni eksistenčni izjavi imamo priči, noben isti element pa nima obeh lastnosti."
    },
    {
      id: "mcq-pr-06",
      topic: "predikatni-racun",
      prompt: "Kaj je prosta spremenljivka v \\(\\forall x(R(x,y)\\Rightarrow P(x))\\)?",
      options: ["Samo \\(x\\)", "Samo \\(y\\)", "Obe \\(x,y\\)", "Nobena"],
      correct: 1,
      explanation: "Vse pojavitve \\(x\\) so v dosegu \\(\\forall x\\); \\(y\\) nima svojega kvantifikatorja."
    },

    {
      id: "mcq-mp-01",
      topic: "mnozice-preslikave",
      prompt: "Katera trditev velja za vsako množico \\(A\\)?",
      options: ["\\(\\varnothing\\in A\\)", "\\(A\\in A\\)", "\\(\\varnothing\\subseteq A\\)", "\\(\\{A\\}\\subseteq A\\)"],
      correct: 2,
      explanation: "Prazna množica nima elementa, ki bi lahko kršil pogoj vsebovanosti. Pripadnost prazne množice pa ni avtomatična."
    },
    {
      id: "mcq-mp-02",
      topic: "mnozice-preslikave",
      prompt: "Če je \\(|A|=4\\), koliko elementov ima \\(\\mathcal P(A)\\)?",
      options: ["4", "8", "16", "24"],
      correct: 2,
      explanation: "Potenčna množica \\(n\\)-elementne množice ima \\(2^n\\) elementov, tukaj \\(2^4=16\\)."
    },
    {
      id: "mcq-mp-03",
      topic: "mnozice-preslikave",
      prompt: "Kateri je pravilen opis intervala \\((-\\infty,b]\\)?",
      options: ["\\(\\{x:b\\le x\\}\\)", "\\(\\{x:x<b\\}\\)", "\\(\\{x:x\\le b\\}\\)", "\\(\\{x:b<x\\}\\)"],
      correct: 2,
      explanation: "Interval vsebuje vsa realna števila levo od \\(b\\) in tudi krajišče \\(b\\)."
    },
    {
      id: "mcq-mp-04",
      topic: "mnozice-preslikave",
      prompt: "Kaj pomeni, da je \\(f:A\\to B\\) surjektivna?",
      options: ["Vsak \\(x\\in A\\) ima dve sliki.", "Različna argumenta imata različni sliki.", "Vsak \\(y\\in B\\) ima vsaj eno predsliko.", "Domena in kodomena sta ista množica."],
      correct: 2,
      explanation: "Surjektivnost pomeni \\(\\operatorname{Im}f=B\\)."
    },
    {
      id: "mcq-mp-06",
      topic: "mnozice-preslikave",
      prompt: "Kateri zapis opisuje element preseka indeksirane družine?",
      options: ["\\(x\\in A_i\\) za vsaj en \\(i\\)", "\\(x\\in A_i\\) za vsak \\(i\\)", "\\(x\\notin A_i\\) za vsak \\(i\\)", "\\(x\\) je indeks družine"],
      correct: 1,
      explanation: "Presek je univerzalni pogoj: element mora pripadati vsakemu členu družine."
    },

    {
      id: "mcq-ru-01",
      topic: "relacije-urejenosti",
      prompt: "Katera trojica lastnosti določa ekvivalenčno relacijo?",
      options: ["Refleksivna, simetrična, tranzitivna", "Irefleksivna, asimetrična, tranzitivna", "Refleksivna, antisimetrična, sovisna", "Simetrična, antisimetrična, tranzitivna"],
      correct: 0,
      explanation: "To je definicija ekvivalenčne relacije."
    },
    {
      id: "mcq-ru-02",
      topic: "relacije-urejenosti",
      prompt: "Katera relacija je antisimetrična, vendar ni asimetrična?",
      options: ["\\(<\\) na \\(\\mathbb R\\)", "\\(\\le\\) na \\(\\mathbb R\\)", "Relacija \\(x\\ne y\\)", "Prazna relacija"],
      correct: 1,
      explanation: "\\(\\le\\) je antisimetrična, vendar refleksivna; asimetrična relacija mora biti irefleksivna."
    },
    {
      id: "mcq-ru-03",
      topic: "relacije-urejenosti",
      prompt: "Kako ovržemo antisimetričnost?",
      options: ["Najdemo \\(x\\) brez zanke.", "Najdemo različna \\(x,y\\) z \\(xRy\\) in \\(yRx\\).", "Najdemo \\(xRy\\), a ne \\(yRx\\).", "Najdemo tri elemente v ciklu."],
      correct: 1,
      explanation: "Antisimetričnost prepoveduje prav dvosmerni par med različnima elementoma."
    },
    {
      id: "mcq-ru-04",
      topic: "relacije-urejenosti",
      prompt: "Kaj velja za razreda ekvivalenčne relacije?",
      options: ["Vedno se sekata v enem elementu.", "Sta bodisi enaka bodisi disjunktna.", "Vsak razred je enoelementen.", "Razred je lahko prazen."],
      correct: 1,
      explanation: "Neprazen presek dveh razredov pri ekvivalenčni relaciji že implicira njuno enakost."
    },
    {
      id: "mcq-ru-05",
      topic: "relacije-urejenosti",
      prompt: "Katera relacija je delna, vendar na splošno ni linearna urejenost?",
      options: ["\\(\\le\\) na \\(\\mathbb R\\)", "\\(<\\) na \\(\\mathbb R\\)", "\\(\\subseteq\\) na \\(\\mathcal P(A)\\) za \\(|A|\\ge2\\)", "Enakost na enoelementni množici"],
      correct: 2,
      explanation: "Npr. \\(\\{a\\}\\) in \\(\\{b\\}\\) sta neprimerljivi glede na vsebovanost."
    },
    {
      id: "mcq-ru-06",
      topic: "relacije-urejenosti",
      prompt: "Če je \\(R\\) ekvivalenčna, kdaj velja \\([a]_R=[b]_R\\)?",
      options: ["Natanko ko \\(a=b\\)", "Natanko ko \\(aRb\\)", "Samo ko sta oba razreda enoelementna", "Vedno"],
      correct: 1,
      explanation: "Ekvivalentna elementa sta natanko predstavnika istega ekvivalenčnega razreda."
    },
    {
      id: "mcq-ru-07",
      topic: "relacije-urejenosti",
      prompt: "Kaj nujno velja za vsako asimetrično relacijo?",
      options: ["Je refleksivna in simetrična.", "Je irefleksivna in antisimetrična.", "Je tranzitivna.", "Je strogo sovisna."],
      correct: 1,
      explanation: "Asimetričnost prepove zanke in vsak dvosmerni par. Tranzitivnosti ali sovisnosti pa ne zagotavlja."
    },
    {
      id: "mcq-ru-08",
      topic: "relacije-urejenosti",
      prompt: "Na \\(A=\\{1,2\\}\\) je \\(R=\\{(1,2),(2,1)\\}\\). Katera trditev je pravilna?",
      options: ["R je tranzitivna.", "R je refleksivna.", "R je simetrična in irefleksivna.", "R je antisimetrična."],
      correct: 2,
      explanation: "Oba loka imata obrat, zank ni. Tranzitivnost odpove, ker bi 1R2 in 2R1 zahtevala 1R1."
    },
    {
      id: "mcq-ru-09",
      topic: "relacije-urejenosti",
      prompt: "Kaj sledi iz irefleksivnosti in tranzitivnosti?",
      options: ["Simetričnost", "Refleksivnost", "Asimetričnost", "Stroga sovisnost"],
      correct: 2,
      explanation: "Če bi veljala xRy in yRx, bi tranzitivnost dala xRx, kar irefleksivnost prepoveduje."
    },
    {
      id: "mcq-ru-10",
      topic: "relacije-urejenosti",
      prompt: "Kaj stroga sovisnost sama vedno implicira?",
      options: ["Irefleksivnost", "Refleksivnost", "Simetričnost", "Tranzitivnost"],
      correct: 1,
      explanation: "V pogoju xRy ali yRx vzamemo y=x in dobimo xRx."
    },
    {
      id: "mcq-pr-07",
      topic: "predikatni-racun",
      prompt: "Zakaj je \\(\\forall x\\exists y(P(y,x)\\Rightarrow P(x,y))\\) splošno veljavna?",
      options: ["Ker je P vedno simetričen.", "Ker izberemo y=x.", "Ker zamenjamo kvantifikatorja.", "Ker je univerzum prazen."],
      correct: 1,
      explanation: "Z izbiro y=x dobimo tavtologijo P(x,x)⇒P(x,x), neodvisno od interpretacije P."
    },
    {
      id: "mcq-ir-07",
      topic: "izjavni-racun",
      prompt: "Katera formula iz zbirke teorijskih izpitov ni tavtologija?",
      options: ["\\((p\\land q)\\Rightarrow(p\\lor q)\\)", "\\(p\\lor\\neg p\\)", "\\((p\\land(p\\Rightarrow q))\\Leftrightarrow q\\)", "\\((p\\land q)\\Rightarrow p\\)"],
      correct: 2,
      explanation: "Pri p=0,q=1 je leva stran ekvivalence 0, desna pa 1."
    }
  ];

  const questions = [
    {
      id: "oq-ir-01",
      topic: "izjavni-racun",
      prompt: H`Opredeli izjavo, izjavni izraz in določilo, nato pa na lastnih zgledih razmeji sintakso od semantike. Navedi povedni stavek, ki je izjava, zapis, ki ni izjava, ter pravilno in nepravilno zgrajen izraz; pojasni tudi, zakaj resničnost ni lastnost samega zapisa brez določila.`,
      answer: H`<strong>Izjava</strong> je smiseln povedni stavek z natanko eno logično vrednostjo \(0\) ali \(1\); »\(2+3=5\)« je izjava, vprašanje »Koliko je ura?« in odprta poved »\(x>2\)« brez določenega \(x\) pa nista izjavi. <strong>Izjavni izraz</strong> je formula, zgrajena induktivno iz konstant \(0,1\), izjavnih spremenljivk in veznikov: če sta \(A,B\) izraza, sta na primer \(\neg A\) in \((A\land B)\) izraza. Zapis \(p\land(q\lor r)\) je pravilno zgrajen, \(\land p q\) pa v uporabljeni infiksni sintaksi ni. <strong>Določilo</strong> vsaki nastopajoči izjavni spremenljivki priredi \(0\) ali \(1\); za \(n\) različnih spremenljivk je \(2^n\) določil. Sintaksa odgovarja, ali je zapis po tvorbenih pravilih formula, semantika pa rekurzivno določi njeno vrednost pri izbranem določilu. Isti izraz \(p\Rightarrow q\) je zato pri \(p=1,q=0\) napačen, pri \(p=0,q=0\) pa resničen. Pogosta napaka je sklepati, da pravilno zgrajena formula že zato velja; pravilna zgradba ne zagotavlja tavtološkosti.`,
      hint: H`Loči tri vprašanja: ali je stavek sploh izjava, ali je simbolni zapis pravilno zgrajen in kakšno vrednost dobi pri konkretnem določilu.`,
      rubric: ["tri natančne definicije", "primer izjave in neizjave", "pravilen in nepravilen izraz", "ista formula pri dveh določilih"],
      difficulty: "lahko",
      source: "IzjavniRacun.pdf, str. 1–7",
      tags: ["definicije", "sintaksa"]
    },
    {
      id: "oq-ir-02",
      topic: "izjavni-racun",
      prompt: "Navedi De Morganova zakona in enega izmed njiju dokaži z resničnostno tabelo ali pomenskim argumentom.",
      answer: "Veljata \\(\\neg(A\\land B)\\equiv\\neg A\\lor\\neg B\\) in \\(\\neg(A\\lor B)\\equiv\\neg A\\land\\neg B\\). Pri prvem je leva stran resnična natanko tedaj, ko ni res, da sta resnična oba člena, torej ko je napačen vsaj eden; prav tedaj je resnična disjunkcija \\(\\neg A\\lor\\neg B\\). Tabela obeh izrazov ima zato v vseh štirih vrsticah enak stolpec.",
      hint: "Besedno zvezo »ni res, da oba« prevedi v »vsaj eden ni«.",
      rubric: ["oba pravilna zakona", "vse štiri možnosti ali korekten pomenski argument", "jasen sklep o enakovrednosti"],
      difficulty: "lahko",
      source: "IzjavniRacun.pdf, razdelek 1.4",
      tags: ["izrek", "dokaz"]
    },
    {
      id: "oq-ir-05",
      topic: "izjavni-racun",
      prompt: "Navedi sedem osnovnih pravil sklepanja in razloži razliko med modus tollens ter napačnim zanikanjem premise.",
      answer: "Sedem formalnih shem je: modus ponens \\(A,A\\Rightarrow B\\models B\\); modus tollens \\(A\\Rightarrow B,\\neg B\\models\\neg A\\); disjunktivni silogizem \\(A\\lor B,\\neg A\\models B\\); hipotetični silogizem \\(A\\Rightarrow B,B\\Rightarrow C\\models A\\Rightarrow C\\); poenostavitev \\(A\\land B\\models A\\); združitev \\(A,B\\models A\\land B\\); pridružitev \\(A\\models A\\lor B\\). Napačno zanikanje premise bi bilo \\(A\\Rightarrow B,\\neg A\\models\\neg B\\); to ni modus tollens in ne velja, ker je \\(B\\) lahko resnična iz drugega razloga. Na primer: če dežuje, so tla mokra; ne dežuje, vendar so tla lahko mokra zaradi zalivanja.",
      hint: "Pri MT negiramo posledico in sklepamo negacijo premise.",
      rubric: ["vseh sedem pravil", "pravilen zapis MT", "zapis neveljavne oblike", "protiprimer"],
      difficulty: "težko",
      source: "IzjavniRacun.pdf, Izrek 1.10",
      tags: ["formalni dokaz", "pravila"]
    },

    {
      id: "oq-pr-02",
      topic: "predikatni-racun",
      prompt: "Negiraj \\(\\forall x\\in A\\ \\exists y\\in B\\ (P(x,y)\\Rightarrow Q(y))\\) tako, da negacija ostane samo pred atomskimi formulami.",
      answer: "Negacija je \\(\\exists x\\in A\\ \\forall y\\in B\\ \\neg(P(x,y)\\Rightarrow Q(y))\\). Ker je \\(\\neg(P\\Rightarrow Q)\\equiv P\\land\\neg Q\\), dobimo \\(\\exists x\\in A\\ \\forall y\\in B\\ (P(x,y)\\land\\neg Q(y))\\). Pri popolnem razpisu omejenih kvantifikatorjev je zunanja eksistenca konjunkcija s \\(x\\in A\\), notranji univerzalni kvantifikator pa uporablja implikacijo iz \\(y\\in B\\).",
      hint: "Najprej zamenjaj oba kvantifikatorja, nato odpravi implikacijo.",
      rubric: ["zamenjava obeh kvantifikatorjev", "ohranjen vrstni red", "pravilna negacija implikacije", "pravilni omejitvi"],
      difficulty: "srednje",
      source: "ADM-Predikati.pdf, razdelek 2.3",
      tags: ["negacija", "omejeni kvantifikatorji"]
    },
    {
      id: "oq-pr-03",
      topic: "predikatni-racun",
      prompt: "Razloži, zakaj omejeni eksistenčni kvantifikator uporablja konjunkcijo in ne implikacije. Dodaj konkreten protiprimer napačnemu zapisu.",
      answer: "Pravilen zapis je \\((\\exists x\\in A)P(x)\\equiv\\exists x(x\\in A\\land P(x))\\), ker mora ista priča pripadati \\(A\\) in imeti lastnost \\(P\\). Napačni zapis \\(\\exists x(x\\in A\\Rightarrow P(x))\\) je lahko resničen samo zaradi elementa zunaj \\(A\\). Na primer na \\(U=\\{1,2\\}\\), \\(A=\\{1\\}\\), naj bo \\(P\\) povsod napačen. Pravilna formula je napačna, napačni implikacijski zapis pa je resničen s pričo \\(x=2\\), saj je premisa \\(2\\in A\\) napačna.",
      hint: "Implikacija z napačno premiso je resnična.",
      rubric: ["pravilna formula", "razlaga iste priče", "konkreten univerzum", "pokazani različni vrednosti formul"],
      difficulty: "srednje",
      source: "ADM-Predikati.pdf, popravek razdelka 2.3",
      tags: ["past", "protiprimer"]
    },
    {
      id: "oq-pr-04",
      topic: "predikatni-racun",
      prompt: "Katere porazdelitve kvantifikatorjev čez \\(\\land\\) in \\(\\lor\\) veljajo? Za napačna obrata podaj protiprimer.",
      answer: "Veljata \\(\\forall x(P\\land Q)\\equiv(\\forall xP)\\land(\\forall xQ)\\) ter \\(\\exists x(P\\lor Q)\\equiv(\\exists xP)\\lor(\\exists xQ)\\). Vedno veljata tudi enosmerni implikaciji \\(\\exists x(P\\land Q)\\Rightarrow(\\exists xP)\\land(\\exists xQ)\\) in \\((\\forall xP)\\lor(\\forall xQ)\\Rightarrow\\forall x(P\\lor Q)\\). Obrata praviloma ne veljata. Na \\(U=\\{1,2\\}\\) naj velja \\(P\\) samo za 1, \\(Q\\) pa samo za 2. Tedaj ločeni eksistenčni izjavi veljata, skupne priče ni; obenem \\(P(x)\\lor Q(x)\\) velja za vsak \\(x\\), vendar niti \\(P\\) niti \\(Q\\) ne velja za vse elemente.",
      hint: "Vprašaj se, ali morata biti priči pri dveh eksistencah isti.",
      rubric: ["dve enakovrednosti", "obe enosmerni implikaciji", "protiprimer obema obratoma", "razlaga različnih prič in različnih lastnosti"],
      difficulty: "težko",
      source: "ADM-Predikati.pdf, str. 22",
      tags: ["enakovrednosti", "protiprimer"]
    },
    {
      id: "oq-pr-05",
      topic: "predikatni-racun",
      prompt: "Primerjaj \\(\\forall x\\exists yP(x,y)\\) in \\(\\exists y\\forall xP(x,y)\\). Katera implikacija vedno velja in zakaj obrat ne?",
      answer: "Vedno velja \\(\\exists y\\forall xP(x,y)\\Rightarrow\\forall x\\exists yP(x,y)\\), ker en sam univerzalni \\(y\\) uporabimo pri vsakem \\(x\\). Obrat ne velja, ker se priča \\(y\\) v prvi formuli sme spreminjati z \\(x\\). Na \\(\\mathbb N\\) za \\(P(x,y)\\equiv y>x\\) velja \\(\\forall x\\exists yP(x,y)\\) z izbiro \\(y=x+1\\), ne obstaja pa največje naravno število, zato je druga formula napačna.",
      hint: "Ali isti \\(y\\) deluje za vse \\(x\\), ali ga lahko izbereš na novo?",
      rubric: ["pravilna smer implikacije", "argument z isto pričo", "konkretna relacija", "dokaz resničnosti in napačnosti"],
      difficulty: "srednje",
      source: "ADM-Predikati.pdf, razdelek 2.4",
      tags: ["vrstni red", "kvantifikatorji"]
    },

    {
      id: "oq-mp-01",
      topic: "mnozice-preslikave",
      prompt: H`Definiraj pripadnost, podmnožico, pravo podmnožico in enakost množic ter razloži vlogo prazne in univerzalne množice. Na konkretnem primeru razmeji \(\in\) od \(\subseteq\), \(\varnothing\) od \(\{\varnothing\}\), nato pa opiši popoln dokaz enakosti z dvojno vsebovanostjo.`,
      answer: H`Zapis \(x\in A\) pomeni, da je \(x\) element \(A\). Vsebovanost je \(A\subseteq B\iff\forall x(x\in A\Rightarrow x\in B)\); prava vsebovanost \(A\subsetneq B\) zahteva še \(A\ne B\). Po načelu ekstenzionalnosti velja \(A=B\iff\forall x(x\in A\Leftrightarrow x\in B)\), ekvivalentno \(A\subseteq B\land B\subseteq A\). Prazna množica \(\varnothing\) nima elementov in je podmnožica vsake množice, univerzalna množica \(U\) pa je kontekstno izbrana množica vseh obravnavanih objektov. Za \(A=\{1,2\}\), \(B=\{1,2,3\}\) veljajo \(1\in A\), \(\{1\}\subseteq A\), \(\{1\}\notin A\) in \(A\subsetneq B\). Zapisa \(1\subseteq A\) ne smemo zamenjati z \(1\in A\): če števila obravnavamo kot osnovne objekte, ga ne uporabljamo; v von Neumannovi konstrukciji je smiseln, a tukaj napačen, ker je \(1=\{\varnothing\}\) in \(\varnothing\notin A\). \(\varnothing\ne\{\varnothing\}\), saj ima prva nič, druga en element. Za dokaz \(X=Y\) vzamemo najprej poljuben \(x\in X\) in iz definicij izpeljemo \(x\in Y\), nato ločeno vzamemo poljuben \(x\in Y\) in izpeljemo \(x\in X\). Šele obe vsebovanosti dovolita sklep \(X=Y\); slika Vennovega diagrama sama ni formalni dokaz.`,
      hint: H`Pri vsakem simbolu povej, kakšne vrste objekt stojijo na levi in desni; pri enakosti napiši dva ločena univerzalna argumenta.`,
      rubric: ["štiri formalne definicije", "prazna in univerzalna množica", "ločitev pripadnosti od vsebovanosti", "dvojna vsebovanost"],
      difficulty: "lahko",
      source: "MnozRel.pdf, razdelek 3.1",
      tags: ["dokaz", "vsebovanost"]
    },
    {
      id: "oq-mp-02",
      topic: "mnozice-preslikave",
      prompt: "Navedi zakona De Morgan za množice in prvega dokaži z elementnim argumentom.",
      answer: "Veljata \\((A\\cap B)^c=A^c\\cup B^c\\) in \\((A\\cup B)^c=A^c\\cap B^c\\). Za poljuben \\(x\\): \\(x\\in(A\\cap B)^c\\iff x\\notin A\\cap B\\iff\\neg(x\\in A\\land x\\in B)\\iff x\\notin A\\lor x\\notin B\\iff x\\in A^c\\cup B^c\\). Ker sta pogoja za pripadnost ekvivalentna za vsak \\(x\\), sta množici enaki.",
      hint: "Prevedi pripadnost v logično formulo in uporabi De Morganov zakon izjavnega računa.",
      rubric: ["oba zakona", "poljuben element", "celotna veriga ekvivalenc", "sklep po ekstenzionalnosti"],
      difficulty: "srednje",
      source: "MnozRel.pdf, razdelek 3.2",
      tags: ["De Morgan", "elementni dokaz"]
    },
    {
      id: "oq-mp-03",
      topic: "mnozice-preslikave",
      prompt: "Definiraj unijo in presek indeksirane družine ter razloži, zakaj je \\(\\bigcap_{n\\ge1}(0,1/n]=\\varnothing\\).",
      answer: "\\(x\\in\\bigcup_iA_i\\) natanko tedaj, ko obstaja indeks \\(i\\) z \\(x\\in A_i\\); \\(x\\in\\bigcap_iA_i\\) natanko tedaj, ko \\(x\\in A_i\\) za vsak indeks. Če je \\(x<0\\), ni v nobenem intervalu \\((0,1/n]\\), prav tako v njih ni \\(x=0\\). Če je \\(x>0\\), po Arhimedovi lastnosti obstaja \\(n>1/x\\), zato je \\(1/n<x\\) in \\(x\\notin(0,1/n]\\). Noben realni kandidat torej ni v vseh intervalih.",
      hint: "Ločeno obravnavaj \\(x\\le0\\) in \\(x>0\\).",
      rubric: ["obe definiciji s kvantifikatorjema", "izločitev 0 in negativnih", "izbira dovolj velikega n", "sklep o praznem preseku"],
      difficulty: "srednje",
      source: "MnozRel.pdf, razdelka 3.3–3.4",
      tags: ["družine", "intervali"]
    },
    {
      id: "oq-mp-04",
      topic: "mnozice-preslikave",
      prompt: "Definiraj potenčno množico in kartezični produkt. Dokaži formuli za njuno moč pri končnih množicah.",
      answer: "\\(\\mathcal P(A)=\\{B:B\\subseteq A\\}\\). Če ima \\(A\\) \\(n\\) elementov, za vsak element neodvisno izbiramo vključitev ali izključitev, zato je podmnožic \\(2^n\\). Produkt \\(A\\times B=\\{(a,b):a\\in A,b\\in B\\}\\). Če je \\(|A|=n,|B|=m\\), za vsakega od \\(n\\) prvih elementov izberemo enega od \\(m\\) drugih, zato je urejenih parov \\(nm\\).",
      hint: "Uporabi neodvisne izbire: dve pri podmnožici, \\(m\\) pri drugi komponenti para.",
      rubric: ["obe definiciji", "argument 2 možnosti na element", "argument načela produkta", "pravilni formuli"],
      difficulty: "lahko",
      source: "MnozRel.pdf, razdelka 3.5–3.6",
      tags: ["moč", "produkt"]
    },
    {
      id: "oq-mp-05",
      topic: "mnozice-preslikave",
      prompt: "Definiraj injektivno, surjektivno in bijektivno preslikavo. Pojasni, kako bijekcije definirajo enako moč, tudi pri neskončnih množicah.",
      answer: "Injektivnost pomeni \\(f(x_1)=f(x_2)\\Rightarrow x_1=x_2\\). Surjektivnost pomeni \\(\\forall y\\in B\\exists x\\in A:f(x)=y\\). Bijekcija ima obe lastnosti in zato vsak element kodomene zadene natanko enkrat. Za bijekcijo \\(f:A\\to B\\) obstaja inverzna preslikava \\(f^{-1}:B\\to A\\), določena z \\(f^{-1}(y)=x\\iff f(x)=y\\); velja \\(f^{-1}\\circ f=\\operatorname{id}_A\\) in \\(f\\circ f^{-1}=\\operatorname{id}_B\\). Definiramo \\(|A|=|B|\\), kadar obstaja bijekcija \\(A\\to B\\). Tako je na primer \\(n\\mapsto2n\\) bijekcija med \\(\\mathbb N\\) in sodimi naravnimi števili, čeprav so soda števila prava podmnožica \\(\\mathbb N\\); to je značilnost neskončnosti.",
      hint: "Za neskončne množice »prava podmnožica« ne pomeni nujno manjše moči.",
      rubric: ["tri definicije", "bijekcija in inverz", "definicija enake moči", "ustrezen neskončni primer"],
      difficulty: "srednje",
      source: "MnozRel.pdf, razdelek 3.7",
      tags: ["preslikave", "kardinalnost"]
    },

    {
      id: "oq-ru-03",
      topic: "relacije-urejenosti",
      prompt: "Navedi in razloži izrek o zvezi med ekvivalenčnimi relacijami in razbitji množice.",
      answer: "Razredi vsake ekvivalenčne relacije so neprazni, paroma disjunktni in njihova unija je celotna množica, zato tvorijo razbitje. Nepraznost sledi iz \\(a\\in[a]\\), pokritje prav tako, disjunktnost pa iz dejstva, da neprazen presek razredov implicira njuno enakost. Obratno razbitje \\(\\mathcal P\\) določi relacijo \\(xRy\\), če elementa ležita v istem delu; ta relacija je očitno refleksivna, simetrična in tranzitivna, njeni razredi pa so deli razbitja.",
      hint: "Dokaz ima dve smeri: razredi → razbitje in razbitje → relacija.",
      rubric: ["tri lastnosti razbitja", "razlog za disjunktnost", "konstrukcija obratne relacije", "preverjene tri lastnosti"],
      difficulty: "težko",
      source: "MnozRel.pdf, Trditev 4.4",
      tags: ["razbitje", "temeljni izrek"]
    },
    {
      id: "oq-ru-04",
      topic: "relacije-urejenosti",
      prompt: "Definiraj delno, linearno, strogo delno in strogo linearno urejenost. Navedi primer vsake in en par neprimerljivih elementov v delni urejenosti.",
      answer: "Delna urejenost je refleksivna, antisimetrična in tranzitivna; primer \\(\\subseteq\\) na \\(\\mathcal P(A)\\). Linearna je delna urejenost, kjer sta vsaka elementa primerljiva; primer \\(\\le\\) na \\(\\mathbb R\\). Stroga delna je asimetrična in tranzitivna; primer prava vsebovanost. Stroga linearna dodatno primerja vsak različni par; primer \\(<\\) na \\(\\mathbb R\\). Pri \\(A=\\{a,b\\}\\) sta \\(\\{a\\}\\) in \\(\\{b\\}\\) neprimerljivi glede na \\(\\subseteq\\).",
      hint: "Nestroga reda uporabljata refleksivnost, stroga asimetričnost.",
      rubric: ["vse štiri definicije", "ustrezen primer vsake", "primer neprimerljivega para", "razlika strogo/nestrogo"],
      difficulty: "težko",
      source: "MnozRel.pdf, Definicija 4.5",
      tags: ["urejenosti", "primeri"]
    },
    {
      id: "oq-ru-05",
      topic: "relacije-urejenosti",
      prompt: "Definiraj inverz in kompozicijo relacij ter pojasni kriterij \\(D_R=A\\) in \\(R^{-1}\\circ R=R\\) za ekvivalenčno relacijo.",
      answer: "Inverz je \\(xR^{-1}y\\iff yRx\\). Pri konvenciji \\(x(S\\circ R)z\\iff\\exists y(xRy\\land ySz)\\) kompozicija opisuje dva zaporedna koraka. Relacija na \\(A\\) je ekvivalenčna natanko tedaj, ko vsak element nastopa kot prvi člen nekega para in je \\(R^{-1}\\circ R=R\\). Pri ekvivalenci je \\(R^{-1}=R\\) zaradi simetričnosti in \\(R\\circ R=R\\) zaradi tranzitivnosti ter refleksivnosti. Obratna smer iz enakosti rekonstruira refleksivnost, simetričnost in tranzitivnost.",
      hint: "Pri ekvivalenčni relaciji se inverz ne spremeni, kompozicija dveh korakov pa ne doda novih parov.",
      rubric: ["definicija inverza", "jasna konvencija kompozicije", "izjava kriterija", "razlaga obeh enakosti"],
      difficulty: "težko",
      source: "MnozRel.pdf, Trditev 4.2",
      tags: ["kompozicija", "karakterizacija"]
    },

    {
      id: "oq-ir-06",
      topic: "izjavni-racun",
      prompt: "Kdaj je sklep \\(A_1,\\ldots,A_k\\models B\\) veljaven? Navedi veljaven in neveljaven zgled ter oba popolnoma utemelji.",
      answer: "Sklep je veljaven natanko tedaj, ko je \\((A_1\\land\\cdots\\land A_k)\\Rightarrow B\\) tavtologija; ekvivalentno ne obstaja določilo, pri katerem so vse premise resnične, zaključek pa napačen. Veljaven zgled je \\(p,p\\Rightarrow q\\models q\\): pri resničnih premisah modus ponens prisili \\(q=1\\). Neveljaven zgled je \\(p\\Rightarrow q,q\\models p\\). Določilo \\(p=0,q=1\\) naredi obe premisi resnični, zaključek \\(p\\) pa napačen, zato je to popoln protiprimer.",
      hint: "Definicija zahteva kvantifikacijo čez vsa določila; neveljavnost dokaže ena sama prava vrstica.",
      rubric: ["pripadajoča implikacija", "semantična razlaga", "veljaven zgled z razlogom", "neveljaven zgled s konkretnim določilom"],
      difficulty: "srednje",
      source: "teoreticni_izpit_adm.pdf, 1. teorijski izpit",
      tags: ["teorijski izpit", "veljavnost", "protiprimer"]
    },
    {
      id: "oq-ir-07",
      topic: "izjavni-racun",
      prompt: "Presodi tavtološkost formul \\((p\\land q)\\Rightarrow(p\\lor q)\\), \\(\\neg(p\\Rightarrow q)\\Leftrightarrow(\\neg p\\Rightarrow\\neg q)\\) in \\((p\\land(p\\Rightarrow q))\\Leftrightarrow q\\). Vsako presojo dokaži ali ovrzi s konkretnim določilom.",
      answer: "Prva formula je tavtologija: resničnost \\(p\\land q\\) že zagotovi \\(p\\lor q\\), pri napačnem antecedentu pa je implikacija resnična. Druga ni tavtologija: pri \\(p=0,q=0\\) ima leva stran ekvivalence vrednost 0, desna 1. Tretja ni tavtologija: pri \\(p=0,q=1\\) je \\(p\\land(p\\Rightarrow q)=0\\), medtem ko je \\(q=1\\).",
      hint: "Za netavtologijo zadostuje eno določilo z vrednostjo 0.",
      rubric: ["prva formula pravilno označena", "splošni dokaz prve", "pravilen protiprimer druge", "pravilen protiprimer tretje"],
      difficulty: "srednje",
      source: "teoreticni_izpit_adm.pdf, 2. teorijski izpit",
      tags: ["teorijski izpit", "tavtologija"]
    },
    {
      id: "oq-ir-09",
      topic: "izjavni-racun",
      prompt: "Kaj pomeni poln nabor logičnih operacij? Dokaži, da sta \\(\\{\\downarrow\\}\\) in \\(\\{\\uparrow\\}\\) polna.",
      answer: "Nabor veznikov je poln, če lahko z njim izrazimo vsako resničnostno funkcijo oziroma vsak izjavni izraz. Normalne oblike pokažejo polnost \\(\\{\\neg,\\land,\\lor\\}\\). Za NOR velja \\(\\neg A\\equiv A\\downarrow A\\) in \\(A\\lor B\\equiv(A\\downarrow B)\\downarrow(A\\downarrow B)\\), zato dobimo negacijo in disjunkcijo, z De Morganom pa tudi konjunkcijo. Za NAND velja \\(\\neg A\\equiv A\\uparrow A\\) in \\(A\\land B\\equiv(A\\uparrow B)\\uparrow(A\\uparrow B)\\); od tod dobimo vse tri osnovne veznike. Zato je vsak posamezni nabor poln.",
      hint: "Z enim veznikom najprej zgradi negacijo in nato še konjunkcijo ali disjunkcijo.",
      rubric: ["definicija polnosti", "izraza za NOR", "izraza za NAND", "povezava z normalnimi oblikami"],
      difficulty: "težko",
      source: "IzjavniRacun.pdf, razdelek 1.6",
      tags: ["polnost", "NOR", "NAND"]
    },

    {
      id: "oq-pr-06",
      topic: "predikatni-racun",
      prompt: "Naj bo področje pogovora množica vseh premic v ravnini. \\(P(x,y)\\) naj pomeni »premica \\(x\\) je pravokotna na premico \\(y\\)«, \\(Q(x,y)\\) pa »premica \\(x\\) je vzporedna premici \\(y\\)«. S kvantifikatorji formaliziraj vse štiri izjave: vsaka premica je vzporedna sama sebi; nobena premica ni pravokotna sama nase; vsaka premica ima vsaj eno pravokotnico; če je neka premica pravokotna na dve premici, sta ti dve premici vzporedni.",
      answer: "Vsaka premica je vzporedna sama sebi: \\(\\forall xQ(x,x)\\). Nobena ni pravokotna sama nase: \\(\\forall x\\neg P(x,x)\\). Vsaka premica ima pravokotnico: \\(\\forall x\\exists yP(x,y)\\). Če je neka premica pravokotna na drugi dve, sta slednji vzporedni: \\(\\forall x\\forall y\\forall z((P(x,y)\\land P(x,z))\\Rightarrow Q(y,z))\\).",
      hint: "V zadnji izjavi je \\(x\\) skupna pravokotnica, \\(y,z\\) sta primerjani premici.",
      rubric: ["refleksivnost Q", "irefleksivnost P", "pravilen vrstni red za obstoj pravokotnice", "tri univerzalni kvantifikatorji in implikacija"],
      difficulty: "srednje",
      source: "IzpitTeorija2021.pdf, 1. vprašanje",
      tags: ["teorijski izpit", "prevod", "kvantifikatorji"]
    },
    {
      id: "oq-pr-07",
      topic: "predikatni-racun",
      prompt: "Naj bo \\(P\\) poljuben dvomestni predikat na nepraznem področju pogovora. Presodi, ali obstajata resnična in neresnična interpretacija formule \\(\\forall x\\exists y(P(y,x)\\Rightarrow P(x,y))\\). Če katera ne obstaja, to dokaži; sicer podaj popoln model.",
      answer: "Ne. Formula je splošno veljavna na vsakem nepraznem področju pogovora. Za poljuben \\(x\\) izberemo \\(y=x\\); jedro postane \\(P(x,x)\\Rightarrow P(x,x)\\), ki je vedno resnično. Zato lahko navedemo poljubno resnično interpretacijo, neresnična pa ne obstaja. Da bi bila zahteva po obeh vrstah interpretacij smiselna, bi morali dodati nov pogoj, na primer \\(y\\ne x\\).",
      hint: "Poskusi za eksistenčno pričo izbrati kar prvo spremenljivko.",
      rubric: ["ugotovitev splošne veljavnosti", "izbira y=x", "tavtološko jedro", "jasna ugotovitev o natisnjeni zahtevi"],
      difficulty: "težko",
      source: "teoreticni_izpit_adm.pdf, zadnji teorijski izpit",
      tags: ["teorijski izpit", "interpretacija", "kontrola vira"]
    },
    {
      id: "oq-pr-08",
      topic: "predikatni-racun",
      prompt: "Definiraj splošno veljavnost predikatne formule in razloži, kako jo ovržemo. Ovrzi \\(\\forall x\\forall y(P(x,y)\\Rightarrow P(y,x))\\).",
      answer: "Formula je splošno veljavna, če pri vsaki izbiri nepraznega področja pogovora in vsaki razlagi njenih predikatov preide v resnično izjavo. Za ovržbo zadostuje ena celotna interpretacija in vrednosti, ki jo naredijo napačno. Vzemimo področje \\(\\mathbb N\\) in \\(P(x,y)\\) naj pomeni \\(x\\le y\\). Za \\(x=2,y=3\\) velja \\(P(2,3)\\), ne pa \\(P(3,2)\\); implikacija je napačna, zato formula ni splošno veljavna.",
      hint: "Išči nesimetrično relacijo.",
      rubric: ["kvantifikacija čez vse interpretacije", "celoten protiprimer", "konkretna elementa", "napačna implikacija"],
      difficulty: "srednje",
      source: "ADM-Predikati.pdf, razdelek 2.5",
      tags: ["splošna veljavnost", "protiprimer"]
    },

    {
      id: "oq-mp-06",
      topic: "mnozice-preslikave",
      prompt: "Naj bodo \\(A,B,C\\subseteq U\\). Natančno zapiši komutativnost, asociativnost in idempotentnost unije in preseka; zakone z \\(\\varnothing\\) in \\(U\\); obe absorpciji in obe distributivnosti; zakone komplementa in oba De Morganova zakona; ter zvezi za razliko in simetrično razliko. Nato na enem izbranem zakonu pokaži elementno metodo dokazovanja enakosti množic in s protiprimerom pojasni, zakaj iz \\(A\\cup B=A\\cup C\\) ne smemo sklepati \\(B=C\\).",
      answer: H`Za \(A,B,C\subseteq U\) veljajo:
      <p><strong>Komutativnost:</strong> \(A\cup B=B\cup A\), \(A\cap B=B\cap A\).</p>
      <p><strong>Asociativnost:</strong> \((A\cup B)\cup C=A\cup(B\cup C)\), \((A\cap B)\cap C=A\cap(B\cap C)\).</p>
      <p><strong>Idempotentnost:</strong> \(A\cup A=A\), \(A\cap A=A\).</p>
      <p><strong>Zakoni z \(\varnothing\) in \(U\):</strong> \(A\cup\varnothing=A\), \(A\cap U=A\), \(A\cap\varnothing=\varnothing\), \(A\cup U=U\).</p>
      <p><strong>Absorpcija:</strong> \(A\cup(A\cap B)=A\), \(A\cap(A\cup B)=A\).</p>
      <p><strong>Distributivnost:</strong> \(A\cap(B\cup C)=(A\cap B)\cup(A\cap C)\), \(A\cup(B\cap C)=(A\cup B)\cap(A\cup C)\).</p>
      <p><strong>Komplement:</strong> \(A\cup A^c=U\), \(A\cap A^c=\varnothing\), \((A^c)^c=A\), \(U^c=\varnothing\), \(\varnothing^c=U\).</p>
      <p><strong>De Morgan:</strong> \((A\cup B)^c=A^c\cap B^c\), \((A\cap B)^c=A^c\cup B^c\).</p>
      <p><strong>Razliki:</strong> \(A\setminus B=A\cap B^c\), \(A\triangle B=(A\cup B)\setminus(A\cap B)\).</p>
      <p>Enakost množic dokazujemo elementno. Na primer za prvi De Morganov zakon in poljuben \(x\in U\):</p>
      \[x\in(A\cup B)^c\iff x\notin A\cup B\iff(x\notin A\land x\notin B)\iff x\in A^c\cap B^c.\]
      <p>Ker enakovrednost velja za vsak \(x\), sta množici enaki. Krajšanje pri uniji ni dovoljeno: za \(A=\{1,2\}\), \(B=\{1\}\), \(C=\{2\}\) velja \(A\cup B=A=A\cup C\), vendar \(B\ne C\).</p>`,
      hint: "Skupine zakonov: K-A-D, De Morgan, absorpcija, idempotentnost, prazna množica.",
      rubric: ["komutativnost, asociativnost in idempotentnost", "zakoni z ∅ in U ter absorpciji", "obe distributivnosti", "komplement in oba De Morganova zakona", "razlika in simetrična razlika", "elementni dokaz in protiprimer krajšanju"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 3.2",
      tags: ["zakoni množic", "elementni dokaz"]
    },
    {
      id: "oq-mp-07",
      topic: "mnozice-preslikave",
      prompt: "Podaj rekurzivno definicijo naravnih števil iz množic ter obe definiciji končne oziroma neskončne množice.",
      answer: "Postavimo \\(0=\\varnothing\\) in naslednika \\(n^+=n\\cup\\{n\\}\\). Osnovno pravilo pravi, da je \\(\\varnothing\\) naravno število, nasledniško pa, da je z vsakim naravnim \\(n\\) naraven tudi \\(n^+\\). Množica \\(X\\) je končna, če je bijektivna z nekim naravnim številom \\(n\\), sicer neskončna. Po Dedekindu je neskončna, če je bijektivna s kako svojo pravo podmnožico; zapiski poudarijo, da sta definiciji ekvivalentni.",
      hint: "Osnova, naslednik, bijekcija z n, bijekcija s pravo podmnožico.",
      rubric: ["0 kot prazna množica", "naslednik", "definicija končnosti", "Dedekindova definicija"],
      difficulty: "srednje",
      source: "MnozRel.pdf, Definiciji 3.2–3.3",
      tags: ["rekurzija", "neskončnost"]
    },
    {
      id: "oq-mp-08",
      topic: "mnozice-preslikave",
      prompt: "Dokaži Cantorjev izrek, da nobena množica ni enako močna svoji potenčni množici.",
      answer: "Predpostavimo, da obstaja surjekcija \\(f:X\\to\\mathcal P(X)\\), in definirajmo diagonalno množico \\(D=\\{x\\in X:x\\notin f(x)\\}\\). Zaradi surjektivnosti obstaja \\(d\\in X\\) s \\(f(d)=D\\). Nato \\(d\\in D\\iff d\\notin f(d)\\iff d\\notin D\\), protislovje. Surjekcije ni; ker preslikava \\(x\\mapsto\\{x\\}\\) injicira \\(X\\) v \\(\\mathcal P(X)\\), ima potenčna množica strogo večjo moč.",
      hint: "Diagonalna množica vsebuje natanko tiste x, ki niso v lastni sliki.",
      rubric: ["predpostavljena surjekcija", "definicija D", "uporaba surjektivnosti", "protislovje in sklep o moči"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 3.7",
      tags: ["Cantor", "diagonalni dokaz"]
    },
    {
      id: "oq-mp-09",
      topic: "mnozice-preslikave",
      prompt: "Dokaži naslednje tri identitete: \\(\\bigcap_{n\\ge1}[0,1/n)=\\{0\\}\\), \\(\\bigcap_{n\\ge1}(0,1/n]=\\varnothing\\) in \\(\\bigcup_{n\\ge1}[1/n,1]=(0,1]\\). Pri vsaki utemelji obe vsebovanosti oziroma pojasni, zakaj noben kandidat ne more ostati v preseku.",
      answer: "V prvem preseku je 0 v vsakem členu; vsak \\(x>0\\) pa pri dovolj velikem \\(n\\) preseže \\(1/n\\), negativni x pa niso v intervalih. V drugem preseku 0 ni dovoljen, vsak pozitiven kandidat pa spet odpove za dovolj velik n, zato je prazen. Pri uniji je vsak člen v \\((0,1]\\). Če je \\(0<x\\le1\\), izberemo \\(n\\ge1/x\\), tedaj \\(1/n\\le x\\), zato x leži v nekem členu. To dokaže enakost v obe smeri.",
      hint: "Uporabi dejstvo, da lahko 1/n naredimo manjši od poljubnega pozitivnega x.",
      rubric: ["prvi presek", "drugi presek", "obe vsebovanosti pri uniji", "pravilen argument z dovolj velikim n"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelka 3.3–3.4",
      tags: ["intervali", "družine množic"]
    },

    {
      id: "oq-ru-06",
      topic: "relacije-urejenosti",
      prompt: "Definiraj irefleksivnost in asimetričnost ter dokaži, da je vsaka asimetrična relacija irefleksivna.",
      answer: "Irefleksivnost pomeni \\(\\forall x\\in A\\,\\neg xRx\\). Asimetričnost pomeni \\(\\forall x,y\\in A(xRy\\Rightarrow\\neg yRx)\\). Naj bo R asimetrična in x poljuben. Če bi veljalo xRx, bi asimetričnost pri y=x dala iz xRx tudi \\(\\neg xRx\\), protislovje. Zato xRx ne velja za noben x in R je irefleksivna.",
      hint: "V definicijo asimetričnosti vstavi y=x.",
      rubric: ["definicija irefleksivnosti", "definicija asimetričnosti", "izbira y=x", "protislovje in univerzalni sklep"],
      difficulty: "srednje",
      source: "IzpitTeorija_20-21.pdf, 1. vprašanje",
      tags: ["teorijski izpit", "asimetričnost", "dokaz"]
    },
    {
      id: "oq-ru-07",
      topic: "relacije-urejenosti",
      prompt: "Naj bo \\(R\\subseteq A\\times A\\). Formalno definiraj refleksivnost, irefleksivnost, simetričnost, asimetričnost, antisimetričnost, tranzitivnost, sovisnost in strogo sovisnost. Za vsako lastnost nato povej, kako jo prepoznamo v usmerjenem grafu relacije.",
      answer: "Refleksivna: \\(\\forall x xRx\\), zanka povsod. Irefleksivna: \\(\\forall x\\neg xRx\\), brez zank. Simetrična: \\(xRy\\Rightarrow yRx\\), vsak lok ima obratnega. Asimetrična: \\(xRy\\Rightarrow\\neg yRx\\), noben lok nima obratnega in ni zank. Antisimetrična: \\(xRy\\land yRx\\Rightarrow x=y\\), med različnima ni dvosmernega para. Tranzitivna: \\(xRy\\land yRz\\Rightarrow xRz\\), vsak dvokorak ima bližnjico. Sovisna: za \\(x\\ne y\\) velja \\(xRy\\lor yRx\\). Strogo sovisna: za vse x,y velja isti pogoj, zato so tudi vse zanke.",
      hint: "Osem pojmov razdeli na zanke, obračanje lokov, bližnjice in primerljivost.",
      rubric: ["refleksivna/irefleksivna", "tri simetrije", "tranzitivna", "obe sovisnosti", "grafični pomeni"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 4.1",
      tags: ["definicije", "graf relacije"]
    },
    {
      id: "oq-ru-08",
      topic: "relacije-urejenosti",
      prompt: "Dokaži karakterizacijo: R je asimetrična natanko tedaj, ko je irefleksivna in antisimetrična. Nato pokaži, da simetričnost ne implicira tranzitivnosti.",
      answer: "Če je R asimetrična, je irefleksivna po dokazu z y=x. Če bi veljala xRy in yRx, bi asimetričnost dala negacijo yRx, zato je R tudi antisimetrična. Obratno naj bo R irefleksivna in antisimetrična ter naj velja xRy. Če bi veljalo yRx, bi antisimetričnost dala x=y, s tem xRx, kar nasprotuje irefleksivnosti; zato ne velja yRx in R je asimetrična. Za zadnji del na A={1,2} vzemi \\(R=\\{(1,2),(2,1)\\}\\). Je simetrična, ni tranzitivna, saj iz 1R2 in 2R1 ne sledi manjkajoči 1R1.",
      hint: "Za obrat uporabi antisimetričnost, nato irefleksivnost. Za protiprimer vzemi dvosmerni par brez zank.",
      rubric: ["asimetrična daje obe lastnosti", "dokaz obrata", "konkretna relacija", "jasna kršitev tranzitivnosti"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 4.1; IzpitTeorija_20-21.pdf",
      tags: ["implikacije", "protiprimer"]
    },
    {
      id: "oq-ru-09",
      topic: "relacije-urejenosti",
      prompt: "Dokaži, da je vsaka strogo sovisna relacija refleksivna. Nato iz tega izpelji, da je vsaka linearna urejenost tudi delna urejenost in da je vsaka stroga linearna urejenost tudi stroga delna urejenost.",
      answer: "Če je R strogo sovisna, za vsaka x,y velja xRy ali yRx. Pri y=x dobimo xRx ali xRx, torej xRx; R je refleksivna. Linearna urejenost je po definiciji tranzitivna, antisimetrična in strogo sovisna; zadnja lastnost da refleksivnost, zato izpolni definicijo delne urejenosti. Stroga linearna urejenost je tranzitivna, asimetrična in sovisna, zato z opustitvijo dodatne sovisnosti ostane stroga delna urejenost.",
      hint: "Za refleksivnost v strogo sovisnost vstavi enaka elementa.",
      rubric: ["izbira y=x", "refleksivnost", "linearna ⇒ delna", "stroga linearna ⇒ stroga delna"],
      difficulty: "srednje",
      source: "MnozRel.pdf, Trditev 4.6",
      tags: ["sovisnost", "urejenosti", "dokaz"]
    },
    {
      id: "oq-ru-10",
      topic: "relacije-urejenosti",
      prompt: "Razvrsti lastnosti relacij \\(<\\) in \\(\\le\\) na \\(\\mathbb R\\), kongruence modulo \\(m\\ge2\\) na \\(\\mathbb Z\\) ter \\(\\subseteq\\) na \\(\\mathcal P(A)\\), kjer \\(|A|\\ge2\\). Vsako sporno lastnost utemelji.",
      answer: "Relacija < na \\(\\mathbb R\\) je irefleksivna, asimetrična, antisimetrična, tranzitivna in sovisna; ni refleksivna, simetrična ali strogo sovisna. Relacija ≤ na \\(\\mathbb R\\) je refleksivna, antisimetrična, tranzitivna, sovisna in strogo sovisna; ni irefleksivna, simetrična ali asimetrična. Kongruenca modulo \\(m\\ge2\\) na \\(\\mathbb Z\\) je refleksivna, simetrična in tranzitivna; ni irefleksivna ali asimetrična zaradi zank, ni antisimetrična, ker \\(0\\equiv m\\pmod m\\), čeprav \\(0\\ne m\\), ter ni sovisna niti strogo sovisna, ker različna ostanka nista primerljiva. Vsebovanost na \\(\\mathcal P(A)\\), \\(|A|\\ge2\\), je refleksivna, antisimetrična in tranzitivna; ni irefleksivna ali asimetrična zaradi zank, ni simetrična, ker na primer \\(\\varnothing\\subseteq\\{a\\}\\), ne pa obratno, ter ni sovisna niti strogo sovisna, saj sta \\(\\{a\\}\\) in \\(\\{b\\}\\) za \\(a\\ne b\\) neprimerljivi.",
      hint: "Za antisimetričnost < antecedent nikoli ne more veljati; to je vakuozna resničnost.",
      rubric: ["popolna razvrstitev <", "popolna razvrstitev ≤", "kongruenca s protiprimeroma", "vsebovanost z neprimerljivim parom"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 4.1",
      tags: ["klasifikacija", "primeri"]
    },
    {
      id: "oq-ru-11",
      topic: "relacije-urejenosti",
      prompt: "Definiraj n-mestno relacijo, graf dvomestne relacije, domeno, zalogo vrednosti in polje relacije.",
      answer: "n-mestna relacija na A je podmnožica \\(A^n\\). Pri n=2 pišemo xRy namesto (x,y)∈R. Graf ima za vozlišča elemente A in lok x→y natanko tedaj, ko xRy; xRx prikažemo z zanko. Domena je \\(D_R=\\{x:\\exists y\\,xRy\\}\\), zaloga vrednosti \\(Z_R=\\{y:\\exists x\\,xRy\\}\\), polje pa \\(D_R\\cup Z_R\\). Vedno velja \\(R\\subseteq D_R\\times Z_R\\).",
      hint: "Domena gleda začetke lokov, zaloga njihove konce.",
      rubric: ["n-mestna relacija", "graf in zanka", "domena", "zaloga, polje in vključitev"],
      difficulty: "lahko",
      source: "MnozRel.pdf, Definicija 4.1 in str. 34",
      tags: ["relacija", "domena", "graf"]
    },

    {
      id: "oq-ir-10",
      topic: "izjavni-racun",
      prompt: H`Kako po indukciji definiramo pravilno zgrajene izjavne izraze? Na formuli \(\neg p\land(q\Rightarrow r)\) določi glavni veznik in pojasni, zakaj so oklepaji del sintakse.`,
      answer: H`Množico izjavnih izrazov definiramo induktivno. (1) Konstanti \(0,1\) in vsaka izjavna spremenljivka so izrazi. (2) Če sta \(A\) in \(B\) izraza, so izrazi tudi \(\neg A\), \((A\land B)\), \((A\lor B)\), \((A\Rightarrow B)\) in \((A\Leftrightarrow B)\). (3) Izrazov ni nič drugega kot zapisi, dobljeni s končno uporabo teh pravil. Pri popolnoma oklepajenem zapisu \((\neg p)\land(q\Rightarrow r)\) je glavni veznik \(\land\), neposredna podizraza pa sta \(\neg p\) in \(q\Rightarrow r\). Oklepaji določijo drevo gradnje in s tem vrstni red vrednotenja; brez dogovorjene prednosti bi lahko isti niz pomenil več formul. Na primer \((p\lor q)\land r\) in \(p\lor(q\land r)\) nista enakovredna: pri \(p=1,q=0,r=0\) ima prva vrednost 0, druga pa 1. Pogosta napaka je glavni veznik iskati kot prvi napisani znak; glavni je zadnji uporabljeni konstrukcijski veznik.`,
      hint: H`Formulo si predstavljaj kot drevo: koren je glavni veznik, njegovi otroci pa neposredni podizrazi.`,
      rubric: ["induktivna osnova", "induktivni korak in zaključna klavzula", "glavni veznik ter podizraza", "vloga oklepajev s protiprimerom"],
      difficulty: "srednje",
      source: "IzjavniRacun.pdf, razdelka 1.1–1.2",
      tags: ["sintaksa", "induktivna definicija", "glavni veznik"]
    },
    {
      id: "oq-ir-11",
      topic: "izjavni-racun",
      prompt: H`Definiraj tavtologijo, protislovje, izpolnjiv in kontingenten izraz ter logično enakovrednost. Navedi zveze med temi pojmi in ločevalne primere.`,
      answer: H`Izraz je tavtologija, če ima pri vsakem določilu vrednost 1, protislovje, če ima pri vsakem določilu vrednost 0, izpolnjiv, če je resničen pri vsaj enem določilu, ter kontingenten, če je pri nekem določilu resničen in pri drugem napačen. Izraza \(A,B\) sta logično enakovredna, zapis \(A\equiv B\), če imata pri vsakem določilu enako vrednost; ekvivalentno je \(A\Leftrightarrow B\) tavtologija. Nadalje je \(A\) tavtologija natanko tedaj, ko je \(\neg A\) protislovje, in \(A\) je izpolnjiv natanko tedaj, ko \(\neg A\) ni tavtologija. Primer tavtologije je \(p\lor\neg p\), protislovja \(p\land\neg p\), kontingentnega izraza pa \(p\Rightarrow q\). Izpolnjiv ne pomeni tavtološki: \(p\) je izpolnjiv, vendar je pri \(p=0\) napačen. Tudi dva izpolnjiva izraza nimata nujno izpolnjive konjunkcije: \(p\) in \(\neg p\) sta vsak zase izpolnjiva, \(p\land\neg p\) pa ne.`,
      hint: H`Pri vsakem pojmu povej, ali kvantificira čez vsa določila ali zahteva samo obstoj enega.`,
      rubric: ["vseh pet definicij", "kriterij A↔B", "zveze z negacijo", "primeri in protiprimer napačni implikaciji"],
      difficulty: "srednje",
      source: "IzjavniRacun.pdf, razdelka 1.3–1.4",
      tags: ["semantika", "tavtologija", "izpolnjivost"]
    },
    {
      id: "oq-ir-12",
      topic: "izjavni-racun",
      prompt: H`Odpravi implikacijo in ekvivalenco ter primerjaj obrat, inverz in kontrapozicijo implikacije. Katere formule so enakovredne?`,
      answer: H`Osnovni enakovrednosti sta \(A\Rightarrow B\equiv\neg A\lor B\) in \(A\Leftrightarrow B\equiv(A\Rightarrow B)\land(B\Rightarrow A)\equiv(A\land B)\lor(\neg A\land\neg B)\). Za prvotno implikacijo \(A\Rightarrow B\) je obrat \(B\Rightarrow A\), inverz \(\neg A\Rightarrow\neg B\), kontrapozicija pa \(\neg B\Rightarrow\neg A\). Prvotna implikacija je enakovredna kontrapoziciji, obrat pa inverzu; med tema paroma na splošno ni enakovrednosti. Dokaz prve zveze: \(\neg B\Rightarrow\neg A\equiv B\lor\neg A\equiv\neg A\lor B\equiv A\Rightarrow B\). Protiprimer zamenjavi z obratom: naj \(A\) pomeni »število je deljivo s 4«, \(B\) pa »število je sodo«. \(A\Rightarrow B\) velja, \(B\Rightarrow A\) pa ne, saj je 2 sodo in ni deljivo s 4. Pri sklepanju je zato modus tollens uporaba kontrapozicije, potrjevanje posledice pa neupravičena uporaba obrata.`,
      hint: H`Vse štiri formule prepiši z \(\neg X\lor Y\) in primerjaj.`,
      rubric: ["odprava obeh veznikov", "štiri pravilno poimenovane oblike", "dva para enakovrednosti z dokazom", "konkreten protiprimer obratu"],
      difficulty: "srednje",
      source: "IzjavniRacun.pdf, razdelek 1.4",
      tags: ["implikacija", "kontrapozicija", "enakovrednosti"]
    },
    {
      id: "oq-ir-13",
      topic: "izjavni-racun",
      prompt: H`Opiši celoten algoritem za izbrano DNO in KNO iz resničnostne tabele. Kako obravnavaš tavtologijo in protislovje ter katera pogosta zamenjava uniči rešitev?`,
      answer: H`Najprej fiksiramo vrstni red spremenljivk in zapišemo vseh \(2^n\) določil. Za izbrano DNO pri vsaki vrstici z vrednostjo 1 sestavimo minterm: spremenljivko vzamemo pozitivno pri 1 in negirano pri 0, literale pa povežemo z \(\land\). Vse minterme povežemo z \(\lor\). Minterm je resničen natanko v svoji vrstici, zato je dobljena DNO enakovredna izrazu. Za izbrano KNO uporabimo vrstice z vrednostjo 0. V maxtermu vzamemo spremenljivko negirano pri 1 in pozitivno pri 0, literale povežemo z \(\lor\), maxterme pa z \(\land\). Maxterm je napačen natanko v svoji vrstici. Tavtologija nima ničelnih vrstic, zato običajna konstrukcija KNO nima člena; predstavljamo jo s konstanto 1. Protislovje nima eničnih vrstic, zato njegovo DNO predstavlja konstanta 0. Lahko pa tavtologiji zgradimo DNO in protislovju KNO. Najpogostejša napaka je uporabiti enako pravilo za literale pri mintermu in maxtermu: pri KNO so predznaki namerno obrnjeni.`,
      hint: H`Minterm prepozna eno vrstico z 1; maxterm izključi eno vrstico z 0.`,
      rubric: ["vse vrstice in vrstni red", "pravilo DNO z dokazom", "pravilo KNO z dokazom", "oba robna primera in opozorilo"],
      difficulty: "težko",
      source: "IzjavniRacun.pdf, razdelek 1.5",
      tags: ["DNO", "KNO", "algoritem", "robni primer"]
    },
    {
      id: "oq-ir-14",
      topic: "izjavni-racun",
      prompt: H`Kaj je formalni dokaz iz premis in zakaj zaporedje veljavnih korakov zagotovi semantično veljaven sklep? Dodaj primer napačnega koraka.`,
      answer: H`Formalni dokaz zaključka \(B\) iz premis \(A_1,\ldots,A_n\) je končno zaporedje formul, v katerem je vsaka vrstica premisa, tavtologija oziroma dovoljena aksiomska formula ali pa sledi iz prejšnjih vrstic po veljavnem pravilu sklepanja; zadnja vrstica je \(B\). Pravilnost metode je indukcija po vrsticah. Vzemimo poljubno določilo, pri katerem so vse premise resnične. Začetne premise so tedaj resnične. Tavtologija je resnična pri vsakem določilu. Ker vsako uporabljeno pravilo ohranja resničnost od svojih premis do zaključka, je resnična tudi vsaka naslednja vrstica. Zato je resničen \(B\), kadar so resnične vse premise, in sklep je semantično veljaven. To je ideja zvočnosti formalnega dokazovanja. Napačen korak je potrjevanje posledice: iz \(p\Rightarrow q\) in \(q\) sklepati \(p\). Pri \(p=0,q=1\) sta obe zapisani premisi resnični, domnevni zaključek pa napačen, zato takšno »pravilo« ne ohranja resničnosti in ne sme nastopiti v dokazu.`,
      hint: H`Fiksiraj določilo z resničnimi premisami in naredi indukcijo po vrsticah dokaza.`,
      rubric: ["definicija vrstic formalnega dokaza", "indukcija po vrsticah", "sklep o semantični veljavnosti", "neveljavno pravilo s pravim določilom"],
      difficulty: "težko",
      source: "IzjavniRacun.pdf, razdelka 1.7–1.8",
      tags: ["formalni dokaz", "zvočnost", "protiprimer"]
    },

    {
      id: "oq-pr-09",
      topic: "predikatni-racun",
      prompt: H`Razloži razliko med jezikom, termom, predikatskim simbolom, atomsko formulo, odprto in zaprto formulo ter interpretacijo. Sestavi lasten pravilen in napačen zapis, nato pa isto zaprto formulo interpretiraj enkrat kot resnično in enkrat kot neresnično.`,
      answer: H`Jezik določi konstante, funkcijske simbole in predikatske simbole z njihovimi mestnostmi; logični del vsebuje veznike, kvantifikatorja, spremenljivke in navadno enakost. <strong>Term</strong> poimenuje objekt: \(x\), \(c\) in \(f(x,c)\) so termi v ustreznem jeziku. \(k\)-mestni predikatski simbol iz \(k\) termov sestavi <strong>atomsko formulo</strong>, na primer \(R(f(x),c)\); iz atomov z vezniki in kvantifikatorji gradimo formule. Zapis \(R(x,c)\land P(f(x))\) je pravilen, če sta \(R\) dvomesten in \(P\) enomesten, \(R(x)\) pa je napačen zaradi napačne mestnosti. Formula je odprta, če ima prosto spremenljivko, in zaprta, če so vse pojavitve vezane; šele zaprta formula dobi v dani interpretaciji vrednost brez dodatne prireditve spremenljivkam. Interpretacija izbere neprazen univerzum \(U\), konstantam priredi elemente, funkcijskim simbolom funkcije in predikatom relacije ustreznih mestnosti. Za \(F=\forall xP(x)\) dobimo resnično interpretacijo na \(U=\mathbb N\), če \(P(x)\) pomeni \(x=x\), ter neresnično, če pomeni \(x<0\); protiprimer je \(x=0\). Isti sintaktični zapis torej nima stalne vrednosti, dokler ne določimo pomena nelogičnih simbolov. Pogosti napaki sta zamenjava predikatskega simbola z njegovo interpretacijo ter presojanje odprte formule brez prireditve prostim spremenljivkam.`,
      hint: H`Najprej razvrsti zapise na »poimenuje objekt« in »trdi nekaj o objektih«, nato loči sintakso od izbranega pomena simbolov.`,
      rubric: ["jezik, term, predikat in atom", "odprta ter zaprta formula", "pravilen in nepravilen zapis", "popolni nasprotni interpretaciji"],
      difficulty: "srednje",
      source: "ADM-Predikati.pdf, razdelka 2.1–2.2",
      tags: ["jezik", "interpretacija", "semantika"]
    },
    {
      id: "oq-pr-10",
      topic: "predikatni-racun",
      prompt: H`Določi proste in vezane pojavitve spremenljivk v \(P(x)\lor\exists x(Q(x,y)\land\forall yR(x,y,z))\). Kdaj je preimenovanje vezane spremenljivke varno?`,
      answer: H`V levem atomu \(P(x)\) je pojavitev \(x\) prosta, ker ni v dosegu nobenega kvantifikatorja. V desnem delu \(\exists x(\cdots)\) so pojavitve \(x\) v \(Q(x,y)\) in \(R(x,y,z)\) vezane z \(\exists x\). Pojavitev \(y\) v \(Q(x,y)\) je prosta, pojavitev \(y\) v \(R(x,y,z)\) pa vezana z notranjim \(\forall y\). Spremenljivka \(z\) je prosta. Množica prostih spremenljivk celotne formule je zato \(\{x,y,z\}\); isto ime je lahko v različnih pojavitvah prosto in vezano. Vezano spremenljivko smemo dosledno preimenovati v sveže ime, ki se v njenem dosegu ne pojavlja prosto: \(\forall yR(x,y,z)\) lahko prepišemo v \(\forall tR(x,t,z)\). Ne smemo pa zunanjega \(\exists x\) preimenovati v \(y\), ker bi s tem prosto pojavitev \(y\) v \(Q(x,y)\) ujeli pod kvantifikator in spremenili pomen. Temu pravimo ujetje spremenljivke.`,
      hint: H`Vsako pojavitev obravnavaj posebej in preveri, kateri kvantifikator jo dejansko doseže.`,
      rubric: ["vse pojavitve x", "obe različni pojavitvi y", "prosti z in množica prostih spremenljivk", "pogoj svežega imena ter ujetje"],
      difficulty: "težko",
      source: "ADM-Predikati.pdf, razdelek 2.2",
      tags: ["proste spremenljivke", "doseg", "preimenovanje"]
    },
    {
      id: "oq-pr-11",
      topic: "predikatni-racun",
      prompt: H`Pojasni dokazovanje in ovračanje formul oblik \(\forall xP(x)\), \(\exists xP(x)\), \(\forall x\exists yR(x,y)\) in \(\exists x\forall yR(x,y)\).`,
      answer: H`Za dokaz \(\forall xP(x)\) vzamemo poljuben \(x\in U\) in brez posebne izbire dokažemo \(P(x)\); ovržemo jo z enim \(a\in U\), za katerega \(P(a)\) ne velja. Za dokaz \(\exists xP(x)\) navedemo konkretno pričo \(a\) in preverimo \(P(a)\); za ovržbo dokažemo \(\forall x\neg P(x)\), zato ni dovolj pokazati, da en kandidat ne deluje. Pri \(\forall x\exists yR(x,y)\) začnemo s poljubnim \(x\), nato smemo pričo \(y\) izbrati odvisno od njega; na \(\mathbb N\) za \(y>x\) vzamemo \(y=x+1\). Ovržba zahteva en \(x_0\), za katerega odpove vsak \(y\): \(\exists x\forall y\neg R(x,y)\). Pri \(\exists x\forall yR(x,y)\) mora obstajati en sam \(x_0\), ki deluje za vse \(y\). Ovržemo jo tako, da za vsak predlagani \(x\) najdemo nasprotni \(y\): \(\forall x\exists y\neg R(x,y)\). Ključna past je zamenjati eno univerzalno pričo z družino prič.`,
      hint: H`Negacija celotne formule ti natančno pove, kakšen mora biti protiprimer.`,
      rubric: ["univerzalna formula", "eksistenčna formula", "odvisna priča pri ∀∃", "ena priča pri ∃∀ in pravilni negaciji"],
      difficulty: "srednje",
      source: "ADM-Predikati.pdf, razdelka 2.2–2.4",
      tags: ["dokazovanje", "priča", "protiprimer", "kvantifikatorji"]
    },
    {
      id: "oq-pr-12",
      topic: "predikatni-racun",
      prompt: H`Kdaj lahko kvantifikator prenesemo čez veznik, če spremenljivka v drugem členu ni prosta? Navedi pravilne enakovrednosti in pokaži, zakaj je pogoj nujen.`,
      answer: H`Če \(x\) v formuli \(Q\) ne nastopa prosto, lahko nespremenjeni člen izvlečemo iz dosega kvantifikatorja. Na nepraznem univerzumu veljajo na primer \(\forall x(P(x)\land Q)\equiv(\forall xP(x))\land Q\), \(\exists x(P(x)\lor Q)\equiv(\exists xP(x))\lor Q\), pa tudi \(\forall x(P(x)\lor Q)\equiv(\forall xP(x))\lor Q\) in \(\exists x(P(x)\land Q)\equiv(\exists xP(x))\land Q\). Razlog je, da vrednost \(Q\) ni odvisna od izbire \(x\): če je \(Q\) resnična oziroma napačna, se obe strani zmanjšata na isti preprost pogoj. Pogoj o prostih pojavitvah je nujen. Na \(U=\{1,2\}\), kjer \(P(x)\) pomeni \(x=1\), formula \(\forall x(P(x)\lor\neg P(x))\) velja. Zapis \((\forall xP(x))\lor\neg P(x)\) pa ima po prenosu še prosti \(x\) in pri vrednosti \(x=1\) postane napačen. Prenos je torej spremenil doseg in pomen.`,
      hint: H`Člen brez prostega x ima isto vrednost pri vseh izbirah x; člen s prostim x je od izbire odvisen.`,
      rubric: ["pogoj x ni prost", "štiri pravilne sheme", "pomenska utemeljitev", "protiprimer ob izpuščenem pogoju"],
      difficulty: "težko",
      source: "ADM-Predikati.pdf, razdelek 2.4",
      tags: ["doseg", "porazdelitev", "prosta spremenljivka"]
    },
    {
      id: "oq-pr-13",
      topic: "predikatni-racun",
      prompt: H`Razlikuj splošno veljavnost, izpolnjivost in logično posledico v predikatnem računu. Podaj primer, ki je izpolnjiv, vendar ni splošno veljaven.`,
      answer: H`Zaprta formula \(A\) je splošno veljavna, če je resnična v vsaki interpretaciji jezika; je izpolnjiva, če je resnična v vsaj eni interpretaciji. Množica premis \(\Gamma\) ima \(B\) za logično posledico, \(\Gamma\models B\), če v vsaki interpretaciji, v kateri so resnične vse premise iz \(\Gamma\), velja tudi \(B\). Torej je splošna veljavnost univerzalna zahteva čez modele, izpolnjivost eksistenčna, posledica pa prepoveduje model resničnih premis in napačnega zaključka. Formula \(\exists xP(x)\) je izpolnjiva: na \(U=\{a\}\) interpretiramo \(P(a)\) kot resnično. Ni splošno veljavna, saj na istem univerzumu lahko \(P\) interpretiramo kot prazno lastnost. Veljaven primer posledice je \(\forall x(P(x)\Rightarrow Q(x)),P(c)\models Q(c)\). Neveljavnost bi dokazali z eno interpretacijo, v kateri sta premisi resnični in zaključek napačen. Ne zadošča le drug univerzum brez natančne razlage predikatov in konstant.`,
      hint: H`Primerjaj kvantifikatorja »za vsako interpretacijo« in »obstaja interpretacija«.`,
      rubric: ["splošna veljavnost", "izpolnjivost", "logična posledica", "popoln model in protimodel"],
      difficulty: "srednje",
      source: "ADM-Predikati.pdf, razdelek 2.5",
      tags: ["veljavnost", "izpolnjivost", "model"]
    },
    {
      id: "oq-pr-14",
      topic: "predikatni-racun",
      prompt: H`Sestavi dve različni formalni izjavi o študentih in predmetih: (i) vsak študent opravlja vsaj en predmet; (ii) obstaja predmet, ki ga opravljajo vsi študenti. Nato podaj končen model, kjer je prva resnična in druga napačna.`,
      answer: H`Naj bo \(S(x)\) »\(x\) je študent«, \(P(y)\) »\(y\) je predmet« in \(O(x,y)\) »študent \(x\) opravlja predmet \(y\)«. Prva izjava je \(\forall x(S(x)\Rightarrow\exists y(P(y)\land O(x,y)))\). Druga je \(\exists y(P(y)\land\forall x(S(x)\Rightarrow O(x,y)))\). Nista enaki: v prvi je izbira predmeta lahko odvisna od študenta, v drugi mora isti predmet delovati za vse. Model: univerzum naj vsebuje študenta Ano in Boruta ter predmeta algebra in analiza. Naj Ana opravlja samo algebro, Borut pa samo analizo; \(S,P\) naj označujeta prav navedene elemente. Prva formula je resnična, ker ima Ana pričo algebra, Borut pa pričo analiza. Druga je napačna: algebra ne deluje za Boruta, analiza ne za Ano, drugih predmetov v modelu ni. Za obratni vzorec, kjer sta obe resnični, naj oba opravljata algebro. Popoln odgovor mora navesti univerzum, razlage vseh treh predikatov ter posebej preveriti vsak kvantifikator; zgolj risba puščic brez pomena simbolov ni celotna interpretacija.`,
      hint: H`Za prvo formulo sme biti priča \(y\) odvisna od \(x\); za drugo izberi \(y\) pred univerzalnim \(x\).`,
      rubric: ["prva pravilno omejena formula", "druga formula z obrnjenim vrstnim redom", "popoln končen model", "dokaz resničnosti prve in napačnosti druge"],
      difficulty: "težko",
      source: "ADM-Predikati.pdf, razdelka 2.3–2.4",
      tags: ["konstrukcija formule", "interpretacija", "resničen model", "napačen model"]
    },
    {
      id: "oq-pr-15",
      topic: "predikatni-racun",
      prompt: H`Za vsako od formul \(F=\forall x\exists y(P(x)\land\neg P(y))\) in \(G=\exists x\forall y\,R(x,y)\) konstruiraj eno resnično in eno neresnično interpretacijo ali pa dokaži, da taka zahteva ni izvedljiva.`,
      answer: H`Za \(F\) resnična interpretacija na nepraznem univerzumu ne obstaja. Če bi \(F\) veljala, bi za vsak \(x\) moral veljati \(P(x)\), saj je \(P(x)\) del konjunkcije. Hkrati bi za vsak \(x\) obstajal \(y\) z \(\neg P(y)\), kar nasprotuje \(\forall xP(x)\). Zato je \(F\) protislovna v vsaki neprazni interpretaciji. Neresnična interpretacija je na primer \(U=\{a\}\), \(P=\{a\}\): pri \(x=a\) ni priče \(y\) z \(\neg P(y)\). Pri \(G\) sta mogoči obe vrednosti. Resnični model: \(U=\{a,b\}\), \(R=\{(a,a),(a,b)\}\); priča \(x=a\) je v relaciji z vsakim \(y\). Neresnični model: na istem \(U\) vzamemo \(R=\{(a,a),(b,b)\}\). Kandidat \(a\) odpove pri \(y=b\), kandidat \(b\) pri \(y=a\), zato univerzalne priče ni. Naloga preverja tudi kritični pregled zahteve: kadar resnična interpretacija ne obstaja, je pravilen odgovor dokaz neizvedljivosti, ne izmišljeni model. Pri vsaki neresnični eksistencialni formuli moramo izločiti vse kandidate.`,
      hint: H`Pri \(F\) najprej poglej, kaj konjunkcija zahteva o \(P(x)\) za vsak \(x\); pri \(G\) za napačnost premagaj vsakega kandidata \(x\).`,
      rubric: ["dokaz neizpolnjivosti F", "konkretna napačna interpretacija F", "popoln resnični model G", "popoln neresnični model G z izločitvijo vseh prič"],
      difficulty: "težko",
      source: "ADM-Predikati.pdf, razdelka 2.2–2.5; teoreticni_izpit_adm.pdf, tip vprašanja o interpretacijah",
      tags: ["konstrukcija interpretacije", "izpolnjivost", "protimodel", "kontrola zahteve"]
    },

    {
      id: "oq-mp-10",
      topic: "mnozice-preslikave",
      prompt: H`Definiraj razliko, simetrično razliko in komplement množic. Dokaži \(A\triangle B=(A\cup B)\setminus(A\cap B)\) in opozori na vlogo univerzalne množice.`,
      answer: H`Razlika je \(A\setminus B=\{x:x\in A\land x\notin B\}\). Simetrična razlika vsebuje elemente, ki pripadajo natanko eni od množic: \(A\triangle B=(A\setminus B)\cup(B\setminus A)\). Če je vnaprej izbran univerzum \(U\), je komplement \(A^c=U\setminus A\); zato zapis \(A^c\) brez podatka o \(U\) ni popolnoma določen. Za zahtevano enakost vzamemo poljuben \(x\): \(x\in A\triangle B\) natanko tedaj, ko velja \((x\in A\land x\notin B)\lor(x\in B\land x\notin A)\). To je natanko pogoj, da je \(x\) v vsaj eni od \(A,B\), vendar ne v obeh, torej \(x\in A\cup B\) in \(x\notin A\cap B\). Zato \(x\in(A\cup B)\setminus(A\cap B)\), in vsi koraki so obrnljivi. Primer: za \(A=\{1,2\}\), \(B=\{2,3\}\) je \(A\triangle B=\{1,3\}\). Past: \(A\setminus B\) ni komutativna, medtem ko \(A\triangle B\) je.`,
      hint: H`Besedo »natanko ena« prevedi v dve izključujoči se možnosti.`,
      rubric: ["tri definicije", "vloga univerzuma", "elementna veriga v obe smeri", "primer in nekomutativnost razlike"],
      difficulty: "srednje",
      source: "MnozRel.pdf, razdelek 3.2",
      tags: ["razlika", "simetrična razlika", "komplement"]
    },
    {
      id: "oq-mp-11",
      topic: "mnozice-preslikave",
      prompt: H`Definiraj sliko in predsliko množice pri preslikavi ter dokaži njuno obnašanje glede na unijo in presek. Kje dobimo le vsebovanost?`,
      answer: H`Za \(f:A\to B\), \(X\subseteq A\) in \(Y\subseteq B\) sta \(f[X]=\{f(x):x\in X\}\) in \(f^{-1}[Y]=\{x\in A:f(x)\in Y\}\). Predslika vedno ohranja obe operaciji: \(f^{-1}[Y_1\cup Y_2]=f^{-1}[Y_1]\cup f^{-1}[Y_2]\) in \(f^{-1}[Y_1\cap Y_2]=f^{-1}[Y_1]\cap f^{-1}[Y_2]\), ker pripadnost samo prevedemo skozi pogoj \(f(x)\in Y\). Slika vedno ohranja unijo: \(f[X_1\cup X_2]=f[X_1]\cup f[X_2]\). Pri preseku pa na splošno velja le \(f[X_1\cap X_2]\subseteq f[X_1]\cap f[X_2]\). Obratna vsebovanost lahko odpove, ker ima isti \(y\) dve različni predsliki. Za \(f:\{-1,1\}\to\{1\}\), \(f(x)=1\), \(X_1=\{-1\}\), \(X_2=\{1\}\), je levi presek slik praznega preseka prazen, desni pa \(\{1\}\). Če je \(f\) injektivna, enakost pri preseku slik velja, saj enaka slika prisili enako predsliko. Zapis predslike množice ne zahteva obrnljivosti funkcije.`,
      hint: H`Pri sliki preseka vprašaj, ali sta priči za isti izhod nujno isti vhod.`,
      rubric: ["obe definiciji", "zakoni predslike", "slika unije in vsebovanost za presek", "protiprimer ter pogoj injektivnosti"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 3.7",
      tags: ["slika", "predslika", "injektivnost"]
    },
    {
      id: "oq-mp-12",
      topic: "mnozice-preslikave",
      prompt: H`Kako se injektivnost in surjektivnost obnašata pri kompoziciji? Katere obrate lahko sklepamo in katerih ne?`,
      answer: H`Naj bosta \(f:A\to B\) in \(g:B\to C\). Če sta obe injektivni, je \(g\circ f\) injektivna: iz \(g(f(x_1))=g(f(x_2))\) po injektivnosti \(g\) sledi \(f(x_1)=f(x_2)\), nato po injektivnosti \(f\) še \(x_1=x_2\). Če sta obe surjektivni, je kompozicija surjektivna: za \(z\in C\) izberemo \(y\in B\) z \(g(y)=z\), nato \(x\in A\) z \(f(x)=y\). Iz injektivnosti \(g\circ f\) vedno sledi injektivnost \(f\), ne nujno \(g\), saj kompozicija preizkusi \(g\) le na \(f[A]\). Iz surjektivnosti \(g\circ f\) vedno sledi surjektivnost \(g\), ne nujno \(f\). Protiprimer slednjemu: vključitev \(f:\{1\}\to\{1,2\}\), \(f(1)=1\), ni surjektivna, preslikava \(g:\{1,2\}\to\{a\}\) pa da surjektivno kompozicijo. Analogno lahko \(g\) ni injektivna zunaj slike \(f\), kompozicija pa ostane injektivna. Bijekciji se komponirata v bijekcijo, in \((g\circ f)^{-1}=f^{-1}\circ g^{-1}\).`,
      hint: H`Za dokaz pojdi po definicijah; pri obratih pazi, katere dele kodomene kompozicija sploh obišče.`,
      rubric: ["dokaz injektivnosti kompozicije", "dokaz surjektivnosti kompozicije", "dva pravilna delna obrata", "protiprimera in inverz bijekcije"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 3.7",
      tags: ["kompozicija", "injekcija", "surjekcija"]
    },
    {
      id: "oq-mp-13",
      topic: "mnozice-preslikave",
      prompt: H`Dokaži \(\mathcal P(A\cap B)=\mathcal P(A)\cap\mathcal P(B)\). Ali velja \(\mathcal P(A\cup B)=\mathcal P(A)\cup\mathcal P(B)\)?`,
      answer: H`Za poljubno množico \(X\) velja \(X\in\mathcal P(A\cap B)\iff X\subseteq A\cap B\). Zadnji pogoj je ekvivalenten konjunkciji \(X\subseteq A\) in \(X\subseteq B\), ta pa pomeni \(X\in\mathcal P(A)\cap\mathcal P(B)\). Ker je ekvivalenca veljala za vsak \(X\), sta množici enaki. Pri uniji vedno velja \(\mathcal P(A)\cup\mathcal P(B)\subseteq\mathcal P(A\cup B)\), saj je vsaka podmnožica \(A\) ali \(B\) tudi podmnožica njune unije. Enakost na splošno ne velja. Če sta \(A=\{1\}\) in \(B=\{2\}\), je \(\{1,2\}\in\mathcal P(A\cup B)\), vendar ni podmnožica samo \(A\) niti samo \(B\), zato ni v \(\mathcal P(A)\cup\mathcal P(B)\). Past je zamenjati elemente \(A\) z elementi \(\mathcal P(A)\): elementi potenčne množice so množice. Enakost pri uniji velja v posebnem primeru, ko je ena od \(A,B\) vsebovana v drugi.`,
      hint: H`Element potenčne množice poimenuj X in zapis \(X\in\mathcal P(A)\) takoj prevedi v \(X\subseteq A\).`,
      rubric: ["elementni dokaz preseka", "vedno veljavna vsebovanost za unijo", "minimalni protiprimer", "pravilna raven elementov"],
      difficulty: "srednje",
      source: "MnozRel.pdf, razdelka 3.5–3.6",
      tags: ["potenčna množica", "dokaz enakosti", "protiprimer"]
    },
    {
      id: "oq-mp-14",
      topic: "mnozice-preslikave",
      prompt: H`Formuliraj Cantor–Bernsteinov izrek in pojasni, kako skupaj s kodiranjem zaporedij poveže moči \(\mathcal P(\mathbb N_0)\), \(\{0,1\}^{\mathbb N_0}\) in \(\mathbb R\).`,
      answer: H`Cantor–Bernsteinov izrek pravi: če obstajata injekciji \(f:A\to B\) in \(g:B\to A\), obstaja bijekcija med \(A\) in \(B\), zato \(|A|=|B|\). Vsaki podmnožici \(S\subseteq\mathbb N_0\) priredimo karakteristično zaporedje \(\chi_S\), kjer je \(\chi_S(n)=1\) natanko tedaj, ko je \(n\in S\). To je že eksplicitna bijekcija \(\mathcal P(\mathbb N_0)\leftrightarrow\{0,1\}^{\mathbb N_0}\). Binarno zaporedje lahko injiciramo v \([0,1]\) s ternarnim zapisom \(a\mapsto\sum_{n\ge0}2a_n/3^{n+1}\); števke 0 in 2 preprečijo dvoumnost običajnih končnih zapisov. Obratno realno število najprej bijektivno stisnemo v interval in mu izberemo kanoničen binarni zapis, kar da injekcijo v množico binarnih zaporedij. Cantor–Bernstein zato da enako moč z \(\mathbb R\). Cantorjev diagonalni izrek pa pokaže \(|\mathbb N_0|<|\mathcal P(\mathbb N_0)|\), zato so realna števila neštevna. Pomembno: dve injekciji nista sami po sebi ista preslikava in izrek ne pravi, da je katera od njiju že surjektivna.`,
      hint: H`Najprej uporabi karakteristične funkcije, nato dve injekciji in šele potem Cantor–Bernstein.`,
      rubric: ["natančna formulacija izreka", "bijekcija s karakterističnimi zaporedji", "injekciji z realnimi števili", "sklep o neštevnosti in opozorilo"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 3.7",
      tags: ["Cantor–Bernstein", "števnost", "realna števila"]
    },

    {
      id: "oq-ru-12",
      topic: "relacije-urejenosti",
      prompt: H`Za prazno, identično in univerzalno relacijo na neprazni množici \(A\) razvrsti vseh osem lastnosti. Kaj se spremeni, če je \(A=\varnothing\)?`,
      answer: H`Na neprazni \(A\) je prazna relacija \(\varnothing\) irefleksivna, simetrična, asimetrična, antisimetrična in tranzitivna, ker antecedenti ustreznih implikacij nikoli ne nastopijo; ni refleksivna, sovisna, če ima \(A\) vsaj dva elementa, niti strogo sovisna. Identiteta \(I_A=\{(x,x):x\in A\}\) je refleksivna, simetrična, antisimetrična in tranzitivna; ni irefleksivna ali asimetrična. Sovisna je le, če ima \(A\) največ en element, strogo sovisna pa natanko tedaj, ko ima največ en element. Univerzalna relacija \(A\times A\) je refleksivna, simetrična, tranzitivna, sovisna in strogo sovisna. Pri \(|A|\ge2\) ni irefleksivna, asimetrična niti antisimetrična; antisimetričnost odpove na vsakem različnem paru. Na prazni množici so vsi univerzalno kvantificirani pogoji vakuozno resnični, zato je edina relacija hkrati refleksivna in irefleksivna, simetrična, asimetrična, antisimetrična, tranzitivna, sovisna in strogo sovisna. Ta robni primer pokaže, zakaj je treba pri protiprimerih povedati velikost univerzuma.`,
      hint: H`Pri prazni relaciji preveri antecedente, pri identiteti samo zanke, pri univerzalni vse pare.`,
      rubric: ["prazna relacija", "identiteta z robom |A|=1", "univerzalna relacija", "vakuoznost na praznem A"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 4.1",
      tags: ["klasifikacija", "vakuozna resničnost", "robni primer"]
    },
    {
      id: "oq-ru-13",
      topic: "relacije-urejenosti",
      prompt: H`Dokaži: relacija je hkrati simetrična in antisimetrična natanko tedaj, ko je vsebovana v identiteti. Kaj sledi za relacijo, ki je hkrati simetrična in asimetrična?`,
      answer: H`Naj bo \(I_A=\{(x,x):x\in A\}\). Če je \(R\) simetrična in antisimetrična ter velja \(xRy\), da simetričnost \(yRx\), nato antisimetričnost iz obeh smeri da \(x=y\). Zato je vsak par relacije zanka in \(R\subseteq I_A\). Obratno naj bo \(R\subseteq I_A\). Vsak par v \(R\) ima obliko \((x,x)\), zato je njegov obrat isti par in simetričnost velja. Če veljata \(xRy\) in \(yRx\), že iz prve zveze sledi \(x=y\), zato je relacija antisimetrična. Če je \(R\) hkrati simetrična in asimetrična, iz poljubnega \(xRy\) po simetričnosti dobimo \(yRx\), po asimetričnosti pa \(\neg yRx\), protislovje. Zato noben par ne obstaja in \(R=\varnothing\). Obratno je prazna relacija zaradi vakuoznosti hkrati simetrična in asimetrična. Primer prve karakterizacije je poljubna množica nekaterih zank; ni nujno celotna identiteta in zato ni nujno refleksivna.`,
      hint: H`Začni s poljubnim parom xRy in zaporedoma uporabi obe lastnosti.`,
      rubric: ["dokaz vsebovanosti v identiteti", "dokaz obrata", "sklep za simetrično in asimetrično", "opozorilo, da podrelacija identitete ni nujno refleksivna"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 4.1",
      tags: ["simetričnost", "antisimetričnost", "karakterizacija"]
    },
    {
      id: "oq-ru-14",
      topic: "relacije-urejenosti",
      prompt: H`Naj bo \(m\ge2\) in na \(\mathbb Z\) definiraj \(aRb\) natanko tedaj, ko je \(a\equiv b\pmod m\). Dokaži, da je \(R\) ekvivalenčna relacija, določi vse njene ekvivalenčne razrede in faktorsko množico \(\mathbb Z/R\). Nato dokaži, da so razredi neprazni, paroma disjunktni in da je njihova unija enaka \(\mathbb Z\).`,
      answer: H`Na \(\mathbb Z\) definiramo \(a\equiv b\pmod m\) natanko tedaj, ko \(m\mid(a-b)\), kjer je \(m\ge2\). Relacija je refleksivna, ker \(m\mid0\); simetrična, ker iz \(m\mid(a-b)\) sledi \(m\mid(b-a)\); in tranzitivna, ker iz deljivosti \(a-b\) ter \(b-c\) sledi deljivost njune vsote \(a-c\). Razred \([r]\) je množica vseh celih števil z ostankom \(r\): \([r]=\{r+km:k\in\mathbb Z\}\). Različnih razredov je natanko \(m\), zato je \(\mathbb Z/{\equiv_m}=\{[0],[1],\ldots,[m-1]\}\). Vsako celo število ima po deljenju z ostankom natanko en ostanek med 0 in \(m-1\), zato unija razredov pokrije \(\mathbb Z\), vsak je neprazen, različna razreda pa sta disjunktna. Če bi se \([r]\) in \([s]\) sekala, bi za skupni element po tranzitivnosti dobili \(r\equiv s\pmod m\), pri izbranih ostankih pa to prisili \(r=s\). Past: element faktorske množice je cel razred, ne posamezno celo število.`,
      hint: H`Uporabi izrek o deljenju z ostankom in kriterij, da neprazen presek razredov pomeni enakost.`,
      rubric: ["tri lastnosti ekvivalence", "formula razreda", "faktorska množica", "nepraznost, pokritje in disjunktnost"],
      difficulty: "srednje",
      source: "MnozRel.pdf, razdelka 4.2–4.3",
      tags: ["kongruenca", "ekvivalenčni razred", "faktorska množica"]
    },
    {
      id: "oq-ru-15",
      topic: "relacije-urejenosti",
      prompt: H`Kako iz delne urejenosti dobimo pripadajočo strogo delno urejenost in obratno? Dokaži obe konstrukciji.`,
      answer: H`Naj bo \(\preceq\) delna urejenost. Definiramo \(x\prec y\iff x\preceq y\land x\ne y\). Relacija \(\prec\) je irefleksivna, zato tudi kandidatka za strogo urejenost. Če \(x\prec y\) in \(y\prec z\), tranzitivnost \(\preceq\) da \(x\preceq z\). Če bi bil \(x=z\), bi imeli \(x\preceq y\) in \(y\preceq x\), antisimetričnost pa bi dala \(x=y\), v protislovju z \(x\prec y\). Zato \(x\ne z\) in \(x\prec z\). Relacija je torej tranzitivna in irefleksivna, s tem asimetrična. Obratno iz stroge delne urejenosti \(\prec\) definiramo \(x\preceq y\iff x\prec y\lor x=y\). Ta relacija je refleksivna. Antisimetričnost sledi iz asimetričnosti \(\prec\): pri različnih \(x,y\) ne moreta veljati obe strogi smeri. Tranzitivnost preverimo po primerih; če nobena zveza ni enakost, uporabimo tranzitivnost \(\prec\), sicer sklep sledi neposredno. Za \(\le\) dobimo \(<\), za \(\subseteq\) pa pravo vsebovanost \(\subsetneq\).`,
      hint: H`Nestrogi relaciji odstrani diagonalo; strogi dodaj identiteto. Nato preveri tri zahtevane lastnosti.`,
      rubric: ["obe konstrukciji", "dokaz asimetričnosti/tranzitivnosti stroge", "dokaz treh lastnosti nestroge", "dva pravilna primera"],
      difficulty: "težko",
      source: "MnozRel.pdf, Definicija 4.5",
      tags: ["delna urejenost", "stroga urejenost", "dokaz"]
    },
    {
      id: "oq-ru-16",
      topic: "relacije-urejenosti",
      prompt: H`Za ekvivalenčno relacijo dokaži polno verigo \(aRb\iff[a]=[b]\iff[a]\cap[b]\ne\varnothing\). Zakaj nobena od smeri ne sme preskočiti refleksivnosti, simetričnosti ali tranzitivnosti?`,
      answer: H`Naj bo \(R\) ekvivalenčna. Če \(aRb\) in \(x\in[a]\), potem \(aRx\). Iz \(aRb\) po simetričnosti dobimo \(bRa\), nato iz \(bRa\) in \(aRx\) po tranzitivnosti \(bRx\), torej \(x\in[b]\). Tako je \([a]\subseteq[b]\), obratna vsebovanost pa sledi z zamenjavo \(a,b\). Torej \([a]=[b]\). Če sta razreda enaka, je zaradi refleksivnosti \(b\in[b]=[a]\), zato \(aRb\). Enakost razredov seveda da neprazen presek, ker razred vsebuje svojega predstavnika. Obratno naj bo \(c\in[a]\cap[b]\). Tedaj \(aRc\) in \(bRc\); iz druge zveze po simetričnosti dobimo \(cRb\), nato po tranzitivnosti iz \(aRc,cRb\) sledi \(aRb\). Refleksivnost zagotovi, da razredi vsebujejo predstavnike in niso prazni, simetričnost obrne potrebne puščice, tranzitivnost pa jih sestavi. Brez katerekoli lastnosti lahko veriga odpove; zato ni dovolj, da relacijo le poimenujemo »podobnost«, ampak moramo uporabiti vse tri aksiome.`,
      hint: H`Za smer iz preseka izberi c v preseku; nato obrni eno od zvez in ju sestavi.`,
      rubric: ["aRb implicira dvojno vsebovanost", "enakost implicira aRb", "presek implicira aRb", "jasna vloga vseh treh aksiomov"],
      difficulty: "težko",
      source: "MnozRel.pdf, Trditev 4.4",
      tags: ["ekvivalenčni razred", "karakterizacija", "dokaz"]
    },
    {
      id: "oq-ir-15",
      topic: "izjavni-racun",
      prompt: H`Za izjavni spremenljivki \(p,q\) besedno in formalno opredeli negacijo, konjunkcijo, disjunkcijo, implikacijo in ekvivalenco. Nato sestavi popolno resničnostno tabelo formule \(F=(p\Rightarrow q)\Leftrightarrow(\neg q\Rightarrow\neg p)\), jo razvrsti ter s konkretnim določilom pojasni razliko med vključujočim in izključujočim »ali«.`,
      answer: H`Negacija \(\neg p\) obrne vrednost \(p\). Konjunkcija \(p\land q\) je resnična natanko pri \(p=q=1\); vključujoča disjunkcija \(p\lor q\) je resnična, ko je resničen vsaj eden, tudi oba; implikacija \(p\Rightarrow q\) je napačna samo pri \(p=1,q=0\); ekvivalenca \(p\Leftrightarrow q\) pa je resnična pri enakih vrednostih. Zahtevana tabela je
      \[
      \begin{array}{c|c|c|c|c}
      p&q&p\Rightarrow q&\neg q\Rightarrow\neg p&F\\\hline
      0&0&1&1&1\\
      0&1&1&1&1\\
      1&0&0&0&1\\
      1&1&1&1&1
      \end{array}
      \]
      Končna stolpca obeh implikacij se ujemata, zato je \(F\) tavtologija; to je zakon kontrapozicije \(p\Rightarrow q\equiv\neg q\Rightarrow\neg p\). Izraz je torej tudi izpolnljiv, ni pa kontingenten ali protisloven. Vključujoči »ali« in ekskluzivni »ali« loči določilo \(p=q=1\): tedaj je \(p\lor q=1\), medtem ko je \(p\mathbin{\veebar}q=0\). Pogosta napaka je razglasiti implikacijo z napačno premiso za napačno; v prvih dveh vrsticah je \(p\Rightarrow q\) resnična prav zato, ker je \(p=0\).`,
      hint: H`Najprej izračunaj oba stolpca implikacij; ekvivalenca nato samo preveri, ali sta vrednosti enaki.`,
      rubric: ["pet pravilnih pomenskih definicij", "vse štiri vrstice tabele", "pravilna klasifikacija in kontrapozicija", "določilo, ki loči obe disjunkciji"],
      difficulty: "srednje",
      source: "IzjavniRacun.pdf, razdelki 1.2–1.4",
      tags: ["resničnostna tabela", "vezniki", "kontrapozicija"]
    },
    {
      id: "oq-ir-16",
      topic: "izjavni-racun",
      prompt: H`Razvrsti osnovne logične enakovrednosti v smiselne skupine in z njimi brez resničnostne tabele dokaži \(\neg(p\Rightarrow q)\lor(p\land q)\equiv p\). Nato presodi trditev, da iz \(p\lor q\equiv p\lor r\) vedno sledi \(q\equiv r\), in svojo presojo utemelji s formalnim protiprimerom.`,
      answer: H`Med osnovne skupine sodijo: dvojna negacija; komutativnost in asociativnost \(\land,\lor\); idempotentnost \(p\land p\equiv p\), \(p\lor p\equiv p\); distributivnost obeh operacij; absorpciji \(p\lor(p\land q)\equiv p\) in \(p\land(p\lor q)\equiv p\); De Morganova zakona; izključena tretja možnost \(p\lor\neg p\equiv1\) in protislovnost \(p\land\neg p\equiv0\); nevtralna in dominantna pravila z \(0,1\); ter pravili za odpravo
      \[
      p\Rightarrow q\equiv\neg p\lor q,\qquad
      p\Leftrightarrow q\equiv(p\Rightarrow q)\land(q\Rightarrow p).
      \]
      Zahtevani račun je
      \[
      \begin{aligned}
      \neg(p\Rightarrow q)\lor(p\land q)
      &\equiv\neg(\neg p\lor q)\lor(p\land q)\\
      &\equiv(p\land\neg q)\lor(p\land q)\\
      &\equiv p\land(\neg q\lor q)\\
      &\equiv p\land1\equiv p.
      \end{aligned}
      \]
      Uporabljeni so odprava implikacije, De Morgan in dvojna negacija, distributivnost, zakon izključene tretje možnosti ter nevtralnost enice. Predlagano krajšanje pri disjunkciji ni veljaven zakon. Vzemi formuli \(q:=0\) in \(r:=p\). Tedaj sta \(p\lor0\equiv p\) in \(p\lor p\equiv p\), zato sta levi strani enakovredni, toda \(0\not\equiv p\), saj pri \(p=1\) dobita različni vrednosti. Logične operacije torej na splošno nimajo aritmetičnega zakona krajšanja.`,
      hint: H`Implikacijo najprej odpravi, negacijo potisni navznoter in izpostavi skupni faktor \(p\). Za protiprimer izberi dva različna izraza, ki ju disjunkcija s \(p\) »prekrije«.`,
      rubric: ["smiselno urejen seznam zakonov", "popolna veriga z imeni zakonov", "jasna zavrnitev krajšanja", "določilo, ki pokaže neenakovrednost q in r"],
      difficulty: "težko",
      source: "IzjavniRacun.pdf, razdelek 1.4",
      tags: ["logični zakoni", "dokaz enakovrednosti", "protiprimer"]
    },
    {
      id: "oq-pr-16",
      topic: "predikatni-racun",
      prompt: H`Naj \(S(x)\) pomeni »\(x\) je študent«, \(M(y)\) »\(y\) je mentor« in \(H(x,y)\) »\(y\) mentorira \(x\)«. Formaliziraj izjavi »vsak študent ima natanko enega mentorja« in »obstaja natanko en mentor, ki mentorira vse študente«. Nato zgradi popolno končno interpretacijo, v kateri je prva izjava resnična, druga pa neresnična, in razloži razliko med njunima kvantifikatorskima zgradbama.`,
      answer: H`Prvo izjavo lahko zapišemo
      \[
      \forall x\Bigl(S(x)\Rightarrow
      \exists y\bigl(M(y)\land H(x,y)\land
      \forall z((M(z)\land H(x,z))\Rightarrow z=y)\bigr)\Bigr).
      \]
      Eksistenčni del zagotovi mentorja za izbranega študenta, zadnji univerzalni pogoj pa njegovo enoličnost. Druga izjava je
      \[
      \exists y\Bigl(M(y)\land
      \forall x(S(x)\Rightarrow H(x,y))\land
      \forall z\bigl((M(z)\land\forall x(S(x)\Rightarrow H(x,z)))\Rightarrow z=y\bigr)\Bigr).
      \]
      Vzemimo \(U=\{\text{Ana},\text{Borut},\text{Maja},\text{Niko}\}\), \(S=\{\text{Ana},\text{Borut}\}\), \(M=\{\text{Maja},\text{Niko}\}\) in
      \[
      H=\{(\text{Ana},\text{Maja}),(\text{Borut},\text{Niko})\}.
      \]
      Ana ima natanko mentorico Majo, Borut natanko mentorja Nika, zato je prva formula resnična. Druga je napačna: Maja ne mentorira Boruta, Niko ne mentorira Ane, druga kandidata pa po interpretaciji nista mentorja. Pri prvi formuli je priča \(y\) izbrana znotraj dosega posameznega \(x\) in sme biti od njega odvisna; pri drugi moramo najprej izbrati en sam \(y\), ki deluje za vse študente. »Natanko eden« vedno pomeni obstoj in enoličnost; zgolj \(\exists y\) ne prepreči dveh mentorjev.`,
      hint: H`»Natanko eden« razdeli na obstoj priče in pogoj, da je vsak drug ustrezen kandidat enak tej priči.`,
      rubric: ["pravilna formula za individualno enoličnost", "pravilna formula za skupnega enoličnega mentorja", "vsi deli interpretacije", "ločena presoja obeh formul"],
      difficulty: "težko",
      source: "ADM-Predikati.pdf, razdelki 2.2–2.4",
      tags: ["enolični obstoj", "formalizacija", "interpretacija"]
    },
    {
      id: "oq-pr-17",
      topic: "predikatni-racun",
      prompt: H`Presodi sklep \(\forall x(P(x)\Rightarrow Q(x)),\ \exists x(P(x)\land R(x)),\ \forall x(R(x)\Rightarrow S(x))\models\exists x(Q(x)\land S(x))\). Dokaži ali ovrzi ga neposredno iz semantike, negiraj zaključek do atomov in nato preveri, ali sklep ostane veljaven, če srednjo premiso zamenjamo z \((\exists xP(x))\land(\exists xR(x))\).`,
      answer: H`Prvotni sklep je veljaven. V poljubni interpretaciji, kjer so vse premise resnične, druga premisa da eno in isto pričo \(c\) s \(P(c)\land R(c)\). Iz prve univerzalne premise pri \(c\) dobimo \(P(c)\Rightarrow Q(c)\), zato \(Q(c)\). Iz tretje analogno dobimo \(S(c)\). Torej velja \(Q(c)\land S(c)\), zato je \(c\) priča za \(\exists x(Q(x)\land S(x))\). Negacija zaključka je
      \[
      \neg\exists x(Q(x)\land S(x))
      \equiv\forall x\neg(Q(x)\land S(x))
      \equiv\forall x(\neg Q(x)\lor\neg S(x)).
      \]
      Po zamenjavi srednje premise sklep ni več veljaven, ker eksistenci smeta imeti različni priči. Protimodel: \(U=\{a,b\}\), \(P=\{a\}\), \(Q=\{a\}\), \(R=\{b\}\), \(S=\{b\}\). Implikaciji \(P\Rightarrow Q\) in \(R\Rightarrow S\) veljata za vsak element, \(\exists xP(x)\) ima pričo \(a\), \(\exists xR(x)\) pričo \(b\), toda nihče ni hkrati v \(Q\) in \(S\). Zato je zaključek napačen. Napaka bi bila dve ločeni eksistenčni priči brez razloga poimenovati z istim elementom.`,
      hint: H`V prvem sklepu ohrani pričo iz konjunkcije; po zamenjavi namenoma izberi različni priči za \(P\) in \(R\).`,
      rubric: ["semantični dokaz z isto pričo", "pravilna negacija zaključka", "popoln dvodelni protimodel", "razlaga napake z različnima pričama"],
      difficulty: "težko",
      source: "ADM-Predikati.pdf, razdelki 2.3–2.5",
      tags: ["logična posledica", "priča", "protimodel"]
    },
    {
      id: "oq-mp-15",
      topic: "mnozice-preslikave",
      prompt: H`Naj bodo \(U=\{1,2,3,4,5,6\}\), \(A=\{1,2,4\}\) in \(B=\{2,3,4,5\}\). Besedno in formalno definiraj unijo, presek, razliko, komplement glede na \(U\) ter simetrično razliko; vseh pet operacij dejansko izračunaj. Nato preveri en De Morganov zakon in ovrzi trditvi \(A\cup B=A\triangle B\) ter \(A\setminus B=B\setminus A\).`,
      answer: H`Definicije in rezultati so:
      \[
      \begin{aligned}
      A\cup B&=\{x:x\in A\lor x\in B\}=\{1,2,3,4,5\},\\
      A\cap B&=\{x:x\in A\land x\in B\}=\{2,4\},\\
      A\setminus B&=\{x:x\in A\land x\notin B\}=\{1\},\\
      B\setminus A&=\{3,5\},\\
      A^c&=U\setminus A=\{3,5,6\},\qquad
      B^c=U\setminus B=\{1,6\},\\
      A\triangle B&=(A\setminus B)\cup(B\setminus A)=\{1,3,5\}.
      \end{aligned}
      \]
      Unija vsebuje elemente vsaj ene množice, presek skupne elemente, razlika elemente prve brez elementov druge, komplement vse elemente izbranega univerzuma zunaj množice, simetrična razlika pa elemente natanko ene množice. De Morganov zakon se na primeru preveri kot
      \[
      (A\cup B)^c=\{6\}=A^c\cap B^c.
      \]
      Splošni dokaz izhaja iz \(\neg(x\in A\lor x\in B)\iff x\notin A\land x\notin B\). Prva napačna trditev odpove zaradi skupnih elementov: \(2,4\in A\cup B\), vendar \(2,4\notin A\triangle B\). Druga odpove, ker sta izračuna \(\{1\}\) in \(\{3,5\}\) različna; razlika ni komutativna. Simetrična razlika je tudi \((A\cup B)\setminus(A\cap B)\). Komplement brez navedbe \(U\) ni določen, saj bi večji univerzum dodal nove elemente komplementu.`,
      hint: H`Za vsak element univerzuma preveri dva pogoja pripadnosti; pri simetrični razliki obdrži natanko eno resnično pripadnost.`,
      rubric: ["pet besednih in formalnih definicij", "vsi pravilni izračuni", "preverjen De Morgan", "dva konkretna protiprimera"],
      difficulty: "srednje",
      source: "MnozRel.pdf, razdelka 3.1–3.2",
      tags: ["operacije množic", "De Morgan", "protiprimer"]
    },
    {
      id: "oq-mp-16",
      topic: "mnozice-preslikave",
      prompt: H`Za \(A=\{a,b\}\) in \(B=\{0,1,2\}\) izpiši \(\mathcal P(A)\) in \(A\times B\) ter utemelji njuni moči. Nato relacijo \(f=\{(a,0),(b,0)\}\subseteq A\times B\) obravnavaj kot kandidatko za preslikavo \(A\to B\): določi domeno, kodomeno, sliko, \(f[\{b\}]\), \(f^{-1}[\{0,2\}]\), injektivnost, surjektivnost in obstoj inverza. Nazadnje pojasni, zakaj \(R=\{(a,0),(a,1),(b,2)\}\) ni graf take preslikave.`,
      answer: H`Potenčna množica vsebuje vse podmnožice:
      \[
      \mathcal P(A)=\{\varnothing,\{a\},\{b\},\{a,b\}\},\qquad
      |\mathcal P(A)|=2^{|A|}=2^2=4.
      \]
      Kartezični produkt vsebuje urejene pare:
      \[
      A\times B=\{(a,0),(a,1),(a,2),(b,0),(b,1),(b,2)\},\qquad
      |A\times B|=|A||B|=2\cdot3=6.
      \]
      Relacija \(f\) je graf preslikave \(A\to B\), ker se vsak element \(A\) pojavi kot prva komponenta natanko enkrat. Domena je \(A\), podana kodomena je \(B\), slika pa \(\operatorname{Im}f=\{0\}\). Veljata \(f[\{b\}]=\{0\}\) in \(f^{-1}[\{0,2\}]=\{a,b\}\), saj se oba elementa preslikata v 0, nihče pa v 2. Preslikava ni injektivna, ker \(a\ne b\), vendar \(f(a)=f(b)\); ni surjektivna, ker 1 in 2 nimata predslike; zato ni bijektivna in inverzna preslikava \(B\to A\) ne obstaja. Predslika množice kljub temu obstaja pri vsaki preslikavi in je ne smemo zamenjati z inverzno funkcijo. \(R\) ni graf preslikave \(A\to B\), ker ima \(a\) dve različni sliki, 0 in 1; pogoj »natanko ena slika za vsak vhod« je kršen. Element \(a\in A\) tudi ni isto kot podmnožica \(\{a\}\in\mathcal P(A)\), produkt pa ni potenčna množica, saj so njegovi elementi urejeni pari.`,
      hint: H`Pri grafu preslikave preglej prve komponente: vsak element domene se mora pojaviti, vendar z natanko eno drugo komponento.`,
      rubric: ["popolna potenčna množica in produkt", "domena, kodomena, slika ter obe množični sliki", "tri pravilne lastnosti preslikave", "natančen razlog, zakaj R ni graf"],
      difficulty: "srednje",
      source: "MnozRel.pdf, razdelki 3.5–3.7",
      tags: ["potenčna množica", "kartezični produkt", "preslikava"]
    },
    {
      id: "oq-ir-17",
      topic: "izjavni-racun",
      prompt: H`Dokaži oba absorpcijska zakona brez resničnostne tabele in pri vsakem koraku poimenuj uporabljeni zakon. Nato prvi zakon preveri še s popolno resničnostno tabelo ter pojasni, zakaj absorpcija ni pravilo krajšanja.`,
      answer: H`Dokazujemo
      \[
      p\lor(p\land q)\equiv p,\qquad p\land(p\lor q)\equiv p.
      \]
      Za prvi zakon velja
      \[
      \begin{aligned}
      p\lor(p\land q)
      &\equiv(p\land1)\lor(p\land q)&&\text{(nevtralnost za konjunkcijo)}\\
      &\equiv p\land(1\lor q)&&\text{(distributivnost)}\\
      &\equiv p\land1&&\text{(dominantnost za disjunkcijo)}\\
      &\equiv p&&\text{(nevtralnost).}
      \end{aligned}
      \]
      Dualno za drugi zakon:
      \[
      \begin{aligned}
      p\land(p\lor q)
      &\equiv(p\lor0)\land(p\lor q)&&\text{(nevtralnost za disjunkcijo)}\\
      &\equiv p\lor(0\land q)&&\text{(distributivnost)}\\
      &\equiv p\lor0&&\text{(dominantnost za konjunkcijo)}\\
      &\equiv p&&\text{(nevtralnost).}
      \end{aligned}
      \]
      Pri prvem zakonu tabela potrdi, da sta zadnja stolpca enaka:
      <table class="truth-table">
        <thead><tr><th>\(p\)</th><th>\(q\)</th><th>\(p\land q\)</th><th>\(p\lor(p\land q)\)</th><th>\(p\)</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
          <tr><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
          <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
          <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
        </tbody>
      </table>
      Absorpcija pove, da zunanji \(p\) že odloči izraz, zato notranji člen s \(q\) ne doda ničesar. Ni pa splošno krajšanje skupnega člena: iz \(p\lor q\equiv p\lor r\) ne smemo sklepati \(q\equiv r\). Če vzamemo \(p\equiv1\), \(q\equiv0\), \(r\equiv1\), sta levi formuli obe enakovredni 1, \(q\) in \(r\) pa nista enakovredna.`,
      hint: H`Za prvi zakon napiši \(p\equiv p\land1\), nato izpostavi \(p\); drugi dokaz je dualen.`,
      rubric: ["oba pravilno zapisana zakona", "algebrska dokaza z imenovanimi zakoni", "popolna tabela za en zakon", "razlaga absorpcije in protiprimer krajšanju"],
      difficulty: "srednje",
      source: "IzjavniRacun.pdf; uporabnikov artefakt »ADM — teorija za izpit«, vprašanje 95",
      tags: ["absorpcija", "logične enakovrednosti", "dokaz", "resničnostna tabela"]
    },
    {
      id: "oq-pr-18",
      topic: "predikatni-racun",
      prompt: H`Zapiši De Morganova zakona za kvantifikatorje. Nato pri dogovoru \(\mathbb N=\{1,2,\ldots\}\) negiraj izjavo
      \[
      (\forall x\in\mathbb R)(\exists n\in\mathbb N)\;n>x
      \]
      tako, da negacija ostane samo pred atomsko formulo, in utemeljeno presodi resničnost prvotne izjave ter njene negacije.`,
      answer: H`De Morganova zakona sta
      \[
      \neg\forall x\,P(x)\equiv\exists x\,\neg P(x),\qquad
      \neg\exists x\,P(x)\equiv\forall x\,\neg P(x).
      \]
      Omejeni kvantifikaciji sta okrajšavi
      \[
      \forall x\in A\,P(x)\equiv\forall x(x\in A\Rightarrow P(x)),\qquad
      \exists x\in A\,P(x)\equiv\exists x(x\in A\land P(x)).
      \]
      Kvantifikatorja pri negiranju zamenjamo, relacijo \(>\) pa negiramo v \(\le\):
      \[
      \neg(\forall x\in\mathbb R)(\exists n\in\mathbb N)\;n>x
      \equiv
      (\exists x\in\mathbb R)(\forall n\in\mathbb N)\;n\le x.
      \]
      Prvotna izjava je resnična. Za poljuben \(x\in\mathbb R\) lahko izberemo
      \[
      n=\max\{1,\lfloor x\rfloor+1\}\in\mathbb N.
      \]
      Če je \(\lfloor x\rfloor+1\ge1\), je ta vrednost strogo večja od \(x\); sicer je \(x<1\) in deluje \(n=1\). Zato za vsak realni \(x\) obstaja zahtevana priča. Negacija je napačna: trdila bi, da obstaja realna zgornja meja vseh naravnih števil, pravkar podana konstrukcija pa za vsakega kandidata najde večje naravno število.
      <p><strong>Past iz artefakta.</strong> Sam zapis \(n=\lfloor x\rfloor+1\) pri zelo negativnem \(x\) ni nujno naravno število po izbranem dogovoru; člen \(\max\{1,\cdot\}\) odpravi ta robni primer.</p>`,
      hint: H`Vsak prehod čez negacijo zamenja \(\forall\leftrightarrow\exists\); na koncu uporabi \(\neg(n>x)\equiv n\le x\).`,
      rubric: ["oba De Morganova zakona", "pravilna negacija obeh kvantifikatorjev", "atomska negacija n≤x", "veljavna priča za vsak realni x in presoja obeh izjav"],
      difficulty: "srednje",
      source: "ADM-Predikati.pdf; uporabnikov artefakt »ADM — teoretični izpit za vajo«, pola D",
      tags: ["kvantifikatorji", "negacija", "Arhimedova lastnost", "resničnost"]
    },
    {
      id: "oq-mp-17",
      topic: "mnozice-preslikave",
      prompt: H`Definiraj injektivno, surjektivno in bijektivno preslikavo ter enako moč množic. Nato s Cantorjevim decimalnim diagonalnim postopkom dokaži, da \((0,1)\) ni števno. V dokazu posebej odpravi težavo dvojnih decimalnih zapisov in pojasni, zakaj od tod sledi neštevnost \(\mathbb R\).`,
      answer: H`Preslikava \(f:A\to B\) je injektivna, če \(f(x)=f(y)\Rightarrow x=y\); surjektivna, če za vsak \(b\in B\) obstaja \(a\in A\) s \(f(a)=b\); bijektivna, če ima obe lastnosti. Množici sta enako močni, kadar med njima obstaja bijekcija. Množica je števno neskončna, kadar je enako močna z \(\mathbb N\).
      <p>Predpostavimo, da je \(f:\mathbb N\to(0,1)\) surjektivna, in vse njene vrednosti zapišimo s kanoničnimi decimalnimi zapisi, ki nimajo neskončnega repa devetic:</p>
      \[
      f(n)=0,a_{n1}a_{n2}a_{n3}\ldots
      \]
      <p>Definirajmo \(y=0,b_1b_2\ldots\), kjer je \(b_n=1\), če \(a_{nn}\ne1\), in \(b_n=2\), če \(a_{nn}=1\). Tedaj \(y\in(0,1)\), vendar se od \(f(n)\) razlikuje v \(n\)-ti decimalki, zato \(y\ne f(n)\) za vsak \(n\). Ker zapis \(y\) uporablja samo 1 in 2, ni dvoumni zapis z repom devetic; tudi vse vrednosti seznama smo zapisali kanonično. Različna kanonična zapisa zato predstavljata različni števili.</p>
      <p>Dobili smo element intervala, ki ga domnevno surjektivni seznam ne zadene — protislovje. Torej ni surjekcije \(\mathbb N\to(0,1)\), s tem pa tudi ne bijekcije. Interval je nešteven. Ker \((0,1)\subseteq\mathbb R\), bi števnost \(\mathbb R\) implicirala števnost njegove podmnožice \((0,1)\); zato je tudi \(\mathbb R\) neštevna.</p>`,
      hint: H`\(n\)-to števko izberi drugače od \(n\)-te števke \(n\)-tega člena; uporabljaj le števki 1 in 2.`,
      rubric: ["štiri definicije", "predpostavljeno naštevanje in kanonični zapisi", "pravilna diagonalna konstrukcija", "protislovje s surjektivnostjo ter sklep za realna števila"],
      difficulty: "težko",
      source: "MnozRel.pdf; uporabnikov artefakt »ADM — rešitve teoretičnih pol«, pola I",
      tags: ["Cantor", "diagonalni dokaz", "neštevnost", "decimalni zapis"]
    },
    {
      id: "oq-ru-17",
      topic: "relacije-urejenosti",
      prompt: H`Na \(A=\{1,2,3\}\) obravnavaj relacije \(S=\{(1,2),(2,1)\}\), \(T=\{(1,2),(2,3),(1,3)\}\) in \(I_A=\{(1,1),(2,2),(3,3)\}\). Najprej formalno razloči simetričnost, asimetričnost in antisimetričnost, nato vsako od treh relacij razvrsti glede na te lastnosti. Na podlagi razvrstitve presodi trditev »simetrična relacija je asimetrična« in natančno pojasni, kdaj je relacija lahko hkrati simetrična in asimetrična.`,
      answer: H`Definicije so
      \[
      \begin{aligned}
      R\text{ simetrična}&\iff\forall x,y\;(xRy\Rightarrow yRx),\\
      R\text{ asimetrična}&\iff\forall x,y\;(xRy\Rightarrow\neg yRx),\\
      R\text{ antisimetrična}&\iff\forall x,y\;((xRy\land yRx)\Rightarrow x=y).
      \end{aligned}
      \]
      \(S\) je simetrična, ker sta prisotni obe smeri edine povezave. Ni asimetrična in ni antisimetrična, saj \(1S2\) in \(2S1\), čeprav \(1\ne2\). \(T\) je asimetrična: nobena puščica nima obrata; zato je tudi antisimetrična. Ni simetrična, ker \(1T2\), vendar ne \(2T1\). Relacija \(I_A\) je simetrična, ker obrat zanke ostane ista zanka, in antisimetrična, ker se obojestranska zveza pojavi le pri enakih elementih. Ni asimetrična, saj že \(1I_A1\) zahteva po asimetričnosti \(\neg(1I_A1)\). Trditev, da simetričnost implicira asimetričnost, je torej napačna; protiprimera sta \(S\) in \(I_A\). Če je \(R\) hkrati simetrična in asimetrična ter bi veljal kak par \(xRy\), bi simetričnost dala \(yRx\), asimetričnost pa \(\neg yRx\), kar je protislovje. Zato mora biti \(R=\varnothing\). Obratno je prazna relacija vakuozno simetrična in asimetrična, na praznem ali nepraznem univerzumu. Antisimetričnost ni »nasprotje simetričnosti«: identiteta kaže, da lahko veljata obe.`,
      hint: H`Pri vsakem obstoječem paru vprašaj: ali je obrat zahtevan, prepovedan ali dovoljen samo na diagonali?`,
      rubric: ["tri formalne definicije", "popolna klasifikacija S, T in identitete", "konkreten protiprimer implikaciji", "dokaz karakterizacije prazne relacije"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelek 4.1; teoreticni_izpiti/teorijski roki, lastnosti relacij",
      tags: ["simetričnost", "asimetričnost", "antisimetričnost"]
    },
    {
      id: "oq-ru-18",
      topic: "relacije-urejenosti",
      prompt: H`Na \(A=\{1,2,3,6\}\) definiraj \(xRy\iff x\mid y\). Izpiši vse pare relacije in jo klasificiraj glede na refleksivnost, irefleksivnost, simetričnost, asimetričnost, antisimetričnost, tranzitivnost, sovisnost in strogo sovisnost. Za vsako negativno presojo navedi konkreten protiprimer, nato določi, ali gre za delno ali linearno urejenost, ter poišči najmanjši, največji, minimalne in maksimalne elemente.`,
      answer: H`Relacija je
      \[
      R=\{(1,1),(1,2),(1,3),(1,6),(2,2),(2,6),(3,3),(3,6),(6,6)\}.
      \]
      Je refleksivna, ker vsako pozitivno celo število deli samo sebe, zato ni irefleksivna; protiprimer irefleksivnosti je \(2R2\). Ni simetrična, saj \(1R2\), ne pa \(2R1\). Ni asimetrična, ker vsebuje zanke, na primer \(1R1\). Je antisimetrična: če \(x\mid y\) in \(y\mid x\) za pozitivna \(x,y\), potem \(x=y\). Je tranzitivna, ker iz \(x\mid y\) in \(y\mid z\) sledi \(x\mid z\). Ni sovisna, saj različna 2 in 3 nista primerljiva: niti \(2\mid3\) niti \(3\mid2\). Zato tudi ni strogo sovisna; isti par je protiprimer, če stroga sovisnost zahteva \(xRy\lor yRx\) za vse \(x,y\). Refleksivnost, antisimetričnost in tranzitivnost pomenijo, da je \(R\) delna urejenost; zaradi neprimerljivosti 2 in 3 ni linearna. Element 1 je najmanjši, ker deli vse elemente \(A\), 6 je največji, ker ga vsi elementi \(A\) delijo. Zato je edini minimalni element 1 in edini maksimalni element 6. V Hassejevem diagramu so pokritja \(1\prec2\), \(1\prec3\), \(2\prec6\) in \(3\prec6\); povezava \(1\prec6\) se izpusti zaradi tranzitivnosti. Pogosta napaka je iz nesimetričnosti sklepati asimetričnost: zanke tukaj asimetričnost takoj preprečijo.`,
      hint: H`Najprej naštej deliteljske pare; nato pri vsaki lastnosti uporabi definicijo in za napačno poišči najkrajši nasprotni vzorec.`,
      rubric: ["vseh devet parov", "vseh osem pravilnih klasifikacij", "delna proti linearni urejenosti", "ekstremni elementi in utemeljitev"],
      difficulty: "težko",
      source: "MnozRel.pdf, razdelka 4.1 in 4.4",
      tags: ["klasifikacija relacije", "deljivost", "delna urejenost"]
    }
  ];

  const exercises = [];

  const collections = [topics, flashcards, quiz, questions, exercises];
  const ids = new Set();
  for (const collection of collections) {
    for (const item of collection) {
      if (ids.has(item.id)) throw new Error(`Podvojen ID v modulu logike: ${item.id}`);
      ids.add(item.id);
    }
  }

  window.ADM_MODULE_LOGIC = { topics, flashcards, quiz, questions, exercises };
})();
