// Interactive Games for Khushi's Love Website
// 1. Catch Khushi's Hearts Arcade
// 2. The Impossible "No" Button
// 3. Khushi's Mood Fixer & Drama Meter

class LoveGamesManager {
    constructor() {
        this.heartGameRunning = false;
        this.heartGameScore = 0;
        this.heartGameTarget = 100;
        this.items = [];
        this.basketX = 150;
        this.basketWidth = 80;
        this.gameCanvas = null;
        this.gameCtx = null;
        this.gameAnimationId = null;
        this.noButtonDodgeCount = 0;

        document.addEventListener('DOMContentLoaded', () => {
            this.initImpossibleButton();
            this.initMoodFixer();
            this.initHeartCatcher();
        });
    }

    // ==========================================
    // 1. THE IMPOSSIBLE "NO" BUTTON
    // ==========================================
    initImpossibleButton() {
        const noBtn = document.getElementById('impossible-no-btn');
        const yesBtn = document.getElementById('impossible-yes-btn');
        const container = document.getElementById('proposal-card-box');

        if (!noBtn || !yesBtn) return;

        const dodgePhrases = [
            "Arey madam! Kaha bhaag rahi ho? 😂",
            "Option 'NO' does not exist in our dictionary! 🙅‍♂️",
            "Error 404: 'No' is strictly illegal for Khushi! ❌",
            "Kim Taehyung also told you to click YES! 💜",
            "Nice try, cutie! Ab wapas YES pe click karo 🥰",
            "Tum meri ho, button bhi jaanta hai! 💖"
        ];

        const moveNoButton = (e) => {
            if (e) e.preventDefault();
            this.noButtonDodgeCount++;
            if (window.loveAudio) window.loveAudio.playPop();

            const rect = container.getBoundingClientRect();
            const btnWidth = noBtn.offsetWidth || 120;
            const btnHeight = noBtn.offsetHeight || 44;

            // Constrain within the container card
            const maxX = Math.max(20, rect.width - btnWidth - 30);
            const maxY = Math.max(20, rect.height - btnHeight - 30);

            const randomX = Math.floor(Math.random() * maxX) + 15;
            const randomY = Math.floor(Math.random() * maxY) + 15;

            noBtn.style.position = 'absolute';
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;

            // Display playful toast message
            const toastEl = document.getElementById('proposal-hint-toast');
            if (toastEl) {
                const phrase = dodgePhrases[this.noButtonDodgeCount % dodgePhrases.length];
                toastEl.textContent = phrase;
                toastEl.classList.remove('hidden');
                toastEl.classList.add('visible');
            }

            // Make the YES button grow bigger each time she tries to click NO!
            const scale = Math.min(1.4, 1 + this.noButtonDodgeCount * 0.08);
            yesBtn.style.transform = `scale(${scale})`;
        };

        noBtn.addEventListener('mouseenter', moveNoButton);
        noBtn.addEventListener('touchstart', moveNoButton, { passive: false });
        noBtn.addEventListener('click', moveNoButton);

        yesBtn.addEventListener('click', (e) => {
            if (window.loveAudio) window.loveAudio.playChime();
            if (window.particles) window.particles.spawnHeartExplosion(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 70);

            const modal = document.getElementById('proposal-success-modal');
            if (modal) {
                modal.classList.add('active');
            }
        });
    }

