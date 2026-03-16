/* London Cardiology Clinic — main.js */

document.addEventListener('DOMContentLoaded', function () {
  /* ── Smooth scroll for anchor links ── */
  var navHeight = 60;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#main') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
        /* close mobile menu if open */
        var nav = document.querySelector('.nav');
        if (nav && nav.classList.contains('nav-open')) {
          nav.classList.remove('nav-open');
          var toggle = document.querySelector('.nav-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  /* ── Mobile hamburger menu ── */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ── Active nav link highlighting ── */
  var sections = document.querySelectorAll('main section[id], main div[id]');
  var navLinks = document.querySelectorAll('.nav .links a:not(.book-btn)');

  if (sections.length > 0 && navLinks.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
});
