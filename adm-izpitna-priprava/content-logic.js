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
        "Znam vseh pet glavnih resničnostnih tabel.",
        "Znam našteti vsa določila brez izpuščanja.",
        "Znam uporabiti De Morganova zakona in odpraviti implikacijo.",
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
          title: "Predikat, mestnost in izjavna formula",
          html: `<p><strong>Predikat</strong> je simbol za lastnost ali relacijo. Zapis \\(P(x)\\) je enomesten, \\(R(x,y)\\) dvomesten, \\(T(x,y,z)\\) tromesten. Število argumentov je njegova <em>mestnost</em>.</p>
          <p>Formula z nedoločeno spremenljivko še nima nujno logične vrednosti. Izjava postane šele, ko vse proste spremenljivke nadomestimo s konkretnimi objekti ali jih vežemo s kvantifikatorji.</p>`
        },
        {
          id: "pr-interpretacija",
          kind: "definition",
          label: "Semantika",
          title: "Kaj vsebuje interpretacija",
          html: `<p>Interpretacija določi:</p>
          <ol>
            <li>neprazno področje pogovora \\(U\\);</li>
            <li>pomen vsakega predikata in morebitnih konstant;</li>
            <li>vrednosti prostih spremenljivk oziroma njihovo vezavo.</li>
          </ol>
          <p>Ista formula je lahko pri eni interpretaciji resnična in pri drugi napačna. Formula \\(\\forall y\\exists x(x<y)\\) je na \\(\\mathbb R\\) resnična, na \\(\\mathbb N=\\{1,2,\\ldots\\}\\) pa napačna.</p>`
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
          label: "Temelj",
          title: "Pripadnost, vsebovanost in enakost",
          html: `<p>Množica je zbirka objektov. Končno množico lahko podamo z naštevanjem, na primer \\(A=\\{2,3,5,7\\}\\), splošno pa s pogojem \\(\\{x:P(x)\\}\\). Zapis \\(x\\in A\\) pomeni, da je \\(x\\) element množice \\(A\\). Vsebovanost je</p>
          \\[A\\subseteq B\\iff\\forall x(x\\in A\\Rightarrow x\\in B).\\]
          <p>Enakost je ekstenzionalna:</p>
          \\[A=B\\iff\\forall x(x\\in A\\Leftrightarrow x\\in B)\\iff A\\subseteq B\\land B\\subseteq A.\\]
          <p>Prava podmnožica izpolnjuje \\(A\\subseteq B\\) in \\(A\\ne B\\). <strong>Prazna množica</strong> \\(\\varnothing\\) nima nobenega elementa; zato je podmnožica vsake množice.</p>`
        },
        {
          id: "mp-operacije",
          kind: "definition",
          label: "Operacije",
          title: "Unija, presek, razlika in komplement",
          html: `\\[A\\cup B=\\{x:x\\in A\\lor x\\in B\\},\\qquad
          A\\cap B=\\{x:x\\in A\\land x\\in B\\}.\\]
          \\[A\\setminus B=\\{x:x\\in A\\land x\\notin B\\},\\qquad
          A\\oplus B=A\\triangle B=(A\\setminus B)\\cup(B\\setminus A)=(A\\cup B)\\setminus(A\\cap B).\\]
          <p>Če je izbrana univerzalna množica \\(U\\), je komplement</p>
          \\[A^c=U\\setminus A=\\{x\\in U:x\\notin A\\}.\\]
          <p>Komplement je vedno relativen glede na \\(U\\); brez univerzuma zapis ni popolnoma določen.</p>`
        },
        {
          id: "mp-zakoni",
          kind: "theorem",
          label: "Algebra množic",
          title: "Vsi osnovni zakoni iz poglavja 3.2",
          html: `<div class="formula-grid">
            <p>\\(A\\cap B=B\\cap A\\), \\(A\\cup B=B\\cup A\\)</p>
            <p>\\((A\\cap B)\\cap C=A\\cap(B\\cap C)\\)</p>
            <p>\\((A\\cup B)\\cup C=A\\cup(B\\cup C)\\)</p>
            <p>\\(A\\cap(B\\cup C)=(A\\cap B)\\cup(A\\cap C)\\)</p>
            <p>\\(A\\cup(B\\cap C)=(A\\cup B)\\cap(A\\cup C)\\)</p>
            <p>\\((A\\cap B)^c=A^c\\cup B^c\\)</p>
            <p>\\((A\\cup B)^c=A^c\\cap B^c\\)</p>
            <p>\\(A\\cap(A\\cup B)=A\\), \\(A\\cup(A\\cap B)=A\\)</p>
            <p>\\(A\\cap A=A\\), \\(A\\cup A=A\\)</p>
            <p>\\(A\\cap\\varnothing=\\varnothing\\), \\(A\\cup\\varnothing=A\\)</p>
          </div>
          <p>To so komutativnost, asociativnost, obe distributivnosti, De Morganova zakona, absorpciji, idempotentnost in pravili s prazno množico. Najčistejši dokaz je elementni: za poljuben \\(x\\) prevedemo pripadnost v logično formulo in uporabimo istoimensko logično enakovrednost. Na primer</p>
          \\[x\\in(A\\cap B)^c\\iff\\neg(x\\in A\\land x\\in B)\\iff x\\in A^c\\lor x\\in B^c.\\]`
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
          title: "Unija in presek družine",
          html: `<p>Za družino \\(\\mathcal D\\) množic:</p>
          \\[\\bigcup\\mathcal D=\\{x:\\exists A\\in\\mathcal D,\\ x\\in A\\},\\]
          \\[\\bigcap\\mathcal D=\\{x:\\forall A\\in\\mathcal D,\\ x\\in A\\}.\\]
          <p>Če je \\(\\mathcal D=\\{A_i:i\\in I\\}\\), pišemo \\(\\bigcup_{i\\in I}A_i\\) in \\(\\bigcap_{i\\in I}A_i\\). Pri uniji iščemo <em>vsaj en</em> indeks, pri preseku mora pogoj veljati za <em>vsak</em> indeks.</p>`
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
          label: "Konstrukcije",
          title: "Potenčna množica in kartezični produkt",
          html: `<p>Potenčna množica vsebuje vse podmnožice:</p>
          \\[\\mathcal P(A)=\\{B:B\\subseteq A\\}.\\]
          <p>Če je \\(|A|=n\\), je \\(|\\mathcal P(A)|=2^n\\), ker za vsak element neodvisno izberemo »je v podmnožici« ali »ni«.</p>
          <p>Kartezični produkt je</p>
          \\[A\\times B=\\{(a,b):a\\in A,\\ b\\in B\\}.\\]
          <p>Urejena para sta enaka natanko tedaj, ko sta enaki ustrezni komponenti:</p>
          \\[(a,b)=(c,d)\\iff a=c\\land b=d.\\]
          <p>Vrstni red komponent je pomemben; na splošno \\(A\\times B\\ne B\\times A\\). Za končni množici velja \\(|A\\times B|=|A||B|\\). Splošni produkt \\(A_1\\times\\cdots\\times A_n\\) sestavljajo urejene n-terice \\((a_1,\\ldots,a_n)\\) z \\(a_i\\in A_i\\) za vsak i.</p>`
        },
        {
          id: "mp-preslikava",
          kind: "definition",
          label: "Preslikave",
          title: "Domena, kodomena in slika",
          html: `<p>Preslikava \\(f:A\\to B\\) vsakemu \\(a\\in A\\) priredi natanko en element \\(f(a)\\in B\\). \\(A\\) je domena, \\(B\\) kodomena,</p>
          \\[\\operatorname{Im}f=\\{f(a):a\\in A\\}\\]
          <p>pa slika. Predslika množice \\(C\\subseteq B\\) je \\(f^{-1}(C)=\\{a\\in A:f(a)\\in C\\}\\); ta zapis ne zahteva, da je \\(f\\) obrnljiva.</p>`
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
        "Razlikujem \\(\\in\\) in \\(\\subseteq\\).",
        "Enakost množic dokažem v obe smeri.",
        "Znam oba De Morganova zakona.",
        "Intervale z neskončnostjo zapišem pravilno.",
        "Znam našteti potenčno množico in kartezični produkt.",
        "Injektivnost in surjektivnost preverjam po definiciji."
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
          title: "Relacija kot množica urejenih parov",
          html: `<p>\\(n\\)-mestna relacija na \\(A\\) je podmnožica \\(A^n\\). Dvomestna relacija je \\(R\\subseteq A\\times A\\); namesto \\((x,y)\\in R\\) pišemo \\(xRy\\).</p>
          <p>Pri končni množici jo lahko predstavimo z usmerjenim grafom: elementi so vozlišča, lok \\(x\\to y\\) obstaja natanko tedaj, ko \\(xRy\\). Zanka pri \\(x\\) predstavlja \\(xRx\\).</p>`
        },
        {
          id: "ru-domena",
          kind: "definition",
          label: "Osnovni podatki",
          title: "Domena, zaloga vrednosti, inverz in kompozicija",
          html: `\\[D_R=\\{x:\\exists y\\ xRy\\},\\qquad Z_R=\\{y:\\exists x\\ xRy\\}.\\]
          <p>Polje relacije je \\(D_R\\cup Z_R\\). Inverzna relacija je določena z \\(xR^{-1}y\\iff yRx\\). Za \\(R,S\\subseteq A^2\\) definiramo</p>
          \\[x(S\\circ R)z\\iff\\exists y\\,(xRy\\land ySz).\\]
          <p>V grafu inverz obrne vse puščice, kompozicija pa poveže krajišči usmerjenega sprehoda dolžine 2.</p>`
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
      prompt: "Definiraj izjavo, izjavni izraz in določilo. Pojasni razliko med sintakso in semantiko.",
      answer: "Izjava je smiseln povedni stavek z natanko eno logično vrednostjo 0 ali 1. Izjavni izraz je po induktivnih sintaktičnih pravilih iz konstant, izjavnih spremenljivk in veznikov zgrajena formula. Določilo priredi vsaki nastopajoči spremenljivki vrednost 0 ali 1. Sintaksa pove, kateri nizi so pravilno zgrajeni; semantika določi njihovo vrednost pri posameznem določilu.",
      hint: "Loči vprašanje »ali je zapis dovoljen?« od vprašanja »ali je resničen?«.",
      rubric: ["definicija izjave", "induktivna narava izjavnega izraza", "definicija določila", "sintaksa proti semantiki"],
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
      prompt: "Definiraj vsebovanost in enakost množic ter opiši standardni dokaz enakosti z dvojno vsebovanostjo.",
      answer: "\\(A\\subseteq B\\) pomeni \\(\\forall x(x\\in A\\Rightarrow x\\in B)\\). Množici sta enaki, če imata iste elemente, oziroma če veljata obe vsebovanosti. V prvem delu vzamemo poljuben \\(x\\in A\\) in izpeljemo \\(x\\in B\\); v drugem zamenjamo vlogi. Šele oba dela dovolita sklep \\(A=B\\).",
      hint: "Enakost množic je ekvivalenca pogojev za pripadnost.",
      rubric: ["formalna definicija vsebovanosti", "ekstenzionalnost", "prva smer", "druga smer"],
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
      prompt: "Vprašanje iz teorijskega izpita: kdaj je sklep \\(A_1,\\ldots,A_k\\models B\\) veljaven? Navedi veljaven in neveljaven zgled ter oba popolnoma utemelji.",
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
      prompt: "Vprašanje iz teorijskega izpita: presodi tavtološkost formul \\((p\\land q)\\Rightarrow(p\\lor q)\\), \\(\\neg(p\\Rightarrow q)\\Leftrightarrow(\\neg p\\Rightarrow\\neg q)\\) in \\((p\\land(p\\Rightarrow q))\\Leftrightarrow q\\).",
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
      prompt: "Vprašanje iz teorijskega izpita: na premicah v ravnini naj \\(P(x,y)\\) pomeni pravokotnost, \\(Q(x,y)\\) vzporednost. Zapiši štiri zahtevane trditve.",
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
      prompt: "Zbirka zahteva resnično in neresnično interpretacijo formule \\(\\forall x\\exists y(P(y,x)\\Rightarrow P(x,y))\\). Ali je zahteva za zapisano formulo izvedljiva?",
      answer: "Ne. Formula je splošno veljavna na vsakem nepraznem področju pogovora. Za poljuben \\(x\\) izberemo \\(y=x\\); jedro postane \\(P(x,x)\\Rightarrow P(x,x)\\), ki je vedno resnično. Zato resnično interpretacijo lahko navedemo poljubno, neresnična pa ne obstaja. Natisnjeno vprašanje mora vsebovati tipkarsko napako ali manjkajoči pogoj, na primer \\(y\\ne x\\).",
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
      prompt: "Naštej vse zakone operacij z množicami iz razdelka 3.2 in pojasni splošno metodo njihovega dokazovanja.",
      answer: "Unija in presek sta komutativna, asociativna, idempotentna in distributivna drug glede na drugega. Veljata De Morganova zakona, absorpciji \\(A\\cap(A\\cup B)=A\\), \\(A\\cup(A\\cap B)=A\\), ter \\(A\\cap\\varnothing=\\varnothing\\), \\(A\\cup\\varnothing=A\\). Dokazujemo elementno: vzamemo poljuben \\(x\\), pripadnost obema stranema prevedemo v logični formuli in uporabimo ustrezno logično enakovrednost; ker sta pogoja enakovredna za vsak \\(x\\), sta množici enaki.",
      hint: "Skupine zakonov: K-A-D, De Morgan, absorpcija, idempotentnost, prazna množica.",
      rubric: ["komutativnost in asociativnost", "obe distributivnosti", "De Morgan in absorpcija", "idempotentnost, prazna množica in metoda dokaza"],
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
      prompt: "Utemelji tri identitete iz zapiskov: \\(\\bigcap_{n\\ge1}[0,1/n)=\\{0\\}\\), \\(\\bigcap_{n\\ge1}(0,1/n]=\\varnothing\\) in \\(\\bigcup_{n\\ge1}[1/n,1]=(0,1]\\).",
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
      prompt: "Vprašanje iz teorijskega izpita: definiraj irefleksivnost in asimetričnost ter dokaži, da je vsaka asimetrična relacija irefleksivna.",
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
      prompt: "Formalno definiraj vseh osem lastnosti relacij iz MnozRel.pdf in za vsako povej, kako se vidi v usmerjenem grafu.",
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
      prompt: "Dokaži Trditev 4.6 in iz nje izpelji zvezi med linearnimi in delnimi urejenostmi.",
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
      prompt: H`Razloži razliko med jezikom, interpretacijo, formulo in izjavo predikatnega računa. Zakaj ista formula v dveh interpretacijah nima nujno iste vrednosti?`,
      answer: H`Jezik določi nelogične simbole: konstante, funkcijske simbole in predikate z njihovimi mestnostmi; logični simboli so vezniki, kvantifikatorji, spremenljivke in enakost. Formula je sintaktično pravilno zgrajen zapis v tem jeziku. Interpretacija izbere neprazno področje pogovora \(U\), vsaki konstanti priredi element \(U\), funkcijskemu simbolu ustrezno funkcijo in \(k\)-mestnemu predikatu relacijo na \(U^k\); prostim spremenljivkam mora prirediti še vrednosti. Zaprta formula brez prostih spremenljivk je v dani interpretaciji izjava in ima določeno resničnostno vrednost. Ista formula lahko spremeni vrednost, ker interpretacija spremeni pomen simbolov. Formula \(\forall x P(x)\) je na \(U=\mathbb N\) resnična, če \(P(x)\) pomeni \(x=x\), in napačna, če pomeni \(x<0\). Zato splošna veljavnost zahteva resničnost v vseh interpretacijah, ne le v enem izbranem modelu. Pogosta napaka je govoriti o resničnosti odprte formule, ne da bi podali vrednosti njenih prostih spremenljivk.`,
      hint: H`Sintaksa pove zapis; interpretacija mu priredi matematični pomen.`,
      rubric: ["jezik in formula", "vsi deli interpretacije", "zaprta proti odprti formuli", "dve interpretaciji iste formule"],
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
      prompt: H`Na primeru kongruence modulo \(m\) določi ekvivalenčne razrede in faktorsko množico ter preveri temeljni izrek o razbitju.`,
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
