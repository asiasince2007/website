// Einmaliges Migrationsskript (P3.1–3.3): zerlegt die SPA-index.html in echte Seiten.
const fs = require('fs');

const src = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

function cut(str, startMarker, endMarker) {
    const a = str.indexOf(startMarker);
    if (a === -1) throw new Error('Startmarker fehlt: ' + startMarker.slice(0, 50));
    const b = str.indexOf(endMarker, a);
    if (b === -1) throw new Error('Endmarker fehlt: ' + endMarker.slice(0, 50));
    return str.slice(a, b + endMarker.length);
}

// --- Bausteine extrahieren -------------------------------------------------
let head = cut(src, '<!DOCTYPE html>', '</head>');
let nav = cut(src, '    <!-- Header & Navigation -->', '</nav>');
let footer = cut(src, '    <!-- Footer -->', '</footer>');
const floatBtn = cut(src, '    <!-- Schwebender Vorschläge-Button -->', '</button>');

const startContent = cut(src, '<div id="start" class="page-view active">', '\n        <!-- ==========================================\n             TAB 2')
    .replace(/\n        <!-- =[\s\S]*$/, '')
    .replace('<div id="start" class="page-view active">', '<div id="start">');
const sortimentContent = cut(src, '<div id="sortiment" class="page-view">', '\n        <!-- ==========================================\n             TAB 3')
    .replace(/\n        <!-- =[\s\S]*$/, '')
    .replace('<div id="sortiment" class="page-view">', '<div id="sortiment">');
const ueberUnsContent = cut(src, '<div id="ueber-uns" class="page-view">', '\n        <!-- ==========================================\n             TAB 4')
    .replace(/\n        <!-- =[\s\S]*$/, '')
    .replace('<div id="ueber-uns" class="page-view">', '<div id="ueber-uns">');
const kontaktContent = cut(src, '<div id="kontakt" class="page-view">', '\n        <!-- ==========================================\n             TAB 5')
    .replace(/\n        <!-- =[\s\S]*$/, '')
    .replace('<div id="kontakt" class="page-view">', '<div id="kontakt">');

