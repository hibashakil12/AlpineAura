(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var galGrid = document.getElementById("galMediaGrid");
    if (!galGrid) return; // Gallery markup not on this page
    var galFilterBtns = document.querySelectorAll(".gal-filter-btn");
    var galCards = galGrid.querySelectorAll(".gal-media-card");
    var galFsBtns = galGrid.querySelectorAll(".gal-fs-btn");
    var galModal = document.getElementById("galModal");
    var galModalCard = document.getElementById("galModalCard");
    var galModalContent = document.getElementById("galModalContent");
    var galCloseBtn = document.getElementById("galCloseModal");
    /* ---------------- FILTERING ---------------- */
    function filterGallery(filterValue) {
      galCards.forEach(function (card) {
        var type = card.getAttribute("data-type");
        var show = filterValue === "all" || filterValue === type;
        card.hidden = !show;
      });
      galFilterBtns.forEach(function (btn) {
        var isActive = btn.getAttribute("data-filter") === filterValue;
        btn.classList.toggle("gal-active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
      });
    }
    galFilterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterGallery(btn.getAttribute("data-filter"));
      });
    });
    /* ---------------- MODAL ---------------- */
    function openGalModal(mediaType, src, alt) {
      galModalContent.innerHTML = "";
      if (mediaType === "photo") {
        var img = document.createElement("img");
        img.src = src;
        img.alt = alt || "Alpine Aura gallery photo";
        galModalContent.appendChild(img);
      } else if (mediaType === "video") {
        var video = document.createElement("video");
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.muted = true;
        video.volume = 0;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute("aria-label", alt || "Alpine Aura gallery video");
        galModalContent.appendChild(video);
        video.play().catch(function () {
          /* Autoplay may be blocked until user interacts — controls remain available */
        });
      }
      galModal.classList.add("gal-modal-open");
      galModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeGalModal() {
      var playingVideo = galModalContent.querySelector("video");
      if (playingVideo) {
        playingVideo.pause();
        playingVideo.currentTime = 0;
      }
      galModal.classList.remove("gal-modal-open");
      galModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "auto";
      // Remove modal media after the close transition finishes
      window.setTimeout(function () {
        if (!galModal.classList.contains("gal-modal-open")) {
          galModalContent.innerHTML = "";
        }
      }, 300);
    }
    galFsBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var mediaType = btn.getAttribute("data-media-type");
        var src = btn.getAttribute("data-src");
        var alt = btn.getAttribute("data-alt");
        openGalModal(mediaType, src, alt);
      });
    });
    galCloseBtn.addEventListener("click", closeGalModal);
    // Close on outside click (clicking the dark overlay, not the modal card)
    galModal.addEventListener("click", function (e) {
      if (e.target === galModal) {
        closeGalModal();
      }
    });
    // Close on ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && galModal.classList.contains("gal-modal-open")) {
        closeGalModal();
      }
    });
  });
})();