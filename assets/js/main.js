// Gemeinsames JS für alle Seiten — Asia Markt Thien Phu
// (Modals, Formulare, Mobile-Menü, Maps-Fassade, Bewertungen, Alt-Hash-Weiterleitung)

const W3F_KEY = 'f91a4036-f6ba-46ed-9a65-dc7d9fbabbb9';

// E-Mail nie als Klartext im HTML – wird nur per JS zusammengesetzt
function _em() { return ['asia.since2007', 'gmail.com'].join(String.fromCharCode(64)); }

function initEmailLinks() {
    const addr = _em();
    document.querySelectorAll('[data-email-link]').forEach(el => {
        el.href = 'mailto:' + addr;
        el.textContent = addr.replace('@', '[at]');
    });
}

// ---------------------------------------------------------------------------
// Modal-Templates (werden erst bei Bedarf in #modal-root eingesetzt)
// ---------------------------------------------------------------------------
const MODAL_TEMPLATES = `
    <!-- Vorschläge-Modal -->
    <div id="suggestion-modal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 hidden" onclick="if(event.target===this) closeSuggestionModal()">
        <div class="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative">
            <button onclick="closeSuggestionModal()" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-brand-beige hover:bg-brand-earth hover:text-white text-gray-500 transition text-lg font-bold">&times;</button>

            <div class="text-center mb-6">
                <div class="w-14 h-14 bg-brand-beige rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="svg-icon text-brand-gold text-2xl" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true"><path d="M292.9 384c7.3-22.3 21.9-42.5 38.4-59.9 32.7-34.4 52.7-80.9 52.7-132.1 0-106-86-192-192-192S0 86 0 192c0 51.2 20 97.7 52.7 132.1 16.5 17.4 31.2 37.6 38.4 59.9l201.7 0zM288 432l-192 0 0 16c0 44.2 35.8 80 80 80l32 0c44.2 0 80-35.8 80-80l0-16zM184 112c-39.8 0-72 32.2-72 72 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-66.3 53.7-120 120-120 13.3 0 24 10.7 24 24s-10.7 24-24 24z"/></svg>
                </div>
                <h3 class="font-serif font-bold text-2xl text-brand-darkGreen mb-1">Ihr Vorschlag</h3>
                <p class="text-gray-500 text-sm">Wir freuen uns über jede Idee – für das Geschäft oder neue Artikel! Da keine Kontaktdaten erfasst werden, ist eine persönliche Antwort leider nicht möglich. Bei Fragen bitte per E-Mail an <span class="font-semibold">asia.since2007[at]gmail.com</span>.</p>
            </div>

            <!-- Honeypot Bot-Falle -->
            <input type="text" id="suggestion-honeypot" style="display:none" tabindex="-1" autocomplete="off">

            <div id="suggestion-form-area" class="space-y-4">
                <div>
                    <p class="text-sm font-bold text-brand-darkGreen mb-2">Kategorie</p>
                    <div class="flex flex-wrap gap-2" id="suggestion-categories">
                        <button type="button" onclick="selectCategory(this)" data-value="Neuer Artikel" class="suggestion-cat px-4 py-2 rounded-full text-sm font-medium border-2 border-brand-green/30 text-gray-600 hover:border-brand-green hover:text-brand-darkGreen transition">
                            📦 Neuer Artikel
                        </button>
                        <button type="button" onclick="selectCategory(this)" data-value="Allgemeines" class="suggestion-cat px-4 py-2 rounded-full text-sm font-medium border-2 border-brand-green/30 text-gray-600 hover:border-brand-green hover:text-brand-darkGreen transition">
                            💡 Allgemeines
                        </button>
                    </div>
                </div>

                <div>
                    <p class="text-sm font-bold text-brand-darkGreen mb-2">Ihre Nachricht</p>
                    <textarea id="suggestion-text" rows="4" placeholder="Was möchten Sie uns mitteilen?" class="w-full border-2 border-brand-green/20 rounded-2xl p-4 text-gray-700 text-sm focus:outline-none focus:border-brand-green resize-none"></textarea>
                </div>

                <button id="suggestion-send-btn" onclick="submitSuggestion()" class="w-full bg-brand-green hover:bg-brand-darkGreen text-white font-bold py-3 rounded-full transition duration-300 flex items-center justify-center gap-2">
                    <svg class="svg-icon" viewBox="0 0 576 512" fill="currentColor" aria-hidden="true"><path d="M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"/></svg> Vorschlag senden
                </button>
                <p id="suggestion-error" class="hidden text-center text-xs text-red-500">Fehler beim Senden. Bitte versuchen Sie es später erneut.</p>
            </div>

            <!-- Erfolgsmeldung -->
            <div id="suggestion-success" class="hidden text-center py-4">
                <svg class="svg-icon text-brand-green text-4xl mb-4 block" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z"/></svg>
                <h3 class="font-serif font-bold text-xl text-brand-darkGreen mb-2">Vielen Dank!</h3>
                <p class="text-gray-600 text-sm">Ihr Vorschlag ist bei uns angekommen. Wir freuen uns über Ihre Idee!</p>
            </div>
        </div>
    </div>

    <!-- Bewertungs-Modal -->
    <div id="review-modal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 hidden" onclick="if(event.target===this) closeReviewModal()">
        <div class="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl relative">
            <button onclick="closeReviewModal()" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-brand-beige hover:bg-brand-earth hover:text-white text-gray-500 transition text-lg font-bold">&times;</button>

            <!-- Schritt 1: Zufrieden? -->
            <div id="review-step-1" class="text-center">
                <div class="w-16 h-16 bg-brand-beige rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="svg-icon text-brand-gold text-2xl" viewBox="0 0 576 512" fill="currentColor" aria-hidden="true"><path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>
                </div>
                <h3 class="font-serif font-bold text-2xl text-brand-darkGreen mb-2">Waren Sie zufrieden?</h3>
                <p class="text-gray-500 mb-7">Wir freuen uns über Ihr Feedback!</p>
                <div class="flex gap-3">
                    <button onclick="reviewYes()" class="flex-1 inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-darkGreen text-white font-bold py-3 rounded-full transition duration-300">
                        <svg class="svg-icon" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M80 160c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32L0 192c0-17.7 14.3-32 32-32l48 0zM270.6 16C297.9 16 320 38.1 320 65.4l0 4.2c0 6.8-1.3 13.6-3.8 19.9L288 160 448 160c26.5 0 48 21.5 48 48 0 19.7-11.9 36.6-28.9 44 17 7.4 28.9 24.3 28.9 44 0 23.4-16.8 42.9-39 47.1 4.4 7.3 7 15.8 7 24.9 0 22.2-15 40.8-35.4 46.3 2.2 5.5 3.4 11.5 3.4 17.7 0 26.5-21.5 48-48 48l-87.9 0c-36.3 0-71.6-12.4-99.9-35.1L184 435.2c-15.2-12.1-24-30.5-24-50l0-186.6c0-14.9 3.5-29.6 10.1-42.9L226.3 43.3C234.7 26.6 251.8 16 270.6 16z"/></svg> Ja
                    </button>
                    <button onclick="reviewNo()" class="flex-1 inline-flex items-center justify-center gap-2 bg-brand-beige hover:bg-brand-earth hover:text-white text-brand-earth font-bold py-3 rounded-full transition duration-300">
                        <svg class="svg-icon" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M384 32c26.5 0 48 21.5 48 48 0 6.3-1.3 12.2-3.4 17.7 20.4 5.5 35.4 24.1 35.4 46.3 0 9.1-2.6 17.6-7 24.9 22.2 4.2 39 23.7 39 47.1 0 19.7-11.9 36.6-28.9 44 17 7.4 28.9 24.3 28.9 44 0 26.5-21.5 48-48 48l-160 0 28.2 70.4c2.5 6.3 3.8 13.1 3.8 19.9l0 4.2c0 27.3-22.1 49.4-49.4 49.4-18.7 0-35.8-10.6-44.2-27.3L170.1 356.3c-6.7-13.3-10.1-28-10.1-42.9l0-186.6c0-19.4 8.9-37.8 24-50l12.2-9.7C224.6 44.4 259.8 32 296.1 32L384 32zM80 96c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32L0 128c0-17.7 14.3-32 32-32l48 0z"/></svg> Nein
                    </button>
                </div>
            </div>

            <!-- Schritt 2b: Nicht zufrieden -->
            <div id="review-step-no" class="hidden text-center">
                <div class="w-16 h-16 bg-brand-beige rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="svg-icon text-brand-earth text-2xl" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"/></svg>
                </div>
                <h3 class="font-serif font-bold text-xl text-brand-darkGreen mb-2">Das tut uns wirklich leid!</h3>
                <p class="text-gray-600 text-sm leading-relaxed mb-4">
                    Was können wir verbessern? Schreiben Sie uns kurz.<br>
                    <span class="text-xs text-gray-400">Da keine Kontaktdaten erfasst werden, ist eine persönliche Antwort leider nicht möglich. Bei Fragen: <span class="font-semibold">asia.since2007[at]gmail.com</span></span>
                </p>
                <div class="text-left space-y-3">
                    <!-- Honeypot Bot-Falle -->
                    <input type="text" id="feedback-honeypot" style="display:none" tabindex="-1" autocomplete="off">
                    <textarea id="feedback-text" rows="3" placeholder="Ihr Feedback…" class="w-full border-2 border-brand-green/20 rounded-2xl p-3 text-gray-700 text-sm focus:outline-none focus:border-brand-green resize-none"></textarea>
                    <button id="feedback-send-btn" onclick="submitFeedback()" class="w-full inline-flex items-center justify-center gap-2 bg-brand-earth hover:bg-brand-darkGreen text-white font-bold py-3 rounded-full transition duration-300">
                        <svg class="svg-icon" viewBox="0 0 576 512" fill="currentColor" aria-hidden="true"><path d="M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"/></svg> Senden
                    </button>
                    <p id="feedback-error" class="hidden mt-2 text-center text-xs text-red-500">Fehler beim Senden. Bitte versuchen Sie es später erneut.</p>
                </div>
            </div>
        </div>
    </div>
`;

