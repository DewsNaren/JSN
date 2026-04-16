const screenShot = document.querySelector(".screenshot");

function initscreenSlider(screenShot) {
  if (!screenShot) return;

  //  prevent multi initialize
  if (screenShot._initialized) return;
  screenShot._initialized = true;

  const container = screenShot.querySelector(".slider-inner-container");
  const outerContainer = screenShot.querySelector(".slider-outer-container");
  const prevBtn = screenShot.querySelector(".prev-btn");
  const nextBtn = screenShot.querySelector(".next-btn");

  if (!container || !outerContainer) return;

  let currentIndex = 0;
  let isTransitioning = false;
  let originalCount = 0;

  let startX = 0;
  let startY = 0;
  const swipeThreshold = 50;

  // update

  function updateSlide(index, animate = true) {
    const slides = container.querySelectorAll(".slider");
    const slide = slides[index];
    if (!slide) return;

    const wrapperWidth = outerContainer.offsetWidth;
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const containerCenter = wrapperWidth / 2;
    const offset = slideCenter - containerCenter;

    container.style.transition = animate ? "transform 0.6s ease" : "none";
    container.style.transform = `translateX(${-offset}px)`;
  }

  function getRealIndex(index) {
    return ((index - originalCount) % originalCount + originalCount) % originalCount + originalCount;
  }

  function setActive(index) {
    const slides = container.querySelectorAll(".slider");
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index]?.classList.add("active");
  }

  function goToSlide(next = true) {
    if (isTransitioning) return;

    isTransitioning = true;
    currentIndex += next ? 1 : -1;

    setActive(getRealIndex(currentIndex));
    updateSlide(currentIndex, true);
  }

  function handleTransitionEnd() {
    const slides = container.querySelectorAll(".slider");

    if (currentIndex >= slides.length - originalCount) {
      currentIndex = originalCount;
      updateSlide(currentIndex, false);
    } else if (currentIndex < originalCount) {
      currentIndex = originalCount * 2 - 1;
      updateSlide(currentIndex, false);
    }

    isTransitioning = false;
  }




  function startSwipe(e) {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  }

  function endSwipe(e) {
    const dx = e.changedTouches[0].screenX - startX;
    const dy = e.changedTouches[0].screenY - startY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold && !isTransitioning) {
      goToSlide(dx < 0);
    }
  }

// initiate 
  function init() {
    container.style.transition = "none";
    container.querySelectorAll(".clone").forEach(c => c.remove());

    const originalSlides = [...container.querySelectorAll(".slider")];
    if (!originalSlides.length) return;

    originalCount = originalSlides.length;


    for (let i = originalCount - 1; i >= 0; i--) {
      const clone = originalSlides[i].cloneNode(true);
      clone.classList.add("clone");
      container.prepend(clone);
    }

    for (let i = 0; i < originalCount; i++) {
      const clone = originalSlides[i].cloneNode(true);
      clone.classList.add("clone");
      container.append(clone);
    }

    currentIndex = originalCount;
    isTransitioning = false;

    updateSlide(currentIndex, false);
    setActive(currentIndex)
  }

  init();


  // events

  const nextHandler = () => goToSlide(true);
  const prevHandler = () => goToSlide(false);

  nextBtn?.addEventListener("click", nextHandler);
  prevBtn?.addEventListener("click", prevHandler);
  container.addEventListener("transitionend", handleTransitionEnd);
  container.addEventListener("touchstart", startSwipe, { passive: true });
  container.addEventListener("touchend", endSwipe);

  // store handlers
  screenShot._nextHandler = nextHandler;
  screenShot._prevHandler = prevHandler;
  screenShot._transitionHandler = handleTransitionEnd;
  screenShot._touchStartHandler = startSwipe;
  screenShot._touchEndHandler = endSwipe;

  // resize
  let resizeTimer;
  const resizeHandler = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => init(), 150);
  };

  window.addEventListener("resize", resizeHandler);
  screenShot._resizeHandler = resizeHandler;
}


// reset
function destroyScreenSlider(screenShot) {
  if (!screenShot || !screenShot._initialized) return;

  const container = screenShot.querySelector(".slider-inner-container");
  const prevBtn = screenShot.querySelector(".prev-btn");
  const nextBtn = screenShot.querySelector(".next-btn");

  container?.querySelectorAll(".clone").forEach(c => c.remove());

  if (container) {
    container.style.transform = "";
    container.style.transition = "";
  }

  // remove click, and touch events
  nextBtn?.removeEventListener("click", screenShot._nextHandler);
  prevBtn?.removeEventListener("click", screenShot._prevHandler);
  container?.removeEventListener("transitionend", screenShot._transitionHandler);
  container?.removeEventListener("touchstart", screenShot._touchStartHandler);
  container?.removeEventListener("touchend", screenShot._touchEndHandler);
  window.removeEventListener("resize", screenShot._resizeHandler);

  screenShot._initialized = false;
}




if (screenShot) {
  initscreenSlider(screenShot);
}



// tab btn click

const tabBtns = document.querySelectorAll(".tab-btn");

tabBtns.forEach(btn => {
  const container = screenShot.querySelector(".slider-inner-container");

  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const device = btn.dataset.target;

    container.classList.remove("desktop", "mobile");
    container.classList.add(device);

    
    destroyScreenSlider(screenShot);
    initscreenSlider(screenShot);
  });
});