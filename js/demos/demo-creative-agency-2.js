/*
Name:           Demo Creative Agency 2
Written by:     Okler Themes - (http://www.okler.net)
Theme Version:  10.2.0
*/

(function ($) {
  "use strict";

  $(window).on("load", function () {
    setTimeout(function () {
      $(".custom-hero-bg").addClass("loaded");
    }, 500);
  });
}).apply(this, [jQuery]);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    window.scrollTo({
      top: target.offsetTop, // Adjust this value based on your header height
      behavior: "smooth",
    });
  });
});

function scrollToDiv(divId, offset = 0) {
  const element = document.querySelector(divId);
  const elementPosition =
    element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

document.querySelector("form").addEventListener("submit", function (e) {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    e.preventDefault(); // Prevent form from submitting
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = {
    home: document.querySelector("#home"),
    aboutus: document.querySelector("#aboutus"),
    services: document.querySelector("#services"),
    talkus: document.querySelector("#talkus"), // Added the "Talk Us" section
  };
  let lastActiveLink = null;

  // Function to remove 'active' class from all links
  function removeActiveClasses() {
    navLinks.forEach((nav) => nav.classList.remove("active"));
  }

  // Function to add 'active' class to a specific link
  function setActiveLink(sectionId) {
    removeActiveClasses();
    const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (link) {
      link.classList.add("active");
      lastActiveLink = link;
    }
  }

  // Click event to manually set active link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      removeActiveClasses();
      this.classList.add("active");
      lastActiveLink = this;
    });
  });

  // Scroll event to dynamically set active link based on scroll position
  window.addEventListener("scroll", function () {
    let currentSection = "";
    let anySectionVisible = false;

    Object.keys(sections).forEach((sectionId) => {
      const section = sections[sectionId];
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight - 100;

        if (
          window.pageYOffset >= sectionTop - sectionHeight / 3 &&
          window.pageYOffset < sectionTop + sectionHeight
        ) {
          if (sectionId === "talkus") {
            currentSection = "aboutus"; // Set "About Us" link active when "Talk Us" section is in view
          } else {
            currentSection = sectionId;
          }
          anySectionVisible = true;
        }
      }
    });

    if (anySectionVisible) {
      setActiveLink(currentSection);
    } else if (lastActiveLink) {
      // Keep the last clicked link active if no section is visible
      removeActiveClasses();
      lastActiveLink.classList.add("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Define the top offset in pixels

  // Get the query parameter from the URL
  const params = new URLSearchParams(window.location.search);
  const sectionId = params.get("scrollTo");

  const offset = ["home", "aboutus", "services"].includes(sectionId) ? 0 : 120;

  // If the parameter exists, scroll to the section
  if (sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop =
        section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: sectionTop - offset,
        behavior: "smooth",
      });
    }
    // Optionally, remove the parameter from the URL after scrolling
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
