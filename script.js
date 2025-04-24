document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]'); // Select sections with IDs in main
    const menuToggle = document.getElementById('menu-toggle'); // Placeholder for mobile menu
    const mainNav = document.getElementById('main-nav'); // Placeholder for mobile menu
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');


    // --- Sticky Header ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            // Check if it's an internal link
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                     // Close mobile menu if open (basic example)
                    if(mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                    }

                    // Update active link immediately (optional, scroll handler does it too)
                    // setActiveLink(targetId);
                }
            }
        });
    });

    // --- Active Navigation Link Highlighting on Scroll ---
    const setActiveLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: `-${header.offsetHeight}px 0px -40% 0px`, // Adjust top margin for sticky header, bottom margin to trigger earlier
        threshold: 0 // Trigger as soon as 1 pixel is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
             // entry.isIntersecting is true when target meets options threshold
            if (entry.isIntersecting) {
               setActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Scroll Animations ---
    const animationObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, animationObserverOptions);

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        animationObserver.observe(el);
    });

    // --- Basic Mobile Menu Toggle (Placeholder) ---
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // You'll need CSS rules for .main-nav.active
            // Example CSS:
            /*
            @media (max-width: 768px) {
                #main-nav {
                    display: none;
                    position: absolute;
                    top: 100%; // Below header
                    left: 0;
                    width: 100%;
                    background-color: rgba(255, 255, 255, 0.98);
                    flex-direction: column;
                    padding: 10px 0;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                }
                 #main-nav.active {
                    display: flex;
                }
                 #main-nav ul {
                    flex-direction: column;
                    width: 100%;
                }
                #main-nav li {
                    margin: 10px 0;
                    text-align: center;
                }
            }
            */
        });
    }

    // --- Basic Contact Form Handling (Prevents actual submission) ---
     if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop the default form submission
            formStatus.textContent = 'Sending... (Demo - No actual sending)';
            formStatus.style.color = 'var(--secondary-blue)';

            // Simulate network delay and success/error
            setTimeout(() => {
                 // In a real scenario, you would check the response from your server
                 const isSuccess = Math.random() > 0.2; // Simulate success most of the time

                 if(isSuccess) {
                    formStatus.textContent = 'Thank you! Your message has been received (Demo).';
                    formStatus.style.color = 'var(--earthy-green)';
                    contactForm.reset(); // Clear the form
                 } else {
                     formStatus.textContent = 'Oops! Something went wrong. Please try again later (Demo).';
                     formStatus.style.color = 'red';
                 }

                 // Clear the status message after a few seconds
                 setTimeout(() => { formStatus.textContent = ''; }, 5000);

            }, 1500);
        });
    }

});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.donate-form');

    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent form from reloading page

      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const amount = form.querySelector('input[type="number"]').value.trim();
      const cause = form.querySelector('select').value;

      if (!name || !email || !amount || !cause) {
        alert("Please fill in all required fields!");
        return;
      }

      // You can replace this with Firebase push
      console.log("Donation Details:");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Amount: ₹" + amount);
      console.log("Cause:", cause);

      // Optional: Reset the form after submission
      form.reset();

      // Show a thank-you message
      const container = document.querySelector('.donate-container');
      container.innerHTML = `
        <h2>Thank You, ${name}!</h2>
        <p>Your donation of ₹${amount} for <strong>${cause}</strong> has been received.</p>
        <p class="fade-in">You're helping keep the Ganga clean and sacred. 🌊🙏</p>
      `;
    });
  });