const homeHeader = document.querySelector('.home-header');
const homeHeaderHeight = homeHeader.offsetHeight;   
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      homeHeader.classList.add('scrolled');
    } else {
      homeHeader.classList.remove('scrolled');
    }
}); 


//testimonial slider

function inittestiSlider(testiWrapper) {
  if (!testiWrapper) return;

  const container = testiWrapper.querySelector(".testimonial-slider-inner-container");
  const prevBtn = testiWrapper.querySelector(".prev-btn");
  const nextBtn = testiWrapper.querySelector(".next-btn");

  if (!container) return;

  let currentIndex = 0;
  let slideWidth = 0;
  let isTransitioning = false;
  let originalCount = 0;


  function updateSlide(index, animate = true) {
    const wrapperWidth = testiWrapper.offsetWidth;

    const offset =
      index * slideWidth - (wrapperWidth - slideWidth) / 2;

    container.style.transition = animate
      ? "transform 0.6s ease"
      : "none";

    container.style.transform = `translate3d(${-offset}px,0,0)`;

    const slides = container.querySelectorAll(".testimonial-card");

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }


  function goToSlide(next = true) {
    if (isTransitioning) return;

    isTransitioning = true;
    currentIndex += next ? 1 : -1;

    updateSlide(currentIndex, true);
  }


  function handleTransitionEnd() {
    const slides = container.querySelectorAll(".testimonial-card");


    if (currentIndex >= slides.length - originalCount) {
      currentIndex = originalCount;
      updateSlide(currentIndex, false);
    }

   
    if (currentIndex < originalCount) {
      currentIndex = slides.length - originalCount - 1;
      updateSlide(currentIndex, false);
    }

    isTransitioning = false;
  }


  function init() {
    container.style.transition = "none";


    container.querySelectorAll(".clone").forEach(c => c.remove());

    const originalSlides = [...container.querySelectorAll(".testimonial-card")];
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

    const slides = container.querySelectorAll(".testimonial-card");


    if (slides.length > 1) {
      slideWidth =
        slides[1].offsetLeft - slides[0].offsetLeft;
    } else {
      slideWidth = slides[0].offsetWidth;
    }

    currentIndex = originalCount;
    isTransitioning = false;

    updateSlide(currentIndex, false);
  }


  init();

//btn click
  nextBtn?.addEventListener("click", () => goToSlide(true));
  prevBtn?.addEventListener("click", () => goToSlide(false));

  container.addEventListener("transitionend", handleTransitionEnd);
  container.addEventListener("transitionend", handleTransitionEnd);


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

const testiWrapper = document.querySelector(".testimonial-slider-wrapper");

if (testiWrapper) {
  inittestiSlider(testiWrapper);

}



//client marque

const clientContainer=document.querySelector(".client-container");

if(clientContainer){
    let position=0;
    function clientMarque(){
        const scrollSpeed=1.3;
        position+=scrollSpeed;

        if(position >= clientContainer.scrollWidth/2){
            position=0;
        }

        clientContainer.style.transform= `translateX(-${position}px)`
        requestAnimationFrame(clientMarque)
    }
    clientContainer.innerHTML+=clientContainer.innerHTML;
    requestAnimationFrame(clientMarque)
}


const socialWraper = document.querySelector(".social-card-wrapper");

let sliderInitialized = false;

function initsocialSlider() {
  if (!socialWraper || sliderInitialized) return;

  sliderInitialized = true;

  const container = socialWraper.querySelector(".social-card-inner-container");
  const prevBtn = socialWraper.querySelector(".prev");
  const nextBtn = socialWraper.querySelector(".next");

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
    const allSlides = container.querySelectorAll(".social-card");

    if (currentIndex >= allSlides.length - originalCount) {
      currentIndex = originalCount;
      updateSlide(currentIndex, false);
    }

    if (currentIndex < originalCount) {
      currentIndex = allSlides.length - originalCount - 1;
      updateSlide(currentIndex, false);
    }

    isTransitioning = false;
  }

  function init() {
    container.style.transition = "none";

    // remove old clones
    container.querySelectorAll(".social-card.clone").forEach(c => c.remove());

    const slides = [...container.querySelectorAll(".social-card")];
    if (!slides.length) return;

    originalCount = slides.length;

    // 🔥 clone BEFORE
    for (let i = originalCount - 1; i >= 0; i--) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add("clone");
      container.prepend(clone);
    }

    // 🔥 clone AFTER
    for (let i = 0; i < originalCount; i++) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add("clone");
      container.append(clone);
    }

    const allSlides = container.querySelectorAll(".social-card");

    // ✅ accurate width (no gap issues)
    if (allSlides.length > 1) {
      slideWidth =
        allSlides[1].offsetLeft - allSlides[0].offsetLeft;
    } else {
      slideWidth = allSlides[0].offsetWidth;
    }

    currentIndex = originalCount;
    isTransitioning = false;

    container.style.transform =
      `translate3d(${-currentIndex * slideWidth}px,0,0)`;
  }

  // init slider
  init();

  // events
  prevBtn.addEventListener("click", () => goToSlide(false));
  nextBtn.addEventListener("click", () => goToSlide(true));
  container.addEventListener("transitionend", handleTransitionEnd);

  // 🔥 better resize handling
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      init();
    }, 150);
  });
}

function destroySlider() {
  if (!socialWraper || !sliderInitialized) return;

  const container = socialWraper.querySelector(".social-card-inner-container");

  // remove clones
  container.querySelectorAll(".clone").forEach(c => c.remove());

  // reset styles
  container.style.transform = "";
  container.style.transition = "";

  sliderInitialized = false;
}

function handleResponsiveSlider() {
  if (window.innerWidth <= 768) {
    initsocialSlider();
  } else {
    destroySlider();
  }
}

// init on load
handleResponsiveSlider();

// handle resize
window.addEventListener("resize", handleResponsiveSlider);

//navbar
const body=document.querySelector("body")
const headerActions=document.querySelector(".header-actions");
const navList=document.querySelector("nav ul")
const menuBtn=document.querySelector(".menu-btn");
const closeBtn=document.querySelector(".close-btn");

menuBtn.addEventListener("click",()=>{
  headerActions.classList.add("active");
  closeBtn.classList.add("active");
  body.classList.add("not-active");
})
closeBtn.addEventListener("click",()=>{
  headerActions.classList.remove("active");
  closeBtn.classList.remove("not-active");
  body.classList.remove("not-active");
})


window.addEventListener("resize",()=>{
  headerActions.classList.remove("active");
  closeBtn.classList.remove("not-active");
  body.classList.remove("not-active");
})