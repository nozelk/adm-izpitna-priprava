(() => {
  "use strict";

  const H = String.raw;
  const topics = [
    {
      id: "deljivost-evklid",
      number: 7,
      group: "stevila-algebra",
      title: "Deljivost, praštevila in Evklidov algoritem",
      short: "Od prafaktorizacije in največjega skupnega delitelja do Bézoutove identitete ter vseh rešitev diofantske enačbe.",
      accent: "#74d9ec",
      minutes: 80,
      importance: "zelo visoka",
      sources: ["stevila-algebra", "stevila-razsirjeno"],
      examNote: "Strogo po teoretičnih zapiskih: definicije deljivosti, gcd/lcm in praštevila, izreki o prafaktorizaciji, diofantskih enačbah ter dokaz pravilnosti razširjenega Evklidovega algoritma.",
      outcomes: [
        "natančno uporabljati definicijo deljivosti tudi pri ničli in negativnih številih",
        "iz prafaktorizacije izračunati gcd in lcm ter dokazati zvezo med njima",
        "izvesti navadni in razširjeni Evklidov algoritem",
        "določiti rešljivost linearne diofantske enačbe in zapisati vse rešitve"
      ],
      sections: [
        {
          id: "deljivost-def",
          kind: "definition",
          label: "Definicija",
          title: "Deljivost je eksistenčna trditev",
          html: H`
            <p>Za celi števili \(a,b\) pravimo, da <strong>\(a\) deli \(b\)</strong>, če obstaja \(k\in\mathbb Z\), da je \(b=ak\). Pišemo \(a\mid b\). Če takega \(k\) ni, pišemo \(a\nmid b\).</p>
            <div class="definition-grid">
              <div class="mini-card"><strong>Vedno velja</strong><p>\(1\mid b\), \((-1)\mid b\), \(a\mid0\), \(a\mid a\).</p></div>
              <div class="mini-card"><strong>Pri ničli</strong><p>\(0\mid b\) velja natanko za \(b=0\). Izraz \(b/0\) ni definiran.</p></div>
            </div>
            <p>Če \(a\mid b\) in \(a\mid c\), potem \(a\mid (ub+vc)\) za poljubna \(u,v\in\mathbb Z\). To dejstvo je srce Bézoutove identitete.</p>
            <blockquote>Protiprimer krajšanju: iz \(6\mid 2\cdot3\) ne sledi niti \(6\mid2\) niti \(6\mid3\). Za sklep iz \(a\mid bc\) na \(a\mid c\) potrebujemo dodatni pogoj \(\gcd(a,b)=1\).</blockquote>`
        },
        {
          id: "deljivost-lastnosti",
          kind: "proof",
          label: "Trditev 5.2 / 9.2",
          title: "Refleksivnost, tranzitivnost in linearne kombinacije",
          html: H`
            <p>Relacija deljivosti na celih številih je refleksivna, saj je \(a=a\cdot1\), in tranzitivna:</p>
            <div class="proof-steps">
              <div class="proof-step"><p>Če \(r\mid m\), je \(m=kr\) za neki \(k\in\mathbb Z\).</p></div>
              <div class="proof-step"><p>Če \(m\mid n\), je \(n=\ell m\) za neki \(\ell\in\mathbb Z\).</p></div>
              <div class="proof-step"><p>Zato je \(n=\ell kr\), torej \(r\mid n\).</p></div>
            </div>
            <p>Če \(a\mid b\) in \(a\mid c\), potem \(a\mid(ub+vc)\) za vse \(u,v\in\mathbb Z\), ker iz \(b=ak,c=a\ell\) sledi \(ub+vc=a(uk+v\ell)\).</p>
            <p>Deljivost na \(\mathbb Z\) ni antisimetrična: \(2\mid-2\) in \(-2\mid2\), vendar \(2\ne-2\). Na \(\mathbb N\) pa je antisimetrična in zato delna urejenost.</p>`
        },
        {
          id: "gcd-lcm",
          kind: "definition",
          label: "Osnovna pojma",
          title: "Največji skupni delitelj in najmanjši skupni večkratnik",
          html: H`
            <p>Za \((a,b)\ne(0,0)\) je \(\gcd(a,b)\) največje pozitivno celo število, ki deli oba. Števili sta <strong>tuji</strong>, če je \(\gcd(a,b)=1\). \(\operatorname{lcm}(a,b)\) je najmanjši pozitivni skupni večkratnik neničelnih \(a,b\).</p>
            <div class="formula-panel">\[\gcd(a,b)\operatorname{lcm}(a,b)=|ab|.\]</div>
            <p>Pri prafaktorizacijah vzamemo za gcd minimum, za lcm maksimum eksponentov. Za \(a,b>0\), če je</p>
            <div class="formula-panel">\[a=\prod p_i^{\alpha_i},\qquad b=\prod p_i^{\beta_i},\]</div>
            <p>potem \(\gcd(a,b)=\prod p_i^{\min(\alpha_i,\beta_i)}\) in \(\operatorname{lcm}(a,b)=\prod p_i^{\max(\alpha_i,\beta_i)}\).</p>`
        },
        {
          id: "prastevila",
          kind: "theorem",
          label: "Temeljni izreki",
          title: "Praštevila in osnovni izrek aritmetike",
          html: H`
            <p><strong>Praštevilo</strong> je naravno število \(p>1\), katerega pozitivna delitelja sta samo 1 in \(p\). Število 1 ni praštevilo.</p>
            <p><strong>Osnovni izrek aritmetike.</strong> Vsako naravno število \(n>1\) lahko zapišemo kot produkt praštevil; ta zapis je do vrstnega reda faktorjev enoličen.</p>
            <p><strong>Evklidova lema.</strong> Če je \(p\) praštevilo in \(p\mid ab\), potem \(p\mid a\) ali \(p\mid b\). Splošneje: če \(\gcd(a,b)=1\) in \(a\mid bc\), potem \(a\mid c\).</p>
            <p><strong>Dokaz obstoja razcepa.</strong> Uporabimo močno indukcijo po \(n\). Če je \(n\) praštevilo, je že sam iskani produkt. Če je sestavljen, je \(n=ab\) za \(1<a,b<n\); po indukcijski predpostavki se \(a\) in \(b\) razcepita na praštevila, zato se tudi \(n\).</p>
            <p><strong>Dokaz enoličnosti.</strong> Naj bo \(p_1\cdots p_r=q_1\cdots q_s\). Po Evklidovi lemi \(p_1\) deli neki \(q_j\); ker sta obe števili praštevili, je \(p_1=q_j\). Ta faktor pokrajšamo in postopek ponovimo. Indukcija po številu faktorjev pokaže, da sta seznama praštevil enaka do vrstnega reda.</p>`
        },
        {
          id: "prafaktorizacija-posledice",
          kind: "theorem",
          label: "Trditve 5.4–5.11",
          title: "Celoten paket posledic prafaktorizacije",
          html: H`
            <p><strong>Obstoj praštevilskega delitelja.</strong> Vsako naravno število \(n>1\) je deljivo z vsaj enim praštevilom. Dokaz z močno indukcijo: če je \(n\) praštevilo, deli samo sebe; sicer ima pravi delitelj \(m\), \(1<m<n\), ki ima po indukciji praštevilski delitelj \(p\), tranzitivnost pa da \(p\mid n\).</p>
            <p>Če sta \(m=\prod p_i^{\alpha_i}\) in \(n=\prod p_i^{\beta_i}\), potem</p>
            <div class="formula-panel">\[m\mid n\iff \alpha_i\le\beta_i\ \text{za vsak }i.\]</div>
            <p>Od tod sledijo minimumi in maksimumi eksponentov za gcd in lcm ter</p>
            <div class="formula-panel">\[\gcd(m,n)\operatorname{lcm}(m,n)=mn\qquad(m,n\in\mathbb N).\]</div>
            <p><strong>Evklidova lema v zapiskih.</strong> Če je \(\gcd(a,b)=1\) in \(a\mid bc\), potem \(a\mid c\). Iz Bézouta \(ax+by=1\) po množenju s \(c\) dobimo \(acx+bcy=c\); oba člena na levi deli \(a\), zato \(a\mid c\).</p>
            <p>Če je \(c\ne0\) skupni delitelj \(a,b\), velja \(\gcd(a/c,b/c)=\gcd(a,b)/|c|\). Posebej sta \(a/d\) in \(b/d\) tuja za \(d=\gcd(a,b)\).</p>`
        },
        {
          id: "neskoncno-prastevil",
          kind: "proof",
          label: "Klasičen dokaz",
          title: "Praštevili se nikoli ne končajo",
          html: H`
            <p>Predpostavimo, da so vsa praštevila \(p_1,\ldots,p_k\). Obravnavajmo \(N=p_1p_2\cdots p_k+1\).</p>
            <div class="proof-steps">
              <div class="proof-step"><p>Ker je \(N>1\), ima neki praštevilski delitelj \(q\).</p></div>
              <div class="proof-step"><p>Po predpostavki je \(q=p_i\) za neki \(i\).</p></div>
              <div class="proof-step"><p>Toda pri deljenju \(N\) s katerimkoli \(p_i\) ostane 1, zato noben \(p_i\) ne deli \(N\).</p></div>
              <div class="proof-step"><p>Protislovje pokaže, da končnega seznama vseh praštevil ni.</p></div>
            </div>
            <div class="qed">□</div>
            <blockquote>Dokaz ne trdi, da je produkt vseh znanih praštevil plus 1 vedno praštevilo; trdi le, da ima nov praštevilski delitelj.</blockquote>`
        },
        {
          id: "deljenje-ostanek",
          kind: "theorem",
          label: "Izrek o deljenju",
          title: "Količnik in ostanek",
          html: H`
            <p>Za \(a\in\mathbb Z\) in \(b\in\mathbb Z\setminus\{0\}\) obstajata enolični celi števili \(q,r\), da</p>
            <div class="formula-panel">\[a=bq+r,\qquad 0\le r<|b|.\]</div>
            <p><strong>Obstoj.</strong> Za \(d=|b|>0\) vzamemo \(q_0=\lfloor a/d\rfloor\) in \(r=a-dq_0\). Iz lastnosti talne funkcije sledi \(0\le r<d\). Če je \(b>0\), postavimo \(q=q_0\); če je \(b<0\), postavimo \(q=-q_0\). V obeh primerih je \(a=bq+r\).</p>
            <p><strong>Enoličnost.</strong> Če bi bilo tudi \(a=bq'+r'\) z \(0\le r,r'<|b|\), bi veljalo \(b(q-q')=r'-r\). Desna stran ima absolutno vrednost manjšo od \(|b|\), edini njen večkratnik \(b\) pa je zato 0; sledi \(q=q'\) in \(r=r'\).</p>
            <p>Ostanek je osnova Evklidovega algoritma in kongruenc. Ker je \(a-bq=r\), imajo \(a\) in \(b\) natanko iste skupne delitelje kot \(b\) in \(r\), zato</p>
            <div class="formula-panel">\[\gcd(a,b)=\gcd(b,a\bmod b).\]</div>`
        },
        {
          id: "evklid",
          kind: "method",
          label: "Algoritem",
          title: "Evklidov algoritem brez ugibanja deliteljev",
          html: H`
            <ol>
              <li>Večje število deli z manjšim: \(a=bq_1+r_1\).</li>
              <li>Nato deli \(b\) z \(r_1\), potem \(r_1\) z naslednjim ostankom.</li>
              <li>Ponavljaj do ostanka 0.</li>
              <li>Zadnji neničelni ostanek je gcd.</li>
            </ol>
            <div class="formula-panel">\[
              412=4\cdot100+12,\quad100=8\cdot12+4,\quad12=3\cdot4,
              \qquad\gcd(412,100)=4.
            \]</div>
            <p>Algoritem konča, ker ostanki tvorijo strogo padajoče zaporedje nenegativnih celih števil.</p>`
        },
        {
          id: "bezout",
          kind: "theorem",
          label: "Bézoutova identiteta",
          title: "Gcd kot celoštevilska linearna kombinacija",
          html: H`
            <p>Za celi števili \(a,b\), ki nista oba 0, obstajata \(x,y\in\mathbb Z\), da</p>
            <div class="formula-panel">\[ax+by=\gcd(a,b).\]</div>
            <p>Ko enačbe Evklidovega algoritma vstavljamo nazaj, izrazimo zadnji neničelni ostanek kot linearno kombinacijo začetnih števil. Koeficienta \(x,y\) imenujemo Bézoutova koeficienta in nista nujno enolična.</p>
            <p>Posebna posledica: \(\gcd(a,b)=1\) natanko tedaj, ko obstajata \(x,y\in\mathbb Z\) z \(ax+by=1\).</p>`
        },
        {
          id: "razsirjeni-evklid",
          kind: "example",
          label: "Izpeljan primer",
          title: "Razširjeni Evklid za \\(412\\) in \\(100\\)",
          html: H`
            <p>Iz Evklidovih enačb imamo \(4=100-8\cdot12\) in \(12=412-4\cdot100\). Vstavimo:</p>
            <div class="formula-panel">\[
              4=100-8(412-4\cdot100)=-8\cdot412+33\cdot100.
            \]</div>
            <p>Torej sta \(x=-8\), \(y=33\) ena para Bézoutovih koeficientov. Preverjanje z neposrednim vstavljanjem je obvezno in ujame večino napak pri predznakih.</p>
            <blockquote>Za modularni inverz \(a^{-1}\pmod n\) isti postopek izvedemo za \(a\) in \(n\); koeficient ob \(a\) je inverz modulo \(n\), če je gcd enak 1.</blockquote>`
        },
        {
          id: "razsirjeni-evklid-dokaz",
          kind: "proof",
          label: "Trditev 5.13 / 9.13",
          title: "Zakaj razširjeni Evklid res vrne gcd in Bézoutova koeficienta",
          html: H`
            <p>Za neničelni celi števili \(a,b\) algoritem začne s trojicama \((r_0,x_0,y_0)=(a,1,0)\) in \((r_1,x_1,y_1)=(b,0,1)\). Če je \(q_i=r_{i-2}\operatorname{div}r_{i-1}\), definira</p>
            <div class="formula-panel">\[(r_i,x_i,y_i)=(r_{i-2},x_{i-2},y_{i-2})-q_i(r_{i-1},x_{i-1},y_{i-1}).\]</div>
            <p><strong>Invariant.</strong> Za vsak \(i\) velja \(ax_i+by_i=r_i\). Za \(i=0,1\) je očitno; indukcijski korak sledi neposredno iz iste linearne rekurzije za vse tri komponente.</p>
            <p>Ko algoritem doseže \(r_{s+1}=0\), je \(r_s\) zadnji neničelni ostanek. Iz enačb deljenja nazaj sledi, da \(r_s\) deli vse predhodne ostanke, torej tudi \(a,b\). Po invariantu je \(r_s=ax_s+by_s\), zato vsak skupni delitelj \(a,b\) deli \(r_s\). Posledično je \(r_s=\gcd(a,b)\) (pozitivni predstavnik) in hkrati dobimo Bézoutova koeficienta \(x_s,y_s\).</p>`
        },
        {
          id: "diofantska",
          kind: "theorem",
          label: "Kriterij in vse rešitve",
          title: "Linearna diofantska enačba \\(ax+by=c\\)",
          html: H`
            <p>Naj bo \((a,b)\ne(0,0)\). Enačba ima celoštevilsko rešitev natanko tedaj, ko \(d=\gcd(a,b)\) deli \(c\).</p>
            <p><strong>Nujnost:</strong> vsak skupni delitelj \(a,b\) deli vsako linearno kombinacijo \(ax+by\). <strong>Zadostnost:</strong> Bézoutovo enačbo \(au+bv=d\) pomnožimo s \(c/d\).</p>
            <p>Če je \((x_0,y_0)\) ena rešitev, so vse rešitve</p>
            <div class="formula-panel">\[
              x=x_0+\frac bd t,\qquad y=y_0-\frac ad t,qquad t\in\mathbb Z.
            \]</div>
            <p>Za dodatne pogoje \(x,y\ge0\) vstavimo parametrizacijo v neenačbe in določimo dovoljena cela števila \(t\).</p>`
        },
        {
          id: "diofantska-primer",
          kind: "example",
          label: "Cel postopek",
          title: "Reši \\(84x+126y=42\\)",
          html: H`
            <p>\(d=\gcd(84,126)=42\), zato je enačba rešljiva. Ker \(42=126-84\), je posebna rešitev \((x_0,y_0)=(-1,1)\).</p>
            <div class="formula-panel">\[
              x=-1+\frac{126}{42}t=-1+3t,\qquad
              y=1-\frac{84}{42}t=1-2t.
            \]</div>
            <p>Preverjanje: \(84(-1+3t)+126(1-2t)=42\) za vsak \(t\in\mathbb Z\).</p>`
        },
        {
          id: "deljivost-pasti",
          kind: "pitfall",
          label: "Pogoste napake",
          title: "Česa pri deljivosti ne smeš preskočiti",
          html: H`
            <ul>
              <li>Število 1 ni praštevilo.</li>
              <li>Pri \(\gcd(0,0)\) moraš navesti dogovor; standardna definicija največjega pozitivnega skupnega delitelja tu ne deluje.</li>
              <li>Iz \(a\mid bc\) brez tujosti ne smeš krajšati faktorja.</li>
              <li>Pri diofantski enačbi najprej preveri \(d\mid c\), šele nato išči rešitev.</li>
              <li>Splošna rešitev mora imeti parameter in oba pravilno povezana predznaka.</li>
              <li>Bézoutova koeficienta nista gcd; gcd je vrednost linearne kombinacije.</li>
            </ul>`
        },
        {
          id: "deljivost-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Jedro poglavja",
          html: H`
            <p>\(a\mid b\iff b=ak\). Evklid ponavlja \(\gcd(a,b)=\gcd(b,r)\). Razširjeni Evklid da \(ax+by=d\). Enačba \(ax+by=c\) je rešljiva natanko, ko \(d\mid c\), vse rešitve pa so \(x=x_0+(b/d)t\), \(y=y_0-(a/d)t\).</p>`
        }
      ],
      checklist: [
        "Znam obravnavati deljivost z negativnimi števili in ničlo.",
        "Znam navesti osnovni izrek aritmetike in Evklidovo lemo.",
        "Znam dokazati, da je praštevil neskončno mnogo.",
        "Znam izvesti Evklidov algoritem in ga razširiti do Bézoutovih koeficientov.",
        "Znam dokazati kriterij rešljivosti diofantske enačbe.",
        "Znam zapisati in preveriti vse rešitve diofantske enačbe."
      ]
    },
    {
      id: "kongruence-euler",
      number: 8,
      group: "stevila-algebra",
      title: "Kongruence, inverzi, Euler in Fermat",
      short: "Računanje po modulu: kdaj smemo deliti, koliko rešitev ima kongruenca in kako obvladamo velike potence.",
      accent: "#79bff2",
      minutes: 95,
      importance: "zelo visoka",
      sources: ["stevila-algebra", "stevila-razsirjeno", "teorija-zbirka"],
      examNote: "Na teorijskem izpitu sta neposredno vprašani karakterizacija obrnljivih elementov v Z_n in Eulerjeva funkcija; tukaj so dodani vsi pogoji in dokazi iz obeh teoretičnih PDF-jev.",
      outcomes: [
        "kongruenco razložiti kot deljivost in ekvivalenčno relacijo",
        "pravilno krajšati in rešiti linearno kongruenco tudi pri več rešitvah",
        "izračunati Eulerjevo funkcijo ter uporabiti Fermatov in Eulerjev izrek z vsemi pogoji",
        "reševati sisteme po praštevilskem modulu in uporabiti kitajski izrek o ostankih"
      ],
      sections: [
        {
          id: "kongruenca-def",
          kind: "definition",
          label: "Definicija",
          title: "Kaj pomeni \\(a\\equiv b\\pmod n\\)?",
          html: H`
            <p>Za \(n\in\mathbb N\) pišemo \(a\equiv b\pmod n\), če \(n\mid(a-b)\). To je ekvivalenčna relacija na \(\mathbb Z\); pri \(n\ge2\) so njeni razredi množice števil z enakim ostankom pri deljenju z \(n\). Modulo 1 so vsa cela števila kongruentna, zato obstaja le en razred.</p>
            <div class="formula-panel">\[a\equiv b\pmod n\iff a-b=kn\text{ za neki }k\in\mathbb Z.\]</div>
            <p>Kongruence lahko seštevamo, odštevamo, množimo in potenciramo z nenegativnim eksponentom. Pred računanjem smemo števila vedno zamenjati z njihovimi ostanki.</p>`
        },
        {
          id: "kongruenca-relacija-in-operacije",
          kind: "proof",
          label: "Trditve 5.15–5.17",
          title: "Kongruenca je ekvivalenčna relacija in spoštuje računanje",
          html: H`
            <p><strong>Refleksivnost:</strong> \(m\mid(x-x)=0\). <strong>Simetričnost:</strong> iz \(m\mid(y-x)\) sledi \(m\mid(x-y)\). <strong>Tranzitivnost:</strong> če \(m\mid(y-x)\) in \(m\mid(z-y)\), potem \(m\mid[(z-y)+(y-x)]=z-x\).</p>
            <p>Če \(x=qm+r\), \(y=q'm+s\) in \(0\le r,s<m\), potem</p>
            <div class="formula-panel">\[x\equiv y\pmod m\iff r=s\iff x\bmod m=y\bmod m.\]</div>
            <p>Za \(x_1\equiv y_1\) in \(x_2\equiv y_2\pmod m\) velja</p>
            <div class="formula-panel">\[x_1+x_2\equiv y_1+y_2,\qquad x_1x_2\equiv y_1y_2\pmod m.\]</div>
            <p>Pri produktu uporabimo identiteto \(y_1y_2-x_1x_2=y_1(y_2-x_2)+x_2(y_1-x_1)\). Indukcija nato da \(x^r\equiv y^r\pmod m\) za vsak \(r\in\mathbb N_0\).</p>`
        },
        {
          id: "krajsanje",
          kind: "theorem",
          label: "Pozor pri deljenju",
          title: "Krajšanje spremeni modul, če faktor ni obrnljiv",
          html: H`
            <p>Iz \(ca\equiv cb\pmod n\) sledi</p>
            <div class="formula-panel">\[a\equiv b\pmod{n/\gcd(c,n)}.\]</div>
            <p><strong>Dokaz.</strong> Iz \(ca\equiv cb\pmod n\) sledi \(n\mid c(a-b)\). Pišimo \(d=\gcd(c,n)\), \(c=dc'\), \(n=dn'\), kjer sta \(c'\) in \(n'\) tuja. Tedaj \(n'\mid c'(a-b)\), Evklidova lema pa da \(n'\mid(a-b)\). Torej je \(a\equiv b\pmod{n/d}\).</p>
            <p>Če je \(\gcd(c,n)=1\), modul ostane \(n\), saj ima \(c\) modularni inverz. Sicer deljenje brez spremembe modula ni dovoljeno.</p>
            <blockquote>Protiprimer: \(2\cdot1\equiv2\cdot4\pmod6\), ker sta 2 in 8 kongruentna modulo 6, toda \(1\not\equiv4\pmod6\). Po pravilnem krajšanju dobimo le \(1\equiv4\pmod3\).</blockquote>`
        },
        {
          id: "linearne-kongruence",
          kind: "theorem",
          label: "Izpeljana posledica diofantskega izreka",
          title: "Enačba \\(ax\\equiv b\\pmod n\\)",
          html: H`
            <p>Naj bo \(d=\gcd(a,n)\). Kongruenca je rešljiva natanko tedaj, ko \(d\mid b\). Če je rešljiva, ima natanko \(d\) nekongruentnih rešitev modulo \(n\).</p>
            <ol>
              <li>Izračunaj \(d\). Če \(d\nmid b\), končaj: rešitev ni.</li>
              <li>Deli \(a,b,n\) z \(d\): \((a/d)x\equiv b/d\pmod{n/d}\).</li>
              <li>Ker sta \(a/d\) in \(n/d\) tuja, pomnoži z inverzom \((a/d)^{-1}\).</li>
              <li>Osnovno rešitev modulo \(n/d\) dvigni v \(d\) rešitev modulo \(n\).</li>
            </ol>
            <div class="formula-panel">\[x=x_0+j\frac nd,\qquad j=0,1,\ldots,d-1.\]</div>`
        },
        {
          id: "inverz",
          kind: "theorem",
          label: "Ključna ekvivalenca",
          title: "Kdaj ima element modularni inverz?",
          html: H`
            <p>Razred \([a]\in\mathbb Z_n\) je obrnljiv natanko tedaj, ko \(\gcd(a,n)=1\).</p>
            <p>Če \(ax\equiv1\pmod n\), obstaja \(y\) z \(ax+ny=1\), zato vsak skupni delitelj \(a,n\) deli 1 in je največji pozitivni skupni delitelj \(\gcd(a,n)=1\). Obratno Bézoutova identiteta pri gcd 1 poda \(ax+ny=1\), torej \(ax\equiv1\pmod n\).</p>
            <p>Inverz dobimo z razširjenim Evklidovim algoritmom; koeficient ob \(a\) reduciramo modulo \(n\).</p>`
        },
        {
          id: "inverz-primer",
          kind: "example",
          label: "Primer",
          title: "Poišči \\(73^{-1}\\pmod{100}\\)",
          html: H`
            <p>Razširjeni Evklid da</p>
            <div class="formula-panel">\[1=37\cdot73-27\cdot100.\]</div>
            <p>Zato je \(73^{-1}\equiv37\pmod{100}\). Preverjanje: \(73\cdot37=2701\equiv1\pmod{100}\).</p>
            <p>Nasprotno \(20\) nima inverza modulo 100, ker je \(\gcd(20,100)=20\ne1\).</p>`
        },
        {
          id: "phi",
          kind: "theorem",
          label: "Eulerjeva funkcija",
          title: "Koliko ostankov je obrnljivih?",
          html: H`
            <p>Za \(n\ge2\) je \(\varphi(n)\) število celih števil \(a\) z \(1\le a\le n-1\), ki so tuja \(n\); enako je številu obrnljivih elementov v \(\mathbb Z_n\). Dodatno definiramo \(\varphi(1)=1\).</p>
            <div class="formula-panel">\[
              n=\prod_i p_i^{\alpha_i}
              \quad\Longrightarrow\quad
              \varphi(n)=n\prod_{p\mid n}\left(1-\frac1p\right)
              =\prod_i p_i^{\alpha_i-1}(p_i-1).
            \]</div>
            <p>Formula sledi iz vključitev–izključitev: iz \(1,\ldots,n\) odstranimo večkratnike vsakega praštevilskega delitelja \(n\).</p>
            <p><strong>Primer.</strong> \(175=5^2\cdot7\), zato \(\varphi(175)=175(1-1/5)(1-1/7)=120\).</p>`
        },
        {
          id: "phi-izpeljava",
          kind: "proof",
          label: "Trditev 9.21",
          title: "Eulerjeva funkcija: praštevilske potence in multiplikativnost",
          html: H`
            <p>Za praštevilo \(p\) in \(r\ge1\) med števili \(1,\ldots,p^r\) niso tuja \(p^r\) natanko večkratniki \(p\); teh je \(p^{r-1}\). Zato</p>
            <div class="formula-panel">\[\varphi(p^r)=p^r-p^{r-1}=p^{r-1}(p-1).\]</div>
            <p>Če je eden od \(a,b\) enak 1, multiplikativnost sledi neposredno iz \(\varphi(1)=1\). Naj bosta zdaj \(a,b\ge2\) in \(\gcd(a,b)=1\). Kitajski izrek poda bijekcijo med razredi modulo \(ab\) in pari razredov modulo \(a\) in \(b\). Razred je obrnljiv modulo \(ab\) natanko tedaj, ko sta obe komponenti obrnljivi, zato</p>
            <div class="formula-panel">\[\varphi(ab)=\varphi(a)\varphi(b).\]</div>
            <p>Za \(n=\prod_i p_i^{\alpha_i}\) tako dobimo \(\varphi(n)=\prod_i p_i^{\alpha_i-1}(p_i-1)=n\prod_{p\mid n}(1-1/p)\). Po dogovoru je \(\varphi(1)=1\).</p>`
        },
        {
          id: "fermat-euler",
          kind: "theorem",
          label: "Izreka",
          title: "Mali Fermatov in Eulerjev izrek",
          html: H`
            <p><strong>Mali Fermat.</strong> Če je \(p\) praštevilo in \(p\nmid a\), potem \(a^{p-1}\equiv1\pmod p\).</p>
            <p><strong>Euler.</strong> Če je \(\gcd(a,n)=1\), potem \(a^{\varphi(n)}\equiv1\pmod n\).</p>
            <p>Ideja Eulerjevega dokaza: množenje z obrnljivim \(a\) permutira reducirani sistem ostankov. Produkta vseh obrnljivih razredov pred in po množenju sta kongruentna; skupni obrnljivi produkt pokrajšamo in ostane \(a^{\varphi(n)}\equiv1\).</p>
            <blockquote>Pogoj tujosti je nujen. Za \(a=2,n=4\) je \(2^{\varphi(4)}=4\equiv0\), ne 1.</blockquote>`
        },
        {
          id: "fermat-euler-dokaz",
          kind: "proof",
          label: "Izreka 9.22 in 9.23",
          title: "Celoten dokaz Fermatovega in Eulerjevega izreka",
          html: H`
            <p><strong>Fermat.</strong> Če je \(p\) praštevilo in \(p\nmid a\), so razredi \(a,2a,\ldots,(p-1)a\) modulo \(p\) paroma različni: iz \(ia\equiv ja\) zaradi obrnljivosti \(a\) sledi \(i\equiv j\). Torej so le permutacija \(1,\ldots,p-1\). Zmnožimo:</p>
            <div class="formula-panel">\[(p-1)!a^{p-1}\equiv(p-1)!\pmod p.\]</div>
            <p>Ker je \((p-1)!\) obrnljiv modulo \(p\), ga pokrajšamo in dobimo \(a^{p-1}\equiv1\pmod p\).</p>
            <p><strong>Euler.</strong> Naj bodo \(u_1,\ldots,u_{\varphi(n)}\) vsi obrnljivi razredi modulo \(n\). Če je \(\gcd(a,n)=1\), množenje z \(a\) bijektivno permutira te razrede. Zato</p>
            <div class="formula-panel">\[a^{\varphi(n)}u_1\cdots u_{\varphi(n)}\equiv u_1\cdots u_{\varphi(n)}\pmod n.\]</div>
            <p>Produkt obrnljivih elementov je obrnljiv, zato ga smemo pokrajšati in ostane \(a^{\varphi(n)}\equiv1\pmod n\). Fermat je poseben primer, saj je \(\varphi(p)=p-1\).</p>`
        },
        {
          id: "potence",
          kind: "method",
          label: "Izpeljana računska metoda",
          title: "Velike potence in hitro kvadriranje",
          html: H`
            <ol>
              <li>Osnovo reduciraj modulo \(n\).</li>
              <li>Če sta osnova in modul tuja, eksponent reduciraj modulo \(\varphi(n)\) ali \(p-1\) pri praštevilu.</li>
              <li>Za preostali eksponent uporabi binarni zapis in zaporedno kvadriranje.</li>
              <li>Po vsakem množenju reduciraj, da števila ostanejo majhna.</li>
            </ol>
            <p><strong>Primer.</strong> \(2^{100}\pmod{13}\): ker je \(2^{12}\equiv1\), je \(100\equiv4\pmod{12}\), zato \(2^{100}\equiv2^4=16\equiv3\pmod{13}\).</p>
            <p>Če tujosti ni, eksponenta ne reduciraj avtomatsko; uporabi cikel, hitro kvadriranje ali kitajski izrek po prafaktorjih modula.</p>`
        },
        {
          id: "crt",
          kind: "theorem",
          label: "Izpeljano orodje za korak v dokazu RSA",
          title: "Kitajski izrek o ostankih",
          html: H`
            <p>Če so celi moduli \(n_1,\ldots,n_k\ge2\) paroma tuji, ima sistem \(x\equiv a_i\pmod{n_i}\) natanko eno rešitev modulo \(N=n_1\cdots n_k\).</p>
            <p>Konstrukcija: \(N_i=N/n_i\), poiščemo \(y_i=N_i^{-1}\pmod{n_i}\), nato</p>
            <div class="formula-panel">\[x\equiv\sum_{i=1}^k a_iN_iy_i\pmod N.\]</div>
            <p>Vsak člen je enak \(a_i\) modulo svojemu modulu in 0 modulo vsem drugim, zato formula daje obstoj. Če sta \(x,y\) rešitvi, vsak \(n_i\) deli \(x-y\); zaradi paroma tujih modulov njihov produkt \(N\) deli \(x-y\). To dokaže enoličnost rešitvenega razreda modulo \(N\).</p>
            <p>Paroma tujost je bistvena za to obliko konstrukcije, saj zagotovi obstoj vsakega inverza \(N_i^{-1}\pmod{n_i}\).</p>`
        },
        {
          id: "rsa",
          kind: "explanation",
          label: "Uporaba teorije",
          title: "RSA v petih korakih",
          html: H`
            <ol>
              <li>Izberi različni praštevili \(p,q\), postavi \(n=pq\) in \(\varphi(n)=(p-1)(q-1)\).</li>
              <li>Izberi \(e\) z \(\gcd(e,\varphi(n))=1\).</li>
              <li>Izračunaj \(d=e^{-1}\pmod{\varphi(n)}\).</li>
              <li>Sporočilo predstavimo z \(m\), kjer je \(0\le m<n\). Javni ključ je \((n,e)\), šifriranje pa \(c\equiv m^e\pmod n\).</li>
              <li>Zasebni eksponent je \(d\), dešifriranje \(m\equiv c^d\pmod n\).</li>
            </ol>
            <p>Ker je \(ed=1+k\varphi(n)\), za \(\gcd(m,n)=1\) Eulerjev izrek da \(m^{ed}=m(m^{\varphi(n)})^k\equiv m\pmod n\).</p>
            <p><strong>Zakaj deluje tudi, ko \(m\) ni tuje \(n\)?</strong> Modulo \(p\): če \(p\mid m\), sta \(m^{ed}\) in \(m\) oba 0; sicer Fermat in dejstvo \((p-1)\mid\varphi(n)\) dasta \(m^{ed}\equiv m\pmod p\). Enako velja modulo \(q\). Ker sta \(p,q\) tuja, CRT da \(m^{ed}\equiv m\pmod{pq}\).</p>
            <p>Javni ključ je par \((n,e)\), privatni ključ pa \(d\). Varnost opisanega sistema temelji na tem, da je pri dovolj velikih praštevilih iz javnega \(n\) praktično težko rekonstruirati \(p,q\) in s tem \(\varphi(n)\).</p>`
        },
        {
          id: "kongruence-pasti",
          kind: "pitfall",
          label: "Pogoste napake",
          title: "Modularna aritmetika ni navadno ulomkarsko računanje",
          html: H`
            <ul>
              <li>Deljenje pomeni množenje z inverzom; ta obstaja samo pri gcd 1.</li>
              <li>Linearna kongruenca lahko ima 0, 1 ali več rešitev; preveri \(d=\gcd(a,n)\).</li>
              <li>Euler/Fermat potrebujeta tujost osnove in modula.</li>
              <li>Pri CRT moraš preveriti paroma tujost modulov oziroma uporabiti združljivost ostankov za netuje module.</li>
              <li>Rešitev zapiši kot kongruenčni razred, ne kot eno samo celo število.</li>
            </ul>`
        },
        {
          id: "kongruence-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Jedro poglavja",
          html: H`
            <p>\(a\equiv b\pmod n\iff n\mid(a-b)\). Inverz obstaja iff gcd = 1. Za \(ax\equiv b\) najprej \(d=\gcd(a,n)\): če \(d\nmid b\), ni rešitve; sicer jih je \(d\). \(\varphi(n)=n\prod_{p\mid n}(1-1/p)\). Euler: \(a^{\varphi(n)}\equiv1\) samo ob tujosti.</p>`
        }
      ],
      checklist: [
        "Kongruenco znam prevesti v trditev o deljivosti.",
        "Pri krajšanju preverim gcd in po potrebi spremenim modul.",
        "Znam najti modularni inverz z razširjenim Evklidom.",
        "Znam določiti obstoj in vseh d rešitev linearne kongruence.",
        "Znam izračunati φ(n) iz prafaktorizacije.",
        "Fermatov in Eulerjev izrek navedem z vsemi pogoji.",
        "Znam navesti, konstruirati in dokazati kitajski izrek o ostankih.",
        "Znam uporabiti hitro kvadriranje in CRT."
      ]
    },
    {
      id: "algebrske-strukture",
      number: 9,
      group: "stevila-algebra",
      title: "Algebrske strukture",
      short: "Operacije, polgrupe, monoidi, grupe, kolobarji in polja — z dokazi enoličnosti ter strukturo \\(\\mathbb Z_n\\).",
      accent: "#b9a0ff",
      minutes: 80,
      importance: "visoka na teoriji",
      sources: ["stevila-algebra", "teorija-2021", "teorija-zbirka"],
      examNote: "Teorijski izpiti izrecno preverjajo definicijo in enoličnost enote, definicijo in enoličnost inverza ter razliko med aditivnim in multiplikativnim inverzom v Z_7.",
      outcomes: [
        "preveriti, ali predpis sploh določa zaprto binarno operacijo",
        "ločiti polgrupo, monoid, grupo, kolobar, obseg in polje",
        "dokazati enoličnost enote in inverza ter formulo za inverz produkta",
        "opisati obrnljive elemente in delitelje nič v Z_n ter osnove kolobarja polinomov"
      ],
      sections: [
        {
          id: "operacija",
          kind: "definition",
          label: "Začetek",
          title: "Binarna operacija vključuje zaprtost",
          html: H`
            <p>Binarna operacija na množici \(A\) je preslikava \(*:A\times A\to A\). Zato mora biti rezultat \(a*b\) za vsak par \(a,b\in A\) spet v \(A\).</p>
            <div class="definition-grid">
              <div class="mini-card"><strong>Asociativnost</strong><p>\((a*b)*c=a*(b*c)\) za vse \(a,b,c\).</p></div>
              <div class="mini-card"><strong>Komutativnost</strong><p>\(a*b=b*a\) za vse \(a,b\).</p></div>
            </div>
            <p>Odštevanje na \(\mathbb Z\) je zaprto, vendar ni asociativno. Deljenje ni operacija na \(\mathbb Z\), ker rezultat ni vedno celo število in deljenje z nič ni definirano.</p>`
        },
        {
          id: "zaprtost-podmnozice",
          kind: "definition",
          label: "Pred aksiomi",
          title: "Zaprtost podmnožice in neodvisnost lastnosti",
          html: H`
            <p>Če je \(*\) operacija na \(M\) in \(N\subseteq M\), je \(N\) <strong>zaprta</strong> za \(*\), kadar iz \(a,b\in N\) vedno sledi \(a*b\in N\). Šele tedaj lahko omejitev istega predpisa obravnavamo kot operacijo na \(N\).</p>
            <p>Asociativnost in komutativnost sta ločeni lastnosti. Matrično množenje je asociativno, ne pa komutativno. Odštevanje na \(\mathbb Z\) ni ne asociativno ne komutativno, čeprav je zaprto. Operacija \(\max\) na \(\mathbb R\) je asociativna in komutativna, vendar na vsej \(\mathbb R\) nima enote.</p>
            <blockquote>Za protiprimer asociativnosti zadošča ena trojica \(a,b,c\) z \((a*b)*c\ne a*(b*c)\); za dokaz asociativnosti pa mora enakost veljati za vse trojice.</blockquote>`
        },
        {
          id: "hierarhija",
          kind: "definition",
          label: "Hierarhija",
          title: "Polgrupa → monoid → grupa",
          html: H`
            <table class="data-table">
              <thead><tr><th>Struktura</th><th>Zahteve</th><th>Primer</th></tr></thead>
              <tbody>
                <tr><td>polgrupa</td><td>zaprta asociativna operacija</td><td>\((\mathbb N_{>0},+)\)</td></tr>
                <tr><td>monoid</td><td>polgrupa + enota</td><td>\((\mathbb N_0,+,0)\)</td></tr>
                <tr><td>grupa</td><td>monoid + inverz vsakega elementa</td><td>\((\mathbb Z,+,0)\)</td></tr>
                <tr><td>Abelova grupa</td><td>grupa + komutativnost</td><td>\((\mathbb R^\times,\cdot,1)\)</td></tr>
              </tbody>
            </table>
            <p>Množica neničelnih realnih števil je grupa za množenje; vsa realna števila niso, ker 0 nima multiplikativnega inverza.</p>`
        },
        {
          id: "enota",
          kind: "definition",
          label: "Definicija",
          title: "Enota in inverz sta dvostranska pojma",
          html: H`
            <p><strong>Enota</strong> za operacijo \(*\) je element \(e\), za katerega \(e*a=a*e=a\) za vsak \(a\in A\).</p>
            <p>Element \(b\) je <strong>inverz</strong> elementa \(a\), če \(a*b=b*a=e\). Pri komutativni operaciji zadošča preveriti eno enakost; brez komutativnosti levi in desni inverz v definiciji potrebujemo oba.</p>
            <p>Pri seštevanju v \(\mathbb Z_7\) je inverz 4 enak 3, ker \(4+3=0\). Pri množenju je inverz 4 enak 2, ker \(4\cdot2=1\) v \(\mathbb Z_7\).</p>`
        },
        {
          id: "enota-enolicna",
          kind: "proof",
          label: "Teorijski dokaz",
          title: "Enota je enolična",
          html: H`
            <p>Naj bosta \(e\) in \(f\) enoti iste operacije.</p>
            <div class="proof-steps">
              <div class="proof-step"><p>Ker je \(e\) leva enota, je \(e*f=f\).</p></div>
              <div class="proof-step"><p>Ker je \(f\) desna enota, je \(e*f=e\).</p></div>
              <div class="proof-step"><p>Zato je \(e=f\).</p></div>
            </div>
            <div class="qed">□</div>
            <p>Za ta dokaz ne potrebujemo asociativnosti, samo dvostransko definicijo enote.</p>`
        },
        {
          id: "inverz-enolicen",
          kind: "proof",
          label: "Teorijski dokaz",
          title: "Pri asociativni operaciji je inverz enoličen",
          html: H`
            <p>Naj bosta \(b,c\) inverza elementa \(a\). Potem:</p>
            <div class="formula-panel">\[b=b*e=b*(a*c)=(b*a)*c=e*c=c.\]</div>
            <p>V sredini smo nujno uporabili asociativnost. Zato je ta pogoj v izreku bistven.</p>
            <p>Podobno za obrnljiva \(a,b\) velja \((a*b)^{-1}=b^{-1}*a^{-1}\); vrstni red se obrne, ker</p>
            <div class="formula-panel">\[
              (a*b)*(b^{-1}*a^{-1})=a*(b*b^{-1})*a^{-1}=e,
              \qquad
              (b^{-1}*a^{-1})*(a*b)=b^{-1}*(a^{-1}*a)*b=e.
            \]</div>
            <p>Preveriti moramo oba produkta, ker je inverz po definiciji dvostranski.</p>`
        },
        {
          id: "grupa-enot",
          kind: "proof",
          label: "Lemi 6.5 in 6.8",
          title: "Obrnljivi elementi monoida sami tvorijo grupo",
          html: H`
            <p>Naj bo \(M\) monoid in \(M^*\) množica njegovih obrnljivih elementov. Če sta \(a,b\in M^*\), je tudi \(ab\) obrnljiv, ker</p>
            <div class="formula-panel">\[(ab)(b^{-1}a^{-1})=e=(b^{-1}a^{-1})(ab).\]</div>
            <p>Torej je \(M^*\) zaprta. Asociativnost podeduje od \(M\), enota \(e\) je sama obrnljiva, inverz elementa iz \(M^*\) pa je po definiciji spet v \(M^*\). Zato je \((M^*,\cdot)\) grupa.</p>
            <p><strong>Primeri.</strong> Obrnljiva elementa v \((\mathbb Z,\cdot)\) sta \(1\) in \(-1\). Obrnljivi elementi matričnega monoida so natanko obrnljive matrike. Obrnljivi elementi v \(\mathbb Z_n\) so razredi, tuji \(n\).</p>`
        },
        {
          id: "vsak-sam-sebi-inverz",
          kind: "example",
          label: "Vprašanje s teorijskega izpita",
          title: "Grupa, v kateri je vsak element sam sebi inverz",
          html: H`
            <p>Najpreprostejši zgled je \((\mathbb Z_2,+)\). Enota je 0, \(-0=0\), za 1 pa velja \(1+1=0\), zato je tudi 1 svoj inverz.</p>
            <p>Splošneje je \((\mathcal P(X),\triangle)\) Abelova grupa za simetrično razliko. Enota je \(\varnothing\) in za vsako podmnožico \(A\) velja \(A\triangle A=\varnothing\), zato je vsak element svoj inverz.</p>
            <p>Če je v grupi vsak element sam sebi inverz, je grupa nujno Abelova: \(ab=(ab)^{-1}=b^{-1}a^{-1}=ba\).</p>`
        },
        {
          id: "kolobar",
          kind: "definition",
          label: "Dve operaciji",
          title: "Kolobar, komutativen kolobar in polje",
          html: H`
            <p><strong>Kolobar</strong> \((R,+,\cdot)\) ima Abelovo grupo \((R,+)\), asociativno množenje in obe distributivnosti množenja glede na seštevanje. V gradivu praviloma posebej povemo, ali ima multiplikativno enoto in ali je množenje komutativno.</p>
            <p><strong>Obseg oziroma delitveni kolobar</strong> je kolobar z enoto in vsaj dvema elementoma (torej \(0\ne1\)), v katerem ima vsak neničelni element multiplikativni inverz. Če je množenje še komutativno, dobimo <strong>polje</strong>.</p>
            <p>\(\mathbb Z\) je komutativen kolobar z enoto, ne pa polje. \(\mathbb Q,\mathbb R,\mathbb C\) so polja. Kvadratne matrike tvorijo nekomutativen kolobar z enoto.</p>`
        },
        {
          id: "distributivnost-definicija",
          kind: "definition",
          label: "Dve operaciji",
          title: "Leva in desna distributivnost",
          html: H`
            <p>Operacija \(\cdot\) je distributivna proti \(+\), če za vse \(a,b,c\) veljata <strong>obe</strong> identiteti</p>
            <div class="formula-panel">\[(a+b)c=ac+bc,\qquad c(a+b)=ca+cb.\]</div>
            <p>V komutativnem množenju ena sledi iz druge, v splošnem kolobarju pa moramo zahtevati obe. Presek in unija množic sta zanimiv primer: vsaka od njiju je distributivna proti drugi.</p>
            <p>Iz aksiomov kolobarja sledijo tudi \((-a)b=-(ab)=a(-b)\) in \((-a)(-b)=ab\); dokazi uporabijo distributivnost, \(a0=0\) in enoličnost aditivnega inverza.</p>`
        },
        {
          id: "nic-v-kolobarju",
          kind: "proof",
          label: "Osnovna lema",
          title: "V vsakem kolobarju je \\(a\\cdot0=0\\)",
          html: H`
            <p>Po distributivnosti:</p>
            <div class="formula-panel">\[a\cdot0=a(0+0)=a\cdot0+a\cdot0.\]</div>
            <p>V aditivni grupi lahko na obeh straneh prištejemo aditivni inverz elementa \(a\cdot0\), zato ostane \(0=a\cdot0\). Enako dokažemo \(0\cdot a=0\).</p>
            <blockquote>Ne »delimo z \(a\)«: a morda ni obrnljiv. Dokaz uporablja samo grupno krajšanje pri seštevanju.</blockquote>`
        },
        {
          id: "zn-kolobar",
          kind: "theorem",
          label: "Osrednji primer",
          title: "Kolobar ostankov \\(\\mathbb Z_n\\)",
          html: H`
            <p>Za \(n\ge2\) seštevanje in množenje razredov definiramo z \([a]+[b]=[a+b]\) in \([a][b]=[ab]\). Operaciji sta dobro definirani, ker kongruentne predstavnike lahko seštevamo in množimo.</p>
            <p>\(\mathbb Z_n\) je komutativen kolobar z enoto \([1]\). Njegovi obrnljivi elementi so natanko razredi \([a]\) z \(\gcd(a,n)=1\), zato jih je \(\varphi(n)\).</p>
            <p>\(\mathbb Z_n\) je polje natanko tedaj, ko je \(n\) praštevilo.</p>`
        },
        {
          id: "zn-polje-dokaz",
          kind: "proof",
          label: "Pomembna karakterizacija",
          title: "Dokaz: \\(\\mathbb Z_n\\) je polje natanko za praštevilski \\(n\\)",
          html: H`
            <p>Naj bo najprej \(n=p\) praštevilo. Vsak neničelni razred \([a]\), \(1\le a<p\), je tuj \(p\), zato ima po izreku o obrnljivosti inverz. Ker je \(\mathbb Z_p\) komutativen kolobar z enoto in \(0\ne1\), je polje.</p>
            <p>Če je \(n\) sestavljen, pišimo \(n=rs\) z \(1<r,s<n\). Razreda \([r]\) in \([s]\) sta neničelna, njun produkt pa je \([rs]=[n]=[0]\). Tako ima \(\mathbb Z_n\) delitelja nič. Delitelj nič ne more biti obrnljiv: iz \(ab=0\) in obrnljivosti \(a\) bi sledilo \(b=0\). Zato \(\mathbb Z_n\) ni polje.</p>`
        },
        {
          id: "delitelji-nic",
          kind: "definition",
          label: "Kaj odpove v sestavljenem modulu",
          title: "Delitelji nič",
          html: H`
            <p>Neničelni element \(a\) kolobarja je <strong>delitelj nič</strong>, če obstaja neničelni \(b\) z \(ab=0\) ali \(ba=0\).</p>
            <p>V \(\mathbb Z_n\) je neničelni \([a]\) delitelj nič natanko tedaj, ko \(\gcd(a,n)>1\). Na primer v \(\mathbb Z_8\) je \([2][4]=[0]\).</p>
            <p><strong>Dokaz kriterija.</strong> Če je \(d=\gcd(a,n)>1\), pišemo \(a=da'\) in \(n=dn'\). Ker je \([a]\ne[0]\), je \(1\le n'<n\), zato je \([n']\ne[0]\), vendar \([a][n']=[a'n]=[0]\). Obratno je pri \(\gcd(a,n)=1\) razred \([a]\) obrnljiv; obrnljiv element ne more biti delitelj nič, saj iz \([a][b]=[0]\) po množenju z \([a]^{-1}\) sledi \([b]=[0]\).</p>
            <p>V polju deliteljev nič ni: če je \(ab=0\) in \(a\ne0\), pomnožimo z \(a^{-1}\) in dobimo \(b=0\).</p>`
        },
        {
          id: "tabeli-z7-z6",
          kind: "example",
          label: "Zgleda iz PDF-ja",
          title: "Kaj pokažeta množilni tabeli \\(\\mathbb Z_7\\) in \\(\\mathbb Z_6\\)",
          html: H`
            <ul>
              <li>V \(\mathbb Z_7\) se v vrstici vsakega neničelnega elementa pojavi 1, zato je vsak tak element obrnljiv.</li>
              <li>Inverzi v \(\mathbb Z_7\) so \(1^{-1}=1\), \(2^{-1}=4\), \(3^{-1}=5\), \(4^{-1}=2\), \(5^{-1}=3\), \(6^{-1}=6\).</li>
              <li>V \(\mathbb Z_6\) sta obrnljiva samo 1 in 5; velja \(5^{-1}=5\).</li>
              <li>V \(\mathbb Z_6\) dobimo tudi produkta \(2\cdot3=0\) in \(3\cdot4=0\), zato se pokažejo neničelni delitelji nič.</li>
            </ul>
            <p>Tabeli nazorno potrdita splošni izrek: \([a]\) je obrnljiv v \(\mathbb Z_n\) natanko tedaj, ko je \(\gcd(a,n)=1\).</p>`
        },
        {
          id: "polinomi",
          kind: "theorem",
          label: "Kolobar polinomov",
          title: "Stopnja in deljenje polinomov",
          html: H`
            <p>Naj bo \(K\) komutativen kolobar z enoto. \(K[X]\) je množica polinomov s koeficienti v \(K\). Uporabljamo dogovor \(\deg0=-\infty\); tedaj za poljubna \(p,q\) velja</p>
            <div class="formula-panel">\[\deg(p+q)\le\max(\deg p,\deg q),\qquad \deg(pq)\le\deg p+\deg q.\]</div>
            <p>Če \(K\) nima deliteljev nič, je pri produktu enakost. Če je \(K\) polje in \(q\ne0\), obstajata enolična \(s,r\), da</p>
            <div class="formula-panel">\[p=sq+r,\qquad r=0\text{ ali }\deg r<\deg q.\]</div>
            <p>Zato nad poljem deluje Evklidov algoritem tudi za polinome.</p>`
        },
        {
          id: "polinomi-podrobno",
          kind: "definition",
          label: "Definicije iz razdelka 6.7",
          title: "Polinom, vodilni koeficient, deljivost in nerazcepnost",
          html: H`
            <p>Polinom nad komutativnim kolobarjem z enoto \(K\) je formalna končna vsota \(p(X)=a_nX^n+\cdots+a_1X+a_0\). Simbol \(X\) je nedoločenka, ne element \(K\). Če je \(a_n\ne0\), je \(n\) stopnja polinoma in \(a_n\) njegov vodilni koeficient. Polinom je <strong>moničen</strong>, če je vodilni koeficient 1.</p>
            <p>V \(K[X]\) pišemo \(q\mid p\), če obstaja \(s\in K[X]\) s \(p=sq\). Neničeln neobrnljiv polinom \(p\) je <strong>nerazcepen</strong>, če iz \(p=fg\) vedno sledi, da je \(f\) ali \(g\) obrnljiv element kolobarja \(K[X]\). Če je \(K\) polje, je to za nekonstanten \(p\) ekvivalentno trditvi, da ga ni mogoče zapisati kot produkt dveh polinomov pozitivne stopnje.</p>
            <p>Če \(K\) nima deliteljev nič, je \(\deg(pq)=\deg p+\deg q\), ker produkt vodilnih koeficientov ni 0. V kolobarju z delitelji nič lahko stopnja pade: v \(\mathbb Z_4[X]\) je \((2X)(2X)=4X^2=0\).</p>
            <p>Izrek o deljenju zahteva, da je vodilni koeficient delitelja obrnljiv; zlasti velja nad poljem. Če je \(K\) polje, sta kvocient in ostanek enolična, Evklidov algoritem pa poišče gcd polinomov, ki je enoličen do množenja z neničelno konstanto iz \(K\).</p>`
        },
        {
          id: "algebra-protiprimeri",
          kind: "counterexample",
          label: "Aksiomi so neodvisni",
          title: "Primeri, ki ločijo pojme",
          html: H`
            <ul>
              <li>\((\mathbb N_{>0},+)\) je komutativna polgrupa, vendar brez enote, če 0 ni v množici.</li>
              <li>\((\mathbb Z,\cdot)\) je komutativen monoid, ni grupa: 2 nima celoštevilskega inverza.</li>
              <li>Odštevanje na \(\mathbb Z\) ima zaprtost, ni asociativno in nima dvostranske enote.</li>
              <li>Matrično množenje je asociativno z enoto, vendar na splošno ni komutativno.</li>
              <li>\(\mathbb Z_6\) je kolobar z enoto, ni polje: \([2][3]=[0]\).</li>
            </ul>`
        },
        {
          id: "algebra-recap",
          kind: "recap",
          label: "30 sekund",
          title: "Hierarhija brez zamenjav",
          html: H`
            <p>Operacija je zaprta preslikava \(A^2\to A\). Asociativna operacija da polgrupo; enota doda monoid; inverz vsakega elementa grupo; komutativnost Abelovo grupo. Kolobar ima Abelovo seštevanje in distributivno množenje. Polje je netrivialen (\(0\ne1\)) komutativen kolobar z enoto, kjer je vsak neničelni element obrnljiv. Za \(n\ge2\) je \(\mathbb Z_n\) polje iff \(n\) je praštevilo.</p>`
        }
      ],
      checklist: [
        "Pri predpisu operacije najprej preverim zaprtost.",
        "Znam brez pomoči navesti hierarhijo polgrupa–monoid–grupa.",
        "Znam dokazati enoličnost enote in inverza.",
        "Znam pojasniti, zakaj se pri inverzu produkta vrstni red obrne.",
        "Znam navesti aksiome kolobarja in dokazati a·0=0.",
        "Znam opisati obrnljive elemente in delitelje nič v Z_n.",
        "Znam ločiti obseg/delitveni kolobar in polje.",
        "Znam navesti pravila za stopnjo polinomov in deljenje nad poljem."
      ]
    }
  ];

  const flashcards = [
    ["aa-f01","deljivost-evklid","Definicija \\(a\\mid b\\)","Obstaja \\(k\\in\\mathbb Z\\), da je \\(b=ak\\).",true],
    ["aa-f02","deljivost-evklid","Bézoutova identiteta","Za \\((a,b)\\ne(0,0)\\) obstajata \\(x,y\\in\\mathbb Z\\), da je \\(ax+by=\\gcd(a,b)\\).",true],
    ["aa-f03","deljivost-evklid","Kriterij za \\(ax+by=c\\)","Za \\((a,b)\\ne(0,0)\\) je enačba rešljiva natanko tedaj, ko \\(\\gcd(a,b)\\mid c\\).",true],
    ["aa-f04","deljivost-evklid","Vse diofantske rešitve","Za \\((a,b)\\ne(0,0)\\) in \\(d=\\gcd(a,b)\\) velja \\(x=x_0+(b/d)t\\), \\(y=y_0-(a/d)t\\).",true],
    ["aa-f05","deljivost-evklid","Osnovni izrek aritmetike","Vsako n>1 ima do vrstnega reda enoličen razcep na praštevila.",true],
    ["aa-f06","deljivost-evklid","Evklidova lema","Če je gcd(a,b)=1 in a deli bc, potem a deli c.",false],
    ["aa-f07","kongruence-euler","Definicija kongruence","\\(a\\equiv b\\pmod n\\iff n\\mid(a-b)\\).",true],
    ["aa-f08","kongruence-euler","Kriterij modularnega inverza","\\([a]\\) je obrnljiv v \\(\\mathbb Z_n\\) natanko tedaj, ko gcd(a,n)=1.",true],
    ["aa-f09","kongruence-euler","Izpeljana rešljivost \\(ax\\equiv b\\pmod n\\)","Za d=gcd(a,n) je rešljiva iff d deli b; tedaj ima d rešitev modulo n.",true],
    ["aa-f10","kongruence-euler","Eulerjeva funkcija","\\(\\varphi(n)=n\\prod_{p\\mid n}(1-1/p)\\); šteje razrede, obrnljive modulo n.",true],
    ["aa-f11","kongruence-euler","Eulerjev izrek","Če gcd(a,n)=1, potem \\(a^{\\varphi(n)}\\equiv1\\pmod n\\).",true],
    ["aa-f12","kongruence-euler","Mali Fermatov izrek","Če je p praštevilo in p ne deli a, potem \\(a^{p-1}\\equiv1\\pmod p\\).",true],
    ["aa-f13","kongruence-euler","Izpeljani kitajski izrek o ostankih","Za paroma tuje module ima sistem eno rešitev modulo produktu modulov.",false],
    ["aa-f14","algebrske-strukture","Binarna operacija","Preslikava \\(A\\times A\\to A\\); zaprtost je del definicije.",true],
    ["aa-f15","algebrske-strukture","Monoid","Asociativna binarna operacija z dvostransko enoto.",true],
    ["aa-f16","algebrske-strukture","Grupa","Monoid, v katerem ima vsak element dvostranski inverz.",true],
    ["aa-f17","algebrske-strukture","Inverz produkta","\\((ab)^{-1}=b^{-1}a^{-1}\\).",false],
    ["aa-f18","algebrske-strukture","Kdaj je \\(\\mathbb Z_n\\) polje?","Natanko tedaj, ko je n praštevilo.",true],
    ["aa-f19","algebrske-strukture","Delitelj nič","Neničelni a, za katerega obstaja neničelni b z ab=0 ali ba=0.",true],
    ["aa-f20","algebrske-strukture","Polje","Komutativen kolobar z enoto in vsaj dvema elementoma, v katerem je vsak neničelni element obrnljiv.",true],
    ["aa-f21","deljivost-evklid","Izrek o deljenju","Za \\(a\\in\\mathbb Z,b\\ne0\\) sta enolična \\(q,r\\in\\mathbb Z\\) z \\(a=bq+r\\) in \\(0\\le r<|b|\\).",true],
    ["aa-f22","kongruence-euler","Eulerjeva funkcija na praštevilski potenci","Za praštevilo \\(p\\) in \\(r\\ge1\\) velja \\(\\varphi(p^r)=p^r-p^{r-1}=p^{r-1}(p-1)\\).",false],
    ["aa-f23","algebrske-strukture","Polgrupa","Množica z asociativno binarno operacijo.",true],
    ["aa-f24","algebrske-strukture","Kolobar","Aditivno Abelova grupa, multiplikativno polgrupa, množenje pa je levo in desno distributivno proti seštevanju.",true],
    ["aa-f25","algebrske-strukture","Obseg in polje","Obseg ima enoto, \\(0\\ne1\\), in vsak neničelni element obrnljiv; komutativen obseg je polje.",true],
    ["aa-f26","algebrske-strukture","Deljenje polinomov","Nad poljem in za \\(q\\ne0\\) obstajata enolična \\(s,r\\) z \\(p=sq+r\\) ter \\(r=0\\) ali \\(\\deg r<\\deg q\\).",false]
  ].map(([id,topic,front,back,core]) => ({id,topic,front,back,core}));

  const quiz = [
    ["aa-q01","deljivost-evklid","Kaj pomeni \\(0\\mid b\\)?",["Velja za vsak b","Velja natanko za b=0","Nikoli ne velja","Velja za b=1"],1,"Iz b=0·k sledi b=0; za b=0 obstaja poljuben k."],
    ["aa-q02","deljivost-evklid","Kdaj je \\(ax+by=c\\) celoštevilsko rešljiva?",["Vedno","Ko a deli b","Ko gcd(a,b) deli c","Ko je c praštevilo"],2,"Vsaka linearna kombinacija je deljiva z gcd, Bézout pa da zadostnost."],
    ["aa-q03","deljivost-evklid","Kaj vrne razširjeni Evklidov algoritem?",["Samo lcm","gcd in Bézoutova koeficienta","Prafaktorizacijo","Vse delitelje"],1,"Poleg gcd izrazi gcd kot ax+by."],
    ["aa-q04","deljivost-evklid","Katera trditev o številu \\(p_1\\cdots p_k+1\\) je v Evklidovem dokazu pravilna?",["Vedno je praštevilo","Ima praštevilski delitelj, ki ni na seznamu","Vedno je liho","Je deljivo z vsakim p_i"],1,"Število samo je lahko sestavljeno, vendar ga noben p_i ne deli."],
    ["aa-q05","deljivost-evklid","Če \\(a=2^3 3^2\\) in \\(b=2^2 3^5\\), je gcd",["\\(2^3 3^5\\)","\\(2^2 3^2\\)","\\(2^1 3^1\\)","1"],1,"Za gcd vzamemo minimum vsakega eksponenta."],
    ["aa-q06","kongruence-euler","Kdaj smemo iz \\(ca\\equiv cb\\pmod n\\) sklepati \\(a\\equiv b\\pmod n\\)?",["Vedno","Samo če c deli n","Če gcd(c,n)=1","Samo če c je sod"],2,"Tedaj ima c inverz modulo n."],
    ["aa-q07","kongruence-euler","Koliko rešitev modulo n ima rešljiva kongruenca \\(ax\\equiv b\\pmod n\\), če je d=gcd(a,n)?",["1","d","n/d","n"],1,"Po redukciji dobimo eno rešitev modulo n/d, ki se dvigne v d razredov modulo n."],
    ["aa-q08","kongruence-euler","Koliko obrnljivih elementov ima \\(\\mathbb Z_{175}\\)?",["174","140","120","100"],2,"φ(175)=175(4/5)(6/7)=120."],
    ["aa-q09","kongruence-euler","Kateri pogoj potrebuje Eulerjev izrek?",["n je vedno praštevilo","gcd(a,n)=1","a<n","eksponent je sod"],1,"Množenje z a mora permutirati obrnljive razrede modulo n."],
    ["aa-q10","kongruence-euler","Ali 20 ima inverz modulo 100?",["Da, 5","Da, 80","Ne, ker gcd(20,100)>1","Ne, ker je 20 sod"],2,"Odločilen je gcd, ne sama sodost."],
    ["aa-q11","kongruence-euler","Zakaj množenje z obrnljivim elementom a permutira reducirani sistem ostankov modulo n?",["Ker je n praštevilo","Ker ima preslikava u↦au inverz u↦a^{-1}u","Ker so vsi ostanki enaki","Ker je a vedno 1"],1,"Obrnljivost a naredi množenje z a bijektivno; to je jedro dokaza Eulerjevega izreka."],
    ["aa-q12","kongruence-euler","Kaj zagotavlja CRT pri paroma tujih modulih?",["Nobene rešitve","Eno rešitev kot celo število","Enoličen razred modulo produktu","Da so vsi ostanki enaki"],2,"Rešitve se ponavljajo s periodo produkta modulov."],
    ["aa-q13","algebrske-strukture","Kaj mora najprej veljati, da je pravilo binarna operacija na A?",["Komutativnost","Zaprtost v A","Obstoj inverza","Končnost A"],1,"Binarna operacija je preslikava A×A→A."],
    ["aa-q14","algebrske-strukture","Kje se pri dokazu enoličnosti inverza uporabi asociativnost?",["Pri zamenjavi b(ac)=(ba)c","Pri e=a","Pri komutiranju a in b","Nikjer"],0,"Prav preoklepanje poveže levi in desni inverz."],
    ["aa-q15","algebrske-strukture","Katera struktura je \\((\\mathbb Z,\\cdot)\\)?",["Grupa","Komutativen monoid, ne grupa","Polje","Samo množica brez operacije"],1,"Množenje je asociativno, komutativno in ima enoto 1, vendar večina elementov nima inverza v Z."],
    ["aa-q16","algebrske-strukture","Kdaj je \\(\\mathbb Z_n\\) polje?",["Ko je n lih","Ko je n praštevilo","Ko je n>1","Vedno"],1,"Pri praštevilskem n je vsak neničelni razred tuj n in zato obrnljiv."],
    ["aa-q17","algebrske-strukture","Kaj velja v polju iz \\(ab=0\\)?",["a=b","a=0 ali b=0","a in b sta obrnljiva","nič posebnega"],1,"Če je a neničeln, množimo z a^{-1} in dobimo b=0."],
    ["aa-q18","algebrske-strukture","Zakaj obrnljivi elementi monoida tvorijo podgrupo?",["Ker je vsak monoid komutativen","Ker so zaprti za produkt in inverz produkta je b^{-1}a^{-1}","Ker imajo vsi elementi red 2","Ker monoid nima enote"],1,"Produkt obrnljivih elementov je obrnljiv, asociativnost in enoto pa podedujemo od monoida." ]
  ].map(([id,topic,prompt,options,correct,explanation]) => ({id,topic,prompt,options,correct,explanation}));

  const questions = [
    {id:"aa-o01",topic:"deljivost-evklid",prompt:"Celovito definiraj deljivost celih števil, izpelji njene osnovne lastnosti ter posebej obravnavaj ničlo, predznake in linearne kombinacije.",answer:H`Za \(a,b\in\mathbb Z\) velja \(a\mid b\) natanko tedaj, ko obstaja \(k\in\mathbb Z\) z \(b=ak\). Zato vsak \(a\) deli 0, medtem ko \(0\mid b\) velja natanko za \(b=0\); velja tudi \(a\mid b\iff-a\mid b\iff a\mid-b\). Relacija je refleksivna in tranzitivna. Na \(\mathbb Z\) ni antisimetrična, saj \(2\mid-2\) in \(-2\mid2\), vendar \(2\ne-2\); na \(\mathbb N_{>0}\) je delna urejenost. Če \(a\mid b\) in \(a\mid c\), pišemo \(b=ar,c=as\), zato za poljubna \(u,v\in\mathbb Z\) velja \(ub+vc=a(ur+vs)\) in \(a\mid ub+vc\). Obrat za eno samo linearno kombinacijo ne velja: iz \(2\mid(3+5)\) ne sledi \(2\mid3\). Pri \(a=0\) definicije ne smemo nadomestiti z ulomkom \(b/a\), ker deljenje z nič ni definirano.`,hint:"Vsako lastnost preveri neposredno iz eksistenčnega zapisa b=ak.",rubric:["definicija","ničla in predznaki","refleksivnost, tranzitivnost ter urejenost","dokaz linearnih kombinacij in protiprimer obrata"],difficulty:2,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o02",topic:"deljivost-evklid",prompt:"Natančno formuliraj osnovni izrek aritmetike ter dokaži oba njegova dela; pojasni tudi vlogo pogoja \\(n>1\\).",answer:H`<strong>Osnovni izrek aritmetike.</strong> Vsako naravno število \(n>1\) je produkt praštevil, ta razcep pa je enoličen do vrstnega reda faktorjev. <strong>Obstoj:</strong> uporabimo močno indukcijo. Če je \(n\) praštevilo, je že iskani produkt. Če je sestavljeno, je \(n=ab\) z \(1<a,b<n\); po indukcijski predpostavki se \(a,b\) razcepita na praštevila, zato se tudi \(n\). <strong>Enoličnost:</strong> če \(p_1\cdots p_r=q_1\cdots q_s\), Evklidova lema pove, da \(p_1\) deli neki \(q_j\). Ker sta praštevili, je \(p_1=q_j\); enak faktor pokrajšamo in induktivno nadaljujemo. Tako sta seznama enaka do permutacije. Število 1 ni praštevilo: če bi dovolili faktor 1, bi ga lahko poljubno dodajali. Primer \(60=2^2\cdot3\cdot5\) določa gcd, lcm in vse pozitivne delitelje. Izrek ne pravi, da je algoritem faktorizacije vedno računsko lahek, ampak da razcep obstaja in je matematično enoličen.`,hint:"Obstoj in enoličnost sta ločena dela; drugi uporablja Evklidovo lemo.",rubric:["natančen izrek in pogoj n>1","močna indukcija za obstoj","Evklidova lema in krajšanje za enoličnost","vloga števila 1 in primer"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o03",topic:"deljivost-evklid",prompt:"Dokaži, da je praštevil neskončno mnogo, in natančno povej, kaj konstrukcija v dokazu zagotavlja in česa ne.",answer:H`Predpostavimo, da so \(p_1,\ldots,p_k\) vsa praštevila, in postavimo \(N=p_1p_2\cdots p_k+1>1\). Vsako naravno število večje od 1 ima praštevilski delitelj, zato naj \(q\mid N\) bo praštevilo. Po domnevni popolnosti seznama bi bil \(q=p_i\) za neki \(i\). Toda \(N\equiv1\pmod{p_i}\), zato noben \(p_i\) ne deli \(N\), kar je protislovje. Sledi, da praštevil ni končno mnogo. Konstrukcija ne zagotavlja, da je \(N\) sam praštevilo: za \(2\cdot3\cdot5\cdot7\cdot11\cdot13+1=30031=59\cdot509\) je sestavljeno. Zagotavlja le obstoj vsaj enega praštevilskega delitelja, ki ni na prvotnem seznamu. Ključni pomožni rezultat je obstoj praštevilskega delitelja vsakega \(N>1\).`,hint:"Za protislovje primerjaj ostanek konstruiranega števila po vsakem domnevno znanem praštevilu.",rubric:["predpostavka končnega popolnega seznama","konstrukcija in praštevilski delitelj","protislovje z ostankom 1","pojasnilo, da N ni nujno praštevilo"],difficulty:2,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o04",topic:"deljivost-evklid",prompt:"Formuliraj in dokaži kriterij rešljivosti linearne diofantske enačbe, opiši konstrukcijo ene rešitve ter pokaži rešljiv in nerešljiv primer.",answer:H`Naj bo \((a,b)\ne(0,0)\) in \(d=\gcd(a,b)>0\). Enačba \(ax+by=c\) ima celoštevilsko rešitev natanko tedaj, ko \(d\mid c\). <strong>Nujnost:</strong> ker \(d\mid a\) in \(d\mid b\), deli vsako linearno kombinacijo \(ax+by\), zato mora deliti \(c\). <strong>Zadostnost:</strong> Bézout da \(au+bv=d\). Če je \(c=dt\), množenje s \(t\) da \(a(ut)+b(vt)=c\), zato je \((ut,vt)\) rešitev. Primer \(6x+9y=3\) je rešljiv, saj je gcd 3 in npr. \((x,y)=(-1,1)\) deluje. Enačba \(6x+9y=4\) ni rešljiva, ker \(3\nmid4\). Če je \((x_0,y_0)\) ena rešitev, vse dobimo z \(x=x_0+(b/d)t\), \(y=y_0-(a/d)t\); dokaz popolnosti te parametrizacije je ločen naslednji korak. Pogosta napaka je iskati koeficiente pred preverjanjem \(d\mid c\).`,hint:"Primerjaj desno stran z vsemi možnimi celoštevilskimi linearnimi kombinacijami a in b.",rubric:["pogoji in natančen kriterij","dokaz nujnosti","Bézoutova konstrukcija zadostnosti","rešljiv in nerešljiv primer ter omenjena družina rešitev"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o05",topic:"kongruence-euler",prompt:"Karakteriziraj obrnljive razrede v \\(\\mathbb Z_n\\), dokaži obe smeri ter pokaži, kako kriterij dejansko da inverz in kako prepozna njegov neobstoj.",answer:H`Za \(n\ge2\) je \([a]\in\mathbb Z_n\) obrnljiv natanko tedaj, ko je \(\gcd(a,n)=1\). Če obstaja \([x]\) z \(ax\equiv1\pmod n\), je \(ax-1=kn\), torej \(ax-kn=1\); vsak skupni delitelj \(a,n\) deli 1, zato je gcd enak 1. Obratno iz \(\gcd(a,n)=1\) Bézout da \(ax+ny=1\); po prehodu modulo \(n\) je \(ax\equiv1\), zato je \([x]=[a]^{-1}\). Razširjeni Evklid zato inverz tudi izračuna. Primer: \(3^{-1}\equiv3\pmod8\), ker \(3\cdot3=9\equiv1\). Razred \([2]\) modulo 8 ni obrnljiv, ker je gcd 2; res so vsi produkti \(2x\) sodi in ne morejo biti kongruentni 1. Inverz je enoličen kot razred modulo \(n\), njegovi celoštevilski predstavniki pa niso enolični.`,hint:"Poveži kongruenco ax≡1 z celoštevilsko linearno kombinacijo 1.",rubric:["definicija obrnljivosti","dokaz nujnosti","Bézoutov dokaz zadostnosti","izračunljiv primer, neprimer in enoličnost razreda"],difficulty:3,source:"teoreticni_izpit_adm.pdf"},
    {id:"aa-o06",topic:"kongruence-euler",prompt:"Definiraj Eulerjevo funkcijo, iz prafaktorizacije izpelji njeno splošno formulo ter razloži multiplikativnost, reducirani sistem ostankov in omejitve formul.",answer:H`Eulerjeva funkcija \(\varphi(n)\) za \(n\ge1\) šteje obrnljive razrede modulo \(n\), enakovredno števila \(1\le a\le n\) z \(\gcd(a,n)=1\); \(\varphi(1)=1\). Če je \(n=\prod_i p_i^{\alpha_i}\), število ni tuje \(n\) natanko tedaj, ko je deljivo z vsaj enim različnim \(p_i\). Vključitve–izključitve dajo
\[\varphi(n)=n\prod_{p\mid n}\left(1-\frac1p\right)=\prod_i p_i^{\alpha_i-1}(p_i-1).\]
Reducirani sistem ostankov vsebuje po enega predstavnika vsake enote in ima \(\varphi(n)\) elementov; modulo 8 je to \(1,3,5,7\). Za tuji \(a,b\) CRT da bijekcijo enot modulo \(ab\) s pari enot modulo \(a,b\), zato \(\varphi(ab)=\varphi(a)\varphi(b)\). Pogoj tujosti je nujen: \(\varphi(4)\varphi(2)=2\ne4=\varphi(8)\). Primer: \(\varphi(60)=60(1-\frac12)(1-\frac13)(1-\frac15)=16\). Funkcija ne šteje praštevil do \(n\), ampak razrede, tuje \(n\).`,hint:"Najprej opiši komplement: števila, deljiva z vsaj enim praštevilskim deliteljem n.",rubric:["definicija in φ(1)","prafaktorska formula z izpeljavo","reducirani sistem in multiplikativnost s pogojem","izračun in protiprimer brez tujosti"],difficulty:3,source:"teoreticni_izpit_adm.pdf"},
    {id:"aa-o07",topic:"kongruence-euler",prompt:"Natančno primerjaj mali Fermatov in Eulerjev izrek, pojasni povezavo med njima ter z zgledom pokaži pomen vseh pogojev.",answer:H`<strong>Mali Fermatov izrek.</strong> Če je \(p\) praštevilo in \(p\nmid a\), potem \(a^{p-1}\equiv1\pmod p\). Ekvivalentna oblika \(a^p\equiv a\pmod p\) velja za vsak \(a\in\mathbb Z\), saj pri \(p\mid a\) obe strani izgineta. <strong>Eulerjev izrek.</strong> Če je \(n\ge1\) in \(\gcd(a,n)=1\), potem \(a^{\varphi(n)}\equiv1\pmod n\). Fermat je poseben primer, ker je \(\varphi(p)=p-1\). Tujost pomeni, da je \([a]\) enota; množenje z njo bijektivno permutira reducirani sistem ostankov, kar omogoči dokaz s produktom in krajšanjem. Brez pogoja trditev odpove: \(\varphi(4)=2\), vendar \(2^2\equiv0\not\equiv1\pmod4\). Tudi »\(a^{n-1}\equiv1\pmod n\) za vsako tujo osnovo« ne karakterizira nujno praštevil brez dodatne razlage; Eulerjev eksponent je \(\varphi(n)\), ne splošno \(n-1\).`,hint:"Primerjaj eksponent, modul in pogoj obrnljivosti v obeh izrekih.",rubric:["Fermat z obema oblikama","Euler z vsemi pogoji","povezava prek φ(p) in strukturna razlaga","pravilen protiprimer brez tujosti"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o08",topic:"algebrske-strukture",prompt:"Definiraj dvostransko enoto, dokaži njeno enoličnost ter pojasni odvisnost pojma od operacije in nevarnost enostranske definicije.",answer:H`Za binarno operacijo \(*\) na \(A\) je \(e\in A\) dvostranska enota, če za vsak \(a\in A\) velja \(e*a=a\) in \(a*e=a\). Če sta \(e,f\) enoti, je \(e*f=f\), ker je \(e\) leva enota, hkrati pa \(e*f=e\), ker je \(f\) desna enota; zato \(e=f\). Dokaz ne potrebuje asociativnosti, potrebuje pa obe strani definicije. Nevtralni element je vezan na operacijo: v \((\mathbb Z,+)\) je 0, v \((\mathbb Z,\cdot)\) pa 1. Nevtralni element operacije ni isto kot obrnljiv element oziroma enota kolobarja: nevtralni element je en sam, obrnljivih elementov pa je lahko več. Samo leve enote brez dodatnih pogojev niso nujno enolične; zato zapis »\(e*a=a\)« ni popolna definicija dvostranske enote.`,hint:"Primerjaj produkt dveh domnevnih enot, enkrat z levo in enkrat z desno lastnostjo.",rubric:["dvostranska definicija","dokaz enoličnosti","pojasnilo, da asociativnost ni potrebna","primeri operacij in opozorilo na enostranskost"],difficulty:2,source:"teoreticni_izpit_adm.pdf"},
    {id:"aa-o09",topic:"algebrske-strukture",prompt:"Definiraj inverz elementa v asociativni strukturi z enoto, dokaži njegovo enoličnost, obravnavaj komutativni primer ter v \\(\\mathbb Z_7\\) določi aditivni in multiplikativni inverz razreda \\([4]\\).",answer:H`Naj ima asociativna operacija \(*\) dvostransko enoto \(e\). Element \(b\) je inverz elementa \(a\), če veljata \(a*b=e\) in \(b*a=e\); označimo ga \(a^{-1}\). Pri komutativni operaciji zadošča ena enakost, saj iz \(a*b=e\) sledi \(b*a=e\). Če sta \(b,c\) inverza \(a\), potem
\[b=b*e=b*(a*c)=(b*a)*c=e*c=c.\]
Srednja enakost uporabi asociativnost, zato je ta hipoteza bistvena za dokaz. Obstoj ni samoumeven: 2 v monoidu \((\mathbb Z,\cdot)\) nima inverza. V \(\mathbb Z_7\) je aditivni inverz \([4]\) enak \([3]\), ker \(4+3\equiv0\), multiplikativni pa \([2]\), ker \(4\cdot2\equiv1\). Inverz je vedno glede na izbrano operacijo in njeno enoto. Grupa \((\mathbb Z_2,+)\) ima vsaj dva elementa in vsak element je sam sebi inverz.`,hint:"Med dvema kandidatoma za inverz vstavi enoto v obliki produkta z a.",rubric:["dvostranska definicija in komutativna poenostavitev","dokaz enoličnosti z asociativnostjo","oba inverza 4 v Z7","primer neobstoja in samoinverzne grupe"],difficulty:3,source:"IzpitTeorija2021.pdf"},
    {id:"aa-o10",topic:"algebrske-strukture",prompt:"Navedi vse aksiome kolobarja, pojasni običajne dodatne pridevnike ter iz aksiomov izpelji računanje z ničlo in predznaki.",answer:H`Kolobar \((R,+,\cdot)\) ima \((R,+)\) za Abelovo grupo, množenje je asociativno ter veljata obe distributivnosti \(a(b+c)=ab+ac\) in \((a+b)c=ac+bc\). Vedno navedemo dogovor, ali definicija zahteva multiplikativno enoto; <em>komutativen</em> pomeni \(ab=ba\). Ker je \(0+0=0\),
\[a0=a(0+0)=a0+a0,\]
in po prištevanju aditivnega inverza dobimo \(a0=0\); analogno \(0a=0\). Nato \(ab+(-a)b=(a-a)b=0\), zato \((-a)b=-(ab)\); podobno \(a(-b)=-(ab)\) in \((-a)(-b)=ab\). Ti dokazi uporabljajo aditivne inverze in distributivnost, ne »deljenja z \(a\)«. Primer je \(\mathbb Z\); množica \(\mathbb N\) z običajnim seštevanjem in množenjem ni kolobar, ker nima aditivnih inverzov. Matrike tvorijo kolobar, ki praviloma ni komutativen.`,hint:"Iz distributivnosti ustvari enačbo, v kateri se isti člen pojavi na obeh straneh, nato uporabi aditivni inverz.",rubric:["Abelova aditivna grupa","asociativnost in obe distributivnosti","dokaza a0=0 in pravil predznakov","primer, protiprimer in dogovor o enoti"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o11",topic:"algebrske-strukture",prompt:"Pojasni razliko med deliteljem nič in neobrnljivim elementom ter jo ilustriraj v Z_6.",answer:H`Delitelj nič je neničelni a, za katerega obstaja neničelni b z ab=0. Neobrnljiv element nima multiplikativnega inverza. V končnem komutativnem kolobarju Z_n je vsak neničelni neobrnljiv element tudi delitelj nič; v Z_6 sta 2 in 3 delitelja nič, ker 2·3=0, obrnljiva elementa pa sta 1 in 5. V splošnih neskončnih kolobarjih neobrnljiv ne pomeni nujno delitelj nič: 2 v Z je neobrnljiv, ni pa delitelj nič.`,hint:"Primerjaj Z_6 in Z.",rubric:["obe definiciji","primer Z6","obrnljiva elementa Z6","protiprimer obrata v Z"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o12",topic:"algebrske-strukture",prompt:"Za n≥2 določi, kdaj je Z_n polje, in dokaži obe smeri.",answer:H`Za \(n\ge2\) je \(\mathbb Z_n\) polje natanko, ko je n praštevilo. Če je \(n=p\) praštevilo, je vsak \(1\le a<p\) tuj p, zato obrnljiv. Če je n sestavljen, \(n=rs\) z \(1<r,s<n\); v \(\mathbb Z_n\) sta \([r],[s]\) neničelna, njun produkt pa \([0]\), zato \([r]\) ni obrnljiv in \(\mathbb Z_n\) ni polje.`,hint:"Pri sestavljenem n uporabi netrivialen razcep.",rubric:["pogoj n≥2 in iff trditev","praštevilska smer z gcd","sestavljeni razcep","delitelj nič/neobrnljivost"],difficulty:2,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o13",topic:"deljivost-evklid",prompt:"Navedi izrek o deljenju s preostankom, dokaži obstoj in enoličnost ter pravilno obravnavaj negativen delitelj.",answer:H`Za \(a\in\mathbb Z\) in \(b\in\mathbb Z\setminus\{0\}\) obstajata enolična \(q,r\in\mathbb Z\) z
\[a=bq+r,\qquad0\le r<|b|.\]
Za obstoj postavimo \(d=|b|>0\), \(q_0=\lfloor a/d\rfloor\) in \(r=a-dq_0\). Iz definicije talne funkcije sledi \(0\le r<d\). Če je \(b>0\), vzamemo \(q=q_0\), če je \(b<0\), pa \(q=-q_0\). Za enoličnost naj velja tudi \(a=bq'+r'\) z istima mejama. Odštevanje da \(b(q-q')=r'-r\), toda \(|r'-r|<|b|\); edini večkratnik \(b\) s tako absolutno vrednostjo je 0. Zato sta \(r=r'\) in \(q=q'\). Primer: pri \(a=-17,b=5\) je \(-17=5(-4)+3\), ne \(5(-3)-2\), ker mora biti ostanek nenegativen. Pogosta napaka je meja \(r<b\), ki pri negativnem \(b\) nima pravega pomena; pravilna je \(r<|b|\).`,hint:"Za obstoj uporabi celo število neposredno pod a/|b|; za enoličnost primerjaj dva zapisa.",rubric:["natančen izrek s pogoji","dokaz obstoja","dokaz enoličnosti","negativni primer in pravilna meja z |b|"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o14",topic:"deljivost-evklid",prompt:"Dokaži tranzitivnost deljivosti in Evklidovo lemo v obliki gcd(a,b)=1 in a|bc ⇒ a|c.",answer:H`Za tranzitivnost iz \(r\mid m\) in \(m\mid n\) pišemo \(m=kr,n=\ell m\), zato \(n=\ell kr\) in \(r\mid n\). Za Evklidovo lemo Bézout pri \(\gcd(a,b)=1\) da \(ax+by=1\). Pomnožimo s c: \(acx+bcy=c\). Prvi člen deli a, drugega pa a deli zaradi \(a\mid bc\); zato a deli njuno vsoto c.`,hint:"Za drugi del pomnoži Bézoutovo enakost s c.",rubric:["definicijski dokaz tranzitivnosti","Bézout","množenje s c","linearne kombinacije"],difficulty:2,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o15",topic:"deljivost-evklid",prompt:"Dokaži, da ima vsako naravno število večje od 1 praštevilski delitelj, ter upraviči vse robne in indukcijske korake.",answer:H`Za \(n=2\) je trditev očitna. Predpostavimo, da velja za vsa števila med 2 in \(n-1\). Če je \(n\) praštevilo, ga deli samo praštevilo \(n\). Če je sestavljeno, ima pravi delitelj \(m\) z \(1<m<n\). Po indukcijski predpostavki je \(m\) deljiv z nekim praštevilom \(p\); iz \(p\mid m\) in \(m\mid n\) po tranzitivnosti sledi \(p\mid n\). Potrebna je močna indukcijska predpostavka, ker pravi delitelj ni nujno \(n-1\). Pogoj \(n>1\) je bistven: število 1 nima praštevilskega delitelja. Ta trditev v dokazu neskončnosti praštevil zagotovi praštevilski delitelj konstruiranega števila, ne pa nujno njegove praštevilskosti.`,hint:"Pri sestavljenem številu uporabi pravi delitelj, ki je strogo manjši od začetnega števila.",rubric:["pogoj n>1 in baza","praštevilski primer","sestavljeni primer z močnim indukcijskim korakom","tranzitivnost in pomen pomožne trditve"],difficulty:2,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o16",topic:"deljivost-evklid",prompt:"Navedi invariant razširjenega Evklidovega algoritma in z njim dokaži, kaj algoritem vrne.",answer:H`Pri trojicah \((r_i,x_i,y_i)\) je invariant \(ax_i+by_i=r_i\). Za začetni trojici velja neposredno, rekurzija vseh treh komponent pa ohrani enakost. Zadnji neničelni ostanek d deli vse prejšnje ostanke, torej a in b; po invariantu je linearna kombinacija a,b, zato ga deli vsak njun skupni delitelj. Tako je \(d=\gcd(a,b)\) in \(ax+by=d\).`,hint:"Ista rekurzija velja za ostanek in oba koeficienta.",rubric:["invariant","osnovna primera","indukcijski korak","dvojna deljivost za gcd"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o17",topic:"deljivost-evklid",prompt:"Dokaži, da so vse rešitve ax+by=c oblike x=x0+(b/d)t, y=y0−(a/d)t.",answer:H`Naj bo d=gcd(a,b) in \((x_0,y_0)\) posebna rešitev. Navedena para rešujeta enačbo, ker se dodatna člena izničita. Če je \((x_1,y_1)\) poljubna druga rešitev, po odštevanju dobimo \(a(x_1-x_0)=-b(y_1-y_0)\). Delimo z d: \((a/d)(x_1-x_0)=-(b/d)(y_1-y_0)\). Ker sta a/d in b/d tuja, Evklidova lema da \((b/d)\mid(x_1-x_0)\); to določi celo število t in nato tudi drugo formulo.`,hint:"Odštej dve rešitvi in uporabi tujost a/d, b/d.",rubric:["preverjanje podane družine","odštevanje rešitev","tujost reduciranih koeficientov","parameter t za obe koordinati"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o18",topic:"kongruence-euler",prompt:"Definiraj kongruenco modulo \\(m\\), dokaži, da je ekvivalenčna relacija, ter poveži njene razrede z enoličnimi ostanki pri deljenju.",answer:H`Za \(m\ge1\) definiramo \(a\equiv b\pmod m\) natanko tedaj, ko \(m\mid(a-b)\). Refleksivnost sledi iz \(m\mid0\); iz \(m\mid(a-b)\) sledi \(m\mid-(a-b)=b-a\), zato simetričnost; če \(m\mid(a-b)\) in \(m\mid(b-c)\), deli njuno vsoto \(a-c\), zato tranzitivnost. Ekvivalenčni razred \([a]_m\) je množica vseh števil z istim ostankom kot \(a\). Če \(a=qm+r\), \(b=q'm+s\) z \(0\le r,s<m\), potem \(r=s\) takoj da kongruenco. Obratno kongruenca da \(m\mid(r-s)\), a \(|r-s|<m\), zato \(r=s\). Tako ima vsak razred natanko enega predstavnika v \(\{0,\ldots,m-1\}\). Primer \(-1\equiv4\pmod5\). Pogosta napaka je pisati \(a\bmod m=b\bmod m\) brez določenega nenegativnega dogovora o ostanku; definicija z deljivostjo je temeljna.`,hint:"Vse tri lastnosti prevedi v deljivost razlik; nato uporabi omejitev obeh ostankov.",rubric:["definicija in pogoj m≥1","tri lastnosti ekvivalence","obe smeri za enakost ostankov","kanonični predstavniki, primer in opozorilo"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o19",topic:"kongruence-euler",prompt:"Navedi in dokaži pravilo krajšanja kongruence z ne nujno obrnljivim faktorjem.",answer:H`Iz \(ca\equiv cb\pmod n\) sledi \(a\equiv b\pmod{n/d}\), kjer je \(d=\gcd(c,n)\). Pišemo \(c=dc',n=dn'\) in iz \(n\mid c(a-b)\) dobimo \(n'\mid c'(a-b)\). Ker sta c' in n' tuja, Evklidova lema da \(n'\mid(a-b)\). Če je d=1, modul ostane n; če d>1, ga na splošno ne smemo ohraniti.`,hint:"Izloči gcd iz faktorja in modula.",rubric:["pravilen novi modul","izločitev d","tujost reduciranih števil","Evklidova lema"],difficulty:2,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o20",topic:"kongruence-euler",prompt:"Določi in dokaži kriterij rešljivosti linearne kongruence, število njenih rešitev v popolnem sistemu ostankov ter izpeljavo preveri na zgledu.",answer:H`Kongruenca \(ax\equiv b\pmod n\), kjer je \(n\ge1\), je ekvivalentna diofantski enačbi \(ax-ny=b\). Zato je rešljiva natanko tedaj, ko \(d=\gcd(a,n)\) deli \(b\). Če \(d\mid b\), enačbo delimo z \(d\); koeficient \(a/d\) je obrnljiv modulo \(n/d\), zato dobimo enoličen razred \(x_0\pmod{n/d}\). V enem popolnem sistemu ostankov modulo \(n\) ta razred da natanko \(d\) rešitev
\[x=x_0+j\frac nd,\qquad j=0,\ldots,d-1.\]
Primer \(6x\equiv9\pmod{15}\): \(d=3\mid9\), po deljenju je \(2x\equiv3\pmod5\), zato \(x\equiv4\pmod5\); modulo 15 so rešitve \(4,9,14\). Kongruenca \(6x\equiv8\pmod{15}\) ni rešljiva, ker \(3\nmid8\). Če je \(d=1\), je rešitev natanko ena modulo \(n\); število \(d\) rešitev velja le v primeru rešljivosti.`,hint:"Najprej kongruenco razumi kot celoštevilsko enačbo, nato reduciraj koeficiente in modul z gcd.",rubric:["ekvivalenca z diofantsko enačbo","kriterij d|b","dokaz in formula za d rešitev","rešljiv ter nerešljiv primer"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o21",topic:"kongruence-euler",prompt:"Za praštevilo p in r≥1 dokaži formulo φ(p^r)=p^{r−1}(p−1), nato dokaži φ(ab)=φ(a)φ(b) za tuja a,b.",answer:H`Naj bo \(p\) praštevilo in \(r\ge1\). Med \(1,\ldots,p^r\) niso tuja \(p^r\) natanko števila, deljiva s \(p\); teh je \(p^{r-1}\), zato je \(\varphi(p^r)=p^r-p^{r-1}\). Če je eden od \(a,b\) enak 1, multiplikativnost sledi iz \(\varphi(1)=1\). Če sta \(a,b\ge2\) tuja, CRT bijektivno priredi razredu modulo \(ab\) par ostankov modulo \(a,b\). Razred je obrnljiv modulo \(ab\) natanko tedaj, ko sta obe komponenti obrnljivi, zato je obrnljivih razredov \(\varphi(a)\varphi(b)\).`,hint:"Odstrani večkratnike p; nato uporabi pare ostankov in posebej omeni rob a=1 ali b=1.",rubric:["praštevilo p in r≥1","štetje večkratnikov p","rob z modulom 1","CRT bijekcija in obrnljivost po komponentah"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o22",topic:"kongruence-euler",prompt:"Navedi in dokaži mali Fermatov izrek ter v dokazu upraviči uporabo vseh pogojev in krajšanja.",answer:H`Naj bo \(p\) praštevilo in \(p\nmid a\). Tedaj je \([a]\) obrnljiv modulo \(p\). Če \(ia\equiv ja\pmod p\) za \(1\le i,j\le p-1\), lahko pokrajšamo \(a\) in dobimo \(i\equiv j\pmod p\), zaradi izbranega območja pa \(i=j\). Zato so \(a,2a,\ldots,(p-1)a\) le permutacija neničelnih ostankov. Njihova produkta sta kongruentna:
\[a^{p-1}(p-1)!\equiv(p-1)!\pmod p.\]
Noben faktor \(1,\ldots,p-1\) ni deljiv s \(p\), zato je \((p-1)!\) obrnljiv in ga smemo pokrajšati; sledi \(a^{p-1}\equiv1\pmod p\). Če \(p\mid a\), oblika z desno stranjo 1 odpove, še vedno pa velja \(a^p\equiv a\pmod p\). Praštevilskost modula zagotovi obrnljivost vseh neničelnih razredov.`,hint:"Pokaži, da množenje z a ne ponovi nobenega neničelnega ostanka modulo p.",rubric:["izrek z vsemi pogoji","permutacija neničelnih ostankov","produktna kongruenca","upravičeno krajšanje in druga oblika izreka"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o23",topic:"kongruence-euler",prompt:"Navedi in dokaži Eulerjev izrek; posebej upraviči bijektivnost ključne preslikave, produktni korak in dovoljeno krajšanje.",answer:H`Naj bo \(n\ge1\), \(\gcd(a,n)=1\), in naj \(u_1,\ldots,u_{\varphi(n)}\) predstavljajo vse obrnljive razrede modulo \(n\). Produkt \(au_i\) je spet tuj \(n\). Če \(au_i\equiv au_j\pmod n\), smemo pokrajšati \(a\), ker je obrnljiv, in dobimo \(u_i\equiv u_j\); na končni množici je preslikava \([u]\mapsto[au]\) zato bijekcija. Seznama \(au_1,\ldots,au_{\varphi(n)}\) in \(u_1,\ldots,u_{\varphi(n)}\) sta ista do permutacije. Zmnožitev da
\[a^{\varphi(n)}\prod_i u_i\equiv\prod_i u_i\pmod n.\]
Vsak \(u_i\) je enota, zato je njihov produkt enota in ga smemo pokrajšati; sledi \(a^{\varphi(n)}\equiv1\pmod n\). Če \(\gcd(a,n)>1\), prvi korak odpove: množenje z \([a]\) ne permutira enot. Pri \(n=1\) je kongruenca trivialna in \(\varphi(1)=1\); običajno glavni dokaz navajamo za \(n\ge2\).`,hint:"Dokaži, da množenje z razredom a ohrani enote in je injektivno; šele nato primerjaj produkta.",rubric:["reducirani sistem in pogoji","dobro definirana injektivna oziroma bijektivna preslikava","produktna kongruenca","upravičeno krajšanje in pojasnilo odpovedi brez tujosti"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o24",topic:"kongruence-euler",prompt:"Formuliraj in dokaži kitajski izrek o ostankih za paroma tuje module, podaj konstruktivni zapis rešitve ter dokaži njeno enoličnost.",answer:H`Naj bodo \(n_1,\ldots,n_t\) paroma tuji pozitivni moduli in \(N=\prod_i n_i\). Sistem \(x\equiv a_i\pmod{n_i}\) ima natanko en razred rešitev modulo \(N\). Postavimo \(N_i=N/n_i\). Ker je \(\gcd(N_i,n_i)=1\), obstaja \(y_i\) z \(N_iy_i\equiv1\pmod{n_i}\). Tedaj
\[x=\sum_{i=1}^{t}a_iN_iy_i\]
ustreza sistemu: modulo \(n_i\) ostane \(a_i\), vsi členi z indeksom \(j\ne i\) pa so 0, ker \(n_i\mid N_j\). Če sta \(x,z\) rešitvi, vsak \(n_i\mid(x-z)\); zaradi paroma tujosti njihov produkt \(N\mid(x-z)\), zato sta isti razred modulo \(N\). Primer za modula 3 in 5: sistem \(x\equiv2\pmod3\), \(x\equiv1\pmod5\) ima rešitev \(x\equiv11\pmod{15}\). Brez paroma tujosti potrebujemo dodatne združljivostne pogoje in enoličnost modulo produktu na splošno odpove.`,hint:"Za vsak modul sestavi člen, ki je po njem 1, po vseh drugih pa 0.",rubric:["pogoji in sklep","obstoj inverzov ter konstrukcija","preverjanje vseh kongruenc","dokaz enoličnosti, primer in opozorilo brez tujosti"],difficulty:3,source:"TeorijaStevilVer2.pdf — izpeljava koraka iz dokaza RSA"},
    {id:"aa-o25",topic:"kongruence-euler",prompt:"Predstavi matematični model RSA z vsemi pogoji na parametre ter dokaži pravilnost dešifriranja za poljubno dovoljeno sporočilo.",answer:H`Izberemo različni praštevili \(p,q\), postavimo \(n=pq\) in \(\varphi(n)=(p-1)(q-1)\). Javni eksponent \(e\) mora zadoščati \(\gcd(e,\varphi(n))=1\), da obstaja zasebni \(d\) z \(ed\equiv1\pmod{\varphi(n)}\), torej \(ed=1+k\varphi(n)\). Javni ključ je \((n,e)\). Za \(0\le m<n\) šifriramo \(c\equiv m^e\pmod n\) in dešifriramo \(c^d\equiv m^{ed}\). Če je \(\gcd(m,n)=1\), Euler da \(m^{ed}=m(m^{\varphi(n)})^k\equiv m\). Za poljuben \(m\) računamo modulo \(p\): če \(p\mid m\), sta \(m^{ed}\) in \(m\) oba 0; sicer Fermat in \(p-1\mid\varphi(n)\) dasta enakost. Enako velja modulo \(q\), CRT pa nato da \(m^{ed}\equiv m\pmod{pq}\). Pogosta napaka je iskati \(d\) kot inverz \(e\) modulo \(n\); pravi modul je \(\varphi(n)\). Dokaz pravilnosti ni dokaz varnosti: varnost temelji na težavnosti faktorizacije velikega \(n\) in pravilnem kodiranju.`,hint:"Loči izbiro ključev od dokaza ter pri netujem sporočilu primerjaj obe strani posebej modulo p in q.",rubric:["p,q,n,φ ter pogoj za e,d","javni/zasebni ključ in operaciji","dokaz za tuje in netuje sporočilo","CRT sklep ter ločitev pravilnosti od varnosti"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o26",topic:"algebrske-strukture",prompt:"Definiraj binarno operacijo, asociativnost in komutativnost ter za vsako navedi primer in protiprimer.",answer:H`Binarna operacija na A je preslikava A×A→A, zato vključuje zaprtost. Asociativnost je \((a*b)*c=a*(b*c)\) za vse trojice; primer je seštevanje, protiprimer odštevanje. Komutativnost je \(a*b=b*a\) za vse pare; primer je množenje števil, protiprimer množenje matrik. Deljenje ni operacija na vseh celih številih zaradi nezaprtosti in ničle.`,hint:"Vsaka definicija potrebuje univerzalni kvantifikator.",rubric:["operacija in zaprtost","asociativnost s primeroma","komutativnost s primeroma","jasna ločitev lastnosti"],difficulty:1,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o27",topic:"algebrske-strukture",prompt:"Definiraj polgrupo, monoid, grupo in Abelovo grupo ter podaj primer, ki loči vsak sosednji pojem.",answer:H`Polgrupa je množica z asociativno operacijo; \((\mathbb N_{>0},+)\) je primer brez enote. Monoid je polgrupa z enoto; \((\mathbb Z,\cdot)\) ima enoto 1, ni grupa, ker 2 nima inverza. Grupa je monoid, kjer je vsak element obrnljiv; obrnljive matrike tvorijo lahko nekomutativno grupo. Abelova grupa je komutativna grupa; primer je \((\mathbb Z,+)\).`,hint:"Za vsak dodani aksiom poišči strukturo, kjer ta še odpove.",rubric:["vse štiri definicije","polgrupa brez enote","monoid brez vseh inverzov","nekomutativna in Abelova grupa"],difficulty:2,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o28",topic:"algebrske-strukture",prompt:"Dokaži, da množica vseh obrnljivih elementov monoida tvori grupo.",answer:H`Če sta a,b obrnljiva, je ab obrnljiv z inverzom b^{-1}a^{-1}; s tem je množica obrnljivih elementov zaprta. Asociativnost podeduje od monoida. Enota e pripada množici, saj je e^{-1}=e. Inverz vsakega obrnljivega elementa je spet obrnljiv, ker \((a^{-1})^{-1}=a\). Vsi grupni aksiomi so zato izpolnjeni.`,hint:"Preveri zaprtost, asociativnost, enoto in inverze.",rubric:["zaprtost in formula","asociativnost","enota","inverz ostane v množici"],difficulty:2,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o29",topic:"algebrske-strukture",prompt:"Navedi zgled asociativne operacije z enoto na vsaj dveh elementih, kjer je vsak element sam sebi inverz. Kaj lahko sklepaš o taki grupi?",answer:H`V \((\mathbb Z_2,+)\) je enota 0, 0+0=0 in 1+1=0, zato je vsak element svoj inverz. Bogatejši zgled je \((\mathcal P(X),\triangle)\). V katerikoli grupi, kjer je a^{-1}=a za vsak a, velja \(ab=(ab)^{-1}=b^{-1}a^{-1}=ba\), zato je grupa Abelova.`,hint:"Poskusi seštevanje modulo 2 ali simetrično razliko.",rubric:["veljaven zgled z vsaj 2 elementoma","enota","preverjanje samoinverznosti","dokaz komutativnosti"],difficulty:2,source:"IzpitTeorija2021.pdf"},
    {id:"aa-o30",topic:"algebrske-strukture",prompt:"Celovito predstavi polinome nad kolobarjem: formalno definicijo, stopnjo produkta, deljenje, korene, faktorje in nerazcepnost z vsemi pogoji.",answer:H`Polinom nad komutativnim kolobarjem \(K\) je formalna končna vsota \(f(X)=\sum_i a_iX^i\); \(X\) je nedoločenka, ne izbrano število. Če \(f,g\ne0\) in \(K\) nima deliteljev nič, produkt vodilnih koeficientov ne izgine, zato \(\deg(fg)=\deg f+\deg g\). Pogoj je nujen: v \(\mathbb Z_6[X]\) je \((2X+1)(3X+1)=5X+1\), zato stopnja pade z 2 na 1. Če je \(K\) polje in \(g\ne0\), obstajata enolična \(q,r\in K[X]\) z \(f=qg+r\), kjer je \(r=0\) ali \(\deg r<\deg g\); splošneje zadošča obrnljiv vodilni koeficient \(g\). Pri deljenju z \(X-a\) je ostanek \(f(a)\), zato je \(a\) koren natanko tedaj, ko \(X-a\mid f\). Element \(f\in K[X]\) je nerazcepen, če je neničeln in ni enota ter iz \(f=gh\) vedno sledi, da je \(g\) ali \(h\) enota; nad poljem je pogoj »ni enota« za neničelni polinom enakovreden temu, da je nekonstanten. Nerazcepnost je odvisna od polja: \(X^2+1\) je nerazcepen nad \(\mathbb R\), nad \(\mathbb C\) pa se razcepi. Nad poljem je za polinom stopnje 2 ali 3 neobstoj korena ekvivalenten nerazcepnosti; pri višji stopnji ni.`,hint:"Vsako lastnost polinoma povej skupaj s pogoji na koeficientni kolobar.",rubric:["formalni polinom in nedoločenka","stopnja produkta s pogojem in protiprimerom","deljenje ter izrek koren–faktor","nerazcepnost, odvisnost od polja in meja kriterija s koreni"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"}
  ];

  questions.push(
    {id:"aa-o32",topic:"deljivost-evklid",prompt:"Poveži izrek o deljenju, Evklidov algoritem, Bézoutovo identiteto in gcd v enoten dokaz pravilnosti.",answer:H`Za \(a\in\mathbb Z,b\ne0\) obstajata enolična \(q,r\) z \(a=bq+r\) in \(0\le r<|b|\). Para \((a,b)\) in \((b,r)\) imata iste skupne delitelje: skupni delitelj \(a,b\) deli \(r=a-bq\), skupni delitelj \(b,r\) pa deli \(a=bq+r\). Zato \(\gcd(a,b)=\gcd(b,r)\). Ostanki Evklidovega algoritma strogo padajo med nenegativnimi celimi števili, zato algoritem konča; zadnji neničelni ostanek je gcd. Z vstavljanjem enačb nazaj ga izrazimo kot \(ax+by\), kar da Bézoutovo identiteto. Obratno lahko gcd opišemo kot najmanjšo pozitivno linearno kombinacijo: ostanek pri deljenju \(a\) ali \(b\) z njo je spet taka kombinacija in mora biti 0. Primer: \(30=1\cdot18+12\), \(18=1\cdot12+6\), zato je gcd 6, z vstavljanjem nazaj pa \(6=18-12=18-(30-18)=2\cdot18-30\). Neposredno vstavljanje na koncu preveri predznake.`,hint:"Invariant sta ista množica skupnih deliteljev in dejstvo, da je vsak ostanek linearna kombinacija začetnih števil.",rubric:["izrek o deljenju in enakost gcd","strogo padanje in končnost","zadnji ostanek ter Bézout","pravilen konkreten izračun in preverjanje"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o33",topic:"deljivost-evklid",prompt:"Iz prafaktorizacije izpelji kriterij deljivosti ter formuli za gcd in lcm, nato dokaži njuno produktno zvezo.",answer:H`Naj bo \(|a|=\prod_pp^{\alpha_p}\) in \(|b|=\prod_pp^{\beta_p}\). Za pozitivni števili velja \(a\mid b\) natanko tedaj, ko je \(\alpha_p\le\beta_p\) za vsak \(p\). Zato je \(\gcd(a,b)=\prod_pp^{\min(\alpha_p,\beta_p)}\), najmanjši skupni večkratnik pa \(\operatorname{lcm}(a,b)=\prod_pp^{\max(\alpha_p,\beta_p)}\). Ker \(\min(u,v)+\max(u,v)=u+v\), sledi \(\gcd(a,b)\operatorname{lcm}(a,b)=|ab|\). Ob dogovorih \(\gcd(a,0)=|a|\) in \(\operatorname{lcm}(a,0)=0\) zveza velja tudi, ko je natanko eno število nič; primer \((0,0)\) zahteva posebej naveden dogovor. Primer \(12=2^2\cdot3\), \(18=2\cdot3^2\) da gcd 6, lcm 36 in produkt 216.`,hint:"Pri vsakem praštevilu primerjaj eksponenta; gcd vzame minimum, lcm maksimum.",rubric:["kriterij deljivosti po eksponentih","formuli za gcd in lcm","dokaz produktne zveze","ničelni rob in primer"],difficulty:2,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o34",topic:"kongruence-euler",prompt:"Dokaži, da računanje v \\(\\mathbb Z_n\\) ni odvisno od predstavnikov, ter natančno razloži dovoljeno krajšanje.",answer:H`Če \(a\equiv a'\pmod n\) in \(b\equiv b'\pmod n\), potem sta razliki deljivi z \(n\). Zato je \((a+b)-(a'+b')\) deljiva z \(n\), za produkt pa uporabimo \(ab-a'b'=a(b-b')+b'(a-a')\). Tako sta \([a]+[b]=[a+b]\) in \([a][b]=[ab]\) dobro definirani operaciji. Krajšanje \(ca\equiv cb\pmod n\Rightarrow a\equiv b\pmod n\) je dovoljeno natanko, ko je \(\gcd(c,n)=1\), saj je tedaj \([c]\) obrnljiv. Splošno za \(d=\gcd(c,n)\) sledi le \(a\equiv b\pmod{n/d}\). Protiprimer: \(2\cdot1\equiv2\cdot4\pmod6\), vendar \(1\not\equiv4\pmod6\); pravilno je \(1\equiv4\pmod3\). Deljenje zato ni splošna operacija na \(\mathbb Z_n\).`,hint:"Za dobro definiranost primerjaj dva para predstavnikov; za krajšanje poišči inverz faktorja.",rubric:["dobro definirana vsota","dobro definiran produkt","kriterij gcd=1 in splošni modul n/d","konkreten protiprimer"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o36",topic:"kongruence-euler",prompt:"Razloži zanesljiv postopek za računanje velikih potenc modulo \\(n\\), primerjaj dovoljene redukcije eksponenta in pokaži nevarno napačno bližnjico.",answer:H`Hitro kvadriranje zapiše eksponent v dvojiški obliki, zaporedno kvadrira osnovo in po vsakem množenju vzame ostanek; veljavno je za vsako osnovo in modul. Eulerjevo redukcijo smemo uporabiti, če je \(\gcd(a,n)=1\): iz \(a^{\varphi(n)}\equiv1\pmod n\) sledi, da za pozitivna eksponenta z istim ostankom modulo \(\varphi(n)\) dobimo isti rezultat. Pri praštevilskem \(p\) in \(p\nmid a\) je dovolj redukcija modulo \(p-1\) po Fermatu. Brez tujosti je bližnjica napačna: \(\varphi(4)=2\), toda \(2^2\equiv0\not\equiv1\pmod4\), zato eksponenta ne smemo slepo zamenjati z ostankom modulo 2. Primer: \(3^{100}\pmod{10}\) lahko zmanjšamo, ker \(\gcd(3,10)=1\) in \(\varphi(10)=4\), zato je rezultat \(3^0\equiv1\). Za \(2^{100}\pmod8\) Euler ne velja; neposredno vidimo, da je rezultat 0. Pri sestavljenem modulu lahko računamo po praštevilskih potencah in rezultate združimo s CRT.`,hint:"Pred vsakim zmanjšanjem eksponenta preveri gcd osnove in modula; hitro kvadriranje tega pogoja nima.",rubric:["hitra potenca","Eulerjeva in Fermatova redukcija s pogoji","protiprimer brez tujosti","dva pravilno ločena primera in možnost CRT"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o38",topic:"algebrske-strukture",prompt:"Izpelji zakona krajšanja in formulo za inverz produkta v grupi; dodaj protiprimer zunaj grupe.",answer:H`V grupi iz \(ax=ay\) z levim množenjem z \(a^{-1}\) dobimo \(x=y\); podobno iz \(xa=ya\) z desnim množenjem dobimo \(x=y\). Asociativnost upraviči prestavljanje oklepajev. Za obrnljiva \(a,b\) velja
\[(ab)(b^{-1}a^{-1})=a(bb^{-1})a^{-1}=e,\qquad
(b^{-1}a^{-1})(ab)=b^{-1}(a^{-1}a)b=e,\]
zato \((ab)^{-1}=b^{-1}a^{-1}\). Enačba \(ax=b\) ima enolično rešitev \(x=a^{-1}b\), enačba \(ya=b\) pa \(y=ba^{-1}\); v nekomutativni grupi vrstnega reda ne zamenjamo. Zunaj grupe krajšanje lahko odpove: v \(\mathbb Z_6\) je \(2\cdot1=2\cdot4\), a \(1\ne4\), ker 2 ni enota. Komutativnost za te dokaze ni potrebna.`,hint:"Množi z inverzom na isti strani; dejanja razveljavljaš v obratnem vrstnem redu.",rubric:["levo in desno krajšanje","obe preverjanji inverza produkta","rešitvi grupnih enačb z vrstnim redom","protiprimer zunaj grupe"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o39",topic:"algebrske-strukture",prompt:"Navedi kriterij za podgrupo, ga dokaži in uporabi na primeru ter protiprimeru.",answer:H`Naj bo \(G\) grupa in \(H\ne\varnothing\). Tedaj je \(H\) podgrupa natanko tedaj, ko za vse \(x,y\in H\) velja \(xy^{-1}\in H\). Nujnost sledi iz zaprtosti in inverzov. Za zadostnost izberemo \(h\in H\): \(e=hh^{-1}\in H\). Nato z \(x=e,y=h\) dobimo \(h^{-1}\in H\), z uporabo kriterija na \(x\) in \(y^{-1}\) pa \(xy\in H\). Asociativnost podedujemo od \(G\), zato so izpolnjeni vsi aksiomi. V aditivnem zapisu kriterij postane \(x-y\in H\). Tako je \(2\mathbb Z\) podgrupa \((\mathbb Z,+)\), ker je razlika sodih števil soda. Množica pozitivnih celih števil ni podgrupa, ker ne vsebuje 0 niti aditivnih inverzov. Nepraznosti ne smemo izpustiti: prazna množica pogoj za vse pare izpolni prazno, a ni grupa.`,hint:"Iz enega elementa najprej pridobi enoto, nato inverze in nazadnje zaprtost za produkt.",rubric:["kriterij z nepraznostjo","dokaz nujnosti","izpeljava enote, inverzov in produkta","primer ter protiprimer"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o40",topic:"algebrske-strukture",prompt:"Primerjaj kolobar, komutativni kolobar, cel kolobar in polje ter dokaži ključne implikacije.",answer:H`V kolobarju je \((R,+)\) Abelova grupa, množenje je asociativno in veljata obe distributivnosti; zahtevo po enoti vedno navedemo skladno z dogovorom. Komutativni kolobar ima komutativno množenje. Cel kolobar je komutativen kolobar z \(1\ne0\) brez deliteljev nič. Polje zahteva, da je vsak neničelni element obrnljiv. Vsako polje je cel kolobar: če \(ab=0\) in \(a\ne0\), množimo z \(a^{-1}\) in dobimo \(b=0\). Obrati ne veljajo: matrični kolobar je lahko nekomutativen; \(\mathbb Z_6\) ima delitelje nič; \(\mathbb Z\) je cel kolobar, ki ni polje; \(\mathbb Q\) je polje. Vsak končen cel kolobar pa je polje: preslikava \(x\mapsto ax\) za \(a\ne0\) je zaradi odsotnosti deliteljev nič injektivna, na končni množici torej surjektivna, zato zadene 1 in \(a\) ima inverz.`,hint:"Za vsako stopnjo hierarhije povej novi aksiom in primer, kjer naslednji aksiom odpove.",rubric:["vse štiri definicije","dokaz polje nima deliteljev nič","ločilni primeri","dokaz končen cel kolobar je polje"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o41",topic:"algebrske-strukture",prompt:"Klasificiraj enote in delitelje nič v \\(\\mathbb Z_n\\) ter pojasni povezavo s tem, kdaj je \\(\\mathbb Z_n\\) polje.",answer:H`Razred \([a]\in\mathbb Z_n\) je enota natanko tedaj, ko \(\gcd(a,n)=1\): Bézoutova enačba \(ax+ny=1\) je ekvivalentna \([a][x]=[1]\). Enot je zato \(\varphi(n)\). Če je \(d=\gcd(a,n)>1\) in \([a]\ne[0]\), je \([a]\) delitelj nič, saj \([a][n/d]=[0]\), drugi faktor pa je neničeln. Delitelj nič ne more biti enota, ker bi iz \(ab=0\) po krajšanju sledilo \(b=0\). Tako je vsak neničelni razred v \(\mathbb Z_n\) bodisi enota bodisi delitelj nič. Kolobar \(\mathbb Z_n\) je polje natanko za praštevilski \(n\): pri praštevilu so vsi neničelni razredi tuji \(n\), pri sestavljenem \(n=rs\) pa sta \([r]\) in \([s]\) neničelna delitelja nič. Primer modulo 12: enote so 1,5,7,11, razred 2 pa je delitelj nič.`,hint:"Za neenotski razred uporabi partner n/gcd(a,n).",rubric:["kriterij enote in φ(n)","konstrukcija delitelja nič","izključitev prekrivanja","dokaz kriterija za polje ter primer"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
  );

  // Ta modul je namenoma samo teorijski. Vsa preverjanja so odprta
  // definicijsko-dokazovalna vprašanja v `questions`.
  questions.push(
    {id:"aa-o43",topic:"deljivost-evklid",prompt:"Iz enolične prafaktorizacije izpelji število pozitivnih deliteljev naravnega števila ter karakteriziraj popolne kvadrate s parnostjo tega števila.",answer:H`Naj bo \(n=\prod_{i=1}^{t}p_i^{\alpha_i}\), kjer so \(p_i\) različna praštevila in \(\alpha_i\ge1\). Vsak pozitivni delitelj ima zaradi enoličnosti prafaktorizacije enolično obliko \(d=\prod_i p_i^{\beta_i}\), kjer neodvisno izberemo \(0\le\beta_i\le\alpha_i\). Zato je število pozitivnih deliteljev
\[\tau(n)=\prod_{i=1}^{t}(\alpha_i+1).\]
Delitelje lahko parimo kot \(d\leftrightarrow n/d\). Par nima dveh različnih členov natanko tedaj, ko je \(d=n/d\), torej \(d^2=n\). Zato ima \(n\) liho mnogo pozitivnih deliteljev natanko tedaj, ko je popoln kvadrat. Enakovredno so tedaj vsi eksponenti \(\alpha_i\) sodi, zato so vsi faktorji \(\alpha_i+1\) lihi. Primer \(36=2^2\cdot3^2\) ima \(\tau(36)=3\cdot3=9\) deliteljev. Za \(n=1\) je prafaktorizacija prazen produkt, \(\tau(1)=1\), in 1 je kvadrat. Pogosta napaka je eksponente sešteti namesto zmnožiti števila njihovih neodvisnih izbir.`,hint:"Vsak delitelj je določen z neodvisno izbiro eksponenta pri vsakem praštevilu.",rubric:["enoličen zapis delitelja","formula za τ(n)","dokaz karakterizacije kvadratov","primer, rob n=1 in tipična napaka"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o44",topic:"deljivost-evklid",prompt:"Dokaži temeljne posledice izločanja gcd: tujost reduciranih faktorjev, kriterij za lcm in sklep o produktu dveh tujih deliteljev; dodaj protiprimer brez tujosti.",answer:H`Naj bo \(d=\gcd(a,b)>0\) in \(a=da',b=db'\). Bézout da \(ax+by=d\), po deljenju z \(d\) pa \(a'x+b'y=1\), zato \(\gcd(a',b')=1\). Za neničelna \(a,b\) iz \(\gcd(a,b)\operatorname{lcm}(a,b)=|ab|\) sledi
\[\gcd(a,b)=1\iff\operatorname{lcm}(a,b)=|ab|.\]
Če sta \(a,b>0\) tuja ter \(a\mid m\) in \(b\mid m\), pišemo \(m=ak\). Ker \(b\mid ak\) in \(\gcd(a,b)=1\), Evklidova lema da \(b\mid k\), zato \(m=ab\ell\) in \(ab\mid m\). Primer: iz \(4\mid m\) in \(9\mid m\) sledi \(36\mid m\). Brez tujosti sklep odpove: \(4\mid12\) in \(6\mid12\), vendar \(24\nmid12\); pravilen skupni pogoj izraža lcm 12. Pri negativnih številih v produktni zvezi uporabimo absolutno vrednost, gcd pa vzamemo pozitiven.`,hint:"Po deljenju obeh števil z gcd uporabi Bézout, za produkt deliteljev pa Evklidovo lemo.",rubric:["tujost a/d in b/d","ekvivalenca za lcm","dokaz produkta tujih deliteljev","primer, protiprimer in predznaki"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o45",topic:"kongruence-euler",prompt:"Definiraj popolni in reducirani sistem ostankov. Dokaži, da prištevanje fiksnega razreda vedno permutira popolni sistem, ter določi, kdaj množenje s \\(c\\) permutira popolni oziroma reducirani sistem. Trditve ponazori.",answer:H`Popolni sistem ostankov modulo \(n\ge2\) vsebuje natanko po enega predstavnika vsakega od \(n\) razredov; ekvivalentno so njegovi elementi paroma nekongruentni. Reducirani sistem vsebuje po enega predstavnika vsakega obrnljivega razreda in ima \(\varphi(n)\) elementov. Prištevanje fiksnega \(c\) je bijekcija na vseh razredih z inverzom prištevanja \(-c\), zato vsak popolni sistem preslika v popolnega. Množenje s \(c\) preslika popolni sistem v popolnega natanko tedaj, ko je \(\gcd(c,n)=1\): tedaj je \([c]\) obrnljiv; če gcd ni 1, preslikava ni injektivna. Isti pogoj zagotovi, da množenje s \(c\) permutira reducirani sistem. Modulo 8 je \(0,\ldots,7\) popolni sistem in \(1,3,5,7\) reducirani. Množenje s 3 permutira oba ustrezna sistema, množenje z 2 pa popolnega ne ohrani, saj se ostanki ponovijo, in enote pošlje v neenote. Reducirani sistem ne vsebuje razreda 0, razen degeneriranih dogovorov pri modulu 1.`,hint:"Obe operaciji obravnavaj kot preslikavi na razredih in preveri obstoj inverzne preslikave.",rubric:["obe definiciji in moči","prištevanje na popolnem sistemu kot bijekcija","kriterij za množenje z dokazom","primer modulo 8 in protiprimer"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o46",topic:"kongruence-euler",prompt:"Posploši kitajski izrek na dva modula, ki nista nujno tuja: določi kriterij obstoja, modul enoličnosti ter dokaži oboje s primerom in protiprimerom.",answer:H`Naj bodo \(m,n\ge1\), \(d=\gcd(m,n)\). Sistem
\[x\equiv a\pmod m,\qquad x\equiv b\pmod n\]
je rešljiv natanko tedaj, ko \(a\equiv b\pmod d\), oziroma \(d\mid(b-a)\). Nujnost: iz obeh kongruenc sledi, da \(d\mid(x-a)\) in \(d\mid(x-b)\), zato \(d\mid(b-a)\). Za zadostnost pišemo \(x=a+mt\); druga kongruenca postane \(mt\equiv b-a\pmod n\), ki je rešljiva natanko tedaj, ko \(\gcd(m,n)=d\) deli desno stran. Če sta dve števili rešitvi, njuno razliko delita \(m\) in \(n\), zato jo deli \(\operatorname{lcm}(m,n)\); vse rešitve tvorijo en razred modulo lcm. Sistem \(x\equiv1\pmod4\), \(x\equiv3\pmod6\) je rešljiv in da \(x\equiv9\pmod{12}\), ker \(2\mid2\). Sistem \(x\equiv0\pmod4\), \(x\equiv1\pmod6\) ni rešljiv, ker \(2\nmid1\). Pri tujih modulih je \(d=1\) in dobimo običajni CRT z modulom \(mn\).`,hint:"Zapiši kandidata iz prve kongruence in drugo pretvori v linearno kongruenco za njegov parameter.",rubric:["natančen kriterij","dokaz nujnosti in zadostnosti","enoličnost modulo lcm","rešljiv primer, protiprimer in povezava z običajnim CRT"],difficulty:3,source:"TeorijaStevilVer2.pdf"},
    {id:"aa-o47",topic:"algebrske-strukture",prompt:"Dokaži zgornjo mejo za število korenov neničelnega polinoma nad poljem ter pokaži, zakaj pogoj na koeficientni strukturi in neničelnost nista odveč.",answer:H`Naj bo \(K\) polje in \(0\ne f\in K[X]\) stopnje \(d\). Tedaj ima \(f\) največ \(d\) različnih korenov v \(K\). Dokazujemo z indukcijo po \(d\). Neničelna konstanta nima korena. Če je \(a\) koren, faktorski izrek da \(f=(X-a)g\) z \(\deg g=d-1\). Vsak drug koren \(b\ne a\) mora biti koren \(g\), saj \(0=f(b)=(b-a)g(b)\) in je \(b-a\ne0\); v polju ga smemo pokrajšati. Po indukciji ima \(g\) največ \(d-1\) korenov, zato jih ima \(f\) največ \(d\). Ničelni polinom je izključen, ker ima vsak element za koren. Pogoj brez deliteljev nič je bistven: v \(\mathbb Z_6[X]\) ima \(f=X^2-X\) stopnjo 2, vendar štiri korene \([0],[1],[3],[4]\). Primer ostrosti je \((X-a_1)\cdots(X-a_d)\) za različne \(a_i\), ki ima natanko \(d\) korenov.`,hint:"Izloči en linearni faktor in vse preostale korene prenesi na polinom stopnje ena manj.",rubric:["izrek z vsemi pogoji","indukcija in faktorski izrek","ničelni polinom in ostrina","protiprimer nad Z6"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"},
    {id:"aa-o48",topic:"algebrske-strukture",prompt:"Primerjaj formalni polinom s polinomsko funkcijo ter dokaži, kdaj enake vrednosti določajo enak polinom in kdaj ne; navedi končni protiprimer.",answer:H`Formalni polinom \(f=\sum a_iX^i\in K[X]\) je določen s koeficienti. Z vstavljanjem dobimo polinomsko funkcijo \(\widetilde f:K\to K\), \(x\mapsto f(x)\). Nad neskončnim poljem je preslikava \(f\mapsto\widetilde f\) injektivna: če \(f,g\) določata isto funkcijo, ima \(h=f-g\) neskončno mnogo korenov; neničelni polinom končne stopnje jih ne more imeti, zato je \(h=0\) in \(f=g\). Nad končnim poljem sklep odpove. V \(\mathbb F_p\) mali Fermat pove, da neničelni formalni polinom \(X^p-X\) pri vsakem elementu zavzame vrednost 0, zato določa isto funkcijo kot ničelni polinom. Konkretno sta v \(\mathbb F_2\) polinoma \(X^2-X\) in 0 formalno različna, funkcijsko pa enaka. Če imata nad poljem z \(q\) elementi oba polinoma stopnjo manjšo od \(q\) in določata isto funkcijo, sta vendarle enaka, saj ima njuna razlika \(q\) korenov in stopnjo manjšo od \(q\). Enakost polinomov zato vedno pomeni enakost koeficientov, ne le preverjanje nekaj vrednosti.`,hint:"Razliko dveh polinomov primerjaj z izrekom o največjem številu korenov.",rubric:["obe definiciji","dokaz injektivnosti nad neskončnim poljem","protiprimer X^p−X nad končnim poljem","meja za stopnjo <q in pomen formalne enakosti"],difficulty:3,source:"ADM-StevilaAlgebra.pdf"}
  );

  const exercises = [];

  window.ADM_MODULE_ALGEBRA = { topics, flashcards, quiz, questions, exercises };
})();
