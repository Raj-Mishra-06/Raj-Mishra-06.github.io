document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('nav');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
    menuToggle.classList.toggle('open'); // Add class to animate the menu button
  });

  const skillCards = document.querySelectorAll('.skill-card');

  function checkSlide() {
    skillCards.forEach(skillCard => {
      const slideInAt = (window.scrollY + window.innerHeight) - skillCard.offsetHeight / 2;
      const skillCardBottom = skillCard.offsetTop + skillCard.offsetHeight;
      const isHalfShown = slideInAt > skillCard.offsetTop;
      const isNotScrolledPast = window.scrollY < skillCardBottom;
      if (isHalfShown && isNotScrolledPast) {
        skillCard.classList.add('slide-in');
      } else {
        skillCard.classList.remove('slide-in');
      }
    });
  }

  window.addEventListener('scroll', checkSlide);
  // Add event listener to each navigation link
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('show');
      menuToggle.classList.remove('open');
    });
  });

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
      menu.classList.remove('show'); // Hide the menu after smooth scrolling
      menuToggle.classList.remove('open'); // Reset the menu button animation
    }

    window.addEventListener('scroll', checkScroll);

    // Attach click event listener to navigation links
    navLinks.forEach((link) => {
      link.addEventListener('click', handleNavClick);
    });

    checkScroll(); // Trigger the animation when the page loads
  }

  animateSkills();
});
