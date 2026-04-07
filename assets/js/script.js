function initChooseSlider() {
    const chooseWrapper=document.querySelector(".choose-us-card-wrapper")
  const container = chooseWrapper.querySelector(".choose-us-card-inner-container");
//   const prevBtn = document.querySelector(".recent-slider-btn.prev");
  const nextBtn = chooseWrapper.querySelector(".arrow-btn");

  let slides = [...container.querySelectorAll(".choose-us-card")];
  container
    .querySelectorAll(".choose-us-card.clone")
    .forEach((clone) => clone.remove());

  function calculateGap() {
  const gap = window.innerWidth * 0.0275; // proportional
  return Math.min(Math.max(gap, 20), 52.8); // clamp between 20px and 52px
}
  slides.forEach((slide) => {
    const startClone = slide.cloneNode(true);
    const endClone = slide.cloneNode(true);
    startClone.classList.add("clone");
    endClone.classList.add("clone");
    container.prepend(startClone);
    container.append(endClone);
  });

  let gap = calculateGap();

  requestAnimationFrame(() => {
    const allSlides = [...container.querySelectorAll(".choose-us-card")];

    let slideWidth = allSlides[0].getBoundingClientRect().width + gap;
    let currentIndex = slides.length;
    let isTransitioning = false;
    // let firstVisit = true;

    function updateSlide(index, animate = true) {
      container.style.transition = animate
        ? "transform 0.6s ease-in-out"
        : "none";
      container.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    updateSlide(currentIndex, false);

    function goToSlide(next = true) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex += next ? 1 : -1;
      updateSlide(currentIndex, true);
    }

    // function goToSlide(next = true) {
    //   if (isTransitioning) return;
    //   isTransitioning = true;
    //   currentIndex += next ? 1 : -1;
    //   updateSlide(currentIndex);
    // }

    function handleTransitionEnd() {
      isTransitioning = false;
      const total = allSlides.length;
      const originalCount = slides.length;

      if (currentIndex >= total - originalCount) {
        currentIndex = originalCount;
        updateSlide(currentIndex, false);
      } else if (currentIndex < originalCount) {
        currentIndex = total - originalCount - 1;
        updateSlide(currentIndex, false);
      }
    }

    // prevBtn.addEventListener("click", () => goToSlide(false));
    nextBtn.addEventListener("click", () => goToSlide(true));

    container.addEventListener("transitionend", handleTransitionEnd);

    window.addEventListener("resize", () => {
      gap = calculateGap();
      slideWidth = allSlides[0].getBoundingClientRect().width + gap;
      updateSlide(currentIndex, false);
    });
  });
}

initChooseSlider();