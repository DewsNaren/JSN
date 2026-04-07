// function initscreenSlider(screenShot) {
//   if (!screenShot) return;

//   const container = screenShot.querySelector(".slider-inner-container");
//   const outerContainer = screenShot.querySelector(".slider-outer-container");
//   const prevBtn = screenShot.querySelector(".prev-btn");
//   const nextBtn = screenShot.querySelector(".next-btn");

//   if (!container || !outerContainer) return;

//   let currentIndex = 0;
//   let isTransitioning = false;
//   let originalCount = 0;

//   // ======================
//   // UPDATE SLIDE (PERFECT CENTER)
//   // ======================
//   function updateSlide(index, animate = true) {
//     const wrapperWidth = outerContainer.offsetWidth;
//     const slides = container.querySelectorAll(".slider");

//     const slide = slides[index];
//     if (!slide) return;

//     // ✅ PERFECT CENTER CALCULATION
//     const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
//     const containerCenter = wrapperWidth / 2;
//     const offset = slideCenter - containerCenter;

//     container.style.transition = animate
//       ? "transform 0.6s ease"
//       : "none";

//     container.style.transform = `translate3d(${-offset}px,0,0)`;

//     // ✅ ACTIVE CLASS (ONLY REAL SLIDES)
//     const realSlides = [...container.querySelectorAll(".slider:not(.clone)")];

//     const realIndex =
//       (index - originalCount + originalCount) % originalCount;

//     slides.forEach(slide => slide.classList.remove("active"));

//     if (realSlides[realIndex]) {
//       realSlides[realIndex].classList.add("active");
//     }
//   }

//   // ======================
//   // NEXT / PREV
//   // ======================
//   function goToSlide(next = true) {
//     if (isTransitioning) return;

//     isTransitioning = true;
//     currentIndex += next ? 1 : -1;

//     updateSlide(currentIndex, true);
//   }

//   // ======================
//   // LOOP FIX (NO EMPTY SPACE)
//   // ======================
//   function handleTransitionEnd() {
//     const slides = container.querySelectorAll(".slider");

//     // forward loop
//     if (currentIndex >= slides.length - originalCount) {
//       currentIndex = originalCount;
//       updateSlide(currentIndex, false);
//     }

//     // backward loop
//     if (currentIndex < originalCount) {
//       currentIndex = slides.length - originalCount;
//       updateSlide(currentIndex, false);
//     }

//     isTransitioning = false;
//   }

//   // ======================
//   // INIT
//   // ======================
//   function init() {
//     container.style.transition = "none";

//     // remove old clones
//     container.querySelectorAll(".clone").forEach(c => c.remove());

//     const originalSlides = [...container.querySelectorAll(".slider")];
//     if (!originalSlides.length) return;

//     originalCount = originalSlides.length;

//     // 🔥 clone BEFORE
//     for (let i = originalCount - 1; i >= 0; i--) {
//       const clone = originalSlides[i].cloneNode(true);
//       clone.classList.add("clone");
//       container.prepend(clone);
//     }

//     // 🔥 clone AFTER
//     for (let i = 0; i < originalCount; i++) {
//       const clone = originalSlides[i].cloneNode(true);
//       clone.classList.add("clone");
//       container.append(clone);
//     }

//     currentIndex = originalCount;
//     isTransitioning = false;

//     updateSlide(currentIndex, false);
//   }

//   // ======================
//   // INIT CALL
//   // ======================
//   init();

//   // ======================
//   // EVENTS
//   // ======================
//   nextBtn?.addEventListener("click", () => goToSlide(true));
//   prevBtn?.addEventListener("click", () => goToSlide(false));

//   container.addEventListener("transitionend", handleTransitionEnd);

//   // ======================
//   // RESIZE (DEBOUNCE)
//   // ======================
//   let resizeTimer;

//   window.addEventListener("resize", () => {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(() => {
//       init();
//     }, 150);
//   });
// }


// // ======================
// // INIT
// // ======================
// const screenShot = document.querySelector(".screenshot");

// if (screenShot) {
//   initscreenSlider(screenShot);
// }


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

  // ======================
  // UPDATE SLIDE POSITION
  // ======================
  function updateSlide(index, animate = true) {
    const wrapperWidth = outerContainer.offsetWidth;
    const slides = container.querySelectorAll(".slider");

    const slide = slides[index];
    if (!slide) return;

    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const containerCenter = wrapperWidth / 2;
    const offset = slideCenter - containerCenter;

    container.style.transition = animate
      ? "transform 0.6s ease"
      : "none";

    container.style.transform = `translate3d(${-offset}px,0,0)`;
  }

  // ======================
  // SET ACTIVE (CENTER SLIDE ALWAYS)
  // ======================
  function setActive(index) {
    const slides = container.querySelectorAll(".slider");

    slides.forEach(slide => slide.classList.remove("active"));

    if (slides[index]) {
      slides[index].classList.add("active");
    }
  }

  // ======================
  // NEXT / PREV
  // ======================
  function goToSlide(next = true) {
    if (isTransitioning) return;

    isTransitioning = true;
    currentIndex += next ? 1 : -1;

    // ✅ Apply active immediately (fix jerk)
    setActive(currentIndex);

    updateSlide(currentIndex, true);
  }

  // ======================
  // LOOP FIX
  // ======================
  function handleTransitionEnd() {
    const slides = container.querySelectorAll(".slider");

    // forward loop
    if (currentIndex >= slides.length - originalCount) {
      currentIndex = originalCount;
      updateSlide(currentIndex, false);
      setActive(currentIndex);
    }

    // backward loop
    if (currentIndex < originalCount) {
      currentIndex = slides.length - originalCount;
      updateSlide(currentIndex, false);
      setActive(currentIndex);
    }

    isTransitioning = false;
  }

  // ======================
  // INIT
  // ======================
  function init() {
    container.style.transition = "none";

    // remove old clones
    container.querySelectorAll(".clone").forEach(c => c.remove());

    const originalSlides = [...container.querySelectorAll(".slider")];
    if (!originalSlides.length) return;

    originalCount = originalSlides.length;

    // clone BEFORE
    for (let i = originalCount - 1; i >= 0; i--) {
      const clone = originalSlides[i].cloneNode(true);
      clone.classList.add("clone");
      container.prepend(clone);
    }

    // clone AFTER
    for (let i = 0; i < originalCount; i++) {
      const clone = originalSlides[i].cloneNode(true);
      clone.classList.add("clone");
      container.append(clone);
    }

    currentIndex = originalCount;
    isTransitioning = false;

    updateSlide(currentIndex, false);
    setActive(currentIndex); // ✅ initial active
  }

  // ======================
  // INIT CALL
  // ======================
  init();

  // ======================
  // EVENTS
  // ======================
  nextBtn?.addEventListener("click", () => goToSlide(true));
  prevBtn?.addEventListener("click", () => goToSlide(false));

  container.addEventListener("transitionend", handleTransitionEnd);

  // ======================
  // RESIZE (DEBOUNCE)
  // ======================
  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      init();
    }, 150);
  });
}


// ======================
// INIT
// ======================
const screenShot = document.querySelector(".screenshot");

if (screenShot) {
  initscreenSlider(screenShot);
}