# Noureddine Khelfaoui — Personal Portfolio Website

A sleek, responsive, dark-mode personal portfolio website built with a developer-focused aesthetic. Designed for deployment on GitHub Pages or any static web host.

![Theme](https://img.shields.io/badge/Theme-Dark%20Charcoal%20%230A0A0A-blue)
![Typography](https://img.shields.io/badge/Typography-Inter%20%7C%20JetBrains%20Mono-brightgreen)
![Hosting](https://img.shields.io/badge/Ready-GitHub%20Pages-success)

---

## 🚀 Key Features

1. **Global Developer Aesthetic:**
   - Deep charcoal background (`#0A0A0A`), sleek dark cards (`#1A1A1A`), and electric blue/cyan accents (`#3B82F6`).
   - Clean Google Fonts typography using **JetBrains Mono** for code and technical badges, and **Inter** for clean readability.
   - **Anti-gravity hover animation**: floating effect with `translateY(-8px)` and soft cyan glow shadows on project cards.

2. **Navigation & Header:**
   - Left: Brand logo `[ Noureddine_K. _ ]` with an animated blinking terminal cursor.
   - Right: Clean links (`// about`, `// projects`, `// skills`, `// contact`) and an interactive **Resume** preview button.
   - Fully responsive with mobile drawer menu.

3. **Hero Section:**
   - Greeting badge: `👋 Hello, World! Computer Science Student & Developer`.
   - Gradient headline: *"Building software, data tools, and intelligent systems."*
   - Interactive code window featuring `profile_manifest.ts` with syntax highlighting, line numbers, one-click copy, and a live **"Run Manifest"** interactive output drawer.
   - Real-time status chips with live-pulsing indicators: `• YEAR_03 // B.S. CS` and `• AVAILABLE FOR INTERNSHIPS`.

4. **Featured Projects (Grid & Filter System):**
   - **FPL Stat Scraper** — Python & BeautifulSoup automation pipeline for Fantasy Premier League analytics with deep-dive Case Study modal (matching UI Panel 4).
   - **Java 2D Strategy Game (Project Conquest Arena)** — Object-oriented turn-based game engine in Java with architecture modal detailing MVC packages.
   - **University GPA Calculator (Moyenne ISIL)** — Algerian university credit weighted GPA projection engine with live interactive grade simulator.
   - **Personal Expense Tracker** — Categorical budget and transaction ledger utility.

5. **Deep-Dive FPL Case Study Modal (Screen 4):**
   - Latency benchmarks: `0.84 ms` execution latency, `38/wk` fixtures parsed, `99.8%` data accuracy, `~600+ vect/min` throughput.
   - Architectural topology: Parser ➔ Normalizer ➔ Optimizer ➔ Export.
   - Dual-tab code viewer (`fpl_engine.py` & `stats_analyser.py`) and simulated **"Run Live Analysis ⚡"** terminal.

6. **Skills Arsenal (3 Panels):**
   - **Languages**: Python (Primary), Java (Academic), SQL (Structured).
   - **Tools & Environments**: Linux (WSL), Git & GitHub, JetBrains IDEs & VS Code, Figma, GCC.
   - **Core Concepts**: OOP Paradigm, Data Structures & Algorithms, Web Scraping & ETL, REST API Integration.

7. **Direct Communications & Handshake:**
   - 1-click clipboard copy buttons for:
     - Email: `noureddinekhelfaoui64@gmail.com`
     - Phone: `0781539169`
     - Discord: `noureddine6197`
     - GitHub: `github.com/noureddine1726`
   - Quick direct transmission form with real-time feedback.

---

## 📁 File Structure

```text
noureddine-portfolio/
│
├── index.html        # Complete semantic HTML structure & modals
├── style.css         # Single-file CSS design system & responsive rules
├── script.js         # Zero-dependency interactive JavaScript logic
└── README.md         # Documentation & deployment guide
```

---

## ⚡ Quick Start & Local Preview

You can open `index.html` directly in any web browser, or launch a lightweight local server:

### Option A: Using Python (Built-in)
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option B: Using Node.js (npx serve)
```bash
npx serve .
```

---

## 🌐 Deploying to GitHub Pages (2 Minutes)

1. Create a repository on GitHub (e.g. `noureddine-portfolio` or `noureddine1726.github.io`).
2. Commit and push the files:
   ```bash
   git init
   git add .
   git commit -m "feat: complete modern dark-mode developer portfolio"
   git branch -M main
   git remote add origin https://github.com/noureddine1726/<your-repo-name>.git
   git push -u origin main
   ```
3. On GitHub, navigate to **Settings ➔ Pages**.
4. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. Your portfolio will be live at `https://noureddine1726.github.io/`!
