document.addEventListener('DOMContentLoaded', () => {
  // Initialize ScrollMagic controller
  const controller = new ScrollMagic.Controller();

  // Create a scene for the parallax effect
  const parallaxScene = new ScrollMagic.Scene({
    triggerElement: '.parallax',
    triggerHook: 1,
    duration: '200%',
  })
    .setTween('.parallax', { y: '80%', ease: Power0.easeNone })
    .addTo(controller);

  // Smooth scrolling
  function smoothScroll(target) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }

  function animateSkills() {
    const skillElements = document.querySelectorAll('.animate-skills li');
    const windowHeight = window.innerHeight;

    function checkScroll() {
      skillElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
          element.style.opacity = 1;
          element.style.transform = 'translateY(0)';
        }
      });
    }

    // Function to handle click events on navigation links
    function handleNavClick(event) {
      event.preventDefault();
      const target = document.querySelector(event.target.getAttribute('href'));
      smoothScroll(target);
    }

    window.addEventListener('scroll', checkScroll);

    // Attach click event listener to navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      link.addEventListener('click', handleNavClick);
    });

    checkScroll(); // Trigger the animation when the page loads
  }

  animateSkills();
});