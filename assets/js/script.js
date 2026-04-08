function initChooseSlider() {
  const wrapper = document.querySelector(".choose-us-card-wrapper");
  if (!wrapper) return;

  const container = wrapper.querySelector(".choose-us-card-inner-container");
  const nextBtn = wrapper.querySelector(".arrow-btn");

  if (!container) return;

  let currentIndex = 0;
  let slideWidth = 0;
  let isTransitioning = false;
  let originalCount = 0;

 
  function updateSlide(index, animate = true) {
    container.style.transition = animate
      ? "transform 0.6s ease-in-out"
      : "none";

    container.style.transform = `translate3d(${-index * slideWidth}px,0,0)`;
  }


  function goToSlide(next = true) {
    if (isTransitioning) return;

    isTransitioning = true;
    currentIndex += next ? 1 : -1;

    updateSlide(currentIndex, true);
  }

  
  function handleTransitionEnd() {
    const allSlides = container.querySelectorAll(".choose-us-card");

    // forward loop
    if (currentIndex >= allSlides.length - originalCount) {
      currentIndex = originalCount;
      updateSlide(currentIndex, false);
    }

    // backward loop
    if (currentIndex < originalCount) {
      currentIndex = allSlides.length - originalCount - 1;
      updateSlide(currentIndex, false);
    }

    isTransitioning = false;
  }


  function init() {
    container.style.transition = "none";

    // remove old clones
    container.querySelectorAll(".choose-us-card.clone").forEach(c => c.remove());

    const slides = [...container.querySelectorAll(".choose-us-card")];
    if (!slides.length) return;

    originalCount = slides.length;

    // clone before
    for (let i = originalCount - 1; i >= 0; i--) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add("clone");
      container.prepend(clone);
    }

    // clone after
    for (let i = 0; i < originalCount; i++) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add("clone");
      container.append(clone);
    }

    const allSlides = container.querySelectorAll(".choose-us-card");

    // calculate width
    if (allSlides.length > 1) {
      slideWidth =
        allSlides[1].offsetLeft - allSlides[0].offsetLeft;
    } else {
      slideWidth = allSlides[0].offsetWidth;
    }

    currentIndex = originalCount;
    isTransitioning = false;

    updateSlide(currentIndex, false);
  }


  init();

  // click events

  nextBtn?.addEventListener("click", () => goToSlide(true));
  container.addEventListener("transitionend", handleTransitionEnd);



  let startX = 0;
  let startY = 0;
  const swipeThreshold = 60;

  function startSwipe(e) {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  }

  function endSwipe(e) {
    const endX = e.changedTouches[0].screenX;
    const endY = e.changedTouches[0].screenY;

    const dx = endX - startX;
    const dy = endY - startY;


    if (
      Math.abs(dx) > Math.abs(dy) &&
      Math.abs(dx) > swipeThreshold &&
      !isTransitioning
    ) {

      goToSlide(dx < 0);
    }
  }

  container.addEventListener("touchstart", startSwipe, { passive: true });
  container.addEventListener("touchend", endSwipe);


  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      init();
    }, 150);
  });
}



initChooseSlider();

//toggle images
const loveToContainer=document.querySelector(".love-to-do");

const loadMoreBtn=loveToContainer.querySelector(".load-more-btn");

const imgWrappers=loveToContainer.querySelectorAll(".img-wrapper");

loadMoreBtn.addEventListener('click',()=>{
  toggleImages(loadMoreBtn.childNodes[0].data.toLowerCase())
})

function toggleImages(text){
 if(text.includes("more")){
    imgWrappers.forEach(wrapper=>{
      wrapper.classList.remove("hidden");
    })
    loadMoreBtn.childNodes[0].data="Load Less"
  }
  else{
    imgWrappers.forEach((wrapper,i)=>{
      if(i>4){
        wrapper.classList.add("hidden");
      }
      loadMoreBtn.childNodes[0].data="Load More"
      
    })
  }
}


