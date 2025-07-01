// Mobile Navigation
document.addEventListener("DOMContentLoaded", function () {
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", function () {
      mobileToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking on a link
    const navLinkItems = document.querySelectorAll(".nav-link");
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !mobileToggle.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        mobileToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }
});

// Smooth Scrolling for Internal Links
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight =
          document.querySelector(".modern-header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// Header Scroll Effect
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".modern-header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.backdropFilter = "blur(20px)";
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(20px)";
        header.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
      }
    });
  }
});

// Animate Elements on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".industry-card, .feature-card, .product-card, .testimonial-card, .process-step, .content-card, .trust-stat, .contact-method"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(element);
  });
}

// Counter Animation for Stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.textContent.replace(/[^\d]/g, ""));
          const suffix = counter.textContent.replace(/\d/g, "");
          let current = 0;
          const increment = target / 50;

          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.floor(current) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + suffix;
            }
          };

          updateCounter();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.name || !data.email || !data.phone || !data.message) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      submitBtn.classList.add("loading");

      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        showNotification(
          "Thank you for your inquiry! We will get back to you soon.",
          "success"
        );
        this.reset();

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove("loading");
      }, 2000);
    });
  }
});

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${getNotificationIcon(type)}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        font-family: var(--font-family);
        display: flex;
        align-items: center;
        gap: 12px;
    `;

  // Set colors based on type
  const colors = {
    success: { bg: "#10b981", text: "#ffffff" },
    error: { bg: "#ef4444", text: "#ffffff" },
    info: { bg: "#3b82f6", text: "#ffffff" },
    warning: { bg: "#f59e0b", text: "#ffffff" },
  };

  const color = colors[type] || colors.info;
  notification.style.backgroundColor = color.bg;
  notification.style.color = color.text;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.style.transform = "translateX(0)";
  });

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        opacity: 0.8;
    `;

  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    info: "fa-info-circle",
    warning: "fa-exclamation-triangle",
  };
  return icons[type] || icons.info;
}

// Loading Animation for Images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (!img.complete) {
      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease-out";

      img.addEventListener("load", function () {
        this.style.opacity = "1";
      });
    }
  });
});

// // Parallax Effect for Hero Sections
// function initParallax() {
//     const parallaxElements = document.querySelectorAll('.hero-background img');

//     window.addEventListener('scroll', () => {
//         const scrolled = window.pageYOffset;
//         const rate = scrolled * -0.5;

//         parallaxElements.forEach(element => {
//             element.style.transform = `translateY(${rate}px)`;
//         });
//     });
// }

// Back to Top Button
function createBackToTopButton() {
  const backToTop = document.createElement("button");
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.className = "back-to-top";
  backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-gold), var(--secondary-green));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 16px;
        box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3);
    `;

  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.opacity = "1";
      backToTop.style.visibility = "visible";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  backToTop.addEventListener("mouseenter", () => {
    backToTop.style.transform = "translateY(-2px) scale(1.05)";
    backToTop.style.boxShadow = "0 6px 20px rgba(255, 193, 7, 0.4)";
  });

  backToTop.addEventListener("mouseleave", () => {
    backToTop.style.transform = "translateY(0) scale(1)";
    backToTop.style.boxShadow = "0 4px 12px rgba(255, 193, 7, 0.3)";
  });
}

// Typing Effect for Hero Title
function initTypingEffect() {
  const typingElements = document.querySelectorAll("[data-typing]");

  typingElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = "";
    element.style.borderRight = "2px solid var(--primary-gold)";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        element.style.borderRight = "none";
      }
    };

    // Start typing when element comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 500);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(element);
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  animateOnScroll();
  animateCounters();
  createBackToTopButton();
  initParallax();
  initTypingEffect();
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Any additional scroll handling can go here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Preload critical images
function preloadImages() {
  const criticalImages = [
    "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize preloading
preloadImages();

// Add smooth reveal animations for sections
function initSectionAnimations() {
  const sections = document.querySelectorAll("section");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    sectionObserver.observe(section);
  });

  // Add CSS for visible sections
  const style = document.createElement("style");
  style.textContent = `
        .section-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);
}

// Initialize section animations
document.addEventListener("DOMContentLoaded", initSectionAnimations);

// Add interactive hover effects for cards
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(
    ".industry-card, .feature-card, .product-card, .testimonial-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Add loading states for buttons
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.classList.contains("loading")) {
        e.preventDefault();
        return;
      }

      // Add loading state for external links
      if (
        this.href &&
        !this.href.includes("#") &&
        !this.href.includes(window.location.hostname)
      ) {
        this.classList.add("loading");
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

        setTimeout(() => {
          this.innerHTML = originalText;
          this.classList.remove("loading");
        }, 1000);
      }
    });
  });
});
