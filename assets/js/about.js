//Counter effect
const counters = document.querySelectorAll('.experience .count');


function animateCounter(counter, duration = 2000) {
  const target = +counter.dataset.count;
  const symbol=counter.dataset.symbol;
  const variable=counter.dataset.var;
  const steps = 100; 
  const increment = target / steps; 
  const intervalTime = duration / steps; 
  let current = 0;
  let stepCount = 0;

  const timer = setInterval(() => {
    current += increment;
    stepCount++;

    if (stepCount >= steps) {
        if(variable){
            counter.innerHTML =`${target}${variable} <span>${symbol}</span>` 
        }
        else{
            counter.innerHTML =`${target} <span>${symbol}</span>` 
        }
      clearInterval(timer);
    } 
    else {
      if(variable){
            counter.innerHTML =`${Math.floor(current)}${variable} <span>${symbol}</span>` 
        }
        else{
            counter.innerHTML =`${Math.floor(current)} <span>${symbol}</span>` 
        }
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