const SEND_ICON = '<svg class="svg-icon" viewBox="0 0 576 512" fill="currentColor" aria-hidden="true"><path d="M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"/></svg>';
const SPINNER_ICON = '<svg class="svg-icon fa-spin" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M208 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm0 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM48 208a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm368 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM75 369.1A48 48 0 1 1 142.9 437 48 48 0 1 1 75 369.1zM75 75A48 48 0 1 1 142.9 142.9 48 48 0 1 1 75 75zM437 369.1A48 48 0 1 1 369.1 437 48 48 0 1 1 437 369.1z"/></svg>';
const STAR_ICON = '<svg class="svg-icon" viewBox="0 0 576 512" fill="currentColor" aria-hidden="true"><path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>';
const GOOGLE_ICON = '<svg class="svg-icon" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M500 261.8C500 403.3 403.1 504 260 504 122.8 504 12 393.2 12 256S122.8 8 260 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9c-88.3-85.2-252.5-21.2-252.5 118.2 0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9l-140.8 0 0-85.3 236.1 0c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>';
const CHECK_CIRCLE_ICON = '<svg class="svg-icon text-brand-green text-4xl mb-4 block" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true"><path d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z"/></svg>';
const COPIED_ICON = '<svg class="svg-icon text-brand-green w-4" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>';