    // ==========================================
    // 2. KHUSHI'S MOOD FIXER & DRAMA METER
    // ==========================================
    initMoodFixer() {
        const dramaSlider = document.getElementById('drama-slider');
        const dramaOutput = document.getElementById('drama-value-text');

        if (dramaSlider) {
            dramaSlider.addEventListener('input', (e) => {
                let val = parseInt(e.target.value);
                if (val < 100) {
                    // Instantly bounce back to 100%!
                    setTimeout(() => {
                        dramaSlider.value = 100;
                        if (dramaOutput) dramaOutput.textContent = '100% (Certified Drama Queen 👑)';
                        if (window.loveAudio) window.loveAudio.playPop();
                        const toast = document.getElementById('drama-meter-toast');
                        if (toast) {
                            toast.textContent = "Warning: Khushi's Drama cannot be reduced! It is an essential feature! 😂❤️";
                            toast.classList.add('visible');
                            setTimeout(() => toast.classList.remove('visible'), 3000);
                        }
                    }, 250);
                }
            });
        }

        // Compliment & Care Buttons
        const hugBtn = document.getElementById('mood-btn-hug');
        const pizzaBtn = document.getElementById('mood-btn-pizza');
        const complimentBtn = document.getElementById('mood-btn-compliment');
        const moodResultBox = document.getElementById('mood-result-display');

        const compliments = [
            "Khushi, tumhare chehre pe jo smile aati hai na, sach me mera poora din bana deti hai. 💖",
            "World's most beautiful girl? Rank 1: Khushi. Rank 2: Also Khushi. No competition! ✨",
            "Chahe kitna bhi gussa ho lo, end me cute hi lagti ho (ekdum angry marshmallow jaise)! 🥰",
            "Kim Taehyung has got nothing on the charm of your single smile! 💜",
            "Main tumse itna pyaar karta hu jitne aasmaan me taare hain (aur thoda usse bhi jada)! 🌌"
        ];

        if (hugBtn) {
            hugBtn.addEventListener('click', (e) => {
                if (window.loveAudio) window.loveAudio.playChime();
                if (window.particles) window.particles.spawnHeartExplosion(e.clientX, e.clientY, 40);
                if (moodResultBox) {
                    moodResultBox.innerHTML = `
                        <div class="mood-popup-card">
                            <span class="mood-icon">🧸💖</span>
                            <h4>Giant Warm Bear Hug Dispatched!</h4>
                            <p>Virtual warm cuddle arriving at the speed of light! Khushi's cuteness recharged to 1000%! 🥰</p>
                        </div>
                    `;
                }
            });
        }

        if (pizzaBtn) {
            pizzaBtn.addEventListener('click', (e) => {
                if (window.loveAudio) window.loveAudio.playPop();
                if (moodResultBox) {
                    moodResultBox.innerHTML = `
                        <div class="mood-popup-card">
                            <span class="mood-icon">🍕🍟🧋</span>
                            <h4>Emergency Snack Delivery!</h4>
                            <p>Hot cheesy pizza, crispy fries, and bubble tea sent to Khushi's heart! Hangry mood successfully banished! 😋</p>
                        </div>
                    `;
                }
            });
        }

        if (complimentBtn) {
            complimentBtn.addEventListener('click', (e) => {
                if (window.loveAudio) window.loveAudio.playChime();
                const randComp = compliments[Math.floor(Math.random() * compliments.length)];
                if (moodResultBox) {
                    moodResultBox.innerHTML = `
                        <div class="mood-popup-card">
                            <span class="mood-icon">👑✨</span>
                            <h4>Royal Announcement for Khushi:</h4>
                            <p>"${randComp}"</p>
                        </div>
                    `;
                }
            });
        }
    }

