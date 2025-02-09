document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // GSAP animations
  gsap.registerPlugin(ScrollTrigger);

  // Animate sections
  const animateSections = () => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });
  };

  // Animate timeline
  const animateTimeline = () => {
    gsap.from(".timeline-step", {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  };

  // Animate feature cards
  const animateFeatureCards = () => {
    gsap.from(".feature-card", {
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".feature-grid",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  };

  // Initialize animations
  animateSections();
  animateTimeline();
  animateFeatureCards();
});