const REVIEW_FALLBACK_DATA = [
    { name: 'evgenji', initial: 'E', color: 'bg-brand-green', text: '„Kleiner Laden mit großer Auswahl für die asiatische Küche! Im Asia Markt Thien Phu in Langenfeld findet man alles, was man für authentische asiatische Gerichte benötigt. Ob spezielle Gewürze, frische Zutaten oder exotische Saucen - die Regale sind gut bestückt. Der Inhaber ist äußerst freundlich und steht mit Rat und Tat zur Seite, gibt hilfreiche Tipps und Empfehlungen. Die persönliche Beratung macht den Einkauf zu einem besonderen Erlebnis. Ein Muss für alle Liebhaber der asiatischen Küche!“' },
    { name: 'André', initial: 'A', color: 'bg-brand-earth', text: '„Der Inhaber ist sehr Hilfsbereit und hat auch immer einen guten Ratschlag wenn man mal eine Frage zu den unterschiedlichen Gerichten hat. Trotz geringer Ladenfläche ist die Auswahl super wie ich finde. Für mich der beste Asia Shop in der ganzen Umgebung !“' },
    { name: 'Rachid', initial: 'R', color: 'bg-brand-accent text-brand-darkGreen', text: '„Der Laden ist zwar klein aber hat sehr viel Auswahl und die Besitzer sind sehr nett.Ich komme Mindestens 10 mal in Monat.Er hat sehr viel Auswahl von Ramen bis Fisch zu Soßen, Getränken usw.“' }
];
let reviewsInitialized = false;
let modalsInitialized = false;

