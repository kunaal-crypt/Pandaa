/* ==========================================================================
   MASTER PREMIUM DESIGN SYSTEM APPLICATION ENGINE
   CORE JAVASCRIPT ARCHITECTURE ENGINE
   HANDLES: INTERACTIVE AUDIO HUBS, TIMELINE SPINE TRACKING, & GRID FILTERING
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. AMBIENT INTRO PRELOADER CONTROLLER ---
    const initPreloaderEngine = () => {
        const preloader = document.getElementById('ambientIntroPreloader');
        const progressFill = document.getElementById('preloaderProgressIndicator');
        const percentageText = document.getElementById('preloaderPercentageCounter');
        
        if (!preloader || !progressFill || !percentageText) return;

        let currentProgress = 0;
        const totalDuration = 2500; // 2.5 Seconds Simulation
        const intervalStep = 25; 
        const incrementsPerStep = 100 / (totalDuration / intervalStep);

        const progressTimer = setInterval(() => {
            currentProgress += incrementsPerStep;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(progressTimer);
                
                // Add class triggering the CSS opacity/visibility transitions
                preloader.classList.add('visibility-hidden');
            }
            
            // Render percentages to DOM attributes
            progressFill.style.width = `${currentProgress}%`;
            percentageText.textContent = `${Math.floor(currentProgress)}%`;
        }, intervalStep);
    };


    // --- 2. MULTI-CHANNEL NAVIGATION FIXED DOCK MECHANICS ---
    const initNavigationMatrix = () => {
        const navDock = document.getElementById('navigationMatrixDock');
        if (!navDock) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                navDock.classList.add('scrolled-state');
            } else {
                navDock.classList.remove('scrolled-state');
            }
        });
    };


    // --- 3. ACOUSTIC SOUNDSTAGE AUDIO HUB CONTROLLER ---
    const initAudioEngine = () => {
        const playBtn = document.getElementById('audioHubMainPlayTrigger');
        const vinylRecord = document.getElementById('vinylRecordHousingInstance');
        const scrubberRail = document.getElementById('audioScrubberTimelineRail');
        const scrubberProgress = document.getElementById('audioScrubberProgressFiller');
        const timeCurrent = document.getElementById('audioTimeNumericalCurrent');
        const timeTotal = document.getElementById('audioTimeNumericalTotal');
        const volumeInput = document.getElementById('audioVolumeSliderRangeInput');

        if (!playBtn) return;

        // Instantiate native HTML5 Audio object wrapper
        // Note: Replace with actual asset paths when deployable
        const audioInstance = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        let isPlaying = false;

        // Format timestamps cleanly to MM:SS
        const formatAudioTimestamp = (seconds) => {
            if (isNaN(seconds)) return '00:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

        const togglePlaybackState = () => {
            if (isPlaying) {
                audioInstance.pause();
                playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                vinylRecord.classList.remove('is-spinning-active');
            } else {
                audioInstance.play().catch(err => console.log("Audio play deferred before user interactive click: ", err));
                playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                vinylRecord.classList.add('is-spinning-active');
            }
            isPlaying = !isPlaying;
        };

        // Interactive Event Triggers
        playBtn.addEventListener('click', togglePlaybackState);

        audioInstance.addEventListener('loadedmetadata', () => {
            timeTotal.textContent = formatAudioTimestamp(audioInstance.duration);
        });

        audioInstance.addEventListener('timeupdate', () => {
            const currentRatio = (audioInstance.currentTime / audioInstance.duration) * 100;
            scrubberProgress.style.width = `${currentRatio || 0}%`;
            timeCurrent.textContent = formatAudioTimestamp(audioInstance.currentTime);
        });

        scrubberRail.addEventListener('click', (e) => {
            const railBounds = scrubberRail.getBoundingClientRect();
            const clickXPosition = e.clientX - railBounds.left;
            const updatedRatio = clickXPosition / railBounds.width;
            audioInstance.currentTime = updatedRatio * audioInstance.duration;
        });

        volumeInput.addEventListener('input', (e) => {
            audioInstance.volume = e.target.value / 100;
        });
    };


    // --- 4. IMMERSIVE GALLERY ASYMMETRIC GRID FILTER ---
    const initGalleryFilters = () => {
        const filterChips = document.querySelectorAll('.filter-action-chip');
        const galleryItems = document.querySelectorAll('.gallery-item-card-wrapper');

        if (filterChips.length === 0) return;

        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                // Toggle active structural highlights on navigation array
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const parsingCategory = chip.getAttribute('data-filter-channel');

                galleryItems.forEach(item => {
                    const itemTargetGroup = item.getAttribute('data-asset-category');
                    if (parsingCategory === 'all' || itemTargetGroup === parsingCategory) {
                        item.classList.remove('filtered-out');
                    } else {
                        item.classList.add('filtered-out');
                    }
                });
            });
        });
    };


    // --- 5. CHRONICLE TIMELINE SCROLL PATH ENGAGEMENT ---
    const initTimelineChronology = () => {
        const timeNodes = document.querySelectorAll('.chronicle-event-node-wrapper');
        const spineFiller = document.getElementById('spineProgressLineFiller');

        if (timeNodes.length === 0) return;

        const parseTimelineNodeActivation = () => {
            const viewportPivotHeight = window.innerHeight * 0.75;

            timeNodes.forEach(node => {
                const nodeTopBound = node.getBoundingClientRect().top;
                if (nodeTopBound < viewportPivotHeight) {
                    node.classList.remove('filtered-out-node');
                } else {
                    node.classList.add('filtered-out-node');
                }
            });

            // Adjust the background structural tracking gauge fill
            const timelineContainer = document.querySelector('.chronicle-master-track');
            if (timelineContainer) {
                const containerRect = timelineContainer.getBoundingClientRect();
                const processedDistance = viewportPivotHeight - containerRect.top;
                const progressPercent = (processedDistance / containerRect.height) * 100;
                if (spineFiller) {
                    spineFiller.style.height = `${Math.min(Math.max(progressPercent, 0), 100)}%`;
                }
            }
        };

        window.addEventListener('scroll', parseTimelineNodeActivation);
        parseTimelineNodeActivation(); // Initial execution step
    };


    // --- 6. VIRTUAL CAKE SLICING TELEMETRY MATRIX ---
    const initCakeSlicingSimulator = () => {
        const sliceBtn = document.getElementById('masterSliceTriggerNode');
        const cakeBase = document.getElementById('cakeGeometricBaseSilhouetteInstance');
        const counterDisplay = document.getElementById('telemetrySliceCounterReadoutNode');

        if (!sliceBtn || !cakeBase || !counterDisplay) return;

        let dynamicSlices = 0;

        sliceBtn.addEventListener('click', () => {
            dynamicSlices += 1;
            counterDisplay.textContent = dynamicSlices.toString().padStart(2, '0');
            
            cakeBase.classList.add('is-sliced-state');
            setTimeout(() => {
                cakeBase.classList.remove('is-sliced-state');
            }, 400);

            // Log diagnostic telemetry parameters down into modern developer console logs
            console.log(`[SYS TELEMETRY]: Slice iteration event triggered successfully. Current count: ${dynamicSlices}`);
        });
    };


    // --- 7. DYNAMIC MESSAGE WISHING WELL SYSTEM ENGINE ---
    const initWishingWellFeed = () => {
        const submissionForm = document.getElementById('wishingWellMasterInputForm');
        const cardsFeedMatrix = document.getElementById('wellFeedOutputGridMatrixInstance');
        const totalWishesTelemetry = document.getElementById('diagnosticMetricTotalWishesNode');

        if (!submissionForm || !cardsFeedMatrix) return;

        let totalWishCounter = 42; // Base baseline diagnostic counter placeholder

        submissionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const authorField = document.getElementById('wellFormAuthorInputNameField');
            const messageField = document.getElementById('wellFormMessageInputTextAreaField');

            if (!authorField || !messageField || !authorField.value.trim() || !messageField.value.trim()) return;

            // Generate structural card component DOM string programmatically
            const currentTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'wish-output-card-wrapper';
            cardWrapper.innerHTML = `
                <p class="wish-card-main-prose">"${messageField.value.escapeHTML()}"</p>
                <div class="wish-card-footer-meta-row">
                    <span class="wish-author-string">${authorField.value.escapeHTML()}</span>
                    <span class="wish-timestamp-string">TODAY // ${currentTimestamp}</span>
                </div>
            `;

            // Insert new content block ahead of previous nodes inside output target containers
            cardsFeedMatrix.insertBefore(cardWrapper, cardsFeedMatrix.firstChild);
            
            // Adjust system metric indicators dynamically
            totalWishCounter += 1;
            if (totalWishesTelemetry) {
                totalWishesTelemetry.textContent = totalWishCounter;
            }

            // Flush inputs clean
            submissionForm.reset();
        });
    };

    // Prototype extension helper block to clean up injected strings safely
    String.prototype.escapeHTML = function() {
        return this.replace(/&/g, "&amp;")
                   .replace(/</g, "&lt;")
                   .replace(/>/g, "&gt;")
                   .replace(/"/g, "&quot;")
                   .replace(/'/g, "&#039;");
    };


    // --- 8. SYSTEM-WIDE HIGH-DEFINITION MEDIA LIGHTBOX VIEWPORT ---
    const initLightboxViewportSystem = () => {
        const lightboxOverlay = document.getElementById('cinematicLightboxOverlaySystem');
        const masterImageTarget = document.getElementById('lightboxMasterImageTarget');
        const lightboxCloseTrigger = document.getElementById('lightboxCloseTriggerNode');
        const galleryZoomTrigger = document.getElementById('lightboxZoomTriggerNode');
        
        // Target active interaction hooks pointing inside gallery section nodes
        const activeGalleryCards = document.querySelectorAll('.gallery-item-card-wrapper');

        if (!lightboxOverlay || !masterImageTarget || !lightboxCloseTrigger) return;

        let currentlyViewedIndex = 0;

        const renderActiveImageToLightbox = (imageSrc, imageTitle) => {
            masterImageTarget.setAttribute('src', imageSrc);
            const titleNode = lightboxOverlay.querySelector('.cluster-active-title');
            if (titleNode) titleNode.textContent = imageTitle;
            
            // Force reset magnification level matrix toggles
            masterImageTarget.classList.remove('is-zoomed-1to1');
            galleryZoomTrigger.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i>';
        };

        activeGalleryCards.forEach((card, idx) => {
            const clickableAssetRegion = card.querySelector('.item-image-viewport');
            if (!clickableAssetRegion) return;

            clickableAssetRegion.addEventListener('click', () => {
                currentlyViewedIndex = idx;
                const sourceImage = card.querySelector('.lazy-gallery-image');
                const titleLabel = card.querySelector('.meta-title-label');
                
                if (sourceImage) {
                    renderActiveImageToLightbox(sourceImage.getAttribute('src'), titleLabel ? titleLabel.textContent : 'GALLERY IMAGE');
                    lightboxOverlay.classList.remove('visibility-hidden');
                }
            });
        });

        // Close Trigger Events
        lightboxCloseTrigger.addEventListener('click', () => {
            lightboxOverlay.classList.add('visibility-hidden');
        });

        // Toggle Magnification Layer Events
        if (galleryZoomTrigger) {
            galleryZoomTrigger.addEventListener('click', () => {
                if (masterImageTarget.classList.contains('is-zoomed-1to1')) {
                    masterImageTarget.classList.remove('is-zoomed-1to1');
                    galleryZoomTrigger.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i>';
                } else {
                    masterImageTarget.classList.add('is-zoomed-1to1');
                    galleryZoomTrigger.innerHTML = '<i class="fa-solid fa-magnifying-glass-minus"></i>';
                }
            });
        }
    };


    // --- 9. DESIGN ENGINE INSTANTIATION DECK RUNNERS ---
    initPreloaderEngine();
    initNavigationMatrix();
    initAudioEngine();
    initGalleryFilters();
    initTimelineChronology();
    initCakeSlicingSimulator();
    initWishingWellFeed();
    initLightboxViewportSystem();
});
