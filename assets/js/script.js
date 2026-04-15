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
  let isInitialized = false;


  function removeClones() {
    container.querySelectorAll(".choose-us-card.clone").forEach(el => el.remove());
  }


  function updateSlide(index, animate = true) {
    container.style.transition = animate
      ? "transform 0.5s ease"
      : "none";

    container.style.transform = `translateX(${-index * slideWidth}px)`;
  }


  function calculateWidth() {
    const slides = container.querySelectorAll(".choose-us-card");
    if (!slides.length) return;

    const styles = getComputedStyle(container);

    const gap = parseFloat(styles.columnGap || styles.gap || 0);

    const cardWidth = slides[0].offsetWidth;
    
    slideWidth = cardWidth + gap;
  }

  function goToSlide(next = true) {
    if (isTransitioning || slideWidth === 0) return;

    isTransitioning = true;
    currentIndex += next ? 1 : -1;

    updateSlide(currentIndex, true);
  }


  function handleTransitionEnd() {
    const slides = container.querySelectorAll(".choose-us-card");

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
    if (isInitialized) return;

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

    calculateWidth();

    currentIndex = originalCount;
    updateSlide(currentIndex, false);

    isInitialized = true;
  }


  nextBtn?.addEventListener("click", () => goToSlide(true));
  container.addEventListener("transitionend", handleTransitionEnd);


  let startX = 0;
  let startY = 0;

  container.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  }, { passive: true });

  container.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].screenX - startX;
    const dy = e.changedTouches[0].screenY - startY;

    if (
      Math.abs(dx) > Math.abs(dy) &&
      Math.abs(dx) > 60 &&
      !isTransitioning
    ) {
      goToSlide(dx < 0);
    }
  });


  const observer = new ResizeObserver(() => {
    calculateWidth();


    container.style.transition = "none";
    container.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
  });

  observer.observe(container);


  init();
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


//Counter effect
const counters = document.querySelectorAll('.help-you .count');

function animateCounter(counter, duration = 2000) {
  const target = +counter.dataset.count;
  const steps = 100; 
  const increment = target / steps; 
  const intervalTime = duration / steps; 
  let current = 0;
  let stepCount = 0;

  const timer = setInterval(() => {
    current += increment;
    stepCount++;

    if (stepCount >= steps) {
      counter.innerHTML =`${ target} <sup>+</sup>` ;
      clearInterval(timer);
    } 
    else {
      counter.innerHTML =` ${Math.floor(current)} <sup>+</sup>`;
    }
  }, intervalTime);
}


const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, 2000); 
      // obs.unobserve(entry.target); 
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));