//navigation overlay
document.addEventListener("DOMContentLoaded", () => {
  const navOverlay = document.getElementById('nav-overlay');
  const openTrigger = document.querySelector('[data-content="Work"]');
  const closeBtn = document.getElementById('close-btn');
  const dynamicText = document.getElementById('dynamic-text');

  // Open Function
  if (openTrigger) {
    openTrigger.onclick = () => {
      // Set the dynamic text based on the data-content attribute
      if (dynamicText) dynamicText.innerText = openTrigger.getAttribute('data-content');
      
      navOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    };
  }

  // Close Function
  if (closeBtn) {
    closeBtn.onclick = () => {
      navOverlay.classList.remove('is-open');
      document.body.style.overflow = ''; // Restore scrolling
    };
  }

  // Close on Escape Key (Pro touch)
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      navOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
});










//smooth scroll
document.querySelector('.scroll-btn').addEventListener('click', function(e) {
  const target = document.querySelector(this.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  }
});










//button
const btn = document.querySelector('.button');

if (window.innerWidth > 968 && btn) {
  // Set initial states
  gsap.set(btn, { "--after-opacity": 0, "--after-x": "-10px" });

  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { 
      "--after-opacity": 1, 
      "--after-x": "8px", 
      duration: 0.3, 
      ease: "power2.out" 
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { 
      "--after-opacity": 0, 
      "--after-x": "-10px", 
      duration: 0.3 
    });
  });
}

// --- The Smooth Scroll (Native & clean) ---
const scrollBtn = document.querySelector('.scroll-btn');
if (scrollBtn) {
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(scrollBtn.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}