// page-view-CSS aus dem Head entfernen (Routing entfällt)
head = head.replace(/\n        \.page-view \{[\s\S]*?@keyframes fadeIn \{[\s\S]*?\}\n/, '\n');
// main.js einbinden
head = head.replace('</head>', '    <script src="assets/js/main.js" defer></script>\n</head>');

// --- Linkziele & A11y ------------------------------------------------------
function fixLinks(html) {
    return html
        .replace(/href="#start"/g, 'href="/"')
        .replace(/href="#sortiment"/g, 'href="sortiment.html"')
        .replace(/href="#ueber-uns"/g, 'href="ueber-uns.html"')
        .replace(/href="#kontakt"/g, 'href="kontakt.html"');
}
nav = fixLinks(nav).replace(
    '<button id="mobile-menu-button" class="text-brand-darkGreen p-2 focus:outline-none" aria-label="Menü öffnen">',
    '<button id="mobile-menu-button" class="text-brand-darkGreen p-2 focus:outline-none" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-menu">'
);
footer = fixLinks(footer);

function navWithActive(target) {
    return nav
        .replace(
            `href="${target}" class="nav-link nav-link-accent px-4 py-2 rounded-full font-medium transition-all duration-300 text-brand-darkGreen`,
            `href="${target}" aria-current="page" class="nav-link nav-link-accent px-4 py-2 rounded-full font-medium transition-all duration-300 bg-brand-green text-white`
        )
        .replace(
            `href="${target}" class="nav-link-mobile nav-link-accent block px-4 py-3 rounded-2xl text-base font-medium text-brand-darkGreen`,
            `href="${target}" aria-current="page" class="nav-link-mobile nav-link-accent block px-4 py-3 rounded-2xl text-base font-medium bg-brand-green text-white`
        );
}

// --- Head je Seite parametrisieren ----------------------------------------
function headFor(meta) {
    return head
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)
        .replace(/(<meta name="description" content=")[^"]*(">)/, `$1${meta.desc}$2`)
        .replace(/(<link rel="canonical" href=")[^"]*(">)/, `$1${meta.url}$2`)
        .replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${meta.title}$2`)
        .replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${meta.desc}$2`)
        .replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${meta.url}$2`)
        .replace(/(<meta name="twitter:title" content=")[^"]*(">)/, `$1${meta.title}$2`)
        .replace(/(<meta name="twitter:description" content=")[^"]*(">)/, `$1${meta.desc}$2`);
}

function assemble(meta, content, activeHref) {
    return `${headFor(meta)}
<body class="font-sans text-gray-700 antialiased flex flex-col min-h-screen">

${navWithActive(activeHref)}

    <main class="flex-grow pt-24">

${content}

    </main>

${footer}

    <div id="modal-root"></div>

${floatBtn}
</body>
</html>
`;
}

// --- Inhalts-Anpassungen ---------------------------------------------------
// Start: CTA-Button auf echte Links, Hash-CTAs umschreiben (#bewertungen bleibt Anker)
let start = startContent
    .replace(`<button onclick="navigateTo('kontakt')"`, `<a href="kontakt.html"`)
    .replace(`Kontakt &amp; Öffnungszeiten
                            </button>`, `Kontakt &amp; Öffnungszeiten
                            </a>`);
start = fixLinks(start);

// H2 → H1 auf den Unterseiten
const sortiment = sortimentContent.replace(
    '<h2 class="font-serif text-4xl md:text-5xl font-bold text-brand-darkGreen mb-6">Unser asiatisches Sortiment</h2>',
    '<h1 class="font-serif text-4xl md:text-5xl font-bold text-brand-darkGreen mb-6">Unser asiatisches Sortiment</h1>'
);
const ueberUns = ueberUnsContent.replace(
    '<h2 class="font-serif text-4xl md:text-5xl font-bold text-brand-darkGreen mb-8">Aus Liebe zur asiatischen Esskultur</h2>',
    '<h1 class="font-serif text-4xl md:text-5xl font-bold text-brand-darkGreen mb-8">Aus Liebe zur asiatischen Esskultur</h1>'
);
const kontakt = kontaktContent.replace(
    '<h2 class="font-serif text-4xl md:text-5xl font-bold text-brand-darkGreen mb-6">Wir freuen uns auf Sie</h2>',
    '<h1 class="font-serif text-4xl md:text-5xl font-bold text-brand-darkGreen mb-6">Wir freuen uns auf Sie</h1>'
);

// --- Seiten schreiben ------------------------------------------------------
fs.writeFileSync('index.html', assemble({
    title: 'Asia Markt Thien Phu | Authentische asiatische Lebensmittel in Langenfeld',
    desc: 'Asia Markt Thien Phu in Langenfeld. Original asiatische Lebensmittel, frisches Gemüse und ausgewählte Qualität. Entdecken Sie unsere Vielfalt!',
    url: 'https://www.asiamarkt.info/'
}, start, '/'));

fs.writeFileSync('sortiment.html', assemble({
    title: 'Asiatisches Sortiment in Langenfeld | Asia Markt Thien Phu',
    desc: 'Frische Kräuter &amp; Gemüse, Nudeln &amp; Ramen, Saucen, Tofu, Tee, Snacks und Tiefkühlprodukte – das Sortiment des Asia Markt Thien Phu in Langenfeld (Rheinland).',
    url: 'https://www.asiamarkt.info/sortiment.html'
}, sortiment, 'sortiment.html'));

fs.writeFileSync('ueber-uns.html', assemble({
    title: 'Tradition &amp; Auswahl – Über uns | Asia Markt Thien Phu Langenfeld',
    desc: 'Inhabergeführt seit 2007: Der Asia Markt Thien Phu in Langenfeld wählt asiatische Lebensmittel mit Sorgfalt und Fachkenntnis aus – von Pho bis Ramen.',
    url: 'https://www.asiamarkt.info/ueber-uns.html'
}, ueberUns, 'ueber-uns.html'));

fs.writeFileSync('kontakt.html', assemble({
    title: 'Kontakt &amp; Öffnungszeiten | Asia Markt Thien Phu Langenfeld',
    desc: 'Asia Markt Thien Phu, Hauptstraße 74, 40764 Langenfeld (Rheinland). Mo–Fr 9–18 Uhr, Sa 9–14 Uhr. Telefon 02173 1065590 – mit Anfahrt, Parken und Bezahlung.',
    url: 'https://www.asiamarkt.info/kontakt.html'
}, kontakt, 'kontakt.html'));

console.log('OK: index.html neu geschrieben, sortiment/ueber-uns/kontakt.html erzeugt');
