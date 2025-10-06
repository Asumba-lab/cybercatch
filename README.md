## Cyber Threat Defender

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![Game](https://img.shields.io/badge/Genre-Arcade%20%2F%20Educational-blue)

### Overview
Cyber Threat Defender is a lightweight browser game where you slide a defender to catch falling cybersecurity threats. Each catch teaches a quick tip (phishing, malware, ransomware, social engineering, DDoS) while you rack up points, level up, and try not to lose your lives.

### Demo
Add a short gameplay GIF or screenshot here:
`docs/demo.gif` (placeholder)

### Features
- **Educational tips**: Contextual security advice shown on catches/misses.
- **Multiple threat types**: Phishing, Malware, Ransomware, Social Engineering, DDoS; each with points/penalties.
- **Progression**: Increasing speed and spawn rate as levels rise.
- **Simple controls**: Keyboard, mouse, and touch supported.
- **Zero dependencies**: Pure HTML/CSS/JS; just open the page.

### Getting Started
#### Option 1: Open locally (no server)
1. Download/clone the repo.
2. Double‑click `index.html` to open it in your browser.

Note: Some browsers restrict local file APIs. If anything looks off, use a local server.

#### Option 2: Run a simple local server
- Python 3: `python -m http.server 8000` then open `http://localhost:8000`
- Node (serve): `npx serve -s .` then open the URL it prints
- VS Code: Install “Live Server”, right‑click `index.html` → “Open with Live Server”

### Controls
- **Move left**: Left Arrow or `A`
- **Move right**: Right Arrow or `D`
- **Touch/Mouse**: Drag/move in the game area to slide the player
- **Buttons**: `START GAME`, `PAUSE/RESUME`, `RESET`, `PLAY AGAIN` (after game over)

### Gameplay
- **Goal**: Catch threats to earn points and block attacks; avoid misses that cost points and lives.
- **Lives**: Start with 3. Game over at 0.
- **Leveling**: Level increases as score crosses `level × 100`. Each level slightly increases falling speed and spawn frequency.

#### Scoring & Penalties
- **Phishing**: +10 on catch, −5 on miss
- **Malware**: +15 on catch, −10 on miss
- **Ransomware**: +20 on catch, −15 on miss
- **Social Engineering**: +12 on catch, −8 on miss
- **DDoS**: +25 on catch, −20 on miss

### How it Works (at a glance)
- Threats spawn periodically and fall toward the bottom.
- Collision with the player grants points and shows a relevant tip.
- Missing a threat reduces score and lives, and still shows a tip.
- Level increases at score thresholds; spawn interval shortens and speed increases.

### Project Structure
```
CyberCatch/
├─ index.html      # UI layout and inline styles
├─ game.js         # Game logic, spawn, collision, scoring, tips, levels
├─ styles.css      # (Optional) External styles (not required by index.html)
└─ README.md       # This file
```

### Customization
- **Threats**: Edit the `threatTypes` array in `game.js` to change icons, colors, points, penalties, and tips.
- **Difficulty**: Tweak `threatSpeed`, level thresholds, and spawn interval math in `game.js`.
- **UI**: Modify styles in `index.html` (inline) or extract to `styles.css`.

### Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Dependencies**: None

### Contributing
1. Fork the repo and create a feature branch.
2. Make your changes with clear, readable code and small, focused commits.
3. Test locally, then open a Pull Request describing the change and rationale.

### License
No license specified. If you plan to share or open‑source, consider adding a `LICENSE` (e.g., MIT).

### Credits
- Game logic and design: Cyber Threat Defender authors
- Emojis for threat icons: Native emoji set from the host OS/browser


