(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------
     Hero parallax — content drifts up slower than the scroll
     ---------------------------------------------------------- */
  var heroInner = document.getElementById('hero-parallax');

  if (heroInner && !reducedMotion) {
    var ticking = false;

    var updateParallax = function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        heroInner.style.transform = 'translateY(' + y * 0.28 + 'px)';
        heroInner.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.85));
      }
      ticking = false;
    };

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Nav shrink on scroll
     ---------------------------------------------------------- */
  var nav = document.getElementById('site-nav');

  if (nav) {
    var navTick = false;

    var updateNav = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
      navTick = false;
    };

    window.addEventListener('scroll', function () {
      if (!navTick) {
        window.requestAnimationFrame(updateNav);
        navTick = true;
      }
    }, { passive: true });

    updateNav();
  }

  /* ----------------------------------------------------------
     Credential cards — accordion
     ---------------------------------------------------------- */
  document.querySelectorAll('.cred-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.cred-card');
      var isOpen = card.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
})();
