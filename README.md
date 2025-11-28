# MMM-CountDown

Ein [MagicMirror�](https://magicmirror.builders/) Modul zum Anzeigen eines Countdowns zu einem bestimmten Event oder Datum.

![MMM-CountDown Screenshot](screenshots/screenshot.png)

## Features

( **Flexible Konfiguration**: Zeige oder verstecke Wochen, Tage, Stunden, Minuten und Sekunden nach Belieben

<
 **Mehrsprachig**: Unterst�tzung f�r Deutsch, Englisch, Spanisch, Franz�sisch und Niederl�ndisch

<� **Anpassbares Design**: Zwei Display-Stile (Zeile oder Spalte) und vollst�ndig anpassbare CSS-Klassen

� **Ressourcenschonend**: Automatisches Pausieren bei ausgeblendetem Modul (suspend/resume)

= **Event-Ende-Benachrichtigung**: Optionale Nachricht, wenn der Countdown abgelaufen ist

=� **Responsive**: Optimiert f�r verschiedene Bildschirmgr��en

## Installation

1. Navigiere in das MagicMirror Modul-Verzeichnis:
```bash
cd ~/MagicMirror/modules
```

2. Klone dieses Repository:
```bash
git clone https://github.com/rxf-sys/MMM-Countdown.git
```

3. Installiere die Abh�ngigkeiten (optional, nur f�r Entwickler):
```bash
cd MMM-Countdown
npm install
```

## Konfiguration

F�ge das Modul zur `config/config.js` Datei deines MagicMirror hinzu:

### Minimale Konfiguration

```javascript
{
    module: "MMM-CountDown",
    position: "top_left",
    config: {
        event: "Weihnachten 2025",
        date: "2025-12-24"
    }
}
```

### Vollst�ndige Konfiguration mit allen Optionen

```javascript
{
    module: "MMM-CountDown",
    position: "top_left",
    config: {
        event: "Mein Geburtstag",           // Event-Titel
        date: "2025-06-15",                 // Zieldatum (YYYY-MM-DD)
        showWeeks: false,                   // Wochen anzeigen
        showDays: true,                     // Tage anzeigen
        showHours: true,                    // Stunden anzeigen
        showMinutes: true,                  // Minuten anzeigen
        showSeconds: true,                  // Sekunden anzeigen
        customInterval: 1000,               // Update-Intervall in Millisekunden
        daysLabel: "d",                     // Label f�r Tage
        hoursLabel: "h",                    // Label f�r Stunden
        minutesLabel: "m",                  // Label f�r Minuten
        secondsLabel: "s",                  // Label f�r Sekunden
        weeksLabel: "w",                    // Label f�r Wochen
        useTextLabels: false,               // Textlabels statt Abk�rzungen verwenden
        displayStyle: "row",                // "row" oder "column"
        fadeSpeed: 2000,                    // Fade-Animation in Millisekunden
        showEnd: true,                      // Nachricht anzeigen wenn Countdown abgelaufen
        endText: "Das Event hat begonnen!", // Text f�r abgelaufenen Countdown
        compactMode: false,                 // Null-Werte ausblenden
        timezone: null                      // Zeitzone (null = System-Zeitzone)
    }
}
```

## Konfigurationsoptionen

| Option | Typ | Standard | Beschreibung |
|--------|-----|----------|--------------|
| `event` | `string` | `"New Year 2026"` | Der Name des Events |
| `date` | `string` | `"2026-01-01"` | Zieldatum im Format YYYY-MM-DD |
| `showWeeks` | `boolean` | `false` | Zeigt Wochen an |
| `showDays` | `boolean` | `true` | Zeigt Tage an |
| `showHours` | `boolean` | `true` | Zeigt Stunden an |
| `showMinutes` | `boolean` | `true` | Zeigt Minuten an |
| `showSeconds` | `boolean` | `true` | Zeigt Sekunden an |
| `customInterval` | `number` | `1000` | Update-Intervall in Millisekunden (min. 100) |
| `daysLabel` | `string` | `"d"` | Label f�r Tage |
| `hoursLabel` | `string` | `"h"` | Label f�r Stunden |
| `minutesLabel` | `string` | `"m"` | Label f�r Minuten |
| `secondsLabel` | `string` | `"s"` | Label f�r Sekunden |
| `weeksLabel` | `string` | `"w"` | Label f�r Wochen |
| `useTextLabels` | `boolean` | `false` | Verwendet �bersetzungen statt Abk�rzungen |
| `displayStyle` | `string` | `"row"` | Layout: "row" (horizontal) oder "column" (vertikal) |
| `fadeSpeed` | `number` | `2000` | Fade-Animation Geschwindigkeit in Millisekunden |
| `showEnd` | `boolean` | `true` | Zeigt Nachricht wenn Countdown abgelaufen ist |
| `endText` | `string` | `"The event has started!"` | Text f�r abgelaufenen Countdown |
| `compactMode` | `boolean` | `false` | Blendet Zeiteinheiten mit Wert 0 aus |
| `timezone` | `string` | `null` | Zeitzone (z.B. "Europe/Berlin", null = System) |

## Beispiele

### Countdown zu Silvester 2025
```javascript
{
    module: "MMM-CountDown",
    position: "top_center",
    config: {
        event: "Silvester 2025",
        date: "2025-12-31 23:59:59",
        showSeconds: true,
        displayStyle: "row",
        useTextLabels: true
    }
}
```

### Countdown zum Urlaub (ohne Sekunden)
```javascript
{
    module: "MMM-CountDown",
    position: "middle_center",
    config: {
        event: "Sommerurlaub 