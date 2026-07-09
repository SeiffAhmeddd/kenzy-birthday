// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Setup Audio
    const musicBtn = document.getElementById("music-player");
    const bgMusic = document.getElementById("bg-music");
    const introOverlay = document.getElementById("intro-overlay");
    let isPlaying = false;

    function spinDisc() {
        gsap.to(".cd-disc", { rotation: 360, repeat: -1, duration: 4, ease: "linear" });
    }

    // Browsers block audio-with-sound until a real user gesture happens.
    // The intro overlay's tap IS that gesture, so music starts right as the site opens.
    function startMusicWithSound() {
        bgMusic.muted = false;
        bgMusic.play().then(() => {
            isPlaying = true;
            spinDisc();
        }).catch(e => console.log("Playback blocked:", e));
    }

    function dismissIntro() {
        startMusicWithSound();
        document.body.classList.remove("intro-lock");
        introOverlay.classList.add("hidden");
    }

    document.body.classList.add("intro-lock");
    introOverlay.addEventListener("click", dismissIntro, { once: true });
    introOverlay.addEventListener("touchend", dismissIntro, { once: true });

    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            gsap.killTweensOf(".cd-disc");
        } else {
            bgMusic.muted = false; // Always unmute when manually triggered
            bgMusic.play();
            gsap.to(".cd-disc", { rotation: 360, repeat: -1, duration: 4, ease: "linear" });
        }
        isPlaying = !isPlaying;
    });

    // ==========================================
    // SECTION 1: Letter Opening & Scrapbook Intro
    // ==========================================
    // Fade out scroll hint on scroll
    gsap.to(".scroll-hint", {
        scrollTrigger: {
            trigger: "#section-1",
            start: "top top",
            end: "+=150",
            scrub: true
        },
        opacity: 0
    });

    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-1",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.3
        }
    });

    // Slower, smoother shakes starting right at the beginning
    tl1.to("#s1-envelope", { rotation: 10, duration: 0.2, ease: "power1.inOut" })
       .to("#s1-envelope", { rotation: -10, duration: 0.2, ease: "power1.inOut" })
       .to("#s1-envelope", { rotation: 10, duration: 0.2, ease: "power1.inOut" })
       .to("#s1-envelope", { rotation: -10, duration: 0.2, ease: "power1.inOut" })
       .to("#s1-envelope", { rotation: 10, duration: 0.2, ease: "power1.inOut" })
       .to("#s1-envelope", { rotation: -10, duration: 0.2, ease: "power1.inOut" })
       .to("#s1-envelope", { rotation: 0, duration: 0.3, ease: "power2.inOut" })
       // Emojis pop out concurrent with shakes
       .to(".s1-emoji", { scale: 1.5, opacity: 1, stagger: 0.05, duration: 0.3, ease: "back.out(1.7)" }, 0)
       // Flap opens
       .to("#s1-seal", { opacity: 0, duration: 0.2, ease: "none" })
       .to("#s1-flap", { rotationX: 180, duration: 0.8, ease: "none" })
       // Envelope drops, paper scales up from inside and rises
       .to("#s1-envelope-wrapper", { y: 150, duration: 1, ease: "none" }, "-=0.2")
       .to("#s1-letter", { scale: 1, y: 10, duration: 1.2, ease: "none" }, "-=1")
       // Handwriting appears
       .to("#s1-text", { text: { value: "Kol sana we anty tayba ya kanuza bnhbk <3" }, duration: 1.5, ease: "none" })
       // Rest of collage fades in
       .to(".section-1 .collage-item", {
           opacity: 1,
           y: 0,
           stagger: 0.1,
           duration: 1,
           ease: "power1.inOut"
       }, "-=1");

    // Initialize items that wait for tl1
    gsap.set(".section-1 .collage-item", { opacity: 0, y: 20 });
    // Letter starts at scale:0 (invisible dot at center), animates to full size when envelope opens
    gsap.set("#s1-letter", { scale: 0 });
    // Emojis start hidden
    gsap.set(".s1-emoji", { opacity: 0, scale: 0, y: 30 });

    // ==========================================
    // SECTION 2: Memories Spread
    // ==========================================
    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-2",
            start: "top 60%",
        }
    });

    gsap.set(".section-2 .collage-item", { opacity: 0 });
    gsap.set(".section-2 .tape", { opacity: 0, scale: 0 });

    tl2.to("#s2-film", { opacity: 1, x: 20, duration: 1, ease: "power2.out" })
       .to("#s2-p1", { opacity: 1, y: 10, duration: 0.8, ease: "back.out(1.2)" }, "-=0.5")
       .to("#s2-p1 .tape", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" })
       .to("#s2-p3", { opacity: 1, y: 5, duration: 0.8, ease: "back.out(1.2)" }, "-=0.3")
       .to("#s2-p3 .tape", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" })
       .to("#s2-p2", { opacity: 1, y: -10, duration: 0.8, ease: "back.out(1.2)" }, "-=0.3")
       .to("#s2-p2 .tape", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" })
       .to("#s2-note", { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" })
       .to("#s2-clip", { opacity: 1, duration: 0.2 });

    // ==========================================
    // SECTION 3: Funny Photos
    // ==========================================
    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-3",
            start: "top 60%",
        }
    });

    gsap.set(".section-3 .collage-item", { opacity: 0, scale: 0.8 });
    gsap.set(".section-3 .tape", { opacity: 0 });

    tl3.to("#s3-p1", { opacity: 1, scale: 1, rotation: "+=5", duration: 1, ease: "power2.out" })
       .to("#s3-p1 .tape", { opacity: 1, duration: 0.3 })
       .to("#s3-p2", { opacity: 1, scale: 1, rotation: "-=5", duration: 1, ease: "power2.out" }, "-=0.5")
       .to("#s3-p2 .tape", { opacity: 1, duration: 0.3 })
       .to("#s3-note", { opacity: 1, scale: 1, y: 20, duration: 0.6, ease: "back.out(1.5)" }, "-=0.5")
       .to("#s3-heart", { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
       .to(["#s3-star1", "#s3-star2"], { opacity: 1, scale: 1, stagger: 0.2, duration: 0.5 }, "-=0.2");

    // ==========================================
    // SECTION 4: Friends (Shaza)
    // ==========================================
    const tl4 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-4",
            start: "top 60%",
        }
    });

    gsap.set(".section-4 .collage-item", { opacity: 0 });
    gsap.set(["#s4-p1", "#s4-p3"], { x: -50 });
    gsap.set(["#s4-p2", "#s4-p4"], { x: 50 });

    tl4.to(["#s4-p1", "#s4-p2", "#s4-p3", "#s4-p4"], { opacity: 1, x: 0, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" })
       .to(".section-4 .tape", { opacity: 1, duration: 0.4 }, "-=0.2")
       .to("#s4-note", { opacity: 1, y: -10, duration: 0.6, ease: "back.out(1.5)" }, "-=0.2")
       .to(["#s4-flower", "#s4-seal"], { opacity: 1, scale: 1.2, yoyo: true, repeat: 1, stagger: 0.1, duration: 0.3 })
       .to(["#s4-flower", "#s4-seal"], { scale: 1, duration: 0.1 })
       .to("#s4-clip", { opacity: 1, duration: 0.3 });

    // ==========================================
    // SECTION 5: Surprise Invitation
    // ==========================================
    const tl5 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-5",
            start: "top 60%",
        }
    });

    gsap.set(".section-5 .collage-item", { opacity: 0, y: -30 });
    
    tl5.to("#s5-stack", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
       .to("#s5-ticket", { opacity: 1, y: 0, rotation: -4, duration: 1, ease: "bounce.out" }, "-=0.4")
       .to("#s5-tape", { opacity: 1, y: 0, scale: 1, duration: 0.4 })
       .to("#s5-heart", { opacity: 1, y: 0, duration: 0.5, ease: "back.out(2)" });

    // Subtle confetti using small elements
    function createConfetti() {
        const container = document.getElementById('s5-confetti');
        const colors = ['#ffccd5', '#ffb3c6', '#ff99b8', '#ffd1df'];
        for(let i=0; i<30; i++) {
            let conf = document.createElement('div');
            conf.style.position = 'absolute';
            conf.style.width = Math.random() * 8 + 4 + 'px';
            conf.style.height = conf.style.width;
            conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            conf.style.left = Math.random() * 100 + '%';
            conf.style.top = Math.random() * 100 + '%';
            conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            conf.style.opacity = 0;
            container.appendChild(conf);

            tl5.to(conf, {
                opacity: Math.random() * 0.5 + 0.3,
                y: `+=${Math.random() * 50 + 20}`,
                rotation: Math.random() * 360,
                duration: Math.random() * 2 + 1,
                ease: "power1.out"
            }, "-=1.5");
        }
    }
    createConfetti();

    // ==========================================
    // SECTION 6: Final Romantic Page
    // ==========================================
    const tl6 = gsap.timeline({
        scrollTrigger: {
            trigger: "#section-6",
            start: "top 60%",
        }
    });

    gsap.set(".section-6 .collage-item", { opacity: 0 });
    gsap.set("#s6-note", { scale: 0.9 });
    
    tl6.to("#s6-note", { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" })
       .to("#s6-stamp", { opacity: 0.6, rotation: 10, duration: 0.8 }, "-=0.5")
       .to("#s6-heart", { opacity: 1, scale: 1.2, duration: 1, ease: "elastic.out(1, 0.3)" })
       .to("#s6-footer", { opacity: 1, duration: 1 });

    // Pulsing heart loop
    gsap.to("#s6-heart", {
        scale: 1.05,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Background Parallax Effect
    gsap.to(".app-container", {
        backgroundPosition: `50% ${window.innerHeight * 0.2}px`,
        ease: "none",
        scrollTrigger: {
            trigger: ".app-container",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });

    // Seamless Banner Ticker logic
    const track = document.querySelector('.banner-track');
    const span = track.querySelector('span');
    
    // 1. Calculate how many spans we need to fill the viewport (plus buffer)
    const spanWidth = span.offsetWidth;
    const count = Math.ceil(window.innerWidth / spanWidth) + 1;
    
    // 2. Add clones to fill the initial view
    for(let i=0; i<count; i++) {
        track.appendChild(span.cloneNode(true));
    }
    
    // 3. Clone the entire content once to create the seamless visual link
    const trackContent = track.innerHTML;
    track.innerHTML += trackContent;
    
    // 4. Animate it exactly by half (the width of the first set)
    gsap.to(track, {
        x: "-50%",
        repeat: -1,
        duration: 20,
        ease: "none"
    });

});
