/* ==========================================================================
   AUTHENTICATION ENGINE, INITIAL STATE & MUSIC TIMING HOOKS
   ========================================================================== */
const TARGET_KEY = "9"; // Matches Class 9th perfectly
const docBody = document.body;
const entryPanel = document.getElementById('gatekeeper');
const appDashboard = document.getElementById('main-experience');
const passKeyInput = document.getElementById('password-input');
const triggerUnlockBtn = document.getElementById('unlock-btn');
const systemErrorLog = document.getElementById('error-msg');
const audioTrack = document.getElementById('bg-music');

triggerUnlockBtn.addEventListener('click', executeGatecheck);
passKeyInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') executeGatecheck();
});

function executeGatecheck() {
    const localizedValue = passKeyInput.value.trim();
    if (localizedValue === TARGET_KEY) {
        entryPanel.classList.add('fade-out');
        setTimeout(() => {
            entryPanel.classList.add('hidden');
            appDashboard.classList.remove('hidden');
            runGlobalSystems();
        }, 2000);
    } else {
        systemErrorLog.textContent = "The code doesn't match... Think back to the classroom grade where it began.";
        setTimeout(() => { systemErrorLog.textContent = ""; }, 5000);
    }
}

function runGlobalSystems() {
    // Cinematic Slow Audio AudioFade-In System (4-5 seconds tracking vector)
    audioTrack.volume = 0;
    audioTrack.play().catch(error => {
        console.warn("Browser environment interaction model waiting for immediate tap state:", error);
    });
    
    let targetVolumeMetric = 0;
    const fadeAudioInterval = setInterval(() => {
        if (targetVolumeMetric < 0.25) {
            targetVolumeMetric += 0.01;
            audioTrack.volume = targetVolumeMetric;
        } else {
            clearInterval(fadeAudioInterval);
        }
    }, 180);

    buildGlobalStarfield();
    runScrollIntersectionMatrix();
    runSparkleCursorEngine();
}

/* ==========================================================================
   GLOBAL STARFIELD REPLICA BACKGROUND CANVAS ENGINE
   ========================================================================== */
function buildGlobalStarfield() {
    const sCanvas = document.getElementById('starfieldCanvas');
    const sCtx = sCanvas.getContext('2d');
    let backgroundStars = [];

    const calibrateStarfieldSize = () => {
        sCanvas.width = window.innerWidth;
        sCanvas.height = window.innerHeight;
    };
    calibrateStarfieldSize();
    window.addEventListener('resize', calibrateStarfieldSize);

    for (let index = 0; index < 120; index++) {
        backgroundStars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 0.9 + 0.1,
            pulseFactor: Math.random() * 0.02 + 0.005,
            opacityDirection: Math.random() > 0.5 ? 1 : -1,
            opacity: Math.random()
        });
    }

    function renderStarfieldLoop() {
        sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);
        backgroundStars.forEach(bStar => {
            bStar.opacity += bStar.pulseFactor * bStar.opacityDirection;
            if (bStar.opacity >= 0.9 || bStar.opacity <= 0.1) {
                bStar.opacityDirection *= -1;
            }
            sCtx.fillStyle = `rgba(255, 255, 255, ${bStar.opacity})`;
            sCtx.beginPath();
            sCtx.arc(bStar.x, bStar.y, bStar.radius, 0, Math.PI * 2);
            sCtx.fill();
        });
        requestAnimationFrame(renderStarfieldLoop);
    }
    renderStarfieldLoop();
}

/* ==========================================================================
   DIARY DIALOGUE CONTROL SEQUENCE (PAGE FLIPS)
   ========================================================================== */
function turnPage(currentPageId, targetPageId) {
    const executionCurrentPage = document.getElementById(`page-${currentPageId}`);
    const executionTargetPage = document.getElementById(`page-${targetPageId}`);
    
    if (executionCurrentPage && executionTargetPage) {
        executionCurrentPage.classList.remove('active');
        executionTargetPage.classList.add('active');
    }
}

/* ==========================================================================
   SCROLL OBSERVATION INTERSECTION MATRIX (THEME TRANSITIONS)
   ========================================================================== */