function ensureModals() {
    if (modalsInitialized) return;
    modalsInitialized = true;
    document.getElementById('modal-root').innerHTML = MODAL_TEMPLATES;
}

function ensureReviewsLoaded() {
    if (reviewsInitialized) return;
    reviewsInitialized = true;
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;
    const stars = STAR_ICON.repeat(5);
    REVIEW_FALLBACK_DATA.forEach(review => {
        const card = document.createElement('div');
        card.className = 'bg-brand-cream p-8 rounded-[2rem] soft-border shadow-sm flex flex-col justify-between';
        card.innerHTML = `
            <div>
                <div class="flex text-brand-gold text-sm mb-4">${stars}</div>
                <p class="text-gray-700 leading-relaxed mb-6 font-medium">${review.text}</p>
            </div>
            <div class="flex items-center gap-3 pt-4 border-t border-brand-green/10">
                <div class="w-10 h-10 rounded-full ${review.color} text-white flex items-center justify-center font-bold font-serif shadow-sm">${review.initial}</div>
                <div>
                    <p class="font-bold text-brand-darkGreen text-sm">${review.name}</p>
                    <div class="flex items-center gap-1 text-xs text-gray-500">${GOOGLE_ICON} Google Rezension</div>
                </div>
            </div>`;
        grid.appendChild(card);
    });
    const fallback = document.getElementById('reviews-fallback');
    if (fallback) fallback.classList.add('hidden');
}

function openSuggestionModal() {
    ensureModals();
    document.getElementById('suggestion-modal').classList.remove('hidden');
    document.getElementById('suggestion-text').value = '';
    document.getElementById('suggestion-form-area').classList.remove('hidden');
    document.getElementById('suggestion-success').classList.add('hidden');
    document.getElementById('suggestion-error').classList.add('hidden');
    const btn = document.getElementById('suggestion-send-btn');
    btn.disabled = false;
    btn.innerHTML = SEND_ICON + ' Vorschlag senden';
    document.querySelectorAll('.suggestion-cat').forEach(b => b.classList.remove('bg-brand-green', 'text-white', 'border-brand-green'));
}
function closeSuggestionModal() {
    document.getElementById('suggestion-modal').classList.add('hidden');
}
function selectCategory(btn) {
    document.querySelectorAll('.suggestion-cat').forEach(b => b.classList.remove('bg-brand-green', 'text-white', 'border-brand-green'));
    btn.classList.add('bg-brand-green', 'text-white', 'border-brand-green');
}
async function submitSuggestion() {
    if (document.getElementById('suggestion-honeypot').value) return; // Bot erkannt
    const category = document.querySelector('.suggestion-cat.bg-brand-green')?.dataset.value || 'Allgemein';
    const text = document.getElementById('suggestion-text').value.trim();
    if (!text) { document.getElementById('suggestion-text').focus(); return; }
    const btn = document.getElementById('suggestion-send-btn');
    btn.disabled = true;
    btn.innerHTML = SPINNER_ICON + ' Wird gesendet…';
    try {
        const fd = new FormData();
        fd.append('access_key', W3F_KEY);
        fd.append('subject', 'Vorschlag: ' + category);
        fd.append('message', text);
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
        const data = await res.json();
        if (res.ok && data.success) {
            document.getElementById('suggestion-form-area').classList.add('hidden');
            document.getElementById('suggestion-success').classList.remove('hidden');
        } else throw new Error(data.message);
    } catch {
        btn.disabled = false;
        btn.innerHTML = SEND_ICON + ' Vorschlag senden';
        document.getElementById('suggestion-error').classList.remove('hidden');
    }
}

