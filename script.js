document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. STARS & STARFIELD ENGINE (HTML5 Canvas) ---
    const starfieldCanvas = document.getElementById("starfield");
    const starCtx = starfieldCanvas.getContext("2d");
    
    let starsArray = [];
    const maxStars = 150;

    function resizeStarfield() {
        starfieldCanvas.width = window.innerWidth;
        starfieldCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeStarfield);
    resizeStarfield();

    class Star {
        constructor() {
            this.x = Math.random() * starfieldCanvas.width;
            this.y = Math.random() * starfieldCanvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.05;
            this.speedY = (Math.random() - 0.5) * 0.05;
            this.twinkleFactor = Math.random();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > starfieldCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > starfieldCanvas.height) this.speedY *= -1;

            this.twinkleFactor += 0.01;
        }
        draw() {
            starCtx.beginPath();
            let alpha = Math.abs(Math.sin(this.twinkleFactor));
            starCtx.fillStyle = `rgba(220, 211, 255, ${alpha})`;
            starCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            starCtx.fill();
        }
    }

    for (let i = 0; i < maxStars; i++) {
        starsArray.push(new Star());
    }

    function animateStars() {
        starCtx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);
        starsArray.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();


    // --- 2. AUDIO & PASSWORD UNLOCK SYSTEM ---
    const passwordScreen = document.getElementById("password-screen");
    const unlockBtn = document.getElementById("unlock-btn");
    const secretInput = document.getElementById("secret-key");
    const mainContent = document.getElementById("main-content");
    const musicWidget = document.getElementById("music-widget");
    const bgMusic = document.getElementById("bg-music");
    const musicToggleBtn = document.getElementById("music-toggle");

    let isMusicPlaying = false;

    function handleUnlock() {
        const value = secretInput.value.trim().toLowerCase();
        
        // Accepts any variation of vanshika or common birth years
        if (value === "vanshika" || value === "2000" || value === "2001" || value === "2002" || value === "2003" || value === "2004" || value === "2005" || value === "2006" || value === "17") {
            // Unlocked Animation Sequence
            passwordScreen.classList.add("fade-out");
            mainContent.classList.add("unlocked");
            musicWidget.classList.remove("hidden");
            
            // Trigger Music Autoplay
            playMusic();
            
            // Trigger Typist Effect 1s after reveal
            setTimeout(startTypingEffect, 1000);
        } else {
            alert("The galaxy whispers: That key is incorrect. Try entering 'vanshika' ✨");
            secretInput.value = "";
        }
    }

    function playMusic() {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggleBtn.innerHTML = '<i class="fa-solid fa-compact-disc fa-spin"></i>';
        }).catch(err => console.log("Audio awaiting user interaction trigger..."));
    }

    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
            musicToggleBtn.innerHTML = '<i class="fa-solid fa-compact-disc"></i>';
        } else {
            bgMusic.play();
            isMusicPlaying = true;
            musicToggleBtn.innerHTML = '<i class="fa-solid fa-compact-disc fa-spin"></i>';
        }
    }

    unlockBtn.addEventListener("click", handleUnlock);
    secretInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleUnlock();
    });
    musicToggleBtn.addEventListener("click", toggleMusic);


    // --- 3. AMBIENT APPLE-STYLE TYPING EFFECT ---
    const words = ["your personal dreamscape.", "a cosmic celebration of you.", "built with brotherly love."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextSpan = document.getElementById("typed-text");

    function startTypingEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = 100;
        if (isDeleting) typingSpeed /= 2;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(startTypingEffect, typingSpeed);
    }


    // --- 4. ANIMATION CONTROLLER (Scroll & Intersection Observer) ---
    const sections = document.querySelectorAll(".scroll-section");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const navLinks = document.querySelectorAll(".nav-links a");

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // Track active state in Header Navbar
                const activeId = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${activeId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => sectionObserver.observe(section));

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible-item");
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => timelineObserver.observe(item));


    // --- 5. FX CANVAS (Fireworks & Confetti Particles Engine) ---
    const fxCanvas = document.getElementById("fx-canvas");
    const fxCtx = fxCanvas.getContext("2d");
    let fxParticles = [];

    function resizeFxCanvas() {
        fxCanvas.width = window.innerWidth;
        fxCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeFxCanvas);
    resizeFxCanvas();

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 3 + 1;
            this.velocity = {
                x: (Math.random() - 0.5) * (Math.random() * 8 + 4),
                y: (Math.random() - 0.5) * (Math.random() * 8 + 4)
            };
            this.gravity = 0.08;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.01;
        }

        draw() {
            fxCtx.save();
            fxCtx.globalAlpha = this.alpha;
            fxCtx.beginPath();
            fxCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            fxCtx.fillStyle = this.color;
            fxCtx.shadowBlur = 10;
            fxCtx.shadowColor = this.color;
            fxCtx.fill();
            fxCtx.restore();
        }

        update() {
            this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
    }

    function createFirework(x, y) {
        const colors = ["#dcd3ff", "#8e74ec", "#f5b3ff", "#ffffff", "#ffd3ec"];
        for (let i = 0; i < 40; i++) {
            fxParticles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
        }
    }

    function animateFx() {
        fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
        fxParticles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                fxParticles.splice(index, 1);
            } else {
                particle.update();
                particle.draw();
            }
        });
        requestAnimationFrame(animateFx);
    }
    animateFx();


    // --- 6. CAKE BLOW OUT & RITUAL INTERACTION ---
    const blowBtn = document.getElementById("blow-btn");
    const flame = document.getElementById("candle-flame");
    const successMsg = document.getElementById("candle-success");

    blowBtn.addEventListener("click", () => {
        if (!flame.classList.contains("extinguished")) {
            // Blow Candle
            flame.classList.add("extinguished");
            successMsg.classList.remove("hidden");
            blowBtn.textContent = "Candle Blown! ✨";
            blowBtn.style.background = "rgba(220, 211, 255, 0.2)";
            blowBtn.style.color = "white";

            // Trigger Massive Firework Display right around the cake
            const rect = blowBtn.getBoundingClientRect();
            const centerX = rect.left + (rect.width / 2);
            const centerY = rect.top - 150;

            for (let f = 0; f < 6; f++) {
                setTimeout(() => {
                    const devX = centerX + (Math.random() - 0.5) * 400;
                    const devY = centerY + (Math.random() - 0.5) * 200;
                    createFirework(devX, devY);
                }, f * 300);
            }
        }
    });


    // --- 7. RESTART SYSTEM ---
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.addEventListener("click", () => {
        // Relight candle
        flame.classList.remove("extinguished");
        successMsg.classList.add("hidden");
        blowBtn.textContent = "Blow Out Candle";
        blowBtn.style.background = "";
        blowBtn.style.color = "";

        // Smooth scroll back to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // --- 8. MOUSE PARALLAX EFFECT FOR PREMIUM HERO FEEL ---
    document.addEventListener("mousemove", (e) => {
        const depth = 20;
        const moveX = (e.clientX - window.innerWidth / 2) / depth;
        const moveY = (e.clientY - window.innerHeight / 2) / depth;

        const mainTitle = document.querySelector(".main-title");
        if (mainTitle && mainContent.classList.contains("unlocked")) {
            mainTitle.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        }
    });
});
