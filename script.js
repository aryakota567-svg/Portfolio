/* =========================================
   K. ARYA PORTFOLIO JAVASCRIPT
   Typing effect, navigation, 3D tilt,
   scroll reveal, and smooth interactions
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. TYPING ANIMATION
    // =====================================

    const typingText = document.getElementById("typingText");

    const words = [
        "Python Full Stack Developer",
        "Web Developer",
        "Problem Solver",
        "Creative Thinker"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingText) return;

        const currentWord = words[wordIndex];

        if (deleting) {

            characterIndex--;

        } else {

            characterIndex++;

        }

        typingText.textContent = currentWord.substring(
            0,
            characterIndex
        );

        let delay = deleting ? 45 : 90;

        if (!deleting && characterIndex === currentWord.length) {

            deleting = true;
            delay = 1600;

        } else if (deleting && characterIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

            delay = 350;

        }

        setTimeout(typeEffect, delay);

    }

    typeEffect();


    // =====================================
    // 2. MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (navLinks.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                menuToggle.setAttribute(
                    "aria-label",
                    "Close navigation"
                );

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            }

        });

    }


    // Close mobile navigation after clicking a link.

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });


    // Close mobile navigation when clicking outside.

    document.addEventListener("click", event => {

        if (
            navLinks &&
            menuToggle &&
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navLinks.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    // =====================================
    // 3. SCROLL REVEAL ANIMATION
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    // =====================================
    // 4. 3D TILT EFFECT
    // =====================================

    const tiltCards = document.querySelectorAll(".tilt-card");

    const supportsHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (supportsHover && !reduceMotion) {

        tiltCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = ((x - centerX) / centerX) * 5;

                const rotateX = ((centerY - y) / centerY) * 5;

                card.style.animation = "none";

                card.style.transform = `
                    perspective(1100px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-4px)
                `;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

                card.style.animation = "";

            });

        });

    }


    // =====================================
    // 5. PROJECT CARD 3D EFFECT
    // =====================================

    const projectCards = document.querySelectorAll(".project-card");

    if (supportsHover && !reduceMotion) {

        projectCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = ((x - centerX) / centerX) * 3;

                const rotateX = ((centerY - y) / centerY) * 3;

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                `;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    // =====================================
    // 6. NAVBAR SCROLL EFFECT
    // =====================================

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    // =====================================
    // 7. ACTIVE NAVIGATION LINK
    // =====================================

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navItems.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${currentId}`
                            ) {

                                link.classList.add("active");

                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    // =====================================
    // 8. BACK TO TOP BUTTON
    // =====================================

    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 450) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // =====================================
    // 9. CURRENT YEAR IN FOOTER
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    // =====================================
    // 10. STAGGERED CARD ANIMATIONS
    // =====================================

    const cardGroups = [
        ".skills-grid .skill-card",
        ".projects-grid .project-card",
        ".value-grid .value-card"
    ];

    cardGroups.forEach(selector => {

        const cards = document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay = `${index * 100}ms`;

        });

    });


    // =====================================
    // 11. PROFILE IMAGE FALLBACK
    // =====================================

    const profileImage = document.querySelector(".profile-image");

    if (profileImage) {

        profileImage.addEventListener("error", () => {

            profileImage.alt =
                "Profile photo unavailable. Check that arya.jpg exists in the project folder.";

            profileImage.style.display = "none";

            const imageWrapper = profileImage.parentElement;

            imageWrapper.style.background = `
                radial-gradient(
                    circle at 30% 20%,
                    rgba(168, 85, 247, 0.35),
                    transparent 40%
                ),
                linear-gradient(
                    135deg,
                    #15152b,
                    #102c3a
                )
            `;

        });

    }

});