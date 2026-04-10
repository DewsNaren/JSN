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

let testiInitialized = false;
let testiResizeObserver = null;
let testiResizeTimer = null;
let testiOriginalCount = 0;

function initTestiSlider(testiWrapper) {
  if (!testiWrapper || testiInitialized) return;

  testiInitialized = true;

  const container = testiWrapper.querySelector(".testimonial-slider-inner-container");
  const prevBtn = testiWrapper.querySelector(".prev-btn");
  const nextBtn = testiWrapper.querySelector(".next-btn");

  let currentIndex = 0;
  let slideWidth = 0;
  let isTransitioning = false;


  // update 

  function updateSlide(index, animate = true) {
    const wrapperWidth = testiWrapper.offsetWidth;

    const offset =
      index * slideWidth - (wrapperWidth - slideWidth) / 2;

    container.style.transition = animate ? "transform 0.6s ease" : "none";
    container.style.transform = `translate3d(${-offset}px,0,0)`;
  }


  // move

  function goToSlide(next = true) {
    if (isTransitioning) return;

    isTransitioning = true;
    currentIndex += next ? 1 : -1;

    updateSlide(currentIndex, true);
  }

  
  function handleTransitionEnd() {
    const slides = container.querySelectorAll(".testimonial-card");

    if (currentIndex >= slides.length - testiOriginalCount) {
      currentIndex = testiOriginalCount;
      updateSlide(currentIndex, false);
    }

    if (currentIndex < testiOriginalCount) {
      currentIndex = slides.length - testiOriginalCount - 1;
      updateSlide(currentIndex, false);
    }

    isTransitioning = false;
  }


  function measureAndPosition() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const slides = container.querySelectorAll(".testimonial-card");
        if (!slides.length) return;

        // reset
        container.style.transform = "none";
        container.offsetHeight;

        // accurate width calc
        const rect1 = slides[0].getBoundingClientRect();
        const rect2 = slides[1]?.getBoundingClientRect();

        slideWidth = rect2
          ? rect2.left - rect1.left
          : rect1.width;

        currentIndex = testiOriginalCount;
        isTransitioning = false;

        container.style.transition = "none";
        updateSlide(currentIndex, false);
      });
    });
  }


  // init
 
  function init() {
    container.style.transition = "none";
    container.style.transform = "none";

    // remove old clones
    container.querySelectorAll(".clone").forEach(c => c.remove());

    const slides = [...container.querySelectorAll(".testimonial-card")];
    if (!slides.length) return;

    testiOriginalCount = slides.length;

    // prepend clones
    for (let i = testiOriginalCount - 1; i >= 0; i--) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add("clone");
      container.prepend(clone);
    }

    // append clones
    for (let i = 0; i < testiOriginalCount; i++) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add("clone");
      container.append(clone);
    }

    measureAndPosition();
  }

  init();


  // click events

  const prevHandler = () => goToSlide(false);
  const nextHandler = () => goToSlide(true);

  prevBtn?.addEventListener("click", prevHandler);
  nextBtn?.addEventListener("click", nextHandler);
  container.addEventListener("transitionend", handleTransitionEnd);

  // store handlers (for destroy)
  testiWrapper._prevHandler = prevHandler;
  testiWrapper._nextHandler = nextHandler;
  testiWrapper._transitionHandler = handleTransitionEnd;


  // resize observer

  testiResizeObserver = new ResizeObserver(() => {
    clearTimeout(testiResizeTimer);
    testiResizeTimer = setTimeout(() => {
      if (!testiInitialized) return;
      init();
    }, 100);
  });

  testiResizeObserver.observe(testiWrapper);
}

const testiWrapper = document.querySelector(".testimonial-slider-wrapper");