async function submitFeedback() {
    if (document.getElementById('feedback-honeypot').value) return;
    const text = document.getElementById('feedback-text').value.trim();
    if (!text) { document.getElementById('feedback-text').focus(); return; }
    const btn = document.getElementById('feedback-send-btn');
    btn.disabled = true;
    btn.innerHTML = SPINNER_ICON + ' Wird gesendet…';
    try {
        const fd = new FormData();
        fd.append('access_key', W3F_KEY);
        fd.append('subject', 'Kundenfeedback (nicht zufrieden)');
        fd.append('message', text);
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
        const data = await res.json();
        if (res.ok && data.success) {
            document.getElementById('review-step-no').innerHTML = `
                <div class="text-center py-4">
                    ${CHECK_CIRCLE_ICON}
                    <h3 class="font-serif font-bold text-xl text-brand-darkGreen mb-2">Vielen Dank!</h3>
                    <p class="text-gray-600 text-sm">Ihr Feedback ist bei uns angekommen.</p>
                </div>`;
        } else throw new Error();
    } catch {
        btn.disabled = false;
        btn.innerHTML = SEND_ICON + ' Senden';
        document.getElementById('feedback-error').classList.remove('hidden');
    }
}

function openReviewModal() {
    ensureModals();
    document.getElementById('review-modal').classList.remove('hidden');
    document.getElementById('review-step-1').classList.remove('hidden');
    document.getElementById('review-step-no').classList.add('hidden');
}
function closeReviewModal() {
    document.getElementById('review-modal').classList.add('hidden');
}
function reviewYes() {
    closeReviewModal();
    window.open('https://g.page/r/CXIxh8y-sMCkEBM/review', '_blank', 'noopener,noreferrer');
}
function reviewNo() {
    document.getElementById('review-step-1').classList.add('hidden');
    document.getElementById('review-step-no').classList.remove('hidden');
}

function openSharePanel() {
    const mapsUrl = 'https://maps.app.goo.gl/AYB2Qmshj8aWzXBR7';
    if (navigator.share) {
        navigator.share({
            title: 'Asia Markt Thien Phu – Langenfeld',
            text: 'Entdecke den Asia Markt Thien Phu in Langenfeld – dein lokaler asiatischer Supermarkt!',
            url: mapsUrl
        }).catch(() => {});
    } else {
        const panel = document.getElementById('share-panel');
        panel.classList.toggle('hidden');
    }
}

