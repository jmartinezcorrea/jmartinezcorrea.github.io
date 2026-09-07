/*
 * Progressive enhancement only.
 *
 * The tabs are ordinary same-page anchors and every section is always present
 * in the document, so navigation, scrolling and reading all work with this
 * file absent, blocked or broken. The only thing added here is highlighting
 * the tab for whichever section the reader is currently looking at.
 */
(function () {
  'use strict';

  var nav = document.querySelector('.tabs');
  if (!nav) return;

  var targets = Array.prototype.slice
    .call(nav.querySelectorAll('a[href^="#"]'))
    .map(function (link) {
      return { link: link, section: document.getElementById(link.hash.slice(1)) };
    })
    .filter(function (pair) { return pair.section; });

  if (targets.length === 0) return;

  var header = document.querySelector('.site-header');

  // The sticky header changes height when the tabs wrap onto a second line.
  // Feeding the measured height back into --header-h keeps scroll-margin-top
  // accurate, so an anchor jump lands the heading just below the header. The
  // stylesheet ships a sensible static value, so this only refines it.
  function syncHeaderHeight() {
    if (!header) return;
    document.documentElement.style.setProperty(
      '--header-h', header.offsetHeight + 'px'
    );
  }

  // Reading one bounding rect per section per scroll event is cheap enough at
  // this scale that no throttling is needed. Avoiding a queue flag also means
  // there is no state that can get stuck and silently kill the highlighting.
  function update() {
    // Anything whose top has passed this line counts as the current section.
    // It sits just under the sticky header, so a section becomes active as
    // its heading clears the header.
    var line = (header ? header.offsetHeight : 0) + 24;

    // Only meaningful when there is something to scroll: on a very tall
    // viewport the whole page can be visible at once, and the first section
    // is the right answer there, not the last.
    var scrollable =
      document.documentElement.scrollHeight > window.innerHeight + 2;
    var atBottom =
      scrollable &&
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

    var current = targets[0].link;
    if (atBottom) {
      // The final section is often too short to reach the line on its own.
      current = targets[targets.length - 1].link;
    } else {
      for (var i = 0; i < targets.length; i++) {
        if (targets[i].section.getBoundingClientRect().top <= line) {
          current = targets[i].link;
        }
      }
    }

    for (var j = 0; j < targets.length; j++) {
      if (targets[j].link === current) {
        targets[j].link.setAttribute('aria-current', 'true');
      } else {
        targets[j].link.removeAttribute('aria-current');
      }
    }
  }

  function onResize() {
    syncHeaderHeight();
    update();
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('hashchange', update);

  syncHeaderHeight();
  update();
})();
