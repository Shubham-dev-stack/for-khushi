// Clean, High-Performance Romantic Canvas Particle Engine
// 1. Crystal-clear twinkling midnight stars & shooting stars (Strict Canvas Clear, Zero Ghosting)
// 2. DOM-based Heart & Sparkle Bursts that automatically clean themselves up cleanly

class CleanRomanticEngine {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.stars = [];
        this.shootingStars = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        document.addEventListener('DOMContentLoaded', () => {
            this.initCanvas();
            window.addEventListener('resize', () => this.onResize());
            this.animate();
        });
    }

    initCanvas() {
        let canvas = document.getElementById('night-sky-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'night-sky-canvas';
            document.body.prepend(canvas);
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.onResize();
        this.createStars();
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if (this.canvas) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
    }

    createStars() {
        this.stars = [];
        const count = Math.min(160, Math.floor((this.width * this.height) / 7500));
        for (let i = 0; i < count; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.8 + 0.2,
                twinkleSpeed: (Math.random() * 0.02 + 0.006) * (Math.random() > 0.5 ? 1 : -1),
                color: Math.random() > 0.3 ? '#93c5fd' : (Math.random() > 0.5 ? '#38bdf8' : '#f472b6')
            });
        }
    }

    maybeSpawnShootingStar() {
        if (Math.random() < 0.007 && this.shootingStars.length < 2) {
            this.shootingStars.push({
                x: Math.random() * this.width * 0.8,
                y: Math.random() * (this.height * 0.4),
                len: Math.random() * 90 + 70,
                speed: Math.random() * 7 + 5,
                angle: Math.PI / 4,
                alpha: 1,
                decay: 0.02
            });
        }
    }

    animate() {
        if (!this.ctx) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        // COMPLETE CLEAR - No trails, no ghost smudges!
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw Twinkling Stars
        for (let star of this.stars) {
            star.alpha += star.twinkleSpeed;
            if (star.alpha > 0.95 || star.alpha < 0.15) {
                star.twinkleSpeed *= -1;
            }

            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = star.color;
            this.ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
            this.ctx.fill();
        }

        // Draw Shooting Stars
        this.maybeSpawnShootingStar();
        for (let i = this.shootingStars.length - 1; i >= 0; i--) {
            const s = this.shootingStars[i];
            const endX = s.x - Math.cos(s.angle) * s.len;
            const endY = s.y - Math.sin(s.angle) * s.len;

            const grad = this.ctx.createLinearGradient(s.x, s.y, endX, endY);
            grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
            grad.addColorStop(0.4, `rgba(56, 189, 248, ${s.alpha * 0.8})`);
            grad.addColorStop(1, `rgba(168, 85, 247, 0)`);

            this.ctx.beginPath();
            this.ctx.moveTo(s.x, s.y);
            this.ctx.lineTo(endX, endY);
            this.ctx.strokeStyle = grad;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            s.x += Math.cos(s.angle) * s.speed;
            s.y += Math.sin(s.angle) * s.speed;
            s.alpha -= s.decay;

            if (s.alpha <= 0 || s.x > this.width || s.y > this.height) {
                this.shootingStars.splice(i, 1);
            }
        }

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }

    // Clean DOM-based burst (100% cleanly auto-deleted after 1.2s, ZERO background smudging!)
    spawnHeartExplosion(x, y, count = 25) {
        const symbols = ['💖', '💙', '💜', '✨', '🥰', '🌸', '💫'];
        const container = document.body;

        for (let i = 0; i < count; i++) {
            const el = document.createElement('span');
            el.className = 'dom-burst-heart';
            el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;

            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 120 + 40;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist - 30;

            el.style.setProperty('--tx', `${tx}px`);
            el.style.setProperty('--ty', `${ty}px`);
            el.style.setProperty('--rot', `${(Math.random() - 0.5) * 60}deg`);

            container.appendChild(el);

            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 1100);
        }
    }
}

window.cleanParticles = new CleanRomanticEngine();

window.triggerLoveBurst = function(e) {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    if (e && e.clientX !== undefined) {
        x = e.clientX;
        y = e.clientY;
    }
    window.cleanParticles.spawnHeartExplosion(x, y, 30);
};
