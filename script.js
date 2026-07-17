/* ==========================================================================
   AUTHENTICATION & SOUND ENGINE
   ========================================================================== */
const PASSCODE = "09"; // Set your preferred passcode here (e.g. "09" for Class 9th)
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('password-input');
const gatekeeper = document.getElementById('gatekeeper');
const mainExp = document.getElementById('main-experience');
const bgMusic = document.getElementById('bg-music');
const errorMsg = document.getElementById('error-msg');

unlockBtn.addEventListener('click', attemptUnlock);
passInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') attemptUnlock();
});

function attemptUnlock() {
    if (passInput.value.trim() === PASSCODE) {
        gatekeeper.classList.add('fade-out');
        setTimeout(() => {
            gatekeeper.classList.add('hidden');
            mainExp.classList.remove('hidden');
            initExperience();
        }, 1500);
    } else {
        errorMsg.textContent = "That is not the key, but remember where you met...";
        setTimeout(() => { errorMsg.textContent = ""; }, 4000);
    }
}

function initExperience() {
    // Cinematic Soft Fade-In of Music (4-5 seconds)
    bgMusic.volume = 0;
    bgMusic.play().catch(err => console.log("Audio waiting for explicit interaction."));
    let vol = 0;
    const fadeInterval = setInterval(() => {
        if (vol < 0.3) { // Caps volume comfortably at 30%
            vol += 0.02;
            bgMusic.volume = vol;
        } else {
            clearInterval(fadeInterval);
        }
    }, 300);

    initInteractiveCanvas();
    initScrollTracker();
    initFallingStars();
}

/* ==========================================================================
   DIARY DIALOGUE (PAGE TURNING)
   ========================================================================== */
function turnPage(from, to) {
    const fromPage = document.getElementById(`page-${from}`);
    const toPage = document.getElementById(`page-${to}`);
    if (fromPage && toPage) {
        fromPage.classList.remove('active');
        toPage.classList.add('active');
    }
}

/* ==========================================================================
   ATMOSPHERE SKY CONTROLLER (SCROLL-BASED)
   ========================================================================== */
function initScrollTracker() {
    const sections = document.querySelectorAll('.story-section');
    const options = { threshold: 0.45 }; // Changes sky when section is ~halfway visible

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skyTheme = entry.target.getAttribute('data-sky');
                document.body.setAttribute('data-active-sky', skyTheme);
            }
        });
    }, options);

    sections.forEach(sec => observer.observe(sec));

    // Also observe images inside Section 2 to reveal them elegantly on scroll
    const cards = document.querySelectorAll('.photo-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-card');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => cardObserver.observe(card));
}

/* ==========================================================================
   INTERACTIVE CANVAS (SPARKLE CURSOR TRAIL)
   ========================================================================== */
let canvas, ctx;
let particles = [];

function initInteractiveCanvas() {
    canvas = document.getElementById('sparkleCanvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', addParticles);
    window.addEventListener('touchmove', (e) => {
        addParticles(e.touches[0]);
    });

    animateParticles();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = `rgba(216, 180, 254, ${Math.random() * 0.7 + 0.3})`;
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.005;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function addParticles(e) {
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

/* ==========================================================================
   HIDDEN DISCOVERIES & ELEMENT INTERACTIONS
   ========================================================================== */
// Click Moon -> Mini Starburst
document.getElementById('moon-trigger').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(x, y));
    }
});

