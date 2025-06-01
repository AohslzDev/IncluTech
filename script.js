document.addEventListener("DOMContentLoaded", function () {
    console.log("IncluTech website loaded successfully");

    // Navigation active state management
    updateActiveNavLink();

    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });
});

// Navigation active state management
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}
const background = document.getElementById("background");

document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const glowX = 40 + x * 40;
    const glowY = 40 + y * 40;

    background.style.background = `
    radial-gradient(circle at ${glowX}% ${glowY}%,rgb(255, 255, 255), transparent 90%)
    `;
});

const slides = document.querySelectorAll('.carousel-slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let current = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

next.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
});

prev.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
});

// (Opcional) Auto slide
// setInterval(() => {
//     next.click();
// }, 5000);
