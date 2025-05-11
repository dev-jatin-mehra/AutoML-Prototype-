document.addEventListener("DOMContentLoaded", () => {
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const uploadBtn = document.getElementById("uploadBtn");
  const uploadForm = document.getElementById("uploadForm");

  // Navbar Toggle
  document.querySelector(".burger").addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("nav-active");
    document.querySelector(".burger").classList.toggle("toggle");
  });

  // Click to open file dialog
  dropZone.addEventListener("click", () => fileInput.click());

  // Drag & Drop Functionality
  ["dragover", "dragenter"].forEach((event) =>
    dropZone.addEventListener(event, (e) => {
      e.preventDefault();
      dropZone.classList.add("dragover");
    })
  );

  ["dragleave", "drop"].forEach((event) =>
    dropZone.addEventListener(event, (e) => {
      e.preventDefault();
      dropZone.classList.remove("dragover");
      if (e.type === "drop") {
        fileInput.files = e.dataTransfer.files;
        updateFileName();
      }
    })
  );

  fileInput.addEventListener("change", updateFileName);

  function updateFileName() {
    dropZone.querySelector("p").textContent = fileInput.files[0]
      ? fileInput.files[0].name
      : "Drag and drop your file here or click to select";
  }

  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await handleFileUpload();
  });

  async function handleFileUpload() {
    if (fileInput.files.length === 0) {
      alert("Please select a file to upload.");
      return;
    }

    uploadBtn.disabled = true;
    uploadBtn.textContent = "Uploading...";

    try {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      const response = await fetch("https://automl-kyxw.onrender.com/train", {
        method: "POST",
        body: formData,
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Upload Success:", data);
      displayResults(data);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("File upload failed. Please try again.");
    } finally {
      uploadBtn.disabled = false;
      uploadBtn.textContent = "Upload Dataset";
    }
  }

  function displayResults(data) {
    const resultsCard = document.getElementById("resultsCard");
    const modelInfo = document.getElementById("modelInfo");
    const modelMetrics = document.getElementById("modelMetrics");

    console.log("API Response:", data); // Debugging: Check response format

    // Ensure the response contains expected properties
    const modelName = data.model_name || "Unknown Model";
    const trainingTime = data.time_taken ? data.time_taken.toFixed(2) : "N/A";
    const accuracy = data.performance_metrics.accuracy
      ? data.performance_metrics.accuracy.toFixed(4)
      : "N/A";

    // Display model info
    modelInfo.innerHTML = `
    <h3>Model Information</h3>
    <p>Model Type: ${modelName}</p>
    <p>Training Time: ${trainingTime} seconds</p>
  `;

    // Display model metrics
    modelMetrics.innerHTML = `
    <h3>Model Metrics</h3>
    <p>Accuracy: ${accuracy}</p>
  `;

    // Show the results card
    resultsCard.style.display = "block";
    resultsCard.scrollIntoView({ behavior: "smooth" });
  }

  // GSAP Animations
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
