const changingDigit = document.getElementById("changing-digit");
const newDigit = document.getElementById("new-digit");
const celebrationText = document.querySelector(".celebration-text");
const canvas = document.querySelector(".fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor(x, y, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.size = Math.random() * 4 + 1;
        this.opacity = 1;
        this.life = Math.random() * 100 + 50;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;
        this.life--;
    }
}

function createFirework(x, y) {
    const colors = ["#ff4500", "#ff6347", "#ffa500", "#ffff00"];
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        const speedX = Math.cos(angle) * speed;
        const speedY = Math.sin(angle) * speed;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, speedX, speedY));
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0 || particle.opacity <= 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animateFireworks);
}

function launchFireworks() {
    setInterval(() => {
        createFirework(
            Math.random() * canvas.width,
            Math.random() * canvas.height / 2
        );
    }, 500);
}

// Start the transition animation
function transitionYear() {
    // Fade out the "4"
    changingDigit.addEventListener("animationend", () => {
        changingDigit.style.display = "none";
        newDigit.classList.add("visible");
    });

    // Launch fireworks and show celebration text
    setTimeout(() => {
        celebrationText.style.opacity = "1";
    }, 3500);
}

// Start everything
animateFireworks();
launchFireworks();
transitionYear();