function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = COPIED_ICON + ' Kopiert!';
        setTimeout(() => { btn.innerHTML = original; }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Alt-Hash-Links der früheren Single-Page-Version auf echte URLs umleiten (P3.5)
    const HASH_REDIRECTS = {
        'sortiment': 'sortiment.html',
        'ueber-uns': 'ueber-uns.html',
        'kontakt': 'kontakt.html',
        'impressum': 'impressum.html',
        'datenschutz': 'datenschutz.html',
        'start': ''
    };
    const onStartPage = /^\/(index\.html)?$/.test(window.location.pathname);
    function redirectOldHash() {
        const hash = window.location.hash.substring(1);
        if (!onStartPage || !(hash in HASH_REDIRECTS)) return false;
        if (hash !== 'start') {
            window.location.replace('/' + HASH_REDIRECTS[hash]);
            return true;
        }
        history.replaceState(null, '', '/');
        return false;
    }
    if (redirectOldHash()) return;
    window.addEventListener('hashchange', redirectOldHash);

    initEmailLinks();

    const menuBtn = document.getElementById('mobile-menu-button');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            const isOpen = menu.classList.toggle('hidden') === false;
            menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // Google Maps erst nach Klick laden (Performance + Datenschutz) — nur Kontaktseite
    const mapsBtn = document.getElementById('maps-load-btn');
    if (mapsBtn) {
        mapsBtn.addEventListener('click', () => {
            const iframe = document.createElement('iframe');
            iframe.title = 'Standort Asia Markt Thien Phu auf Google Maps';
            iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17135.738250219!2d6.942283857049664!3d51.10095676347082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x417196e0d88ec68b%3A0xa4c0b0becc873172!2sAsia%20Markt%20Thien%20Phu!5e1!3m2!1sde!2sde!4v1776007432899!5m2!1sde!2sde';
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.style.border = '0';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'no-referrer-when-downgrade';
            const container = document.getElementById('maps-container');
            container.innerHTML = '';
            container.appendChild(iframe);
        });
    }

    // Bewertungs-Marquee: echte Google-Bewertungen als Endlosband — nur Startseite (P4b.1)
    const marqueeTrack = document.querySelector('.marquee__track');
    if (marqueeTrack) {
        const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        fetch('assets/data/bewertungen-kuratiert.json')
            .then(r => r.json())
            .then(({ marquee_auswahl: reviews }) => {
                if (!Array.isArray(reviews) || reviews.length === 0) return;
                const card = (r, clone = false) => `
                    <li class="w-80 shrink-0"${clone ? ' aria-hidden="true"' : ''}>
                        <figure class="h-full bg-brand-cream soft-border rounded-2xl p-6 shadow-sm flex flex-col">
                            <div class="text-brand-gold mb-3 tracking-wider" aria-label="5 von 5 Sternen">★★★★★</div>
                            <blockquote class="text-gray-700 text-sm leading-relaxed flex-1">„${esc(r.text)}“</blockquote>
                            <figcaption class="mt-4 text-sm font-semibold text-brand-darkGreen">
                                ${esc(r.author)} <span class="font-normal text-gray-400">· Google</span>
                            </figcaption>
                        </figure>
                    </li>`;
                marqueeTrack.innerHTML = reviews.map(r => card(r)).join('')
                                       + reviews.map(r => card(r, true)).join('');
            })
            .catch(() => { /* Marquee bleibt leer, Seite funktioniert weiter */ });
    }

    // Bewertungen erst kurz vor Sichtbarkeit laden — nur Startseite
    const bewertungen = document.getElementById('bewertungen');
    if (bewertungen) {
        const reviewObserver = new IntersectionObserver((entries, observer) => {
            if (entries.some(entry => entry.isIntersecting)) {
                ensureReviewsLoaded();
                observer.disconnect();
            }
        }, { rootMargin: '300px 0px' });
        reviewObserver.observe(bewertungen);

        // --- Google Places API: Echte Bewertungen laden (nur bei Bedarf) ---
        // Tragen Sie hier Ihren Google API-Key (Places API aktiviert) und Ihre Place-ID ein.
        // Den API-Key erhalten Sie in der Google Cloud Console (console.cloud.google.com).
        // Die Place-ID finden Sie über: https://developers.google.com/maps/documentation/places/web-service/place-id
        const GOOGLE_PLACES_API_KEY = '';  // z. B. 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        const GOOGLE_PLACE_ID       = '';  // z. B. 'ChIJXXXXXXXXXXXXXXXXXXXXXXXX'

        if (GOOGLE_PLACES_API_KEY && GOOGLE_PLACE_ID) {
            const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?fields=reviews&languageCode=de&key=${GOOGLE_PLACES_API_KEY}`;

            const loadRealReviews = () => fetch(url)
                .then(res => res.json())
                .then(data => {
                    ensureReviewsLoaded();
                    const reviews = (data.reviews || []).filter(r => r.rating >= 4).slice(0, 3);
                    if (reviews.length === 0) return;

                    const grid = document.getElementById('reviews-grid');
                    const fallback = document.getElementById('reviews-fallback');

                    reviews.forEach(review => {
                        const stars = Array(review.rating).fill(STAR_ICON).join('');
                        const initial = (review.authorAttribution?.displayName || '?')[0].toUpperCase();
                        const name = review.authorAttribution?.displayName || 'Google-Nutzer';
                        const text = review.text?.text || '';
                        const date = review.relativePublishTimeDescription || '';

                        const card = document.createElement('div');
                        card.className = 'bg-brand-cream p-8 rounded-[2rem] soft-border shadow-sm flex flex-col justify-between';
                        card.innerHTML = `
                            <div>
                                <div class="flex justify-between items-start mb-4">
                                    <div class="flex text-brand-gold text-sm">${stars}</div>
                                    <span class="text-xs font-semibold text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-100 shadow-sm">${date}</span>
                                </div>
                                <p class="text-gray-700 leading-relaxed mb-6 font-medium">"${text}"</p>
                            </div>
                            <div class="flex items-center gap-3 pt-4 border-t border-brand-green/10">
                                <div class="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold font-serif shadow-sm">${initial}</div>
                                <div>
                                    <p class="font-bold text-brand-darkGreen text-sm">${name}</p>
                                    <div class="flex items-center gap-1 text-xs text-gray-500">${GOOGLE_ICON} Google Rezension</div>
                                </div>
                            </div>`;
                        grid.appendChild(card);
                    });

                    fallback.classList.add('hidden');
                    grid.classList.remove('hidden');
                    grid.classList.add('grid');
                })
                .catch(() => { /* Fallback bleibt sichtbar */ });

            loadRealReviews();
        }
    }
});
