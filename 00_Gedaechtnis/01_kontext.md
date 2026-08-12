# 01 — Kontext

> **Diese Inhalte stehen gesammelt in [`gedaechtnis-gesamt.md`](gedaechtnis-gesamt.md).** Jene Datei ist historisch als **eine** durchgehende Wissensdatei geführt worden, deren sieben Abschnitte genau den kanonischen Kerndateien entsprechen. Bei der Vereinheitlichung am 31.07.2026 wurde sie bewusst **nicht** zerschnitten, weil ihre Abschnitte aufeinander verweisen und das Änderungsprotokoll am Ende sie zusammenhält.

Maßgeblich sind **Abschnitt 1 (Stammdaten/NAP)** und **Abschnitt 2 (Geschäftskontext)** der Gesamtdatei. Die NAP-Daten (Name, Adresse, Telefon) sind verbindlich und müssen überall identisch verwendet werden — Footer, Kontaktseite, JSON-LD-Schema, Impressum und Google Business Profile.

## Neue Einträge

_Neue Kontextangaben können wahlweise hier oder direkt im entsprechenden Abschnitt von `gedaechtnis-gesamt.md` ergänzt werden — aber konsequent an **einer** Stelle. Wird diese Datei genutzt, gehört ein Verweis darauf in den betreffenden Abschnitt der Gesamtdatei._

### Rechtsform und Betriebsgröße (Auskunft des Inhabers, 12.08.2026)

**Rechtsform:** keine besondere — ein selbstständiges Ladengeschäft, geführt von
Van Tran als Inhaber. Also ein **Einzelunternehmen**, kein Handelsregistereintrag,
keine juristische Person. Daraus folgt für das Impressum: § 5 Abs. 1 Nr. 1 DDG
verlangt Rechtsform und Vertretungsberechtigten nur bei juristischen Personen;
die vorhandene Angabe „Asia Markt Thien Phu · Inhaber: Van Tran" ist vollständig.

**Betriebsgröße:** der Inhaber und **eine** angestellte Person, zusammen zwei.

Diese Zahl entscheidet gleich drei Rechtsfragen, deshalb steht sie hier und nicht
nur im Änderungsprotokoll:

| Norm | Schwelle | Folge hier |
|---|---|---|
| § 36 Abs. 3 VSBG | mehr als 10 Beschäftigte am 31.12. des Vorjahres | Informationspflicht zur Verbraucherschlichtung entfällt. Der Satz im Impressum ist freiwillig und darf bleiben. |
| § 38 Abs. 1 BDSG | mindestens 20 Personen ständig mit automatisierter Verarbeitung | kein Datenschutzbeauftragter zu benennen. So steht es in Abschnitt 2 der Datenschutzerklärung. |
| BFSG (seit 28.06.2025) | Kleinstunternehmen: unter 10 Beschäftigte **und** höchstens 2 Mio. € Jahresumsatz | nicht anwendbar — und zusätzlich greift die Ausnahme für reine Informationsseiten ohne Vertragsschluss. |

### Domain und DNS (geprüft am 12.08.2026)

Die Domain `asiamarkt.info` ist bei **IONOS** gekauft, dort liegen auch die
Nameserver (`ns1018.ui-dns.biz` und Geschwister). Ausgeliefert wird von
**GitHub Pages**, direkt und ohne CDN davor (`Server: GitHub.com`).

| Eintrag | Wert |
|---|---|
| `asiamarkt.info` A | 185.199.108.153, .109.153, .110.153, .111.153 (GitHub Pages) |
| `www` CNAME | `asiasince2007.github.io` |
| MX | `mx00.ionos.de`, `mx01.ionos.de` |
| TXT | `v=spf1 include:_spf-eu.ionos.com ~all` |
| CAA | keine gesetzt |

**Die MX- und SPF-Einträge sind IONOS-Voreinstellung, kein Postfach im Betrieb.**
Der Inhaber hat am 12.08.2026 bestätigt, dass er keine E-Mail auf der Domain
nutzt; die Adresse im Impressum ist eine GMail-Adresse. Wer künftig das DNS
umzieht, muss die Einträge trotzdem mitnehmen — kostenlos und sichert die
Option ab, später doch ein Postfach einzurichten.

Dass **keine CAA-Records** gesetzt sind, ist wichtig für GitHub Pages: Existierte
auch nur einer, müsste er `letsencrypt.org` enthalten, sonst bekommt die Domain
kein HTTPS-Zertifikat mehr.

**Weiterhin offen:** ob eine Umsatzsteuer-Identifikationsnummer nach § 27a UStG
existiert. Falls ja, ist ihre Angabe im Impressum nach § 5 Abs. 1 Nr. 6 DDG
Pflicht; der Platzhalter steht als `TODO(inhaber)` in `impressum.html`.
Die Steuernummer vom Finanzamt ist **nicht** gemeint und gehört nicht ins
Impressum.

---

_Angelegt am 31.07.2026._
