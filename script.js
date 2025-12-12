document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo particle background
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 100;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.01;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].size <= 0.2) {
        particles.splice(i, 1);
        particles.push(new Particle());
      }
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // Hiệu ứng chữ chạy từ từ - Nội dung chính
  const animatedText = document.getElementById("animatedText");
  const mainText =
    "Chúc mẹ Ngọc của con thật nhiều sức khỏe và ngày càng xinh đẹp🎂";

  // Hiệu ứng chữ chạy từ từ - Nội dung phụ
  const subAnimatedText = document.getElementById("subAnimatedText");
  const subText = "Con yêu mẹ và cả gia đình ";

  let mainIndex = 0;
  let subIndex = 0;
  let isMainTextComplete = false;

  function typeWriterMain() {
    if (mainIndex < mainText.length) {
      animatedText.textContent += mainText.charAt(mainIndex);
      mainIndex++;
      setTimeout(typeWriterMain, 50); // Tốc độ gõ chữ chính: 50ms/ký tự
    } else {
      isMainTextComplete = true;
      // Bắt đầu hiệu ứng chữ phụ sau khi chữ chính hoàn thành
      setTimeout(typeWriterSub, 1000);
    }
  }

  function typeWriterSub() {
    if (subIndex < subText.length) {
      subAnimatedText.textContent += subText.charAt(subIndex);
      subIndex++;
      setTimeout(typeWriterSub, 40); // Tốc độ gõ chữ phụ: 40ms/ký tự
    }
  }

  // Bắt đầu hiệu ứng chữ chính sau 1 giây
  setTimeout(typeWriterMain, 1000);

  // Hiệu ứng di chuyển background theo chuột
  document.addEventListener("mousemove", (e) => {
    const video = document.querySelector(".video-bg");
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    video.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
  });

  // Xử lý resize window
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
