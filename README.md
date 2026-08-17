# Balance Quelle

Web pro Aranku — Pilates, Yoga, Reiki, Massage · Landsberg am Lech.
Nová verze původního webu z Wixu (https://www.balance-quelle.com/), statické HTML/CSS/JS.

## Struktura

```
index.html          úvod (Über mich, Wichtige Informationen, Kontakt + formulář)
pilates.html        Pilates + ceník
yoga.html           PŘIPRAVENO — zatím bez podkladů, není v menu (viz níže)
reiki.html          Reiki + ceník
massage.html        Massage + ceník
gutscheine.html     poukazy
galerie.html        fotogalerie
aktuelles.html      novinky (letáky kurzů)
impressum.html      povinné údaje
datenschutz.html    GDPR
assets/css/style.css
assets/js/main.js
assets/img/web/       optimalizované obrázky používané webem
assets/img/original/  originály stažené z Wixu (archiv, kdyby Wix zanikl)
```

## Sekce Jóga (až budou podklady)

1. Do `yoga.html` doplň texty a ceny do bloků označených `<!-- TEXT -->` / `<!-- NADPIS -->`.
2. V **každé** HTML stránce odkomentuj v navigaci řádek:
   `<!-- <li><a href="yoga.html">Yoga</a></li> -->`
   (je i v patičce? ne — jen v horním menu).

## Lokální náhled

Stačí otevřít `index.html` v prohlížeči, nebo:

```
python3 -m http.server 8000
```

a otevřít http://localhost:8000

## Práce na dvou počítačích (Mac mini ↔ MacBook)

Zdroj pravdy je GitHub. Vždy:

**Před začátkem práce (na kterémkoli počítači):**
```
git pull
```

**Po skončení práce:**
```
git add -A
git commit -m "popis změny"
git push
```

Když toto dodržíš, nikdy nevznikne konflikt. Kdyby přece (změny na obou
strojích bez push), `git pull` ohlásí konflikt a Claude ho pomůže vyřešit.

## Nasazení

- Náhledy: GitHub Pages (větev `main`, automaticky po každém push).
- Ostrá doména balance-quelle.com přes Cloudflare — plán cca říjen 2026.
  Pozn.: v `datenschutz.html` je komentář — před nasazením na doménu nechat
  Aranku zkontrolovat odstavce o hostingu (původní text zmiňoval Wix a
  Google Analytics, které nový web nepoužívá).

## Poznámky

- Texty jsou 1:1 z původního Wix webu — neměnit bez podkladů od Aranky.
- Kontaktní formulář otevírá e-mailový klient (mailto na aranka.pilates@web.de).
  Původní Wix booking widget nemá statickou náhradu; rezervace řeší telefon/e-mail.
- Popup z původního webu (oznámení kurzu jógy) je záměrně vynechán.
