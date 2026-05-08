// intro animation
    const tl = gsap.timeline({ repeat: -1 });
    const words = ["#txt1", "#txt2", "#txt3"];

    // Ensure the transformation origin is the center of the SVG
    gsap.set("#box-group", { transformOrigin: "50% 50%" });

    words.forEach((wordId, index) => {
        // 1. Move cursor to the bottom-right point
        tl.to("#cursor", { visibility: "visible", x: 275, y: 275, duration: 0.6, ease: "power2.out" })
        
        // 2. "Pull" the box open (Scale it up)
          .to("#box-group", { scale: 1.3, duration: 0.5, ease: "back.out(2)" })
          .to("#cursor", { x: 310, y: 310, duration: 0.5, ease: "back.out(2)" }, "<") // Cursor moves with the corner
        
        // 3. Fade in the word
          .to(wordId, { opacity: 1, duration: 0.3 }, "-=0.2")
        
        // 4. Hold to read
          .to({}, { duration: 1.2 })
        
        // 5. Fold back down and hide word
          .to(wordId, { opacity: 0, duration: 0.2 })
          .to("#box-group", { scale: 1, duration: 0.4, ease: "power2.inOut" })
          .to("#cursor", { x: 275, y: 275, duration: 0.4, ease: "power2.inOut" }, "<")
          
        // 6. Brief pause before next word
          .to({}, { duration: 0.3 });
    });



//zero
{
  // --- 1. The Breathing Tree Animation ---
  const treeTl = gsap.timeline({ repeat: -1, yoyo: true });
  const leaves = document.querySelectorAll('.leaf');
  const trunk = document.querySelector('.trunk');

  gsap.set(trunk, { transformOrigin: "bottom center" });
  gsap.set(leaves, { transformOrigin: "center center" });

  treeTl
    .to(trunk, { 
      scaleY: 1.15, 
      duration: 2, 
      ease: "sine.inOut" 
    })
    .to(leaves, { 
      scale: 1.1, 
      y: -4, 
      stagger: 0.2, 
      duration: 2, 
      ease: "sine.inOut" 
    }, 0); // 0 ensures they start at the same time as the trunk

  // --- 2. The Floating & Spinning Pound Animation ---
  const poundTl = gsap.timeline({ repeat: -1 });
  const poundIcon = document.querySelector('.pound-icon');

  gsap.set(poundIcon, { transformOrigin: "50% 50%" });

  // Floating Up and Down
  gsap.to(poundIcon, {
    y: -8,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Continuous 3D Spin
  poundTl.to(poundIcon, {
    rotationY: 360,
    duration: 3,
    ease: "none" // "none" is vital for a smooth, constant loop
  });
}




//aareon
{
  const handle = document.querySelector('.main-handle');
  const dot = document.querySelector('.handle-dot');
  const oldLab = document.querySelector('.old-lab');
  const newLab = document.querySelector('.new-lab');
  const bg = document.querySelector('.toggle-bg');

  // Ensure the dot scales from its own center, not the SVG top-left
  gsap.set(dot, { transformOrigin: "50% 50%" });
  gsap.set([oldLab, newLab], { transformOrigin: "50% 50%" });

  const masterTl = gsap.timeline({ 
    repeat: -1, 
    yoyo: true, 
    repeatDelay: 1 
  });

  masterTl
    // 1. Move handle perfectly to the right (300 total - 100 handle width = 200)
    .to(handle, { 
      x: 180, 
      duration: 1.2, 
      ease: "power3.inOut" 
    })
    
    // 2. Change Dot color and Scale it (stays centered because of gsap.set above)
    .to(dot, { 
      fill: "#3b82f6", 
      scale: 1.8, 
      duration: 0.8 
    }, 0.2)

    // 3. Toggle Label Colors
    .to(oldLab, { fill: "#3b82f6", scale: 1, duration: 0.5 }, 0)
    .to(newLab, { fill: "#3b82f6", scale: 1, duration: 0.5 }, 0.5)

    // 4. Subtle Background Glow
    .to(bg, { fill: "#eef2ff", duration: 1.2 }, 0);
}


//integrity commerce
// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Select the icon groups
  const shopify = document.querySelector('#icon-shopify');
  const cart = document.querySelector('#icon-cart');
  const pound = document.querySelector('#icon-pound');
  
  // 2. Initial State Setup
  // We shrink the Cart and Pound sign and hide them 
  // so they can "pop" in later.
  gsap.set([cart, pound], { 
    opacity: 0, 
    scale: 0.3, 
    transformOrigin: "50% 50%" 
  });
  
  // Ensure Shopify logo also rotates from center
  gsap.set(shopify, { 
    transformOrigin: "50% 50%",
    opacity: 1,
    scale: 1 
  });

  // 3. Create the Infinite Timeline
  const masterTl = gsap.timeline({ repeat: -1 });

  /**
   * Helper function to handle the transition between two icons
   * @param {Element} from - The icon currently visible
   * @param {Element} to - The icon that will appear
   */
  function iconSwap(from, to) {
    masterTl
      // Step A: Current icon shrinks and fades out
      .to(from, { 
        opacity: 0, 
        scale: 0.2, 
        rotate: -15, // Adds a 3D "falling away" effect
        duration: 0.7, 
        ease: "power2.in" 
      })
      // Step B: Next icon pops in with a "Back" ease for 3D bounce
      .to(to, { 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        duration: 0.9, 
        ease: "back.out(1.6)" // This creates the "3D pop" feel
      }, "-=0.3") // Overlap the animations slightly for a cross-fade look
      
      // Step C: Hold on the current icon so the user can see it
      .to({}, { duration: 1.8 }); 
  }

  // 4. Build the Sequence Loop
  // The timeline starts with Shopify visible, so we wait, then swap.
  
  masterTl.to({}, { duration: 1.8 }); // Initial pause on Shopify logo
  
  iconSwap(shopify, cart);   // Shopify -> Cart
  iconSwap(cart, pound);    // Cart -> Pound
  iconSwap(pound, shopify); // Pound -> Shopify back to start
});





