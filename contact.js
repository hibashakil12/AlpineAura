/* =========================================================
   ALPINE ASCENTS — CONTACT PAGE SCRIPT
   Vanilla JS + a little jQuery, no backend required.
   ========================================================= */

(function () {
  "use strict";



  /* =========================================================
     3. HERO PARTICLES (lightweight canvas "mountain mist" dust)
     ========================================================= */
  function initParticles() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const hero = document.getElementById("contact-hero");
    let particles = [];
    let animationId = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function resize() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    function createParticles() {
      const count = window.innerWidth < 576 ? 18 : 40;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.4,
          speedY: Math.random() * 0.25 + 0.05,
          speedX: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(242, 166, 193," + p.opacity + ")";
        ctx.fill();
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
      });
      animationId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();

    if (!prefersReducedMotion) {
      draw();
    }

    window.addEventListener("resize", function () {
      resize();
      createParticles();
    });
  }
  initParticles();

  /* =========================================================
     4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ========================================================= */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(".aa-reveal");
    if (!("IntersectionObserver" in window) || revealEls.length === 0) {
      revealEls.forEach(function (el) { el.classList.add("aa-in-view"); });
      return;
    }
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("aa-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }
  initScrollReveal();

  /* =========================================================
     5. SMOOTH SCROLL to form when "Send an Enquiry" is clicked
     ========================================================= */
  const sendEnquiryBtn = document.getElementById("sendEnquiryBtn");
  if (sendEnquiryBtn) {
    sendEnquiryBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.getElementById("contactForm");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(function () {
          const firstField = document.getElementById("fullName");
          if (firstField) firstField.focus({ preventScroll: true });
        }, 600);
      }
    });
  }

  const findLocationBtn = document.getElementById("findLocationBtn");
  if (findLocationBtn) {
    findLocationBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.getElementById("findUs");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* =========================================================
     6. CONTACT FORM VALIDATION + FAKE SUBMISSION
     ========================================================= */
  const enquiryForm = document.getElementById("enquiryForm");
  const successAlert = document.getElementById("formSuccessAlert");
  const errorAlert = document.getElementById("formErrorAlert");
  const messageField = document.getElementById("message");
  const charCount = document.getElementById("charCount");

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

  function countDigits(value) {
    return (value.match(/\d/g) || []).length;
  }

  // Live character counter for message field
  if (messageField && charCount) {
    messageField.addEventListener("input", function () {
      const len = messageField.value.trim().length;
      charCount.textContent = len + " / 20 min characters";
      charCount.style.color = len >= 20 ? "#4fbf8b" : "";
    });
  }

  function setFieldValidity(field, isValid) {
    if (!field) return;
    field.classList.toggle("is-invalid", !isValid);
    field.classList.toggle("is-valid", isValid);
  }

  function validateForm() {
    let isValid = true;

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const country = document.getElementById("country");
    const subject = document.getElementById("subject");
    const enquiryType = document.getElementById("enquiryType");
    const experienceLevel = document.getElementById("experienceLevel");
    const consentCheck = document.getElementById("consentCheck");

    // Full name
    const nameValid = fullName.value.trim().length >= 2;
    setFieldValidity(fullName, nameValid);
    if (!nameValid) isValid = false;

    // Email
    const emailValid = EMAIL_REGEX.test(email.value.trim());
    setFieldValidity(email, emailValid);
    if (!emailValid) isValid = false;

    // Phone: format check + must contain 7-15 digits
    const phoneDigits = countDigits(phone.value);
    const phoneValid = PHONE_REGEX.test(phone.value.trim()) && phoneDigits >= 7 && phoneDigits <= 15;
    setFieldValidity(phone, phoneValid);
    if (!phoneValid) isValid = false;

    // Country
    const countryValid = country.value.trim().length >= 2;
    setFieldValidity(country, countryValid);
    if (!countryValid) isValid = false;

    // Subject
    const subjectValid = subject.value.trim().length >= 2;
    setFieldValidity(subject, subjectValid);
    if (!subjectValid) isValid = false;

    // Enquiry type
    const enquiryTypeValid = enquiryType.value !== "";
    setFieldValidity(enquiryType, enquiryTypeValid);
    if (!enquiryTypeValid) isValid = false;

    // Experience level
    const experienceValid = experienceLevel.value !== "";
    setFieldValidity(experienceLevel, experienceValid);
    if (!experienceValid) isValid = false;

    // Message min length
    const messageValid = messageField.value.trim().length >= 20;
    setFieldValidity(messageField, messageValid);
    if (!messageValid) isValid = false;

    // Consent checkbox
    const consentValid = consentCheck.checked;
    consentCheck.classList.toggle("is-invalid", !consentValid);
    if (!consentValid) isValid = false;

    return isValid;
  }

  function showAlert(alertEl, otherAlertEl) {
    otherAlertEl.classList.add("d-none");
    alertEl.classList.remove("d-none");
    alertEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const valid = validateForm();

      if (!valid) {
        enquiryForm.classList.add("was-validated");
        showAlert(errorAlert, successAlert);
        enquiryForm.classList.remove("aa-shake");
        // force reflow so the shake animation can replay
        void enquiryForm.offsetWidth;
        enquiryForm.classList.add("aa-shake");
        return;
      }

      // Simulate successful "submission" — no backend involved.
      showAlert(successAlert, errorAlert);

      const submitBtn = document.getElementById("submitBtn");
      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-check me-2"></i>Sent!';

      setTimeout(function () {
        enquiryForm.reset();
        enquiryForm.classList.remove("was-validated");
        enquiryForm.querySelectorAll(".is-valid, .is-invalid").forEach(function (el) {
          el.classList.remove("is-valid", "is-invalid");
        });
        if (charCount) charCount.textContent = "0 / 20 min characters";
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
        successAlert.classList.add("d-none");
      }, 3200);
    });

    // Reset button also clears validation state + alerts
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        enquiryForm.classList.remove("was-validated");
        enquiryForm.querySelectorAll(".is-valid, .is-invalid").forEach(function (el) {
          el.classList.remove("is-valid", "is-invalid");
        });
        successAlert.classList.add("d-none");
        errorAlert.classList.add("d-none");
        if (charCount) charCount.textContent = "0 / 20 min characters";
      });
    }
  }

  /* =========================================================
     7. GEOLOCATION — "Detect My Location" button
     ========================================================= */
  const detectLocationBtn = document.getElementById("detectLocationBtn");
  const geoStatus = document.getElementById("geoStatus");
  const mapFrame = document.querySelector(".aa-map-frame");
  const mapFallback = document.getElementById("mapFallback");

  function setGeoStatus(html, state) {
    if (!geoStatus) return;
    geoStatus.classList.remove("aa-geo-success", "aa-geo-error");
    if (state) geoStatus.classList.add(state);
    geoStatus.innerHTML = html;
  }

  if (detectLocationBtn) {
    detectLocationBtn.addEventListener("click", function () {
      if (!("geolocation" in navigator)) {
        setGeoStatus(
          '<i class="fa-solid fa-circle-exclamation me-2"></i><span>Unable to access your location. Please check browser location permissions.</span>',
          "aa-geo-error"
        );
        return;
      }

      setGeoStatus(
        '<i class="fa-solid fa-spinner fa-spin me-2"></i><span>Detecting your location...</span>'
      );
      detectLocationBtn.disabled = true;

      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude.toFixed(4);
          const lon = position.coords.longitude.toFixed(4);

          setGeoStatus(
            '<i class="fa-solid fa-circle-check me-2"></i><span>Location detected: Latitude ' +
              lat + ', Longitude ' + lon + '.</span>',
            "aa-geo-success"
          );

          // Update the map to center on the user's coordinates
          if (mapFrame) {
            const delta = 0.03;
            const bbox = [
              (position.coords.longitude - delta).toFixed(4),
              (position.coords.latitude - delta).toFixed(4),
              (position.coords.longitude + delta).toFixed(4),
              (position.coords.latitude + delta).toFixed(4)
            ].join("%2C");
            const marker = lat + "%2C" + lon;
            mapFrame.src =
              "https://www.openstreetmap.org/export/embed.html?bbox=" +
              bbox + "&layer=mapnik&marker=" + marker;
          }

          detectLocationBtn.disabled = false;
          updateTickerLocation(lat + ", " + lon);
        },
        function () {
          setGeoStatus(
            '<i class="fa-solid fa-circle-exclamation me-2"></i><span>Unable to access your location. Please check browser location permissions.</span>',
            "aa-geo-error"
          );
          detectLocationBtn.disabled = false;
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
      );
    });
  }

  // If the map iframe fails to load, reveal the styled fallback panel.
  if (mapFrame && mapFallback) {
    mapFrame.addEventListener("error", function () {
      mapFrame.classList.add("d-none");
      mapFallback.classList.remove("d-none");
    });
  }

  /* =========================================================
     8. BACK TO TOP BUTTON
     ========================================================= */
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 500) {
          backToTopBtn.classList.add("aa-visible");
        } else {
          backToTopBtn.classList.remove("aa-visible");
        }
      },
      { passive: true }
    );

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =========================================================
     9. BOTTOM TICKER — date, time, live location
     ========================================================= */
  let tickerLocationText = "Location permission not granted";

  function updateTickerLocation(coordsText) {
    tickerLocationText = coordsText;
  }

  function formatDate(d) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return d.toLocaleDateString("en-GB", options).toUpperCase().replace(/,/g, "");
  }

  function formatTime(d) {
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return String(hours).padStart(2, "0") + ":" + minutes + ":" + seconds + " " + ampm;
  }

  function buildTickerContent() {
    const now = new Date();
    const text =
      '<span class="aa-ticker-item"><span class="aa-ticker-dot">●</span>LIVE LOCATION: ' +
      tickerLocationText +
      "</span>" +
      '<span class="aa-ticker-item">DATE: ' + formatDate(now) + "</span>" +
      '<span class="aa-ticker-item">TIME: ' + formatTime(now) + "</span>" +
      '<span class="aa-ticker-item">ALPINE ASCENTS &mdash; EDUCATIONAL EPROJECT</span>';
    // Duplicate content for a seamless continuous scroll loop
    return text + text;
  }

  const tickerTrack = document.getElementById("tickerTrack");

  function renderTicker() {
    if (!tickerTrack) return;
    tickerTrack.innerHTML = buildTickerContent();
  }

  renderTicker();
  setInterval(renderTicker, 1000);

  // Attempt a silent initial geolocation read for the ticker only
  // (does not prompt beyond the browser's native permission dialog).
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude.toFixed(3);
        const lon = position.coords.longitude.toFixed(3);
        updateTickerLocation(lat + ", " + lon);
      },
      function () {
        updateTickerLocation("Location permission not granted");
      },
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 120000 }
    );
  } else {
    updateTickerLocation("Geolocation not supported");
  }

  /* =========================================================
     10. jQuery ENHANCEMENT — accordion smooth open feedback
     ========================================================= */
  if (window.jQuery) {
    jQuery(function ($) {
      $(".aa-accordion .accordion-button").on("click", function () {
        const $item = $(this).closest(".accordion-item");
        $item.css("transition", "box-shadow 0.4s ease");
        $item.css("box-shadow", "0 0 0 2px rgba(232, 93, 138, 0.25)");
        setTimeout(function () {
          $item.css("box-shadow", "none");
        }, 500);
      });
    });
  }
})();