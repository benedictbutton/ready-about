<script type="text/javascript">
function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

const z = document.getElementById('close-callout');
const y = document.getElementById('map-callout-box');

const getStarted = document.getElementById('getStarted');
getStarted.setAttribute('aria-describedby', 'getStarted');

function reposition() {
  const mapContainer = document.getElementById('map-container');
  const mapHeight = mapContainer.offsetHeight;
  const calloutBox = document.getElementById('callout-container');
  const calloutHeight = calloutBox.offsetHeight;

  const difference = (mapHeight - calloutHeight) / 2;
  const mTransform = `translateY(-${mapHeight - difference}px)`;
  console.log(window.innerWidth);

  const distance = 515 + calloutHeight;
  const spacing = calloutHeight + 10;

  if (window.innerWidth > 600) {
    mapContainer.style.transform = 'none';
    calloutBox.style.transform = mTransform;
    mapContainer.style.marginBottom = '0px';
  } else {
    calloutBox.style.transform = `translateY(-${distance}px)`;
    mapContainer.style.transform = `translateY(${spacing}px)`;
    mapContainer.style.marginBottom = `${spacing}px`;
  }
}

z.onclick = () => {
  y.style.display = 'none';
  window.removeEventListener(reposition);
};

window.addEventListener('resize', debounce(reposition, 400, true));
reposition();
</script>
