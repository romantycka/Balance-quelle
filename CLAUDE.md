# CLAUDE.md — Balance Quelle

Kontext pro Claude na kterémkoli počítači (Mac mini / MacBook). Přečti si i README.md.

## Co je tento projekt

Web pro Aranku Masarovou — Balance Quelle (Pilates, Yoga, Reiki, Massage),
Ahornallee 36, Landsberg am Lech, Německo. Je to ručně kódovaná náhrada jejího
původního Wix webu (www.balance-quelle.com). Statické HTML/CSS/JS, žádný
framework, žádný build — co je v repu, to se servíruje.

- Náhled: https://romantycka.github.io/Balance-quelle/ (GitHub Pages, auto-deploy z main)
- Cca říjen 2026: převod na doménu balance-quelle.com přes Cloudflare
- Majitel repa a spolupráce: uživatel (česky); Aranka žije v Německu

## Dvě větve — POZOR, nepleť si je

| větev | co to je | kdy do ní sahat |
|-------|----------|-----------------|
| `main` | **ostrá verze**, běží na GitHub Pages | běžné úpravy webu |
| `cms`  | **verze 2 s administrací** pro Aranku (Decap CMS, popup, ceny/aktuality z JSON) | jen když uživatel mluví o administraci/CMS |

- `cms` vychází z `main` a je o commity navíc — viz ADMIN.md (jen na větvi `cms`).
- **Nikdy nemerguj `cms` do `main` bez výslovného pokynu uživatele.** Zprovoznění
  vyžaduje OAuth (jeho účty), do té doby zůstává `cms` stranou.
- Změnu, která patří oběma (oprava webu), udělej na `main` a pak
  `git switch cms && git merge main`.
- Cache-buster (viz pravidlo 2) má na každé větvi jinou hodnotu — vždy zvyšuj
  tu, kterou vidíš v HTML na aktuální větvi.
- Ověř si na začátku práce, kde jsi: `git branch --show-current`.

## Železná pravidla

1. **Německé texty NIKDY neměň, nezkracuj, nedomýšlej ani nepřekládej.**
   Všechny texty jsou 1:1 z původního Wix webu nebo od Aranky. Uživatel neumí
   německy — nové/upravené texty smí dodat jen Aranka. Když text chybí, nech
   placeholder a řekni to.
2. **Po každé změně CSS nebo JS zvedni verzi cache-busteru** ve všech HTML:
   `style.css?v=N` a `main.js?v=N` → N+1. GitHub Pages cachuje 10 minut;
   bez toho uživatel uvidí nové HTML se starým CSS (už se nám to stalo).
3. Popup z původního webu (oznámení kurzu) je záměrně vynechaný — nepřidávat.
4. Drž stávající design: mauve/krémová paleta (CSS proměnné v :root),
   Cormorant Garamond + Jost, chakra tečky jako značkový prvek.
5. Commituj česky, pushuj po každém logickém celku (náhled se obnoví ~do minuty).

## Struktura a jak web funguje

- Stránky: index, pilates, reiki, massage, gutscheine, galerie, aktuelles,
  impressum, datenschutz + **yoga.html** (připravená, NENÍ v menu — čeká na
  podklady; návod na aktivaci je v README a v komentářích yoga.html).
- Scroll efekty: hero je `position: sticky` a obsah v `.sheet` se přes něj
  nasouvá; patička má `position: sticky; bottom: 0; z-index: -1` a odkrývá se
  na konci; `.parallax-band` = pásy s pevným pozadím; `data-parallax` na
  prvcích = JS parallax (main.js). Vše respektuje prefers-reduced-motion.
- Videa na pozadí (assets/video/) jsou z původního Wix webu, zpomalená přes
  `data-rate` atribut (main.js nastavuje playbackRate).
- Obrázky: assets/img/web/ = optimalizované pro web (používat tyto);
  assets/img/original/ = archiv originálů z Wixu (nemazat, nepoužívat přímo).
- Kontaktní formulář = mailto na aranka.pilates@web.de (statický web nemá
  backend). Mapa = Google Maps embed v sekci Kontakt na index.html.

## Lokální náhled

.claude/launch.json spouští `python3 -m http.server 8123`. Nebo ručně otevřít
index.html. Pozor: skrytý browser pane neumí screenshotovat odscrollované
stavy (sticky prvky) — ověřuj měřením getBoundingClientRect přes JS.

## Workflow dvou počítačů (Mac mini doma, MacBook na cestách)

Vždy začni `git pull`, skonči `git add -A && git commit && git push`.
Konflikt = na jednom stroji se zapomnělo pushnout; vyřeš merge, nic neztrácej.

Poprvé na novém počítači:

```
cd ~/claude/code && git clone https://github.com/romantycka/Balance-quelle.git
```

Když `git push` selže na autentizaci, proveď uživatele přes `gh auth login`
(účet **romantycka**, protokol HTTPS). Neřeš to za něj tokenem v kódu.

## Co ještě čeká

- Sekce Yoga (až Aranka dodá texty/ceny/fotky).
- Před nasazením na doménu: Aranka musí zkontrolovat datenschutz.html
  (vynechané odstavce o Wix hostingu a Google Analytics; přibyl Google Maps
  embed) — v souboru je komentář.
- Zprovoznění administrace na větvi `cms`: OAuth proxy (Cloudflare Worker),
  GitHub OAuth App, účet pro Aranku, merge do main. Postup v ADMIN.md
  (na větvi `cms`). Vyžaduje uživatelovy účty — sám to nedokončíš.
