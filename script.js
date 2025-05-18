// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle")
  const navLinks = document.querySelector(".nav-links")

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")

    // Animate hamburger menu
    const spans = navToggle.querySelectorAll("span")
    spans.forEach((span) => span.classList.toggle("active"))
  })

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")

        // Reset hamburger menu
        const spans = navToggle.querySelectorAll("span")
        spans.forEach((span) => span.classList.remove("active"))
      }
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Calculate navbar height for offset
        const navbarHeight = document.getElementById("navbar").offsetHeight

        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar scroll effect
  const navbar = document.getElementById("navbar")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)"
    }

    // Update navbar style based on scroll position
    if (scrollTop > 100) {
      navbar.style.padding = "10px 0"
      navbar.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.padding = "15px 0"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }

    lastScrollTop = scrollTop
  })

  // Form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple form validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For this demo, we'll just show a success message
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`)

      // Reset form
      contactForm.reset()
    })
  }

  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""
    const navbarHeight = document.getElementById("navbar").offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 100
      const sectionHeight = section.offsetHeight

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  })

  // Add animation to skill bars
  const skillBars = document.querySelectorAll(".skill-level")

  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Function to animate skill bars when they come into view
  function animateSkillBars() {
    skillBars.forEach((bar) => {
      if (isInViewport(bar)) {
        bar.style.width = bar.style.width || "0%"
        bar.style.transition = "width 1.5s ease-in-out"
      }
    })
  }

  // Initial check and add scroll event listener
  animateSkillBars()
  window.addEventListener("scroll", animateSkillBars)
})
