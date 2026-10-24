
/* ===================================
   IBTIHAL MOUMEN — PORTFOLIO
   Interactions
=================================== */

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("back-to-top");
    const year = document.getElementById("year");

    // Année automatique
    year.textContent = new Date().getFullYear();

    // Menu mobile
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

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Header et retour en haut
    function updateScrollUI() {
        const scrollPosition = window.scrollY;

        header.classList.toggle("scrolled", scrollPosition > 40);
        backToTop.classList.toggle("show", scrollPosition > 450);
    }

    window.addEventListener("scroll", updateScrollUI, {
        passive: true
    });

    updateScrollUI();

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Apparition progressive des éléments
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
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        // Solution de secours pour les navigateurs plus anciens
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // Mettre en évidence la section visible
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navItems.forEach((link) => {
                        const active =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", active);
                    });
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // Pause du bandeau au survol
    const ticker = document.querySelector(".ticker-track");

    if (ticker) {
        ticker.addEventListener("mouseenter", () => {
            ticker.style.animationPlayState = "paused";
        });

        ticker.addEventListener("mouseleave", () => {
            ticker.style.animationPlayState = "running";
        });
    }

    // Respecter les préférences de mouvement réduit
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function applyMotionPreference() {
        if (reduceMotion.matches) {
            document.querySelectorAll(".reveal").forEach((element) => {
                element.classList.add("visible");
            });
        }
    }

    applyMotionPreference();
    reduceMotion.addEventListener?.("change", applyMotionPreference);
});
