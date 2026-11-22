// ===================================================================
// KHUSHI'S LOVE TRIBUTE - 7 RICH SCROLLING CHAPTERS ENGINE
// ===================================================================

let currentSlide = 1;
const totalSlides = 7;
let backgroundAudio = null;
let currentBtsAudio = null;
let currentPlayingBtsKey = null;

document.addEventListener('DOMContentLoaded', () => {
    initAudioEngine();
    initSlideNavigation();
    initPasswordGate();
    initMemeProposal();
    initLoveTimer();
    initClotheslineGallery();
    initMoodDiagnosis();
    initBtsJukebox();
    init100Reasons();
    initWaxLetter();
});

// ===================================================================
// 1. AUDIO ENGINE (Real MP3 & M4A Audio)
// ===================================================================
function initAudioEngine() {
    backgroundAudio = new Audio('assets/perfect.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.5;

    const bgToggleBtn = document.getElementById('bg-music-toggle');
    const visualizer = document.getElementById('music-visualizer');
    const songStatus = document.getElementById('bg-music-title');

    if (bgToggleBtn) {
        bgToggleBtn.addEventListener('click', () => {
            if (backgroundAudio.paused) {
                backgroundAudio.play().then(() => {
                    bgToggleBtn.innerHTML = '⏸';
                    if (visualizer) visualizer.classList.add('playing');
                    if (songStatus) songStatus.textContent = 'Perfect - Ed Sheeran 💖';
                }).catch(err => console.log('Audio autoplay prevented:', err));
            } else {
                backgroundAudio.pause();
                bgToggleBtn.innerHTML = '▶';
                if (visualizer) visualizer.classList.remove('playing');
                if (songStatus) songStatus.textContent = 'Music Paused';
            }
        });
    }
}

function startBackgroundMusic() {
    if (backgroundAudio && backgroundAudio.paused) {
        backgroundAudio.play().then(() => {
            const btn = document.getElementById('bg-music-toggle');
            const visualizer = document.getElementById('music-visualizer');
            const songStatus = document.getElementById('bg-music-title');
            if (btn) btn.innerHTML = '⏸';
            if (visualizer) visualizer.classList.add('playing');
            if (songStatus) songStatus.textContent = 'Perfect - Ed Sheeran 💖';
        }).catch(e => console.log('Autoplay restriction:', e));
    }
}

function pauseBackgroundMusic() {
    if (backgroundAudio && !backgroundAudio.paused) {
        backgroundAudio.pause();
        const btn = document.getElementById('bg-music-toggle');
        const visualizer = document.getElementById('music-visualizer');
        if (btn) btn.innerHTML = '▶';
        if (visualizer) visualizer.classList.remove('playing');
    }
}

// ===================================================================
// 2. MULTI-STEP SLIDE CONTROLLER (Chapters 1 to 7)
// ===================================================================
function initSlideNavigation() {
    updateSlideView(1);

    document.querySelectorAll('.btn-slide-next').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = parseInt(btn.getAttribute('data-next'));
            if (target) goToSlide(target);
            else goToSlide(currentSlide + 1);
        });
    });

    document.querySelectorAll('.btn-slide-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = parseInt(btn.getAttribute('data-prev'));
            if (target) goToSlide(target);
            else goToSlide(currentSlide - 1);
        });
    });

    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const step = parseInt(dot.getAttribute('data-slide'));
            if (step) goToSlide(step);
        });
    });
}