    // ==========================================
    // 3. CATCH KHUSHI'S HEARTS ARCADE GAME
    // ==========================================
    initHeartCatcher() {
        this.gameCanvas = document.getElementById('heart-game-canvas');
        if (!this.gameCanvas) return;
        this.gameCtx = this.gameCanvas.getContext('2d');

        const startBtn = document.getElementById('start-heart-game-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startHeartGame();
            });
        }

        const handleMove = (clientX) => {
            if (!this.gameCanvas) return;
            const rect = this.gameCanvas.getBoundingClientRect();
            const relX = clientX - rect.left;
            this.basketX = Math.max(this.basketWidth / 2, Math.min(rect.width - this.basketWidth / 2, relX));
        };

        this.gameCanvas.addEventListener('mousemove', (e) => handleMove(e.clientX));
        this.gameCanvas.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) {
                handleMove(e.touches[0].clientX);
            }
        }, { passive: true });
    }

    startHeartGame() {
        this.heartGameRunning = true;
        this.heartGameScore = 0;
        this.items = [];
        this.updateScoreUI();

        const startBtn = document.getElementById('start-heart-game-btn');
        if (startBtn) startBtn.style.display = 'none';

        const winModal = document.getElementById('game-win-modal');
        if (winModal) winModal.classList.remove('active');

        this.resizeGameCanvas();
        if (window.loveAudio) window.loveAudio.playChime();

        this.gameLoop();
    }

    resizeGameCanvas() {
        if (!this.gameCanvas) return;
        const rect = this.gameCanvas.parentElement.getBoundingClientRect();
        this.gameCanvas.width = rect.width;
        this.gameCanvas.height = 360;
        this.basketX = this.gameCanvas.width / 2;
    }

    spawnFallingItem() {
        if (Math.random() < 0.04 && this.items.length < 8) {
            const types = [
                { symbol: '💖', points: 10, speed: 2.2, label: 'Love' },
                { symbol: '💙', points: 15, speed: 2.5, label: 'Sweetness' },
                { symbol: '💜', points: 25, speed: 3.0, label: 'Borahae' },
                { symbol: '🍫', points: 10, speed: 2.0, label: 'Chocolate' },
                { symbol: '✨', points: 20, speed: 3.2, label: 'Magic' }
            ];
            const chosen = types[Math.floor(Math.random() * types.length)];
            this.items.push({
                x: Math.random() * (this.gameCanvas.width - 40) + 20,
                y: -20,
                symbol: chosen.symbol,
                points: chosen.points,
                speed: chosen.speed + Math.random() * 0.8,
                size: 28
            });
        }
    }

    gameLoop() {
        if (!this.heartGameRunning) return;

        this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

        // Spawn items
        this.spawnFallingItem();

        // Draw and update falling items
        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            item.y += item.speed;

            this.gameCtx.font = `${item.size}px sans-serif`;
            this.gameCtx.textAlign = 'center';
            this.gameCtx.fillText(item.symbol, item.x, item.y);

            // Check collision with basket at bottom
            const basketY = this.gameCanvas.height - 40;
            if (
                item.y >= basketY - 15 &&
                item.y <= basketY + 25 &&
                Math.abs(item.x - this.basketX) < (this.basketWidth / 2 + 15)
            ) {
                // Caught!
                this.heartGameScore += item.points;
                if (window.loveAudio) window.loveAudio.playPop();
                if (window.particles) window.particles.spawnHeartExplosion(this.basketX, basketY, 12);
                this.items.splice(i, 1);
                this.updateScoreUI();

                if (this.heartGameScore >= this.heartGameTarget) {
                    this.winHeartGame();
                    return;
                }
                continue;
            }

            // Remove if fell past screen
            if (item.y > this.gameCanvas.height + 30) {
                this.items.splice(i, 1);
            }
        }

        // Draw Player Basket (Glowing Love Cart for Khushi)
        const bY = this.gameCanvas.height - 30;
        this.gameCtx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        this.gameCtx.strokeStyle = '#38bdf8';
        this.gameCtx.lineWidth = 2;
        this.gameCtx.beginPath();
        this.gameCtx.roundRect(this.basketX - this.basketWidth / 2, bY - 15, this.basketWidth, 28, [14]);
        this.gameCtx.fill();
        this.gameCtx.stroke();

        this.gameCtx.font = '14px sans-serif';
        this.gameCtx.fillStyle = '#ffffff';
        this.gameCtx.textAlign = 'center';
        this.gameCtx.fillText('🧺 Khushi', this.basketX, bY + 4);

        this.gameAnimationId = requestAnimationFrame(() => this.gameLoop());
    }

    updateScoreUI() {
        const scoreEl = document.getElementById('heart-game-score');
        const barEl = document.getElementById('heart-game-progress');
        if (scoreEl) scoreEl.textContent = this.heartGameScore;
        if (barEl) {
            const pct = Math.min(100, (this.heartGameScore / this.heartGameTarget) * 100);
            barEl.style.width = `${pct}%`;
        }
    }

    winHeartGame() {
        this.heartGameRunning = false;
        if (this.gameAnimationId) cancelAnimationFrame(this.gameAnimationId);

        if (window.loveAudio) window.loveAudio.playChime();
        if (window.particles) window.particles.spawnHeartExplosion(window.innerWidth / 2, window.innerHeight / 2, 80);

        const winModal = document.getElementById('game-win-modal');
        if (winModal) {
            winModal.classList.add('active');
        }

        const startBtn = document.getElementById('start-heart-game-btn');
        if (startBtn) {
            startBtn.style.display = 'inline-block';
            startBtn.textContent = 'Play Again! 💖';
        }
    }
}

window.loveGames = new LoveGamesManager();
