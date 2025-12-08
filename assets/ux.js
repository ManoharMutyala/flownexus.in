// assets/ux.js — small UX enhancements (reveal on scroll + sticky header)
(function () {
  var header = document.querySelector('.site-header');
  function checkHeader() {
    if (!header) return;
    if (window.pageYOffset > 18) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  checkHeader();
  window.addEventListener('scroll', checkHeader, { passive: true });

  var observerOptions = { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.08 };
  var revealCallback = function(entries, obs) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
  };

  var observer = new IntersectionObserver(revealCallback, observerOptions);
  document.querySelectorAll('.reveal').forEach(function(el){ observer.observe(el); });

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced && prefersReduced.matches) {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    var hero = document.querySelector('.anim-hero');
    if (hero) setTimeout(function(){ hero.classList.add('visible'); }, 60);
  });
})();