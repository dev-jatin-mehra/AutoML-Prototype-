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
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading file:", file.name);

      // Show loading indicator
      uploadBtn.textContent = "Uploading...";
      uploadBtn.disabled = true;

      // Sending file to the server
      fetch("http://localhost:5000/train", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("API Response:", data);
          displayResults(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error uploading file. Please try again.");
        })
        .finally(() => {
          // Reset button state
          uploadBtn.textContent = "Upload Dataset";
          uploadBtn.disabled = false;
        });
    } else {
      alert("Please select a file to upload");
    }
  });

  function displayResults(data) {
    const resultsCard = document.getElementById("resultsCard");
    const modelInfo = document.getElementById("modelInfo");
    const modelMetrics = document.getElementById("modelMetrics");
    const featureImportance = document.getElementById("featureImportance");

    // Display model info
    modelInfo.innerHTML = `
      <h3>Model Information</h3>
      <p>Model Type: ${data.model_type}</p>
      <p>Training Time: ${data.training_time.toFixed(2)} seconds</p>
    `;

    // Display model metrics
    modelMetrics.innerHTML = `
      <h3>Model Metrics</h3>
      <p>Accuracy: ${data.accuracy.toFixed(4)}</p>
      <p>Precision: ${data.precision.toFixed(4)}</p>
      <p>Recall: ${data.recall.toFixed(4)}</p>
      <p>F1 Score: ${data.f1_score.toFixed(4)}</p>
    `;

    // Display feature importance
    featureImportance.innerHTML = `
      <h3>Feature Importance</h3>
      <ul>
        ${Object.entries(data.feature_importance)
          .map(
            ([feature, importance]) =>
              `<li>${feature}: ${importance.toFixed(4)}</li>`
          )
          .join("")}
      </ul>
    `;

    // Show the results card
    resultsCard.style.display = "block";

    // Scroll to results
    resultsCard.scrollIntoView({ behavior: "smooth" });
  }

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
