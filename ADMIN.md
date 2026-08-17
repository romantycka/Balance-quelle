# Administrace obsahu (větev `cms`)

Verze 2 webu: Aranka může sama měnit **ceny**, **aktuality** a **oznámení
(popup) na úvodní stránce** — bez znalosti kódování, přes jednoduché
formuláře na adrese `/admin/`. Vzhled webu se nemění.

## Jak to funguje

- Obsah je v `content/*.json` (preise, aktuelles, popup). Stránky ho načítají
  JavaScriptem (`assets/js/cms-content.js`); statický obsah v HTML zůstává
  jako záloha — když JSON chybí, web vypadá jako verze 1.
- `/admin/` je [Decap CMS](https://decapcms.org) — formuláře s popisky
  **česky · německy**. Uložení v administraci = commit do GitHubu = web se
  sám přegeneruje (u GitHub Pages se změna projeví do ~10 minut kvůli cache).
- Popup: v administraci „Oznámení na úvodní stránce" → přepínač **Zobrazit
  oznámení**. Vypnuto = web beze změny. Zapnuto = návštěvníkům se na úvodu
  zobrazí okno s nadpisem, textem, obrázkem (letákem) a tlačítkem.
  Zavření si prohlížeč pamatuje po dobu návštěvy (sessionStorage).
- Nahrané obrázky se ukládají do `assets/img/uploads/`.

## Vyzkoušení hned teď (lokálně, bez přihlašování)

```bash
git switch cms
python3 -m http.server 8123        # v jednom terminálu
npx decap-server                   # ve druhém terminálu
```

Pak otevři http://localhost:8123/admin/ — díky `local_backend: true` se
administrace otevře rovnou proti lokálním souborům (bez GitHub přihlášení).
Ulož změnu, obnov web a uvidíš ji.

## Co zbývá pro ostrý provoz (potřebuje tvé účty)

Administrace na živém webu vyžaduje přihlašování přes GitHub OAuth — to nejde
připravit bez tvých účtů. Až budeš chtít, uděláme spolu:

1. **OAuth proxy** — malý Cloudflare Worker
   ([sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth), nasazení
   jedním kliknutím na tvém Cloudflare účtu). Hodí se to spojit s plánovaným
   říjnovým přechodem na Cloudflare.
2. **GitHub OAuth App** — vytvoří se v nastavení tvého GitHub účtu
   (Settings → Developer settings), client ID/secret se vloží do Workeru.
3. Do `admin/config.yml` doplnit `base_url` (adresa Workeru) a smazat
   `local_backend`.
4. **Účet pro Aranku** — GitHub účet (zdarma) přidaný jako collaborator repa.
   Přihlašovala by se jím do /admin/ (jednou, prohlížeč si ho pamatuje).
5. Merge větve `cms` do `main` (a v config.yml přepnout `branch: main`).

Krok 1–2 zabere dohromady ~15 minut, provedu tě tím.

## Poznámky

- Alternativa se stejným config.yml: [Sveltia CMS](https://github.com/sveltia/sveltia-cms)
  — modernější rozhraní, stačí vyměnit skript v admin/index.html.
- Ostrá verze (main) není touto větví nijak dotčena.
