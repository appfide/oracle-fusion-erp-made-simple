/* Applies saved theme + text size before first paint (avoids a light flash in dark mode). */
(function () {
  try {
    var raw = localStorage.getItem('erp-made-simple:v1');
    var s = raw ? (JSON.parse(raw).settings || {}) : {};
    var root = document.documentElement;
    if (s.theme === 'light' || s.theme === 'dark') root.setAttribute('data-theme', s.theme);
    if (s.textSize) root.setAttribute('data-text-size', s.textSize);
    if (s.reduceMotion) root.classList.add('reduce-motion');
  } catch (e) { /* storage blocked: defaults apply */ }
})();
