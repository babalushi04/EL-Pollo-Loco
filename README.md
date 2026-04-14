# 🐔 El Pollo Loco - Developer Akademie Projekt

![El Pollo Loco](img/favicon.svg)

Ein unterhaltsames **2D-Action-Platformer-Spiel** im Browser entwickelt mit **Vanilla JavaScript** und **HTML5 Canvas**. Begleite Pepe durch die mexikanische Wüste und besiege die böse Chickenbande!

---

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

## 🎮 Spielgeschichte

In der glühenden mexicanischen Wüste entdeckt der mutige Abenteurer **Pepe**, dass die lokale Hühnerpopulation komplett **verrückt** geworden ist!

Unter der Führung eines gigantischen, furchteinflößenden **Boss-Huhns** terrorisiert die Geflügel-Armee die Gegend. Mit nur seinem Verstand und einem unbegrenzten Vorrat an **Salsa-Flaschen** bewaffnet, muss sich Pepe durch Hordes von verrückten Hühnern kämpfen.

Kannst du Pepe helfen, **El Pollo Loco** zu besiegen und den Frieden in der Wüste wiederherzustellen? 🌵

---

## 🚀 Installation & Ausführung

### Voraussetzungen
- Ein moderner Web-Browser (Chrome, Firefox, Safari, Edge)
- Keine weitere Installation erforderlich!

### Ausführung

1. **Repository klonen oder herunterladen**
   ```bash
   git clone <repository-url>
   cd "EL Pollo Loco"
   ```

2. **Datei öffnen**
   - Öffne die `index.html` Datei direkt im Browser
   - Oder nutze einen lokalen Server:
   ```bash
   # Mit Python 3
   python -m http.server 8000
   
   # Mit Node.js (http-server)
   npx http-server
   ```

3. **Im Browser navigieren**
   - Öffne `http://localhost:8000` (oder die entsprechende URL)

---

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

---

## 🎯 Gameplay

### Ziel
Navigiere Pepe durch die Wüstenlevel und besiege **El Pollo Loco** (den Boss), um zu gewinnen!

### Gegner
- 🐔 **Normale Hühner** - Das Fußvolk der Chickenbande
- 🐤 **Kleine Hühner** - Schneller und agiler
- 🐔 **El Pollo Loco (Boss)** - Der Endgegner mit viel Gesundheit

### Sammelbare Items
- 🍾 **Flaschen** - Werfen Sie diese auf Gegner, besonders auf den Boss
- 💰 **Münzen** - Sammeln Sie sie für Punkte
- ❤️ **Herzen** - Erhöhen Sie Ihre Gesundheit

### Spielmechaniken
1. **Auf Gegner springen** - Kleine Hühner können zerquetscht werden
2. **Flaschen werfen** - Gesammelte Flaschen auf Gegner werfen
3. **Gegnerenkollision vermeiden** - Die Gesundheit wird reduziert
4. **Sammeln** - Flaschen und Münzen aufsammeln
5. **Boss besiegen** - Viele Flaschen auf den Boss werfen

---

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

### Wichtige Klassen

| Klasse | Beschreibung |
|--------|-------------|
| **World** | Verwaltet Spielloop, alle Objekte und Kollisionen |
| **CollisionHandler** | Erkennt und behandelt Kollisionen |
| **Character** | Der Spielercharakter (Pepe) |
| **Level** | Definiert Gegner, Hintergründe und Layout |
| **Keyboard** | Verwaltet Tastatureingaben |
| **SoundManager** | Verwaltet Musik und Sound-Effekte |

---

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

### Browser Compatibility
- ✅ Chrome/Chromium (neueste)
- ✅ Firefox (neueste)
- ✅ Safari (neueste)
- ✅ Edge (neueste)

---

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

## 🚀 Mögliche Erweiterungen

- [ ] Mehrere Level mit steigender Schwierigkeit
- [ ] Power-Up System
- [ ] Leaderboard und High Score Speicherung
- [ ] Zusätzliche Gegner-Typen
- [ ] Boss-Phasen mit verschiedenen Angriffsmustern
- [ ] Achievements/Badges
- [ ] Spiel-Einstellungen (Schwierigkeitsgrad, Sprache)
- [ ] Progressive Web App (PWA)

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
