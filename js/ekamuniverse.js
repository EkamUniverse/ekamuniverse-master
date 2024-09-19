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

  let offsetPosition = elementPosition - offset;

  if (window.matchMedia("(max-width: 767px)").matches) {
    offsetPosition = elementPosition - (offset - 120); // Adjust 50 to your desired mobile offset
  } else {
    offsetPosition = elementPosition - offset;
  }

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

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Disable the button and show the circular loader
    var button = document.getElementById("submit-button");
    var buttonText = document.getElementById("button-text");
    var buttonLoader = document.getElementById("button-loader");

    button.disabled = true;
    buttonText.style.display = "none";
    buttonLoader.style.display = "inline-block";

    // Get form data
    const formData = new FormData(this);

    // Send the form data using fetch API
    fetch(
      "https://script.google.com/macros/s/AKfycbzUjnLSUYhdgPuAQ5o_xGiI9GQ6XNuSuoc1KLEz5vJyT3uqfmIVVot9lITmtllGCtnCsA/exec",
      {
        method: "post",
        body: formData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.text(); // Or response.json() if your script returns JSON
      })
      .then((data) => {
        // Show success modal popup
        showModal("Message sent successfully!", "success");

        // Clear form fields
        document.getElementById("contact-form").reset();
      })
      .catch((error) => {
        console.error("Error!", error.message);
        // Show error modal popup
        showModal("Something went wrong. Please try again.", "error");
      })
      .finally(() => {
        // Hide loader and enable button
        button.disabled = false;
        buttonText.style.display = "inline";
        buttonLoader.style.display = "none";
      });
  });

function showModal(message, type) {
  var modal = document.getElementById("status-modal");
  var modalMessage = document.getElementById("modal-message");

  modalMessage.textContent = message;
  modalMessage.className = type; // Apply success or error class

  modal.style.display = "block";

  // Close modal on click of close button or outside modal
  var closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
