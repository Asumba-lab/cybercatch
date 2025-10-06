// Game variables
let score = 0;
let lives = 3;
let level = 1;
let blocked = 0;
let gameRunning = false;
let gamePaused = false;
let threatSpeed = 2;
let threatInterval;
let threats = [];

// DOM elements
const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const levelDisplay = document.getElementById('level');
const blockedDisplay = document.getElementById('blocked');
const currentLevelDisplay = document.getElementById('currentLevel');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const educationalTip = document.getElementById('educationalTip');
const tipTitle = document.getElementById('tipTitle');
const tipContent = document.getElementById('tipContent');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// Threat types with properties
const threatTypes = [
    {
        type: 'phishing',
        icon: '📧',
        points: 10,
        penalty: 5,
        color: 'phishing',
        tips: [
            "Phishing Tip: Always check the sender's email address for inconsistencies.",
            "Phishing Tip: Hover over links to see the actual URL before clicking.",
            "Phishing Tip: Be wary of emails creating a sense of urgency or requesting personal information."
        ]
    },
    {
        type: 'malware',
        icon: '🦠',
        points: 15,
        penalty: 10,
        color: 'malware',
        tips: [
            "Malware Tip: Keep your antivirus software updated and perform regular scans.",
            "Malware Tip: Only download software from official sources and verified websites.",
            "Malware Tip: Be cautious of email attachments, especially from unknown senders."
        ]
    },
    {
        type: 'ransomware',
        icon: '🔒',
        points: 20,
        penalty: 15,
        color: 'ransomware',
        tips: [
            "Ransomware Tip: Regularly back up your important data to an external drive or cloud storage.",
            "Ransomware Tip: Avoid paying ransoms as it doesn't guarantee file recovery and funds criminal activities.",
            "Ransomware Tip: Keep all software updated, especially operating systems and security patches."
        ]
    },
    {
        type: 'social-engineering',
        icon: '🎭',
        points: 12,
        penalty: 8,
        color: 'social-engineering',
        tips: [
            "Social Engineering Tip: Verify identities through alternative channels before sharing sensitive information.",
            "Social Engineering Tip: Be skeptical of unsolicited requests for personal or financial information.",
            "Social Engineering Tip: Implement multi-factor authentication to add an extra layer of security."
        ]
    },
    {
        type: 'dos',
        icon: '🌐',
        points: 25,
        penalty: 20,
        color: 'dos',
        tips: [
            "DDoS Tip: Use DDoS protection services to mitigate attack impacts.",
            "DDoS Tip: Monitor network traffic for unusual patterns that might indicate an attack.",
            "DDoS Tip: Have an incident response plan in place for potential DDoS attacks."
        ]
    }
];

// Initialize game
function initGame() {
    // Set player position
    player.style.left = `${(gameArea.offsetWidth - player.offsetWidth) / 2}px`;
    
    // Add event listeners
    document.addEventListener('keydown', movePlayer);
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    resetBtn.addEventListener('click', resetGame);
    restartBtn.addEventListener('click', restartGame);
    
    // Add touch support for mobile devices
    gameArea.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = gameArea.getBoundingClientRect();
        const x = touch.clientX - rect.left - (player.offsetWidth / 2);
        
        if (x >= 0 && x <= gameArea.offsetWidth - player.offsetWidth) {
            player.style.left = `${x}px`;
        }
    });
}

// Move player with keyboard
function movePlayer(e) {
    if (!gameRunning || gamePaused) return;
    
    const playerSpeed = 20;
    let currentLeft = parseInt(player.style.left) || 0;
    
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        currentLeft = Math.max(0, currentLeft - playerSpeed);
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        currentLeft = Math.min(gameArea.offsetWidth - player.offsetWidth, currentLeft + playerSpeed);
    }
    
    player.style.left = `${currentLeft}px`;
}

// Start the game
function startGame() {
    if (gameRunning) return;
    
    gameRunning = true;
    gamePaused = false;
    startBtn.disabled = true;
    pauseBtn.textContent = 'PAUSE';
    
    // Start generating threats
    threatInterval = setInterval(createThreat, 1000 - (level * 100));
    
    // Start game loop
    requestAnimationFrame(gameLoop);
}

// Toggle pause
function togglePause() {
    if (!gameRunning) return;
    
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? 'RESUME' : 'PAUSE';
    
    if (gamePaused) {
        clearInterval(threatInterval);
    } else {
        threatInterval = setInterval(createThreat, 1000 - (level * 100));
        requestAnimationFrame(gameLoop);
    }
}

// Reset game
function resetGame() {
    // Clear all threats
    threats.forEach(threat => threat.element.remove());
    threats = [];
    
    // Reset game state
    clearInterval(threatInterval);
    gameRunning = false;
    gamePaused = false;
    score = 0;
    lives = 3;
    level = 1;
    blocked = 0;
    threatSpeed = 2;
    
    // Update displays
    updateDisplays();
    startBtn.disabled = false;
    pauseBtn.textContent = 'PAUSE';
    educationalTip.style.display = 'none';
    gameOverScreen.style.display = 'none';
    
    // Reset player position
    player.style.left = `${(gameArea.offsetWidth - player.offsetWidth) / 2}px`;
}

