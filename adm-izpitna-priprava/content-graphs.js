(() => {
  "use strict";

  const H = String.raw;
  const GROUP = "grafi";

  const topics = [
    {
      id: "grafi-osnove",
      number: 10,
      group: GROUP,
      title: "Grafi: definicije, poti, razdalje in družine",
      short: "Celotno poglavje 11 iz ADM-Grafi.pdf: grafi, stopnje, podgrafi, sprehodi, povezanost in standardne družine.",
      accent: "#74d9ec",
      minutes: 95,
      importance: "nujno",
      sources: ["grafi"],
      examNote: "Teorijsko jedro je povzeto iz 11. poglavja ADM-Grafi.pdf. Naučiti se moraš natančne definicije in pogoje, ne le prepoznati risbe.",
      outcomes: [
        "natančno definirati enostavni graf, multigraf in usmerjeni graf",
        "uporabiti sosednost, incidenco, sosedstvo, red in velikost grafa",
        "definirati komplement in izomorfizem ter uporabiti grafne invariante",
        "izračunati stopnje ter uporabiti lemo o rokovanju in njeno paritetno posledico",
        "ločiti podgraf, inducirani podgraf in vpeti podgraf",
        "prepoznati sprehod, sled, pot, obhod in cikel",
        "dokazati, da iz sprehoda dobimo nič daljšo pot",
        "določiti komponente, razdaljo, premer in notranji obseg",
        "poznati definicije in parametre vseh standardnih družin iz PDF-ja",
        "natančno definirati dvodelen graf in množici njegovega dvodelnega razbitja"
      ],
      sections: [
        {
          id: "go-graf-definicija",
          kind: "definition",
          label: "Temelj",
          title: "Graf, multigraf in usmerjeni graf",
          html: H`
            <p><strong>Enostavni neusmerjeni graf</strong> je par \(G=(V,E)\), kjer je \(V\) neprazna množica vozlišč, \(E\subseteq\binom V2\) pa množica neurejenih parov različnih vozlišč. Povezavo \(\{u,v\}\) pišemo tudi \(uv\); tedaj sta \(u,v\) sosednji vozlišči.</p>
            <p><strong>Multigraf</strong> formalno zapišemo \(G=(V,E,\partial)\), kjer \(\partial:E\to\operatorname{MSet}_2(V)\) vsaki posamezni povezavi priredi neurejeno multimnožico dveh krajišč. Zato imata lahko različni povezavi ista krajišča, pri zanki pa se isto krajišče pojavi dvakrat in k njegovi stopnji prispeva 2. <strong>Enostavni usmerjeni graf</strong> je \(D=(V,A)\) z \(A\subseteq V\times V\); pri loku \((u,v)\) razlikujemo rep \(u\), glavo \(v\) ter vhodno in izhodno stopnjo.</p>
            <div class="comparison-grid">
              <div class="mini-card"><strong>Enostavni graf</strong><p>Brez zank in brez vzporednih povezav.</p></div>
              <div class="mini-card"><strong>Multigraf</strong><p>Zanke in vzporedne povezave so dovoljene, če naloga tako pove.</p></div>
              <div class="mini-card"><strong>Usmerjeni graf</strong><p>\((u,v)\) in \((v,u)\) sta različni povezavi.</p></div>
            </div>
            <blockquote>Risba ni graf: isti abstraktni graf lahko narišemo na mnogo načinov. Enostavni graf določata \(V,E\), multigraf pa poleg \(V,E\) še preslikava krajišč \(\partial\).</blockquote>`
        },
        {
          id: "go-sosednost-incidenca",
          kind: "definition",
          label: "Osnovni jezik",
          title: "Sosednost, incidenca, red, velikost in sosedstvo",
          html: H`
            <p>V enostavnem grafu iz \(uv\in E(G)\) sledi, da sta \(u\) in \(v\) <strong>sosednji vozlišči</strong>, povezava \(uv\) pa je <strong>incidentna</strong> z obema krajiščema. V multigrafu je povezava \(e\) incidentna z vsakim krajiščem, ki nastopa v \(\partial(e)\), vozlišči \(u,v\) pa sta sosednji, če ima kaka povezava prav ti krajišči. <strong>Odprto sosedstvo</strong> vozlišča vsebuje različna sosednja vozlišča; v enostavnem grafu je \(N_G(v)=\{u\in V(G):uv\in E(G)\}\), zaprto pa \(N_G[v]=N_G(v)\cup\{v\}\).</p>
            <p><strong>Red</strong> grafa je \(|V(G)|\), njegova <strong>velikost</strong> pa \(|E(G)|\). V enostavnem grafu je \(\deg_G(v)=|N_G(v)|\); v multigrafu ta enačba zaradi vzporednih povezav in zank na splošno ne velja, zato stopnjo štejemo z incidencami.</p>
            <p><strong>Primer.</strong> V poti \(P_4=v_1v_2v_3v_4\) je \(N(v_2)=\{v_1,v_3\}\), red je 4, velikost 3 in \(\deg(v_2)=2\). Izolirano vozlišče ima prazno odprto sosedstvo.</p>`
        },
        {
          id: "go-komplement-izomorfizem",
          kind: "definition",
          label: "Graf ni njegova risba",
          title: "Komplement in izomorfizem grafov",
          html: H`
            <p>Za enostaven graf \(G\) je <strong>komplement</strong> \(\overline G\) graf na isti množici vozlišč, v katerem sta različni vozlišči povezani natanko tedaj, ko v \(G\) nista povezani:</p>
            <div class="formula-panel">\[uv\in E(\overline G)\iff u\ne v\land uv\notin E(G).\]</div>
            <p>Grafa \(G\) in \(H\) sta <strong>izomorfna</strong>, če obstaja bijekcija \(\varphi:V(G)\to V(H)\), ki ohranja sosednost v obe smeri:</p>
            <div class="formula-panel">\[uv\in E(G)\iff \varphi(u)\varphi(v)\in E(H).\]</div>
            <p>Izomorfizem ohrani red, velikost, zaporedje stopenj, število komponent, dolžine ciklov, dvodelnost in kromatično število. Zato različna vrednost kateregakoli invarianta dokaže neizomorfnost. Enakost samo nekaterih invariantov še ne zadošča: \(C_6\) in \(C_3\mathbin{\dot\cup}C_3\) imata šest vozlišč, šest povezav in same stopnje 2, vendar je prvi povezan, drugi pa ne. Primer torej pokaže natančno to, da red, velikost in zaporedje stopenj skupaj niso zadosten test.</p>
            <p>Če je \(\varphi:G\to H\) izomorfizem, ista bijekcija izomorfno preslika tudi \(\overline G\) na \(\overline H\). Zapis \(G\cong H\) pomeni enakost strukture, ne dobesedne enakosti množic vozlišč.</p>`
        },
        {
          id: "go-stopnje",
          kind: "definition",
          label: "Lokalni podatki",
          title: "Stopnja, izolirana vozlišča in regularnost",
          html: H`
            <p><strong>Stopnja</strong> oziroma valenca vozlišča \(v\), označena z \(\deg_G(v)\), je število povezav, ki imajo \(v\) za krajišče. Izolirano vozlišče ima stopnjo 0. <strong>List</strong> je po definiciji iz PDF-ja vozlišče stopnje 1.</p>
            <p><strong>Robni primer:</strong> edino vozlišče drevesa \(K_1\) ima stopnjo 0, zato ni list. Zato trditev »drevo ima vsaj dva lista« vedno zahteva vsaj dve vozlišči.</p>
            <p>Pišemo \(\delta(G)=\min_v\deg(v)\) in \(\Delta(G)=\max_v\deg(v)\). Graf je <strong>\(k\)-regularen</strong>, če ima vsako vozlišče stopnjo \(k\). Tedaj je \(k|V|=2|E|\).</p>
            <p>Pri usmerjenem grafu velja \(\sum_v\deg^+(v)=\sum_v\deg^-(v)=|E|\). Zanka v multigrafu prispeva eno vhodno in eno izhodno incidenco oziroma 2 k neusmerjeni stopnji.</p>`
        },
        {
          id: "go-rokovanje",
          kind: "theorem",
          label: "Izpitno jedro",
          title: "Lema o rokovanju",
          html: H`
            <p><strong>Lema.</strong> Za vsak končen neusmerjeni graf oziroma multigraf velja</p>
            <div class="formula-panel">\[\sum_{v\in V(G)}\deg(v)=2|E(G)|.\]</div>
            <p><strong>Dokaz z dvojnim štetjem.</strong> Preštejmo incidence \((v,e)\), kjer je \(v\) krajišče povezave \(e\). Po vozliščih dobimo vsoto stopenj. Vsaka povezava ima dve krajišči, zanka pa po dogovoru prispeva dve incidenci, zato po povezavah dobimo \(2|E|\).</p>
            <p><strong>Posledica.</strong> Vsak graf ima sodo mnogo vozlišč lihe stopnje. Ker je desna stran soda, mora biti v vsoti na levi sodo mnogo lihih členov.</p>
            <blockquote>To je hiter test neobstoja, ne pa popolna karakterizacija stopnjevalnih zaporedij: soda vsota še ne zagotavlja, da zaporedje realizira enostaven graf.</blockquote>`
        },
        {
          id: "go-podgrafi",
          kind: "definition",
          label: "Vsebovanost",
          title: "Podgraf, inducirani in vpeti podgraf",
          html: H`
            <p>Graf \(H\) je <strong>podgraf</strong> grafa \(G\), če je \(V(H)\subseteq V(G)\) in \(E(H)\subseteq E(G)\). Je <strong>vpet</strong>, če ima vsa vozlišča grafa \(G\).</p>
            <p>Za \(U\subseteq V(G)\) je <strong>inducirani podgraf</strong> \(G[U]\) graf z vozlišči \(U\) in vsemi povezavami grafa \(G\), ki imata obe krajišči v \(U\). Pri induciranem podgrafu povezav med izbranimi vozlišči ne smemo poljubno brisati.</p>
            <p>Brisanje povezave označimo z \(G-e\), brisanje vozlišča z \(G-v\). Vpeti podgraf lahko izgubi povezave, ne pa vozlišč.</p>`
        },
        {
          id: "go-sprehodi",
          kind: "definition",
          label: "Gibanje po grafu",
          title: "Sprehod, sled, pot, obhod in cikel",
          html: H`
            <ul>
              <li><strong>Sprehod</strong> je zaporedje \(v_0v_1\ldots v_k\), kjer sta zaporedni vozlišči sosednji.</li>
              <li><strong>Sled</strong> oziroma enostaven sprehod ne ponovi nobene povezave.</li>
              <li><strong>Pot</strong> ne ponovi nobenega vozlišča.</li>
              <li><strong>Obhod</strong> je sklenjen sprehod, \(v_0=v_k\).</li>
              <li><strong>Cikel</strong> je v enostavnem grafu sklenjena pot dolžine vsaj 3, pri kateri se ponovita le prvo in zadnje vozlišče. V multigrafu je treba posebej povedati, ali zanko oziroma dve vzporedni povezavi štejemo kot cikel dolžine 1 oziroma 2.</li>
            </ul>
            <p>Dolžina je število uporabljenih povezav. Dovoljen je tudi sprehod dolžine 0, sestavljen iz enega vozlišča; to je pot, ne pa cikel. Vsaka pot je sled in vsak sled je sprehod, obratno pa ne velja.</p>
            <p><strong>Lema 11.3.</strong> Če med vozliščema obstaja sprehod dolžine \(k\), med njima obstaja pot dolžine največ \(k\).</p>
            <p><strong>Dokaz.</strong> Med vsemi sprehodi med krajiščema izberemo najkrajšega. Če bi se v njem ponovilo vozlišče \(v_i=v_j\) za \(i\lt j\), bi zaprti del med obema pojavoma izbrisali in dobili krajši sprehod z istima krajiščema. To je protislovje, zato najkrajši sprehod nima ponovljenih vozlišč in je pot.</p>`
        },
        {
          id: "go-povezanost-razdalje",
          kind: "definition",
          label: "Globalna zgradba",
          title: "Komponente, razdalja, premer in notranji obseg",
          html: H`
            <p>Vozlišči sta v isti <strong>povezani komponenti</strong>, če med njima obstaja pot. To je ekvivalenčna relacija. Graf je povezan, če ima eno komponento.</p>
            <p>Relacija »biti v isti povezani komponenti« je ekvivalenčna: refleksivnost da sprehod dolžine 0, simetričnost obrnjen sprehod, tranzitivnost pa stikovanje sprehodov. Njeni ekvivalenčni razredi so <strong>povezane komponente</strong>. Graf je povezan, če ima eno komponento.</p>
            <p>Razdalja \(d_G(u,v)\) je dolžina najkrajše poti; če poti ni, je \(d_G(u,v)=\infty\). Na vozliščih povezanega grafa je to metrika: je nenegativna, enaka 0 natanko za \(u=v\), simetrična in zadošča trikotniški neenakosti, ker lahko najkrajši poti staknemo v sprehod in nato skrajšamo v pot.</p>
            <div class="formula-panel">\[\operatorname{diam}(G)=\max\{d_G(u,v):u,v\in V(G)\}.\]</div>
            <p><strong>Notranji obseg</strong> oziroma <strong>ožina</strong> je dolžina najkrajšega cikla. PDF za graf brez ciklov ne predpiše posebne številske vrednosti; varno rečemo, da takega cikla ni.</p>`
        },
        {
          id: "go-standardne-druzine",
          kind: "example",
          label: "Na pamet",
          title: "Standardne družine grafov",
          html: H`
            <table class="data-table">
              <thead><tr><th>Graf</th><th>Vozlišča / povezave</th><th>Ključne lastnosti</th></tr></thead>
              <tbody>
                <tr><td>\(K_n\)</td><td>\(n\), \(\binom n2\)</td><td>\((n-1)\)-regularen; dvodelen le za \(n=1,2\)</td></tr>
                <tr><td>\(P_n\)</td><td>\(n\), \(n-1\)</td><td>dolžina \(n-1\); vsak \(P_n\) je dvodelen; \(P_1=K_1, P_2=K_2\)</td></tr>
                <tr><td>\(C_n\), \(n\ge3\)</td><td>\(n\), \(n\)</td><td>2-regularen; dvodelen natanko za sodi \(n\); \(C_3\) je trikotnik</td></tr>
                <tr><td>\(K_{m,n}\)</td><td>\(m+n\), \(mn\)</td><td>dvodelen; regularen natanko za \(m=n\); \(K_{1,n}\) je zvezda</td></tr>
                <tr><td>\(Q_d\)</td><td>\(2^d\), \(d2^{d-1}\)</td><td>\(d\)-regularen in dvodelen; \(Q_0=K_1\)</td></tr>
                <tr><td>\(W_n\), \(n\ge3\)</td><td>\(n+1\), \(2n\)</td><td>\(\delta=3,\Delta=n\); regularen le \(W_3\cong K_4\); nikoli dvodelen</td></tr>
                <tr><td>\(P_{n,k}\)</td><td>\(2n\)</td><td>posplošeni Petersenov graf; dvodelen natanko za sodi \(n\) in lihi \(k\)</td></tr>
              </tbody>
            </table>
            <p>Pri hiperkocki so vozlišča binarni nizi dolžine \(d\); sosednja sta, če se razlikujeta v natanko enem bitu. Dvodelnost dobimo po pariteti števila ničel (enakovredno po pariteti števila enic, le razreda se lahko zamenjata).</p>
            <p>Kolo je določeno z \(V(W_n)=\mathbb Z_n\cup\{\infty\}\) in povezavami \(u(u+1)\) ter \(u\infty\). Za \(P_{n,k}\) so vozlišča \(u_i,v_i\), povezave pa \(u_iu_{i+1},u_iv_i,v_iv_{i+k}\) za \(i\in\mathbb Z_n\). Če \(n\ne2k\), ima \(P_{n,k}\) \(3n\) povezav in je kubičen; če \(n=2k\), ima \(5n/2\) povezav.</p>
            <p>Vsak 2-regularen končen graf je disjunktna unija ciklov. V svetu multigrafov lahko govorimo še o \(C_1\) (zanka) in \(C_2\) (dve vzporedni povezavi).</p>`
        },
        {
          id: "go-dvodelnost",
          kind: "definition",
          label: "Definicija iz PDF-ja",
          title: "Dvodelen graf in dvodelno razbitje",
          html: H`
            <p>Graf je <strong>dvodelen</strong>, če lahko \(V=A\mathbin{\dot\cup}B\) tako, da vsaka povezava poveže eno vozlišče iz \(A\) in eno iz \(B\).</p>
            <p>Množici \(A\) in \(B\) sta <strong>množici dvodelnega razbitja</strong>. Dovoljeno je, da je ena od njiju prazna, zato je na primer \(K_1\) dvodelen. Vsaka povezava mora imeti krajišči v različnih delih; povezav znotraj \(A\) ali znotraj \(B\) ni.</p>`
        },
        {
          id: "go-primer",
          kind: "example",
          label: "Delan primer",
          title: "Analiza grafa iz množice povezav",
          html: H`
            <p>Naj bo \(V=\{1,2,3,4,5\}\) in \(E=\{12,23,34,41,15\}\). Stopnje so \((3,2,2,2,1)\); vsota 10 potrdi \(|E|=5\). Graf je povezan. Cikel \(1,2,3,4,1\) je sod, dodani list ne ustvari cikla, zato je graf dvodelen, na primer z deloma \(\{1,3\}\) in \(\{2,4,5\}\).</p>
            <p>Najdaljša najkrajša pot je med 5 in 3 in ima dolžino 3, zato je premer 3. Notranji obseg je 4.</p>`
        },
        {
          id: "go-pasti",
          kind: "pitfall",
          label: "Izpitne pasti",
          title: "Kaj najpogosteje zamenjamo",
          html: H`
            <ul>
              <li>Pot ne ponavlja vozlišč; sled ne ponavlja povezav.</li>
              <li>Pri dokazovanju dvodelnosti moraš podati razbitje \(V=A\mathbin{\dot\cup}B\) in preveriti vse povezave.</li>
              <li>Pri multigrafu zanka prispeva 2 k stopnji.</li>
              <li>Diameter nepovezanega grafa je po običajni konvenciji neskončen oziroma ga obravnavamo po komponentah.</li>
            </ul>`
        },
        {
          id: "go-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Jedro teme",
          html: H`
            <p>Graf je \(V\) skupaj z družino dvoelementnih množic povezav. Vsota stopenj je \(2|E|\), zato je lihih stopenj sodo mnogo. Najkrajši sprehod med krajiščema je pot. Povezanost razdeli graf na komponente; razdalja je dolžina najkrajše poti, premer največja razdalja. Na pamet poznaj \(K_n,P_n,C_n,K_{m,n},Q_d,W_n\) in \(P_{n,k}\).</p>`
        }
      ],
      checklist: [
        "Znam iz množice povezav izračunati vse stopnje in preveriti lemo o rokovanju.",
        "Ločim graf, multigraf in usmerjeni graf.",
        "Znam definirati sosedstvo, red, velikost, komplement in izomorfizem.",
        "Ločim podgraf, inducirani podgraf in vpeti podgraf.",
        "Ločim sprehod, sled, pot, obhod in cikel.",
        "Znam določiti komponente, razdalje, premer in notranji obseg.",
        "Poznam parametre standardnih družin grafov.",
        "Znam zapisati množici dvodelnega razbitja in preveriti definicijo."
      ]
    },
    {
      id: "drevesa-vpeta",
      number: 11,
      group: GROUP,
      title: "Drevesa in vpeta drevesa",
      short: "Ekvivalentne karakterizacije, listi, vpeta drevesa, brisanje–krčenje in Kirchhoffov izrek.",
      accent: "#67dfb1",
      minutes: 90,
      importance: "zelo visoka",
      sources: ["grafi"],
      examNote: "Teorijsko jedro je celotno 12. poglavje ADM-Grafi.pdf: pet ekvivalentnih opisov drevesa, listi, vpeta drevesa, brisanje–krčenje, Laplacova matrika, Kirchhoff in Cayley.",
      outcomes: [
        "navesti in uporabljati ekvivalentne karakterizacije drevesa",
        "definirati gozd in most ter dokazati formulo \(|E|=|V|-k\)",
        "dokazati obstoj listov in opisati drevesa z natanko dvema listoma",
        "prepoznati vpeto drevo in kriterij povezanosti",
        "uporabiti rekurzijo brisanje–krčenje",
        "sestaviti Laplacovo matriko in uporabiti Kirchhoffov izrek",
        "poznati Cayleyjevo formulo in osnovna števila vpetih dreves"
      ],
      sections: [
        {
          id: "dv-drevo-def",
          kind: "definition",
          label: "Definicija",
          title: "Drevo",
          html: H`
            <p>V ADM-Grafi.pdf je <strong>drevo</strong> definirano kot graf, v katerem med poljubnima vozliščema obstaja natanko ena pot. Iz tega takoj sledi povezanost; ekvivalentno je drevo povezan graf brez ciklov.</p>
            <p><strong>List</strong> je vozlišče stopnje 1. Posebej: \(K_1\) je drevo, toda njegovo edino vozlišče ima stopnjo 0 in po tej definiciji ni list.</p>
            <blockquote>Ne zamenjaj dveh pomenov besede list: pri tukajšnjih neusmerjenih grafih pomeni stopnjo 1. Drugačne konvencije za ukoreninjena drevesa niso del tega PDF-ja.</blockquote>`
        },
        {
          id: "dv-gozd-most",
          kind: "theorem",
          label: "Osnovni pojmi in posledici",
          title: "Gozd, most in povezave brez cikla",
          html: H`
            <p><strong>Gozd</strong> je graf brez ciklov; njegove povezane komponente so drevesa. Če ima gozd \(n\) vozlišč in \(k\) komponent, potem</p>
            <div class="formula-panel">\[|E|=n-k.\]</div>
            <p><strong>Dokaz.</strong> Če ima \(i\)-ta komponenta \(n_i\) vozlišč, je drevo in ima \(n_i-1\) povezav. Seštevanje da \(\sum_i(n_i-1)=n-k\). Posebej je drevo natanko povezan gozd in ima \(n-1\) povezav.</p>
            <p>Povezava \(e\) je <strong>most</strong>, če ima \(G-e\) več komponent kot \(G\). Povezava je most natanko tedaj, ko ne leži na nobenem ciklu: povezava na ciklu ima obvoz po preostanku cikla, če pa obstaja obvoz med njenima krajiščema, obvoz skupaj z njo tvori cikel.</p>
            <p>Zato je v drevesu vsaka povezava most. Izbris ene povezave drevesa ustvari natanko dve komponenti; dodajanje nove povezave med dvema njegovima vozliščema pa ustvari natanko en cikel.</p>`
        },
        {
          id: "dv-ekvivalence",
          kind: "theorem",
          label: "Glavni izrek",
          title: "Pet obrazov istega drevesa",
          html: H`
            <p>Za končen graf \(T\) so ekvivalentne naslednje trditve iz Trditve 12.1:</p>
            <ol>
              <li>med vsakima vozliščema obstaja natanko ena pot;</li>
              <li>\(T\) je povezan in odstranitev poljubne povezave ga naredi nepovezanega;</li>
              <li>\(T\) je povezan in \(|E(T)|=|V(T)|-1\);</li>
              <li>\(T\) ne vsebuje cikla in \(|E(T)|=|V(T)|-1\);</li>
              <li>\(T\) je povezan in ne vsebuje cikla.</li>
            </ol>
            <blockquote>Enačba \(|E|=|V|-1\) sama ni dovolj. Graf \(C_3\mathbin{\dot\cup}K_1\) ima štiri vozlišča in tri povezave, pa ni drevo.</blockquote>`
        },
        {
          id: "dv-ekvivalence-dokaz",
          kind: "proof",
          label: "Ideja dokaza",
          title: "Kako povezujemo karakterizacije",
          html: H`
            <div class="proof-steps">
              <div class="proof-step"><p><strong>(1)⇒(2).</strong> Drevo je povezano. Za povezavo \(uv\) je sama povezava edina pot med \(u,v\); po njenem brisanju poti ni, zato graf razpade.</p></div>
              <div class="proof-step"><p><strong>(2)⇒(3).</strong> Indukcija po številu vozlišč. Po brisanju povezave nastaneta natanko dve komponenti, vsaka je spet minimalno povezana. Po indukciji imata \(|V_X|-1\) in \(|V_Y|-1\) povezav; z izbrisano povezavo vred je skupaj \(|V|-1\).</p></div>
              <div class="proof-step"><p><strong>(3)⇒(4).</strong> Če bi obstajal cikel \(C\), vzamemo vse njegove povezave in za vsako vozlišče zunaj \(C\) prvo povezavo na najkrajši poti do \(C\). Te povezave so paroma različne, zato bi bilo povezav vsaj \(|V(C)|+(|V|-|V(C)|)=|V|\), v protislovju z \(|E|=|V|-1\).</p></div>
              <div class="proof-step"><p><strong>(4)⇒(5).</strong> Naj ima acikličen graf \(k\) komponent. Vsaka komponenta je po indukciji drevo in ima \(n_i-1\) povezav, zato je skupaj \(n-k\). Enačba \(n-1\) prisili \(k=1\).</p></div>
              <div class="proof-step"><p><strong>(5)⇒(1).</strong> Povezanost da vsaj eno pot med vsakim parom. Dve različni poti bi skupaj vsebovali cikel, zato je pot natanko ena.</p></div>
            </div>
            <p>Robni primer \(K_1\) vse pogoje izpolni neposredno. Indukcijski dokaz v zapisu PDF-ja začne pri majhnih grafih; na ustnem izpitu je dobro \(K_1\) omeniti posebej.</p>`
        },
        {
          id: "dv-listi",
          kind: "theorem",
          label: "Posledica",
          title: "Vsako netrivialno drevo ima vsaj dva lista",
          html: H`
            <p><strong>Posledica 12.2.</strong> Drevo z vsaj dvema vozliščema ima vsaj dve vozlišči stopnje 1, torej vsaj dva lista. Izberemo najdaljšo pot \(v_0v_1\ldots v_k\). Če bi imel \(v_0\) poleg \(v_1\) še drugega soseda, ta zaradi acikličnosti ne bi ležal na poti in pot bi lahko podaljšali. Zato je \(\deg(v_0)=1\); enako velja za \(v_k\).</p>
            <p>Če ima drevo natanko dva lista, morajo imeti vsa druga vozlišča stopnjo 2, zato je drevo izomorfno poti. Obratno ima vsaka pot z vsaj dvema vozliščema natanko dva lista.</p>
            <p>Za računanje listov v drevesu z vsaj dvema vozliščema je uporabna identiteta</p>
            <div class="formula-panel">\[L=2+\sum_{\deg(v)\ge3}(\deg(v)-2),\]</div>
            <p>kjer je \(L\) število listov drevesa. Sledi iz \(\sum_v(\deg(v)-2)=-2\). Ta uporabna preurejena identiteta je razlaga posledice, ne dodatno poimenovan izrek v PDF-ju.</p>`
        },
        {
          id: "dv-vpeto-drevo",
          kind: "definition",
          label: "Definicija in kriterij",
          title: "Vpeto drevo",
          html: H`
            <p><strong>Vpeto drevo</strong> grafa \(G\) je vpet podgraf, ki je drevo: vsebuje vsa vozlišča in dovolj povezav, da ostane povezan brez ciklov.</p>
            <p><strong>Kriterij.</strong> Graf je povezan natanko tedaj, ko vsebuje vpeto drevo. Če je povezan in ima cikel, brišemo povezave ciklov; povezanost se ohranja. Postopek se konča pri povezanem acikličnem vpetem podgrafu.</p>
            <p>Število vpetih dreves označimo z \(\tau(G)\). Velja \(\tau(G)=0\) natanko tedaj, ko je graf nepovezan, in \(\tau(T)=1\) za vsako drevo \(T\).</p>`
        },
        {
          id: "dv-brisanje-krcenje",
          kind: "theorem",
          label: "Rekurzija",
          title: "Brisanje–krčenje",
          html: H`
            <p>Naj bo \(e\) povezava multigrafa \(G\), ki ni zanka. Tedaj</p>
            <div class="formula-panel">\[\tau(G)=\tau(G-e)+\tau(G/e).\]</div>
            <p>Vpeta drevesa razdelimo na tista brez \(e\), ki so vpeta drevesa grafa \(G-e\), in tista z \(e\). Pri slednjih \(e\) skrčimo; dobimo bijekcijo z vpetimi drevesi grafa \(G/e\).</p>
            <p>Zanka ne more biti del drevesa, zato lahko zanke, ki nastanejo pri krčenju, izbrišemo.</p>`
        },
        {
          id: "dv-laplacian",
          kind: "definition",
          label: "Matrika grafa",
          title: "Laplacova matrika",
          html: H`
            <p>Zanke najprej izbrišemo, saj ne pripadajo nobenemu vpetemu drevesu. Naj bo \(A\) matrika sosednosti tako dobljenega multigrafa, \(D=\operatorname{diag}(\deg v_1,\ldots,\deg v_n)\). <strong>Laplacova matrika</strong> je</p>
            <div class="formula-panel">\[L(G)=D-A.\]</div>
            <p>Vsota elementov vsake vrstice in stolpca je 0, zato je \(L\mathbf1=0\) in \(\det L=0\). Pri multigrafu je zunaj diagonale negativno število povezav med vozliščema.</p>
            <p>Za primer poti \(1-2-3\) je \(L=\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}\).</p>`
        },
        {
          id: "dv-kirchhoff",
          kind: "theorem",
          label: "Matrični izrek",
          title: "Kirchhoffov izrek o vpetih drevesih",
          html: H`
            <p><strong>Trditev 12.6 (matrični izrek o drevesih).</strong> Iz Laplacove matrike odstranimo poljubno vrstico \(i\) in poljuben stolpec \(j\). Absolutna vrednost determinante dobljene matrike je \(\tau(G)\):</p>
            <div class="formula-panel">\[\tau(G)=\left|\det L(G)_{ij}\right|.\]</div>
            <p>Če odstranimo isto indeksirano vrstico in stolpec, dobimo glavni minor in determinant je že nenegativen. Pri različnih indeksih nastopi le predznak kofaktorja, zato PDF pravilno zahteva absolutno vrednost. Rezultat je neodvisen od izbranega para. PDF izrek navede brez dokaza.</p>
            <blockquote>Ne računamo determinante celotne matrike \(L\): ta je vedno 0.</blockquote>`
        },
        {
          id: "dv-cayley",
          kind: "theorem",
          label: "Formula",
          title: "Cayleyjeva formula",
          html: H`
            <div class="formula-panel">\[\tau(K_n)=n^{n-2}.\]</div>
            <p>To je Cayleyjeva formula: polni graf \(K_n\) ima \(n^{n-2}\) vpetih dreves, oziroma na označeni množici \(n\) vozlišč obstaja toliko različnih dreves. ADM-Grafi.pdf jo navede kot posledico Kirchhoffovega izreka in spretnosti pri determinantah.</p>
            <p>Osnovni kontroli sta \(\tau(T)=1\) za drevo in \(\tau(C_n)=n\), saj pri ciklu izberemo natanko eno povezavo, ki jo odstranimo. Drugih zaprtih formul PDF v tem razdelku ne navaja.</p>`
        },
        {
          id: "dv-primer-kirchhoff",
          kind: "example",
          label: "Delan primer",
          title: "Število vpetih dreves grafa \\(K_4\\)",
          html: H`
            <p>Laplacova matrika je \(L=4I-J\), torej ima 3 na diagonali in \(-1\) zunaj nje. Po odstranitvi ene vrstice in stolpca dobimo</p>
            <div class="formula-panel">\[M=\begin{pmatrix}3&-1&-1\\-1&3&-1\\-1&-1&3\end{pmatrix},\qquad \det M=16.\]</div>
            <p>Zato je \(\tau(K_4)=16\), kar se ujema s Cayleyjevo formulo \(4^{4-2}=16\).</p>`
        },
        {
          id: "dv-protiprimer",
          kind: "counterexample",
          label: "Protiprimer",
          title: "Zakaj \\(|E|=|V|-1\\) ni dovolj",
          html: H`
            <p>Graf \(G=C_3\mathbin{\dot\cup}K_1\) ima \(|V|=4\) in \(|E|=3=|V|-1\), vendar vsebuje cikel in ni povezan. Zato ni drevo.</p>
            <p>Če enačbi dodamo povezanost, dobimo drevo; če ji dodamo acikličnost, prav tako dobimo drevo. Na izpitu vedno napiši manjkajočo predpostavko.</p>`
        },
        {
          id: "dv-pasti",
          kind: "pitfall",
          label: "Izpitne pasti",
          title: "Štiri nevarne bližnjice",
          html: H`
            <ul>
              <li>Vpeto drevo vsebuje vsa vozlišča, ne nujno vseh povezav.</li>
              <li>Pri krčenju izbrišemo zanko, ki nastane iz skrčene povezave; morebitne vzporedne povezave pa ohranimo.</li>
              <li>Kirchhoff zahteva minor, ne determinante celotnega Laplaciana.</li>
              <li>Pri vsoti stopenj drevesa uporabi \(2(n-1)\), vendar v \(n\) vključi tudi neznano število listov.</li>
            </ul>`
        },
        {
          id: "dv-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Jedro teme",
          html: H`
            <p>Drevo je povezan acikličen graf; enakovredno ima enolične poti ali \(n-1\) povezav skupaj s povezanostjo oziroma acikličnostjo. Gozd z \(k\) komponentami ima \(n-k\) povezav. Povezan graf ima vpeto drevo. Število vpetih dreves računamo z brisanjem–krčenjem ali Kirchhoffovim kofaktorjem; za \(K_n\) velja \(n^{n-2}\).</p>`
        }
      ],
      checklist: [
        "Znam navesti vsaj pet ekvivalentnih karakterizacij drevesa.",
        "Znam definirati gozd in most ter dokazati kriterij z lego na ciklu.",
        "Vem, zakaj enačba n−1 povezav sama ni dovolj.",
        "Znam dokazati obstoj dveh listov.",
        "Znam iz stopenj izračunati število listov.",
        "Razumem brisanje–krčenje in bijekcijo v njegovem dokazu.",
        "Znam sestaviti Laplacovo matriko in pravilen minor.",
        "Poznam Cayleyjevo formulo τ(K_n)=n^{n-2}."
      ]
    },
    {
      id: "euler-hamilton",
      number: 12,
      group: GROUP,
      title: "Eulerjevi in Hamiltonovi grafi",
      short: "Povezave proti vozliščem: popoln kriterij za Eulerja in premišljeni pogoji za Hamiltona.",
      accent: "#f3bf67",
      minutes: 90,
      importance: "nujno",
      sources: ["grafi"],
      examNote: "Teorijsko jedro je celotno 13. poglavje ADM-Grafi.pdf. Posebej moraš znati dokaz Eulerjeve karakterizacije, komponentni potrebni pogoj ter verigo dodajanje povezave → Ore → Dirac.",
      outcomes: [
        "ločiti Eulerjev sprehod, Eulerjev obhod, Hamiltonovo pot in Hamiltonov cikel",
        "uporabiti popolna kriterija za odprt in sklenjen Eulerjev sprehod",
        "razložiti dokaz Eulerjevega kriterija z vrivanjem sklenjenih sprehodov",
        "ovreči Hamiltonovost s komponentnim pogojem",
        "dokazati lemo o dodajanju povezave in iz nje izpeljati Orejev ter Diracov izrek",
        "poznati vedenje standardnih družin grafov",
        "razumeti, zakaj Petersenov graf opozarja na omejitve preprostih kriterijev"
      ],
      sections: [
        {
          id: "eh-euler-def",
          kind: "definition",
          label: "Povezave",
          title: "Eulerjev sprehod in obhod",
          html: H`
            <p><strong>Eulerjev sprehod</strong> je sled, ki uporabi vsako povezavo grafa natanko enkrat. Če je sklenjen, je <strong>Eulerjev obhod</strong>; graf z Eulerjevim obhodom je Eulerjev.</p>
            <p>Vozlišča se smejo ponavljati, povezave pa ne. Izolirana vozlišča ne vplivajo na porabo povezav; kriterije zato formuliramo za graf po odstranitvi izoliranih vozlišč oziroma zahtevamo povezanost vseh vozlišč pozitivne stopnje.</p>
            <blockquote>Euler: vsaka povezava enkrat. Hamilton: vsako vozlišče enkrat. To je najpomembnejša ločnica teme.</blockquote>`
        },
        {
          id: "eh-euler-kriterij",
          kind: "theorem",
          label: "Popoln kriterij",
          title: "Kdaj obstaja Eulerjev obhod?",
          html: H`
            <p><strong>Izrek.</strong> Končen multigraf, katerega vozlišča pozitivne stopnje ležijo v eni komponenti, ima Eulerjev obhod natanko tedaj, ko ima vsako vozlišče sodo stopnjo.</p>
            <div class="proof-steps">
              <div class="proof-step"><p>Nujnost: ob vsakem obisku vozlišča uporabimo eno povezavo za vstop in eno za izstop. Sklenjen sprehod zato porabi povezave v parih.</p></div>
              <div class="proof-step"><p>Zadostnost: začnemo v poljubnem vozlišču in hodimo po neuporabljenih povezavah. Zaradi sodih stopenj ne obstanemo drugje kot na začetku.</p></div>
              <div class="proof-step"><p>Če ostanejo neuporabljene povezave, povezanost zagotovi vozlišče trenutnega obhoda, kjer se začne nov sklenjen del; tega vrinemo v obhod.</p></div>
            </div>`
        },
        {
          id: "eh-hierholzer",
          kind: "method",
          label: "Algoritem",
          title: "Postopek iz dokaza Eulerjevega kriterija",
          html: H`
            <ol>
              <li>Začni v poljubnem vozlišču (pri odprtem sprehodu v lihem vozlišču).</li>
              <li>Sledi še neuporabljenim povezavam, dokler se ne vrneš na začetek oziroma dosežeš drugo liho vozlišče.</li>
              <li>Če je ostala neuporabljena povezava, izberi njeno krajišče na trenutnem sprehodu.</li>
              <li>Od tam zgradi nov sklenjen del in ga vrini v stari sprehod.</li>
            </ol>
            <p>To je natančno postopek, ki ga uporablja zadostna smer dokaza v ADM-Grafi.pdf: najdaljši enostavni obhod ne more pustiti neuporabljene povezave, sicer bi vanj vrinili še en sklenjeni del.</p>`
        },
        {
          id: "eh-euler-primer",
          kind: "example",
          label: "Hiter test",
          title: "Polni in polni dvodelni grafi",
          html: H`
            <p>V \(K_n\) ima vsako vozlišče stopnjo \(n-1\), zato je \(K_n\) za \(n\ge2\) Eulerjev natanko za lihi \(n\). Če dovolimo trivialni obhod dolžine 0, je Eulerjev tudi \(K_1\).</p>
            <p>V \(K_{m,n}\) imajo vozlišča prvega dela stopnjo \(n\), drugega pa \(m\). Povezan \(K_{m,n}\) je Eulerjev natanko tedaj, ko sta \(m\) in \(n\) soda.</p>
            <p>Cikel \(C_n\) je Eulerjev za vsak \(n\ge3\), saj je povezan in so vse stopnje enake 2.</p>`
        },
        {
          id: "eh-hamilton-def",
          kind: "definition",
          label: "Vozlišča",
          title: "Hamiltonova pot in Hamiltonov cikel",
          html: H`
            <p><strong>Hamiltonova pot</strong> obišče vsako vozlišče natanko enkrat. <strong>Hamiltonov cikel</strong> je cikel, ki vsebuje vsa vozlišča; graf z njim je Hamiltonov.</p>
            <p>Za Hamiltonovost ni znan preprost kriterij s stopnjami, ki bi bil hkrati nujen in zadosten. Stopnje 2 ali več so nujne za Hamiltonov cikel, vendar še zdaleč ne zadostujejo.</p>
            <p>Hamiltonov cikel je vpet cikel. Iz Trditve 13.2 za \(|S|=1\) sledi, da Hamiltonov graf nima artikulacijskega vozlišča.</p>`
        },
        {
          id: "eh-komponentni-pogoj",
          kind: "theorem",
          label: "Najmočnejši protipogoj",
          title: "Odstranjevanje vozlišč in število komponent",
          html: H`
            <p>Če je \(G\) Hamiltonov, potem za vsako neprazno množico \(S\subseteq V(G)\) velja</p>
            <div class="formula-panel">\[c(G-S)\le |S|.\]</div>
            <p>Na Hamiltonovem ciklu odstranitev \(|S|\) vozlišč razreže cikel na največ \(|S|\) poti, zato tudi celotni graf ne more imeti več komponent. Kontrapozicija je uporabna: če najdemo \(S\) z \(c(G-S)>|S|\), graf ni Hamiltonov.</p>
            <p>Za \(|S|=1\) dobimo: Hamiltonov graf nima artikulacijskega vozlišča.</p>`
        },
        {
          id: "eh-petersen",
          kind: "counterexample",
          label: "Opozorilo",
          title: "Petersenov graf in omejitve pogojev",
          html: H`
            <p>Petersenov graf \(P_{5,2}\) zapišimo z zunanjimi vozlišči \(u_i\), notranjimi \(v_i\) in indeksi v \(\mathbb Z_5\). Povezave so</p>
            <div class="formula-panel">\[
              u_iu_{i+1},\qquad u_iv_i,\qquad v_iv_{i+2}.
            \]</div>
            <p>Povezavam \(u_iv_i\) pravimo <strong>prečke</strong>. Dokažimo, da Hamiltonov cikel ne obstaja. Vsak cikel prečka rez med množicama \(\{u_i\}\) in \(\{v_i\}\) sodo mnogokrat. Ker mora obiskati oba dela, bi uporabil natanko 2 ali 4 od petih prečk.</p>
            <p><strong>Primer 2 prečk.</strong> Naj bosta uporabljeni \(u_iv_i\) in \(u_jv_j\). Zunanji del cikla mora biti pot skozi vseh pet zunanjih vozlišč. Dobimo jo z izbrisom ene povezave iz zunanjega petcikla, zato sta njeni krajišči sosednji in \(j-i\equiv\pm1\pmod5\). Notranje povezave prav tako tvorijo petcikel, le v vrstnem redu s korakom 2. Njegova Hamiltonova pot bi zahtevala \(j-i\equiv\pm2\pmod5\). Oboje hkrati ni mogoče.</p>
            <p><strong>Primer 4 prečk.</strong> Po rotacijski simetriji naj manjka \(u_0v_0\). Ker \(u_0\) v ciklu nima prečke, sta prisiljeni povezavi \(u_4u_0,u_0u_1\). Zato sta izključeni \(u_1u_2,u_3u_4\), prisiljena pa je \(u_2u_3\). Enako pri notranjem vozlišču \(v_0\) dobimo prisiljene povezave \(v_2v_0,v_0v_3,v_4v_1\). Skupaj s štirimi uporabljenimi prečkami nastaneta dva ločena petcikla</p>
            <div class="formula-panel">\[
              u_0u_1v_1v_4u_4u_0,\qquad
              u_2u_3v_3v_0v_2u_2,
            \]</div>
            <p>ne en cikel skozi vseh deset vozlišč. Oba možna primera sta nemogoča, zato Petersenov graf ni Hamiltonov.</p>
            <p>Kljub temu je povezan, 3-regularen, brez artikulacijskih vozlišč in za vsako neprazno \(S\) zadošča pogoju \(c(G-S)\le|S|\). Ima tudi Hamiltonove poti. Zato niti regularnost niti dobra povezanost ne zagotavljata Hamiltonovega cikla; komponentni pogoj pa je potreben, vendar ne zadosten.</p>`
        },
        {
          id: "eh-dodajanje-povezave",
          kind: "theorem",
          label: "Trditev 13.3 z dokazom",
          title: "Kdaj lahko dodano povezavo odstranimo iz Hamiltonovega cikla?",
          html: H`
            <p>Naj bosta \(u,v\) nesosednji vozlišči grafa \(G\) na \(n\) vozliščih in naj velja \(\deg(u)+\deg(v)\ge n\). Če je \(G+uv\) Hamiltonov, je Hamiltonov tudi \(G\).</p>
            <p><strong>Dokaz.</strong> Če kak Hamiltonov cikel grafa \(G+uv\) ne uporabi nove povezave \(uv\), že leži v \(G\). Sicer po odstranitvi \(uv\) iz cikla dobimo Hamiltonovo pot</p>
            <div class="formula-panel">\[x_1x_2\cdots x_n,\qquad x_1=u,\ x_n=v,\]</div>
            <p>ki v celoti leži v \(G\). Za indekse \(i\in\{2,\ldots,n\}\) opazujmo pogoja \(ux_i\in E(G)\) in \(vx_{i-1}\in E(G)\). Prvi velja za \(\deg(u)\) indeksov, drugi za \(\deg(v)\) indeksov. Ker je indeksov le \(n-1\), vsota pa vsaj \(n\), za neki \(i\) veljata oba pogoja.</p>
            <p>Tedaj je</p>
            <div class="formula-panel">\[u,x_i,x_{i+1},\ldots,x_n=v,x_{i-1},x_{i-2},\ldots,x_1=u\]</div>
            <p>Hamiltonov cikel v \(G\). S tem je trditev dokazana. Nesosednost \(u,v\) zagotovi, da izbrani indeks ni degeneriran konec poti.</p>`
        },
        {
          id: "eh-ore",
          kind: "theorem",
          label: "Zadosten pogoj",
          title: "Orejev izrek",
          html: H`
            <p><strong>Izrek 13.4 (Ore).</strong> Naj bo \(G\) enostaven graf na \(n\ge3\) vozliščih. Če za vsak par nesosednjih vozlišč \(u,v\) velja</p>
            <div class="formula-panel">\[\deg(u)+\deg(v)\ge n,\]</div>
            <p>potem je \(G\) Hamiltonov.</p>
            <p><strong>Zakaj sledi iz Trditve 13.3?</strong> Zaporedoma dodajamo manjkajoče povezave. Če dobimo polni graf, je ta Hamiltonov; trditev nato v obratnem vrstnem redu odstrani vse dodane povezave in ohrani Hamiltonovost. Pogoj preverjamo samo za nesosednje pare. Je zadosten, ne nujen: \(C_5\) je Hamiltonov, za nesosednji vozlišči pa je vsota stopenj \(4<5\).</p>`
        },
        {
          id: "eh-dirac",
          kind: "theorem",
          label: "Zadosten pogoj",
          title: "Diracov izrek",
          html: H`
            <p><strong>Izrek 13.5 (Dirac).</strong> Naj bo \(G\) enostaven graf na \(n\ge3\) vozliščih. Če</p>
            <div class="formula-panel">\[\delta(G)\ge\frac n2,\]</div>
            <p>potem je \(G\) Hamiltonov. Izrek sledi iz Oreja, saj imata vsaki nesosednji vozlišči vsoto stopenj vsaj \(2\delta(G)\ge n\).</p>
            <p>Tudi Dirac je le zadosten: \(C_n\) je Hamiltonov, vendar ima za \(n\ge5\) minimalno stopnjo 2, manjšo od \(n/2\).</p>`
        },
        {
          id: "eh-primerjava",
          kind: "method",
          label: "Odločitveno drevo",
          title: "Kako pristopim k dvojni izpitni nalogi",
          html: H`
            <ol>
              <li><strong>Euler:</strong> preveri povezanost relevantnega dela in preštej lihe stopnje. To je popoln odgovor.</li>
              <li><strong>Hamilton:</strong> poskusi narisati cikel; če ga ni, išči artikulacijo ali množico \(S\) z veliko komponentami.</li>
              <li>Če so stopnje velike, preveri Diraca ali Oreja.</li>
              <li>Pri dvodelnem grafu mora Hamiltonov cikel uporabiti enako mnogo vozlišč iz obeh delov.</li>
            </ol>
            <p>Dokaz Eulerjevosti ne dokazuje Hamiltonovosti in obratno. \(K_4\) je Hamiltonov, a ni Eulerjev; dva trikotnika s skupnim vozliščem sta Eulerjeva, a ne Hamiltonova.</p>`
        },
        {
          id: "eh-pasti",
          kind: "pitfall",
          label: "Izpitne pasti",
          title: "Pogoji morajo biti zapisani natančno",
          html: H`
            <ul>
              <li>Vse sode stopnje brez povezanosti ne zadoščajo za en Eulerjev obhod.</li>
              <li>Dirac in Ore sta zadostna, ne nujna pogoja.</li>
              <li>Komponentni pogoj je potreben, ne zadosten; Petersenov graf je protiprimer.</li>
              <li>Pri Hamiltonovem ciklu morajo imeti vsa vozlišča stopnjo vsaj 2, a to samo ni dovolj.</li>
            </ul>`
        },
        {
          id: "eh-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Jedro teme",
          html: H`
            <p>Eulerjev sprehod uporablja vsako povezavo natanko enkrat, Eulerjev obhod pa je sklenjen. Multigraf brez izoliranih vozlišč je Eulerjev natanko tedaj, ko je povezan in so vse stopnje sode. Hamiltonov cikel vsebuje vsa vozlišča. Za neobstoj uporabimo \(\Omega(G-S)>|S|\); za obstoj lahko zadoščata Ore \(\deg u+\deg v\ge n\) ali Dirac \(\delta\ge n/2\).</p>`
        }
      ],
      checklist: [
        "Brez pomote ločim Eulerjev in Hamiltonov problem.",
        "Znam navesti in utemeljiti Eulerjev kriterij.",
        "Razumem vrivanje sklenjenih sprehodov v dokazu Eulerjevega kriterija.",
        "Znam uporabiti komponentni pogoj za ovržbo Hamiltonovosti.",
        "Znam dokazati Trditev 13.3 in iz nje izpeljati Orejev ter Diracov izrek.",
        "Vem, da je komponentni pogoj potreben, Orejev in Diracov pa zadostna."
      ]
    },
    {
      id: "barvanje-izomorfnost",
      number: 13,
      group: GROUP,
      title: "Barvanje grafov",
      short: "Celotno poglavje 14 iz ADM-Grafi.pdf in teorijsko-izpitni poudarek na definiciji, požrešni meji ter Brooksovem izreku.",
      accent: "#d5a7ff",
      minutes: 100,
      importance: "zelo visoka",
      sources: ["grafi", "teorija-2021-roki", "teorija-zbirka"],
      examNote: "Brooksov izrek, definicija pravilnega barvanja, kromatično število in dokaz meje χ≤Δ+1 so neposredno vprašani na teorijskih izpitih.",
      outcomes: [
        "definirati barvanje vozlišč, barvanje povezav, kromatično število in kromatični indeks",
        "določiti spodnjo mejo s kliko ali lihim ciklom",
        "dokazati požrešno mejo \\(\\chi\\le\\Delta+1\\)",
        "natančno navesti Brooksov izrek z obema izjemama",
        "iz spodnje in zgornje meje določiti kromatično število Petersenovega grafa",
        "definirati ravninskost in ločiti graf od njegove konkretne vložitve",
        "pravilno umestiti izrek štirih barv"
      ],
      sections: [
        {
          id: "bi-barvanje-def",
          kind: "definition",
          label: "Definicija",
          title: "Pravilno barvanje in kromatično število",
          html: H`
            <p><strong>Pravilno \(k\)-barvanje vozlišč</strong> je preslikava \(c:V(G)\to\{1,\ldots,k\}\), pri kateri za vsako povezavo \(uv\) velja \(c(u)\ne c(v)\).</p>
            <p><strong>Kromatično število</strong> \(\chi(G)\) je najmanjši \(k\), za katerega obstaja pravilno \(k\)-barvanje.</p>
            <div class="formula-grid">
              <p>\(\chi(K_n)=n\).</p>
              <p>\(\chi(P_n)=2\) za \(n\ge2\).</p>
              <p>\(\chi(C_n)=2\) za sodi \(n\), 3 za lihi \(n\).</p>
              <p>\(\chi(G)\le2\iff G\) je dvodelen (za vsak neprazen graf).</p>
            </div>`
        },
        {
          id: "bi-barvanje-povezav",
          kind: "definition",
          label: "Definicija iz PDF-ja",
          title: "Barvanje povezav in kromatični indeks",
          html: H`
            <p>Za multigraf brez zank je <strong>\(k\)-barvanje povezav</strong> preslikava \(c':E(G)\to\{1,\ldots,k\}\). Barvanje je pravilno, če imata vsaki povezavi s skupnim krajiščem različni barvi.</p>
            <p><strong>Kromatični indeks</strong> \(\chi'(G)\) je najmanjši \(k\), za katerega obstaja pravilno \(k\)-barvanje povezav.</p>
            <p>Zakaj PDF izključi zanke? Zanka je sosednja sama sebi v smislu skupnega krajišča, zato je ne bi bilo mogoče pravilno pobarvati po navedeni zahtevi. Oznak \(\chi(G)\) in \(\chi'(G)\) ne zamenjaj: prva barva vozlišča, druga povezave.</p>`
        },
        {
          id: "bi-klika",
          kind: "definition",
          label: "Spodnja meja",
          title: "Velikost največjega polnega podgrafa",
          html: H`
            <p>Naj bo \(\omega(G)\) velikost največjega polnega podgrafa grafa \(G\). Ker morajo njegova vozlišča dobiti različne barve, velja</p>
            <div class="formula-panel">\[\omega(G)\le\chi(G).\]</div>
            <blockquote>\(\omega(G)\) je le spodnja meja. Petersenov graf ima \(\omega=2\), vendar \(\chi=3\).</blockquote>`
        },
        {
          id: "bi-greedy",
          kind: "theorem",
          label: "Osnovna zgornja meja",
          title: "Požrešno barvanje: \\(\\chi(G)\\le\\Delta(G)+1\\)",
          html: H`
            <p>Vozlišča uredimo poljubno \(v_1,\ldots,v_n\). Vsako vozlišče pobarvamo z najmanjšo barvo, ki je še nima noben njegov že pobarvani sosed.</p>
            <p>Ko barvamo \(v_i\), ima največ \(\deg(v_i)\le\Delta\) že pobarvanih sosedov, zato lahko prepovedujejo največ \(\Delta\) barv. Med \(\Delta+1\) barvami je vsaj ena prosta. Torej</p>
            <div class="formula-panel">\[\chi(G)\le\Delta(G)+1.\]</div>
            <p>Rezultat algoritma je lahko odvisen od vrstnega reda in ni nujno optimalen. Dokaz zagotavlja zgornjo mejo, ne enakosti.</p>`
        },
        {
          id: "bi-brooks",
          kind: "theorem",
          label: "Teorijski favorit",
          title: "Brooksov izrek — natančno z izjemama",
          html: H`
            <p><strong>Brooks.</strong> Naj bo \(G\) povezan enostaven graf. Če \(G\) ni poln graf in ni lih cikel, potem</p>
            <div class="formula-panel">\[\chi(G)\le\Delta(G).\]</div>
            <p>Izjemi sta nujni: za \(K_n\) je \(\chi=n=\Delta+1\), za lihi cikel pa \(\chi=3=\Delta+1\). Za nepovezan graf izrek uporabimo na komponentah; \(\chi(G)\) je maksimum kromatičnih števil komponent.</p>
            <p>ADM-Grafi.pdf Brooksov izrek navede brez dokaza. Teorijski izpit iz leta 2020/21 poleg pravilne navedbe Brooksa posebej zahteva dokaz osnovne požrešne meje \(\chi(G)\le\Delta(G)+1\), ne dokaza Brooksovega izreka.</p>
            <blockquote>Ne zapiši samo \(\chi\le\Delta\). Brez povezanosti in obeh izjem je navedba izreka nepopolna.</blockquote>`
        },
        {
          id: "bi-metoda",
          kind: "method",
          label: "Izpitni postopek",
          title: "Kako dokažem natančno vrednost \\(\\chi(G)\\)",
          html: H`
            <ol>
              <li><strong>Spodnja meja:</strong> poišči poln podgraf ali drug podgraf z znanim kromatičnim številom, na primer lih cikel.</li>
              <li><strong>Zgornja meja:</strong> podaj konkretno pravilno barvanje z enakim številom barv; po potrebi uporabi Brooks ali požrešno mejo.</li>
              <li>Ko se meji ujemata, napiši sklep \(r\le\chi(G)\le r\), zato \(\chi(G)=r\).</li>
            </ol>
            <p>Risba z barvami brez razlage dokazuje le zgornjo mejo. Trikotnik brez podanega barvanja dokazuje le spodnjo mejo 3.</p>`
        },
        {
          id: "bi-ravninskost",
          kind: "definition",
          label: "Predpostavka izreka",
          title: "Ravninski graf in ravninska vložitev",
          html: H`
            <p>Graf je <strong>ravninski</strong>, če ga lahko narišemo v ravnini tako, da se notranjosti različnih povezav ne sekajo; stik je dovoljen le v skupnem krajišču. Konkretni risbi brez križanj pravimo <strong>ravninska vložitev</strong>. Ravninskost je lastnost abstraktnega grafa, ne prve risbe, ki jo vidimo.</p>
            <p><strong>Primer.</strong> \(K_4\) je ravninski, čeprav ga lahko narišemo s križanjem. Grafa \(K_5\) in \(K_{3,3}\) nista ravninska. To sta standardna protiprimera napačni trditvi, da lahko vsako križanje odpravimo s premikanjem vozlišč.</p>
            <p>Izrek štirih barv uporablja samo predpostavko ravninskosti in govori o barvanju vozlišč. Ne govori o barvanju povezav, ne zagotavlja optimalnega barvanja in ne trdi, da vsak ravninski graf potrebuje štiri barve.</p>`
        },
        {
          id: "bi-stiri-barve",
          kind: "theorem",
          label: "Izrek 14.2",
          title: "Izrek štirih barv",
          html: H`
            <p><strong>Izrek 14.2 (izrek štirih barv).</strong> Za vsak ravninski graf \(G\) velja</p>
            <div class="formula-panel">\[\chi(G)\le4.\]</div>
            <p>PDF izrek navede brez dokaza. Gre za zgornjo mejo: ne trdi, da vsak ravninski graf potrebuje natanko štiri barve.</p>`
        },
        {
          id: "bi-primer",
          kind: "example",
          label: "Zgled iz ADM-Grafi.pdf",
          title: "Kromatično število Petersenovega grafa",
          html: H`
            <p>Petersenov graf vsebuje cikel dolžine 5. Ker je \(\chi(C_5)=3\) in je kromatično število podgrafa največ kromatično število celotnega grafa, dobimo \(\chi(Pet)\ge3\).</p>
            <p>Petersenov graf je kubičen, torej \(\Delta(Pet)=3\). Je povezan, ni poln graf in ni lih cikel, zato Brooksov izrek da \(\chi(Pet)\le3\).</p>
            <div class="formula-panel">\[3\le\chi(Pet)\le3\quad\Longrightarrow\quad\chi(Pet)=3.\]</div>
            <p>To je vzorčni popoln odgovor: spodnja meja iz podgrafa in enaka zgornja meja iz izreka.</p>`
        },
        {
          id: "bi-pasti",
          kind: "pitfall",
          label: "Izpitne pasti",
          title: "Kaj mora vsebovati popoln odgovor",
          html: H`
            <ul>
              <li>Za \(\chi(G)=k\) potrebuješ spodnjo in zgornjo mejo.</li>
              <li>Brooks zahteva povezan graf ter izključi polne grafe in lihe cikle.</li>
              <li>Izrek štirih barv daje največ štiri, ne nujno natanko štiri.</li>
            </ul>`
        },
        {
          id: "bi-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Jedro teme",
          html: H`
            <p>Kromatično število ujamemo med spodnjo mejo \(\omega\) oziroma kromatičnim številom znanega podgrafa in konkretnim barvanjem. Požrešna metoda vedno da \(\Delta+1\), Brooks pa razen polnih grafov in lihih ciklov zniža mejo na \(\Delta\). Za ravninske grafe izrek štirih barv zagotovi \(\chi\le4\).</p>`
        }
      ],
      checklist: [
        "Znam definirati pravilno barvanje vozlišč in povezav, χ ter χ′.",
        "Pri izračunu χ vedno dam spodnjo in zgornjo mejo.",
        "Znam dokazati požrešno mejo χ≤Δ+1.",
        "Brooksov izrek navedem s povezanostjo in obema izjemama.",
        "Znam po postopku iz PDF-ja dokazati χ(Pet)=3.",
        "Znam definirati ravninski graf in pojasniti, zakaj križanje na eni risbi ni dokaz neravninskosti.",
        "Izrek štirih barv navedem kot zgornjo mejo χ≤4."
      ]
    }
  ];

  const flashcards = [
    ["gr-f01", "grafi-osnove", H`Kaj je enostavni graf?`, H`Par \(G=(V,E)\), kjer je \(V\) neprazna množica vozlišč, \(E\subseteq\binom V2\) pa množica neurejenih parov različnih vozlišč.`, true],
    ["gr-f02", "grafi-osnove", H`Kaj pravi lema o rokovanju?`, H`\(\sum_{v\in V}\deg(v)=2|E|\). Posledično ima vsak graf sodo mnogo vozlišč lihe stopnje.`, true],
    ["gr-f03", "grafi-osnove", H`Inducirani proti vpetemu podgrafu`, H`Inducirani \(G[U]\) vsebuje izbrana vozlišča in vse povezave med njimi; vpeti podgraf vsebuje vsa vozlišča grafa, lahko pa manj povezav.`, true],
    ["gr-f04", "grafi-osnove", H`Pot proti sledi`, H`Pot ne ponovi vozlišča; sled ne ponovi povezave, vozlišče pa se lahko ponovi.`, true],
    ["gr-f09", "grafi-osnove", H`Parametri hiperkocke \(Q_d\)`, H`Ima \(2^d\) vozlišč, \(d2^{d-1}\) povezav ter je \(d\)-regularna in dvodelna.`, false],

    ["gr-f11", "drevesa-vpeta", H`Kaj je drevo?`, H`Povezan graf brez ciklov; enakovredno graf z natanko eno potjo med vsakima vozliščema.`, true],
    ["gr-f12", "drevesa-vpeta", H`Koliko povezav ima drevo?`, H`Drevo na \(n\) vozliščih ima \(n-1\) povezav. Enačba sama brez povezanosti ali acikličnosti ni dovolj.`, true],
    ["gr-f13", "drevesa-vpeta", H`Kaj je list in kaj se zgodi pri \(K_1\)?`, H`List je vozlišče stopnje 1. Drevo z vsaj dvema vozliščema ima vsaj dva lista; \(K_1\) pa ima eno vozlišče stopnje 0 in zato nima lista.`, true],
    ["gr-f15", "drevesa-vpeta", H`Kdaj graf vsebuje vpeto drevo?`, H`Natanko tedaj, ko je povezan.`, true],
    ["gr-f16", "drevesa-vpeta", H`Rekurzija brisanje–krčenje`, H`Za povezavo \(e\), ki ni zanka, velja \(\tau(G)=\tau(G-e)+\tau(G/e)\).`, true],
    ["gr-f17", "drevesa-vpeta", H`Laplacova matrika`, H`\(L=D-A\): na diagonali so stopnje, zunaj diagonale pa negativna sosednost. Vsote vrstic so 0.`, true],
    ["gr-f18", "drevesa-vpeta", H`Kirchhoffov izrek — polna različica iz PDF-ja`, H`Po odstranitvi poljubne vrstice \(i\) in poljubnega stolpca \(j\) velja \(\tau(G)=|\det L_{ij}|\). Če je \(i=j\), je to običajni glavni minor.`, true],
    ["gr-f19", "drevesa-vpeta", H`Cayleyjeva formula`, H`Število označenih dreves na \(n\) vozliščih oziroma \(\tau(K_n)\) je \(n^{n-2}\).`, true],

    ["gr-f21", "euler-hamilton", H`Kaj uporabi Eulerjev sprehod?`, H`Vsako povezavo natanko enkrat; vozlišča se lahko ponavljajo.`, true],
    ["gr-f22", "euler-hamilton", H`Kriterij Eulerjevega obhoda`, H`Vsa vozlišča pozitivne stopnje so v eni komponenti in vse stopnje so sode.`, true],
    ["gr-f24", "euler-hamilton", H`Kaj uporabi Hamiltonov cikel?`, H`Vsako vozlišče natanko enkrat, nato se vrne na začetno vozlišče.`, true],
    ["gr-f25", "euler-hamilton", H`Komponentni pogoj za Hamiltonovost`, H`Če je \(G\) Hamiltonov, potem za vsako neprazno \(S\subseteq V\) velja \(c(G-S)\le|S|\).`, true],
    ["gr-f26", "euler-hamilton", H`Orejev izrek`, H`Če ima enostaven graf \(n\ge3\) in za vsak nesosednji par \(\deg u+\deg v\ge n\), je Hamiltonov.`, true],
    ["gr-f27", "euler-hamilton", H`Diracov izrek`, H`Če ima enostaven graf \(n\ge3\) in \(\delta(G)\ge n/2\), je Hamiltonov.`, true],
    ["gr-f30", "euler-hamilton", H`Kaj uči Petersenov graf?`, H`Komponentni pogoj, regularnost in odsotnost artikulacije niso zadostni za Hamiltonov cikel. Petersenov graf ni Hamiltonov.`, false],

    ["gr-f31", "barvanje-izomorfnost", H`Kromatično število`, H`\(\chi(G)\) je najmanjše število barv v pravilnem barvanju vozlišč, kjer sta sosednji vozlišči različnih barv.`, true],
    ["gr-f32", "barvanje-izomorfnost", H`Kliška spodnja meja`, H`Če je \(\omega(G)\) velikost največje klike, potem \(\omega(G)\le\chi(G)\).`, true],
    ["gr-f33", "barvanje-izomorfnost", H`Požrešna zgornja meja`, H`Vedno velja \(\chi(G)\le\Delta(G)+1\).`, true],
    ["gr-f34", "barvanje-izomorfnost", H`Brooksov izrek`, H`Če je povezan enostaven graf različen od polnega grafa in lihega cikla, potem \(\chi(G)\le\Delta(G)\).`, true],
    ["gr-f40", "barvanje-izomorfnost", H`Izrek štirih barv`, H`Vsak ravninski graf lahko pravilno pobarvamo z največ štirimi barvami; ne potrebuje vsak natanko štirih.`, false],
    ["gr-f41", "grafi-osnove", H`Lema 11.3: sprehod proti poti`, H`Če med vozliščema obstaja sprehod dolžine \(k\), obstaja tudi pot dolžine največ \(k\); iz najkrajšega sprehoda bi sicer izrezali ponovitev vozlišča.`, true],
    ["gr-f42", "grafi-osnove", H`Parametri kolesa \(W_n\)`, H`Ima \(n+1\) vozlišč in \(2n\) povezav, \(\delta=3,\Delta=n\); regularen je le \(W_3\cong K_4\), nobeno kolo pa ni dvodelno.`, true],
    ["gr-f43", "grafi-osnove", H`Kdaj je \(P_{n,k}\) dvodelen?`, H`Natanko tedaj, ko je \(n\) sod in \(k\) lih. Če \(n\ne2k\), je kubičen in ima \(3n\) povezav; pri \(n=2k\) jih ima \(5n/2\).`, false],
    ["gr-f44", "drevesa-vpeta", H`Drevo z natanko dvema listoma`, H`Je izomorfno poti: vsa druga vozlišča morajo imeti stopnjo 2. Obratno ima vsaka \(P_n\), \(n\ge2\), natanko dva lista.`, true],
    ["gr-f45", "euler-hamilton", H`Trditev 13.3`, H`Če sta \(u,v\) nesosednja, \(\deg u+\deg v\ge |V|\) in je \(G+uv\) Hamiltonov, je Hamiltonov tudi \(G\).`, true],
    ["gr-f46", "barvanje-izomorfnost", H`Kromatični indeks`, H`\(\chi'(G)\) je najmanjše število barv v pravilnem barvanju povezav, kjer povezavi s skupnim krajiščem dobita različni barvi.`, true],
    ["gr-f47", "barvanje-izomorfnost", H`Zakaj barvanje povezav izključi zanke?`, H`Zanka ima skupno krajišče sama s seboj, zato bi morala imeti barvo, različno od svoje; pravilno barvanje po tej definiciji ni mogoče.`, false],
    ["gr-f48", "grafi-osnove", H`Usmerjena lema o rokovanju`, H`\(\sum_v\deg^-(v)=\sum_v\deg^+(v)=|E|\), ker ima vsak lok natanko eno glavo in en rep.`, true]
  ].map(([id, topic, front, back, core]) => ({ id, topic, front, back, core }));

  const quiz = [
    ["gr-q01", "grafi-osnove", H`Graf ima stopnje \(4,3,3,2,2\). Koliko povezav ima?`, [H`5`, H`7`, H`14`, H`Ni mogoče določiti.`], 1, H`Vsota stopenj je 14, zato je \(|E|=14/2=7\).`],
    ["gr-q03", "grafi-osnove", H`Koliko povezav ima hiperkocka \(Q_5\)?`, [H`32`, H`64`, H`80`, H`160`], 2, H`\(Q_d\) ima \(d2^{d-1}\) povezav, zato \(5\cdot16=80\).`],
    ["gr-q06", "grafi-osnove", H`Katera struktura ne sme ponoviti povezave, lahko pa ponovi vozlišče?`, [H`Sprehod`, H`Sled`, H`Pot`, H`Cikel`], 1, H`Sled oziroma enostaven sprehod ne ponovi povezav; pot ne ponovi niti vozlišč.`],

    ["gr-q07", "drevesa-vpeta", H`Povezan graf na 12 vozliščih ima 11 povezav. Kaj sledi?`, [H`Je drevo.`, H`Ima natanko en cikel.`, H`Je poln.`, H`Ni mogoče nič sklepati.`], 0, H`Povezan graf z \(n-1\) povezavami je drevo.`],
    ["gr-q10", "drevesa-vpeta", H`Kaj naredimo v Kirchhoffovem izreku?`, [H`Izračunamo \(\det L\).`, H`Odstranimo eno vrstico in isti stolpec iz \(L\), nato determinantiramo.`, H`Seštejemo vse stopnje.`, H`Kvadriramo matriko sosednosti.`], 1, H`Celotni Laplacian ima determinanto 0; število dreves da glavni kofaktor.`],
    ["gr-q11", "drevesa-vpeta", H`Koliko označenih dreves je na 6 vozliščih?`, [H`36`, H`216`, H`1296`, H`720`], 2, H`Cayley: \(6^{6-2}=6^4=1296\).`],

    ["gr-q14", "euler-hamilton", H`Kateri graf je Eulerjev?`, [H`\(K_4\)`, H`\(K_5\)`, H`\(P_5\)`, H`\(K_{3,4}\)`], 1, H`V \(K_5\) ima vsako vozlišče sodo stopnjo 4; graf je povezan.`],
    ["gr-q15", "euler-hamilton", H`Kateri pogoj je le potreben za Hamiltonovost?`, [H`\(c(G-S)\le|S|\) za vsak neprazen \(S\)`, H`Diracov pogoj`, H`Orejev pogoj`, H`Vse stopnje so sode`], 0, H`Komponentni pogoj je potreben, vendar Petersenov graf kaže, da ni zadosten.`],
    ["gr-q16", "euler-hamilton", H`Kaj zahteva Diracov izrek za graf na \(n\ge3\) vozliščih?`, [H`\(\Delta\ge n/2\)`, H`\(\delta\ge n/2\)`, H`Vse stopnje so sode.`, H`Graf je dvodelen.`], 1, H`Dirac uporablja minimalno stopnjo \(\delta(G)\).`],

    ["gr-q19", "barvanje-izomorfnost", H`Kaj vedno velja?`, [H`\(\chi\le\omega\)`, H`\(\omega\le\chi\le\Delta+1\)`, H`\(\chi=\Delta\)`, H`\(\chi\le2\)`], 1, H`Klika da spodnjo, požrešno barvanje pa zgornjo mejo.`],
    ["gr-q20", "barvanje-izomorfnost", H`Kateri sta izjemi v Brooksovem izreku?`, [H`Drevesa in dvodelni grafi`, H`Polni grafi in lihi cikli`, H`Sodi cikli in poti`, H`Ravninski grafi in hiperkocke`], 1, H`Prav polni grafi in lihi cikli potrebujejo \(\Delta+1\) barv.`],
    ["gr-q24", "barvanje-izomorfnost", H`Kaj pove izrek štirih barv?`, [H`Vsak graf ima \(\chi=4\).`, H`Vsak ravninski graf ima \(\chi\le4\).`, H`Vsak ravninski graf ima \(\chi=4\).`, H`Vsak dvodelen graf ima \(\chi=4\).`], 1, H`Gre za zgornjo mejo za ravninske grafe, ne za natančno vrednost pri vsakem grafu.`],
    ["gr-q25", "grafi-osnove", H`Kaj po definiciji iz ADM-Grafi.pdf velja za edino vozlišče drevesa \(K_1\)?`, [H`Je list stopnje 1.`, H`Je izolirano vozlišče stopnje 0 in ni list.`, H`Ima stopnjo 2.`, H`\(K_1\) ni drevo.`], 1, H`List ima stopnjo 1; edino vozlišče \(K_1\) ima stopnjo 0.`],
    ["gr-q26", "grafi-osnove", H`Koliko vozlišč in povezav ima kolo \(W_n\)?`, [H`\(n\) in \(n\)`, H`\(n+1\) in \(2n\)`, H`\(2n\) in \(3n\)`, H`\(n+1\) in \(n^2\)`], 1, H`Obod prispeva \(n\) vozlišč in \(n\) povezav, središče pa še \(n\) naper.`],
    ["gr-q27", "grafi-osnove", H`Kdaj je posplošeni Petersenov graf \(P_{n,k}\) dvodelen?`, [H`Natanko ko sta \(n,k\) soda.`, H`Natanko ko je \(n\) sod in \(k\) lih.`, H`Natanko ko je \(n\) lih.`, H`Vedno.`], 1, H`To je kriterij, naveden pri družini \(P_{n,k}\) v ADM-Grafi.pdf.`],
    ["gr-q28", "grafi-osnove", H`Kaj zagotavlja Lema 11.3 za sprehod dolžine \(k\) med dvema vozliščema?`, [H`Cikel dolžine \(k\).`, H`Pot dolžine natanko \(k\).`, H`Pot dolžine največ \(k\).`, H`Eulerjev obhod.`], 2, H`Ponovljene dele sprehoda lahko izrežemo, zato dobimo pot, ki ni daljša.`],
    ["gr-q29", "drevesa-vpeta", H`Katera kombinacija po Trditvi 12.1 zagotavlja, da je graf drevo?`, [H`\(|E|=|V|-1\) brez drugih pogojev`, H`Graf je povezan in nima cikla.`, H`Vse stopnje so sode.`, H`Graf ima vsaj dva lista.`], 1, H`Povezanost in acikličnost sta ena od petih ekvivalentnih karakterizacij.`],
    ["gr-q30", "drevesa-vpeta", H`Kdaj graf vsebuje vpeto drevo?`, [H`Natanko ko je povezan.`, H`Natanko ko je regularen.`, H`Natanko ko je dvodelen.`, H`Vsak graf ga vsebuje.`], 0, H`To je Trditev 12.3.`],
    ["gr-q31", "drevesa-vpeta", H`Na kateri dve skupini razdelimo vpeta drevesa v dokazu brisanja–krčenja?`, [H`Na poti in cikle.`, H`Na tista, ki vsebujejo \(e\), in tista, ki je ne.`, H`Na ravninska in neravninska.`, H`Na soda in liha.`], 1, H`Prva skupina ustreza \(G/e\), druga pa \(G-e\).`],
    ["gr-q32", "drevesa-vpeta", H`Katera formulacija Kirchhoffovega izreka je najpopolnejša?`, [H`\(\tau(G)=\det L(G)\).`, H`Odstranimo poljubno vrstico in poljuben stolpec ter vzamemo absolutno vrednost determinante.`, H`Seštejemo diagonalne elemente.`, H`Odstraniti moramo samo prvo vrstico.`], 1, H`Celotna Laplacova matrika ima determinant 0; poljuben kofaktor ima absolutno vrednost \(\tau(G)\).`],
    ["gr-q33", "euler-hamilton", H`Kdaj je multigraf brez izoliranih vozlišč Eulerjev?`, [H`Ko je povezan in so vse stopnje sode.`, H`Ko ima natanko dve lihi stopnji.`, H`Ko je Hamiltonov.`, H`Ko je regularen.`], 0, H`To je natančna karakterizacija Izreka 13.1.`],
    ["gr-q34", "euler-hamilton", H`Kaj trdi Trditev 13.3 za nesosednji vozlišči \(u,v\) z \(\deg u+\deg v\ge |V|\)?`, [H`Če je \(G+uv\) Hamiltonov, je Hamiltonov tudi \(G\).`, H`Graf \(G\) ni Hamiltonov.`, H`Graf je Eulerjev.`, H`Vozlišči morata biti sosednji.`], 0, H`Dodano povezavo lahko iz Hamiltonovega cikla odstranimo z zamenjavo dveh robov.`],
    ["gr-q35", "barvanje-izomorfnost", H`Kaj pomeni pravilno barvanje povezav?`, [H`Vse povezave imajo isto barvo.`, H`Povezavi s skupnim krajiščem imata različni barvi.`, H`Povezave in vozlišča imajo isto barvo.`, H`Različni povezavi sta vedno različnih barv.`], 1, H`Različni barvi zahtevamo natanko za povezave, ki imajo skupno krajišče.`],
    ["gr-q36", "barvanje-izomorfnost", H`Kako ADM-Grafi.pdf določi \(\chi(Pet)\)?`, [H`\(C_5\) da spodnjo mejo 3, Brooks pa zgornjo mejo 3.`, H`Izrek štirih barv da enakost 4.`, H`Petersenov graf je dvodelen.`, H`Cayleyjeva formula da 3.`], 0, H`Lihi petcikel zahteva vsaj tri barve, kubičnost in Brooks pa dovolita največ tri.`]
  ].map(([id, topic, prompt, options, correct, explanation]) => ({ id, topic, prompt, options, correct, explanation }));

  const questions = [
    {
      id: "gr-o01", topic: "grafi-osnove", difficulty: 1, source: "ADM-Grafi.pdf, §11.1",
      prompt: H`Sestavi popoln uvodni odgovor o grafih: formalno definiraj enostaven graf, multigraf in usmerjeni graf; nato pojasni sosednost, incidenco, odprto sosedstvo, red, velikost ter stopnjo. Posebej obravnavaj zanko in vzporedne povezave ter povej, katera enakost za sosedstvo velja le v enostavnem grafu.`,
      answer: H`Enostaven neusmerjeni graf je par \(G=(V,E)\), kjer je \(V\ne\varnothing\) množica vozlišč in \(E\subseteq\binom V2\) množica neurejenih parov različnih vozlišč. Multigraf formalno opišemo z \(G=(V,E,\partial)\), kjer je \(E\) množica posameznih povezav in \(\partial:E\to\operatorname{MSet}_2(V)\) vsaki povezavi priredi neurejeno multimnožico dveh krajišč. Zapis \(\partial(e)=\{\!\{u,u\}\!\}\) opisuje zanko, različni povezavi \(e\ne f\) pa smeta imeti isto multimnožico krajišč in sta tedaj vzporedni. Enostaven usmerjeni graf je par \(D=(V,A)\) z \(A\subseteq V\times V\); lok \((u,v)\) ima rep \(u\) in glavo \(v\). V enostavnem grafu iz \(uv\in E\) sledi, da sta \(u,v\) sosednji in je povezava \(uv\) incidentna z obema. V multigrafu je \(e\) incidentna z vsakim krajiščem v \(\partial(e)\), vozlišči pa sta sosednji, če obstaja povezava s tema krajiščema. Odprto sosedstvo vsebuje različne sosede; v enostavnem grafu je \(N_G(v)=\{u:uv\in E\}\), zaprto pa \(N_G[v]=N_G(v)\cup\{v\}\). Red grafa je \(|V|\), velikost \(|E|\), stopnja pa število incidentnih krajev povezav. Zato zanka prispeva 2 k neusmerjeni stopnji, vsaka vzporedna povezava pa se šteje posebej. V enostavnem grafu velja \(\deg(v)=|N(v)|\); v multigrafu lahko zaradi večkratnosti in zank ta enačba odpove. Pri usmerjenem grafu ločimo vhodno in izhodno stopnjo ter velja \(\sum_v\deg^-(v)=\sum_v\deg^+(v)=|A|\).`,
      hint: H`Od para \(G=(V,E)\) preidi k lokalnim pojmom pri vozlišču in na koncu posebej opozori na multigrafe.`,
      rubric: ["formalne tri definicije", "sosednost, incidenca in obe sosedstvi", "red, velikost in stopnja", "zanka, vzporedne povezave ter omejitev deg(v)=|N(v)|"], tags: ["definicije", "sosednost", "incidenca", "stopnja"]
    },

    {
      id: "gr-o08", topic: "drevesa-vpeta", difficulty: 2, source: "ADM-Grafi.pdf, Trditev 12.3",
      prompt: H`Najprej definiraj vpeto drevo. Nato formuliraj in dokaži kriterij za njegov obstoj v obe smeri ter pojasni, zakaj zaporedno brisanje povezav na ciklih res konča in ohrani vsa vozlišča.`,
      answer: H`Graf vsebuje vpeto drevo natanko tedaj, ko je povezan. Če vsebuje vpeto drevo, je med poljubnima vozliščema pot že v tem drevesu, zato je povezan tudi celotni graf. Obratno: če je povezan graf že drevo, smo končali. Sicer vsebuje povezavo na ciklu, ki jo lahko izbrišemo, ne da bi izgubili povezanost. Postopek ponavljamo; ker je povezav končno mnogo, dobimo povezan vpet podgraf brez ciklov, torej vpeto drevo.`,
      hint: H`V povezani smeri zaporedoma briši povezave ciklov, ki niso potrebne za povezanost.`,
      rubric: ["definicija vpetega drevesa", "smer vpeto drevo ⇒ povezanost", "smer povezanost ⇒ vpeto drevo", "ohranitev vozlišč, povezanosti in dokaz končanja"], tags: ["vpeto drevo", "povezanost", "dokaz"]
    },
    {
      id: "gr-o10", topic: "drevesa-vpeta", difficulty: 3, source: "ADM-Grafi.pdf, posledice §12.1–12.4",
      prompt: H`Naj bo \(G\) končen povezan graf z natanko enim ciklom \(C_\ell\). Brez uporabe Kirchhoffovega izreka dokaži, da je \(\tau(G)=\ell\). Rezultat posploši na končen povezan graf, katerega vsi cikli so paroma robno disjunktni in imajo dolžine \(\ell_1,\ldots,\ell_t\). Formulo preveri na dveh trikotnikih s skupnim vozliščem, nato pa pojasni, zakaj odpove za dva trikotnika s skupno povezavo.`,
      answer: H`Vpeto drevo mora vsebovati vse mostove: če bi most izpustili, bi ostalo nepovezano. V unicikličnem grafu so vse povezave zunaj edinega cikla mostovi. Iz cikla moramo izbrisati vsaj eno povezavo, da odstranimo cikel, in največ eno, da pri že obveznih zunanjih povezavah ne porušimo povezanosti. Vsaka od \(\ell\) izbir izbrisane ciklične povezave zato da drugo vpeto drevo in
\[\tau(G)=\ell.\]
Naj bodo zdaj vsi cikli končnega grafa paroma robno disjunktni. Povezava zunaj vseh ciklov je most in mora ostati v vsakem vpetem drevesu. Iz vsakega od \(t\) ciklov izberimo eno povezavo in jo izbrišimo. Izbrisi so neodvisni, ker cikli nimajo skupnih povezav. Povezanost se ohrani, saj ima vsaka izbrisana povezava obvoz po preostanku svojega cikla; ker smo pretrgali vse cikle, je rezultat acikličen in zato vpeto drevo. Če ima \(G\) \(n\) vozlišč in \(m\) povezav, ima ta konstrukcija \(m-t=n-1\) povezav, torej \(m-n+1=t\).

Obratno mora poljubno vpeto drevo izbrisati natanko \(m-(n-1)=t\) povezav in vsaj eno iz vsakega od \(t\) ciklov. Zato izpusti natanko eno povezavo vsakega cikla. Dobili smo bijekcijo med vpetimi drevesi in neodvisnimi izbirami po ene povezave na cikel, zato
\[\tau(G)=\prod_{i=1}^{t}\ell_i.\]
Pri \(t=0\) je \(G\) drevo in prazen produkt ima vrednost 1, skladno z \(\tau(G)=1\). Za dva trikotnika, ki imata skupno samo vozlišče, dobimo \(3\cdot3=9\). Če pa si trikotnika \(abc\) in \(abd\) delita povezavo \(ab\), cikla nista robno disjunktna in izbiri izbrisov nista neodvisni. Graf ima pet povezav; med njegovimi desetimi tri-elementnimi podmnožicami sta natanko dva trikotnika nepovezana vpeta podgrafa z izoliranim četrtim vozliščem, preostalih osem pa je vpetih dreves. Zato je \(\tau(G)=8\ne9\).`,
      hint: H`Najprej določi obvezne mostove; na vsakem robno disjunktnem ciklu nato izberi natanko eno povezavo, ki jo odstraniš.`,
      rubric: ["uniciklični dokaz in vloga mostov", "natančen dokaz produktne formule", "primer dveh ciklov s skupnim vozliščem", "protiprimer s skupno povezavo in pravilen rezultat 8"], tags: ["vpeta drevesa", "uniciklični graf", "robno disjunktni cikli", "produktno pravilo"]
    },

    {
      id: "gr-o11", topic: "euler-hamilton", difficulty: 3, source: "ADM-Grafi.pdf",
      prompt: H`Formuliraj in dokaži Eulerjev kriterij za obstoj Eulerjevega obhoda v neusmerjenem grafu.`,
      answer: H`Multigraf brez izoliranih vozlišč je Eulerjev natanko tedaj, ko je povezan in je vsaka stopnja soda. Nujnost: obhod pri vsakem obisku vozlišča eno povezavo uporabi za prihod in drugo za odhod, zato se povezave parijo. Zadostnost: vzemi najdaljši enostavni obhod \(W\). Če po odstranitvi njegovih povezav ostane povezava, ima preostali multigraf še vedno same sode stopnje, povezanost pa zagotovi vozlišče obhoda \(W\), kjer se začne nov sklenjeni enostavni sprehod. Tega lahko vrinemo v \(W\) in dobimo daljši obhod, kar je protislovje. Zato \(W\) vsebuje vse povezave.`,
      hint: H`Za zadostnost uporabi najdaljši enostavni obhod in protislovje z vrivanjem novega sklenjenega dela.`,
      rubric: ["povezanost pozitivnih stopenj", "vse stopnje sode", "dokaz nujnosti in konstrukcija zadostnosti"], tags: ["Euler", "dokaz"]
    },
    {
      id: "gr-o13", topic: "euler-hamilton", difficulty: 2, source: "ADM-Grafi.pdf, §13 — primerjalna razlaga",
      prompt: H`Primerjaj Eulerjev in Hamiltonov problem ter podaj grafa, ki ločita oba pojma.`,
      answer: H`Eulerjev obhod uporabi vsako povezavo natanko enkrat in lahko ponavlja vozlišča; Hamiltonov cikel uporabi vsako vozlišče natanko enkrat in mu ni treba uporabiti vseh povezav. Dva trikotnika s skupnim enim vozliščem sta Eulerjeva, ker so stopnje sode, nista pa Hamiltonova zaradi artikulacije. \(K_4\) je Hamiltonov, ni pa Eulerjev, ker imajo vsa štiri vozlišča liho stopnjo 3.`,
      hint: H`Poišči eno oviro v stopnjah in eno oviro v artikulacijskem vozlišču.`,
      rubric: ["pravilna razlika povezave/vozlišča", "Eulerjev-neHamiltonov primer", "Hamiltonov-neEulerjev primer"], tags: ["primer", "protiprimer"]
    },
    {
      id: "gr-o15", topic: "euler-hamilton", difficulty: 3, source: "ADM-Grafi.pdf, Izreka 13.4 in 13.5",
      prompt: H`Natančno formuliraj Diracov in Orejev izrek. Razloži razmerje med njima in zakaj pogoja nista potrebna.`,
      answer: H`Dirac: enostaven graf na \(n\ge3\) vozliščih z \(\delta(G)\ge n/2\) je Hamiltonov. Ore: enostaven graf na \(n\ge3\) vozliščih, v katerem za vsak nesosednji par \(u,v\) velja \(\deg u+\deg v\ge n\), je Hamiltonov. Diracov pogoj implicira Orejevega, zato je Ore močnejši. Oba sta le zadostna: cikel \(C_n\) je Hamiltonov, vendar za \(n\ge5\) ne izpolni Diracovega niti Orejevega pogoja.`,
      hint: H`Pazi na minimalno stopnjo, nesosednje pare in \(n\ge3\).`,
      rubric: ["vse hipoteze Diraca", "vse hipoteze Orea", "razmerje in protiprimer potrebnosti"], tags: ["Dirac", "Ore"]
    },

    {
      id: "gr-o20", topic: "barvanje-izomorfnost", difficulty: 1, source: "ADM-Grafi.pdf, Izrek 14.2",
      prompt: H`Definiraj ravninski graf in loči abstraktni graf od ravninske vložitve. Nato natančno navedi izrek štirih barv, razloži njegov logični domet ter ga preveri na primerih \(K_4\), dvodelnega ravninskega grafa in grafa \(K_5\).`,
      answer: H`Graf je ravninski, če obstaja njegova risba v ravnini, v kateri se notranjosti povezav ne sekajo; taka konkretna risba je ravninska vložitev. Križanje na eni slabi risbi zato še ne dokazuje neravninskosti. Izrek štirih barv pravi: za vsak ravninski graf \(G\) velja \(\chi(G)\le4\). Gre za zgornjo mejo, ne za trditev \(\chi(G)=4\) za vsak ravninski graf, in izrek ne govori o barvanju povezav. Graf \(K_4\) je ravninski in ima \(\chi=4\), zato je meja lahko dosežena. Dvodelen graf z vsaj eno povezavo ima \(\chi=2\); neprazen graf brez povezav, na primer \(K_1\), pa ima \(\chi=1\). \(K_5\) ni ravninski, zato izreka nanj ne smemo uporabiti; sicer ima \(\chi(K_5)=5\). ADM-Grafi.pdf izrek navede brez dokaza.`,
      hint: H`Najprej razjasni eksistenco risbe brez križanj, nato uporabi znak ≤ in tri primere z različnim statusom.`,
      rubric: ["definicija ravninskosti in vložitve", "natančna meja χ≤4", "česa izrek ne trdi", "pravilna analiza vseh treh primerov"], tags: ["ravninskost", "izrek štirih barv", "barvanje"]
    },
    {
      id: "gr-o23", topic: "grafi-osnove", difficulty: 3, source: "ADM-Grafi.pdf, §11.3",
      prompt: H`Za vsako od družin \(K_n,P_n,C_n,K_{m,n},Q_d\) in \(W_n\) podaj natančno definicijo, število vozlišč in število povezav. Pri vsaki določi tudi, ali je regularna in katere stopnje, ter natanko za katere vrednosti parametrov je dvodelna.`,
      answer: H`\(K_n\) ima \(n\) vozlišč in povezavo med vsakima različnima vozliščema, zato ima \(\binom n2\) povezav, je \((n-1)\)-regularen in je za \(n\ge1\) dvodelen natanko pri \(n\le2\). \(P_n\) ima vozlišča \(v_1,\ldots,v_n\) ter povezave \(v_iv_{i+1}\) za \(1\le i<n\), zato ima \(n-1\) povezav; vedno je dvodelen, regularen pa le za \(n=1\) oziroma \(n=2\), ko je 0- oziroma 1-regularen. \(C_n\), \(n\ge3\), je sklenjena pot na \(n\) vozliščih, ima \(n\) povezav, je 2-regularen in dvodelen natanko za sodi \(n\). \(K_{m,n}\), \(m,n\ge1\), ima dva dela velikosti \(m,n\) in vse povezave med njima, zato ima \(m+n\) vozlišč ter \(mn\) povezav; vedno je dvodelen in je regularen natanko pri \(m=n\), tedaj stopnje \(n\). \(Q_d\), \(d\ge1\), ima za vozlišča binarne nize dolžine \(d\), sosednja pa se razlikujeta v eni koordinati; ima \(2^d\) vozlišč, \(d2^{d-1}\) povezav, je \(d\)-regularen in dvodelen po pariteti števila enic. \(W_n\), \(n\ge3\), dobimo iz \(C_n\) z dodatnim središčem, povezanim z vsemi vozlišči cikla; ima \(n+1\) vozlišč in \(2n\) povezav, regularen je le \(W_3\), ki je 3-regularen, zaradi trikotnikov pa ni nikoli dvodelen.`,
      hint: H`Za število povezav regularnega grafa uporabi rokovanje.`,
      rubric: ["vseh šest definicij", "pravilne velikosti", "pravilna regularnost in dvodelnost"], tags: ["družine grafov", "definicije"]
    },
    {
      id: "gr-o24", topic: "grafi-osnove", difficulty: 3, source: "ADM-Grafi.pdf, posplošeni Petersenovi grafi",
      prompt: H`Natančno definiraj posplošeni Petersenov graf \(P_{n,k}\). Kdaj je kubičen, koliko povezav ima v posebnem primeru in kdaj je dvodelen?`,
      answer: H`Za \(n\ge3\) in \(0<k<n\) ima vozlišča \(u_i,v_i\) za \(i\in\mathbb Z_n\) ter povezave \(u_iu_{i+1},u_iv_i,v_iv_{i+k}\). Vozlišč je \(2n\). Če \(n\ne2k\), so notranje povezave različne, graf je 3-regularen in ima \(3n\) povezav. Če \(n=2k\), se vsaka notranja povezava v indeksiranem zapisu pojavi dvakrat, zato je različnih povezav \(5n/2\). Graf je dvodelen natanko tedaj, ko je \(n\) sod in \(k\) lih. Petersenov graf je \(P_{5,2}\).`,
      hint: H`Tri vrste povezav so zunanji cikel, napere in notranji korak za \(k\).`,
      rubric: ["vozlišča in tri vrste povezav", "oba primera števila povezav", "natančen kriterij dvodelnosti"], tags: ["Petersen", "standardni grafi"]
    },
    {
      id: "gr-o25", topic: "drevesa-vpeta", difficulty: 2, source: "ADM-Grafi.pdf, Posledica 12.2 in opomba",
      prompt: H`Kaj je list? Ali ga ima \(K_1\)? Dokaži, da ima drevo z vsaj dvema vozliščema vsaj dva lista, in karakteriziraj drevesa z natanko dvema listoma.`,
      answer: H`List je vozlišče stopnje 1. Edino vozlišče \(K_1\) ima stopnjo 0, zato \(K_1\) nima lista. V netrivialnem drevesu sta krajišči najdaljše poti lista: dodaten sosed zunaj poti bi jo podaljšal, dodaten sosed na poti pa bi ustvaril cikel. Če sta lista natanko dva, identiteta \(L=2+\sum_{\deg v\ge3}(\deg v-2)\) pokaže, da ni vozlišča stopnje vsaj 3; zaradi povezanosti imajo vsa druga stopnjo 2, zato je graf pot. Obratno ima \(P_n\) za \(n\ge2\) natanko dva lista.`,
      hint: H`Najprej povej stopnjo edinega vozlišča \(K_1\), nato uporabi najdaljšo pot.`,
      rubric: ["definicija in K1", "dokaz dveh listov", "obe smeri karakterizacije poti"], tags: ["list", "K1", "drevo", "dokaz"]
    },
    {
      id: "gr-o26", topic: "drevesa-vpeta", difficulty: 3, source: "ADM-Grafi.pdf, Trditev 12.1",
      prompt: H`Naj bo \(T\) končen graf. Dokaži, da so ekvivalentne naslednje trditve: (1) med vsakima vozliščema obstaja natanko ena pot; (2) \(T\) je povezan in odstranitev poljubne povezave ga naredi nepovezanega; (3) \(T\) je povezan in \(|E(T)|=|V(T)|-1\); (4) \(T\) je acikličen in \(|E(T)|=|V(T)|-1\); (5) \(T\) je povezan in acikličen. Dokaži krog implikacij (1) \(\Rightarrow\) (2) \(\Rightarrow\) (3) \(\Rightarrow\) (4) \(\Rightarrow\) (5) \(\Rightarrow\) (1) in posebej preveri robni primer \(K_1\).`,
      answer: H`Pišimo \(n=|V(T)|\).
      <p><strong>(1) ⇒ (2).</strong> Enolične poti že dajo povezanost. Če za povezavo \(e=uv\) graf \(T-e\) ne bi bil nepovezan, bi v njem obstajala pot med \(u\) in \(v\). Skupaj s potjo, ki jo tvori sama povezava \(e\), bi imeli dve različni poti med istima vozliščema, kar je protislovje.</p>
      <p><strong>(2) ⇒ (3).</strong> Indukcija po \(n\). Pri \(n=1\) povezan graf nima povezav, zato je \(|E|=0=n-1\). Naj bo \(n\ge2\) in izberimo \(e=uv\). Po (2) je \(T-e\) nepovezan. Izbris ene povezave iz povezanega grafa lahko ustvari največ dve komponenti: vsako vozlišče po prvotni poti do \(u\) po izbrisu ostane povezano z \(u\) ali pa z \(v\). Ker sta \(u,v\) po izbrisu ločena, dobimo natanko dve komponenti \(T_1,T_2\). Obe sta minimalno povezani: če bi odstranitev povezave \(f\) v \(T_i\) komponento pustila povezano, bi bil zaradi povezave \(e\) povezan tudi \(T-f\), v nasprotju z (2). Po indukcijski predpostavki je \(|E(T_i)|=|V(T_i)|-1\). Če sta \(n_i=|V(T_i)|\), potem</p>
      \[|E(T)|=(n_1-1)+(n_2-1)+1=n-1.\]
      <p><strong>(3) ⇒ (4).</strong> Najprej opazimo, da ima vsak povezan graf na \(n\) vozliščih vsaj \(n-1\) povezav: začnemo z enim doseženim vozliščem in zaradi povezanosti zaporedoma izberemo povezavo do še nedoseženega vozlišča; za vseh preostalih \(n-1\) vozlišč dobimo \(n-1\) različnih povezav. Če bi \(T\) vseboval cikel, bi lahko iz njega odstranili eno povezavo in ohranili povezanost. Ostal bi povezan graf na \(n\) vozliščih z le \(n-2\) povezavami, kar nasprotuje pravkar dokazani spodnji meji. Zato je \(T\) acikličen.</p>
      <p><strong>(4) ⇒ (5).</strong> Naj ima acikličen graf komponente \(T_1,\ldots,T_k\) z \(n_i\) vozlišči. Vsaka komponenta ima \(n_i-1\) povezav. To dokažemo z indukcijo: komponenta z enim vozliščem jih ima 0; v večji povezani aciklični komponenti je krajišče najdaljše poti list, po odstranitvi tega lista in njegove edine povezave pa ostane povezan acikličen graf z enim vozliščem manj. Zato</p>
      \[|E(T)|=\sum_{i=1}^k(n_i-1)=n-k.\]
      <p>Predpostavka \(|E(T)|=n-1\) zdaj da \(k=1\), zato je \(T\) povezan.</p>
      <p><strong>(5) ⇒ (1).</strong> Povezanost zagotovi vsaj eno pot med poljubnima vozliščema \(u,v\). Če bi obstajali dve različni poti, bi od njunega prvega razhoda do prvega ponovnega srečanja dobili cikel. To nasprotuje acikličnosti, zato je pot enolična.</p>
      <p><strong>Rob \(K_1\).</strong> Graf je povezan in acikličen, ima \(0=1-1\) povezav ter trivialno pot od edinega vozlišča do samega sebe. Ker nima povezav, trditev o odstranitvi vsake povezave velja vakuozno. Torej vseh pet trditev velja tudi za \(K_1\).</p>`,
      hint: H`Sledi zaporedju: enolična pot → minimalna povezanost → n−1 → acikličnost → povezanost.`,
      rubric: ["vseh pet trditev", "vseh pet implikacij", "brez uporabe gole enačbe n−1 kot zadostnega pogoja", "robni primer K1"], tags: ["drevo", "ekvivalence", "dokaz"]
    },
    {
      id: "gr-o27", topic: "drevesa-vpeta", difficulty: 3, source: "ADM-Grafi.pdf, Trditev 12.4",
      prompt: H`Pri brisanju–krčenju razloži, kaj sta \(G-e\) in \(G/e\), zakaj po krčenju dovolimo multigraf in zakaj dokaz res daje bijekcijo.`,
      answer: H`\(G-e\) dobimo z izbrisom izbrane povezave. \(G/e\) dobimo z identifikacijo njenih krajišč; samo skrčeno povezavo, ki postane zanka, odstranimo, druge povezave pa lahko postanejo vzporedne, zato ostanemo v kategoriji multigrafov. Vpeta drevesa brez \(e\) so dobesedno vpeta drevesa \(G-e\). Če vpeto drevo vsebuje \(e\), njegovo krčenje ohrani povezanost in zmanjša število vozlišč ter povezav za 1, zato da vpeto drevo \(G/e\). Obratno vsako vpeto drevo \(G/e\) razpremo in dodamo \(e\); dobimo enolično vpeto drevo z \(e\). To sta inverzni preslikavi.`,
      hint: H`Preveri povezanost, acikličnost in obratno razpenjanje skrčenega vozlišča.`,
      rubric: ["obe operaciji", "razlog za multigraf", "obe smeri bijekcije"], tags: ["brisanje", "krčenje", "bijekcija"]
    },
    {
      id: "gr-o28", topic: "euler-hamilton", difficulty: 3, source: "ADM-Grafi.pdf, Trditev 13.3",
      prompt: H`Naj bo \(G\) enostaven graf z \(n\) vozlišči in naj bosta \(u,v\) nesosednji vozlišči, za kateri velja \(\deg(u)+\deg(v)\ge n\). Dokaži: če je graf \(G+uv\) Hamiltonov, je Hamiltonov tudi \(G\).`,
      answer: H`Če Hamiltonov cikel v \(G+uv\) ne uporabi \(uv\), smo končali. Sicer ga pri \(uv\) prerežemo v Hamiltonovo pot \(x_1\ldots x_n\) v \(G\), kjer je \(x_1=u,x_n=v\). Med \(n-1\) indeksi \(i=2,\ldots,n\) prvi pogoj \(ux_i\in E\) velja \(\deg u\)-krat, drugi \(vx_{i-1}\in E\) pa \(\deg v\)-krat. Ker je vsota vsaj \(n\), se pogoja za neki \(i\) prekrivata. Nato \(u,x_i,x_{i+1},\ldots,v,x_{i-1},x_{i-2},\ldots,u\) tvori Hamiltonov cikel v \(G\).`,
      hint: H`Prereži novi rob in s principom golobnjaka najdi dve križni povezavi.`,
      rubric: ["primer cikla brez uv", "Hamiltonova pot in štetje indeksov", "pravilno sestavljen cikel v G"], tags: ["Hamilton", "Trditev 13.3", "dokaz"]
    },
    {
      id: "gr-o29", topic: "euler-hamilton", difficulty: 3, source: "ADM-Grafi.pdf, Trditev 13.2",
      prompt: H`Zakaj je pogoj \(\Omega(G-S)\le|S|\) za Hamiltonovost potreben, ne pa zadosten? Kaj točno pove Petersenov graf?`,
      answer: H`Hamiltonov cikel po odstranitvi neprazne množice \(S\) razpade na največ \(|S|\) odsekov poti, celotni graf pa lahko te odseke le združuje, zato \(\Omega(G-S)\le|S|\). Petersenov graf za vsako neprazno \(S\) izpolni to neenakost, vendar nima Hamiltonovega cikla. Torej kršitev pogoja zanesljivo ovrže Hamiltonovost, izpolnitev pa je ne dokaže.`,
      hint: H`Loči kontrapozicijo potrebnega pogoja od njegovega napačnega obrata.`,
      rubric: ["dokaz nujnosti", "natančna vloga Petersena", "jasno potrebno proti zadostno"], tags: ["Petersen", "Hamilton", "potrebni pogoj"]
    },
    {
      id: "gr-o31", topic: "barvanje-izomorfnost", difficulty: 3, source: "IzpitTeorija_20-21.pdf, vprašanje 2; ADM-Grafi.pdf, Izrek 14.1",
      prompt: H`Odgovori v obliki popolnega teorijskega izpitnega odgovora: definiraj \(\chi(G)\), navedi Brooksov izrek in dokaži \(\chi(G)\le\Delta(G)+1\).`,
      answer: H`Pravilno \(k\)-barvanje je preslikava \(c:V(G)\to\{1,\ldots,k\}\), pri kateri iz \(uv\in E(G)\) sledi \(c(u)\ne c(v)\). \(\chi(G)\) je najmanjši tak \(k\). Brooks: če je \(G\) povezan enostaven graf, ki ni poln graf in ni lih cikel, potem \(\chi(G)\le\Delta(G)\). Za splošno mejo vozlišča uredimo poljubno in jih barvamo zaporedoma. Ob barvanju vozlišča je med njegovimi največ \(\Delta\) sosedi uporabljenih največ \(\Delta\) barv, zato je med \(\Delta+1\) barvami vsaj ena prosta. Tako dobimo pravilno barvanje in \(\chi(G)\le\Delta+1\).`,
      hint: H`Izpit zahteva tri dele: definicijo, Brooks z obema izjemama in požrešni dokaz.`,
      rubric: ["natančna definicija χ", "povezanost in obe Brooksovi izjemi", "popoln požrešni dokaz"], tags: ["teorijski izpit", "Brooks", "dokaz"]
    },

    {
      id: "gr-o33", topic: "grafi-osnove", difficulty: 2, source: "ADM-Grafi.pdf, §11.1",
      prompt: H`Definiraj podgraf, vpeti podgraf in inducirani podgraf. Za vsakega konstruiraj primer ter podaj protiprimer pogosti zamenjavi »vpeti pomeni inducirani«.`,
      answer: H`Graf \(H\) je podgraf grafa \(G\), če je \(V(H)\subseteq V(G)\) in vsaka povezava \(H\) tudi povezava \(G\) z istima krajiščema. Je vpet, če \(V(H)=V(G)\): ohraniti mora vsa vozlišča, povezave pa sme brisati. Za \(U\subseteq V(G)\) je inducirani podgraf \(G[U]\) graf na \(U\), ki vsebuje prav vse povezave grafa \(G\) z obema krajiščema v \(U\); med izbranimi vozlišči jih ne smemo poljubno izpustiti. V trikotniku \(K_3\) je ena njegova povezava skupaj s krajiščema podgraf, ni pa vpet. Pot na vseh treh vozliščih, dobljena z brisanjem ene povezave, je vpet podgraf \(K_3\), ni pa induciran, saj bi inducirani podgraf na vseh vozliščih moral biti cel \(K_3\). Inducirani podgraf na dveh vozliščih je \(K_2\) in ni vpet. Torej »vpet« govori o vseh vozliščih, »induciran« pa o vseh povezavah med izbranimi vozlišči. Graf je lahko oboje, na primer \(G\) sam, vendar ena lastnost druge ne implicira.`,
      hint: H`Za protiprimer vzemi \(K_3\), ohrani vsa vozlišča in izbriši eno povezavo.`,
      rubric: ["tri natančne definicije", "primer vsake vrste", "protiprimer na K3", "jasna razlika vozlišča proti povezavam"], tags: ["podgraf", "inducirani podgraf", "vpeti podgraf"]
    },
    {
      id: "gr-o34", topic: "grafi-osnove", difficulty: 3, source: "ADM-Grafi.pdf, §11.2 in Lema 11.3",
      prompt: H`Definiraj sprehod, sled, pot, obhod in cikel ter navedi vse pravilne implikacije med temi pojmi. Dokaži, da vsak sprehod iz vozlišča \(u\) v vozlišče \(v\) vsebuje pot iz \(u\) v \(v\), katere dolžina ni večja od dolžine prvotnega sprehoda. Za vsak neveljaven obrat med pojmi dodaj majhen protiprimer in posebej obravnavaj primer \(u=v\).`,
      answer: H`Sprehod je zaporedje vozlišč, kjer sta zaporedni povezani; njegova dolžina je število uporabljenih povezav. Sled ne ponovi povezave, pot ne ponovi vozlišča, obhod je sklenjen sprehod, cikel pa je sklenjena pot dolžine vsaj 3, kjer se ponovita le prvo in zadnje vozlišče. Vsaka pot je sled in vsak sled je sprehod; vsak cikel je hkrati obhod in sled. Obrati ne veljajo: sprehod \(1,2,1,2\) ponavlja povezavo in ni sled; sled \(1,2,3,1,4\) ponovi vozlišče 1 in ni pot; obhod lahko ponavlja povezave in ni cikel. Za dokaz zahtevane trditve med vsemi sprehodi iz \(u\) v \(v\) izberemo najkrajšega. Če se v njem ponovi vozlišče \(v_i=v_j\), \(i<j\), izbrišemo zaprti odsek med pojavoma in dobimo krajši sprehod z istima krajiščema, protislovje. Najkrajši sprehod je zato pot in ni daljši od začetnega. Če je \(u=v\), dovolimo pot dolžine 0. V multigrafu moramo posebej povedati konvencijo za cikla dolžine 1 ali 2.`,
      hint: H`Najprej nariši hierarhijo pojmov, nato za dokaz iz najkrajšega sprehoda izreži ponovljeni zaprti del.`,
      rubric: ["pet definicij", "vse pravilne implikacije", "protiprimeri obratom", "popoln dokaz leme z robnim primerom"], tags: ["sprehod", "sled", "pot", "cikel", "dokaz"]
    },
    {
      id: "gr-o35", topic: "grafi-osnove", difficulty: 3, source: "ADM-Grafi.pdf, §11.2",
      prompt: H`Dokaži, da »biti povezan s sprehodom« določa ekvivalenčno relacijo na vozliščih. Iz razredov izpelji komponente in nato dokaži, da je razdalja na povezanem grafu metrika.`,
      answer: H`Na \(V(G)\) definiramo \(u\sim v\), če obstaja sprehod iz \(u\) v \(v\). Refleksivnost da sprehod dolžine 0 pri \(u\). Simetričnost dobimo z obratom vrstnega reda sprehoda, tranzitivnost pa s stikanjem sprehoda \(u\!-\!v\) in \(v\!-\!w\). Zato je \(\sim\) ekvivalenčna relacija, njeni razredi pa so povezane komponente. Graf je povezan natanko tedaj, ko ima en razred. Na povezanem grafu definiramo \(d(u,v)\) kot dolžino najkrajše poti. Vrednost je nenegativna, \(d(u,v)=0\) natanko za \(u=v\), saj ima pot med različnima vozliščema vsaj eno povezavo. Simetričnost sledi z obračanjem poti. Za trikotniško neenakost staknemo najkrajši poti \(u\!-\!v\) in \(v\!-\!w\); dobimo sprehod dolžine \(d(u,v)+d(v,w)\), Lema 11.3 pa da pot \(u\!-\!w\), ki ni daljša. Zato \(d(u,w)\le d(u,v)+d(v,w)\). Na nepovezanem grafu postavimo \(d=\infty\) med komponentami, kar ni običajna realnovredna metrika.`,
      hint: H`Prvi del je dokaz treh lastnosti relacije; drugi del so štirje aksiomi metrike.`,
      rubric: ["tri lastnosti ekvivalence", "komponente kot razredi", "štirje aksiomi metrike", "trikotniška neenakost z Lemo 11.3 in opozorilo o ∞"], tags: ["povezanost", "komponente", "metrika", "dokaz"]
    },
    {
      id: "gr-o36", topic: "grafi-osnove", difficulty: 3, source: "ADM-Grafi.pdf, §11.1 in §11.3",
      prompt: H`Združi lemo o rokovanju z regularnostjo: izpelji število povezav \(k\)-regularnega grafa, paritetni pogoj za \(nk\), usmerjeno različico in dva konkretna primera oziroma protiprimera.`,
      answer: H`Za končen neusmerjen multigraf velja \(\sum_{v\in V}\deg v=2|E|\), ker vsaka nezančna povezava prispeva po 1 pri obeh krajiščih, zanka pa 2 pri svojem vozlišču. Zato je število vozlišč lihe stopnje sodo. Če je graf \(k\)-regularen na \(n\) vozliščih, je \(nk=2|E|\), torej \(|E|=nk/2\) in mora biti \(nk\) sodo. Posebej graf z lihim številom vozlišč ne more biti regularen lihe stopnje; 3-regularen graf na 7 vozliščih ne obstaja. Kubični graf na 8 vozliščih pa ima \(8\cdot3/2=12\) povezav; obstoj potrdi \(Q_3\). V usmerjenem grafu vsak lok prispeva 1 natanko eni izhodni in eni vhodni stopnji, zato \(\sum_v\deg^+(v)=\sum_v\deg^-(v)=|E|\). To ne pomeni, da ima vsako vozlišče enaki vhodno in izhodno stopnjo: en sam lok \(u\to v\) ima pri \(u\) par \((0,1)\), pri \(v\) pa \((1,0)\), globalni vsoti pa sta vseeno enaki.`,
      hint: H`V regularnem grafu nadomesti vsako stopnjo s \(k\); v usmerjenem preštej glave in repe.`,
      rubric: ["dokaz rokovanja", "formula nk/2 in pariteta", "obstojni ter neobstojni primer", "usmerjeni formuli in protiprimer lokalni enakosti"], tags: ["rokovanje", "regularen graf", "usmerjeni graf", "pariteta"]
    },

    {
      id: "gr-o37", topic: "drevesa-vpeta", difficulty: 3, source: "ADM-Grafi.pdf, Trditev 12.1 in Posledica 12.2",
      prompt: H`Dokaži, da ima gozd na \(n\) vozliščih in \(k\) komponentah natanko \(n-k\) povezav. Iz tega izpelji kriterija za drevo in dodaj protiprimer enačbi \(|E|=|V|-1\) brez dodatnega pogoja.`,
      answer: H`Vsaka komponenta gozda je povezani aciklični graf, torej drevo. Če imajo komponente \(n_1,\ldots,n_k\) vozlišč, ima \(i\)-ta po izreku o drevesih \(n_i-1\) povezav. Zato je \(|E|=\sum_i(n_i-1)=\sum_i n_i-k=n-k\). Če je acikličen graf na \(n\) vozliščih in ima \(n-1\) povezav, enačba \(n-k=n-1\) prisili \(k=1\), zato je povezan in je drevo. Če je povezan graf na \(n\) vozliščih z \(n-1\) povezavami, ne more vsebovati cikla: povezavo cikla bi izbrisali in ohranili povezanost, dobili pa povezan graf z manj kot \(n-1\) povezavami, kar je nemogoče, saj vsebuje vpeto drevo z \(n-1\) povezavami. Sama enačba ne zadošča: \(C_3\mathbin{\dot\cup}K_1\) ima 4 vozlišča in 3 povezave, vendar je nepovezan in vsebuje cikel. Zato mora izpitni odgovor ob \(n-1\) vedno navesti še povezanost ali acikličnost.`,
      hint: H`Seštej formule \(n_i-1\) po komponentah in posebej preveri, kateri dodatni pogoj prisili \(k=1\).`,
      rubric: ["dokaz formule n−k", "acikličen kriterij", "povezan kriterij", "pravilen protiprimer goli enačbi"], tags: ["gozd", "drevo", "število povezav", "protiprimer"]
    },
    {
      id: "gr-o38", topic: "drevesa-vpeta", difficulty: 3, source: "ADM-Grafi.pdf, Trditev 12.1",
      prompt: H`Kaj se zgodi, če drevesu dodamo povezavo ali jo izbrišemo? Dokaži enoličnost nastalega cikla oziroma dveh komponent in pojasni zvezo z mostovi.`,
      answer: H`V drevesu \(T\) obstaja med vsakima vozliščema \(u,v\) natanko ena pot. Če dodamo novo povezavo \(uv\), ta povezava skupaj z enolično staro potjo \(u\!-\!v\) tvori cikel. Vsak cikel v \(T+uv\) mora uporabiti novo povezavo, saj \(T\) ni imel ciklov; po njenem izbrisu bi preostanek cikla dal pot med \(u,v\) v \(T\), ki je zaradi enoličnosti prav prej omenjena pot. Cikel je zato natanko eden. Če iz drevesa izbrišemo povezavo \(e=uv\), krajišči ne moreta ostati povezani, saj bi druga pot skupaj z \(e\) tvorila cikel v \(T\). Ker je bilo drevo povezano, izbris ene povezave ga razdeli na natanko dve komponenti, ne več: vsako vozlišče je po enolični poti do \(u\) ali \(v\) na eni od strani. Povezava, katere izbris poveča število komponent, je most; zato je vsaka povezava drevesa most. Obratno je povezava grafa most natanko tedaj, ko ne leži na nobenem ciklu: cikel ponuja obvoz, brez cikla pa bi morebitni obvoz ustvaril cikel.`,
      hint: H`Uporabi enolično pot v drevesu kot obstoječi del cikla oziroma kot dokaz, da obvoza ni.`,
      rubric: ["dodana povezava in obstoj cikla", "enoličnost cikla", "izbris ter natanko dve komponenti", "karakterizacija mostu s ciklom"], tags: ["drevo", "most", "enolični cikel", "dokaz"]
    },
    {
      id: "gr-o39", topic: "drevesa-vpeta", difficulty: 2, source: "ADM-Grafi.pdf, §12.2–12.3",
      prompt: H`Definiraj \(\tau(G)\) kot število vpetih dreves grafa \(G\). Dokaži, da je \(\tau(G)=0\) za nepovezan graf \(G\), \(\tau(T)=1\) za drevo \(T\) in \(\tau(C_n)=n\). Nato za zanko \(e\) dokaži \(\tau(G)=\tau(G-e)\), za nezančno povezavo \(e\) pa \(\tau(G)=\tau(G-e)+\tau(G/e)\); posebej pojasni primera, ko je \(e\) most oziroma ko pri krčenju nastanejo vzporedne povezave.`,
      answer: H`\(\tau(G)\) je število vpetih dreves grafa \(G\). Če je \(G\) nepovezan, nima povezanega vpetega podgrafa, zato je \(\tau(G)=0\). Če je \(G=T\) drevo, je \(\tau(T)=1\): vpeti podgraf z manj povezavami ni povezan, z vsemi pa je prav \(T\). Za cikel \(C_n\) dobimo \(\tau(C_n)=n\), ker moramo za vpeto drevo odstraniti natanko eno od \(n\) povezav; vsaka izbira da pot na vseh vozliščih. Za zanko \(e\) velja \(\tau(G)=\tau(G-e)\), saj zanka ne more biti del drevesa; običajne rekurzije zanjo ne uporabljamo. Za nezančno povezavo \(e\) velja \(\tau(G)=\tau(G-e)+\tau(G/e)\), tudi če je \(e\) most: tedaj je \(G-e\) nepovezan in prvi člen 0, vsa vpeta drevesa pa vsebujejo \(e\), zato jih pravilno prešteje \(G/e\). Pri vzporednih povezavah jih obravnavamo kot različne izbire, saj lahko dajo različna vpeta drevesa; po krčenju ohranimo nastale vzporedne povezave, odstranimo pa zanke.`,
      hint: H`Za vsak robni primer vprašaj, katere povezave vpeto drevo nujno vsebuje oziroma nikoli ne vsebuje.`,
      rubric: ["nepovezan graf", "drevo in cikel", "zanka", "most ter vzporedne povezave pri rekurziji"], tags: ["vpeta drevesa", "brisanje–krčenje", "robni primeri"]
    },
    {
      id: "gr-o40", topic: "drevesa-vpeta", difficulty: 3, source: "ADM-Grafi.pdf, Definicija 12.5 in Trditev 12.6",
      prompt: H`Razloži zgradbo Laplacove matrike multigrafa, dokaži, da so vsote vrstic nič, in poveži to dejstvo s Kirchhoffovim izrekom ter nepovezanimi grafi.`,
      answer: H`Po odstranitvi zank naj bo \(A\) matrika sosednosti, kjer zunaj diagonale \(a_{ij}\) šteje povezave med \(v_i,v_j\), \(D=\operatorname{diag}(\deg v_i)\), in \(L=D-A\). Diagonalni element je stopnja, zunaj diagonale pa negativno število vzporednih povezav. V vsaki vrstici je diagonalna stopnja enaka vsoti vseh sosednosti te vrstice, zato je vsota elementov 0. Sledi \(L\mathbf1=0\) in \(\det L=0\); zato Kirchhoff ne uporablja determinante celotnega \(L\), ampak kofaktor. Po odstranitvi poljubne vrstice \(i\) in stolpca \(j\) velja \(\tau(G)=|\det L_{ij}|\); pri \(i=j\) je glavni minor nenegativen. Če je graf nepovezan, je \(\tau(G)=0\), zato so vsi ti kofaktorji 0. Pri povezanem grafu so pozitivni, ker obstaja vsaj eno vpeto drevo. Zanke lahko pred sestavo \(L\) izbrišemo, saj ne pripadajo nobenemu vpetemu drevesu; vzporedne povezave pa moramo šteti tako v stopnji kot v \(A\). Pogosta napaka je izračunati \(\det L\) in iz nič napačno sklepati, da graf nima vpetih dreves.`,
      hint: H`V vsaki vrstici primerjaj diagonalno stopnjo z vsoto negativnih sosednosti.`,
      rubric: ["L=D−A za multigraf", "dokaz vsot vrstic", "razlog det L=0", "Kirchhoff, nepovezanost in obravnava zank"], tags: ["Laplacian", "Kirchhoff", "kofaktor", "dokaz"]
    },

    {
      id: "gr-o41", topic: "euler-hamilton", difficulty: 3, source: "ADM-Grafi.pdf, §13.1",
      prompt: H`Formuliraj in dokaži popoln kriterij za odprt Eulerjev sprehod. Vključi primera nič in dveh lihih vozlišč ter pojasni vlogo izoliranih vozlišč.`,
      answer: H`Končen neusmerjen multigraf ima Eulerjev sprehod natanko tedaj, ko so vsa vozlišča pozitivne stopnje v eni povezani komponenti in ima graf bodisi 0 bodisi 2 vozlišči lihe stopnje. Pri 0 lihih vozliščih obstaja Eulerjev obhod. Pri natanko dveh, \(u,v\), obstaja odprt Eulerjev sprehod, ki se začne v enem in konča v drugem. Nujnost: vsako notranje vozlišče sprehoda porablja povezave v parih prihod–odhod; le začetno in končno imata lahko po eno neparno povezavo. Ker sprehod uporabi vse povezave, so vsa njihova krajišča v isti komponenti. Zadostnost za dve lihi vozlišči: dodamo novo povezavo \(uv\). Stopnji \(u,v\) postaneta sodi, zato ima razširjeni graf po Eulerjevem kriteriju obhod. Ta obhod prerežemo pri dodani povezavi in dobimo Eulerjev sprehod v prvotnem grafu od \(u\) do \(v\). Pri nič lihih uporabimo sklenjeni kriterij neposredno. Izolirana vozlišča nimajo povezav, ki bi jih moral sprehod obiskati, zato jih pri pogoju povezanosti prezremo; če definicija »Eulerjev graf« zahteva povezan graf brez izoliranih vozlišč, to konvencijo izrecno navedemo.`,
      hint: H`Za zadostnost pri dveh lihih vozliščih ju poveži z novo povezavo, nato prereži Eulerjev obhod.`,
      rubric: ["natančen kriterij povezanosti", "0 in 2 lihi vozlišči", "dokaz nujnosti", "dokaz zadostnosti ter izolirana vozlišča"], tags: ["Eulerjev sprehod", "lihe stopnje", "dokaz"]
    },
    {
      id: "gr-o42", topic: "euler-hamilton", difficulty: 3, source: "ADM-Grafi.pdf, §13.1",
      prompt: H`Opiši Hierholzerjev postopek in dokaži, zakaj se ne more ustaviti v napačnem vozlišču ter zakaj vrivanje na koncu uporabi vse povezave.`,
      answer: H`V povezanem grafu samih sodih stopenj začnemo v poljubnem vozlišču in sledimo še neuporabljenim povezavam, dokler ne moremo nadaljevati. V nobenem vmesnem vozlišču se ne moremo zatakniti: ob prvem prihodu porabimo eno povezavo, preostalo število še neuporabljenih incidentnih povezav pa je liho in zato vsaj 1; vsak nadaljnji prihod–odhod porabi par. Zataknemo se lahko šele v začetnem vozlišču, zato dobimo sklenjeno sled. Če ta še ne vsebuje vseh povezav, povezanost prvotnega grafa zagotovi vozlišče trenutne sledi, ki je incidentno z neuporabljeno povezavo. Od tam v preostalem grafu, kjer so stopnje spet sode, zgradimo novo sklenjeno sled in jo vrinemo v staro. Vsako vrivanje porabi vsaj eno novo povezavo, graf pa je končen, zato se postopek konča. Končni obhod je sklenjena sled in uporablja vsako povezavo natanko enkrat. Pri dveh lihih vozliščih začnemo v enem od njiju ali uporabimo trik z dodatno povezavo. Past je začeti odprti primer v sodem vozlišču, kar lahko pusti neuporabljene povezave.`,
      hint: H`Pariteta neuporabljenih povezav nadzoruje zatikanje; končnost nadzoruje končanje vrivanja.`,
      rubric: ["gradnja prve sledi", "dokaz pravilnega konca", "vrivanje nove sledi", "dokaz končanja in odprti primer"], tags: ["Hierholzer", "Euler", "algoritem", "dokaz"]
    },
    {
      id: "gr-o43", topic: "euler-hamilton", difficulty: 3, source: "ADM-Grafi.pdf, §13.1–13.2",
      prompt: H`Popolnoma razvrsti Eulerjevost in Hamiltonovost grafov \(K_n\), \(K_{m,n}\), \(C_n\) in \(P_n\), skupaj z vsemi robnimi pogoji.`,
      answer: H`Za \(K_n\) ima vsako vozlišče stopnjo \(n-1\). Za \(n\ge2\) je Eulerjev natanko tedaj, ko je \(n-1\) sod, torej ko je \(n\) lih; za vsak \(n\ge3\) je Hamiltonov, ker cikel \(1,2,\ldots,n,1\) obišče vsa vozlišča. \(K_1\) ima prazen obhod dolžine 0, vendar ga po konvenciji iz PDF-ja, ki pri Eulerjevem grafu izključi izolirana vozlišča, obravnavamo posebej in ga ne imenujemo Eulerjev. V \(K_{m,n}\), \(m,n\ge1\), imajo vozlišča prvega dela stopnjo \(n\), drugega pa \(m\), zato je Eulerjev natanko tedaj, ko sta \(m,n\) soda. Hamiltonov cikel v dvodelnem grafu izmenjuje dela in zato zahteva \(m=n\); če \(m=n\ge2\), tak cikel z izmeničnim naštevanjem res obstaja. Vsak \(C_n\), \(n\ge3\), je Eulerjev in Hamiltonov: sam cikel je oba zahtevana obhoda. Pot \(P_n\) ima pri \(n\ge2\) natanko dve vozlišči lihe stopnje, zato ima odprt Eulerjev sprehod. Hamiltonovo pot ima vsak \(P_n\), Hamiltonovega cikla pa za \(n\ge2\) ne, ker krajišči stopnje 1 ne moreta ležati na ciklu. Pogoje je treba ločiti: Euler gleda pariteto povezav, Hamilton pa obisk vozlišč.`,
      hint: H`Najprej napiši stopnje; pri Hamiltonovem ciklu v dvodelnem grafu štejeta oba dela enako.`,
      rubric: ["K_n", "K_mn z nujnostjo in konstrukcijo", "C_n", "P_n z robnimi primeri"], tags: ["standardni grafi", "Euler", "Hamilton", "klasifikacija"]
    },
    {
      id: "gr-o44", topic: "euler-hamilton", difficulty: 3, source: "ADM-Grafi.pdf, Trditvi 13.2–13.3 in Izrek 13.5",
      prompt: H`Izpelji Orejev izrek iz leme o dodajanju povezave in razloži, zakaj Diracov pogoj implicira Orejevega. Dodaj Hamiltonov graf, ki ne izpolni nobenega pogoja.`,
      answer: H`Lema pravi: za nesosednji \(u,v\) v grafu na \(n\) vozliščih z \(\deg u+\deg v\ge n\) velja, da je \(G\) Hamiltonov natanko tedaj, ko je Hamiltonov \(G+uv\); netrivialna smer odstrani novi rob iz Hamiltonovega cikla in s prekrivnim štetjem najde dve križni povezavi, iz katerih sestavi cikel v \(G\). Če Orejev pogoj velja za vsak nesosednji par, zaporedoma dodajamo manjkajoče povezave. Stopnje se le povečujejo, zato pogoj ostane veljaven. Pridemo do \(K_n\), ki je za \(n\ge3\) Hamiltonov. Z večkratno uporabo leme nazaj je Hamiltonov že prvotni graf. Če velja Diracov pogoj \(\delta(G)\ge n/2\), ima vsak nesosednji par vsoto stopenj vsaj \(2\delta\ge n\), zato Dirac implicira Orea. Obrat ne velja nujno, zato je Ore močnejši zadostni kriterij. Noben pogoj ni potreben: cikel \(C_n\), \(n\ge5\), je Hamiltonov, vendar ima \(\delta=2<n/2\), za dva nesosednja vozlišča pa je vsota stopenj \(4<n\). Ne smemo sklepati »pogoj odpove, zato graf ni Hamiltonov«.`,
      hint: H`Dopolni graf do polnega in lemo vsakič uporabi v obratni smeri.`,
      rubric: ["natančna lema", "dopolnjevanje do K_n", "Dirac implicira Orea", "protiprimer potrebnosti in logična past"], tags: ["Ore", "Dirac", "Hamilton", "dokaz"]
    },

    {
      id: "gr-o45", topic: "barvanje-izomorfnost", difficulty: 3, source: "ADM-Grafi.pdf, §14.1",
      prompt: H`Dokaži, da je neprazen graf dvodelen natanko tedaj, ko je \(\chi(G)\le2\). Nato določi \(\chi\) za \(K_n\), \(K_{m,n}\), \(P_n\) in \(C_n\) ter utemelji robne primere.`,
      answer: H`Če ima graf dvodelno razbitje \(V=A\mathbin{\dot\cup}B\), pobarvamo vsa vozlišča \(A\) z eno, vsa vozlišča \(B\) z drugo barvo; vsaka povezava gre med deloma, zato je barvanje pravilno in \(\chi\le2\). Obratno pravilno barvanje z največ dvema barvama razdeli vozlišča po barvah; znotraj barvnega razreda ni povezav, zato dobimo dvodelno razbitje. Za \(K_n\) so vsa vozlišča paroma sosednja, zato zahtevajo različne barve in \(\chi(K_n)=n\). Za neprazen \(K_{m,n}\) z obema nepraznima deloma je \(\chi=2\); če povezav ni, je \(\chi=1\). Pot \(P_n\) je dvodelna z izmeničnim barvanjem: \(\chi(P_1)=1\), za \(n\ge2\) pa \(\chi(P_n)=2\). Sodi cikel ima izmenično 2-barvanje. Pri lihem ciklu bi izmenjavanje po obhodu zahtevalo, da začetno vozlišče dobi obe barvi, zato 2-barvanje ni mogoče; tri barve zadoščajo, torej \(\chi(C_n)=2\) za sodi in 3 za lihi \(n\). Past: dvodelen graf brez povezav ne potrebuje nujno dveh barv.`,
      hint: H`Barvna razreda sta kandidata za dela; pri lihem ciklu sledi izmenjavi nazaj do začetka.`,
      rubric: ["dokaz obeh smeri", "K_n in K_mn", "P_n z robom", "C_n z dokazom lihega primera"], tags: ["dvodelen graf", "kromatično število", "standardni grafi"]
    },
    {
      id: "gr-o46", topic: "barvanje-izomorfnost", difficulty: 3, source: "ADM-Grafi.pdf, §14.1",
      prompt: H`Dokaži monotonost kromatičnega števila za podgrafe, formulo za komponente in kliško spodnjo mejo. Zakaj nobena od teh spodnjih mej sama ne določi vedno \(\chi(G)\)?`,
      answer: H`Če je \(H\subseteq G\), vsako pravilno barvanje grafa \(G\) po omejitvi ostane pravilno na \(H\), zato \(\chi(H)\le\chi(G)\). Če so \(G_1,\ldots,G_k\) komponente grafa \(G\), mora barvanje \(G\) pravilno pobarvati vsako komponento, zato \(\chi(G)\ge\max_i\chi(G_i)\). Obratno lahko v vseh komponentah ponovno uporabimo iste barve; povezav med komponentami ni, zato \(\chi(G)=\max_i\chi(G_i)\). Klika velikosti \(r\) je podgraf \(K_r\) in zahteva \(r\) različnih barv, zato \(\omega(G)\le\chi(G)\). Toda \(\omega\) ni vedno natančna: lihi cikel \(C_5\) nima trikotnika, zato je \(\omega(C_5)=2\), vendar je \(\chi(C_5)=3\). Tudi poznavanje enega podgrafa da le spodnjo mejo; za enakost moramo podati še ujemajočo se zgornjo mejo s konkretnim barvanjem ali izrekom. Primer Petersenovega grafa: podgraf \(C_5\) da \(\chi\ge3\), Brooks pa \(\chi\le3\). Napačno je iz prikazanega \(k\)-barvanja takoj sklepati \(\chi=k\); pokazali smo le \(\chi\le k\).`,
      hint: H`Barvanje omeji na podgraf; pri komponentah iste barve ponovno uporabi. Nato loči spodnjo od zgornje meje.`,
      rubric: ["monotonost", "dokaz formule za komponente", "kliška meja", "C5 kot protiprimer in metoda dveh mej"], tags: ["podgraf", "komponente", "klika", "meje"]
    },
    {
      id: "gr-o47", topic: "barvanje-izomorfnost", difficulty: 3, source: "ADM-Grafi.pdf, začetek §14",
      prompt: H`Primerjaj barvanje vozlišč in povezav. Dokaži spodnjo mejo \(\chi'(G)\ge\Delta(G)\), izračunaj \(\chi'\) za poti in cikle ter razloži, zakaj zanke definicijo pokvarijo.`,
      answer: H`Pri barvanju vozlišč preslikava \(c:V\to\{1,\ldots,k\}\) zahteva različni barvi na krajiščih vsake povezave; minimum je \(\chi(G)\). Pri barvanju povezav preslikava \(c':E\to\{1,\ldots,k\}\) zahteva različni barvi za povezavi s skupnim krajiščem; minimum je \(\chi'(G)\). V vozlišču stopnje \(\Delta\) je \(\Delta\) paroma incidentnih povezav, zato morajo dobiti \(\Delta\) različnih barv in \(\chi'(G)\ge\Delta(G)\). Pot \(P_n\), \(n\ge3\), ima \(\Delta=2\), izmenično barvanje povezav z dvema barvama pa zadošča, zato je \(\chi'=2\); za \(P_2\) je \(\chi'=1\). Pri sodem ciklu izmenično barvanje sklene pravilno in \(\chi'=2\). Pri lihem ciklu dve barvi ob vrnitvi povzročita konflikt, tri pa zadoščajo, zato je \(\chi'=3\). Zanka ima skupno krajišče sama s seboj; dobesedni pogoj bi zahteval, da je njena barva različna od same sebe. Zato PDF barvanje povezav definira za multigrafe brez zank. Ne smemo zamenjati \(\chi\) in \(\chi'\): za zvezdo \(K_{1,n}\) je \(\chi=2\), toda \(\chi'=n\).`,
      hint: H`V vozlišču največje stopnje poglej vse incidentne povezave hkrati.`,
      rubric: ["obe definiciji", "dokaz spodnje meje", "poti in oba tipa ciklov", "zanka in zvezda kot ločitev χ od χ'"], tags: ["barvanje povezav", "kromatični indeks", "spodnja meja"]
    },
    {
      id: "gr-o48", topic: "grafi-osnove", difficulty: 2, source: "ADM-Grafi.pdf, §11.1 in uporaba izomorfnosti pri standardnih družinah",
      prompt: H`Definiraj izomorfizem dveh enostavnih grafov in komplement grafa. Dokaži, katere lastnosti izomorfizem nujno ohranja, pojasni zvezo med izomorfizmom in komplementom ter s protiprimerom pokaži, da enako zaporedje stopenj še ne zadošča za izomorfnost.`,
      answer: H`Izomorfizem \(\varphi:G\to H\) je bijekcija \(V(G)\to V(H)\), za katero za vsa različna \(u,v\) velja \(uv\in E(G)\iff\varphi(u)\varphi(v)\in E(H)\). Ker bijekcija ohranja natanko vse sosednosti, ohrani red, velikost, stopnjo vsakega ustreznega vozlišča, število komponent, obstoj in dolžine ciklov, dvodelnost ter kromatično število. Komplement \(\overline G\) ima ista vozlišča, različni vozlišči pa sta v njem sosednji natanko tedaj, ko v \(G\) nista. Zato ista \(\varphi\) iz \(G\cong H\) da tudi \(\overline G\cong\overline H\). Enakost posameznega invarianta ali izbranega podseznama ni zadostna: \(C_6\) in \(C_3\mathbin{\dot\cup}C_3\) imata po šest vozlišč, šest povezav in vsa vozlišča stopnje 2, vendar je prvi graf povezan, drugi pa ima dve komponenti, zato nista izomorfna. Primer dokazuje nezadostnost prav teh treh skupnih podatkov, ne pa enakosti vseh prej naštetih invariantov.`,
      hint: H`Izomorfizem mora ohranjati povezavo v obe smeri; za protiprimer primerjaj povezanost dveh 2-regularnih grafov.`,
      rubric: ["formalna bijekcija z ekvivalenco sosednosti", "definicija komplementa", "vsaj štirje pravilni invarianti in zveza komplementov", "protiprimer zadostnosti stopenj"], tags: ["izomorfizem", "komplement", "invarianti", "protiprimer"]
    },
    {
      id: "gr-o49", topic: "drevesa-vpeta", difficulty: 3, source: "ADM-Grafi.pdf, posledice §12.1–12.3",
      prompt: H`Naj bo \(G\) povezan graf z \(n\) vozlišči in \(m\) povezavami. Dokaži \(m\ge n-1\) in karakteriziraj primer enakosti. Nato dokaži, da moramo za pridobitev poljubnega vpetega drevesa izbrisati natanko \(m-n+1\) povezav, ter s konkretnim grafom pokaži, da izbris poljubnih toliko povezav še ne zagotovi vpetega drevesa.`,
      answer: H`Ker je \(G\) povezan, vsebuje vpeto drevo \(T\). Drevo na \(n\) vozliščih ima \(n-1\) povezav in \(E(T)\subseteq E(G)\), zato \(m\ge n-1\). Če je \(m=n-1\), ima \(G\) enako mnogo povezav kot njegovo vpeto drevo, zato je \(E(G)=E(T)\) in je \(G\) sam drevo. Obratno ima vsako drevo na \(n\) vozliščih natanko \(n-1\) povezav.

Vsako vpeto drevo grafa \(G\) vsebuje natanko \(n-1\) od njegovih \(m\) povezav, zato ga dobimo z izbrisom natanko
\[m-(n-1)=m-n+1\]
povezav. Ta pogoj je nujen, ne pa zadosten: izbrisani robovi morajo hkrati prekiniti vse cikle in ohraniti povezanost. Naj bo \(G\) trikotnik \(abc\) z dodanim listom \(d\), povezanim samo z \(a\). Tedaj sta \(n=m=4\), zato moramo izbrisati eno povezavo. Če izbrišemo katerokoli povezavo trikotnika, dobimo vpeto drevo. Če pa izbrišemo most \(ad\), ostaneta trikotnik in izolirano vozlišče: podgraf ima pravilnih \(n-1=3\) povezav, vendar je nepovezan in cikličen. Sama enačba o številu povezav torej nikoli ne nadomesti preverjanja povezanosti ali acikličnosti.`,
      hint: H`Najprej v \(G\) izberi vpeto drevo; za protiprimer uporabi graf, ki ima hkrati cikel in most.`,
      rubric: ["dokaz spodnje meje prek vpetega drevesa", "obe smeri karakterizacije enakosti", "izpeljava m−n+1", "veljaven in neveljaven izbris na istem konkretnem grafu"], tags: ["povezan graf", "vpeto drevo", "presežek povezav", "protiprimer"]
    },
    {
      id: "gr-o50", topic: "grafi-osnove", difficulty: 3, source: "ADM-Grafi.pdf, §11.1–11.2",
      prompt: H`Definiraj dvodelni graf in dokaži karakterizacijo: končen enostaven graf je dvodelen natanko tedaj, ko ne vsebuje lihega cikla. Nato s kriterijem razvrsti cikle in gozdove ter navedi primer grafa, pri katerem dvodelnost odpove.`,
      answer: H`Graf je dvodelen, če lahko \(V(G)\) razcepimo na disjunktni množici \(A\) in \(B\), tako da ima vsaka povezava eno krajišče v vsakem delu. Če je graf dvodelen, se deli vzdolž vsakega cikla izmenjujejo, zato se lahko vrnemo v začetno vozlišče šele po sodem številu korakov; lihega cikla ni. Obratno predpostavimo, da graf nima lihega cikla. V vsaki komponenti izberemo koren \(r\) ter v \(A\) damo vozlišča s sodo, v \(B\) pa vozlišča z liho razdaljo od \(r\). Če bi povezava \(uv\) imela obe krajišči v istem delu, vzamemo najkrajši poti od \(r\) do \(u\) in \(v\) ter njun zadnji skupni vrh. Preostanka poti skupaj z \(uv\) tvorita lih cikel, protislovje. Zato vse povezave potekajo med deloma in graf je dvodelen. Sledi, da je \(C_n\) dvodelen natanko za sodi \(n\). Vsak gozd je dvodelen, ker nima nobenega cikla; dele lahko dobimo tudi z izmeničnim barvanjem po nivojih dreves. Trikotnik \(K_3=C_3\) je najkrajši protiprimer dvodelnosti.`,
      hint: H`Za obratno smer razdeli vsako komponento po pariteti razdalje od izbranega korena.`,
      rubric: ["definicija dvodelnosti", "nujnost s pariteto cikla", "zadostnost z razdaljami", "pravilna razvrstitev in protiprimer"], tags: ["dvodelen graf", "lihi cikel", "karakterizacija", "dokaz"]
    },
    {
      id: "gr-o51", topic: "grafi-osnove", difficulty: 2, source: "ADM-Grafi.pdf, §11.1–11.2",
      prompt: H`Definiraj razdaljo, premer in notranji obseg povezanega enostavnega grafa. Dokaži, da ima graf z vsaj dvema vozliščema premer \(1\) natanko tedaj, ko je poln, ter da je notranji obseg \(3\) natanko tedaj, ko graf vsebuje trikotnik. Izračunaj obe količini za \(P_n\), \(C_n\) in \(K_n\), kjer sta definirani.`,
      answer: H`Razdalja \(d_G(u,v)\) je dolžina najkrajše poti med \(u\) in \(v\), premer povezanega grafa pa \(\operatorname{diam}(G)=\max_{u,v}d_G(u,v)\). Notranji obseg oziroma ožina je dolžina najkrajšega cikla; za gozd takega cikla ni, zato vrednosti ne določimo oziroma po izbrani razširjeni konvenciji pišemo \(\infty\). Če je \(\operatorname{diam}(G)=1\), sta poljubni različni vozlišči na razdalji 1 in zato sosednji, torej je \(G\) poln. Obratno so v \(K_n\) vsa različna vozlišča sosednja, zato je premer 1 za \(n\ge2\). V enostavnem grafu ima vsak cikel dolžino vsaj 3, zato je notranji obseg 3 natanko tedaj, ko obstaja cikel dolžine 3, torej trikotnik. Za \(P_n\) je premer \(n-1\), notranjega obsega pa ni. Za \(C_n\), \(n\ge3\), sta \(\operatorname{diam}(C_n)=\lfloor n/2\rfloor\) in notranji obseg \(n\). Za \(K_n\), \(n\ge3\), sta premer 1 in notranji obseg 3; \(K_2\) ima premer 1, vendar nima cikla, \(K_1\) pa ima premer 0.`,
      hint: H`Premer 1 pomeni, da je vsaka dvojica različnih vozlišč povezana neposredno; pri ciklu primerjaj obe smeri med vozliščema.`,
      rubric: ["tri natančne definicije", "obe ekvivalenci", "izračun za poti in cikle", "polni grafi z robnimi primeri"], tags: ["razdalja", "premer", "notranji obseg", "standardni grafi"]
    },
    {
      id: "gr-o52", topic: "drevesa-vpeta", difficulty: 3, source: "ADM-Grafi.pdf, §12.1–12.2",
      prompt: H`Naj bo \(G\) povezan multigraf. Dokaži, da je povezava \(e\) vsebovana v vsakem vpetem drevesu grafa \(G\) natanko tedaj, ko je most. Poleg tega utemelji, da je vsaka povezava, ki ni zanka, vsebovana v vsaj enem vpetem drevesu, in vse trditve ponazori na ciklu z dodano zanko.`,
      answer: H`Vpeto drevo je vpeti podgraf, ki je povezan in brez ciklov; most je povezava, katere izbris poveča število komponent. Če je \(e=uv\) most in bi ga vpeto drevo \(T\) izpustilo, bi enolična pot med \(u\) in \(v\) v \(T\) ležala v \(G-e\), zato izbris \(e\) ne bi ločil krajišč, protislovje. Če \(e\) ni most, je \(G-e\) še vedno povezan in ima vpeto drevo; to je tudi vpeto drevo grafa \(G\), ki povezave \(e\) ne vsebuje. S tem dobimo ekvivalenco. Naj bo zdaj \(e\) povezava, ki ni zanka. Začnemo z gozdom, ki vsebuje samo \(e\) in vsa vozlišča. Dokler ni povezan, dodamo povezavo med dvema njegovima komponentama; taka povezava obstaja zaradi povezanosti \(G\) in ne ustvari cikla. Končni podgraf je vpeto drevo, ki vsebuje \(e\). Zanka ne more pripadati nobenemu drevesu, ker je že sama cikel. V grafu \(C_n\) ni mostov: za vsako ciklično povezavo obstajajo vpeta drevesa, ki jo vsebujejo, in vpeto drevo, ki jo izpusti. Dodana zanka pa ni v nobenem vpetem drevesu.`,
      hint: H`Za »ni most« uporabi vpeto drevo grafa \(G-e\); dano nezančno povezavo pa razširi iz gozda do maksimalnega gozda.`,
      rubric: ["definiciji", "obe smeri karakterizacije mostu", "razširitev nezančne povezave", "pravilen primer z zanko"], tags: ["vpeto drevo", "most", "zanka", "karakterizacija"]
    },
    {
      id: "gr-o53", topic: "drevesa-vpeta", difficulty: 3, source: "ADM-Grafi.pdf, posledice §12.1–12.2",
      prompt: H`Naj bosta \(T_1\) in \(T_2\) vpeta drevesa istega povezanega grafa. Dokaži izmenjalno lastnost: za vsako \(e\in E(T_1)\setminus E(T_2)\) obstaja \(f\in E(T_2)\setminus E(T_1)\), da sta tudi \(T_1-e+f\) in \(T_2-f+e\) vpeti drevesi. Razloži dokaz s prerezom in fundamentalnim ciklom ter ga izvedi na konkretnem ciklu \(C_4\).`,
      answer: H`Izbris \(e\) razdeli drevo \(T_1\) na komponenti z množicama vozlišč \(A\) in \(B\). Krajišči povezave \(e\) sta v različnih delih. Enolična pot med njima v \(T_2\) mora zato prečkati prerez med \(A\) in \(B\); izberimo na njej povezavo \(f\) z enim krajiščem v vsakem delu. Ker v \(T_1-e\) ni nobene povezave čez ta prerez, velja \(f\notin T_1\), medtem ko je \(f\in T_2\). Dodatek \(f\) znova poveže komponenti \(T_1-e\) brez cikla, zato je \(T_1-e+f\) vpeto drevo. Po drugi strani dodatek \(e\) drevesu \(T_2\) ustvari fundamentalni cikel, sestavljen iz \(e\) in omenjene poti v \(T_2\). Povezava \(f\) leži na tem ciklu, zato njen izbris cikel prekine, povezanost pa ostane; tudi \(T_2-f+e\) je vpeto drevo. Na \(C_4\) naj \(T_1=C_4-e_4\) in \(T_2=C_4-e_2\). Za \(e=e_2\) izberemo \(f=e_4\); izmenjava preprosto zamenja manjkajoči povezavi in obe dobljeni množici treh povezav sta poti skozi vsa štiri vozlišča. Zahteva, da sta podgrafa vpeti drevesi, je bistvena: pri poljubnih acikličnih podgrafih ni nujno niti enako število povezav niti skupna množica vozlišč.`,
      hint: H`Po izbrisu \(e\) iz \(T_1\) poišči povezavo poti v \(T_2\), ki prečka nastali prerez.`,
      rubric: ["prerez po izbrisu e", "pravilna izbira f", "dokaz za obe novi drevesi", "konkreten C4 in omejitev trditve"], tags: ["vpeta drevesa", "izmenjalna lastnost", "prerez", "fundamentalni cikel"]
    },
    {
      id: "gr-o54", topic: "euler-hamilton", difficulty: 3, source: "ADM-Grafi.pdf, posledica Eulerjevega kriterija v §13.1",
      prompt: H`Uporabi konvencijo, da sta v multigrafu zanka cikel dolžine 1, par vzporednih povezav pa cikel dolžine 2. Dokaži strukturno različico Eulerjevega kriterija: povezave končnega multigrafa lahko razdelimo na paroma robno disjunktne cikle natanko tedaj, ko ima vsako vozlišče sodo stopnjo. Pojasni povezavo z Eulerjevimi obhodi ter s protiprimerom pokaži, da pogoj »vsaka povezava leži na nekem ciklu« sam ne zadošča.`,
      answer: H`Cikel tukaj razumemo po navedeni multigrafski konvenciji; zanka k stopnji svojega vozlišča prispeva dve incidenci. Če so povezave razdeljene na cikle, vsak cikel pri vsakem obiskanem vozlišču prispeva dve incidenci; vsota takih prispevkov je soda, zato so vse stopnje sode. Obrat dokažemo po številu povezav. Prazen graf ima prazen razcep. V neprazni komponenti samih sodih stopenj začnemo slediti povezavam brez ponavljanja. Zaradi paritete se ne moremo ustaviti drugje kot v začetnem vozlišču, zato dobimo sklenjeno sled; če se v njej ponavljajo notranja vozlišča, jo razcepimo na cikle. Odstranitev povezav teh ciklov zmanjša vsako stopnjo za sodo število, zato v preostanku vse stopnje ostanejo sode. Indukcija razcepi še preostale povezave. Če je graf povezan po vseh vozliščih pozitivne stopnje, lahko cikle z vrivanjem združimo v en Eulerjev obhod; pri več komponentah dobimo po en Eulerjev obhod v vsaki neprazni komponenti. Šibkejši pogoj ne zadošča: v grafu iz trikotnikov \(abc\) in \(abd\), ki si delita povezavo \(ab\), vsaka povezava leži na ciklu, vendar imata \(a\) in \(b\) stopnjo 3. Graf zato nima Eulerjevega obhoda in njegovih povezav ni mogoče razdeliti na cikle.`,
      hint: H`Pri odstranitvi cikla se stopnja vsakega njegovega vozlišča zmanjša za dve; nato uporabi indukcijo.`,
      rubric: ["dokaz nujnosti", "indukcijski dokaz zadostnosti", "zveza z Eulerjevim obhodom", "ustrezen protiprimer"], tags: ["Euler", "razcep na cikle", "sode stopnje", "protiprimer"]
    },
    {
      id: "gr-o55", topic: "euler-hamilton", difficulty: 3, source: "ADM-Grafi.pdf, §13.2 in standardne družine",
      prompt: H`Naj bo \(G\) graf z \(|V(G)|\ge2\), \(G^+\) pa graf, ki ga iz \(G\) dobimo z novim vozliščem, sosednjim z vsemi starimi vozlišči. Dokaži, da ima \(G\) Hamiltonovo pot natanko tedaj, ko ima \(G^+\) Hamiltonov cikel. Nato za \(m,n\ge1\) s tem ali neposrednim izmenjevanjem popolnoma razvrsti, kdaj ima \(K_{m,n}\) Hamiltonovo pot, in primerjaj pogoj s pogojem za Hamiltonov cikel.`,
      answer: H`Hamiltonova pot vsebuje vsako vozlišče natanko enkrat, Hamiltonov cikel pa je cikel skozi vsa vozlišča. Ker ima \(G\) vsaj dve vozlišči, ima Hamiltonova pot vsaj eno povezavo. Če je \(v_1v_2\cdots v_k\) Hamiltonova pot v \(G\) in je \(x\) novo univerzalno vozlišče, je \(xv_1v_2\cdots v_kx\) Hamiltonov cikel dolžine vsaj 3 v \(G^+\). Obratno Hamiltonov cikel v \(G^+\) po odstranitvi \(x\) in njegovih dveh incidentnih povezav postane pot, ki vsebuje vsa vozlišča grafa \(G\). Omejitev je nujna: \(K_1\) ima Hamiltonovo pot dolžine 0, medtem ko \(K_1^+=K_2\) nima cikla. V \(K_{m,n}\) mora vsaka pot izmenjevati oba dela, zato se števili uporabljenih vozlišč iz delov lahko razlikujeta za največ 1. Hamiltonova pot je torej mogoča le, če \(|m-n|\le1\). Pogoj tudi zadošča: če je \(m=n\), vozlišča naštejemo \(a_1,b_1,a_2,b_2,\ldots,a_m,b_m\); če je \(m=n+1\), uporabimo \(a_1,b_1,\ldots,a_n,b_n,a_{n+1}\), drugi primer pa je simetričen. Hamiltonov cikel se mora tudi skleniti in zato uporabi enako število vozlišč iz obeh delov; za neprazna dela obstaja natanko pri \(m=n\ge2\). Tako ima na primer \(K_{2,3}\) Hamiltonovo pot, nima pa Hamiltonovega cikla, medtem ko \(K_{2,4}\) nima niti Hamiltonove poti.`,
      hint: H`Na ciklu grafa \(G^+\) odstrani novo vozlišče; v dvodelnem grafu pa beleži zaporedje delov vzdolž poti.`,
      rubric: ["dokaz obeh smeri transformacije", "nujnost za K_mn", "konstrukcija pri razliki največ 1", "primerjava s Hamiltonovim ciklom"], tags: ["Hamiltonova pot", "Hamiltonov cikel", "univerzalno vozlišče", "polni dvodelni graf"]
    },
    {
      id: "gr-o56", topic: "barvanje-izomorfnost", difficulty: 3, source: "ADM-Grafi.pdf, §14.1 in monotonost barvanja",
      prompt: H`Definiraj brisanje vozlišča in povezave ter dokaži oceni \(\chi(G-v)\le\chi(G)\le\chi(G-v)+1\) in \(\chi(G-e)\le\chi(G)\le\chi(G-e)+1\). Za vsako oceno podaj primer, kjer se kromatično število zmanjša za ena, in primer, kjer ostane nespremenjeno.`,
      answer: H`Graf \(G-v\) dobimo z izbrisom vozlišča \(v\) in vseh njegovih incidentnih povezav, \(G-e\) pa z izbrisom same povezave \(e\). Oba sta podgrafa grafa \(G\), zato monotonost da spodnji oceni \(\chi(G-v)\le\chi(G)\) in \(\chi(G-e)\le\chi(G)\). Pravilno \(k\)-barvanje grafa \(G-v\) razširimo na \(G\) tako, da \(v\) dobi novo barvo, zato \(\chi(G)\le\chi(G-v)+1\). Pri \(e=uv\) vzamemo optimalno barvanje \(G-e\). Če sta \(u,v\) že različno obarvana, je veljavno tudi za \(G\); če imata isto barvo, enemu krajišču dodelimo novo barvo. Zato \(\chi(G)\le\chi(G-e)+1\). Pri brisanju vozlišča je razlika 1 za \(K_n\), saj \(K_n-v\cong K_{n-1}\); nespremenjena je na primer pri izbrisu krajišča iz \(C_4\), ker imata \(C_4\) in nastali \(P_3\) kromatično število 2. Pri povezavi je razlika 1, če iz \(K_3\) izbrišemo povezavo in dobimo \(P_3\); nespremenjena pa pri izbrisu povezave iz \(C_4\), ko dobimo \(P_4\), saj sta oba grafa dvodelna in neprazna. Oceni povesta, da ena lokalna odstranitev kromatičnega števila ne more zmanjšati za več kot ena.`,
      hint: H`Za zgornjo mejo pri vozlišču dovoli eno novo barvo; pri povezavi jo potrebuješ le, če imata krajišči isto barvo.`,
      rubric: ["obe definiciji", "dokaz obeh dvojnih ocen", "ostra primera", "primera nespremenjene vrednosti"], tags: ["kromatično število", "brisanje vozlišča", "brisanje povezave", "meje"]
    },
    {
      id: "gr-o57", topic: "barvanje-izomorfnost", difficulty: 3, source: "ADM-Grafi.pdf, §11.1 in §14.1",
      prompt: H`Za enostaven graf \(G\) na \(n\) vozliščih definiraj komplement in kromatično število ter dokaži neenakost \(\chi(G)\chi(\overline G)\ge n\). Izpelji spodnjo mejo za večje izmed obeh kromatičnih števil ter preveri ostrino na polnem in praznem grafu; s samokomplementarnim ciklom \(C_5\) pokaži, da enakost ni samoumevna.`,
      answer: H`Komplement \(\overline G\) ima isto množico vozlišč, različni vozlišči pa sta v njem sosednji natanko tedaj, ko v \(G\) nista. Kromatično število je najmanjše število barv v pravilnem barvanju vozlišč. Naj bo \(a=\chi(G)\) in \(b=\chi(\overline G)\). Barvni razred v \(G\) je neodvisna množica v \(G\), barvni razred v \(\overline G\) pa je klika v \(G\). Presek enega razreda prvega in enega razreda drugega barvanja zato vsebuje največ eno vozlišče: dve različni vozlišči v preseku bi morali biti v \(G\) hkrati nesosednji in sosednji. Obstaja \(ab\) parov barvnih razredov in vsako od \(n\) vozlišč pripada natanko enemu paru, zato \(n\le ab=\chi(G)\chi(\overline G)\). Posledično je \(\max\{\chi(G),\chi(\overline G)\}\ge\lceil\sqrt n\rceil\), sicer bi bil produkt manjši od \(n\). Za \(G=K_n\) je \(\chi(G)=n\), \(\chi(\overline G)=1\), zato velja enakost; enako po zamenjavi vlog za prazen graf. Cikel \(C_5\) je izomorfen svojemu komplementu in ima kromatično število 3, zato je produkt \(9>5\). Primer pokaže, da spodnja meja ni vedno dosežena.`,
      hint: H`Presek barvnega razreda v \(G\) in barvnega razreda v komplementu ne more vsebovati dveh vozlišč.`,
      rubric: ["obe definiciji", "dokaz s pari barvnih razredov", "izpeljana korenska meja", "ostra primera in C5"], tags: ["komplement", "kromatično število", "produktna meja", "dokaz"]
    },
    {
      id: "gr-o58", topic: "grafi-osnove", difficulty: 2,
      source: "ADM-Grafi.pdf, §11.1; uporabnikov artefakt »ADM — teorija za izpit«, vprašanje 63",
      prompt: H`Definiraj polni graf \(K_n\) in na dva vsebinsko različna načina dokaži, da ima natanko \(\frac{n(n-1)}2=\binom n2\) povezav: prvič s štetjem dvoelementnih podmnožic, drugič z lemo o rokovanju. Pojasni, kaj pri vsakem dokazu štejemo, in preveri robna primera \(K_1\) in \(K_2\).`,
      answer: H`Polni enostavni graf \(K_n\) ima \(n\) vozlišč in povezavo med vsakim parom različnih vozlišč.
      <p><strong>Prvi dokaz — izbor krajišč.</strong> Povezava enostavnega neusmerjenega grafa je neurejeni par oziroma dvoelementna podmnožica množice vozlišč. Zato je povezav toliko kot izbir dveh vozlišč izmed \(n\):</p>
      \[
      |E(K_n)|=\binom n2=\frac{n(n-1)}2.
      \]
      <p>Tu vsako povezavo preštejemo neposredno natanko enkrat.</p>
      <p><strong>Drugi dokaz — incidence.</strong> Vsako vozlišče v \(K_n\) je sosednje preostalim \(n-1\) vozliščem, zato je \(\deg v=n-1\). Lema o rokovanju da</p>
      \[
      2|E(K_n)|=\sum_{v\in V}\deg v=n(n-1),
      \]
      <p>od koder spet sledi \(|E(K_n)|=n(n-1)/2\). Tu smo najprej prešteli incidence: vsaka povezava nastopi pri obeh krajiščih, zato delimo z 2.</p>
      <p>Za \(K_1\) obe formuli dasta 0 povezav. Za \(K_2\) dasta 1 povezavo, kar je edini par njegovih vozlišč. Dokaza uporabljata različni perspektivi — izbor objekta in dvojno štetje incidenc — zato sta oba uporabna tudi v drugih nalogah.</p>`,
      hint: H`Pri prvem dokazu je povezava 2-elementna množica; pri drugem ima vsako vozlišče stopnjo \(n-1\).`,
      rubric: ["definicija polnega grafa", "dokaz z dvoelementnimi podmnožicami", "dokaz z rokovanjem in razlaga faktorja 2", "oba robna primera in primerjava metod"],
      tags: ["polni graf", "dvojno štetje", "lema o rokovanju", "binomski koeficient"]
    },
    {
      id: "gr-o59", topic: "euler-hamilton", difficulty: 3,
      source: "ADM-Grafi.pdf, §13.2; uporabnikov artefakt »ADM — teorija za izpit«, vprašanje 73",
      prompt: H`Standardni Petersenov graf \(P_{5,2}\) označi z zunanjimi vozlišči \(u_i\), notranjimi \(v_i\) in prečkami \(u_iv_i\), kjer so indeksi modulo 5. Dokaži, da graf ni Hamiltonov: najprej utemelji, zakaj bi Hamiltonov cikel uporabil natanko 2 ali 4 prečke, nato izčrpno izloči oba primera. Nazadnje pojasni, kaj ta graf pove o komponentnem pogoju za Hamiltonovost.`,
      answer: H`Povezave so \(u_iu_{i+1}\), \(u_iv_i\) in \(v_iv_{i+2}\), indeksi pa so v \(\mathbb Z_5\). Vsak cikel prečka rez med zunanjimi in notranjimi vozlišči sodo mnogokrat: vsak vstop v drugi del zahteva tudi izstop. Hamiltonov cikel mora obiskati oba dela, zato ne uporabi 0 prečk; ker jih je skupaj 5, ostaneta možnosti 2 in 4.
      <p><strong>Dve prečki.</strong> Naj bosta uporabljeni prečki z indeksoma \(i,j\). Na zunanjih vozliščih ostane pot skozi vseh pet vozlišč. Ker jo dobimo iz zunanjega petcikla z izbrisom ene povezave, sta njeni krajišči sosednji:</p>
      \[
      j-i\equiv\pm1\pmod5.
      \]
      <p>Notranje povezave tvorijo petcikel s korakom 2. Tudi tam bi morala biti \(v_i,v_j\) krajišči poti skozi vseh pet notranjih vozlišč, zato</p>
      \[
      j-i\equiv\pm2\pmod5.
      \]
      <p>Noben neničelni ostanek modulo 5 ni hkrati v množicah \(\{\pm1\}\) in \(\{\pm2\}\), zato je ta primer nemogoč.</p>
      <p><strong>Štiri prečke.</strong> Zaradi rotacijske simetrije smemo privzeti, da manjka \(u_0v_0\). Ker mora imeti \(u_0\) na ciklu stopnjo 2, sta vključeni \(u_4u_0,u_0u_1\). Vozlišči \(u_1,u_4\) že uporabita še svoji prečki, zato sta \(u_1u_2,u_3u_4\) izključeni in je prisiljena \(u_2u_3\). Analogno pri notranjem \(v_0\) dobimo \(v_2v_0,v_0v_3\), nato pa je prisiljena še \(v_4v_1\). Skupaj s prečkami \(u_iv_i\) za \(i=1,2,3,4\) dobimo dva disjunktna cikla</p>
      \[
      u_0u_1v_1v_4u_4u_0
      \quad\text{in}\quad
      u_2u_3v_3v_0v_2u_2,
      \]
      <p>ne enega cikla skozi vseh deset vozlišč. Tudi ta primer odpove, zato Petersenov graf ni Hamiltonov.</p>
      <p>Petersenov graf kljub temu za vsako neprazno \(S\subseteq V\) izpolni \(c(G-S)\le|S|\). Je torej protiprimer zadostnosti: pogoj je potreben in njegova kršitev ovrže Hamiltonovost, njegova izpolnitev pa Hamiltonovega cikla ne zagotovi.</p>`,
      hint: H`Cikel prečka vsak rez sodo mnogokrat. Pri štirih prečkah brez škode za splošnost izpusti \(u_0v_0\) in nato pri vsakem vozlišču prisili stopnjo 2.`,
      rubric: ["pravilna definicija in paritetni argument za prečke", "popolna izločitev dveh prečk", "popolna izločitev štirih prečk z dvema 5-cikloma", "pravilen sklep o potrebnem in nezadostnem komponentnem pogoju"],
      tags: ["Petersen", "Hamiltonov cikel", "analiza primerov", "potrebni pogoj"]
    },
  ];

  const exercises = [];
  window.ADM_MODULE_GRAPHS = { topics, flashcards, quiz, questions, exercises };
})();
