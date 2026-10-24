/**
 * ==========================================================================
 * MUHAMMED MIDLAJ P - PORTFOLIO INTERACTION CONTROLLER
 * Vanilla JavaScript | Modern, Responsive, Accessible
 * ==========================================================================
 */

(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. DOM ELEMENT REFERENCES
  // ------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navMenu = document.getElementById('nav-menu');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navCloseBtn = document.getElementById('nav-close-btn');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('theme-toggle');
  const floatingBackToTop = document.getElementById('floatingBackToTop');
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  const cvModalOverlay = document.getElementById('cvModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const profileImage = document.getElementById('profileImage');
  const initialsFallback = document.getElementById('initialsFallback');

  // Contact Form Elements
  const contactForm = document.getElementById('contactForm');
  const userNameInput = document.getElementById('userName');
  const userEmailInput = document.getElementById('userEmail');
  const userSubjectInput = document.getElementById('userSubject');
  const userMessageInput = document.getElementById('userMessage');
  const charCount = document.getElementById('charCount');
  const submitBtn = document.getElementById('submitBtn');
  const btnSpinner = document.getElementById('btnSpinner');
  const btnText = document.getElementById('btnText');
  const btnIcon = document.getElementById('btnIcon');
  const formStatusAlert = document.getElementById('formStatusAlert');
  const statusAlertIcon = document.getElementById('statusAlertIcon');
  const statusAlertContent = document.getElementById('statusAlertContent');

  // ------------------------------------------------------------------------
  // 2. THEME CONTROLLER (LIGHT GREEN DEFAULT / DARK MODE)
  // ------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'muhammed_portfolio_theme';

  function initTheme() {
    // Check saved preference or default to 'light' (as requested)
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }

  // ------------------------------------------------------------------------
  // 3. STICKY HEADER & FLOATING BACK-TO-TOP BUTTON
  // ------------------------------------------------------------------------
  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header blur/shadow on scroll
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Floating Back to Top visibility
    if (floatingBackToTop) {
      if (scrollY > 380) {
        floatingBackToTop.classList.add('visible');
      } else {
        floatingBackToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (floatingBackToTop) {
    floatingBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 4. MOBILE NAVIGATION DRAWER
  // ------------------------------------------------------------------------
  function openMobileMenu() {
    if (!navMenu) return;
    navMenu.classList.add('open');
    if (navOverlay) navOverlay.classList.add('active');
    if (hamburgerBtn) {
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeMobileMenu() {
    if (!navMenu) return;
    navMenu.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('active');
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu && navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (navCloseBtn) {
    navCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile drawer on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeCvModal();
    }
  });

  // ------------------------------------------------------------------------
  // 5. ACTIVE NAVIGATION LINK ON SCROLL (SCROLL SPY)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120; // Offset for navbar

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // Smooth scroll click handler for navigation links
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          closeMobileMenu();
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. ANIMATED SKILL PROGRESS BARS (TRIGGERED VIA INTERSECTION OBSERVER)
  // ------------------------------------------------------------------------
  const skillsSection = document.getElementById('skills');
  const progressFills = document.querySelectorAll('.progress-fill');
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;

    progressFills.forEach((fill) => {
      const targetProgress = fill.getAttribute('data-progress');
      if (targetProgress) {
        fill.style.width = `${targetProgress}%`;
      }
    });

    skillsAnimated = true;
  }

  if ('IntersectionObserver' in window && skillsSection) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkills();
          }
        });
      },
      { threshold: 0.25 }
    );

    skillsObserver.observe(skillsSection);
  } else {
    // Fallback for older browsers
    window.addEventListener('scroll', () => {
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          animateSkills();
        }
      }
    }, { passive: true });
  }

  // ------------------------------------------------------------------------
  // 7. PROFILE PHOTO GRACEFUL FALLBACK CHECK
  // ------------------------------------------------------------------------
  if (profileImage && initialsFallback) {
    // Pre-check if image is loaded or broken
    profileImage.addEventListener('error', () => {
      profileImage.style.display = 'none';
      initialsFallback.style.display = 'flex';
    });

    // If image has zero natural width after window load
    window.addEventListener('load', () => {
      if (!profileImage.complete || profileImage.naturalWidth === 0) {
        profileImage.style.display = 'none';
        initialsFallback.style.display = 'flex';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. CV DOWNLOAD MODAL & FILE DETECTION
  // ------------------------------------------------------------------------
  function openCvModal() {
    if (cvModalOverlay) {
      cvModalOverlay.classList.add('active');
      cvModalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCvModal() {
    if (cvModalOverlay) {
      cvModalOverlay.classList.remove('active');
      cvModalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cvPath = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.personal.cvPath) || 'assets/cv.pdf';

      // Check if real CV exists via HEAD fetch request
      fetch(cvPath, { method: 'HEAD' })
        .then((response) => {
          if (response.ok) {
            // Real file exists: trigger direct download
            const link = document.createElement('a');
            link.href = cvPath;
            link.download = 'Muhammed_Midlaj_P_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            // File not yet placed: show helpful instructions modal
            openCvModal();
          }
        })
        .catch(() => {
          // Local offline or fetch failure: open helpful modal
          openCvModal();
        });
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCvModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeCvModal);
  if (cvModalOverlay) {
    cvModalOverlay.addEventListener('click', (e) => {
      if (e.target === cvModalOverlay) closeCvModal();
    });
  }

  // ------------------------------------------------------------------------
  // 9. CONTACT FORM INTERACTIVE VALIDATION & EMAIL DELIVERY
  // ------------------------------------------------------------------------
  // Live Character Counter for Message Textarea
  if (userMessageInput && charCount) {
    userMessageInput.addEventListener('input', () => {
      const length = userMessageInput.value.length;
      charCount.textContent = `${length} / 500`;
      if (length >= 500) {
        charCount.style.color = '#EF4444';
      } else {
        charCount.style.color = '';
      }
    });
  }

  // Input Sanitizer to escape HTML entities
  function sanitizeInput(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Email Format Validator
  function isValidEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
  }

  // Field Validation Helper
  function validateField(inputElement, condition) {
    const formGroup = inputElement.closest('.form-group');
    if (!formGroup) return condition;

    if (condition) {
      formGroup.classList.remove('has-error');
      formGroup.classList.add('is-valid');
      return true;
    } else {
      formGroup.classList.remove('is-valid');
      formGroup.classList.add('has-error');
      return false;
    }
  }

  // Clear live validation states
  function clearValidationFeedback() {
    document.querySelectorAll('.form-group').forEach((group) => {
      group.classList.remove('has-error', 'is-valid');
    });
    if (formStatusAlert) {
      formStatusAlert.style.display = 'none';
      formStatusAlert.className = 'form-status-alert';
    }
  }

  // Display status banner inside form
  function showFormStatus(type, messageHtml) {
    if (!formStatusAlert || !statusAlertIcon || !statusAlertContent) return;

    formStatusAlert.className = 'form-status-alert';
    formStatusAlert.style.display = 'flex';

    if (type === 'success') {
      formStatusAlert.classList.add('status-alert-success');
      statusAlertIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    } else if (type === 'error') {
      formStatusAlert.classList.add('status-alert-error');
      statusAlertIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    } else {
      formStatusAlert.classList.add('status-alert-info');
      statusAlertIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    }

    statusAlertContent.innerHTML = messageHtml;
    formStatusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Set Loading State
  function setSubmittingState(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;

    if (isLoading) {
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
      if (btnIcon) btnIcon.style.display = 'none';
      if (btnText) btnText.textContent = 'Sending Message...';
    } else {
      if (btnSpinner) btnSpinner.style.display = 'none';
      if (btnIcon) btnIcon.style.display = 'inline-block';
      if (btnText) btnText.textContent = 'Send Message';
    }
  }

  // Handle Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameVal = userNameInput.value.trim();
      const emailVal = userEmailInput.value.trim();
      const subjectVal = userSubjectInput.value.trim() || 'Portfolio Inquiry';
      const messageVal = userMessageInput.value.trim();

      // Step 1: Validate Fields
      const isNameValid = validateField(userNameInput, nameVal.length >= 2);
      const isEmailValid = validateField(userEmailInput, isValidEmail(emailVal));
      const isMessageValid = validateField(userMessageInput, messageVal.length >= 10);

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        showFormStatus(
          'error',
          '<p><strong>Please check the highlighted fields:</strong> Make sure your name is at least 2 characters, your email is valid, and your message has at least 10 characters.</p>'
        );
        return;
      }

      // Step 2: Prevent duplicate submissions and show loading
      setSubmittingState(true);

      const safeName = sanitizeInput(nameVal);
      const safeEmail = sanitizeInput(emailVal);
      const safeSubject = sanitizeInput(subjectVal);
      const safeMessage = sanitizeInput(messageVal);

      // Step 3: Check EmailJS configuration status
      const emailConfig = window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.emailjs : null;
      const isConfigured = emailConfig && typeof emailConfig.isConfigured === 'function' && emailConfig.isConfigured();

      if (!isConfigured) {
        // Honest, professional fallback notice (DO NOT pretend email was sent when keys are placeholder)
        setTimeout(() => {
          setSubmittingState(false);
          const destEmail = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.personal && window.PORTFOLIO_CONFIG.personal.emailPlaceholder) || 'parammalmuhammadmidlaj@gmail.com';
          const mailtoFallback = `mailto:${destEmail}?subject=${encodeURIComponent(safeSubject)}&body=${encodeURIComponent("From: " + safeName + " (" + safeEmail + ")\n\n" + safeMessage)}`;

          showFormStatus(
            'info',
            `<p><strong>Form Ready &amp; Validated!</strong></p>
             <p>The form inputs are valid. However, live EmailJS delivery credentials have not been configured yet in <code>js/config.js</code>.</p>
             <p style="margin-top: 8px;">
               To receive real messages in your personal email, follow the 2-minute setup in the <strong>README.md</strong>.
             </p>
             <div style="margin-top: 12px;">
               <a href="${mailtoFallback}" class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.85rem; display: inline-flex;">
                 <i class="fa-solid fa-arrow-up-right-from-square"></i> Open in Mail Client
               </a>
             </div>`
          );
        }, 600);
        return;
      }

      // Step 4: Live Delivery via EmailJS
      try {
        if (typeof emailjs === 'undefined') {
          throw new Error('EmailJS SDK failed to load. Please check your internet connection.');
        }

        emailjs.init({
          publicKey: emailConfig.PUBLIC_KEY
        });

        const templateParams = {
          from_name: safeName,
          from_email: safeEmail,
          reply_to: safeEmail,
          subject: safeSubject,
          message: safeMessage
        };

        const response = await emailjs.send(
          emailConfig.SERVICE_ID,
          emailConfig.TEMPLATE_ID,
          templateParams
        );

        if (response.status === 200) {
          setSubmittingState(false);
          contactForm.reset();
          if (charCount) charCount.textContent = '0 / 500';
          clearValidationFeedback();

          showFormStatus(
            'success',
            `<p><strong>Thank you, ${safeName}!</strong></p>
             <p>Your message has been delivered to Muhammed Midlaj P. You will receive a reply to <em>${safeEmail}</em> soon.</p>`
          );
        } else {
          throw new Error(`EmailJS responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Email delivery error:', error);
        setSubmittingState(false);
        showFormStatus(
          'error',
          `<p><strong>Unable to send message:</strong> ${sanitizeInput(error.message || 'An unexpected error occurred.')}</p>
           <p>Please try again later or reach out directly via LinkedIn or email.</p>`
        );
      }
    });

    // Clear validation styling when user starts typing again
    [userNameInput, userEmailInput, userMessageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group && group.classList.contains('has-error')) {
            group.classList.remove('has-error');
          }
        });
      }
    });
  }

  // ------------------------------------------------------------------------
  // 10. LIGHTWEIGHT SCROLL FADE-IN OBSERVER
  // ------------------------------------------------------------------------
  const animatedElements = document.querySelectorAll('[data-aos]');

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            animationObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    animatedElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      const delay = el.getAttribute('data-aos-delay');
      if (delay) {
        el.style.transitionDelay = `${parseInt(delay, 10) / 1000}s`;
      }
      animationObserver.observe(el);
    });
  }

  // ------------------------------------------------------------------------
  // 11. INITIALIZATION ON DOM READY
  // ------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    handleScroll();
    updateActiveNavLink();
  });

})();