// Restart game after game over
function restartGame() {
    resetGame();
    startGame();
}

// Create a new threat
function createThreat() {
    if (!gameRunning || gamePaused) return;
    
    const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    const threat = document.createElement('div');
    threat.className = `threat ${threatType.color}`;
    threat.innerHTML = threatType.icon;
    
    // Set random horizontal position
    const leftPos = Math.random() * (gameArea.offsetWidth - 60);
    threat.style.left = `${leftPos}px`;
    threat.style.top = '-60px';
    
    gameArea.appendChild(threat);
    
    threats.push({
        element: threat,
        type: threatType.type,
        points: threatType.points,
        penalty: threatType.penalty,
        speed: threatSpeed + (level * 0.5),
        tips: threatType.tips,
        x: leftPos,
        y: -60
    });
}

// Main game loop
function gameLoop() {
    if (!gameRunning || gamePaused) return;
    
    // Move threats
    for (let i = threats.length - 1; i >= 0; i--) {
        const threat = threats[i];
        threat.y += threat.speed;
        threat.element.style.top = `${threat.y}px`;
        
        // Check if threat reached the bottom
        if (threat.y > gameArea.offsetHeight) {
            // Player missed the threat
            handleMissedThreat(threat);
            threats.splice(i, 1);
        } else {
            // Check for collision with player
            if (checkCollision(threat)) {
                handleCaughtThreat(threat);
                threats.splice(i, 1);
            }
        }
    }
    
    // Check for level up
    if (score >= level * 100) {
        levelUp();
    }
    
    // Continue game loop
    requestAnimationFrame(gameLoop);
}

// Check collision between player and threat
function checkCollision(threat) {
    const playerRect = player.getBoundingClientRect();
    const threatRect = threat.element.getBoundingClientRect();
    
    return !(
        playerRect.right < threatRect.left ||
        playerRect.left > threatRect.right ||
        playerRect.bottom < threatRect.top ||
        playerRect.top > threatRect.bottom
    );
}

// Handle caught threat
function handleCaughtThreat(threat) {
    // Remove threat element
    threat.element.remove();
    
    // Add points
    score += threat.points;
    blocked++;
    
    // Show educational tip
    showEducationalTip(threat);
    
    // Update displays
    updateDisplays();
}

// Handle missed threat
function handleMissedThreat(threat) {
    // Remove threat element
    threat.element.remove();
    
    // Deduct points and lives
    score = Math.max(0, score - threat.penalty);
    lives--;
    
    // Show educational tip
    showEducationalTip(threat);
    
    // Update displays
    updateDisplays();
    
    // Check for game over
    if (lives <= 0) {
        gameOver();
    }
}

// Show educational tip
function showEducationalTip(threat) {
    const randomTip = threat.tips[Math.floor(Math.random() * threat.tips.length)];
    const threatName = threat.type.charAt(0).toUpperCase() + threat.type.slice(1).replace('-', ' ');
    
    tipTitle.textContent = `${threatName} Defense Tip`;
    tipContent.textContent = randomTip;
    
    educationalTip.style.display = 'block';
    
    // Hide tip after 5 seconds
    setTimeout(() => {
        educationalTip.style.display = 'none';
    }, 5000);
}

// Level up
function levelUp() {
    level++;
    threatSpeed += 0.5;
    
    // Update level display
    currentLevelDisplay.textContent = level;
    levelDisplay.textContent = level;
    
    // Show level up message
    tipTitle.textContent = `Level ${level} Unlocked!`;
    tipContent.textContent = 'Threats are now faster and more frequent. Stay alert!';
    educationalTip.style.display = 'block';
    
    // Adjust threat generation interval
    clearInterval(threatInterval);
    threatInterval = setInterval(createThreat, Math.max(300, 1000 - (level * 100)));
    
    // Hide tip after 3 seconds
    setTimeout(() => {
        educationalTip.style.display = 'none';
    }, 3000);
}

// Game over
function gameOver() {
    gameRunning = false;
    clearInterval(threatInterval);
    
    // Show game over screen
    finalScoreDisplay.textContent = score;
    gameOverScreen.style.display = 'flex';
    
    // Show final educational tip
    tipTitle.textContent = 'Game Over - Stay Secure!';
    tipContent.textContent = 'Remember to always practice good cybersecurity habits in your daily digital life.';
    educationalTip.style.display = 'block';
}

// Update all displays
function updateDisplays() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    levelDisplay.textContent = level;
    blockedDisplay.textContent = blocked;
}

// Initialize the game when page loads
window.onload = initGame;