function runScrollIntersectionMatrix() {
    const internalSections = document.querySelectorAll('.story-section');
    
    const skyScrollConfig = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const skyIntersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const acquiredSkyMetric = entry.target.getAttribute('data-sky');
                docBody.setAttribute('data-active-sky', acquiredSkyMetric);
                
                // Track down matching embedded text components
                const localizedQuote = entry.target.querySelector('.floating-quote');
                if (localizedQuote) {
                    localizedQuote.classList.add('visible-quote');
                }
            }
        });
    }, skyScrollConfig);

    internalSections.forEach(sectionBlock => skyIntersectionObserver.observe(sectionBlock));

    // Observe Individual Premium Image Elements Inside Section 2
    const architecturalPhotoCards = document.querySelectorAll('.premium-photo-card');
    const imageEntranceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.15, rootMargin: "0px" });

    architecturalPhotoCards.forEach(cardItem => imageEntranceObserver.observe(cardItem));
}

/* ==========================================================================
   LUXURY INTERACTIVE CURSOR TRAIL ENGINE (SPARKLE CANVAS OBJECT)
   ========================================================================== */
let clusterCanvas, clusterCtx;
let crystalParticlesArray = [];

function runSparkleCursorEngine() {
    clusterCanvas = document.getElementById('sparkleCanvas');
    clusterCtx = clusterCanvas.getContext('2d');
    
    const synchronizeCanvasDimensions = () => {
        clusterCanvas.width = window.innerWidth;
        clusterCanvas.height = window.innerHeight;
    };
    synchronizeCanvasDimensions();
    window.addEventListener('resize', synchronizeCanvasDimensions);

    window.addEventListener('mousemove', deploySparkleCluster);
    window.addEventListener('touchmove', (touchEvent) => {
        deploySparkleCluster(touchEvent.touches[0]);
    });

    renderSparkleLoop();
}

class LuxurySparkleDataNode {
    constructor(coordinateX, coordinateY) {
        this.x = coordinateX;
        this.y = coordinateY;
        this.radiusSize = Math.random() * 2 + 0.4;
        this.vectorX = Math.random() * 1.8 - 0.9;
        this.vectorY = Math.random() * 1.8 - 0.9;
        this.particleColor = `rgba(233, 213, 255, ${Math.random() * 0.8 + 0.2})`;
        this.particleLifespan = 1.0;
        this.decayCoefficient = Math.random() * 0.012 + 0.006;
    }
    refreshVectorState() {
        this.x += this.vectorX;
        this.y += this.vectorY;
        this.particleLifespan -= this.decayCoefficient;
    }
    paintNode() {
        clusterCtx.fillStyle = this.particleColor;
        clusterCtx.globalAlpha = this.particleLifespan;
        clusterCtx.beginPath();
        clusterCtx.arc(this.x, this.y, this.radiusSize, 0, Math.PI * 2);
        clusterCtx.fill();
    }
}

function deploySparkleCluster(eventCoordinates) {
    for (let loopCount = 0; loopCount < 3; loopCount++) {
        crystalParticlesArray.push(new LuxurySparkleDataNode(eventCoordinates.clientX, eventCoordinates.clientY));
    }
}

function renderSparkleLoop() {
    clusterCtx.clearRect(0, 0, clusterCanvas.width, clusterCanvas.height);
    crystalParticlesArray = crystalParticlesArray.filter(node => node.particleLifespan > 0);
    crystalParticlesArray.forEach(crystalNode => {
        crystalNode.refreshVectorState();
        crystalNode.paintNode();
    });
    requestAnimationFrame(renderSparkleLoop);
}

/* ==========================================================================
   HIDDEN DISCOVERIES INTERACTION PACK
   ========================================================================== */
// Moon Shatter Starburst
document.getElementById('moon-trigger').addEventListener('click', (eventObj) => {
    const dimensionBounds = eventObj.target.getBoundingClientRect();
    const computedCenterX = dimensionBounds.left + dimensionBounds.width / 2;
    const computedCenterY = dimensionBounds.top + dimensionBounds.height / 2;
    for (let index = 0; index < 35; index++) {
        let specializedSparkle = new LuxurySparkleDataNode(computedCenterX, computedCenterY);
        specializedSparkle.vectorX = Math.random() * 6 - 3;
        specializedSparkle.vectorY = Math.random() * 6 - 3;
        crystalParticlesArray.push(specializedSparkle);
    }
});

// Ethereal Flight Butterfly Engine
document.getElementById('butterfly').addEventListener('click', function() {
    this.style.transition = "transform 2s cubic-bezier(0.25, 1, 0.5, 1)";
    this.style.transform = `translate(${Math.random() * 300 - 150}px, ${Math.random() * -300 - 100}px) scale(0) rotate(45deg)`;
    setTimeout(() => {
        this.style.transform = "none";
    }, 5000);
});

