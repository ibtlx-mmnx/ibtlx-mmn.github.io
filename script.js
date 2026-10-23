
/* ========================================
   IBTIHAL MOUMEN — PORTFOLIO
   Interactions JavaScript
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    // ELEMENTS
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("back-to-top");
    const typedText = document.getElementById("typed-text");
    const year = document.getElementById("year");

    // ANNEE AUTOMATIQUE
    year.textContent = new Date().getFullYear();

    // MENU MOBILE
    function closeMenu() {
        menuToggle.classList.remove("open");
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fermer le menu" : "Ouvrir le menu"
        );
    });

    navItems.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // FERMER LE MENU AVEC ESCAPE
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // HEADER ET BOUTON RETOUR EN HAUT
    function handleScroll() {
        const scrolled = window.scrollY > 40;

        header.classList.toggle("scrolled", scrolled);
        backToTop.classList.toggle("show", window.scrollY > 500);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // APPARITION DES ELEMENTS AU DEFILEMENT
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
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

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // LIEN ACTIF SELON LA SECTION VISIBLE
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;

                        navItems.forEach((link) => {
                            const isActive =
                                link.getAttribute("href") === `#${sectionId}`;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                rootMargin: "-30% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // TEXTE ANIME
    // Désactiver l'animation si l'utilisateur préfère
    // réduire les mouvements sur son appareil.
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const phrases = [
        "esprit analytique.",
        "passion pour l'innovation.",
        "future ingénieure.",
        "envie d'apprendre."
    ];

    if (reduceMotion) {
        typedText.textContent = phrases[0];
    } else {
        let phraseIndex = 0;
        let characterIndex = phrases[0].length;
        let deleting = true;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (deleting) {
                characterIndex--;
                typedText.textContent =
                    currentPhrase.substring(0, characterIndex);

                if (characterIndex <= 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;

                    setTimeout(typeEffect, 350);
                    return;
                }

                setTimeout(typeEffect, 35);
            } else {
                const nextPhrase = phrases[phraseIndex];
                characterIndex++;

                typedText.textContent =
                    nextPhrase.substring(0, characterIndex);

                if (characterIndex >= nextPhrase.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1700);
                    return;
                }

                setTimeout(typeEffect, 65);
            }
        }

        setTimeout(typeEffect, 1700);
    }

    // MOUVEMENT LEGER DU BANDEAU
    const marquee = document.querySelector(".marquee-track");

    if (marquee) {
        marquee.addEventListener("mouseenter", () => {
            marquee.style.animationPlayState = "paused";
        });

        marquee.addEventListener("mouseleave", () => {
            marquee.style.animationPlayState = "running";
        });
    }
});
