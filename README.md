# strompgabriel.sk — osobný web

Statický web (čisté HTML/CSS/JS, bez frameworkov), pripravený na GitHub Pages
s vlastnou doménou `strompgabriel.sk`.

## Štruktúra

```
index.html      → Domov / O mne
aktivity.html   → Moje aktivity
zivot.html      → Môj život (vertikálna časová os s míľnikmi)
skola.html      → Aktivita v škole (zaheslovaná podstránka)
css/style.css   → celý dizajn (farby, typografia, layout)
js/main.js      → mobilné menu, rok v pätičke
js/gate.js      → zámok na heslo pre skola.html
images/         → sem si vlož vlastné fotky
CNAME           → hovorí GitHubu, že web beží na strompgabriel.sk
```

## 1) Nahratie na GitHub

1. Na GitHube vytvor nový repozitár, napr. `strompgabriel`.
   - Môže byť **public** (na GitHub Pages zadarmo je repo väčšinou public).
2. Nahraj doňho všetky súbory z tohto priečinka **tak, ako sú** (zachovaj
   priečinky `css/`, `js/`, `images/`).
3. V repozitári choď do **Settings → Pages**.
   - Source: **Deploy from a branch**
   - Branch: `main`, priečinok `/ (root)`
   - Ulož.
4. GitHub ti vygeneruje adresu typu `https://tvoj-ucet.github.io/strompgabriel/`
   — over si, že web funguje.

## 2) Pripojenie vlastnej domény strompgabriel.sk

1. V **Settings → Pages → Custom domain** zadaj `strompgabriel.sk` a ulož.
   (Súbor `CNAME` s týmto textom už je v repozitári, GitHub ho automaticky použije.)
2. U svojho registrátora domény (kde si `strompgabriel.sk` kúpil) nastav DNS:
   - **A záznamy** pre `strompgabriel.sk` smerujúce na IP adresy GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Ak chceš aj `www.strompgabriel.sk`, pridaj **CNAME záznam**:
     ```
     www → tvoj-ucet.github.io
     ```
3. DNS zmeny môžu trvať pár hodín až deň. Keď sa prejavia, v GitHub Pages
   zaškrtni **Enforce HTTPS** (aby web bežal na `https://`).

## 3) Čo si potrebuješ doplniť

Vo všetkých HTML súboroch nájdeš komentáre `<!-- TU DOPLŇ ... -->` —
označujú miesta na úpravu:

- **Fotky** — nahraď textové placeholdery (`Sem vlož svoju fotku` a pod.)
  skutočnými `<img src="images/...">`. Fotky ulož do `images/`.
- **Texty** — úvod na domovskej stránke, popisy aktivít, míľniky v `zivot.html`.
- **Odkazy** — GitHub/LinkedIn/Instagram v `index.html`, prípadne ďalšie.
- **Milníky** — v `zivot.html` skopíruj blok `<div class="milestone">…</div>`
  pre každý ďalší bod na časovej osi.
- **Aktivity** — v `aktivity.html` skopíruj blok `<div class="card">…</div>`
  pre každú ďalšiu aktivitu.

## 4) Heslo na podstránke "Škola"

Predvolené heslo je **`skola2026`** — nutne si ho zmeň (návod priamo v
komentári na vrchu súboru `js/gate.js`, len skopíruj/vlož príkaz do konzoly
prehliadača a nahradíš hodnotu `PASSWORD_HASH`).

**Dôležité obmedzenie:** GitHub Pages je len statický hosting (žiadny server,
žiadna databáza), takže žiadne heslovanie na statickom webe nie je skutočne
bezpečné — text v HTML zdroji vie technicky zdatný človek nájsť aj bez hesla.
Tento zámok teda:
- zabráni náhodným návštevníkom vidieť obsah,
- **nie je vhodný pre naozaj citlivé/súkromné údaje** (osobné údaje
  spolužiakov, známky, čísla a pod.) — tie by sem nemali ísť vôbec.

Ak by si chcel v budúcnosti skutočné zabezpečenie (napr. prihlásenie so
serverom), dá sa to riešiť napr. cez Cloudflare Pages/Workers alebo malý
backend — daj vedieť, viem to pripraviť.

## 5) Lokálne testovanie pred nahratím

Najjednoduchšie: v priečinku spusti lokálny server (heslovanie cez
`crypto.subtle` funguje len na `https://` alebo `http://localhost`, nie pri
otvorení súboru priamo cez `file://`):

```bash
cd strompgabriel
python3 -m http.server 8000
```

a otvor `http://localhost:8000` v prehliadači.