if (testiWrapper) {
  initTestiSlider(testiWrapper);

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
let internalResizeTimer = null;
let internalResizeHandler = null;
let originalCount = 0;

function initsocialSlider() {
  if (!socialWraper || sliderInitialized) return;

  sliderInitialized = true;

  const container = socialWraper.querySelector(".social-card-inner-container");
  const prevBtn = socialWraper.querySelector(".prev");
  const nextBtn = socialWraper.querySelector(".next");

  let currentIndex = 0;
  let slideWidth = 0;
  let isTransitioning = false;
  

  function updateSlide(index, animate = true) {
    container.style.transition = animate ? "transform 0.6s ease-in-out" : "none";
    container.style.transform = `translateX(${-index * slideWidth}px)`;
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

  function measureAndPosition() {

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const allSlides = container.querySelectorAll(".social-card");
        if (!allSlides.length) return;

        container.style.transform = "none";
        container.offsetHeight; 

        slideWidth = container.scrollWidth / allSlides.length;

        if (!slideWidth) {
          slideWidth = allSlides[0].getBoundingClientRect().width;
        }

        currentIndex = originalCount;
        isTransitioning = false;

        container.style.transition = "none";
        container.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
      });
    });
  }

  function init() {
    container.style.transition = "none";
    container.style.transform = "none";
    container.querySelectorAll(".social-card.clone").forEach(c => c.remove());

    const slides = [...container.querySelectorAll(".social-card")];
    if (!slides.length) return;

    originalCount = slides.length;

    for (let i = originalCount - 1; i >= 0; i--) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add("clone");
      container.prepend(clone);
    }

    for (let i = 0; i < originalCount; i++) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add("clone");
      container.append(clone);
    }

    measureAndPosition();
  }

  init();

  const prevHandler = () => goToSlide(false);
  const nextHandler = () => goToSlide(true);

  prevBtn.addEventListener("click", prevHandler);
  nextBtn.addEventListener("click", nextHandler);
  container.addEventListener("transitionend", handleTransitionEnd);

  socialWraper._prevHandler = prevHandler;
  socialWraper._nextHandler = nextHandler;
  socialWraper._transitionHandler = handleTransitionEnd;

  internalResizeHandler = () => {
    clearTimeout(internalResizeTimer);
    internalResizeTimer = setTimeout(() => {
      if (!sliderInitialized) return;
      init();
    }, 150);
  };

  window.addEventListener("resize", internalResizeHandler);
}

function destroySlider() {
  if (!socialWraper || !sliderInitialized) return;

  const container = socialWraper.querySelector(".social-card-inner-container");
  const prevBtn = socialWraper.querySelector(".prev");
  const nextBtn = socialWraper.querySelector(".next");

  container.querySelectorAll(".clone").forEach(c => c.remove());
  container.style.transform = "";
  container.style.transition = "";

  if (socialWraper._prevHandler) {
    prevBtn.removeEventListener("click", socialWraper._prevHandler);
    delete socialWraper._prevHandler;
  }
  if (socialWraper._nextHandler) {
    nextBtn.removeEventListener("click", socialWraper._nextHandler);
    delete socialWraper._nextHandler;
  }
  if (socialWraper._transitionHandler) {
    container.removeEventListener("transitionend", socialWraper._transitionHandler);
    delete socialWraper._transitionHandler;
  }

  if (internalResizeHandler) {
    window.removeEventListener("resize", internalResizeHandler);
    internalResizeHandler = null;
  }

  clearTimeout(internalResizeTimer);
  internalResizeTimer = null;
  sliderInitialized = false;
}

function handleResponsiveSlider() {
  requestAnimationFrame(() => {
    const isMobile = socialWraper.offsetWidth <= 768;

    if (isMobile) {
      if (!sliderInitialized) {
        initsocialSlider();
      } else {
  
        const container = socialWraper.querySelector(".social-card-inner-container");
        const allSlides = container.querySelectorAll(".social-card");
        if (!allSlides.length) return;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            container.style.transition = "none";
            container.style.transform = "none";
            container.offsetHeight;

            const newSlideWidth = container.scrollWidth / allSlides.length;
            const newCurrentIndex = originalCount;

            container.style.transform = `translateX(${-newCurrentIndex * newSlideWidth}px)`;
          });
        });
      }
    } else {
      if (sliderInitialized) destroySlider();
    }
  });
}


function recheckSlider() {
  setTimeout(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        handleResponsiveSlider();
      });
    });
  }, 200);
}

if(socialWraper){
  window.addEventListener("focus", recheckSlider);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      recheckSlider();
    }
  });

  let responsiveObserver = null;
  let responsiveTimer = null;

  function startObserver() {
    if (!socialWraper) return;

    responsiveObserver = new ResizeObserver(() => {
      clearTimeout(responsiveTimer);
      responsiveTimer = setTimeout(() => {
        handleResponsiveSlider();
      }, 100);
    });

    responsiveObserver.observe(socialWraper);
  }

  // init
  handleResponsiveSlider();
  startObserver();
}


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