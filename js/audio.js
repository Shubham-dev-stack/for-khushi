// Audio Engine & Web Audio Synthesizer for Khushi's Love Website
// Features: Zero-dependency Web Audio synthesizers for romantic songs + sound effects

class LoveAudioManager {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.currentTrack = 'perfect'; // 'perfect' | 'sweetnight' | 'winterbear'
        this.volume = 0.6;
        this.activeNodes = [];
        this.sequenceTimeout = null;
        this.step = 0;
        this.bpm = 68;
        this.externalAudio = null;
        this.initUIListeners();
    }

    initContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Sound Effects
    playChime() {
        this.initContext();
        const now = this.ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);

            gain.gain.setValueAtTime(0, now + idx * 0.07);
            gain.gain.linearRampToValueAtTime(0.2 * this.volume, now + idx * 0.07 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.8);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.9);
        });
    }

    playPop() {
        this.initContext();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

        gain.gain.setValueAtTime(0.25 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    playError() {
        this.initContext();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(180, now + 0.1);

        gain.gain.setValueAtTime(0.15 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    }

    playBorahaeSound() {
        this.initContext();
        const now = this.ctx.currentTime;
        // Dreamy purple chord progression: F#m -> D -> A -> E
        const notes = [
            [369.99, 440.00, 554.37], // F#m
            [293.66, 369.99, 440.00], // D
            [440.00, 554.37, 659.25], // A
            [329.63, 415.30, 493.88]  // E
        ];
        notes.forEach((chord, chordIdx) => {
            const time = now + chordIdx * 0.45;
            chord.forEach(freq => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, time);

                gain.gain.setValueAtTime(0, time);
                gain.gain.linearRampToValueAtTime(0.12 * this.volume, time + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, time + 0.8);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(time);
                osc.stop(time + 0.9);
            });
        });
    }

    playWaxCrackle() {
        this.initContext();
        const now = this.ctx.currentTime;
        // Subtle parchment rustle / wax seal break
        const bufferSize = this.ctx.sampleRate * 0.3;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }
        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        filter.Q.value = 1.5;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        whiteNoise.start(now);
        this.playPop();
    }

    // --- Procedural Romantic Songs (Web Audio Synthesizer) ---
    // Note to Frequency Helper
    n2f(note) {
        const notes = {
            'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
            'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99,
            'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
            'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99,
            'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'B5': 987.77,
            'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, '0': 0
        };
        return notes[note] || 0;
    }

    // Play a single bell/kalimba/piano tone
    playTone(freq, time, duration = 0.5, type = 'sine', amp = 0.15) {
        if (!freq || freq === 0) return;
        const osc = this.ctx.createOscillator();
        const oscHarmonic = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);

        // Harmonic overtone for lush music box feel
        oscHarmonic.type = 'triangle';
        oscHarmonic.frequency.setValueAtTime(freq * 2, time);

        const gainNode = this.ctx.createGain();
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(amp * this.volume, time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(gainNode);
        oscHarmonic.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start(time);
        oscHarmonic.start(time);
        osc.stop(time + duration + 0.1);
        oscHarmonic.stop(time + duration + 0.1);
    }

    // Play Bass Note
    playBass(freq, time, duration = 0.8) {
        if (!freq || freq === 0) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq / 2, time);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.12 * this.volume, time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + duration + 0.1);
    }

    // Song 1: "Perfect" (Ed Sheeran) - "I found a love for me... darling just dive right in..."
    getPerfectScore() {
        // [melody_note, bass_note, duration_beats]
        return [
            // "I found a love... for me"
            ['G4', 'G3', 1], ['A4', 0, 0.5], ['B4', 0, 1.5], ['B4', 'G3', 1], ['C5', 0, 0.5], ['B4', 0, 1], ['A4', 0, 1],
            // "Darling just dive right in"
            ['G4', 'E3', 1], ['A4', 0, 0.5], ['B4', 0, 1.5], ['A4', 'E3', 1], ['G4', 0, 1],
            // "And follow my lead"
            ['E4', 'C3', 1.5], ['G4', 0, 0.5], ['A4', 0, 1], ['G4', 'D3', 2],
            // "Well I found a girl, beautiful and sweet"
            ['G4', 'G3', 1], ['A4', 0, 0.5], ['B4', 0, 1.5], ['B4', 'G3', 1], ['C5', 0, 0.5], ['B4', 0, 1], ['A4', 0, 0.5], ['G4', 0, 0.5],
            // "I never knew you were the someone waiting for me"
            ['G4', 'E3', 1], ['A4', 0, 0.5], ['B4', 0, 1.5], ['A4', 0, 0.5], ['G4', 'E3', 1], ['E4', 0, 1],
            ['E4', 'C3', 1], ['G4', 0, 0.5], ['A4', 0, 1], ['B4', 'D3', 1.5], ['A4', 0, 1], ['G4', 'G3', 2],
            // Chorus teaser: "Baby, I'm dancing in the dark with you between my arms..."
            ['D5', 'G3', 1.5], ['C5', 0, 0.5], ['B4', 0, 1], ['A4', 'E3', 1.5], ['G4', 0, 0.5], ['A4', 0, 1],
            ['B4', 'C3', 1.5], ['A4', 0, 0.5], ['G4', 0, 1], ['E4', 'D3', 2]
        ];
    }

    // Song 2: "Sweet Night" - V (Kim Taehyung)
    getSweetNightScore() {
        return [
            // "On my pillow... can't get me tired"
            ['E4', 'C3', 1], ['G4', 0, 1], ['C5', 0, 1], ['B4', 'E3', 1.5], ['A4', 0, 0.5], ['G4', 0, 1],
            ['F4', 'F3', 1], ['A4', 0, 1], ['C5', 0, 1], ['B4', 'G3', 2],
            // "Sharing my fragile truth, that I still hope the door is open"
            ['C4', 'C3', 0.5], ['E4', 0, 0.5], ['G4', 0, 1], ['A4', 'E3', 1], ['G4', 0, 1],
            ['F4', 'F3', 1], ['G4', 0, 0.5], ['A4', 0, 1], ['G4', 'G3', 1.5], ['E4', 0, 1],
            // "Sweet night... my heart is calling for you"
            ['E5', 'C3', 1.5], ['D5', 0, 0.5], ['C5', 'E3', 1], ['B4', 0, 1],
            ['A4', 'F3', 1.5], ['C5', 0, 0.5], ['B4', 'G3', 2],
            ['G4', 'C3', 1], ['A4', 0, 0.5], ['B4', 0, 0.5], ['C5', 'C3', 2]
        ];
    }

    // Song 3: "Winter Bear" - V (Kim Taehyung)
    getWinterBearScore() {
        return [
            ['G4', 'G3', 1], ['B4', 0, 1], ['D5', 0, 1], ['C5', 'C3', 1.5], ['B4', 0, 0.5], ['A4', 0, 1],
            ['G4', 'E3', 1], ['A4', 0, 0.5], ['B4', 0, 1], ['G4', 'D3', 2],
            ['B4', 'G3', 1], ['D5', 0, 1], ['E5', 'C3', 2], ['D5', 0, 1], ['B4', 'E3', 1],
            ['A4', 'D3', 1.5], ['G4', 0, 0.5], ['G4', 'G3', 2]
        ];
    }

    startMusicSequence() {
        if (!this.isPlaying) return;
        this.initContext();

        let score = [];
        let speed = 400; // ms per beat

        if (this.currentTrack === 'perfect') {
            score = this.getPerfectScore();
            speed = 420;
        } else if (this.currentTrack === 'sweetnight') {
            score = this.getSweetNightScore();
            speed = 480;
        } else {
            score = this.getWinterBearScore();
            speed = 520;
        }

        const noteInfo = score[this.step % score.length];
        const [melody, bass, beats] = noteInfo;

        const now = this.ctx.currentTime;
        const durSeconds = (beats * speed) / 1000;

        if (melody) {
            this.playTone(this.n2f(melody), now, durSeconds * 0.9, 'sine', 0.16);
        }
        if (bass) {
            this.playBass(this.n2f(bass), now, durSeconds * 1.2);
        }

        this.step++;
        const nextTime = beats * speed;

        this.sequenceTimeout = setTimeout(() => {
            if (this.isPlaying) {
                this.startMusicSequence();
            }
        }, nextTime);
    }

    play() {
        this.initContext();
        this.isPlaying = true;
        this.updatePlayerUI(true);
        this.startMusicSequence();
    }

    pause() {
        this.isPlaying = false;
        if (this.sequenceTimeout) {
            clearTimeout(this.sequenceTimeout);
            this.sequenceTimeout = null;
        }
        this.updatePlayerUI(false);
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    switchTrack(trackName) {
        this.currentTrack = trackName;
        this.step = 0;
        if (this.isPlaying) {
            if (this.sequenceTimeout) clearTimeout(this.sequenceTimeout);
            this.startMusicSequence();
        }
        this.updateTrackNameUI();
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
    }

    updatePlayerUI(playing) {
        const btn = document.getElementById('music-toggle-btn');
        const eq = document.getElementById('music-visualizer');
        const statusText = document.getElementById('music-status-text');
        if (btn) {
            btn.innerHTML = playing ? '⏸' : '▶';
            btn.setAttribute('aria-label', playing ? 'Pause Music' : 'Play Music');
        }
        if (eq) {
            if (playing) {
                eq.classList.add('playing');
            } else {
                eq.classList.remove('playing');
            }
        }
        if (statusText) {
            statusText.textContent = playing ? 'Playing...' : 'Paused';
        }
    }

    updateTrackNameUI() {
        const titleEl = document.getElementById('current-song-title');
        const artistEl = document.getElementById('current-song-artist');
        if (!titleEl) return;

        if (this.currentTrack === 'perfect') {
            titleEl.textContent = 'Perfect (Acoustic Box)';
            if (artistEl) artistEl.textContent = 'Ed Sheeran • For Khushi';
        } else if (this.currentTrack === 'sweetnight') {
            titleEl.textContent = 'Sweet Night (Lofi Love)';
            if (artistEl) artistEl.textContent = 'V (Kim Taehyung) • Khushi’s Bias 💜';
        } else {
            titleEl.textContent = 'Winter Bear (Music Box)';
            if (artistEl) artistEl.textContent = 'V (Kim Taehyung) • Cozy Vibe 🐻';
        }
    }

    initUIListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const toggleBtn = document.getElementById('music-toggle-btn');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggle());
            }

            const trackSelect = document.getElementById('track-select');
            if (trackSelect) {
                trackSelect.addEventListener('change', (e) => {
                    this.switchTrack(e.target.value);
                });
            }

            // Quick music buttons in BTS section
            const btsPlayBtn = document.getElementById('bts-play-sweetnight');
            if (btsPlayBtn) {
                btsPlayBtn.addEventListener('click', () => {
                    this.switchTrack('sweetnight');
                    if (!this.isPlaying) this.play();
                    this.playBorahaeSound();
                });
            }

            const btsPlayWinter = document.getElementById('bts-play-winterbear');
            if (btsPlayWinter) {
                btsPlayWinter.addEventListener('click', () => {
                    this.switchTrack('winterbear');
                    if (!this.isPlaying) this.play();
                    this.playBorahaeSound();
                });
            }

            const playPerfectBtn = document.getElementById('play-perfect-hero-btn');
            if (playPerfectBtn) {
                playPerfectBtn.addEventListener('click', () => {
                    this.switchTrack('perfect');
                    if (!this.isPlaying) this.play();
                    this.playChime();
                });
            }
        });
    }
}

// Global instance
window.loveAudio = new LoveAudioManager();
