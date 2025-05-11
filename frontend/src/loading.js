const headerText = `
<header>
    <nav class="navbar">
        <div class="logo">AutoML<span class="logo-accent">AI</span></div>
        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="upload.html">Upload Dataset</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="about.html#contact">Contact</a></li>
        </ul>
        <div class="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </nav>
</header>
`;

const footerText = `
<footer>
    <div class="footer-content">
        <div class="footer-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="about.html#contact">Contact Support</a>
        </div>
        <div class="social-links">
            <a href="#" target="_blank"><i class="fab fa-github"></i></a>
            <a href="#" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="mailto:admin@automl.com"><i class="fas fa-envelope"></i></a>
        </div>
        <p>&copy; 2025 AutoML<span class="footer-accent">AI</span> Project. All rights reserved.</p>
    </div>
</footer>
`;

// Load header and footer
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("header-container").innerHTML = headerText;
    document.getElementById("footer-container").innerHTML = footerText;
});
