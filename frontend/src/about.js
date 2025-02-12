document.addEventListener("DOMContentLoaded", () => {
  // Navbar functionality
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  if (burger) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");

      navLinks.forEach((link, index) => {
        link.style.animation = link.style.animation
          ? ""
          : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      });
    });
  }

  // GSAP animations
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    try {
      // Animate sections
      gsap.from(".about-section", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate content elements
      gsap.from(
        ".about-content h2, .about-content h3, .about-content p, .about-content ul, .about-content ol",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate team section
      gsap.from(".team-section", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".team-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate creator info
      gsap.from(".creator-image", {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".creator-info",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".creator-details", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".creator-info",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate contributors
      gsap.from(".contributors", {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".contributors",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    } catch (error) {
      console.error("GSAP animation error:", error);
    }
  }

  // Function to add contributors dynamically
  function addContributors(contributors) {
    const contributorsContainer = document.getElementById("contributors");
    if (contributorsContainer) {
      contributors.forEach((contributor) => {
        const contributorElement = document.createElement("div");
        contributorElement.className = "contributor";
        contributorElement.innerHTML = `
                <img src="${contributor.avatar}" alt="${contributor.name}">
                <p>${contributor.name}</p>
            `;
        contributorsContainer.appendChild(contributorElement);
      });
    }
  }

  // Example contributors data
  const contributors = [
    { name: "Contributor 1", avatar: "assets/contributors/contributor1.jpg" },
    { name: "Contributor 2", avatar: "assets/contributors/contributor2.jpg" },
    { name: "Contributor 3", avatar: "assets/contributors/contributor3.jpg" },
  ];

  // Add contributors to the page
  addContributors(contributors);

  // Smooth scrolling for Contact section
  document.querySelectorAll('a[href="#contact"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#contact").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
