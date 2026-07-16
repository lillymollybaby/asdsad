const DESIGN_WIDTH = 852;
const DESIGN_HEIGHT = 1846;

function fitScreenToViewport() {
  if (!window.matchMedia('(max-width: 600px)').matches) {
    document.documentElement.style.removeProperty('--screen-scale');
    document.documentElement.style.removeProperty('--screen-offset');
    return;
  }

  const viewport = window.visualViewport;
  const width = viewport ? viewport.width : window.innerWidth;
  const height = viewport ? viewport.height : window.innerHeight;
  const scale = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
  document.documentElement.style.setProperty('--screen-scale', scale.toString());
  document.documentElement.style.setProperty('--screen-offset', `${(width - DESIGN_WIDTH * scale) / 2}px`);
}

fitScreenToViewport();
window.addEventListener('resize', fitScreenToViewport);
window.addEventListener('orientationchange', fitScreenToViewport);
window.visualViewport?.addEventListener('resize', fitScreenToViewport);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}
