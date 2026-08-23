(() => {
  "use strict";

  const H = String.raw;

  // Izključno vprašanja iz treh PDF-jev v mapi »izpit teorija«.
  // Nobena druga zbirka ni vir tega modula.
  const questions = [
    {
      id: "official-2021-predikati-premice",
      canonicalId: "oq-pr-06",
      topic: "predikatni-racun",
      group: "logika-mnozice",
      official: true,
      source: { sourceId: "teorija-2021", page: "1" },
      prompt: H`Področje pogovora so premice v ravnini. Naj \(P(x,y)\) pomeni »\(x\) je pravokotna na \(y\)« in \(Q(x,y)\) »\(x\) je vzporedna z \(y\)«. S kvantifikatorji zapiši: (1) vsaka premica je vzporedna sama sebi; (2) nobena premica ni pravokotna sama nase; (3) vsaka premica ima pravokotnico; (4) če je neka premica pravokotna na drugi dve, sta slednji vzporedni.`,
      answer: H`<p><strong>Področje pogovora.</strong> Vse kvantificirane spremenljivke označujejo premice v isti ravnini, zato tega pogoja v formulah ne ponavljamo.</p><ol><li><strong>Refleksivnost vzporednosti:</strong> \(\forall x\,Q(x,x)\).</li><li><strong>Irefleksivnost pravokotnosti:</strong> \(\forall x\,\neg P(x,x)\), ekvivalentno \(\neg\exists x\,P(x,x)\).</li><li><strong>Obstoj pravokotnice za vsako premico:</strong> \(\forall x\,\exists y\,P(x,y)\).</li><li><strong>Skupna pravokotnica:</strong> \(\forall x\forall y\forall z\,((P(x,y)\land P(x,z))\Rightarrow Q(y,z))\).</li></ol><p><strong>Zakaj je vrstni red pomemben?</strong> V tretji trditvi lahko za vsako premico \(x\) izberemo drugo pričo \(y\). Zapis \(\exists y\forall x\,P(x,y)\) bi zahteval eno samo premico, pravokotno na vse premice, in zato pomeni nekaj bistveno močnejšega.</p><p><strong>Tipična napaka.</strong> Četrte trditve ne zapišemo s tremi nepovezanimi implikacijami. Premisa mora hkrati zahtevati \(P(x,y)\) in \(P(x,z)\), zaključek pa govori o paru \(y,z\).</p>`,
      hint: H`Najprej določi vlogo vsake spremenljivke. »Vsaka« zahteva \(\forall\), »obstaja« pa \(\exists\).`,
      rubric: ["Vsi kvantifikatorji imajo pravilen vrstni red in obseg.", "Irefleksivnost pravokotnosti je zapisana z negacijo.", "Zadnja formula uporablja tri spremenljivke in implikacijo."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "predikati", "kvantifikatorji", "interpretacija"]
    },
    {
      id: "official-2021-binomska-simetrija",
      canonicalId: "cc-o03",
      topic: "izbori-binomi",
      group: "kombinatorika",
      official: true,
      source: { sourceId: "teorija-2021", page: "1" },
      prompt: H`Navedi kombinatorično definicijo \(\binom nk\) in brez faktorske formule dokaži \(\binom nk=\binom n{n-k}\).`,
      answer: H`<p><strong>Kombinatorična definicija.</strong> Naj bo \(N\) poljubna množica z \(|N|=n\), kjer je \(n\in\mathbb N_0\). Za \(0\le k\le n\) je \(\binom nk\) število vseh \(k\)-elementnih podmnožic množice \(N\). Število ni odvisno od imen elementov, temveč samo od \(n\) in \(k\).</p><p><strong>Dokaz simetrije.</strong> Definirajmo \(f:\binom Nk\to\binom N{n-k}\) s predpisom \(f(S)=N\setminus S\). Če ima \(S\) natanko \(k\) elementov, ima njegov komplement natanko \(n-k\) elementov, zato je preslikava dobro definirana. Ker velja \(f(f(S))=S\), je \(f\) sama sebi inverzna ter zato bijektivna. Množici izbir imata enako moč:</p><div class="formula-panel">\[\binom nk=\binom n{n-k}.\]</div><p><strong>Intuicija.</strong> Izbrati \(k\) elementov je isto kot določiti, katerih \(n-k\) elementov ne izberemo. Na primer, izbiro dveh članov iz petih enolično določa tudi trojica neizbranih članov.</p><p><strong>Izpitna past.</strong> Zahteva »kombinatorično« pomeni, da moramo opisati bijekcijo; preurejanje faktorske formule samo po sebi ni tak dokaz.</p><div class="qed">□</div>`,
      hint: "Vsak izbor opiši z elementi, ki jih nisi izbral.",
      rubric: ["Definicija govori o k-elementnih podmnožicah n-elementne množice.", "Preslikava s komplementom je eksplicitna.", "Bijektivnost je utemeljena brez fakultet."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "binomski koeficient", "simetrija", "bijekcija", "dokaz"]
    },
    {
      id: "official-2021-inverz",
      canonicalId: "aa-o09",
      topic: "algebrske-strukture",
      group: "stevila-algebra",
      official: true,
      source: { sourceId: "teorija-2021", page: "1" },
      prompt: H`Naj bo \(*\) asociativna operacija z enoto \(e\) na \(A\). Definiraj inverz elementa; povej, kako se definicija poenostavi pri komutativni operaciji; dokaži enoličnost inverza; določi aditivni in multiplikativni inverz \(4\) v \(\mathbb Z_7\); navedi strukturo z vsaj dvema elementoma, v kateri je vsak element sam sebi inverz.`,
      answer: H`<p><strong>Definicija.</strong> Naj ima \((A,*)\) dvostransko enoto \(e\). Element \(b\in A\) je inverz elementa \(a\in A\), če veljata obe enakosti \(a*b=e\) in \(b*a=e\). Označimo ga z \(a^{-1}\). Pri komutativni operaciji iz ene enakosti sledi druga, zato zadošča preveriti samo \(a*b=e\).</p><p><strong>Dokaz enoličnosti.</strong> Naj bosta \(b\) in \(c\) inverza elementa \(a\). Tedaj</p><div class="formula-panel">\[b=b*e=b*(a*c)=(b*a)*c=e*c=c.\]</div><p>Prva in zadnja enakost uporabita enoto, druga in predzadnja lastnost inverza, srednja pa asociativnost. Torej ima element največ en inverz. Obstoj ni samoumeven: v monoidu nekateri elementi lahko niso obrnljivi.</p><p><strong>Izračun v \(\mathbb Z_7\).</strong> Za seštevanje je \(-4\equiv3\pmod7\), zato je aditivni inverz \([3]\). Ker \(4\cdot2=8\equiv1\pmod7\), je multiplikativni inverz \([2]\).</p><p><strong>Zgled, kjer je vsak element sam sebi inverz.</strong> V grupi \((\mathbb Z_2,+)\) velja \(0+0=0\) in \(1+1=0\). Večji zgled je \((\mathbb Z_2^m,+)\), kjer za vsak \(x\) velja \(x+x=0\).</p><div class="qed">□</div>`,
      hint: H`Za enoličnost med kandidatoma \(b,c\) vstavi enoto v obliki \(a*c\).`,
      rubric: ["Inverz je definiran dvostransko.", "Dokaz pravilno uporabi asociativnost.", "Inverza 4 v Z7 sta 3 in 2.", "Zgled ima enoto, asociativnost in najmanj dva elementa."],
      difficulty: 3, points: 14,
      tags: ["uradni teorijski izpit", "inverz", "enoličnost", "Z_n", "dokaz"]
    },
    {
      id: "official-2020-asimetricnost",
      canonicalId: "oq-ru-06",
      topic: "relacije-urejenosti",
      group: "logika-mnozice",
      official: true,
      source: { sourceId: "teorija-2021-roki", page: "1" },
      prompt: H`Definiraj irefleksivnost in asimetričnost relacije ter dokaži, da je vsaka asimetrična relacija irefleksivna.`,
      answer: H`<p>Naj bo \(R\subseteq A\times A\).</p><ul><li>\(R\) je <strong>irefleksivna</strong>, če \(\forall x\in A\;\neg(xRx)\): na diagonali relacije ni nobenega para \((x,x)\).</li><li>\(R\) je <strong>asimetrična</strong>, če \(\forall x,y\in A\;(xRy\Rightarrow\neg(yRx))\): kadar velja puščica iz \(x\) v \(y\), povratna puščica ne sme veljati.</li></ul><p><strong>Dokaz.</strong> Predpostavimo, da je \(R\) asimetrična. Če bi za neki \(x\in A\) veljalo \(xRx\), bi v definicijo asimetričnosti vstavili \(y=x\) in dobili \(xRx\Rightarrow\neg(xRx)\). Ker velja antecedens, bi hkrati veljala \(xRx\) in \(\neg(xRx)\), kar je protislovje. Zato za noben \(x\) ne velja \(xRx\); relacija je irefleksivna.</p><p><strong>Primer in meja trditve.</strong> Relacija \(<\) na \(\mathbb R\) je asimetrična in zato irefleksivna. Obrat ne velja: relacija \(R=\{(1,2),(2,1)\}\) na \(\{1,2\}\) je irefleksivna, vendar ni asimetrična.</p><div class="qed">□</div>`,
      hint: H`V asimetričnost vstavi \(y=x\).`,
      rubric: ["Obe lastnosti sta natančno kvantificirani.", "Dokaz uporabi diagonalni par.", "Sklep irefleksivnosti je jasen."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "relacije", "asimetričnost", "irefleksivnost", "dokaz"]
    },
    {
      id: "official-2020-brooks-meja",
      canonicalId: "gr-o31",
      topic: "barvanje-izomorfnost",
      group: "grafi",
      official: true,
      source: { sourceId: "teorija-2021-roki", page: "1" },
      prompt: H`Definiraj kromatično število, navedi Brooksov izrek in dokaži \(\chi(G)\le\Delta(G)+1\).`,
      answer: H`<p><strong>Definiciji.</strong> Pravilno \(k\)-barvanje enostavnega grafa \(G\) je preslikava \(c:V(G)\to\{1,\ldots,k\}\), pri kateri za vsako povezavo \(uv\in E(G)\) velja \(c(u)\ne c(v)\). Kromatično število \(\chi(G)\) je najmanjši \(k\), za katerega pravilno \(k\)-barvanje obstaja. Z \(\Delta(G)\) označimo največjo stopnjo vozlišča.</p><p><strong>Brooksov izrek.</strong> Če je \(G\) povezan enostaven graf, ki ni poln graf in ni lih cikel, potem \(\chi(G)\le\Delta(G)\). Za nepovezan graf izrek uporabimo po komponentah.</p><p><strong>Dokaz splošne meje \(\Delta+1\).</strong> Vozlišča uredimo v poljubnem vrstnem redu in jih barvamo zaporedno. Ko barvamo vozlišče \(v\), ima največ \(\deg(v)\le\Delta(G)\) že pobarvanih sosedov, zato ti prepovedo največ \(\Delta(G)\) barv. Med \(\Delta(G)+1\) barvami ostane vsaj ena dovoljena. Postopek pobarva ves graf, zato \(\chi(G)\le\Delta(G)+1\).</p><p><strong>Zakaj sta Brooksovi izjemi nujni?</strong> Za \(K_n\) je \(\chi(K_n)=n=\Delta(K_n)+1\), ker so vsa vozlišča paroma sosednja. Za lih cikel je \(\chi(C_{2r+1})=3=\Delta+1\), ker dvobarvanje ob obhodu cikla ob vrnitvi zahteva obe barvi na začetnem vozlišču.</p><div class="qed">□</div>`,
      hint: "Uporabi požrešno barvanje.",
      rubric: ["Kromatično število je minimum.", "Brooks vsebuje vse predpostavke in izjemi.", "Požrešni dokaz pojasni prosto barvo."],
      difficulty: 3, points: 12,
      tags: ["uradni teorijski izpit", "barvanje", "Brooks", "dokaz"]
    },
    {
      id: "official-2020-multimnozica",
      canonicalId: "cc-o05",
      topic: "izbori-binomi",
      group: "kombinatorika",
      official: true,
      source: { sourceId: "teorija-2021-roki", page: "1" },
      prompt: "Definiraj multimnožico in njeno moč. Koliko je multimnožic moči 4 z elementi iz dane 3-elementne množice?",
      answer: H`<p><strong>Definicija.</strong> Multimnožica na osnovni množici \(A\) je podana s funkcijo večkratnosti \(\mu:A\to\mathbb N_0\). Število \(\mu(a)\) pove, kolikokrat element \(a\) nastopi. Če je vsota končna, je moč multimnožice</p><div class="formula-panel">\[|M|=\sum_{a\in A}\mu(a).\]</div><p>Če je \(A=\{a,b,c\}\) in iščemo moč \(4\), vsako multimnožico enolično opiše trojica \((x_1,x_2,x_3)\in\mathbb N_0^3\) z \(x_1+x_2+x_3=4\). To je šibka kompozicija števila \(4\) na tri dele.</p><p><strong>Zvezdice in pregrade.</strong> Štiri enake zvezdice razdelimo z dvema enakima pregradama v tri zaporedne skupine. Med šestimi mesti izberemo mesti pregrad, zato je rešitev</p><div class="formula-panel">\[\binom{4+3-1}{3-1}=\binom62=15.\]</div><p><strong>Primer.</strong> Zapis \(**|\,|**\) predstavlja večkratnosti \((2,0,2)\), torej multimnožico z dvema kopijama \(a\), nobeno \(b\) in dvema \(c\). Vrstni red kopij ni pomemben.</p>`,
      hint: "Moč razdeli na tri nenegativne večkratnosti.",
      rubric: ["Definicija vsebuje večkratnosti.", "Moč je vsota večkratnosti.", "Rezultat 15 je utemeljen."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "multimnožica", "moč", "zvezdice in pregrade"]
    },
    {
      id: "official-zbirka-veljavnost",
      canonicalId: "oq-ir-06",
      topic: "izjavni-racun",
      group: "logika-mnozice",
      official: true,
      source: { sourceId: "teorija-zbirka", page: "1" },
      prompt: H`Kdaj je sklep \(A_1,\ldots,A_k\models B\) veljaven? Navedi veljaven in neveljaven zgled ter pravi protiprimer.`,
      answer: H`<p><strong>Definicija.</strong> Sklep \(A_1,\ldots,A_k\models B\) je veljaven, če za vsako določilo \(v\) velja: če so \(v(A_1)=\cdots=v(A_k)=1\), potem je tudi \(v(B)=1\). Veljavnost torej ne pomeni, da so premise vedno resnične, ampak da ni mogoče imeti vseh resničnih premis in napačnega zaključka.</p><p><strong>Ekvivalentni preizkus.</strong> Sklep je veljaven natanko tedaj, ko je formula</p><div class="formula-panel">\[(A_1\land\cdots\land A_k)\Rightarrow B\]</div><p>tavtologija. To lahko preverimo z resničnostno tabelo, logičnimi enakovrednostmi ali formalnim dokazom.</p><p><strong>Veljaven zgled — modus ponens.</strong> \(p\Rightarrow q,\ p\models q\). Če sta obe premisi resnični, mora biti \(q\) resničen, sicer bi bila implikacija \(p\Rightarrow q\) napačna.</p><p><strong>Neveljaven zgled — potrjevanje posledice.</strong> \(p\Rightarrow q,\ q\not\models p\). Določilo \(p=0,q=1\) je pravi protiprimer: implikacija in \(q\) sta resnična, zaključek \(p\) pa napačen.</p><p><strong>Izpitna past.</strong> Vrednotenje, pri katerem je napačna že ena premisa, ne ovrže veljavnosti. Protiprimer mora hkrati zadovoljiti vse premise in ovreči zaključek.</p>`,
      hint: "V protiprimeru morajo biti vse premise resnične.",
      rubric: ["Definicija kvantificira čez vsa določila.", "Veljaven zgled je pravilen.", "Protiprimer je pravilen."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "veljavnost", "sklepanje", "protiprimer"]
    },
    {
      id: "official-zbirka-obrnljivost-zn",
      canonicalId: "aa-o05",
      topic: "kongruence-euler",
      group: "stevila-algebra",
      official: true,
      source: { sourceId: "teorija-zbirka", page: "1" },
      prompt: H`Dokaži: \([a]\in\mathbb Z_n\) je obrnljiv natanko tedaj, ko je \(\gcd(a,n)=1\).`,
      answer: H`<p><strong>Pojmi.</strong> Razred \([a]\in\mathbb Z_n\) je obrnljiv, če obstaja \([b]\in\mathbb Z_n\), za katerega je \([a][b]=[1]\), oziroma \(ab\equiv1\pmod n\).</p><p><strong>\(\Rightarrow\).</strong> Če je \([a]\) obrnljiv, za neka \(b,k\in\mathbb Z\) velja \(ab-1=kn\), zato \(ab-kn=1\). Vsak skupni delitelj števil \(a\) in \(n\) deli levo stran in zato deli \(1\). Največji pozitivni skupni delitelj je torej \(\gcd(a,n)=1\).</p><p><strong>\(\Leftarrow\).</strong> Če je \(\gcd(a,n)=1\), Bézoutova identiteta da cela \(x,y\) z \(ax+ny=1\). Po prehodu modulo \(n\) dobimo \(ax\equiv1\pmod n\), zato je \([x]\) inverz razreda \([a]\).</p><div class="formula-panel">\[\mathbb Z_n^\times=\{[a]\in\mathbb Z_n:\gcd(a,n)=1\}.\]</div><p><strong>Primer.</strong> V \(\mathbb Z_8\) je \([3]\) obrnljiv in je sam sebi inverz, ker \(3^2\equiv1\pmod8\). Razred \([2]\) ni obrnljiv, ker \(\gcd(2,8)=2\).</p><div class="qed">□</div>`,
      hint: "Uporabi Bézoutovo identiteto.",
      rubric: ["Dokaz vsebuje obe smeri.", "Prva smer izpelje linearno kombinacijo 1.", "Druga smer uporabi Bézouta."],
      difficulty: 3, points: 12,
      tags: ["uradni teorijski izpit", "obrnljivost", "Bézout", "Z_n", "dokaz"]
    },
    {
      id: "official-zbirka-euler-phi",
      canonicalId: "aa-o06",
      topic: "kongruence-euler",
      group: "stevila-algebra",
      official: true,
      source: { sourceId: "teorija-zbirka", page: "2" },
      prompt: "Kako označimo in izračunamo število števil med 1 in n, ki so tuja n? Kako ga izračunamo iz prafaktorizacije?",
      answer: H`<p><strong>Definicija.</strong> Eulerjeva funkcija \(\varphi(n)\) je število ostankov med \(1\) in \(n\), ki so tuji z \(n\):</p><div class="formula-panel">\[\varphi(n)=\bigl|\{a\in\{1,\ldots,n\}:\gcd(a,n)=1\}\bigr|.\]</div><p>Za \(n>1\) lahko enakovredno štejemo razrede \([1],\ldots,[n-1]\); to je tudi moč grupe obrnljivih razredov \(\mathbb Z_n^\times\). Posebej je \(\varphi(1)=1\).</p><p><strong>Formula iz prafaktorizacije.</strong> Če je \(n=\prod_{i=1}^r p_i^{\alpha_i}\), kjer so \(p_i\) različna praštevila in \(\alpha_i\ge1\), potem</p><div class="formula-panel">\[\varphi(n)=n\prod_{i=1}^r\left(1-\frac1{p_i}\right)=\prod_{i=1}^r p_i^{\alpha_i-1}(p_i-1).\]</div><p><strong>Zakaj?</strong> Število ni tuje z \(n\) natanko tedaj, ko je deljivo z vsaj enim od praštevil \(p_i\). Z načelom vključitev in izključitev izmed \(n\) števil odstranimo njihove večkratnike; vsak faktor \(1-1/p_i\) predstavlja delež, ki ostane po odstranitvi večkratnikov \(p_i\).</p><p><strong>Primer.</strong> Ker je \(60=2^2\cdot3\cdot5\), je \(\varphi(60)=60(1-1/2)(1-1/3)(1-1/5)=16\).</p>`,
      hint: "V produktu nastopajo različni praštevilski delitelji.",
      rubric: ["φ je pravilno definirana.", "Formula je popolna.", "Pojasnjena je vloga prafaktorjev."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "Eulerjeva funkcija", "prafaktorizacija"]
    },
    {
      id: "official-zbirka-tavtologije",
      canonicalId: "oq-ir-07",
      topic: "izjavni-racun",
      group: "logika-mnozice",
      official: true,
      source: { sourceId: "teorija-zbirka", page: "2" },
      prompt: H`Katere formule so tavtologije? Za druge navedi protiprimer: (a) \(p\land q\Rightarrow p\lor q\); (b) \(\neg(p\Rightarrow q)\Leftrightarrow(\neg p\Rightarrow\neg q)\); (c) \((p\land(p\Rightarrow q))\Leftrightarrow q\).`,
      answer: H`<ol><li><strong>(a) je tavtologija.</strong> Če je \(p\land q\) resničen, sta resnična oba člena in zato tudi \(p\lor q\). Če je antecedens napačen, je implikacija že po definiciji resnična.</li><li><strong>(b) ni tavtologija.</strong> Pri \(p=0,q=0\) je \(p\Rightarrow q=1\), zato je leva stran \(\neg(p\Rightarrow q)=0\). Desna stran je \(\neg p\Rightarrow\neg q=1\Rightarrow1=1\); ekvivalenca ima vrednost \(0\). Pravilna negacija implikacije je \(\neg(p\Rightarrow q)\equiv p\land\neg q\), ne nova implikacija.</li><li><strong>(c) ni tavtologija.</strong> Pri \(p=0,q=1\) je \(p\Rightarrow q=1\), vendar \(p\land(p\Rightarrow q)=0\), medtem ko je \(q=1\). Ekvivalenca je napačna. Resnična je samo enosmerna implikacija \(p\land(p\Rightarrow q)\Rightarrow q\), to je modus ponens.</li></ol><p><strong>Metoda.</strong> Za dokaz tavtologije obravnavamo vsa določila ali izraz prevedemo z znanimi enakovrednostmi. Za ovržbo zadostuje eno popolnoma zapisano določilo, pri katerem ima formula vrednost \(0\).</p>`,
      hint: "Za ekvivalenco išči različni vrednosti strani.",
      rubric: ["(a) je pravilno razvrščena.", "Protiprimer za (b) je pravilen.", "Protiprimer za (c) je pravilen."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "tavtologija", "protiprimer"]
    },
    {
      id: "official-zbirka-enota",
      canonicalId: "aa-o08",
      topic: "algebrske-strukture",
      group: "stevila-algebra",
      official: true,
      source: { sourceId: "teorija-zbirka", page: "3" },
      prompt: "Definiraj enoto grupe in dokaži, da je enota natanko ena.",
      answer: H`<p><strong>Definicija.</strong> Naj bo \(*:A\times A\to A\) binarna operacija. Element \(e\in A\) je dvostranska enota, če za vsak \(a\in A\) velja</p><div class="formula-panel">\[e*a=a\qquad\text{in}\qquad a*e=a.\]</div><p>V grupi je obstoj takega elementa eden od aksiomov. Paziti moramo, da »enota« ni isto kot »obrnljiv element«: enota je nevtralni element \(e\), obrnljivi pa so elementi, ki imajo inverz glede na \(e\).</p><p><strong>Dokaz enoličnosti.</strong> Naj bosta \(e\) in \(f\) enoti za isto operacijo. Ker je \(e\) leva enota, velja \(e*f=f\). Ker je \(f\) desna enota, velja hkrati \(e*f=e\). Zato je \(e=f\).</p><p><strong>Pomembna opomba.</strong> Dokaz uporablja obe strani definicije, ne potrebuje pa asociativnosti. Če bi poznali samo levo oziroma samo desno enoto, enoličnost brez dodatnih predpostavk ne bi bila zagotovljena.</p><p><strong>Primer.</strong> Enota za seštevanje celih števil je \(0\), enota za množenje pa \(1\); vedno jo razumemo glede na izbrano operacijo.</p><div class="qed">□</div>`,
      hint: H`Izračunaj \(e*f\) na dva načina.`,
      rubric: ["Definicija je dvostranska.", "Dokaz primerja isti produkt.", "Zaključek je ekspliciten."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "grupa", "enota", "enoličnost", "dokaz"]
    },
    {
      id: "official-zbirka-pascal",
      canonicalId: "cc-o04",
      topic: "izbori-binomi",
      group: "kombinatorika",
      official: true,
      source: { sourceId: "teorija-zbirka", page: "4" },
      prompt: "Navedi Pascalovo identiteto in jo kombinatorično utemelji.",
      answer: H`<p><strong>Pascalova identiteta.</strong> Za \(n\ge1\) in \(1\le k\le n-1\) velja</p><div class="formula-panel">\[\binom nk=\binom{n-1}k+\binom{n-1}{k-1}.\]</div><p><strong>Kombinatorični dokaz.</strong> Naj bo \(N\) \(n\)-elementna množica in izberimo poseben element \(a\in N\). Vse \(k\)-elementne podmnožice množice \(N\) razdelimo v dve disjunktni skupini:</p><ol><li>izbori, ki ne vsebujejo \(a\): vseh \(k\) elementov izberemo iz \(N\setminus\{a\}\), zato jih je \(\binom{n-1}k\);</li><li>izbori, ki vsebujejo \(a\): po izbiri \(a\) moramo iz preostalih \(n-1\) elementov izbrati še \(k-1\), zato jih je \(\binom{n-1}{k-1}\).</li></ol><p>Skupini sta disjunktni in izčrpata vse možnosti, zato se njuni moči seštejeta. Če uporabljamo dogovor \(\binom nr=0\) zunaj območja \(0\le r\le n\), ista formula pokrije tudi robova \(k=0\) in \(k=n\).</p><p><strong>Primer.</strong> Deset trojic iz petih elementov razdelimo na štiri trojice, ki vsebujejo izbrani element, in šest, ki ga ne: \(\binom53=\binom42+\binom43=6+4\).</p><div class="qed">□</div>`,
      hint: "Razdeli izbore glede na izbrani element.",
      rubric: ["Indeksi so pravilni.", "Razdelitev je disjunktna in izčrpna.", "Oba člena sta pojasnjena."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "Pascalova identiteta", "dokaz"]
    },
    {
      id: "official-zbirka-interpretaciji-opomba",
      canonicalId: "oq-pr-07",
      topic: "predikatni-racun",
      group: "logika-mnozice",
      official: true,
      source: { sourceId: "teorija-zbirka", page: "5" },
      prompt: H`Podaj eno pravilno in eno nepravilno interpretacijo formule \(\forall x\,\exists y\,(P(y,x)\Rightarrow P(x,y))\).`,
      answer: H`<p><strong>Zahteve ni mogoče izpolniti: zapisana formula je splošno veljavna.</strong> Interpretacija določi neprazno področje pogovora in pomen dvomestnega predikata \(P\). Vendar za nobeno od teh izbir formula ne more biti napačna.</p><p><strong>Dokaz.</strong> Vzemimo poljuben element \(x\) področja. Eksistenčni kvantifikator dovoljuje, da za pričo izberemo prav ta element, torej \(y=x\). Jedro formule tedaj postane</p><div class="formula-panel">\[P(x,x)\Rightarrow P(x,x),\]</div><p>kar je tavtologija \(A\Rightarrow A\), ne glede na resničnost \(P(x,x)\). Ker taka priča obstaja za vsak \(x\), velja celotna formula v vsaki interpretaciji.</p><p><strong>Primer pravilne interpretacije.</strong> Na \(\mathbb Z\) naj \(P(a,b)\) pomeni \(a\lt b\). Formula velja z izbiro \(y=x\), saj je \(x\lt x\Rightarrow x\lt x\) resnična implikacija z napačnim antecedensom.</p><p><strong>Sklep za izpit.</strong> V PDF-ju je očitno tiskarska napaka ali izpuščen dodatni pogoj, na primer \(y\ne x\). Matematično pravilen odgovor je kratek dokaz splošne veljavnosti in jasno opozorilo, ne izmišljena »neresnična interpretacija«.</p>`,
      hint: H`Pri \(\exists y\) izberi \(y=x\).`,
      rubric: ["Prepoznana je izbira y=x.", "Implikacija A⇒A je tavtologija.", "Pojasnjena je napaka zahteve."],
      difficulty: 3, points: 10,
      tags: ["uradni teorijski izpit", "napaka v viru", "interpretacija", "splošna veljavnost"]
    },
    {
      id: "official-zbirka-binom-definicija",
      canonicalId: "cc-o03",
      topic: "izbori-binomi",
      group: "kombinatorika",
      official: true,
      source: { sourceId: "teorija-zbirka", page: "5" },
      prompt: H`Definiraj \(\binom nk\) in navedi rekurzivno zvezo.`,
      answer: H`<p><strong>Definicija.</strong> Za \(n\in\mathbb N_0\) in \(0\le k\le n\) je \(\binom nk\) število \(k\)-elementnih podmnožic poljubne \(n\)-elementne množice. Robni vrednosti sta \(\binom n0=\binom nn=1\), ker obstajata natanko prazni izbor in izbor vseh elementov.</p><p><strong>Rekurzivna zveza.</strong> Za \(n\ge1\) in \(1\le k\le n-1\) velja</p><div class="formula-panel">\[\binom nk=\binom{n-1}k+\binom{n-1}{k-1}.\]</div><p><strong>Utemeljitev.</strong> Izberemo poseben element \(a\). \(k\)-elementna podmnožica ga bodisi ne vsebuje — takih je \(\binom{n-1}k\) — bodisi ga vsebuje in moramo iz preostalih izbrati še \(k-1\) elementov — takih je \(\binom{n-1}{k-1}\). Primera sta disjunktna in izčrpna.</p><p>Če se dogovorimo, da je \(\binom nk=0\) za \(k&lt;0\) ali \(k&gt;n\), rekurzija smiselno velja tudi na robu. Sama rekurzija brez začetnih vrednosti še ne določi celotne tabele.</p>`,
      hint: "Rekurziji dodaj začetne vrednosti.",
      rubric: ["Definicija je kombinatorična.", "Robni vrednosti sta navedeni.", "Rekurzija je pravilna."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "binomski koeficient", "rekurzija"]
    },
    {
      id: "official-zbirka-barvanje-brooks",
      canonicalId: "gr-o31",
      topic: "barvanje-izomorfnost",
      group: "grafi",
      official: true,
      source: { sourceId: "teorija-zbirka", page: "6" },
      prompt: "Kdaj je barvanje pravilno? Kaj je kromatično število? Natančno navedi Brooksov izrek.",
      answer: H`<p><strong>Pravilno barvanje.</strong> Pravilno \(k\)-barvanje enostavnega grafa \(G\) je preslikava \(c:V(G)\to\{1,\ldots,k\}\), za katero iz \(uv\in E(G)\) sledi \(c(u)\ne c(v)\). Barve ni treba uporabiti vseh.</p><p><strong>Kromatično število.</strong> \(\chi(G)\) je najmanjši \(k\), za katerega obstaja pravilno \(k\)-barvanje. Za dokaz enakosti \(\chi(G)=k\) zato potrebujemo dve ločeni stvari: konkretno \(k\)-barvanje za zgornjo mejo in razlog, zakaj \(k-1\) barv ne zadošča, za spodnjo mejo.</p><p><strong>Brooksov izrek.</strong> Če je \(G\) povezan enostaven graf, ki ni poln graf in ni lih cikel, potem</p><div class="formula-panel">\[\chi(G)\le\Delta(G).\]</div><p>Izjemi sta res potrebni: \(\chi(K_n)=n=\Delta(K_n)+1\), za lih cikel pa \(\chi(C_{2r+1})=3=\Delta+1\). Pri nepovezanem grafu barvamo vsako komponento posebej in velja \(\chi(G)=\max_i\chi(G_i)\).</p><p><strong>Tipična napaka.</strong> Brooks ne trdi, da vedno velja enakost \(\chi(G)=\Delta(G)\), temveč samo zgornja meja, in ne vključuje obeh navedenih izjem.</p>`,
      hint: "Ne pozabi obeh izjem in predpostavk.",
      rubric: ["Pravilno barvanje je definirano.", "χ je minimum.", "Brooks je popoln."],
      difficulty: 2, points: 10,
      tags: ["uradni teorijski izpit", "barvanje", "kromatično število", "Brooks"]
    }
  ];

  window.ADM_MODULE_THEORY_EXAMS = {
    topics: [],
    flashcards: [],
    quiz: [],
    questions,
    exercises: []
  };
})();