function goToSlide(slideNum) {
    if (slideNum < 1 || slideNum > totalSlides) return;
    currentSlide = slideNum;
    updateSlideView(currentSlide);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateSlideView(slideNum) {
    document.querySelectorAll('.story-slide').forEach(slide => {
        slide.classList.remove('active');
    });

    const activeSlide = document.getElementById(`slide-${slideNum}`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }

    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        if (index + 1 === slideNum) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ===================================================================
// 3. CHAPTER 1: PASSWORD GATE
// ===================================================================
function initPasswordGate() {
    const input = document.getElementById('gate-pass-input');
    const submitBtn = document.getElementById('gate-submit-btn');
    const errorEl = document.getElementById('gate-error-text');

    if (!input || !submitBtn) return;

    const checkPassword = () => {
        const val = input.value.trim().toLowerCase();
        if (val === 'khushi' || val === 'khushii' || val === 'meri khushi') {
            errorEl.textContent = '';
            submitBtn.innerHTML = 'Unlocked! ✨ Opening Universe...';
            submitBtn.classList.add('btn-success-glow');

            startBackgroundMusic();
            if (window.triggerLoveBurst) window.triggerLoveBurst();

            setTimeout(() => {
                goToSlide(2);
            }, 750);
        } else {
            input.classList.add('shake-anim');
            setTimeout(() => input.classList.remove('shake-anim'), 500);
            errorEl.textContent = "Galat naam! Hint: K se shuru hota hai aur mere dil ki rani hai 👸💖";
        }
    };

    submitBtn.addEventListener('click', checkPassword);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });
}

// ===================================================================
// 4. CHAPTER 2: MEME PROPOSAL (from 97-lac.vercel.app)
// ===================================================================
function initMemeProposal() {
    const yesBtn = document.getElementById('proposal-yes-btn');
    const noBtn = document.getElementById('proposal-no-btn');
    const memeImg = document.getElementById('proposal-meme-sticker');
    const titleEl = document.getElementById('proposal-title');
    const subtitleEl = document.getElementById('proposal-subtitle');
    const successCard = document.getElementById('proposal-success-box');

    if (!yesBtn || !noBtn || !memeImg) return;

    const rejectionGifs = [
        "assets/stickers/sad-cat.webp",
        "assets/stickers/pleas-please.webp",
        "assets/stickers/200w.webp",
        "assets/stickers/dracriona-ezio.webp",
        "assets/stickers/cat-gun.webp"
    ];

    const rejectionMessages = [
        { t: "Wait... Really? 🥺", s: "Is this real? My heart skipped a beat when you hesitated. Please don't say no to us!" },
        { t: "Don't Break My Heart 💔", s: "I promise endless laughter, warm hugs, and all the snacks you want. Please, give us a chance!" },
        { t: "I'm Pleading With You 🙏", s: "I will cross oceans just to see you smile. You are the only one I want, today and always!" },
        { t: "Look At That Cat Gun! 😭", s: "Don't do this to me! Kim Taehyung also told you to click YES, FOREVER!" },
        { t: "Please Madam... 🥺💖", s: "Option 'No' is strictly illegal for Khushi. You are stuck with me forever!" }
    ];

    let dodgeCount = 0;

    const dodgeNoButton = (e) => {
        if (e) e.preventDefault();
        dodgeCount++;

        const card = document.getElementById('proposal-buttons-area');
        const rect = card.getBoundingClientRect();
        const randX = (Math.random() * 0.6 - 0.3) * rect.width;
        const randY = (Math.random() * 0.5 - 0.25) * rect.height;

        noBtn.style.transform = `translate(${randX}px, ${randY}px)`;

        const gifIdx = (dodgeCount - 1) % rejectionGifs.length;
        memeImg.src = rejectionGifs[gifIdx];

        const msg = rejectionMessages[gifIdx];
        if (titleEl) titleEl.textContent = msg.t;
        if (subtitleEl) subtitleEl.textContent = msg.s;

        const currentScale = Math.min(1.4, 1 + dodgeCount * 0.08);
        yesBtn.style.transform = `scale(${currentScale})`;

        if (window.triggerLoveBurst) window.triggerLoveBurst();
    };

    noBtn.addEventListener('mouseenter', dodgeNoButton);
    noBtn.addEventListener('touchstart', dodgeNoButton, { passive: false });
    noBtn.addEventListener('click', dodgeNoButton);

    yesBtn.addEventListener('click', () => {
        memeImg.src = "assets/stickers/cat-kiss.webp";
        if (successCard) successCard.style.display = 'block';

        if (window.triggerLoveBurst) {
            for (let i = 0; i < 3; i++) {
                setTimeout(window.triggerLoveBurst, i * 200);
            }
        }
    });
}

