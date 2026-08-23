(() => {
  "use strict";

  const H = String.raw;
  const topics = [
    {
      id: "izbori-binomi",
      number: 5,
      group: "kombinatorika",
      title: "Izbori, permutacije in binomski koeficienti",
      short: "Kako iz besedila prepoznaš pravi model: vrstni red, ponavljanje, razločljivost in omejitve.",
      accent: "#f3bf67",
      minutes: 70,
      importance: "zelo visoka",
      sources: ["kombinatorika", "teorija-2021", "teorija-2021-roki", "teorija-zbirka"],
      examNote: "Teorijski izpiti izrecno zahtevajo kombinatorično definicijo binomskega simbola, dokaz simetrije brez faktorske formule, Pascalovo identiteto z utemeljitvijo ter definicijo multimnožice in njene moči.",
      outcomes: [
        "v manj kot minuti razvrstiti nalogo med štiri osnovne tipe izborov",
        "utemeljiti formule s pravilom produkta ali bijekcijo",
        "dokazati simetrijo in Pascalovo identiteto brez faktorske formule",
        "pravilno obravnavati ponavljajoče se elemente, bloke in komplementarno štetje"
      ],
      sections: [
        {
          id: "stevni-pravili",
          kind: "definition",
          label: "Temelj",
          title: "Pravilo vsote in pravilo produkta",
          html: H`
            <p><strong>Pravilo vsote.</strong> Če lahko izid nastane na enega od med seboj izključujočih načinov, pri čemer je možnosti v posameznih primerih \(a_1,\ldots,a_k\), je vseh možnosti \(a_1+\cdots+a_k\).</p>
            <p><strong>Pravilo produkta.</strong> Če postopek sestavlja \(k\) zaporednih odločitev in ima \(i\)-ta odločitev vedno \(a_i\) možnosti ne glede na prejšnje odločitve, je vseh izidov \(a_1\cdots a_k\).</p>
            <div class="comparison-grid">
              <div class="mini-card"><strong>ALI → seštej</strong><p>Geslo se začne s črko <em>ali</em> s števko; primera se ne prekrivata.</p></div>
              <div class="mini-card"><strong>IN NATO → zmnoži</strong><p>Izberi prvo mesto, nato drugo, nato tretje.</p></div>
            </div>
            <blockquote>Pred uporabo vsote vedno preveri, da se primeri ne prekrivajo. Če se, potrebuješ vključitve in izključitve.</blockquote>`
        },
        {
          id: "stiri-vprasanja",
          kind: "method",
          label: "Odločitveno drevo",
          title: "Pred formulo odgovori na štiri vprašanja",
          html: H`
            <ol>
              <li><strong>Ali vrstni red šteje?</strong> »razporedi«, »beseda«, »prvo–drugo–tretje mesto« pomenijo da; »izberi komisijo« običajno ne.</li>
              <li><strong>Ali je ponavljanje dovoljeno?</strong> Ali isti element lahko uporabimo večkrat?</li>
              <li><strong>Ali izbiramo vse elemente?</strong> Če da in vrstni red šteje, gre za permutacijo.</li>
              <li><strong>Ali elemente in skupine ločimo?</strong> Dve enaki žogi nista isto kot dve oštevilčeni žogi; dve enaki škatli nista isto kot sobi A in B.</li>
            </ol>
            <div class="formula-panel">\[
              \begin{array}{c|cc}
              & \text{vrstni red šteje} & \text{vrstni red ne šteje}\\ \hline
              \text{brez ponavljanja} & \dfrac{n!}{(n-r)!} & \binom nr\\[4pt]
              \text{s ponavljanjem} & n^r & \binom{n+r-1}{r}
              \end{array}
            \]</div>
            <p>Ta tabela velja za izbore dolžine oziroma moči \(r\) iz \(n\) različnih tipov elementov. Omejitve, kot so »vsaj en A«, »elementi skupaj« ali »nobena škatla prazna«, zahtevajo dodaten korak.</p>`
        },
        {
          id: "urejeni-izbori",
          kind: "definition",
          label: "Definiciji",
          title: "Urejeni izbori: variacije in permutacije",
          html: H`
            <p><strong>Urejeni izbor s ponavljanjem</strong> dolžine \(r\) iz \(n\)-elementne množice je \(r\)-terica. Za vsako mesto je \(n\) možnosti, zato jih je \(n^r\).</p>
            <p><strong>Urejeni izbor brez ponavljanja</strong> je \(r\)-terica različnih elementov. Izbiramo zaporedoma med \(n,n-1,\ldots,n-r+1\) možnostmi:</p>
            <div class="formula-panel">\[n^{\underline r}=n(n-1)\cdots(n-r+1)=\frac{n!}{(n-r)!}.\]</div>
            <p><strong>Permutacija</strong> je urejeni izbor vseh \(n\) elementov, zato je permutacij \(n!\). V zapiskih je permutacija predstavljena tudi kot linearna ureditev elementov oziroma, če sta domena in kodomena ista urejena množica, kot bijektivna preslikava množice vase.</p>
            <blockquote>Protiprimer za avtomatsko uporabo \(n^r\): štirimestna PIN-koda dovoljuje ponavljanje, štirje dobitniki različnih nagrad pa ne morejo biti ista oseba, če naloga to prepove.</blockquote>`
        },
        {
          id: "izbori-formalno-in-dokazi",
          kind: "proof",
          label: "Definicije iz PDF-ja",
          title: "Formalni modeli štirih izborov in zakaj formule veljajo",
          html: H`
            <p>Naj bo \(N\) množica z \(|N|=n\). <strong>Urejeni izbor s ponavljanjem</strong> dolžine \(r\) je element kartezične potence \(N^r\). Množico vseh takih izborov zapiski označijo z \(V(N,r)\). Ker za vsako od \(r\) koordinat neodvisno izberemo enega od \(n\) elementov, je \(|V(N,r)|=n^r\). To lahko formalno dokažemo tudi z indukcijo po \(r\): izbor dolžine \(r+1\) razdelimo v \(n\) disjunktnih razredov glede na prvo komponento; vsak razred je v bijekciji z \(N^r\).</p>
            <p><strong>Urejeni izbor brez ponavljanja</strong> je \(r\)-terica paroma različnih elementov; obstaja le za \(r\le n\). Po zaporednih mestih dobimo</p>
            <div class="formula-panel">\[n^{\underline r}=n(n-1)\cdots(n-r+1)=\frac{n!}{(n-r)!}.\]</div>
            <p>Pri \(r=n\) je tak izbor <strong>permutacija</strong> množice \(N\), zato je permutacij \(n!\). Dogovora \(n^{\underline0}=0!=1\) izražata dejstvo, da obstaja natanko en prazen urejeni izbor oziroma ena permutacija prazne množice.</p>
            <p><strong>Neurejeni izbor brez ponavljanja</strong> je \(r\)-elementna podmnožica \(N\). Če vsako tako podmnožico uredimo na vseh \(r!\) načinov, dobimo vse urejene izbore brez ponavljanja, vsakokrat natanko enkrat. Zato</p>
            <div class="formula-panel">\[\binom nr\,r!=n^{\underline r},\qquad \binom nr=\frac{n!}{r!(n-r)!}.\]</div>
            <p><strong>Neurejeni izbor s ponavljanjem</strong> pa je multimnožica moči \(r\); njegova formula in formalna bijekcija sta navedeni v naslednjem razdelku.</p>`
        },
        {
          id: "neurejeni-izbori",
          kind: "definition",
          label: "Definiciji",
          title: "Neurejeni izbori: podmnožice in multimnožice",
          html: H`
            <p><strong>Neurejeni izbor brez ponavljanja</strong> moči \(r\) je \(r\)-elementna podmnožica. Njihovo število je binomski koeficient \(\binom nr\).</p>
            <p><strong>Multimnožica</strong> nad osnovno množico \(A\) vsakemu elementu priredi nenegativno kratnost. Njena moč je vsota kratnosti. Za \(n\ge1\) je neurejeni izbor s ponavljanjem moči \(r\) iz \(n\) tipov rešitev</p>
            <div class="formula-panel">\[x_1+\cdots+x_n=r,\qquad x_i\ge0,\]</div>
            <p>ki jo kodiramo z \(r\) zvezdicami in \(n-1\) pregradami. Zato je rešitev</p>
            <div class="formula-panel">\[\binom{r+n-1}{n-1}=\binom{r+n-1}{r}.\]</div>
            <p>Če zahtevamo \(x_i\ge1\), postavimo \(y_i=x_i-1\) in dobimo \(\binom{r-1}{n-1}\), če je \(r\ge n\). Pri prazni osnovni množici \(n=0\) obstaja le prazna multimnožica moči 0.</p>`
        },
        {
          id: "multimnozica-formalna-bijekcija",
          kind: "proof",
          label: "Definicija in bijekcija",
          title: "Multimnožica: kratnost, moč in strog dokaz formule",
          html: H`
            <p>Naj bo \(n\ge1\). Multimnožica z elementi iz \(A=\{a_1,\ldots,a_n\}\) je preslikava \(\mu:A\to\mathbb N_0\). Število \(\mu(a_i)\) je <strong>kratnost</strong> elementa \(a_i\), njena moč pa je \(|\mu|=\sum_{i=1}^n\mu(a_i)\). Vrstni red zapisovanja elementov ni pomemben. Navadna množica je poseben primer, ko so vse kratnosti 0 ali 1.</p>
            <p>Če je \(n=1\), obstaja natanko ena multimnožica moči \(r\): \(\mu(a_1)=r\); ustrezna množica pregrad je prazna in formula da \(\binom rr=1\). Naj bo zdaj \(n\ge2\). Za \(|\mu|=r\) določimo za \(j=1,\ldots,n-1\)</p>
            <div class="formula-panel">\[b_j=\mu(a_1)+\cdots+\mu(a_j)+j.\]</div>
            <p>Velja \(1\le b_1<\cdots<b_{n-1}\le n+r-1\), zato dobimo \((n-1)\)-elementno podmnožico \(B_\mu=\{b_1,\ldots,b_{n-1}\}\) množice \(\{1,\ldots,n+r-1\}\). Obratno iz \(b_1<\cdots<b_{n-1}\) obnovimo kratnosti:</p>
            <div class="formula-panel">\[\mu(a_1)=b_1-1,\quad \mu(a_j)=b_j-b_{j-1}-1\ (2\le j<n),\quad \mu(a_n)=n+r-1-b_{n-1}.\]</div>
            <p>Predpisa sta drug drugemu inverzna, torej gre za bijekcijo. Zato je multimnožic moči \(r\)</p>
            <div class="formula-panel">\[K(n,r)=\binom{n+r-1}{n-1}=\binom{n+r-1}{r}.\]</div>
            <p><strong>Primer.</strong> Pri \(A=\{a,b,c\}\) in \(r=4\) je vseh multimnožic \(\binom64=15\), kar je tudi odgovor neposrednega vprašanja s teorijskega izpita 2020/21.</p>
            <blockquote><strong>Protiprimer.</strong> Zapis \([a,a,b]\) ni 2-elementna množica \(\{a,b\}\): kot multimnožica ima moč 3, ker je kratnost \(a\) enaka 2.</blockquote>`
        },
        {
          id: "binomski-definicija",
          kind: "theorem",
          label: "Teorijski favorit",
          title: "Binomski koeficient: kombinatorična definicija in formula",
          html: H`
            <p><strong>Kombinatorična definicija.</strong> \(\binom nr\) je število \(r\)-elementnih podmnožic dane \(n\)-elementne množice, pri \(0\le r\le n\).</p>
            <p>Vsako \(r\)-elementno podmnožico lahko uredimo na \(r!\) načinov. Ker je urejenih izborov brez ponavljanja \(n^{\underline r}\), velja:</p>
            <div class="formula-panel">\[\binom nr=\frac{n^{\underline r}}{r!}=\frac{n!}{r!(n-r)!}.\]</div>
            <p>Na teorijskem izpitu najprej povej definicijo, šele nato faktorsko formulo. Če profesor izrecno zahteva kombinatorični dokaz, gola algebra s fakultetami ni odgovor.</p>`
        },
        {
          id: "simetrija-dokaz",
          kind: "proof",
          label: "Dokaz z bijekcijo",
          title: "Zakaj je \\(\\binom nr=\\binom n{n-r}\\)?",
          html: H`
            <p>Naj bo \(A\) fiksna \(n\)-elementna množica. Preštejemo njene \(r\)-elementne podmnožice.</p>
            <div class="proof-steps">
              <div class="proof-step"><p>Vsaki \(r\)-elementni podmnožici \(B\subseteq A\) priredimo komplement \(A\setminus B\).</p></div>
              <div class="proof-step"><p>Komplement ima natanko \(n-r\) elementov.</p></div>
              <div class="proof-step"><p>Preslikava je bijektivna: če komplement vzamemo še enkrat, dobimo prvotno množico.</p></div>
              <div class="proof-step"><p>Zato je \(r\)-elementnih in \((n-r)\)-elementnih podmnožic enako mnogo.</p></div>
            </div>
            <div class="qed">□</div>
            <blockquote>Primer: izbira 3 študentov od 10 je enakovredna izbiri 7 študentov, ki ostanejo zunaj komisije.</blockquote>`
        },
        {
          id: "pascal-dokaz",
          kind: "proof",
          label: "Dokaz z razbitjem",
          title: "Pascalova identiteta",
          html: H`
            <div class="formula-panel">\[\binom{n+1}{r}=\binom nr+\binom n{r-1}.\]</div>
            <p>Uporabljamo dogovor \(\binom nr=0\) za \(r<0\) ali \(r>n\); z njim formula velja tudi na robu, sicer jo navajamo za \(1\le r\le n\).</p>
            <p>Iz \((n+1)\)-elementne množice izbiramo \(r\) elementov in fiksiramo poseben element \(a\).</p>
            <div class="proof-steps">
              <div class="proof-step"><p>Izbori, ki <strong>ne vsebujejo</strong> \(a\): vseh \(r\) elementov izberemo med preostalimi \(n\), torej \(\binom nr\).</p></div>
              <div class="proof-step"><p>Izbori, ki <strong>vsebujejo</strong> \(a\): poleg njega izberemo še \(r-1\) elementov izmed \(n\), torej \(\binom n{r-1}\).</p></div>
              <div class="proof-step"><p>Primera sta disjunktna in pokrijeta vse izbore, zato ju po pravilu vsote seštejemo.</p></div>
            </div>
            <div class="qed">□</div>`
        },
        {
          id: "pascal-trikotnik-robni-pogoji",
          kind: "theorem",
          label: "Rekurzivni račun",
          title: "Pascalov trikotnik in vsi robni pogoji",
          html: H`
            <p>Pascalovo identiteto lahko zapišemo tudi v obliki</p>
            <div class="formula-panel">\[\binom{n+1}{r+1}=\binom nr+\binom n{r+1}.\]</div>
            <p>Skrajna člena vsake vrstice sta \(\binom n0=\binom nn=1\). Če uvedemo dogovor \(\binom nr=0\) za \(r<0\) ali \(r>n\), ista rekurzija velja brez posebnih izjem. Na \(r\)-tem mestu \(n\)-te vrstice Pascalovega trikotnika stoji \(\binom nr\).</p>
            <p><strong>Zakaj je rob 1?</strong> Prazno podmnožico izberemo na natanko en način in celo \(n\)-elementno množico prav tako na natanko en način. <strong>Zakaj je zunaj trikotnika 0?</strong> Podmnožica ne more imeti negativno mnogo ali več kot \(n\) elementov.</p>`
        },
        {
          id: "binomski-izrek",
          kind: "theorem",
          label: "Izrek",
          title: "Binomski izrek in tri ključne posledice",
          html: H`
            <div class="formula-panel">\[(x+y)^n=\sum_{r=0}^{n}\binom nr x^{n-r}y^r.\]</div>
            <p>Pri razvoju produkta \((x+y)\cdots(x+y)\) člen \(x^{n-r}y^r\) dobimo tako, da v natanko \(r\) od \(n\) oklepajev izberemo \(y\). To lahko storimo na \(\binom nr\) načinov.</p>
            <div class="definition-grid">
              <div class="mini-card"><strong>Vsota vrstice</strong><p>Za \(x=y=1\): \(\sum_r\binom nr=2^n\).</p></div>
              <div class="mini-card"><strong>Alternirajoča vsota</strong><p>Za \(x=1,y=-1\): \(\sum_r(-1)^r\binom nr=0\), če \(n\ge1\).</p></div>
              <div class="mini-card"><strong>Koeficient</strong><p>Koeficient pri \(x^r\) v \((1+x)^n\) je \(\binom nr\).</p></div>
              <div class="mini-card"><strong>Potencialna množica</strong><p>\(|\mathcal P(N)|=\sum_r\binom nr=2^n\).</p></div>
            </div>`
        },
        {
          id: "prastevilski-binomski-koeficienti",
          kind: "theorem",
          label: "Praštevilskost + Evklidova lema",
          title: "Zakaj praštevilo deli notranje binomske koeficiente",
          html: H`
            <p><strong>Izrek.</strong> Če je \(p\) praštevilo in \(1\le r\le p-1\), potem</p>
            <div class="formula-panel">\[p\mid\binom pr.\]</div>
            <p><strong>Dokaz.</strong> Iz faktorske formule dobimo celoštevilsko identiteto</p>
            <div class="formula-panel">\[\binom pr\,r!(p-r)!=p!.\]</div>
            <p>Desno stran deli \(p\), zato \(p\mid\binom pr\,r!(p-r)!\). Vsi faktorji v \(r!\) in \((p-r)!\) so med 1 in \(p-1\). Ker je \(p\) praštevilo, nobenega ne deli, zato</p>
            <div class="formula-panel">\[\gcd\!\bigl(p,r!(p-r)!\bigr)=1.\]</div>
            <p>Po Evklidovi lemi iz \(p\mid ab\) in \(\gcd(p,b)=1\) sledi \(p\mid a\); z \(a=\binom pr\) dobimo trditev.</p>
            <p><strong>Posledica.</strong> Po binomskem izreku za celi števili \(a,b\) velja</p>
            <div class="formula-panel">\[(a+b)^p\equiv a^p+b^p\pmod p,\]</div>
            <p>saj so vsi vmesni koeficienti \(\binom pr\), \(1\le r\le p-1\), deljivi s \(p\).</p>
            <p><strong>Zakaj pogojev ne smemo izpustiti?</strong> Na robovih je \(\binom p0=\binom pp=1\), zato \(p\) teh koeficientov ne deli. Praštevilskost je bistvena: pri sestavljenem \(4\) je \(\binom42=6\), vendar \(4\nmid6\).</p>`
        },
        {
          id: "potencna-mnozica-in-enakost",
          kind: "proof",
          label: "Posledici",
          title: "Potencialna množica in načelo enakosti",
          html: H`
            <p><strong>Načelo enakosti.</strong> Če obstaja bijekcija med končnima množicama \(X\) in \(Y\), potem je \(|X|=|Y|\). To je temelj kombinatoričnih dokazov: namesto računanja konstruiramo obrnljivo prirejanje objektov.</p>
            <p>Potencialna množica \(\mathcal P(N)\) je disjunktna unija vseh družin \(r\)-elementnih podmnožic:</p>
            <div class="formula-panel">\[\mathcal P(N)=\bigsqcup_{r=0}^{n}K(N,r),\qquad |\mathcal P(N)|=\sum_{r=0}^{n}\binom nr=2^n.\]</div>
            <p>Drugi neposredni dokaz: podmnožico kodiramo z ničelno-enotskim nizom dolžine \(n\), kjer 1 pomeni »element je izbran«. Ker ima vsako mesto dve možnosti, je nizov \(2^n\). Alternirajoča vsota \(\sum_{r=0}^n(-1)^r\binom nr=0\) za \(n\ge1\) pove, da je sodo velikih podmnožic enako mnogo kot liho velikih.</p>`
        },
        {
          id: "permutacije-multimnozice",
          kind: "theorem",
          label: "Ponavljajoči se elementi",
          title: "Permutacije multimnožice",
          html: H`
            <p>Če imamo skupaj \(n\) simbolov, pri čemer se tip \(i\) pojavi \(n_i\)-krat in \(n_1+\cdots+n_k=n\), je različnih besed</p>
            <div class="formula-panel">\[\frac{n!}{n_1!n_2!\cdots n_k!}.\]</div>
            <p>Začasno označimo vse kopije kot različne; dobimo \(n!\) ureditev. Oznake znotraj vsakega tipa lahko permutiramo na \(n_i!\) načinov, ne da bi se vidna beseda spremenila, zato delimo z vsemi temi faktorji.</p>
            <p><strong>Primer.</strong> Beseda MATEMATIKA ima 10 črk: A trikrat, M in T po dvakrat, ostale enkrat. Število anagramov je \(10!/(3!2!2!)=151200\).</p>`
        },
        {
          id: "gesla-komplement",
          kind: "example",
          label: "Zgledi iz PDF-ja",
          title: "Gesla: komplement in izbira položajev",
          html: H`
            <p><strong>Vsaj en simbol iz določene skupine.</strong> Zapiski najprej preštejejo vsa gesla in odštejejo tista, ki ne vsebujejo nobenega zahtevanega simbola. Če je na voljo \(n\) simbolov, od tega \(s\) zahtevanega tipa, je gesel dolžine \(r\) z vsaj enim takim simbolom \(n^r-(n-s)^r\).</p>
            <p><strong>Natanko \(j\) pojavov določenega simbola.</strong> Najprej izberemo njegovih \(j\) položajev, nato preostala mesta zapolnimo z drugimi simboli:</p>
            <div class="formula-panel">\[\#\{\text{besede dolžine }r\text{ z natanko }j\text{ črkami A}\}=\binom rj(n-1)^{r-j}.\]</div>
            <p>Če določamo samo, na katerih mestih so števke in na katerih črke, je izbira položajev neurejen izbor brez ponavljanja. Nato uporabimo pravilo produkta za vsebino mest. To je natanko razcep, uporabljen v zgledih na straneh 87–89 PDF-ja.</p>`
        },
        {
          id: "izbori-pasti",
          kind: "pitfall",
          label: "Pogoste napake",
          title: "Ista zgodba lahko zahteva štiri različne formule",
          html: H`
            <ul>
              <li>Komisija treh ljudi: \(\binom n3\). Predsednik, tajnik in član: \(n^{\underline3}\).</li>
              <li>Pet kepic sladoleda iz treh okusov, vrstni red kepic nepomemben: \(\binom{7}{5}\). Petmestno zaporedje okusov: \(3^5\).</li>
              <li>»Največ enkrat« pomeni brez ponavljanja; »ni omejitev« še ne pove, ali vrstni red šteje.</li>
              <li>Pri številih prva števka običajno ne sme biti nič; zato mesta niso vedno enakovredna.</li>
            </ul>
            <blockquote>Protiprimer: \(\binom{5}{3}=10\), toda 3-mestnih zaporedij brez ponavljanja iz petih znakov je \(5\cdot4\cdot3=60\). Isti elementi, drugačen pomen izida.</blockquote>`
        },
        {
          id: "izbori-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Kaj moraš povedati brez razmišljanja",
          html: H`
            <p>Urejeno/s ponavljanjem: \(n^r\). Urejeno/brez: \(n!/(n-r)!\). Neurejeno/brez: \(\binom nr\). Neurejeno/s ponavljanjem: \(\binom{n+r-1}{r}\). Permutacije z večkratnostmi: \(n!/(n_1!\cdots n_k!)\). Nato preveri omejitve, razločljivost, ničlo na prvem mestu in ali je komplement lažji.</p>`
        }
      ],
      checklist: [
        "Znam v nalogi prepoznati, ali vrstni red šteje in ali je ponavljanje dovoljeno.",
        "Znam izpeljati štiri osnovne formule, ne samo navesti jih.",
        "Znam kombinatorično dokazati simetrijo binomskih koeficientov.",
        "Znam kombinatorično dokazati Pascalovo identiteto.",
        "Znam pojasniti binomski izrek z izbiranjem členov iz oklepajev.",
        "Znam šteti permutacije multimnožice in uporabiti blok.",
        "Pred računom preverim ničlo na začetku, razločljivost in komplement."
      ]
    },
    {
      id: "razbitja-principi",
      number: 6,
      group: "kombinatorika",
      title: "Razbitja, vključitve–izključitve in Dirichlet",
      short: "Razbitja množic in števil, vključitve–izključitve, Dirichletovo načelo, preslikave in celotna dvanajstera pot.",
      accent: "#ef9f65",
      minutes: 85,
      importance: "zelo visoka",
      sources: ["kombinatorika"],
      examNote: "Ta tema je povzeta izključno iz poglavij 14–17 datoteke ADM-Kombinatorika.pdf: razbitja, Stirlingova števila, razčlenitve, vključitve–izključitve, Dirichletovo načelo, preslikave in dvanajstera pot.",
      outcomes: [
        "ločiti razločljive in nerazločljive predmete ter škatle",
        "izpeljati rekurziji za Stirlingova in razčlenitvena števila",
        "uporabiti vključitve–izključitve in Dirichletovo načelo z jasno izbiro množic oziroma škatel",
        "prevesti porazdelitev v preslikavo in prepoznati injektivnost/surjektivnost"
      ],
      sections: [
        {
          id: "razbitje-mnozice",
          kind: "definition",
          label: "Osnovni pojem",
          title: "Razbitje množice in Stirlingovo število",
          html: H`
            <p><strong>Razbitje</strong> množice \(A\) je družina nepraznih, paroma disjunktnih podmnožic, katerih unija je \(A\). Členom razbitja pravimo bloki.</p>
            <p><strong>Stirlingovo število druge vrste</strong> \(S(n,k)\) je število razbitij \(n\)-elementne množice na natanko \(k\) nepraznih, nerazločljivih blokov.</p>
            <div class="formula-panel">\[S(0,0)=1,\quad S(n,0)=0\ (n>0),\quad S(n,1)=S(n,n)=1\ (n>0),\quad S(n,k)=0\ \text{za }k>n.\]</div>
            <p>Primer: \(S(3,2)=3\), ker so razbitja \(\{\{1\},\{2,3\}\}\), \(\{\{2\},\{1,3\}\}\) in \(\{\{3\},\{1,2\}\}\).</p>`
        },
        {
          id: "stirling-rekurzija",
          kind: "proof",
          label: "Izrek in dokaz",
          title: "Rekurzija za \\(S(n,k)\\)",
          html: H`
            <div class="formula-panel">\[S(n,k)=S(n-1,k-1)+kS(n-1,k),\qquad 1\le k\le n.\]</div>
            <p>V razbitju množice \(\{1,\ldots,n\}\) opazujemo element \(n\).</p>
            <div class="proof-steps">
              <div class="proof-step"><p>Če je \(\{n\}\) samostojen blok, preostalih \(n-1\) elementov razbijemo na \(k-1\) blokov: \(S(n-1,k-1)\).</p></div>
              <div class="proof-step"><p>Če \(n\) ni sam, najprej razbijemo preostalih \(n-1\) elementov na \(k\) blokov, nato izberemo enega od \(k\) blokov, kamor dodamo \(n\): \(kS(n-1,k)\).</p></div>
              <div class="proof-step"><p>Primera sta disjunktna in izčrpna, zato ju seštejemo.</p></div>
            </div>
            <div class="qed">□</div>
            <p>Tabela se gradi iz robnih pogojev: nad glavno diagonalo so ničle, na diagonali enice, vsak notranji člen pa je vsota diagonalnega levega člena in \(k\)-kratnika člena neposredno nad njim.</p>`
        },
        {
          id: "razclenitve",
          kind: "definition",
          label: "Nerazločljivi predmeti in škatle",
          title: "Razčlenitve naravnega števila",
          html: H`
            <p><strong>Razčlenitev</strong> števila \(n\) na \(k\) delov je neurejen zapis \(n\) kot vsote \(k\) pozitivnih celih števil. Število takih razčlenitev označimo s \(p_k(n)\).</p>
            <div class="formula-panel">\[p_k(n)=p_{k-1}(n-1)+p_k(n-k),\qquad 1\le k\le n.\]</div>
            <p>Za robne primere velja \(p_0(0)=1\), \(p_0(n)=0\) za \(n>0\) in \(p_k(n)=0\) za \(k>n\).</p>
            <p>Razdelimo po tem, ali je najmanjši del enak 1. Če je, ga odstranimo: ostane razčlenitev \(n-1\) na \(k-1\) delov. Če so vsi deli vsaj 2, od vsakega odštejemo 1: ostane razčlenitev \(n-k\) na \(k\) delov.</p>
            <p><strong>Primer.</strong> \(p_3(6)=3\): \(4+1+1\), \(3+2+1\), \(2+2+2\).</p>`
        },
        {
          id: "preslikave-porazdelitve",
          kind: "theorem",
          label: "Model",
          title: "Predmeti v škatlah kot preslikave",
          html: H`
            <p>Če \(n\) različnih predmetov razporejamo v \(k\) različnih škatel, vsaka porazdelitev določa preslikavo iz množice predmetov v množico škatel.</p>
            <div class="definition-grid">
              <div class="mini-card"><strong>Brez omejitev</strong><p>Vseh preslikav je \(k^n\).</p></div>
              <div class="mini-card"><strong>Največ en predmet</strong><p>Injektivne preslikave: \(k^{\underline n}\), če \(n\le k\).</p></div>
              <div class="mini-card"><strong>Nobena škatla prazna</strong><p>Surjekcije: \(k!S(n,k)\).</p></div>
              <div class="mini-card"><strong>Škatle nerazločljive</strong><p>Neprazne: \(S(n,k)\); največ \(k\): \(\sum_{i=1}^kS(n,i)\).</p></div>
            </div>
            <p>Faktor \(k!\) pri surjekcijah označi \(k\) blokov razbitja z imeni škatel.</p>`
        },
        {
          id: "preslikave-definicije-in-stevilo",
          kind: "definition",
          label: "Povezava s preslikavami",
          title: "Vse, injektivne in surjektivne preslikave",
          html: H`
            <p>Naj bo \(|N|=n\) in \(|K|=k\). Preslikava \(f:N\to K\) je določena z urejeno \(n\)-terico slik \((f(a_1),\ldots,f(a_n))\), zato je vseh preslikav \(k^n\).</p>
            <p><strong>Injektivnost</strong> pomeni \(f(x)=f(y)\Rightarrow x=y\), zato se slike ne ponavljajo in je injekcij</p>
            <div class="formula-panel">\[k^{\underline n}=k(k-1)\cdots(k-n+1),\]</div>
            <p>če \(n\le k\), sicer pa 0. <strong>Surjektivnost</strong> pomeni \(\operatorname{Im}f=K\), zato je vsako vlakno \(f^{-1}(c)\) neprazno. Vlakna tvorijo razbitje \(N\) na \(k\) blokov, ciljne vrednosti pa bloke označijo, zato je surjekcij \(k!S(n,k)\) (in 0 pri \(k>n\)).</p>
            <p><strong>Bijektivnost</strong> pomeni hkrati injektivnost in surjektivnost. Pri končnih množicah enake moči že ena od teh dveh lastnosti implicira drugo; bijekcij med dvema \(n\)-elementnima množicama je \(n!\).</p>`
        },
        {
          id: "ekvivalence-preslikav",
          kind: "definition",
          label: "Teorija dvanajstere poti",
          title: "Kaj pomeni, da predmetov ali škatel ne razlikujemo",
          html: H`
            <p>Naj bo \(\operatorname{Sym}(A)\) množica vseh permutacij množice \(A\). Za preslikavi \(f,g:N\to K\) zapiski definirajo:</p>
            <div class="formula-panel">\[
              f\sim_K g\iff (\exists\lambda\in\operatorname{Sym}(K))\ g=\lambda\circ f,
            \]</div>
            <div class="formula-panel">\[
              f\sim_N g\iff (\exists\rho\in\operatorname{Sym}(N))\ g=f\circ\rho,
            \]</div>
            <div class="formula-panel">\[
              f\sim_{N,K}g\iff (\exists\lambda\in\operatorname{Sym}(K))(\exists\rho\in\operatorname{Sym}(N))\ g=\lambda\circ f\circ\rho.
            \]</div>
            <p>Relacija \(\sim_N\) pozabi imena predmetov: razred je določen s \(K\)-indeksiranim vektorjem zasedenosti \((|f^{-1}(y)|)_{y\in K}\), ekvivalentno z multimnožico slik, ki še ohrani imena škatel. Relacija \(\sim_K\) pozabi imena škatel: razred je določen z razbitjem domene na vlakna. Relacija \(\sim_{N,K}\) pozabi oboje: ostane le neurejen seznam velikosti nepraznih vlaken, torej razčlenitev števila \(n\).</p>
            <p>Vse tri so ekvivalenčne relacije, ker identična permutacija da refleksivnost, inverzna permutacija simetričnost, kompozit permutacij pa tranzitivnost.</p>`
        },
        {
          id: "dvanajstera-pot",
          kind: "method",
          label: "Velika tabela",
          title: "Jedro dvanajstere poti",
          html: H`
            <p>Naj bosta \(n,k\ge1\): razporejamo \(n\) predmetov v \(k\) škatel.</p>
            <table class="data-table">
              <thead><tr><th>Predmeti / škatle</th><th>Brez omejitev</th><th>Vse škatle neprazne</th><th>Največ en predmet v škatli</th></tr></thead>
              <tbody>
                <tr><td>različni / različne</td><td>\(k^n\)</td><td>\(k!S(n,k)\)</td><td>\(k^{\underline n}=k!/(k-n)!\), če \(n\le k\); sicer \(0\)</td></tr>
                <tr><td>enaki / različne</td><td>\(\binom{n+k-1}{k-1}\)</td><td>\(\binom{n-1}{k-1}\)</td><td>\(\binom{k}{n}\), če \(n\le k\); sicer \(0\)</td></tr>
                <tr><td>različni / enake</td><td>\(\sum_{i=1}^{\min(n,k)}S(n,i)\)</td><td>\(S(n,k)\)</td><td>\(1\), če \(n\le k\); sicer \(0\)</td></tr>
                <tr><td>enaki / enake</td><td>\(\sum_{i=1}^{k}p_i(n)\)</td><td>\(p_k(n)\)</td><td>\(1\), če \(n\le k\); sicer \(0\)</td></tr>
              </tbody>
            </table>
            <p><strong>Ne uči se tabele brez pomena.</strong> Različni predmeti imajo identiteto; različne škatle imajo oznake. Če odstranimo oznake predmetom, dobimo število zasedenosti; če odstranimo oznake škatlam, zamenjava celih blokov ne ustvari nove porazdelitve. Pri pogoju »največ en« mora biti \(n\le k\); pri enakih škatlah je tedaj razporeditev samo ena, ker vidimo le \(n\) zasedenih singletonov.</p>`
        },
        {
          id: "vkljucitve-izkljucitve",
          kind: "theorem",
          label: "Izrek",
          title: "Načelo vključitev in izključitev",
          html: H`
            <p>Pri dveh končnih množicah presek pri seštevanju \(|A|+|B|\) štejemo dvakrat, zato ga enkrat odštejemo:</p>
            <div class="formula-panel">\[|A\cup B|=|A|+|B|-|A\cap B|.\]</div>
            <p>Za tri množice:</p>
            <div class="formula-panel">\[
              |A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|.
            \]</div>
            <p>Naj bodo \(A_1,\ldots,A_n\) končne množice. Za \(I\subseteq\{1,\ldots,n\}\), \(I\ne\varnothing\), pišimo \(A_I=\bigcap_{i\in I}A_i\). Tedaj je splošna oblika</p>
            <div class="formula-panel">\[
              \left|\bigcup_{i=1}^{n}A_i\right|
              =\sum_{\varnothing\ne I\subseteq\{1,\ldots,n\}}(-1)^{|I|+1}|A_I|.
            \]</div>
            <p><strong>Dokaz po prispevku elementa.</strong> Če element \(x\) leži v natanko \(m\) množicah, je na desni strani štet</p>
            <div class="formula-panel">\[\sum_{j=1}^{m}(-1)^{j+1}\binom mj=1,\]</div>
            <p>ker je \(\sum_{j=0}^m(-1)^j\binom mj=(1-1)^m=0\). Torej vsak element unije prispeva natanko 1, vsak element zunaj unije pa 0.</p>
            <p>Najprej vedno jasno definiraj »slabe« množice \(A_i\); formula brez definicije množic je na teorijskem izpitu nepopolna utemeljitev.</p>`
        },
        {
          id: "surjekcije-pie",
          kind: "proof",
          label: "Uporaba izreka",
          title: "Število surjekcij z vključitvami–izključitvami",
          html: H`
            <p>Vseh preslikav iz \(n\)-elementne množice v \(k\)-elementno je \(k^n\). Naj bo \(A_i\) množica preslikav, ki ne zadenejo vrednosti \(i\). Surjekcije so preslikave zunaj \(A_1\cup\cdots\cup A_k\).</p>
            <div class="formula-panel">\[
              \#\operatorname{Sur}(n,k)=\sum_{i=0}^{k}(-1)^i\binom ki(k-i)^n=k!S(n,k).
            \]</div>
            <p>Pri preseku \(i\) slabih dogodkov je prepovedanih \(i\) vrednosti, zato ima vsak od \(n\) elementov samo \(k-i\) slik.</p>`
        },
        {
          id: "deranzmaji",
          kind: "theorem",
          label: "Klasičen primer",
          title: "Deranžmaji: nihče ne ostane na svojem mestu",
          html: H`
            <p>Deranžma je permutacija brez fiksne točke. Naj bo \(A_i\) dogodek, da element \(i\) ostane na svojem mestu. Po vključitvah–izključitvah:</p>
            <div class="formula-panel">\[D_n=n!\sum_{j=0}^{n}\frac{(-1)^j}{j!}.\]</div>
            <p>Formula nastane, ker ima presek dogodkov za izbranih \(j\) fiksnih točk moč \((n-j)!\), izbir takih \(j\) točk pa je \(\binom nj\). Verjetnost, da v enakomerno naključni permutaciji ni fiksne točke, je zato \(\sum_{j=0}^n(-1)^j/j!\), kar se pri velikem \(n\) približuje \(e^{-1}\).</p>`
        },
        {
          id: "dirichlet",
          kind: "theorem",
          label: "Obstoj brez konstrukcije",
          title: "Dirichletovo načelo",
          html: H`
            <p>Če \(m\) predmetov razporedimo v \(n\ge1\) škatel, je v neki škatli vsaj</p>
            <div class="formula-panel">\[\left\lceil\frac mn\right\rceil\]</div>
            <p>predmetov. Posebej: več kot \(n\) predmetov v \(n\) škatlah zagotovi vsaj dva predmeta v isti škatli; več kot \(kn\) predmetov zagotovi več kot \(k\) predmetov v neki škatli.</p>
            <div class="proof-steps">
              <div class="proof-step"><p>Predpostavimo nasprotno: vsaka škatla vsebuje največ \(\lceil m/n\rceil-1\) predmetov.</p></div>
              <div class="proof-step"><p>Skupaj bi bilo predmetov največ \(n(\lceil m/n\rceil-1)<m\), protislovje.</p></div>
            </div>
            <p><strong>Ključ naloge</strong> je izbira škatel: ostanki modulo \(n\), meseci, intervali, vrednosti funkcije ali pari, ki jih želimo prisiliti.</p>`
        },
        {
          id: "dirichlet-zgledi-pdf",
          kind: "example",
          label: "Zgledi iz PDF-ja",
          title: "Kako pravilno izbereš škatle pri Dirichletu",
          html: H`
            <p><strong>Ostanki.</strong> Med \(m+1\) celimi števili sta dve z razliko, deljivo z \(m\): škatle so ostanki \(0,1,\ldots,m-1\). Dve števili v isti škatli sta kongruentni modulo \(m\).</p>
            <p><strong>Število las.</strong> Če ima vsak človek največ \(L\) las, je možnih \(L+1\) vrednosti. Več kot \(k(L+1)\) ljudi zato zagotovi več kot \(k\) ljudi z enakim številom las.</p>
            <p><strong>Barvanje karirastega papirja.</strong> Zapiski dvakrat uporabijo načelo: najprej v vsakem dovolj visokem stolpcu najdejo dve enako pobarvani polji, nato med dovolj mnogo stolpci dva enako pobarvana stolpca. S tem dobijo štiri enako pobarvana oglišča pravokotnika.</p>
            <blockquote>Dirichlet ne pove, kateri konkretni par obstaja; poda zagotovilo obstoja. V odgovoru morata biti vedno jasno imenovana objekt in škatla.</blockquote>`
        },
        {
          id: "principi-protiprimeri",
          kind: "counterexample",
          label: "Ločevanje modelov",
          title: "Zakaj podobne porazdelitve niso iste",
          html: H`
            <ul>
              <li>8 različnih zaposlenih v 4 enake neprazne čolne: \(S(8,4)\), ne \(4^8\), ker čolnov ne ločimo.</li>
              <li>12 enakih zabojev na 5 enakih nepraznih splavov: \(p_5(12)\), ne \(\binom{11}{4}\), ker tudi splavov ne ločimo.</li>
              <li>Če so splavi različni, dobimo pozitivne rešitve \(x_1+\cdots+x_5=12\), torej \(\binom{11}{4}\).</li>
              <li>\(S(n,k)\) šteje neprazne bloke. Če so prazni bloki dovoljeni in škatle nerazločljive, seštejemo \(S(n,i)\) za \(i\le k\).</li>
            </ul>
            <blockquote>Protiprimer za deljenje s \(k!\): \(k^n/k!\) na splošno ni število porazdelitev v enake škatle. Pri različnih predmetih stabilizator povzročijo prazne škatle; dve neprazni škatli z enakim številom, vendar različnimi predmeti, nista ista bloka. Pri enakih predmetih lahko dodatno sovpadejo tudi ponovljena števila zasedenosti.</blockquote>`
        },
        {
          id: "razbitja-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Kaj povezuje celo poglavje",
          html: H`
            <p>Različni predmeti v različnih škatlah so preslikave. Neprazne različne škatle pomenijo surjekcije \(k!S(n,k)\); neprazne enake škatle pomenijo \(S(n,k)\). Enaki predmeti v različnih škatlah so zvezdice in pregrade; v enakih škatlah razčlenitve. »Vsaj/nobeden« kliče vključitve–izključitve, zagotovljen obstoj ponovitve pa Dirichlet.</p>`
        }
      ],
      checklist: [
        "Znam definirati razbitje in Stirlingovo število druge vrste.",
        "Znam dokazati rekurzijo za S(n,k).",
        "Znam razložiti p_k(n) in njegovo rekurzijo.",
        "Znam prevesti razporeditev različnih predmetov v preslikavo.",
        "Znam izpeljati formulo za surjekcije z vključitvami–izključitvami.",
        "Znam pred uporabo Dirichleta jasno poimenovati predmete in škatle.",
        "Znam v zgledih iz PDF-ja izbrati škatle kot ostanke, možne vrednosti ali vzorce.",
        "Ne delim avtomatsko z k!, kadar škatle postanejo nerazločljive."
      ]
    }
  ];

  const flashcards = [
    ["cc-f01","izbori-binomi","Pravilo produkta","Če postopek sestavlja zaporedje odločitev z \\(a_1,\\ldots,a_k\\) možnostmi, je vseh izidov \\(a_1\\cdots a_k\\).",true],
    ["cc-f02","izbori-binomi","Pravilo vsote","Števila možnosti seštejemo, kadar so obravnavani primeri med seboj izključujoči in skupaj pokrijejo vse možnosti.",true],
    ["cc-f03","izbori-binomi","Urejeni izbor s ponavljanjem","\\(r\\)-terica iz \\(n\\) elementov; vseh je \\(n^r\\).",true],
    ["cc-f04","izbori-binomi","Urejeni izbor brez ponavljanja","Za \\(0\\le r\\le n\\) jih je \\(n^{\\underline r}=n!/(n-r)!\\); za \\(r>n\\) jih ni.",true],
    ["cc-f05","izbori-binomi","Neurejeni izbor brez ponavljanja","Za \\(0\\le r\\le n\\) je to \\(r\\)-elementna podmnožica; vseh je \\(\\binom nr\\).",true],
    ["cc-f06","izbori-binomi","Neurejeni izbor s ponavljanjem","Za \\(n\\ge1\\) je to multimnožica moči \\(r\\) iz \\(n\\) tipov; vseh je \\(\\binom{n+r-1}{r}\\).",true],
    ["cc-f07","izbori-binomi","Kombinatorična definicija \\(\\binom nr\\)","Število \\(r\\)-elementnih podmnožic dane \\(n\\)-elementne množice.",true],
    ["cc-f08","izbori-binomi","Simetrija binomskih koeficientov","\\(\\binom nr=\\binom n{n-r}\\); bijekcija je preslikava podmnožice v njen komplement.",true],
    ["cc-f09","izbori-binomi","Pascalova identiteta","\\(\\binom{n+1}{r}=\\binom nr+\\binom n{r-1}\\); razdelimo izbore glede na to, ali vsebujejo fiksni element.",true],
    ["cc-f10","izbori-binomi","Permutacije multimnožice","Če so kratnosti \\(n_1,\\ldots,n_k\\), je različnih permutacij \\(n!/(n_1!\\cdots n_k!)\\).",false],
    ["cc-f11","izbori-binomi","Binomski izrek","\\((x+y)^n=\\sum_{r=0}^n\\binom nr x^{n-r}y^r\\).",true],
    ["cc-f12","izbori-binomi","Vsaj en pojav elementa","Pogosto uporabimo komplement: vsi izidi minus izidi brez tega elementa.",false],
    ["cc-f13","razbitja-principi","Kaj šteje \\(S(n,k)\\)?","Razbitja \\(n\\)-elementne množice na natanko \\(k\\) nepraznih nerazločljivih blokov.",true],
    ["cc-f14","razbitja-principi","Rekurzija za \\(S(n,k)\\)","\\(S(n,k)=S(n-1,k-1)+kS(n-1,k)\\).",true],
    ["cc-f15","razbitja-principi","Kaj šteje \\(p_k(n)\\)?","Neurejene razčlenitve števila \\(n\\) na natanko \\(k\\) pozitivnih celih delov.",true],
    ["cc-f16","razbitja-principi","Rekurzija za \\(p_k(n)\\)","Za \\(1\\le k\\le n\\) velja \\(p_k(n)=p_{k-1}(n-1)+p_k(n-k)\\).",false],
    ["cc-f17","razbitja-principi","Število preslikav \\(n\\to k\\)","\\(k^n\\).",true],
    ["cc-f18","razbitja-principi","Število surjekcij \\(n\\to k\\)","\\(k!S(n,k)=\\sum_{i=0}^k(-1)^i\\binom ki(k-i)^n\\).",true],
    ["cc-f19","razbitja-principi","Dirichletovo načelo","Med \\(m\\) predmeti v \\(n\\) škatlah ima neka škatla vsaj \\(\\lceil m/n\\rceil\\) predmetov.",true],
    ["cc-f20","razbitja-principi","Deranžmaji","\\(D_n=n!\\sum_{j=0}^n(-1)^j/j!\\); permutacije brez fiksnih točk.",false],
    ["cc-f21","razbitja-principi","Kaj pomeni \\(f\\sim_K g\\)?","Obstaja permutacija \\(\\lambda\\) kodomene, da je \\(g=\\lambda\\circ f\\); pozabimo imena škatel.",false],
    ["cc-f22","razbitja-principi","Enaki predmeti v različnih nepraznih škatlah","Pozitivne rešitve \\(x_1+\\cdots+x_k=n\\): \\(\\binom{n-1}{k-1}\\).",true],
    ["cc-f23","razbitja-principi","Robni pogoji za \\(S(n,k)\\)","\\(S(0,0)=1\\), \\(S(n,0)=0\\) za \\(n>0\\), \\(S(n,1)=S(n,n)=1\\), \\(S(n,k)=0\\) za \\(k>n\\).",true],
    ["cc-f24","razbitja-principi","Robni pogoji za \\(p_k(n)\\)","\\(p_0(0)=1\\), \\(p_0(n)=0\\) za \\(n>0\\), \\(p_k(n)=0\\) za \\(k>n\\).",false],
    ["cc-f25","razbitja-principi","Kaj pomeni \\(f\\sim_N g\\)?","Obstaja permutacija \\(\\rho\\) domene, da je \\(g=f\\circ\\rho\\); pozabimo imena predmetov.",false],
    ["cc-f26","razbitja-principi","Kaj ostane pri \\(\\sim_{N,K}\\)?","Le neurejen seznam velikosti nepraznih vlaken, torej razčlenitev števila \\(n\\).",false]
  ].map(([id,topic,front,back,core]) => ({id,topic,front,back,core}));

  const quiz = [
    ["cc-q01","izbori-binomi","Koliko je 4-mestnih nizov iz 7 simbolov, če je ponavljanje dovoljeno?",["\\(7^4\\)","\\(7!/3!\\)","\\(\\binom74\\)","\\(4^7\\)"],0,"Vsako od štirih urejenih mest ima neodvisno 7 možnosti."],
    ["cc-q02","izbori-binomi","Koliko 4-članskih komisij lahko izberemo med 12 ljudmi?",["\\(12^4\\)","\\(12!/8!\\)","\\(\\binom{12}{4}\\)","\\(4!\\)"],2,"Komisija je neurejen izbor brez ponavljanja."],
    ["cc-q03","izbori-binomi","Katera bijekcija dokaže \\(\\binom nr=\\binom n{n-r}\\)?",["Obrat vrstnega reda","Prehod na komplement podmnožice","Ciklični premik","Podvojitev elementov"],1,"Komplement r-elementne podmnožice ima n−r elementov, operacija pa je sama sebi inverzna."],
    ["cc-q04","izbori-binomi","Kaj šteje \\(\\binom{n+r-1}{r}\\)?",["Urejene izbore brez ponavljanja","Permutacije n elementov","Neurejene izbore s ponavljanjem","Surjekcije"],2,"Gre za multimnožice moči r iz n tipov oziroma zvezdice in pregrade."],
    ["cc-q05","izbori-binomi","Koliko anagramov ima AABBC?",["\\(5!\\)","\\(5!/(2!2!)\\)","\\(\\binom52\\)","\\(2^5\\)"],1,"Zamenjavi obeh A ali obeh B ne ustvarita nove besede."],
    ["cc-q06","izbori-binomi","Kateri razcep dokazuje Pascalovo identiteto?",["Po sodih in lihih izborih","Po tem, ali izbor vsebuje fiksni element","Po vrstnem redu elementov","Po številu permutacij"],1,"Vsak izbor fiksni element vsebuje ali pa ga ne; primera sta disjunktna."],
    ["cc-q07","izbori-binomi","Vsota \\(\\sum_{r=0}^n\\binom nr\\) je",["\\(n!\\)","\\(n^2\\)","\\(2^n\\)","\\(0\\)"],2,"To je število vseh podmnožic n-elementne množice oziroma binomski izrek pri x=y=1."],
    ["cc-q08","izbori-binomi","Zakaj je \\(\\binom n0=1\\)?",["Ker je 0 praštevilo","Ker obstaja natanko ena prazna podmnožica","Ker je \\(n^0=0\\)","Ker je Pascalova vsota 1"],1,"Vsaka množica ima natanko eno 0-elementno podmnožico: prazno množico."],
    ["cc-q09","razbitja-principi","Kaj šteje \\(S(8,3)\\)?",["Razporeditve 8 enakih predmetov v 3 različne škatle","Razbitja 8 različnih elementov na 3 neprazne enake bloke","Vse preslikave iz 8 v 3","Razčlenitve števila 8 na 3 dele"],1,"Stirlingovo število druge vrste razbija množico različnih elementov na nerazločljive bloke."],
    ["cc-q10","razbitja-principi","Koliko surjekcij je iz n-elementne v k-elementno množico?",["\\(S(n,k)\\)","\\(k^n\\)","\\(k!S(n,k)\\)","\\(\\binom nk\\)"],2,"Najprej razbitje vlaken na k blokov, nato k! označitev s ciljnimi vrednostmi."],
    ["cc-q11","razbitja-principi","Osnovno Dirichletovo načelo pravi",["n predmetov v več kot n škatlah da ponovitev","več kot n predmetov v n škatlah da vsaj dva v eni škatli","n predmetov v n škatlah pomeni po enega v vsaki","vsaka škatla je neprazna"],1,"Ključ je več predmetov kot škatel."],
    ["cc-q12","razbitja-principi","Koliko nenegativnih rešitev ima \\(x_1+x_2+x_3=7\\)?",["\\(\\binom72\\)","\\(\\binom92\\)","\\(3^7\\)","\\(S(7,3)\\)"],1,"Sedem zvezdic in dve pregradi: izberemo položaja pregrad med devetimi simboli."],
    ["cc-q13","razbitja-principi","Koliko pozitivnih rešitev ima \\(x_1+x_2+x_3=7\\)?",["\\(\\binom62\\)","\\(\\binom92\\)","\\(3^7\\)","\\(p_3(7)\\)"],0,"Od vsake spremenljivke odštejemo 1; ostane vsota 4 in dve pregradi, torej C(6,2)."],
    ["cc-q14","razbitja-principi","Kdaj pri vključitvah–izključitvah odštejemo parne preseke?",["Ker jih v vsoti posameznih množic nismo šteli","Ker smo jih šteli dvakrat","Ker so vedno prazni","Ker imajo liho moč"],1,"Element v dveh množicah je v vsoti |A|+|B| preštet dvakrat, namesto enkrat."],
    ["cc-q15","razbitja-principi","Kateri objekt opisuje razred preslikav glede na \\(\\sim_{N,K}\\)?",["Urejena terica slik","Razčlenitev števila n z velikostmi nepraznih vlaken","Permutacija kodomene","En sam ostanek"],1,"Ko pozabimo imena predmetov in škatel, ostane le neurejen seznam velikosti nepraznih vlaken."],
    ["cc-q16","razbitja-principi","Zakaj \\(k^n/k!\\) na splošno ne šteje razporeditev v k enakih škatel?",["Ker rezultat nikoli ni celo število","Ker različne porazdelitve nimajo nujno k! različnih označitev","Ker k! šteje predmete","Ker so vse škatle prazne"],1,"Stabilizatorji se razlikujejo: zlasti pri praznih škatlah označevanje ne da vedno orbit velikosti k!." ]
  ].map(([id,topic,prompt,options,correct,explanation]) => ({id,topic,prompt,options,correct,explanation}));

  const questions = [
    {id:"cc-o01",topic:"izbori-binomi",prompt:"Formuliraj temeljni števni načeli za končne množice, utemelji ju ter z zgledoma pokaži njune pogoje in tipično napačno uporabo.",answer:H`<strong>Pravilo vsote.</strong> Če so končne množice izidov \(A_1,\ldots,A_t\) paroma disjunktne, je \(\left|\bigcup_iA_i\right|=\sum_i|A_i|\). Utemeljitev je, da vsak izid pripada natanko enemu primeru. Primer: vozovnica je izključno otroška ali odrasla, zato možnosti seštejemo. Če se primera prekrivata, navadna vsota šteje presek dvakrat; za študente ali športnike potrebujemo \(|A\cup B|=|A|+|B|-|A\cap B|\). <strong>Pravilo produkta.</strong> Če izid enolično določa zaporedje \(t\) odločitev in ima \(i\)-ta odločitev vedno \(a_i\) možnosti, je izidov \(\prod_i a_i\); formalno je \(|A_1\times\cdots\times A_t|=\prod_i|A_i|\). Primer: tri mesta kode iz abecede s 5 znaki dajo \(5^3\) kod. Napačno je množiti, če različna zaporedja odločitev opisujejo isti neurejeni objekt: izbira Ane nato Borisa in Borisa nato Ane je ista dvočlanska komisija, zato bi produkt dvojno štel.`,hint:"Pri vsoti preveri prekrivanje, pri produktu pa enoličnost zapisa izida kot zaporedja odločitev.",rubric:["formalno pravilo vsote","pogoj disjunktnosti in protiprimer","formalno pravilo produkta","zgled in opozorilo na dvojno štetje"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o02",topic:"izbori-binomi",prompt:"Sistematično razvrsti štiri osnovne vrste izborov, vsako formalno definiraj, izpelji število možnosti ter obravnavaj robne primere.",answer:H`Naj bo \(|N|=n\) in dolžina oziroma moč izbora \(r\ge0\). <strong>Urejeni izbor s ponavljanjem</strong> je \(r\)-terica iz \(N^r\); po produktu jih je \(n^r\). <strong>Urejeni izbor brez ponavljanja</strong> je injektivna \(r\)-terica; za \(r\le n\) jih je \(n^{\underline r}=n(n-1)\cdots(n-r+1)=n!/(n-r)!\), za \(r>n\) pa 0. <strong>Neurejeni izbor brez ponavljanja</strong> je \(r\)-elementna podmnožica; vsak se med urejenimi pojavi \(r!\)-krat, zato jih je \(\binom nr\). <strong>Neurejeni izbor s ponavljanjem</strong> je multimnožica moči \(r\), torej nenegativna rešitev \(x_1+\cdots+x_n=r\); za \(n\ge1\) jih je \(\binom{n+r-1}{r}\). Pri \(r=0\) obstaja v vseh štirih modelih en prazen izbor, tudi če je \(n=0\). Če je \(n=0\) in \(r>0\), v nobenem od štirih modelov ni izbora; zato formul z \(n-1\), količnikom fakultet ali dvoumnim \(0^0\) na tem robu ne uporabljamo brez ločenega dogovora. Primer: koda je urejena in lahko dovoljuje ponavljanje, komisija je neurejena in ponavljanja oseb ne dovoljuje. Najpogostejša napaka je izbrati formulo po besedi »izberi«, ne da bi preverili vrstni red, ponavljanje in razločljivost.`,hint:"Za vsak model ločeno preveri vrstni red in možnost ponovitve.",rubric:["štiri formalne definicije","štiri formule z izpeljavo","pogoji r≤n in n≥1","robova r=0 in n=0 ter ločevalni zgled"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o03",topic:"izbori-binomi",prompt:"Navedi kombinatorično definicijo binomskega koeficienta in brez faktorske formule dokaži njegovo simetrijo; dodaj robove, zgled in izpitno past.",answer:H`Naj bo \(N\) poljubna \(n\)-elementna množica. Za \(0\le r\le n\) je \(\binom nr\) število njenih \(r\)-elementnih podmnožic; vrednost je odvisna le od \(n,r\), ne od imen elementov. Definirajmo \(f(S)=N\setminus S\). Če je \(|S|=r\), je \(|f(S)|=n-r\), zato \(f\) slika v družino \((n-r)\)-elementnih podmnožic. Ker je \(f(f(S))=S\), je \(f\) sama sebi inverzna in zato bijektivna. Sledi \(\binom nr=\binom n{n-r}\). Primer: izbrati 3 od 10 članov komisije je enakovredno določiti 7 neizbranih. Robova \(\binom n0=\binom nn=1\) ustrezata prazni in celotni podmnožici, zunaj \(0\le r\le n\) pa postavimo \(\binom nr=0\). Preurejanje faktorske formule sicer potrdi enakost, vendar ni kombinatorični dokaz, ker ne opiše bijekcije.`,hint:"Poišči obrnljivo prirejanje med izbranimi in neizbranimi elementi.",rubric:["kombinatorična definicija s pogoji","dobro definiran komplement","bijektivnost in sklep","robovi, zgled in ločitev od algebraičnega dokaza"],difficulty:2,source:"IzpitTeorija2021.pdf"},
    {id:"cc-o04",topic:"izbori-binomi",prompt:"Navedi in kombinatorično dokaži Pascalovo identiteto.",answer:H`Za \(0<r\le n\) velja \(\binom{n+1}{r}=\binom nr+\binom n{r-1}\). Z dogovorom \(\binom nr=0\) zunaj območja \(0\le r\le n\) velja tudi na robu. Fiksiramo element a. r-elementne podmnožice razdelimo na tiste brez a, ki jih je \(\binom nr\), in tiste z a, kjer izberemo še r−1 elementov izmed preostalih n, zato jih je \(\binom n{r-1}\).`,hint:"Razdeli izbore glede na en poseben element.",rubric:["natančna identiteta","fiksni element","oba disjunktna primera","pravilo vsote"],difficulty:2,source:"teoreticni_izpit_adm.pdf"},
    {id:"cc-o05",topic:"izbori-binomi",prompt:"Definiraj multimnožico, kratnost in moč ter izpelji splošno formulo za dano moč; odgovor preveri na konkretnem in robnem primeru.",answer:H`Multimnožica nad osnovno množico \(A\) je funkcija kratnosti \(\mu:A\to\mathbb N_0\); število \(\mu(a)\) pove, kolikokrat nastopa \(a\), njena moč pa je \(|\mu|=\sum_{a\in A}\mu(a)\). Če je \(A=\{a_1,\ldots,a_n\}\) in \(n\ge1\), multimnožice moči \(r\) bijektivno ustrezajo nenegativnim rešitvam \(x_1+\cdots+x_n=r\), kjer je \(x_i=\mu(a_i)\). Niz \(r\) zvezdic in \(n-1\) pregrad enolično kodira tako rešitev, zato jih je \(\binom{r+n-1}{n-1}=\binom{r+n-1}r\). Za \(n=3,r=4\) dobimo \(\binom62=15\); zapis kratnosti \((2,0,2)\) ima moč 4. Pri \(r=0\) obstaja ena prazna multimnožica. Pri prazni osnovni množici obstaja le multimnožica moči 0, zato običajne formule z \(n-1\) ne uporabimo. Navadna množica ni isto: v njej so kratnosti le 0 ali 1.`,hint:"Multimnožico zapiši kot vektor nenegativnih kratnosti s predpisano vsoto.",rubric:["formalna funkcija kratnosti","definicija moči","bijekcija in formula","konkreten ter prazni robni primer"],difficulty:2,source:"IzpitTeorija_20-21.pdf"},
    {id:"cc-o06",topic:"razbitja-principi",prompt:"Celovito obravnavaj Stirlingova števila druge vrste: definicija, rekurzija z dokazom, vsi robni pogoji in izračun konkretnega primera.",answer:H`Naj bo \(N\) \(n\)-elementna množica in \(0\le k\le n\). Razbitje \(N\) na \(k\) blokov je družina \(k\) nepraznih, paroma disjunktnih podmnožic z unijo \(N\); vrstni red blokov ni pomemben. Število takih razbitij označimo \(S(n,k)\). Za \(n\ge1\) fiksirajmo \(a\in N\) in razbitja razdelimo na dva disjunktna, izčrpna razreda. Če je \(\{a\}\) samostojen blok, preostanek razbijemo na \(k-1\) blokov: \(S(n-1,k-1)\) možnosti. Če \(a\) ni sam, najprej preostanek razbijemo na \(k\) blokov in nato izberemo enega od teh \(k\) blokov, kamor dodamo \(a\): \(kS(n-1,k)\) možnosti. Konstrukciji sta obrnljivi, zato
\[S(n,k)=S(n-1,k-1)+kS(n-1,k).\]
Robovi so \(S(0,0)=1\), \(S(n,0)=0\) za \(n>0\), \(S(0,k)=0\) za \(k>0\), \(S(n,k)=0\) za \(k>n\), ter \(S(n,1)=S(n,n)=1\) za \(n\ge1\). Primer: \(S(4,2)=S(3,1)+2S(3,2)=1+2\cdot3=7\). Formula \(S(n-1,k)+kS(n-1,k-1)\) je napačna: pri \(n=4,k=2\) bi dala 5, ker faktor \(k\) pripada primeru dodajanja v enega od že obstoječih \(k\) blokov.`,hint:"Fiksni element je ali edinec ali pa ga vstaviš v enega od k že obstoječih blokov.",rubric:["natančna definicija razbitja in S(n,k)","dva disjunktna in izčrpna primera z bijekcijama","pravilna rekurzija in vsi robovi","pravilen izračun S(4,2) ter pojasnilo faktorja k"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o07",topic:"razbitja-principi",prompt:"Na dva neodvisna načina izpelji število surjekcij med končnima množicama, nato primerjaj dobljeni formuli in obravnavaj vse robne primere prazne domene ali kodomene.",answer:H`Naj bo \(|N|=n\), \(|K|=k\) in \(n,k\ge1\). Vlakna surjekcije \(f:N\to K\) so \(k\) nepraznih, neoznačenih blokov domene. Razbitje izberemo na \(S(n,k)\) načinov, nato bloke bijektivno označimo z elementi \(K\) na \(k!\) načinov, zato je surjekcij \(k!S(n,k)\). Drugi dokaz začne z vsemi \(k^n\) preslikavami. Naj \(A_y\) pomeni, da vrednost \(y\) ni zadeta. Če manjka določenih \(j\) vrednosti, je preslikav \((k-j)^n\), takih izborov pa \(\binom kj\). Vključitve–izključitve dajo
\[\#\operatorname{Sur}(N,K)=\sum_{j=0}^{k}(-1)^j\binom kj(k-j)^n=k!S(n,k).\]
Če \(n<k\), surjekcije ni, ker \(k\) nepraznih vlaken potrebuje vsaj \(k\) elementov. Iz prazne množice v prazno obstaja ena surjekcija, iz prazne v neprazno pa nobena; iz neprazne množice v prazno ne obstaja niti preslikava, zato tudi surjekcije ni. Faktorja \(k!\) ne smemo izpustiti: Stirlingovi bloki niso označeni, ciljna vlakna pa so.`,hint:"Primerjaj opis surjekcije z vlakni in opis prek manjkajočih ciljnih vrednosti.",rubric:["vlakna kot neprazno razbitje","faktor k!","celotna formula vključitev–izključitev","enakost formul in vsi prazni robni primeri"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o08",topic:"razbitja-principi",prompt:"Formuliraj Dirichletovo načelo v osnovni in ostri posplošeni obliki, ga dokaži ter pokaži pravilno izbiro predmetov in škatel na zgledu.",answer:H`Osnovna oblika pravi: če več kot \(n\) predmetov razporedimo v \(n\ge1\) škatel, sta vsaj dva v isti. Splošneje ima pri \(m\) predmetih neka škatla vsaj \(\lceil m/n\rceil\) predmetov; ekvivalentno, več kot \(kn\) predmetov v \(n\) škatlah zagotovi več kot \(k\) predmetov v eni. Če bi vsaka škatla vsebovala največ \(\lceil m/n\rceil-1\) predmetov, bi jih bilo skupaj največ \(n(\lceil m/n\rceil-1)<m\), protislovje. Meja je ostra: pri \(n\mid m\) lahko vse škatle vsebujejo natanko \(m/n\) predmetov. Primer: med \(n+1\) celimi števili imata dve isti ostanek modulo \(n\); predmeti so izbrana števila, škatle pa ostanki \(0,\ldots,n-1\), zato je njuna razlika deljiva z \(n\). Načelo zagotovi skupno škatlo, ne enakih predmetov; brez eksplicitne izbire škatel sklep ni utemeljen.`,hint:"Zapiši preslikavo, ki vsak predmet pošlje v razred njegove relevantne lastnosti.",rubric:["osnovna in stropna oblika","dokaz s protislovjem","ostrina meje","jasni predmeti, škatle in pravilen sklep v zgledu"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o09",topic:"razbitja-principi",prompt:"Naj bo \\(U\\) končna univerzalna množica in \\(A,B,C\\subseteq U\\). Navedi načelo vključitev in izključitev za tri množice, izpelji formulo za elemente zunaj njihove unije ter razloži vsak predznak.",answer:H`Za končne množice \(A,B,C\) velja
\[|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|.\]
Element v natanko eni množici prispeva 1. Element v natanko dveh je najprej štet dvakrat, nato enkrat odštet. Element v vseh treh prispeva \(3-3+1=1\), zato trojni presek prištejemo. Ker je \(U\) končna in so \(A,B,C\subseteq U\), je elementov, ki ne pripadajo nobeni, \(|U|-|A\cup B\cup C|\); v to razliko vstavimo zgornjo formulo. Primer dveh prekrivajočih se lastnosti pokaže tipično napako: gola vsota \(|A|+|B|\) dvojno šteje \(A\cap B\). Končnost \(U\) je pogoj za navedeno odštevanje končnih moči.`,hint:"Sledi prispevku enega elementa glede na to, v koliko množicah leži.",rubric:["pravilna formula za tri množice","prispevki za 1, 2 in 3 pripadnosti","komplement unije v končni U","pogoj končnosti in tipična napaka"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o10",topic:"razbitja-principi",prompt:"Razloži, zakaj pri nerazločljivih škatlah na splošno ne smemo preprosto deliti rezultata za razločljive škatle s k!.",answer:H`Deljenje s \(k!\) bi bilo pravilno le, če bi vsaka neoznačena porazdelitev imela natanko \(k!\) različnih označitev. Pri različnih predmetih to odpove, kadar so dovoljene prazne škatle: njihove permutacije ne spremenijo označene konfiguracije; pri enakih predmetih stabilizator povzročijo tudi ponovljena števila zasedenosti. Pravilni modeli so Stirlingova števila za različne predmete oziroma razčlenitve za enake predmete.`,hint:"Ali imajo vse orbite preimenovanj enako velikost?",rubric:["pogoj za deljenje","opis stabilizatorja/simetrije","konkreten razlog odpovedi","pravilen nadomestni model"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o11",topic:"izbori-binomi",prompt:"Definiraj urejeni izbor s ponavljanjem, dokaži formulo za njegovo število in pravilno obravnavaj prazen izbor.",answer:H`Urejeni izbor s ponavljanjem dolžine \(r\) iz \(N\) je \(r\)-terica elementov \(N\), torej element \(N^r\). Za \(r=0\) obstaja ena prazna terica, za \(r=1\) jih je \(n\). Če jih je dolžine \(r\) natanko \(n^r\), izbore dolžine \(r+1\) razdelimo glede na prvo komponento v \(n\) disjunktnih skupin; po odstranitvi prve komponente ima vsaka \(n^r\) elementov. Skupaj jih je \(n\cdot n^r=n^{r+1}\).`,hint:"Poišči razcep izborov dolžine r+1 na enako velike disjunktne razrede.",rubric:["definicija r-terice","prazen osnovni primer","disjunktni razcep","dokaz formule n^r"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o12",topic:"izbori-binomi",prompt:"Navedi in dokaži formulo za število permutacij multimnožice.",answer:H`Če ima multimnožica moč \(n\), njeni različni elementi pa kratnosti \(n_1,\ldots,n_k\), kjer \(\sum_i n_i=n\), je permutacij \(n!/(n_1!\cdots n_k!)\). Začasno označimo vseh \(n\) pojavitev kot različnih; dobimo \(n!\) permutacij. Vsaka vidna permutacija nastane natanko \(n_1!\cdots n_k!\)-krat, ker lahko neodvisno premešamo oznake znotraj vsake skupine enakih elementov.`,hint:"Začasno loči enake kopije.",rubric:["pogoji in formula","označitev kopij","število preureditev oznak","deljenje z enako velikostjo vlaken"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o13",topic:"izbori-binomi",prompt:"Navedi binomski izrek in ga kombinatorično utemelji. Izpelji obe vsoti binomskih koeficientov.",answer:H`Za \(n\in\mathbb N_0\) velja \((x+y)^n=\sum_{r=0}^n\binom nr x^{n-r}y^r\). Pri množenju \(n\) faktorjev dobimo člen \(x^{n-r}y^r\) tako, da v natanko \(r\) faktorjih izberemo \(y\); to naredimo na \(\binom nr\) načinov. Pri \(x=y=1\) dobimo \(\sum_r\binom nr=2^n\), pri \(x=1,y=-1\) pa za \(n\ge1\) \(\sum_r(-1)^r\binom nr=0\).`,hint:"Koeficient pove, iz katerih oklepajev vzameš y.",rubric:["pravilen izrek","izbiranje r faktorjev","vsota 2^n","alternirajoča vsota in pogoj n≥1"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o14",topic:"izbori-binomi",prompt:"Zakaj ima n-elementna množica 2^n podmnožic? Podaj dva dokaza.",answer:H`Prvi dokaz: \(\mathcal P(N)\) je disjunktna unija družin podmnožic posameznih moči, zato je \(|\mathcal P(N)|=\sum_{r=0}^n\binom nr=2^n\). Drugi dokaz: vsaki podmnožici bijektivno priredimo njen karakteristični niz dolžine \(n\); za vsak element neodvisno izberemo »je/notri« ali »ni/notri«, zato je nizov \(2^n\).`,hint:"Razvrsti po moči ali uporabi ničelno-enotski niz.",rubric:["potencialna množica","disjunktna unija","karakteristični niz","pravilo produkta"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o15",topic:"razbitja-principi",prompt:"Definiraj razčlenitev naravnega števila na predpisano število delov, dokaži temeljno rekurzijo ter jo preveri skupaj z robovi na konkretnem primeru.",answer:H`Razčlenitev \(n\) na \(k\) delov je neurejen zapis \(n=m_1+\cdots+m_k\) s pozitivnimi celimi deli; zaradi enoličnega zapisa jih uredimo \(1\le m_1\le\cdots\le m_k\). Njihovo število je \(p_k(n)\). Za \(1\le k\le n\) razčlenitve razdelimo na dva disjunktna razreda. Če je \(m_1=1\), odstranitev ene enice da razčlenitev \(n-1\) na \(k-1\) delov. Če je \(m_1>1\), od vsakega od \(k\) delov odštejemo 1 in dobimo razčlenitev \(n-k\) na \(k\) pozitivnih delov. Obe konstrukciji sta obrnljivi, zato
\[p_k(n)=p_{k-1}(n-1)+p_k(n-k).\]
Robovi so \(p_0(0)=1\), \(p_0(n)=0\) za \(n>0\), \(p_k(n)=0\) za \(k>n\), \(p_1(n)=p_n(n)=1\) za \(n\ge1\). Primer: razčlenitve 7 na tri dele so \(1+1+5,1+2+4,1+3+3,2+2+3\), zato \(p_3(7)=4=p_2(6)+p_3(4)=3+1\). Ne smemo jih zamenjati s kompozicijami, kjer vrstni red delov šteje, niti s \(S(n,k)\), kjer so elementi razločljivi.`,hint:"Razčlenitve razvrsti glede na to, ali je najmanjši del enak 1.",rubric:["definicija neurejene razčlenitve","dva bijektivna primera","rekurzija z vsemi robovi","pravilen primer in ločitev od kompozicij oziroma S(n,k)"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o16",topic:"razbitja-principi",prompt:"Za končne množice navedi splošno načelo vključitev in izključitev ter dokaži, da vsak element unije prispeva natanko 1.",answer:H`Za končne množice \(A_1,\ldots,A_n\) velja \(|\bigcup_iA_i|=\sum_{\varnothing\ne I\subseteq[n]}(-1)^{|I|+1}|\bigcap_{i\in I}A_i|\). Če \(x\) leži v natanko \(m\) množicah, se v presekih \(j\) množic pojavi \(\binom mj\)-krat. Njegov skupni prispevek je \(\sum_{j=1}^m(-1)^{j+1}\binom mj=1\), ker je celotna vsota od \(j=0\) enaka \((1-1)^m=0\).`,hint:"Sledi enemu elementu, ki je v m množicah.",rubric:["končnost in splošna formula","štetje presekov z binomom","alternirajoča vsota","prispevek 1"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o17",topic:"razbitja-principi",prompt:"Definiraj tri ekvivalenčne relacije na preslikavah, ki vodijo do dvanajstere poti, in pojasni njihov pomen.",answer:H`Za \(f,g:N\to K\) velja \(f\sim_Kg\), če je \(g=\lambda\circ f\) za permutacijo \(\lambda\) cilja; s tem pozabimo imena škatel. Velja \(f\sim_Ng\), če je \(g=f\circ\rho\) za permutacijo \(\rho\) domene; s tem pozabimo imena predmetov. Pri \(\sim_{N,K}\) dovolimo oboje: \(g=\lambda\circ f\circ\rho\). Prvi razredi ustrezajo razbitjem domene, drugi \(K\)-indeksiranim vektorjem zasedenosti oziroma multimnožicam slik, tretji razčlenitvam števila \(n\).`,hint:"Permutacija domene preimenuje predmete, permutacija kodomene škatle.",rubric:["definicija sim_K","definicija sim_N","definicija sim_NK","interpretacija vseh treh"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o18",topic:"razbitja-principi",prompt:"Izpelji vsa tri števila preslikav iz n-elementne v k-elementno množico: vseh, injektivnih in surjektivnih.",answer:H`Vseh je \(k^n\), ker vsak od n elementov neodvisno izbere eno od k slik. Injekcij je \(k^{\underline n}\), saj slike izbiramo brez ponavljanja; če \(n>k\), jih ni. Pri surjekciji so vlakna razbitje domene na k nepraznih blokov: izberemo ga na \(S(n,k)\) načinov, nato bloke bijektivno označimo s ciljnimi elementi na \(k!\) načinov, zato je surjekcij \(k!S(n,k)\).`,hint:"Preslikava je terica slik; pri surjekciji glej vlakna.",rubric:["k^n","padajoča potenca in pogoj","vlakna kot razbitje","faktor k!"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o19",topic:"razbitja-principi",prompt:"Za n,k≥1 razloži celotno dvanajstero pot: kateri objekti nastopijo v vsaki od štirih kombinacij razločljivosti?",answer:H`Naj bosta \(n,k\ge1\). Različni predmeti in različne škatle so preslikave: brez pogoja \(k^n\), injektivno \(k^{\underline n}\), surjektivno \(k!S(n,k)\). Enaki predmeti in različne škatle so vektorji zasedenosti: \(\binom{n+k-1}{k-1}\), pri pozitivnih zasedenostih \(\binom{n-1}{k-1}\), pri največ eni pa \(\binom kn\). Različni predmeti in enake škatle so razbitja: \(\sum_{i\le k}S(n,i)\), natanko k nepraznih \(S(n,k)\), injektivno en razred, če \(n\le k\). Enaki predmeti in enake škatle so razčlenitve: \(\sum_{i\le k}p_i(n)\), natanko k nepraznih \(p_k(n)\), injektivno en razred, če \(n\le k\).`,hint:"Preslikave – zasedenosti – razbitja – razčlenitve.",rubric:["pogoj n,k≥1","različni/različne","enaki/različne","različni/enake","enaki/enake in pogoji"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o20",topic:"razbitja-principi",prompt:"Definiraj deranžma in izpelji njegovo formulo z vključitvami in izključitvami.",answer:H`Deranžma je permutacija brez fiksnih točk. Naj bo \(A_i\) množica permutacij, ki fiksirajo i. Za vsak izbor j določenih fiksnih točk je presek velikosti \((n-j)!\), takih izborov pa je \(\binom nj\). Zato je \(D_n=\sum_{j=0}^n(-1)^j\binom nj(n-j)!=n!\sum_{j=0}^n(-1)^j/j!\).`,hint:"Slabi dogodek: i ostane na svojem mestu.",rubric:["definicija","slabe množice","moč j-kratnega preseka","končna formula"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o22",topic:"izbori-binomi",prompt:"Izpelji faktorsko formulo za binomski koeficient in pojasni vse robne dogovore.",answer:H`Naj bo \(N\) množica z \(|N|=n\) in \(0\le r\le n\). Urejenih izborov \(r\) različnih elementov je \(n^{\underline r}=n!/(n-r)!\). Vsaka \(r\)-elementna podmnožica da natanko \(r!\) ureditev, zato \(\binom nr=n!/[r!(n-r)!]\). Kombinatorična definicija da \(\binom n0=\binom nn=1\): obstajata natanko prazna in celotna podmnožica. Za \(r<0\) ali \(r>n\) postavimo \(\binom nr=0\), ker takšna podmnožica ne obstaja. Formula s fakultetami zunaj območja ni definicija in je ne smemo nekritično uporabljati.`,hint:"Najprej preštej urejene izbore in ugotovi, kolikokrat se pojavi ista podmnožica.",rubric:["kombinatorična definicija","urejeni izbori","deljenje z r!","oba robova in nič zunaj območja"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o23",topic:"izbori-binomi",prompt:"Kombinatorično dokaži Vandermondovo identiteto in jasno opiši šteti objekt.",answer:H`Za nenegativna \(m,n,r\) velja \(\sum_{j=0}^{r}\binom mj\binom n{r-j}=\binom{m+n}{r}\), pri čemer členi zunaj dopustnega območja pomenijo 0. Vzamemo disjunktni množici \(A,B\) z močema \(m,n\) in štejemo \(r\)-elementne podmnožice njune unije. Neposredno jih je \(\binom{m+n}{r}\). Če jih razdelimo glede na \(j=|X\cap A|\), izberemo \(j\) elementov iz \(A\) in \(r-j\) iz \(B\), torej \(\binom mj\binom n{r-j}\). Razredi po \(j\) so disjunktni in izčrpni, zato seštevek daje isto število. Primer \(m=n=1,r=1\) pokaže dve možnosti, po eno iz vsakega dela.`,hint:"Razdeli eno večjo množico na dva disjunktna dela.",rubric:["natančna identiteta in pogoji","en sam jasno določen šteti objekt","razcep glede na j","disjunktnost in izčrpnost"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o24",topic:"izbori-binomi",prompt:"Dokaži identiteto \\(\\sum_{r=0}^{n}r\\binom nr=n2^{n-1}\\) na dva načina in razloži primer \\(n=0\\).",answer:H`Algebraično odvajamo \((1+x)^n=\sum_r\binom nr x^r\): dobimo \(n(1+x)^{n-1}=\sum_r r\binom nr x^{r-1}\), pri \(x=1\) pa zahtevano enakost za \(n\ge1\). Kombinatorično štejemo pare \((S,s)\), kjer je \(S\subseteq N\) in \(s\in S\) označen element. Če najprej izberemo velikost \(r\), jih je \(r\binom nr\). Če najprej izberemo \(s\), imamo \(n\) možnosti, preostalih \(n-1\) elementov pa poljubno vključimo ali ne, zato \(n2^{n-1}\). Pri \(n=0\) je leva stran 0; desni zapis \(n2^{n-1}\) obravnavamo ločeno, ne kot navadno potenco z negativnim eksponentom.`,hint:"Štej podmnožico z enim označenim izbranim elementom.",rubric:["pravilen algebraični dokaz","pravilno definirani pari","dvojno štetje","ločena obravnava n=0"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o25",topic:"izbori-binomi",prompt:"Pojasni metodo zvezdic in pregrad za nenegativne in pozitivne rešitve ter navedi, kdaj formula ne velja neposredno.",answer:H`Za \(n\ge1,r\ge0\) nenegativne rešitve \(x_1+\cdots+x_n=r\) bijektivno kodiramo z \(r\) zvezdicami in \(n-1\) pregradami; zato jih je \(\binom{r+n-1}{n-1}\). Za pozitivne rešitve zahtevamo \(r\ge n\), postavimo \(y_i=x_i-1\ge0\) in dobimo \(\binom{r-1}{n-1}\); če \(r<n\), rešitev ni. Primer \(x_1+x_2+x_3=5\), \(x_i>0\), da \(\binom42=6\). Metoda neposredno ne rešuje zgornjih omejitev, kot je \(x_i\le2\); tedaj potrebujemo vključitve–izključitve ali rodovne funkcije. Prav tako različne spremenljivke pomenijo označene škatle.`,hint:"Najprej odstrani obvezno enico iz vsake pozitivne spremenljivke.",rubric:["bijekcija z zvezdicami in pregradami","obe formuli s pogoji","primer","protiprimer z zgornjo omejitvijo ali neoznačenimi škatlami"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o26",topic:"razbitja-principi",prompt:"Definiraj razbitje množice in ga primerjaj z razčlenitvijo števila; dodaj primer in protiprimer zamenjave.",answer:H`Razbitje množice \(N\) je družina nepraznih, paroma disjunktnih podmnožic, katerih unija je \(N\); podmnožice so bloki. Stirlingovo število \(S(n,k)\) šteje razbitja označenih elementov na \(k\) neoznačenih blokov. Razčlenitev števila \(n\) na \(k\) delov pa je neurejen zapis \(n=m_1+\cdots+m_k\) s pozitivnimi deli in jo šteje \(p_k(n)\); pomni le velikosti blokov, ne njihove vsebine. Za \(N=\{1,2,3,4\}\) razbitji \(\{\{1,2\},\{3,4\}\}\) in \(\{\{1,3\},\{2,4\}\}\) sta različni, a obe določata isto razčlenitev \(4=2+2\). Zato na splošno \(S(n,k)\ne p_k(n)\).`,hint:"Kaj se zgodi, če pozabiš imena elementov in ohraniš le velikosti blokov?",rubric:["trije pogoji za razbitje","definicija razčlenitve","primer istega profila blokov","jasna razlika S in p"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o28",topic:"razbitja-principi",prompt:"Dokaži zaprto formulo \\(S(n,2)=2^{n-1}-1\\) za \\(n\\ge2\\).",answer:H`Fiksirajmo element \(a\) v \(n\)-elementni množici. Razbitje na dva neoznačena neprazna bloka je enolično določeno z blokom \(B\), ki vsebuje \(a\): izberemo poljubno podmnožico preostalih \(n-1\) elementov, ki se pridružijo \(a\), vendar ne smemo izbrati vseh, sicer bi bil drugi blok prazen. Zato je možnosti \(2^{n-1}-1\). Fiksiranje \(a\) odpravi dvojno štetje, ki bi nastalo, če bi poljubno izbrali enega od obeh neoznačenih blokov. Za \(n=2\) formula da 1; za \(n=1\) razbitja na dva neprazna bloka ni in formula ni navedena.`,hint:"Označi blok po tem, da vsebuje vnaprej izbran element.",rubric:["pogoj n≥2","fiksni element","izključitev praznega drugega bloka","razlaga brez dvojnega štetja"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o29",topic:"razbitja-principi",prompt:"Definiraj Bellova števila, dokaži njihovo zvezo s Stirlingovimi števili in izpelji rekurzijo z razlikovanjem enega elementa.",answer:H`Bellovo število \(B_n\) šteje vsa razbitja \(n\)-elementne množice, ne glede na število blokov. Ker ima vsako razbitje enolično določeno število blokov \(k\), družine po \(k\) pa so disjunktne, velja
\[B_n=\sum_{k=0}^{n}S(n,k).\]
Za drugo rekurzijo dodamo poseben element \(a\) k \(n\) drugim elementom. Izberimo \(j\) elementov, ki ne bodo v bloku z \(a\), na \(\binom nj\) načinov, in jih poljubno razbijmo na \(B_j\) načinov; vseh preostalih \(n-j\) elementov se mora pridružiti bloku z \(a\). Konstrukcija je bijektivna, zato
\[B_{n+1}=\sum_{j=0}^{n}\binom nj B_j,\qquad B_0=1.\]
Primer: \(B_3=1+3+1=5\) iz Stirlingovih števil, nato \(B_4=\binom30B_0+\binom31B_1+\binom32B_2+\binom33B_3=15\). Bellova števila štejejo razbitja razločljivih elementov; niso števila celoštevilskih razčlenitev \(p(n)\).`,hint:"Vsa razbitja najprej razvrsti po številu blokov, nato pa opazuj blok izbranega elementa.",rubric:["definicija Bellovih števil","vsota Stirlingovih števil","bijektivni dokaz rekurzije","rob B0, izračun in ločitev od celoštevilskih razčlenitev"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o30",topic:"razbitja-principi",prompt:"Formalno definiraj injekcijo, surjekcijo in bijekcijo ter izpelji njihova števila med končnima množicama.",answer:H`Za \(f:N\to K\) je injektivnost trditev \(f(x)=f(y)\Rightarrow x=y\); surjektivnost pomeni \((\forall z\in K)(\exists x\in N)f(x)=z\); bijekcija ima obe lastnosti. Če sta \(|N|=n,|K|=k\), je vseh preslikav \(k^n\). Injekcij je \(k^{\underline n}=k!/(k-n)!\) za \(n\le k\), sicer 0. Surjekcij je \(k!S(n,k)\) za \(n\ge k\ge1\), sicer 0; izjema praznih množic je: iz prazne v prazno obstaja ena preslikava, iz neprazne v prazno nobena, prazna preslikava v neprazno pa ni surjektivna. Bijekcij med enako velikima množicama je \(n!\), pri različnih končnih močeh jih ni.`,hint:"Za injekcijo izbiraj različne slike, za surjekcijo glej neprazna vlakna.",rubric:["vse tri definicije","vse preslikave in injekcije","surjekcije in pogoji","bijekcije ter prazni robovi"],difficulty:2,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o34",topic:"razbitja-principi",prompt:"Izpelji rekurzijo za deranžmaje in jo primerjaj s formulo iz vključitev–izključitev.",answer:H`Deranžma je permutacija brez fiksnih točk; naj bo \(D_n\) njihovo število, \(D_0=1,D_1=0\). Opazujmo sliko elementa 1. Izberemo \(j\ne1\), kamor gre 1, na \(n-1\) načinov. Če gre \(j\) nazaj v 1, preostalih \(n-2\) elementov deranžiramo: \(D_{n-2}\). Če \(j\) ne gre v 1, z združitvijo ustreznega prehoda dobimo bijekcijo z deranžmaji \(n-1\) elementov: \(D_{n-1}\). Zato \(D_n=(n-1)(D_{n-1}+D_{n-2})\). Isti objekt vključitve–izključitve preštejejo kot \(D_n=n!\sum_{i=0}^{n}(-1)^i/i!\). Rekurzija je uporabna za zaporedni račun, zaprta formula pa za ocene, npr. \(D_n\) je najbližje celo število \(n!/e\).`,hint:"Fiksiraj, kam gre element 1, in loči, ali se izbrani partner vrne v 1.",rubric:["definicija in robova","izbira slike elementa 1","oba primera in bijekcija","rekurzija ter povezava s PIE"],difficulty:3,source:"ADM-Kombinatorika.pdf"}
  ];

  // Ta modul je namenoma samo teorijski; preverjanje definicij in dokazov je v `questions`.
  questions.push(
    {id:"cc-o35",topic:"izbori-binomi",prompt:"Navedi identiteto hokejske palice, jo kombinatorično dokaži, pojasni robne pogoje in preveri na majhnem primeru.",answer:H`Za celi števili \(0\le r\le n\) velja identiteta hokejske palice
\[\sum_{j=r}^{n}\binom jr=\binom{n+1}{r+1}.\]
Štejmo \((r+1)\)-elementne podmnožice množice \(\{1,\ldots,n+1\}\). Neposredno jih je \(\binom{n+1}{r+1}\). Vsaka ima enolično določen največji element \(j+1\), kjer je \(r\le j\le n\); preostalih \(r\) elementov izberemo med \(1,\ldots,j\), kar da \(\binom jr\) možnosti. Razredi po največjem elementu so disjunktni in izčrpni, zato dobimo vsoto na levi. Za \(r=0\) obe strani dasta \(n+1\). Primer \(r=2,n=4\): \(\binom22+\binom32+\binom42=1+3+6=10=\binom53\). Pogosta napaka je začeti vsoto pri 0 brez dogovora \(\binom jr=0\) za \(j<r\) ali napačno premakniti zgornji indeks na desni.`,hint:"Razvrsti podmnožice po njihovem največjem elementu.",rubric:["natančna identiteta in pogoji","jasno določen šteti objekt","disjunktni razcep po maksimumu","rob, primer in tipična indeksna napaka"],difficulty:3,source:"ADM-Kombinatorika.pdf"}
  );

  questions.push(
    {id:"cc-o36",topic:"izbori-binomi",prompt:"Definiraj multinomski koeficient, izpelji njegovo formulo in multinomski izrek ter rezultat ponazori z robnim in konkretnim primerom.",answer:H`Naj bodo \(n_1,\ldots,n_t\in\mathbb N_0\) in \(n_1+\cdots+n_t=n\). Multinomski koeficient
\[\binom{n}{n_1,\ldots,n_t}=\frac{n!}{n_1!\cdots n_t!}\]
šteje razdelitve \(n\)-elementne množice v zaporedje \(t\) označenih, paroma disjunktnih podmnožic predpisanih moči \(n_1,\ldots,n_t\), katerih unija je celotna množica. Zaporedoma izbiramo podmnožice:
\[\binom n{n_1}\binom{n-n_1}{n_2}\cdots\binom{n_t}{n_t}
=\frac{n!}{n_1!\cdots n_t!}.\]
Pri razvoju \((x_1+\cdots+x_t)^n\) člen \(x_1^{n_1}\cdots x_t^{n_t}\) nastane z izbiro, iz katerih faktorjev vzamemo posamezni \(x_i\), zato
\[(x_1+\cdots+x_t)^n=\sum_{n_1+\cdots+n_t=n}\binom{n}{n_1,\ldots,n_t}x_1^{n_1}\cdots x_t^{n_t}.\]
Če je kateri \(n_i=0\), je ustrezna označena podmnožica prazna in uporabimo \(0!=1\). Beseda MISSISSIPPI ima \(11!/(4!4!2!)=34650\) različnih permutacij. Dodatno deljenje s \(t!\) bi bilo napačno, ker so tipi oziroma mesta označeni.`,hint:"Najprej zaporedoma izberi označene podmnožice predpisanih velikosti.",rubric:["definicija štetega objekta","izpeljava faktorske formule","multinomski izrek in pomen koeficienta","rob n_i=0, primer in opozorilo na t!"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o37",topic:"izbori-binomi",prompt:H`Za \(0\le s\le r\le n\) dokaži identiteto
\(\binom nr\binom rs=\binom ns\binom{n-s}{r-s}\) tako, da pare \(S\subseteq R\subseteq N\), \(|S|=s\), \(|R|=r\), prešteješ na dva načina. Preveri robna primera \(s=0\) in \(s=r\) ter pojasni napako pri neodvisni izbiri obeh podmnožic.`,answer:H`Za \(0\le s\le r\le n\) velja
\[\binom nr\binom rs=\binom ns\binom{n-s}{r-s}.\]
Obe strani štejeta pare \((S,R)\) z \(S\subseteq R\subseteq N\), \(|S|=s\), \(|R|=r\), kjer je \(|N|=n\). Na levi najprej izberemo \(R\) in nato \(S\) znotraj njega. Na desni najprej izberemo \(S\), nato preostalih \(r-s\) elementov množice \(R\) izmed \(N\setminus S\). Opisa sta bijektivna in zajameta natanko iste pare. Primer \(n=5,r=3,s=1\) da \(10\cdot3=5\cdot6=30\). Pri \(s=0\) identiteta postane \(\binom nr=\binom nr\), pri \(s=r\) prav tako. Napačen izraz \(\binom ns\binom n{r-s}\) dopušča prekrivanje obeh izbir in lahko isti element šteje v obeh delih; druga izbira mora potekati med preostalimi \(n-s\) elementi.`,hint:"Isti par ugnezdenih podmnožic izberi v dveh različnih vrstnih redih.",rubric:["identiteta in pogoji","natančno določen šteti par","oba postopka štetja","robovi, številčni primer in protiprimer neodvisni izbiri"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o38",topic:"razbitja-principi",prompt:"Naj bo \\(n\\ge 1\\) in \\(1\\le k\\le n\\). Poveži razčlenitve števila \\(n\\) na natanko \\(k\\) pozitivnih delov z razčlenitvami \\(n\\), katerih največji del je \\(k\\), ter zvezo dokaži z bijekcijo in preveri na primeru.",answer:H`Naj bo \(n\ge1\) in \(1\le k\le n\). Naj \(p_k(n)\) šteje razčlenitve \(n\) na natanko \(k\) pozitivnih delov. Enako mnogo je razčlenitev \(n\), katerih največji del je natanko \(k\). Razčlenitev predstavimo s Ferrersovim diagramom: deli so dolžine vrstic. Zrcaljenje diagrama čez glavno diagonalo zamenja vrstice in stolpce. Število vrstic prvotnega diagrama je \(k\), zato je dolžina prve vrstice zrcaljenega diagrama \(k\); ta je njegov največji del. Zrcaljenje je samo sebi inverzno, torej je bijekcija. Za \(n=7,k=3\) so razčlenitve na tri dele
\[5+1+1,\quad4+2+1,\quad3+3+1,\quad3+2+2,\]
razčlenitve z največjim delom 3 pa
\[3+3+1,\quad3+2+2,\quad3+2+1+1,\quad3+1+1+1+1.\]
V obeh družinah so štiri. Zveza ne govori o \(n=0\), saj prazna razčlenitev nima največjega dela. Prav tako ne velja za urejene kompozicije, ker Ferrersov diagram predstavlja neurejene dele.`,hint:"Razčlenitev predstavi geometrijsko in zamenjaj vlogi vrstic ter stolpcev.",rubric:["obe družini in pogoji n,k","bijekcija in njena obrnljivost","pravilen primer","ločitev od prazne razčlenitve in kompozicij"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {id:"cc-o39",topic:"razbitja-principi",prompt:H`Naj bodo \(n,k\in\mathbb N_0\) in \(0\le r\le\min\{n,k\}\). \(n\) predmetov razporejamo v \(k\) označenih škatel in zahtevamo, da je natanko \(r\) škatel nepraznih. Izpelji število porazdelitev najprej za razločljive in nato za nerazločljive predmete, utemelji vsako izbiro ter modela primerjaj na istem konkretnem primeru in obravnavaj \(r=0\).`,answer:H`Naj bo \(0\le r\le\min\{n,k\}\). Pri \(n\) razločljivih predmetih najprej izberemo \(r\) nepraznih škatel na \(\binom kr\) načinov. Porazdelitev v izbrane škatle mora biti surjekcija, zato jih je \(r!S(n,r)\). Skupaj dobimo
\[\binom kr r!S(n,r)=k^{\underline r}S(n,r),\qquad r\le n.\]
Pri \(n\) nerazločljivih predmetih po izbiri škatel njihove pozitivne zasedenosti rešujejo \(x_1+\cdots+x_r=n\), zato je za \(n,r\ge1\)
\[\binom kr\binom{n-1}{r-1}\]
porazdelitev. Za \(n=4,k=3,r=2\) je razločljivih porazdelitev \(\binom32\,2!S(4,2)=42\), nerazločljivih pa \(\binom32\binom31=9\). Če je \(n>0\) in \(r=0\), je v obeh modelih rezultat 0, ker bi morali vsi predmeti ležati v neprazni škatli. Če je \(n=r=0\), obstaja za vsak \(k\ge0\) natanko ena prazna porazdelitev: vse škatle so prazne. Formula \(r!S(n,r)\) ni primerna za nerazločljive predmete, ker Stirlingovi bloki vsebujejo razločljive elemente.`,hint:"Najprej izberi neprazne škatle, nato za vsak model določi pravi objekt zasedenosti.",rubric:["izbira r škatel","surjekcijski model za razločljive predmete","pozitivne zasedenosti za nerazločljive predmete","isti primer, rob r=0 in ločitev formul"],difficulty:3,source:"ADM-Kombinatorika.pdf"},
    {
      id: "cc-o40",
      topic: "izbori-binomi",
      prompt: H`Naj bo \(p\) praštevilo in \(0\lt r\lt p\). Dokaži, da \(p\mid\binom pr\). Natančno označi mesto, kjer uporabiš praštevilskost in Evklidovo lemo; nato obravnavaj robova \(r=0,p\), dodaj sestavljeni protiprimer ter izpelji kongruenco \((a+b)^p\equiv a^p+b^p\pmod p\).`,
      answer: H`Ker je
      \[
      \binom pr\,r!(p-r)!=p!,
      \]
      praštevilo \(p\) deli produkt na levi. Pogoja \(0<r<p\) pomenita, da so vsi faktorji \(r!\) in \((p-r)!\) strogo manjši od \(p\). Praštevilo \(p\) zato ne deli nobenega izmed njih in
      \[
      \gcd\!\bigl(p,r!(p-r)!\bigr)=1.
      \]
      Evklidova lema zdaj iz
      \[
      p\mid\binom pr\,r!(p-r)!
      \]
      da \(p\mid\binom pr\). Praštevilskost smo uporabili pri dokazovanju te tujosti; nato uporabimo tuji-faktorski zapis Evklidove leme.
      <p>Robova sta izključena, ker je \(\binom p0=\binom pp=1\), česar \(p>1\) ne deli. Če zgornje število ni praštevilo, trditev lahko odpove: \(\binom42=6\) in \(4\nmid6\).</p>
      <p>Po binomskem izreku</p>
      \[
      (a+b)^p=a^p+\sum_{r=1}^{p-1}\binom pr a^{p-r}b^r+b^p.
      \]
      <p>Vsak člen srednje vsote je deljiv s \(p\), zato za vsa \(a,b\in\mathbb Z\) velja \((a+b)^p\equiv a^p+b^p\pmod p\).</p>`,
      hint: H`Ne poskušaj »krajšati« fakultet po modulu. Najprej uporabi celoštevilsko identiteto in dokaži tujost drugega faktorja s \(p\).`,
      rubric: ["faktorska identiteta in deljivost produkta", "utemeljena tujost ter izrecna Evklidova lema", "oba robova in sestavljeni protiprimer", "izpeljava kongruence iz binomskega izreka"],
      difficulty: 3,
      source: "ADM-Kombinatorika.pdf; uporabnikov artefakt »ADM — teorija za izpit«, vprašanje 84",
      tags: ["binomski koeficient", "praštevilo", "Evklidova lema", "dokaz"]
    }
  );

  const exercises = [];

  window.ADM_MODULE_COUNTING = { topics, flashcards, quiz, questions, exercises };
})();
