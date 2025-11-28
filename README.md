# MMM-Countdown

Ein [MagicMirror²](https://magicmirror.builders/) Modul zum Anzeigen eines Countdowns zu einem bestimmten Event oder Datum.

![MMM-Countdown Screenshot](screenshots/screenshot.png)

## Features

**Flexible Konfiguration**: Zeige oder verstecke Wochen, Tage, Stunden, Minuten und Sekunden nach Belieben

 **Mehrsprachig**: Unterstützung für Deutsch, Englisch, Spanisch, Französisch und Niederländisch

**Anpassbares Design**: Zwei Display-Stile (Zeile oder Spalte) und vollständig anpassbare CSS-Klassen

**Ressourcenschonend**: Automatisches Pausieren bei ausgeblendetem Modul (suspend/resume)

**Event-Ende-Benachrichtigung**: Optionale Nachricht, wenn der Countdown abgelaufen ist

**Responsive**: Optimiert für verschiedene Bildschirmgrößen

## Installation

1. Navigiere in das MagicMirror Modul-Verzeichnis:
```bash
cd ~/MagicMirror/modules
```

2. Klone dieses Repository:
```bash
git clone https://github.com/rxf-sys/MMM-Countdown.git
```

3. Installiere die Abhängigkeiten (optional, nur für Entwickler):
```bash
cd MMM-Countdown
npm install
```

## Konfiguration

Füge das Modul zur `config/config.js` Datei deines MagicMirror hinzu:

### Minimale Konfiguration

```javascript
{
	module: "MMM-Countdown",
	position: "top_left",
	config: {
		event: "Weihnachten 2025",
		date: "2025-12-24"
	}
}
```

### Vollständige Konfiguration mit allen Optionen

```javascript
{
	module: "MMM-Countdown",
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
		daysLabel: "d",                     // Label für Tage
		hoursLabel: "h",                    // Label für Stunden
		minutesLabel: "m",                  // Label für Minuten
		secondsLabel: "s",                  // Label für Sekunden
		weeksLabel: "w",                    // Label für Wochen
		useTextLabels: false,               // Textlabels statt Abkürzungen verwenden
		displayStyle: "row",                // "row" oder "column"
		fadeSpeed: 2000,                    // Fade-Animation in Millisekunden
		showEnd: true,                      // Nachricht anzeigen wenn Countdown abgelaufen
		endText: "Das Event hat begonnen!", // Text für abgelaufenen Countdown
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
| `daysLabel` | `string` | `"d"` | Label für Tage |
| `hoursLabel` | `string` | `"h"` | Label für Stunden |
| `minutesLabel` | `string` | `"m"` | Label für Minuten |
| `secondsLabel` | `string` | `"s"` | Label für Sekunden |
| `weeksLabel` | `string` | `"w"` | Label für Wochen |
| `useTextLabels` | `boolean` | `false` | Verwendet Übersetzungen statt Abkürzungen |
| `displayStyle` | `string` | `"row"` | Layout: "row" (horizontal) oder "column" (vertikal) |
| `fadeSpeed` | `number` | `2000` | Fade-Animation Geschwindigkeit in Millisekunden |
| `showEnd` | `boolean` | `true` | Zeigt Nachricht wenn Countdown abgelaufen ist |
| `endText` | `string` | `"The event has started!"` | Text für abgelaufenen Countdown |
| `compactMode` | `boolean` | `false` | Blendet Zeiteinheiten mit Wert 0 aus |
| `timezone` | `string` | `null` | Zeitzone (z.B. "Europe/Berlin", null = System) |

## Beispiele

### Countdown zu Silvester 2025
```javascript
{
	module: "MMM-Countdown",
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
	module: "MMM-Countdown",
	position: "middle_center",
	config: {
		event: "Sommerurlaub",
		date: "2025-07-15",
		showSeconds: false,
		showMinutes: false,
		displayStyle: "column",
		fadeSpeed: 1000
	}
}
```

### Countdown mit Wochen
```javascript
{
	module: "MMM-Countdown",
	position: "top_left",
	config: {
		event: "Hochzeit =",
		date: "2025-09-20",
		showWeeks: true,
		showSeconds: false,
		compactMode: true
	}
}
```

## Styling

Das Modul verwendet CSS-Klassen, die du in der Datei `MMM-Countdown.css` anpassen kannst. Du kannst auch eigene CSS-Regeln in der `custom.css` deines MagicMirror hinzufügen:

### Verfügbare CSS-Klassen

- `.mmm-countdown-wrapper` - Haupt-Container
- `.countdown-event` - Event-Titel
- `.countdown-time` - Zeit-Container
- `.countdown-component` - Einzelne Zeiteinheit
- `.countdown-value` - Zahlenwert
- `.countdown-label` - Label (d, h, m, s)
- `.countdown-end` - Ende-Nachricht

### Beispiel: Farben anpassen

```css
.countdown-component.days .countdown-value {
	color: #4CAF50;
}

.countdown-component.hours .countdown-value {
	color: #FF9800;
}
```

## Unterstützte Sprachen

Das Modul unterstützt die folgenden Sprachen (wenn `useTextLabels: true`):

- Deutsch (de)
- Englisch (en)
- Spanisch (es)
- Französisch (fr)
- Niederländisch (nl)

Die Sprachauswahl erfolgt automatisch basierend auf der MagicMirror Konfiguration.

## Best Practices

### Performance-Optimierung

- **Update-Intervall**: Wenn du keine Sekunden anzeigst, kannst du `customInterval` auf 60000 (1 Minute) setzen:
  ```javascript
  config: {
      showSeconds: false,
      customInterval: 60000  // Update nur einmal pro Minute
  }
  ```

- **Suspend/Resume**: Das Modul pausiert automatisch wenn es ausgeblendet wird, um Ressourcen zu sparen.

### Datumsformat

Das Modul akzeptiert verschiedene Datumsformate:
- `"2025-12-31"` (empfohlen)
- `"2025-12-31 23:59:59"`
- `"December 31, 2025"`

**Empfehlung**: Verwende das ISO-Format `YYYY-MM-DD` für maximale Kompatibilität.

## Fehlerbehebung

### Das Modul wird nicht angezeigt

1. Überprüfe die Browser-Konsole auf Fehler (F12)
2. Stelle sicher, dass das Datumsformat korrekt ist
3. Prüfe die `config.js` auf Syntaxfehler

### Der Countdown aktualisiert sich nicht

1. Überprüfe den `customInterval` Wert (mindestens 100ms)
2. Stelle sicher, dass das Modul nicht suspendiert ist
3. Prüfe die MagicMirror Logs: `pm2 logs MagicMirror`

### Styling funktioniert nicht

1. Stelle sicher, dass die CSS-Datei im richtigen Verzeichnis liegt
2. Lösche den Browser-Cache (Strg + F5)
3. Überprüfe ob `getStyles()` korrekt implementiert ist

## Entwicklung

### Voraussetzungen

- Node.js >= 14
- npm >= 6
- MagicMirror² >= 2.15.0

### Entwickler-Befehle

```bash
# Abhängigkeiten installieren
npm install

# Linting (wenn konfiguriert)
npm run lint

# Tests ausführen (wenn vorhanden)
npm test
```

### Beitragen

Contributions sind willkommen! Bitte:

1. Forke das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushe zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## Changelog

### Version 1.0.0 (2025)
- Vollständige Überarbeitung nach MagicMirror Best Practices
- Mehrsprachige Unterstützung (5 Sprachen)
- Suspend/Resume Funktionalität
- Verbesserte CSS-Styles mit Animationen
- Kompakt-Modus hinzugefügt
- Wochen-Anzeige hinzugefügt
- Bessere Fehlerbehandlung und Validierung
- JSDoc Dokumentation
- Intervall-Speicherleck behoben
- Vergangene Events werden jetzt korrekt behandelt

## Lizenz

Dieses Modul ist unter der [MIT Lizenz](LICENSE.txt) lizenziert.

## Credits

Entwickelt von **rxf-sys**

Basierend auf dem [MagicMirror² Framework](https://magicmirror.builders/) von Michael Teeuw

## Support

Bei Problemen oder Fragen:

1. Überprüfe die [Fehlerbehebung](#fehlerbehebung) Sektion
2. Schaue in die [MagicMirror² Dokumentation](https://docs.magicmirror.builders/)
3. Öffne ein [Issue auf GitHub](https://github.com/rxf-sys/MMM-Countdown/issues)

## Links

- [MagicMirror² Forum](https://forum.magicmirror.builders/)
- [MagicMirror² Dokumentation](https://docs.magicmirror.builders/)
- [MagicMirror² GitHub](https://github.com/MagicMirrorOrg/MagicMirror)

---

**Viel Spaß mit deinem Countdown!**