// Butterfly & Flower Flutter/Scatter Animations
document.getElementById('butterfly').addEventListener('click', function() {
    this.style.transition = "transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)";
    this.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * -250 - 50}px) scale(0)`;
    setTimeout(() => {
        this.style.transform = "none";
    }, 4000);
});

document.getElementById('flower').addEventListener('click', function(e) {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    // Generate Falling Petals (Pink Particles)
    for (let i = 0; i < 15; i++) {
        let petal = new Particle(x, y);
        petal.color = `rgba(244, 143, 177, ${Math.random() * 0.8 + 0.2})`;
        petal.speedY = Math.random() * 2 + 1; // Slide straight down
        particles.push(petal);
    }
});

/* ==========================================================================
   FALLING STARS (SECTION 4 CANVAS BACKGROUND)
   ========================================================================== */
let starCanvas, starCtx;
let stars = [];

function initFallingStars() {
    starCanvas = document.getElementById('fallingStarsCanvas');
    starCtx = starCanvas.getContext('2d');
    
    const resizeStarCanvas = () => {
        starCanvas.width = starCanvas.parentElement.clientWidth;
        starCanvas.height = starCanvas.parentElement.clientHeight;
    };
    resizeStarCanvas();
    window.addEventListener('resize', resizeStarCanvas);

    for (let i = 0; i < 20; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height - starCanvas.height,
            length: Math.random() * 30 + 10,
            speed: Math.random() * 3 + 2,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    animateFallingStars();
}

function animateFallingStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(star => {
        starCtx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
        starCtx.lineWidth = 1;
        starCtx.beginPath();
        starCtx.moveTo(star.x, star.y);
        starCtx.lineTo(star.x - star.length/2, star.y + star.length);
        starCtx.stroke();

        star.y += star.speed;
        star.x -= star.speed / 2;

        if (star.y > starCanvas.height) {
            star.y = -50;
            star.x = Math.random() * starCanvas.width;
        }
    });
    requestAnimationFrame(animateFallingStars);
}

/* ==========================================================================
   CANDLE BLOW CINEMATIC (BLACKOUT -> SILENCE -> FIREWORKS)
   ========================================================================== */
const candleTrigger = document.getElementById('candle-trigger');
const flame = document.getElementById('candle-flame');
const blackout = document.getElementById('blackout');
const hintText = document.getElementById('candle-hint-text');
const finalSection = document.getElementById('section-5');
const finalMessageBox = document.getElementById('final-message-box');

candleTrigger.addEventListener('click', () => {
    // 1. Extinguish Flame
    flame.style.display = 'none';
    hintText.textContent = "Wish made.";

    // 2. Blackout Screen & Silence Audio Instantly
    blackout.classList.add('active');
    bgMusic.pause();

    // 3. Cinematic Pause (1.5 Seconds)
    setTimeout(() => {
        // Remove blackout screen
        blackout.classList.remove('active');
        
        // 4. Smoothly scroll into final scene
        finalSection.scrollIntoView({ behavior: 'smooth' });

        // 5. Restore Audio and Trigger Big Fireworks
        bgMusic.play();
        triggerFireworks();
        
        // 6. Fade-in ending text
        finalMessageBox.classList.add('revealed');
    }, 1500);
});

/* ==========================================================================
   FIREWORKS ENGINE
   ========================================================================== */
let fCanvas, fCtx;
let fParticles = [];

function triggerFireworks() {
    fCanvas = document.getElementById('fireworksCanvas');
    fCanvas.classList.remove('hidden-canvas');
    fCtx = fCanvas.getContext('2d');
    
    fCanvas.width = fCanvas.parentElement.clientWidth;
    fCanvas.height = fCanvas.parentElement.clientHeight;

    // Launch initial firework burst coordinates
    for (let b = 0; b < 5; b++) {
        setTimeout(() => {
            createExplosion(Math.random() * fCanvas.width, Math.random() * (fCanvas.height * 0.6) + 100);
        }, b * 400);
    }
    
    animateFireworks();
}

function createExplosion(x, y) {
    const colors = ['#f3e8ff', '#d8b4fe', '#a78bfa', '#ffb7b2', '#ffdac1'];
    for (let i = 0; i < 50; i++) {
        fParticles.push({
            x: x,
            y: y,
            speedX: Math.random() * 6 - 3,
            speedY: Math.random() * 6 - 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1,
            decay: Math.random() * 0.02 + 0.01
        });
    }
}

function animateFireworks() {
    fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);
    fParticles = fParticles.filter(p => p.life > 0);
    
    fParticles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.04; // Gravity pull
        p.life -= p.decay;

        fCtx.fillStyle = p.color;
        fCtx.globalAlpha = p.life;
        fCtx.beginPath();
        fCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        fCtx.fill();
    });

    if (fParticles.length > 0) {
        requestAnimationFrame(animateFireworks);
    }
}

/* ==========================================================================
   THE SECRET PORTAL STAR (HIDDEN STAR MODAL)
   ========================================================================== */
const secretStar = document.getElementById('secret-star-btn');
const secretPortal = document.getElementById('secret-portal');
const closePortal = document.getElementById('close-portal-btn');

secretStar.addEventListener('click', () => {
    secretPortal.classList.add('active');
});

closePortal.addEventListener('click', () => {
    secretPortal.classList.remove('active');
});
