function initChooseSlider() {
  const wrapper = document.querySelector(".choose-us-card-wrapper");
  if (!wrapper) return;

  const container = wrapper.querySelector(".choose-us-card-inner-container");
  const nextBtn = wrapper.querySelector(".arrow-btn");

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

  function goToSlide() {
    if (isTransitioning) return;

    isTransitioning = true;
    currentIndex++;
    updateSlide(currentIndex, true);
  }

  function handleTransitionEnd() {
    const allSlides = container.querySelectorAll(".choose-us-card");

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


    container.querySelectorAll(".choose-us-card.clone").forEach(c => c.remove());

    const slides = [...container.querySelectorAll(".choose-us-card")];
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

    const allSlides = container.querySelectorAll(".choose-us-card");

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

  // init
  init();

  // events
  nextBtn.addEventListener("click", goToSlide);
  container.addEventListener("transitionend", handleTransitionEnd);

  window.addEventListener("resize", () => {
    init(); 
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


