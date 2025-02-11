document.addEventListener("DOMContentLoaded", () => {
  // Navbar functionality
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

  // File upload functionality
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const uploadBtn = document.getElementById("uploadBtn");

  dropZone.addEventListener("click", () => fileInput.click());

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    fileInput.files = e.dataTransfer.files;
    updateFileName();
  });

  fileInput.addEventListener("change", updateFileName);

  function updateFileName() {
    const fileName = fileInput.files[0]
      ? fileInput.files[0].name
      : "No file selected";
    dropZone.querySelector("p").textContent = fileName;
  }

  uploadBtn.addEventListener("click", () => {
    if (fileInput.files.length > 0) {
      // Here you would typically send the file to your server
      console.log("Uploading file:", fileInput.files[0].name);
      // You can add AJAX call here to upload the file
    } else {
      alert("Please select a file to upload");
    }
  });

  // GSAP animations
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".upload-section", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".upload-section",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from(".upload-container", {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    delay: 0.5,
  });
});
