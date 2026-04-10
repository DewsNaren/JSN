const screenShot = document.querySelector(".screenshot");

function initscreenSlider(screenShot) {
  if (!screenShot) return;

  const container = screenShot.querySelector(".slider-inner-container");
  const outerContainer = screenShot.querySelector(".slider-outer-container");
  const prevBtn = screenShot.querySelector(".prev-btn");
  const nextBtn = screenShot.querySelector(".next-btn");

  if (!container || !outerContainer) return;

  let currentIndex = 0;
  let isTransitioning = false;
  let originalCount = 0;

  let resizeObserver = null;
  let resizeTimer = null;


  function doubleRAF(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  }


  function updateSlide(index, animate = true) {
    const slides = container.querySelectorAll(".slider");
    const slide = slides[index];
    if (!slide) return;

    const wrapperWidth = outerContainer.offsetWidth;

    const slideRect = slide.getBoundingClientRect();
    const containerRect = outerContainer.getBoundingClientRect();

    const slideCenter = slideRect.left + slideRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;

    const offset = slideCenter - containerCenter;

    container.style.transition = animate ? "transform 0.6s ease" : "none";
    container.style.transform = `translate3d(${-offset}px,0,0)`;
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


  let startX = 0;
  let startY = 0;
  const swipeThreshold = 50;

  function startSwipe(e) {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  }

  function endSwipe(e) {
    const endX = e.changedTouches[0].screenX;
    const endY = e.changedTouches[0].screenY;
    const dx = endX - startX;
    const dy = endY - startY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold && !isTransitioning) {
      goToSlide(dx < 0);
    }
  }

 
  function init() {
    container.style.transition = "none";
    container.style.transform = "none";

    container.querySelectorAll(".clone").forEach(c => c.remove());

    const originalSlides = [...container.querySelectorAll(".slider")];
    if (!originalSlides.length) return;

    originalCount = originalSlides.length;

    // clones
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

    doubleRAF(() => {

      container.offsetHeight;

      currentIndex = originalCount;
      isTransitioning = false;

      updateSlide(currentIndex, false);
      setActive(currentIndex);
    });
  }

  init();

  
  const nextHandler = () => goToSlide(true);
  const prevHandler = () => goToSlide(false);

  nextBtn?.addEventListener("click", nextHandler);
  prevBtn?.addEventListener("click", prevHandler);
  container.addEventListener("transitionend", handleTransitionEnd);
  container.addEventListener("touchstart", startSwipe, { passive: true });
  container.addEventListener("touchend", endSwipe);


  resizeObserver = new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      init();
    }, 100);
  });

  resizeObserver.observe(screenShot);
}
if (screenShot) {
  initscreenSlider(screenShot);
}





//tab btn click function
const tabBtns=document.querySelectorAll(".tab-btn");

tabBtns.forEach(btn=>{
  const container = screenShot.querySelector(".slider-inner-container");

  btn.addEventListener("click",()=>{
    tabBtns.forEach(btn=>btn.classList.remove("active"));
    btn.classList.add("active");
    const device=btn.dataset.target
    container.classList.remove("desktop","mobile")
    container.classList.add(device);
    initscreenSlider(screenShot);
  })
})


