/* ============================================
   Care & Arts — FURNITURE STORE
   Main JavaScript
============================================= */

(function () {
    "use strict";

    // ---- DOM Elements ----
    var navbar = document.getElementById("navbar");
    var navToggle = document.getElementById("navToggle");
    var navMenu = document.getElementById("navMenu");
    var navLinks = document.querySelectorAll(".nav-link");
    var contactForm = document.getElementById("contactForm");

    // ---- Mobile Menu Overlay ----
    var overlay = document.createElement("div");
    overlay.classList.add("mobile-menu-overlay");
    document.body.appendChild(overlay);

    // ---- Mobile Menu Toggle ----
    function openMenu() {
        navMenu.classList.add("active");
        navToggle.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (navToggle) {
        navToggle.addEventListener("click", function () {
            if (navMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu when overlay is clicked
    overlay.addEventListener("click", function () {
        closeMenu();
    });

    // ---- Close Mobile Menu on Link Click ----
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    // ---- Navbar Scroll Effect ----
    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);
    // Run on page load in case the page is already scrolled
    handleNavbarScroll();

    // ---- Contact Form Submission ----
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Gather form data
            var name = document.getElementById("name").value.trim();
            var email = document.getElementById("email").value.trim();
            var phone = document.getElementById("phone").value.trim();
            var subject = document.getElementById("subject").value;
            var message = document.getElementById("message").value.trim();

            // Basic validation
            if (!name || !email || !subject || !message) {
                alert("Please fill in all required fields.");
                return;
            }

            // Email format validation
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Success message
            alert(
                "Thank you, " +
                    name +
                    "! Your message has been sent successfully. Our team will get back to you within 24 hours."
            );

            // Reset form
            contactForm.reset();
        });
    }

    // ---- Smooth Scroll for Anchor Links (fallback for older browsers) ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            var targetId = this.getAttribute("href");
            if (targetId === "#") return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                var navHeight = navbar.offsetHeight;
                var targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });

    // ---- Close mobile menu on Escape key ----
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && navMenu.classList.contains("active")) {
            closeMenu();
        }
    });

    // ---- Tawk.to (consent-gated) ----
    var CONSENT_KEY = "furniturestore_cookie_consent";

    function loadTawkTo() {
        var Tawk_API = window.Tawk_API || {};
        var Tawk_LoadStart = new Date();
        var s1 = document.createElement("script");
        s1.async = true;
        s1.src = "https://embed.tawk.to/69a02bd14afa321c34c78eac/1jicqmbgf";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        var s0 = document.getElementsByTagName("script")[0];
        s0.parentNode.insertBefore(s1, s0);
        window.Tawk_API = Tawk_API;
    }

    // If the user has already accepted cookies, load Tawk.to immediately
    if (localStorage.getItem(CONSENT_KEY) === "accepted") {
        loadTawkTo();
    }

    // ---- Cookie Consent Banner ----
    function showCookieConsent() {
        if (localStorage.getItem(CONSENT_KEY)) return; // already answered

        var banner = document.createElement("div");
        banner.id = "cookieConsentBanner";
        banner.style.cssText =
            "position:fixed;bottom:0;left:0;right:0;background:#2c2c2c;color:#fff;" +
            "padding:16px 24px;display:flex;align-items:center;justify-content:space-between;" +
            "flex-wrap:wrap;gap:12px;z-index:99999;font-size:14px;font-family:inherit;";

        var text = document.createElement("p");
        text.style.cssText = "margin:0;flex:1 1 300px;line-height:1.5;";
        text.textContent =
            "We use cookies and third-party tools such as Tawk.to live chat to improve your experience. " +
            "By clicking \"Accept\" you consent to our use of cookies.";

        var btnWrap = document.createElement("div");
        btnWrap.style.cssText = "display:flex;gap:8px;flex-shrink:0;";

        var acceptBtn = document.createElement("button");
        acceptBtn.textContent = "Accept";
        acceptBtn.style.cssText =
            "padding:10px 24px;background:#b08d57;color:#fff;border:none;border-radius:4px;" +
            "cursor:pointer;font-size:14px;font-weight:600;";

        var declineBtn = document.createElement("button");
        declineBtn.textContent = "Decline";
        declineBtn.style.cssText =
            "padding:10px 24px;background:transparent;color:#fff;border:1px solid #888;" +
            "border-radius:4px;cursor:pointer;font-size:14px;";

        acceptBtn.addEventListener("click", function () {
            localStorage.setItem(CONSENT_KEY, "accepted");
            banner.remove();
            loadTawkTo();
        });

        declineBtn.addEventListener("click", function () {
            localStorage.setItem(CONSENT_KEY, "declined");
            banner.remove();
        });

        btnWrap.appendChild(acceptBtn);
        btnWrap.appendChild(declineBtn);
        banner.appendChild(text);
        banner.appendChild(btnWrap);
        document.body.appendChild(banner);
    }

    showCookieConsent();
})();