// Blossom Spill Petal Mechanics
document.getElementById('flower').addEventListener('click', function(event) {
    const boundBox = event.target.getBoundingClientRect();
    const sourceX = boundBox.left + boundBox.width / 2;
    const sourceY = boundBox.top;
    
    for (let petalCount = 0; petalCount < 25; petalCount++) {
        let flowerPetalNode = new LuxurySparkleDataNode(sourceX, sourceY);
        flowerPetalNode.particleColor = `rgba(244, 143, 177, ${Math.random() * 0.8 + 0.2})`;
        flowerPetalNode.vectorY = Math.random() * 2.5 + 1.2; // Linear falling speed configuration
        flowerPetalNode.vectorX = Math.random() * 2 - 1;
        flowerPetalNode.radiusSize = Math.random() * 3 + 1.5;
        crystalParticlesArray.push(flowerPetalNode);
    }
});

/* ==========================================================================
   FALLING STARS BACKDROP LOGIC (SECTION 4 REGION)
   ========================================================================== */
let matrixStarCanvas, matrixStarCtx;
let sequenceStarsArray = [];

function initFallingStars() {
    matrixStarCanvas = document.getElementById('fallingStarsCanvas');
    matrixStarCtx = matrixStarCanvas.getContext('2d');
    
    const recalibrateLocalCanvasSize = () => {
        matrixStarCanvas.width = matrixStarCanvas.parentElement.clientWidth;
        matrixStarCanvas.height = matrixStarCanvas.parentElement.clientHeight;
    };
    recalibrateLocalCanvasSize();
    window.addEventListener('resize', recalibrateLocalCanvasSize);

    for (let count = 0; count < 30; count++) {
        sequenceStarsArray.push({
            coordinateX: Math.random() * window.innerWidth,
            coordinateY: Math.random() * matrixStarCanvas.height - matrixStarCanvas.height,
            streakLength: Math.random() * 40 + 15,
            movementSpeed: Math.random() * 4 + 3,
            starOpacity: Math.random() * 0.6 + 0.2
        });
    }
    renderFallingStarsLoop();
}

function renderFallingStarsLoop() {
    matrixStarCtx.clearRect(0, 0, matrixStarCanvas.width, matrixStarCanvas.height);
    sequenceStarsArray.forEach(fallingNode => {
        matrixStarCtx.strokeStyle = `rgba(255, 255, 255, ${fallingNode.starOpacity})`;
        matrixStarCtx.lineWidth = 1.2;
        matrixStarCtx.beginPath();
        matrixStarCtx.moveTo(fallingNode.coordinateX, fallingNode.coordinateY);
        matrixStarCtx.lineTo(fallingNode.coordinateX - fallingNode.streakLength / 2, fallingNode.coordinateY + fallingNode.streakLength);
        matrixStarCtx.stroke();

        fallingNode.coordinateY += fallingNode.movementSpeed;
        fallingNode.coordinateX -= fallingNode.movementSpeed / 2;

        if (fallingNode.coordinateY > matrixStarCanvas.height) {
            fallingNode.coordinateY = -60;
            fallingNode.coordinateX = Math.random() * matrixStarCanvas.width;
        }
    });
    requestAnimationFrame(renderFallingStarsLoop);
}

/* ==========================================================================
   THEATRICAL RITUAL CANDLE BLOW (BLACKOUT SYSTEM -> GRAND FIREWORKS)
   ========================================================================== */
const candleTriggerBox = document.getElementById('candle-trigger');
const visualFlame = document.getElementById('candle-flame');
const blackoutLayer = document.getElementById('cinematic-blackout');
const candleDialogueText = document.getElementById('candle-hint-text');
const terminalSectionBox = document.getElementById('section-5');
const theaterMessageBox = document.getElementById('final-message-box');

