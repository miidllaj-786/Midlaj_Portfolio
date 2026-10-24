/**
 * ====================================================================
 * PORTFOLIO CONFIGURATION - MUHAMMED MIDLAJ P
 * ====================================================================
 * This file contains user configurations and credentials for external
 * services such as EmailJS for the contact form.
 *
 * HOW TO CONFIGURE EMAILJS (Free & takes 2 minutes):
 * 1. Go to https://www.emailjs.com and create a free account.
 * 2. Add an Email Service (e.g. Gmail) in the EmailJS dashboard.
 *    -> Copy your Service ID and paste it in `SERVICE_ID` below.
 * 3. Create an Email Template:
 *    -> Set Subject: "New Portfolio Message from {{from_name}}"
 *    -> Set Content to include:
 *       Name: {{from_name}}
 *       Email: {{from_email}}
 *       Message: {{message}}
 *    -> Set "Reply To" field in the template settings to: {{from_email}}
 *    -> Copy your Template ID and paste it in `TEMPLATE_ID` below.
 * 4. Go to Account > API Keys:
 *    -> Copy your Public Key and paste it in `PUBLIC_KEY` below.
 * 5. Update your personal details below (email, LinkedIn, GitHub URLs).
 * ====================================================================
 */

const PORTFOLIO_CONFIG = {
  // Personal & Social Links (Update these with your real URLs)
  personal: {
    name: "Muhammed Midlaj P",
    title: "Flutter Development Intern",
    company: "Bridgeon Solution",
    education: "Higher Secondary Education in Journalism at GHSS Edakkara",
    emailPlaceholder: "parammalmuhammadmidlaj@gmail.com", // Your official email address
    linkedinPlaceholder: "https://www.linkedin.com/in/muhammed-midlaj-parammal-b1b176418", // Your official LinkedIn profile URL
    githubPlaceholder: "https://github.com/miidllaj-786", // Your official GitHub profile URL
    cvPath: "assets/cv.pdf" // Place your CV pdf at assets/cv.pdf
  },

  // EmailJS Configuration
  // Keep as 'YOUR_...' until you create your free account at emailjs.com
  emailjs: {
    SERVICE_ID: "service_5qbxapi",
    TEMPLATE_ID: "template_cwjz9js",
    PUBLIC_KEY: "OFIbsPJv7faTPA7oX",
    // Helper flag to verify if user has replaced the default placeholders
    isConfigured: function() {
  return (
    this.SERVICE_ID !== "YOUR_SERVICE_ID" &&
    this.TEMPLATE_ID !== "YOUR_TEMPLATE_ID" &&
    this.PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
    this.SERVICE_ID.trim().length > 0 &&
    this.TEMPLATE_ID.trim().length > 0 &&
    this.PUBLIC_KEY.trim().length > 0
  );
}
  }
};

// Export configuration for browser environment
if (typeof window !== "undefined") {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