function initLoveTimer() {
    const startDate = new Date("2024-01-01T00:00:00");
    const daysEl = document.getElementById('counter-days');
    const hoursEl = document.getElementById('counter-hours');
    const minEl = document.getElementById('counter-minutes');
    const secEl = document.getElementById('counter-seconds');

    if (!daysEl) return;

    function update() {
        const now = new Date();
        const diffMs = now - startDate;
        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        daysEl.textContent = days.toLocaleString();
        hoursEl.textContent = String(hours).padStart(2, '0');
        minEl.textContent = String(minutes).padStart(2, '0');
        secEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// ===================================================================
// 5. CHAPTER 3: CLOTHESLINE POLAROID GALLERY
// ===================================================================
const photoStories = {
    'photo1': {
        title: "The Squishy Cheeks Pose 🥰",
        caption: "Both hands framing that soft, sweet smile. You have no idea how much peace this single photo gives me. It’s my absolute favorite picture in the world.",
        sticker: "🍑 Squishy Perfection"
    },
    'photo2': {
        title: "Runway Slayer & Dark Aesthetic 🖤✨",
        caption: "Emerald green textured sweater, hair brushed back, sharp eyeliner, and that model-level gaze. Main character energy off the charts!",
        sticker: "💅 100% Unstoppable Baddie"
    },
    'photo3': {
        title: "The Innocent 'Maine Kuch Nahi Kiya' Smile 😇",
        caption: "Cozy bed selfie looking like a tiny angel. Usually made right before asking for treats, pampering, or extra attention!",
        sticker: "🧸 Dangerous Innocence"
    },
    'photo4': {
        title: "The Micro-Bindi & Mischievous Smirk 🫠",
        caption: "A tiny red bindi on your forehead and that subtle smirk... Pure desi royalty. You look like poetry in real life, Khushi.",
        sticker: "👑 Desi Queen"
    },
    'photo5': {
        title: "The Goofy Ring Inspector (Peak Meme) 🤪💍",
        caption: "Tongue out, inspecting mehendi/ring like a certified diamond scientist! This is why I love you—50% goddess, 50% pure certified goofball!",
        sticker: "🤪 Supreme Meme Queen"
    }
};

function initClotheslineGallery() {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-photo-img');
    const modalTitle = document.getElementById('modal-photo-title');
    const modalCaption = document.getElementById('modal-photo-caption');
    const modalSticker = document.getElementById('modal-photo-sticker');
    const closeModalBtn = document.getElementById('close-photo-modal');

    document.querySelectorAll('.hang-photo, .avatar-detail-card').forEach(item => {
        item.addEventListener('click', () => {
            const pid = item.getAttribute('data-photo-id');
            const data = photoStories[pid];
            const img = item.querySelector('img');

            if (data && img) {
                modalImg.src = img.src;
                modalTitle.textContent = data.title;
                modalCaption.textContent = data.caption;
                modalSticker.textContent = data.sticker;
                modal.classList.add('active');
                if (window.triggerLoveBurst) window.triggerLoveBurst();
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
}

// ===================================================================
// 6. CHAPTER 4: MOOD DIAGNOSIS & CARE DISPATCH
// ===================================================================
function initMoodDiagnosis() {
    const dramaSlider = document.getElementById('drama-meter-slider');
    const dramaText = document.getElementById('drama-meter-val');
    const toast = document.getElementById('mood-diagnostic-toast');

    if (dramaSlider) {
        dramaSlider.addEventListener('input', (e) => {
            let val = parseInt(e.target.value);
            if (val < 100) {
                setTimeout(() => {
                    dramaSlider.value = 100;
                    if (dramaText) dramaText.textContent = '100% (Certified Queen 👑)';
                    if (toast) {
                        toast.textContent = "Warning: Khushi's Drama is an essential superpower! Cannot be reduced! 😂❤️";
                        toast.style.display = 'block';
                        setTimeout(() => toast.style.display = 'none', 3000);
                    }
                }, 200);
            }
        });
    }

    const hugBtn = document.getElementById('btn-emergency-hug');
    const pizzaBtn = document.getElementById('btn-emergency-pizza');
    const queenBtn = document.getElementById('btn-emergency-queen');
    const displayBox = document.getElementById('mood-action-result');

    if (hugBtn) {
        hugBtn.addEventListener('click', () => {
            if (window.triggerLoveBurst) window.triggerLoveBurst();
            if (displayBox) {
                displayBox.innerHTML = `
                    <div class="care-feedback-card">
                        <span style="font-size: 2rem;">🧸💖</span>
                        <h4>Warm Hug Dispatched!</h4>
                        <p>Giant virtual cuddle arriving at warp speed! Cuteness recharged to 1000%! 🥰</p>
                    </div>
                `;
            }
        });
    }

    if (pizzaBtn) {
        pizzaBtn.addEventListener('click', () => {
            if (window.triggerLoveBurst) window.triggerLoveBurst();
            if (displayBox) {
                displayBox.innerHTML = `
                    <div class="care-feedback-card">
                        <span style="font-size: 2rem;">🍕🍟🧋</span>
                        <h4>Emergency Snacks Arrived!</h4>
                        <p>Crispy fries, cheesy pizza, and boba delivered to Khushi's heart! Hangry mood successfully solved! 😋</p>
                    </div>
                `;
            }
        });
    }

    if (queenBtn) {
        queenBtn.addEventListener('click', () => {
            if (window.triggerLoveBurst) window.triggerLoveBurst();
            const compliments = [
                "Khushi, tumhare chehre pe jo smile aati hai na, sach me mera poora din bana deti hai. 💖",
                "World's most gorgeous girl? Rank 1: Khushi. Rank 2: Also Khushi! ✨",
                "Chahe kitna bhi gussa ho lo, end me cute hi lagti ho (ekdum marshmallow jaisi)! 🥰",
                "Kim Taehyung has got nothing on the charm of your single smile! 💜"
            ];
            const rand = compliments[Math.floor(Math.random() * compliments.length)];
            if (displayBox) {
                displayBox.innerHTML = `
                    <div class="care-feedback-card">
                        <span style="font-size: 2rem;">👑✨</span>
                        <h4>Royal Announcement for Khushi:</h4>
                        <p>"${rand}"</p>
                    </div>
                `;
            }
        });
    }
}

// ===================================================================
// 7. CHAPTER 5: BTS & KIM TAEHYUNG ZONE (6 Real Playable Songs)
// ===================================================================
const btsSongs = {
    'sweet_night': { file: 'assets/sweet_night.m4a', title: 'Sweet Night', artist: 'V (Kim Taehyung) • Itaewon Class OST' },
    'winter_bear': { file: 'assets/winter_bear.m4a', title: 'Winter Bear', artist: 'V (Kim Taehyung)' },
    'christmas_tree': { file: 'assets/christmas_tree.m4a', title: 'Christmas Tree', artist: 'V (Kim Taehyung) • Our Beloved Summer' },
    'slow_dancing': { file: 'assets/slow_dancing.m4a', title: 'Slow Dancing', artist: 'V (Kim Taehyung) • Layover' },
    'love_me_again': { file: 'assets/love_me_again.m4a', title: 'Love Me Again', artist: 'V (Kim Taehyung) • Layover' },
    'dynamite': { file: 'assets/dynamite.m4a', title: 'Dynamite', artist: 'BTS' }
};

function initBtsJukebox() {
    document.querySelectorAll('.bts-play-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const songKey = btn.getAttribute('data-song');
            playBtsSong(songKey, btn);
        });
    });
}

function playBtsSong(key, clickedBtn) {
    const songData = btsSongs[key];
    if (!songData) return;

    if (currentPlayingBtsKey === key && currentBtsAudio && !currentBtsAudio.paused) {
        currentBtsAudio.pause();
        clickedBtn.innerHTML = '▶ Play';
        clickedBtn.closest('.bts-song-card').classList.remove('card-playing');
        return;
    }

    if (currentBtsAudio) {
        currentBtsAudio.pause();
        document.querySelectorAll('.bts-play-btn').forEach(b => b.innerHTML = '▶ Play');
        document.querySelectorAll('.bts-song-card').forEach(c => c.classList.remove('card-playing'));
    }

    pauseBackgroundMusic();

    currentBtsAudio = new Audio(songData.file);
    currentPlayingBtsKey = key;
    currentBtsAudio.play().then(() => {
        clickedBtn.innerHTML = '⏸ Pause';
        clickedBtn.closest('.bts-song-card').classList.add('card-playing');

        const nowPlayingBar = document.getElementById('bts-now-playing-banner');
        if (nowPlayingBar) {
            nowPlayingBar.textContent = `💜 Now Playing: ${songData.title} by ${songData.artist}`;
            nowPlayingBar.style.display = 'block';
        }
    }).catch(err => {
        console.log('Error playing BTS song:', err);
    });

    currentBtsAudio.addEventListener('ended', () => {
        clickedBtn.innerHTML = '▶ Play';
        clickedBtn.closest('.bts-song-card').classList.remove('card-playing');
        startBackgroundMusic();
    });
}

// ===================================================================
// 8. CHAPTER 6: 100 REASONS WHY I LOVE YOU
// ===================================================================
const reasons100 = [
    "The way your cheeks look when you smile—it instantly melts my worst days.",
    "Because your voice is the safest and most comforting place in the world for me.",
    "How you look like an adorable angry marshmallow when you are hungry.",
    "Because when you laugh, your whole face lights up and my heart skips a beat.",
    "That micro-bindi look of yours... pure poetry and deadly charm.",
    "Because even when you roll your eyes at me, you look painfully cute.",
    "The goofy face you make with your tongue out while checking a ring.",
    "Because you are the very first person I want to text when anything happens.",
    "Your runway baddie look in that black and emerald green top.",
    "Because you scream over Kim Taehyung, but still chose to keep me in your heart.",
    "How you pretend to be mad just so I will pamper you with compliments.",
    "Because holding your hand makes every anxiety in my life vanish.",
    "Because you don't even have to try to look breathtaking; you just exist.",
    "The sweet innocent smile you give right before asking for treats.",
    "Because you taught me what Borahae means, and purple became my favorite color.",
    "Because I can be 100% my weird, unfiltered self with you.",
    "The way your eyes sparkle when you talk about things you love.",
    "Because your hugs feel like coming home after a thousand miles.",
    "How you do a little happy dance when delicious food arrives.",
    "Because you believe in me even during the moments when I doubt myself.",
    "The way you say 'Arey suno na...' with that gentle tone.",
    "Because you can turn a boring roadside chai into an unforgettable date.",
    "Your hair, your smell, your warmth, and everything about your presence.",
    "Because you are my best friend, my soulmate, and my favorite trouble.",
    "How you pout when something doesn't go exactly your way.",
    "Because you tolerate all my lame jokes and still laugh at some of them.",
    "Because when I look into your eyes, I see my entire future looking right back at me.",
    "The funny way you inspect things like a high-tech forensic detective.",
    "Because your heart is as pure and gentle as your smile.",
    "Because in a world full of noise, you are my quiet peace.",
    "How you look effortlessly gorgeous in both oversized clothes and ethnic wear.",
    "Because every second spent with you feels like a blessing.",
    "The little sighs you let out when you are cozy and sleepy.",
    "Because you remember the tiniest details about things I like.",
    "Because you make ordinary days feel like chapters from a romantic novel.",
    "Your dramatic gasps whenever I tease you slightly.",
    "Because if Kim Taehyung ever met you, he'd agree I'm the luckiest guy alive.",
    "The way you hold onto my arm when we are walking.",
    "Because you forgive my mistakes with such grace and kindness.",
    "Because you are Khushi—and true to your name, you are the happiness of my life.",
    "How you check your hair in any reflective surface you pass by.",
    "Because you inspire me to be a better person every single day.",
    "Because loving you comes as naturally to me as breathing.",
    "The funny memes and reels you send me in the middle of the day.",
    "Because you always know how to make me smile even when I'm exhausted.",
    "Your sharp eyeliner that could literally cut glass.",
    "Because you make me feel valued, respected, and deeply loved.",
    "The cute way you try to hide your smile when you are trying to stay angry at me.",
    "Because I could look at your 5 photos for hours and never get tired.",
    "Because you are my favorite notification on my phone.",
    "Because your presence alone makes any room feel warmer.",
    "The gentle way you touch my hair or tap my cheek.",
    "Because we have our own private language of inside jokes.",
    "Because you are fiercely loyal and protective of the people you love.",
    "The cute face you make when drinking something through a straw.",
    "Because when you hold my hand, everything in my life makes sense.",
    "How you get excited over little surprises like a child.",
    "Because you never let me go to bed feeling unloved or alone.",
    "Because 'I love you' feels too small to describe how deeply I adore you.",
    "The way you look at me across a crowded room and smile.",
    "Because you make me want to protect your happiness with everything I have.",
    "Your silly voice when talking to cute animals or puppies.",
    "Because you understand my silence just as well as my words.",
    "Because every song about love reminds me of you, especially 'Perfect'.",
    "How you look in the golden hour sunlight—like a literal angel.",
    "Because you are patient with me even when I am difficult.",
    "The way you lean your head on my shoulder when you're tired.",
    "Because you have the sweetest, warmest laughter I've ever heard.",
    "Because you give the best forehead kisses in the universe.",
    "How your eyes crinkle at the edges when you laugh wholeheartedly.",
    "Because you make me feel like the king of the world just by loving me.",
    "Because you are irreplaceable in every single way imaginable.",
    "The way you check if I have eaten properly when I am busy.",
    "Because you make my heart beat faster and slower at the exact same time.",
    "How you wrap yourself in a blanket like a cute little sushi roll.",
    "Because being loved by you is the greatest privilege of my life.",
    "Because you are beautiful on the outside, but 1000x more beautiful inside.",
    "The cute angry face you make when I don't listen to you immediately.",
    "Because you stand by me through every high and every low.",
    "Because your hugs can cure literally 99.9% of all sadness.",
    "The funny way you try to act serious when you're about to burst out laughing.",
    "Because you are my morning thought and my midnight prayer.",
    "How you always share your food with me (even your favorite snacks).",
    "Because you are the dream I never knew I was allowed to have.",
    "The cute little sounds you make when you yawn.",
    "Because you love BTS with so much passion and pure joy.",
    "Because you make even waiting in traffic enjoyable just by sitting next to me.",
    "How you blush whenever I catch you staring at me.",
    "Because you are my greatest supporter and my favorite cheerleader.",
    "The sweet way you say my name that makes my heart flutter.",
    "Because you have brought so much colors into my previously monochrome life.",
    "Because I can trust you with every single secret and vulnerability I have.",
    "The way your hand fits perfectly inside mine, like it was tailored for it.",
    "Because you make me proud to call you mine every single day.",
    "Because no matter how tough life gets, knowing you exist makes it worth it.",
    "The cute little pout when you are concentrating on your phone.",
    "Because you are my favorite person to make memories with.",
    "Because I want to wake up and see your sweet smiling face every day.",
    "Because 100 reasons will never be enough to capture all that you are to me.",
    "Because I loved you yesterday, I love you today, and I will love you forever. ❤️"
];

function init100Reasons() {
    const listEl = document.getElementById('reasons-100-list');
    const searchInput = document.getElementById('reasons-search-input');
    const randomBtn = document.getElementById('reasons-random-btn');

    if (!listEl) return;

    function renderReasons(filter = '') {
        listEl.innerHTML = '';
        reasons100.forEach((text, i) => {
            if (!filter || text.toLowerCase().includes(filter.toLowerCase())) {
                const li = document.createElement('li');
                li.className = 'reason-item';
                li.innerHTML = `
                    <span class="reason-num">#${i + 1}</span>
                    <span class="reason-desc">${text}</span>
                    <span class="reason-heart">💙</span>
                `;
                listEl.appendChild(li);
            }
        });
    }

    renderReasons();

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderReasons(e.target.value);
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            const items = listEl.querySelectorAll('.reason-item');
            if (items.length) {
                const rand = items[Math.floor(Math.random() * items.length)];
                rand.scrollIntoView({ behavior: 'smooth', block: 'center' });
                rand.classList.add('highlight-reason');
                setTimeout(() => rand.classList.remove('highlight-reason'), 2000);
                if (window.triggerLoveBurst) window.triggerLoveBurst();
            }
        });
    }
}

// ===================================================================
// 9. CHAPTER 7: 3D REALISTIC ENVELOPE, LUXURY LETTER & KISS STAMPER
// ===================================================================
function initWaxLetter() {
    const sealBtn = document.getElementById('wax-seal-btn');
    const envelopeCard = document.getElementById('envelope-sealed-card');
    const letterStage = document.getElementById('unfolded-letter-stage');
    const subtitleEl = document.getElementById('letter-hero-subtitle');
    const kissBtn = document.getElementById('btn-stamp-kiss');
    const kissBox = document.getElementById('kiss-stamps-container');
    const kissBadge = document.getElementById('kiss-feedback-msg');
    const replayBtn = document.getElementById('btn-replay-universe');

    let kissesCount = 0;

    // 1. Break Seal & Open Envelope
    if (sealBtn && envelopeCard && letterStage) {
        sealBtn.addEventListener('click', () => {
            sealBtn.classList.add('seal-broken');
            envelopeCard.classList.add('envelope-opened');

            if (window.triggerLoveBurst) {
                window.triggerLoveBurst();
                window.triggerLoveBurst();
            }

            setTimeout(() => {
                envelopeCard.style.display = 'none';
                letterStage.style.display = 'block';
                if (subtitleEl) {
                    subtitleEl.textContent = "Written straight from my heart. Take your time and read it, my cutie! 💖";
                }
                if (window.triggerLoveBurst) window.triggerLoveBurst();
            }, 650);
        });
    }

    // 2. Interactive Kiss Stamper
    if (kissBtn && kissBox && kissBadge) {
        kissBtn.addEventListener('click', () => {
            kissesCount++;
            kissBadge.textContent = `${kissesCount} Kiss${kissesCount > 1 ? 'es' : ''} Placed 💋`;

            const mark = document.createElement('span');
            mark.className = 'kiss-stamp-mark';
            mark.textContent = '💋';
            const randomRot = Math.floor(Math.random() * 40 - 20);
            mark.style.setProperty('--rot', `${randomRot}deg`);

            kissBox.appendChild(mark);
            if (kissBox.children.length > 10) {
                kissBox.removeChild(kissBox.firstChild);
            }

            kissBtn.classList.add('pop-anim');
            setTimeout(() => kissBtn.classList.remove('pop-anim'), 300);

            if (window.triggerLoveBurst) window.triggerLoveBurst();
        });
    }

    // 3. Love Reaction Counters
    document.querySelectorAll('.love-reaction-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const count = btn.querySelector('.reaction-count');
            if (count) {
                count.textContent = parseInt(count.textContent || 0) + 1;
            }
            btn.classList.add('pop-anim');
            setTimeout(() => btn.classList.remove('pop-anim'), 300);
            if (window.triggerLoveBurst) window.triggerLoveBurst();
        });
    });

    // 4. Replay From Beginning
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            if (envelopeCard && letterStage && sealBtn) {
                envelopeCard.style.display = 'block';
                letterStage.style.display = 'none';
                sealBtn.classList.remove('seal-broken');
                envelopeCard.classList.remove('envelope-opened');
                if (subtitleEl) {
                    subtitleEl.textContent = "A private handwritten letter created just for you. Break the royal wax seal to read it!";
                }
            }
            goToSlide(1);
        });
    }
}