//currys
// Wait for everything (images, GSAP, and DOM) to be fully loaded
window.addEventListener("load", () => {
  
  // 1. Check if GSAP is available to avoid "gsap is not defined" errors
  if (typeof gsap !== "undefined") {
    
    // 2. Initialize the timeline
    // repeat: -1 makes it loop forever
    // yoyo: false ensures it plays A -> B, then A -> B again
    const tl = gsap.timeline({ 
      repeat: -1, 
      defaults: { ease: "power2.inOut", duration: 0.8 } 
    });

    // 3. Building the sequence
    tl.addLabel("start")
      
      // Pause on the Wide Logo for 3 seconds
      .to({}, { duration: 3 }) 

      // Transition: Fade OUT Wide, Fade IN Circle
      .to("#logo-wide", { 
        opacity: 0, 
        scale: 0.9, // Slight shrink effect
        zIndex: 1 
      })
      .to("#logo-circle", { 
        opacity: 1, 
        scale: 1, 
        display: "block", // Ensures it's visible
        zIndex: 2 
      }, "-=0.8") // Start this at the same time as the previous tween

      // Pause on the Circle Logo for 3 seconds
      .to({}, { duration: 3 })

      // Transition: Fade OUT Circle, Fade IN Wide
      .to("#logo-circle", { 
        opacity: 0, 
        scale: 0.9,
        zIndex: 1 
      })
      .to("#logo-wide", { 
        opacity: 1, 
        scale: 1, 
        zIndex: 2 
      }, "-=0.8");

    console.log("Logo animation initialized successfully.");

  } else {
    // This will trigger if your <script src="gsap.js"> tag is missing or broken
    console.error("GSAP Error: The GSAP library was not detected. Please check your CDN link.");
  }
});




