# 🐔 El Pollo Loco - Developer Akademie Projekt

## 📖 Inhalt

- [Features](#-features)
- [Spielgeschichte](#-spielgeschichte)
- [Installation & Ausführung](#-installation--ausführung)
- [Steuerung](#-steuerung)
- [Projektstruktur](#-projektstruktur)
- [Gameplay](#-gameplay)
- [Technologie Stack](#-technologie-stack)
- [Klassen & Architektur](#-klassen--architektur)
- [Sound Management](#-sound-management)
- [Mobile-Unterstützung](#-mobile-unterstützung)
- [Author](#-author)

---

## ✨ Features

✅ **Vollständiges Spielerlebnis** mit Starbildschirm, Gameplay und Endbildschirm  
✅ **Objektorientierte Architektur** mit umfassender Klassenstruktur  
✅ **Dynamische Collisionserkennung** für realistische Spielmechanik  
✅ **Sound & Musik** mit umfassendem Audio Management  
✅ **Mobile-optimiert** mit Touch-Steuerung und Responsive Design  
✅ **Vollbildmodus** für intensiveres Spielerlebnis  
✅ **Mehrere HUD-Elemente** (Health, Bottle, Boss, Coin Bars)  
✅ **Speicherung von Einstellungen** via localStorage  

---

## 🚀 Installation & Ausführung

### Voraussetzungen
- Ein moderner Web-Browser (Chrome, Firefox, Safari, Edge)
- Keine weitere Installation erforderlich!


## ⌨️ Steuerung

### PC/Keyboard
| Taste | Aktion |
|-------|--------|
| **A** | Nach Links bewegen |
| **D** | Nach Rechts bewegen |
| **SPACE** | Springen |
| **K** | Flasche werfen |
| **F** | Vollbildmodus |

### Mobil/Touch
- **Linke Pfeile** → Links bewegen
- **Rechte Pfeile** → Rechts bewegen
- **Oben Pfeil** → Springen
- **Flasche Button** → Werfen

## 📁 Projektstruktur

```
EL Pollo Loco/
├── index.html                 # Haupt-HTML-Datei
├── style.css                  # Hauptstile
├── styles/
│   ├── components.css         # Komponenten-Styles
│   └── mobile.css             # Mobile-responsive Styles
│
├── scripts/
│   ├── game.js                # Haupt-Spielelogik
│   └── landing.js             # UI-Funktionen
│
├── models/
│   ├── character.class.js     # Pepe (Spielercharakter)
│   ├── chicken.class.js       # Normale Hühner
│   ├── small-chicken.class.js # Kleine Hühner
│   ├── endboss.class.js       # Boss Chicken
│   ├── world.class.js         # Spiel-Welt-Manager
│   ├── level.class.js         # Level-Definition
│   │
│   ├── drawable-object.class.js        # Basis-Klasse für zeichenbare Objekte
│   ├── moveable-object.class.js        # Basis-Klasse für bewegliche Objekte
│   ├── collision-handler.class.js      # Kollisionserkennung
│   │
│   ├── bottle.class.js        # Werfbare Flaschen
│   ├── throwable-object.class.js       # Basis für Wurfgegenstände
│   ├── coin.class.js          # Sammelbare Münzen
│   ├── cloud.class.js         # Dekorative Wolken
│   │
│   ├── status-bar.class.js    # Gesundheitsanzeige
│   ├── bottle-bar.class.js    # Flaschen-Anzeige
│   ├── boss-bar.class.js      # Boss-Gesundheits-Anzeige
│   ├── coin-bar.class.js      # Münz-Zähler
│   ├── health-heart.class.js  # Herz-Grafik
│   │
│   ├── keyboard.class.js      # Tastatureingabe-Handler
│   ├── sound.class.js         # Sound Management
│   ├── background-object.class.js     # Hintergrund-Elemente
│
├── levels/
│   └── level1.js              # Level 1 Definition
│
├── img/
│   ├── favicon.svg            # Website Icon
│   ├── fullscreen.svg         # Vollbildschalt-Icon
│   └── 6_salsa_bottle/        # Flaschen-Grafiken
│
└── README.md                  # Diese Datei
```

---

## 🧬 Klassen & Architektur

### Klassenhierarchie

```
DrawableObject (Basis)
├── MovableObject (Basis für bewegliche Objekte)
│   ├── Character (Pepe)
│   ├── Chicken (Feind)
│   ├── SmallChicken (Feind)
│   ├── Endboss (Boss-Feind)
│   └── ThrowableObject
│       └── Bottle (Wurfgegenstand)
│   
├── BackgroundObject (Hintergrund)
├── Cloud (Dekorative Wolken)
├── Coin (Sammelbare Gegenstände)
└── StatusBar (HUD-Elemente)
    ├── BottleBar
    ├── BossBar
    ├── CoinBar
    └── HealthHeart
```

## 🔊 Sound Management

Das Spiel verfügt über ein umfassendes Sound-System mit:

- 🎵 **Background Music** - Sich wiederholende Ambience
- 🐔 **Chicken Sounds** - Normale Hühner-Geräusche
- 🐤 **Small Chicken Sounds** - Kleine Hühner-Geräusche
- 👹 **Endboss Sounds** - Boss-spezifische Geräusche
- 💤 **Snore Sounds** - Spezielle Sound-Effekte

### Sound-Steuerung
- **Musik stummschalten** - Button in der Kontrolleiste
- **Sound-Effekte stummschalten** - Button in der Kontrolleiste
- **Einstellungen speichern** - Automatisch in localStorage

---

## 📱 Mobile-Unterstützung

Das Spiel ist vollständig **mobile-optimiert**:

✅ Responsive Canvas-Layout  
✅ Touch-Steuerung mit vier Buttons  
✅ Automatische Geräte-Rotations-Warnung  
✅ Mobile-Menü mit Story, Imprint und Nutzungsbedingungen  
✅ Optimiertes UI für Smartphone-Bildschirme  

---

## 🛠️ Technologie Stack

- **HTML5** - Canvas für Grafiken
- **CSS3** - Styling und responsive Design
- **Vanilla JavaScript (ES6+)** - Komplette Spielelogik
- **Object-Oriented Programming** - Klassenbasierte Architektur
- **RequestAnimationFrame** - Optimierte Game Loop
- **LocalStorage API** - Speicherung von Benutzereinstellungen


## 🎓 Developer Akademie Projekt

Dieses Projekt wurde als Teil der **Developer Akademie** entwickelt und demonstriert:

✅ **Professionelle Codestruktur** mit Klassendesign  
✅ **Game Development Grundlagen** - Game Loop, Sprite Management, Kollisionen  
✅ **DOM-Manipulation** und Event-Handling  
✅ **Canvas API** für 2D-Grafiken  
✅ **Responsive Design** für Multiple Gerätetypen  
✅ **Performance-Optimierung** mit RequestAnimationFrame  
✅ **User Experience** mit vollständiger UI/UX  

---


## 📞 Author

**Virxhin Bytyqi**  
📧 E-Mail: [xhini95@gmail.com](mailto:xhini95@gmail.com)  
📍 Regensburger Str. 2, 93197 Zeitlarn

---

## 📜 Lizenz & Attribution

**Sound Effects:**
- Alle Sound-Effekte stammen von [Pixabay](https://pixabay.com/sound-effects/)
- Kostenlos verwendbar gemäß der Pixabay-Lizenzbedingungen

**Fonts & Icons:**
- Material Design Icons (Google)
- Custom SVG Icons

---

## 🎉 Spielspaß Garantiert!

Tauche ein in die Wüste, besiege die verrückten Hühner und werde zum **El Pollo Loco Champion**! 🐔🌵

**Viel Spaß beim Spielen!** 🎮

---

*Zuletzt aktualisiert: 2026*  
*Developer Akademie - Professionelle Webentwicklung*
