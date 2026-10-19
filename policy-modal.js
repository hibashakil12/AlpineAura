(function () {
  const path = window.location.pathname;
  const isHomePage = path === '/' || path.endsWith('/index.html') || path === '';
  const overlay = document.getElementById('alpinePolicyOverlay');
  const detailOverlay = document.getElementById('alpinePolicyDetailOverlay');
  if (!overlay || !detailOverlay) return;
  const alpinePolicyCard = overlay.querySelector('.alpine-policy-card');
  let alpinePolicyShown = false;
  let alpinePolicyFrozen = false;
  const SCROLL_THRESHOLD = 300;
  const SESSION_KEY = 'alpineAuraPolicySeen';
  const ALPINE_POLICY_CLOSE_FALLBACK_MS = 650;
  let alpinePolicyOriginalStyles = null;
  function alpinePolicyGetScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }
  function alpinePolicyBlockScroll(e) {
    if (!overlay.contains(e.target) && !detailOverlay.contains(e.target)) {
      e.preventDefault();
    }
  }
  function alpinePolicyBlockKeyScroll(e) {
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (!keys.includes(e.key)) return;
    const active = document.activeElement;
    if (overlay.contains(active) || detailOverlay.contains(active)) return;
    e.preventDefault();
  }
  function alpinePolicyFreeze() {
    if (alpinePolicyFrozen) return;
    alpinePolicyFrozen = true;
    alpinePolicyOriginalStyles = {
      htmlOverflow: document.documentElement.style.overflow,
      htmlOverflowAnchor: document.documentElement.style.overflowAnchor,
      bodyOverflow: document.body.style.overflow,
      bodyOverflowAnchor: document.body.style.overflowAnchor,
      bodyPaddingRight: document.body.style.paddingRight
    };
    const scrollbarWidth = alpinePolicyGetScrollbarWidth();
    const currentPaddingRight = parseFloat(
      window.getComputedStyle(document.body).paddingRight
    ) || 0;
    document.documentElement.style.overflowAnchor = 'none';
    document.body.style.overflowAnchor = 'none';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = (currentPaddingRight + scrollbarWidth) + 'px';
    }
    window.addEventListener('wheel', alpinePolicyBlockScroll, { passive: false });
    window.addEventListener('touchmove', alpinePolicyBlockScroll, { passive: false });
    window.addEventListener('keydown', alpinePolicyBlockKeyScroll, { passive: false });
  }
  function alpinePolicyUnfreeze() {
    if (!alpinePolicyFrozen) return;
    window.removeEventListener('wheel', alpinePolicyBlockScroll);
    window.removeEventListener('touchmove', alpinePolicyBlockScroll);
    window.removeEventListener('keydown', alpinePolicyBlockKeyScroll);
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    const saved = alpinePolicyOriginalStyles || {};
    document.documentElement.style.overflow = saved.htmlOverflow || '';
    document.body.style.overflow = saved.bodyOverflow || '';
    document.body.style.paddingRight = saved.bodyPaddingRight || '';
    document.documentElement.style.overflowAnchor = saved.htmlOverflowAnchor || '';
    document.body.style.overflowAnchor = saved.bodyOverflowAnchor || '';
    alpinePolicyOriginalStyles = null;
    alpinePolicyFrozen = false;
  }
  function alpinePolicyWaitForCardClose(card, callback) {
    if (!card) {
      callback();
      return;
    }
    let done = false;
    let fallbackId = null;
    function finish() {
      if (done) return;
      done = true;
      card.removeEventListener('transitionend', onTransitionEnd);
      if (fallbackId !== null) clearTimeout(fallbackId);
      callback();
    }
    function onTransitionEnd(e) {
      if (e.target !== card) return;
      if (e.propertyName !== 'opacity' && e.propertyName !== 'transform') return;
      finish();
    }
    card.addEventListener('transitionend', onTransitionEnd);
    fallbackId = setTimeout(finish, ALPINE_POLICY_CLOSE_FALLBACK_MS);
  }
  function alpinePolicyOpen() {
    if (alpinePolicyShown) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    alpinePolicyShown = true;
    alpinePolicyFreeze();
    overlay.classList.add('alpine-policy-active');
    overlay.setAttribute('aria-hidden', 'false');
    window.removeEventListener('scroll', alpinePolicyScrollHandler);
  }
  function alpinePolicyClose() {
    overlay.classList.remove('alpine-policy-active');
    overlay.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem(SESSION_KEY, 'true');
    alpinePolicyWaitForCardClose(alpinePolicyCard, function () {
      alpinePolicyUnfreeze();
    });
  }
  function alpinePolicyScrollHandler() {
    if (window.scrollY >= SCROLL_THRESHOLD) {
      alpinePolicyOpen();
    }
  }
  if (isHomePage && !sessionStorage.getItem(SESSION_KEY)) {
    window.addEventListener('scroll', alpinePolicyScrollHandler, { passive: true });
  }
  const closeBtn = document.getElementById('alpinePolicyClose');
  if (closeBtn) closeBtn.addEventListener('click', alpinePolicyClose);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) alpinePolicyClose();
  });
  const acceptBtn = document.getElementById('alpinePolicyAccept');
  if (acceptBtn) acceptBtn.addEventListener('click', alpinePolicyClose);
  const detailTabs = detailOverlay.querySelectorAll('.alpine-policy-detail-tab');
  const detailPanels = detailOverlay.querySelectorAll('.alpine-policy-detail-section');
  const detailContent = document.getElementById('alpinePolicyDetailContent');
  function alpinePolicyDetailShowSection(name) {
    detailPanels.forEach(function (panel) {
      panel.hidden = panel.dataset.panel !== name;
    });
    detailTabs.forEach(function (tab) {
      tab.classList.toggle('alpine-policy-detail-tab-active', tab.dataset.section === name);
    });
    if (detailContent) detailContent.scrollTop = 0;
  }
  window.alpinePolicyDetailOpen = function (section) {
    alpinePolicyDetailShowSection(section || 'overview');
    detailOverlay.classList.add('alpine-policy-detail-active');
    detailOverlay.setAttribute('aria-hidden', 'false');
  };
  function alpinePolicyDetailClose() {
    detailOverlay.classList.remove('alpine-policy-detail-active');
    detailOverlay.setAttribute('aria-hidden', 'true');
    if (document.activeElement && detailOverlay.contains(document.activeElement)) {
      document.activeElement.blur();
    }
  }
  detailTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      alpinePolicyDetailShowSection(tab.dataset.section);
    });
  });
  const detailCloseBtn = document.getElementById('alpinePolicyDetailClose');
  if (detailCloseBtn) detailCloseBtn.addEventListener('click', alpinePolicyDetailClose);
  detailOverlay.addEventListener('click', function (e) {
    if (e.target === detailOverlay) alpinePolicyDetailClose();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (detailOverlay.classList.contains('alpine-policy-detail-active')) {
      e.stopImmediatePropagation();
      alpinePolicyDetailClose();
      return;
    }
    if (overlay.classList.contains('alpine-policy-active')) {
      alpinePolicyClose();
    }
  }, true);
})();