candleTriggerBox.addEventListener('click', () => {
    // Extinguish fire state
    visualFlame.style.display = 'none';
    candleDialogueText.textContent = "Your wish is floating up to the heavens...";

    // Activate Cinematic Blackout and Instantly Halt Soundtrack
    blackoutLayer.classList.add('active-darkness');
    audioTrack.pause();

    // Enforce 1.5 Second High-Drama Suspense Pause
    setTimeout(() => {
        // Disengage theatrical blackout overlay
        blackoutLayer.classList.remove('active-darkness');
        
        // Push view smoothly into terminal viewport
        terminalSectionBox.scrollIntoView({ behavior: 'smooth' });

        // Spin up final ambient aurora canvas overlays and resume sound track
        const visibleAuroras = document.querySelectorAll('.aurora-curtain');
        visibleAuroras.forEach(auroraNode => auroraNode.style.opacity = "1");
        
        audioTrack.play();
        igniteGrandFireworksEngine();
        
        // Disengage opacity block on final typographical element
        theaterMessageBox.classList.add('theme-aurora', 'theater-revealed');
    }, 1500);
});

/* ==========================================================================
   GRAND FIREWORKS MATHEMATICS DESIGN SYSTEM
   ========================================================================== */
let fireworkCanvasRef, fireworkCtxRef;
let detonationFragmentsArray = [];

function igniteGrandFireworksEngine() {
    fireworkCanvasRef = document.getElementById('fireworksCanvas');
    fireworkCtxRef = fireworkCanvasRef.getContext('2d');
    
    fireworkCanvasRef.width = fireworkCanvasRef.parentElement.clientWidth;
    fireworkCanvasRef.height = fireworkCanvasRef.parentElement.clientHeight;

    // Sequence out distinct high-altitude detonation patterns
    for (let explosiveIndex = 0; explosiveIndex < 6; explosiveIndex++) {
        setTimeout(() => {
            generateDetonationCoordinates(
                Math.random() * fireworkCanvasRef.width, 
                Math.random() * (fireworkCanvasRef.height * 0.5) + 80
            );
        }, explosiveIndex * 450);
    }
    
    executeFireworksAnimationLoop();
}

function generateDetonationCoordinates(targetOriginX, targetOriginY) {
    const spectralPalettes = ['#ffffff', '#e9d5ff', '#c084fc', '#f472b6', '#fed7aa', '#38bdf8'];
    for (let fragmentsCount = 0; fragmentsCount < 60; fragmentsCount++) {
        detonationFragmentsArray.push({
            posX: targetOriginX,
            posY: targetOriginY,
            velocityVectorX: Math.random() * 8 - 4,
            velocityVectorY: Math.random() * 8 - 4,
            renderedColor: spectralPalettes[Math.floor(Math.random() * spectralPalettes.length)],
            fragmentLifespan: 1.0,
            burnRate: Math.random() * 0.015 + 0.008
        });
    }
}

function executeFireworksAnimationLoop() {
    fireworkCtxRef.clearRect(0, 0, fireworkCanvasRef.width, fireworkCanvasRef.height);
    detonationFragmentsArray = detonationFragmentsArray.filter(fragment => fragment.fragmentLifespan > 0);
    
    detonationFragmentsArray.forEach(fragNode => {
        fragNode.posX += fragNode.velocityVectorX;
        fragNode.posY += fragNode.velocityVectorY;
        fragNode.velocityVectorY += 0.05; // Simulate standard gravity downforce matrix
        fragNode.fragmentLifespan -= fragNode.burnRate;

        fireworkCtxRef.fillStyle = fragNode.renderedColor;
        fireworkCtxRef.globalAlpha = fragNode.fragmentLifespan;
        fireworkCtxRef.beginPath();
        fireworkCtxRef.arc(fragNode.posX, fragNode.posY, 2, 0, Math.PI * 2);
        fireworkCtxRef.fill();
    });

    if (detonationFragmentsArray.length > 0) {
        requestAnimationFrame(executeFireworksAnimationLoop);
    }
}

/* ==========================================================================
   THE UNCOMPROMISED GLITCH STAR MODAL CONTROLLER
   ========================================================================== */
const hiddenGlitchStarTrigger = document.getElementById('secret-star-btn');
const layoutPortalOverlay = document.getElementById('secret-portal');
const interfacePortalCloseButton = document.getElementById('close-portal-btn');

hiddenGlitchStarTrigger.addEventListener('click', () => {
    layoutPortalOverlay.classList.add('portal-visible');
});

interfacePortalCloseButton.addEventListener('click', () => {
    layoutPortalOverlay.classList.remove('portal-visible');
});

// Close hidden modal instantly if background area is targeted
layoutPortalOverlay.addEventListener('click', (modalEvent) => {
    if (modalEvent.target === layoutPortalOverlay) {
        layoutPortalOverlay.classList.remove('portal-visible');
    }
});
