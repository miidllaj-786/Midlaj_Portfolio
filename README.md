# Muhammed Midlaj P — Personal Developer Portfolio

A modern, responsive, and interactive developer portfolio website built for **Muhammed Midlaj P**, Flutter Development Intern at Bridgeon Solution.

Designed with a signature **Light Green Theme** (`#9BEF62` / `#164500`), smooth animations, dark/light theme switching, animated skill bars, graceful fallbacks, and a fully functional EmailJS contact form.

---

## 🌟 Features

- **Light Green Modern Theme**: Tailored color palette featuring `#9BEF62` (light green), `#164500` (deep forest green), and `#F5FAF1` (soft mint background).
- **Clean Dark / Light Mode**: Seamless theme toggle persisting preference in `localStorage`.
- **Hero / Home Section**:
  - Live status badge: *"Currently Learning Hive"*.
  - Professional title: *"Flutter Development Intern"*.
  - Profile image with glowing frame, subtle floating animation, and orbiting technology badges (HTML5, CSS3, JavaScript, Dart, Flutter).
  - Elegant monogram fallback ("MM") if the photo is missing.
  - Interactive *"Explore My Work"* and *"Contact Me"* buttons.
  - Animated scroll-down mouse indicator.
- **About Me Section**:
  - Personal narrative describing background, education in Journalism at GHSS Edakkara, and development internship at Bridgeon Solution.
  - 8 organized personal info cards with distinct icons.
  - "Download CV" button with smart fallback modal instructions.
- **Skills Section**:
  - 6 technology cards with exact proficiency metrics:
    1. HTML — 80%
    2. CSS — 80%
    3. JavaScript — 50%
    4. Dart — 90% (Core Technology badge)
    5. Flutter — 90% (Core Technology badge)
    6. Hive — 30% (Currently Learning badge)
  - Horizontal progress bars animated via `IntersectionObserver` when scrolled into view.
- **Projects Section**:
  - Intentional, polished empty-state design with terminal artwork and *"Projects Coming Soon!"* messaging.
  - No fake projects shown.
  - Ready-to-use commented template for adding real projects in the future.
- **Contact Section & Working Form**:
  - Two-column layout with contact channels and placeholders.
  - Full Name, Email Address, and Message fields with live validation.
  - Character counter for messages.
  - Loading spinner & double-submission prevention.
  - Integrated EmailJS configuration with setup mode detection and client fallback.
- **Professional Footer**:
  - Quick navigation links, social placeholders, copyright, and smooth back-to-top button.
- **100% Responsive & Accessible**:
  - Mobile hamburger drawer navigation.
  - WCAG-compliant color contrast, focus indicators, and semantic HTML5 tags.

---

## 📁 Project Structure

```text
c:\Portfolio\
│
├── index.html            # Main semantic HTML5 markup containing all 5 sections
├── css/
│   └── style.css         # Modern styling, theme custom properties, animations & responsive queries
├── js/
│   ├── config.js         # Configuration file for EmailJS credentials and personal details
│   └── script.js         # Vanilla JS interactivity: navigation, theme, animations, form validation
├── assets/
│   ├── images/
│   │   └── profile.jpg   # Profile photograph (with automatic MM monogram fallback)
│   └── cv.pdf            # (Optional) Place your CV here for 1-click download
├── .gitignore            # Git ignore rules for system and build files
└── README.md             # Complete documentation and setup guide
```

---

## 🚀 How to Run Locally

### Option 1: Using VS Code & Live Server (Recommended)
1. Open **Visual Studio Code**.
2. Open the portfolio folder: `File` -> `Open Folder...` -> Select `c:\Portfolio`.
3. If you haven't already, install the **Live Server** extension by *Ritwick Dey*:
   - Press `Ctrl + Shift + X` to open the Extensions view.
   - Search for **Live Server** and click **Install**.
4. In the VS Code file explorer, right-click on `index.html`.
5. Select **"Open with Live Server"** (or click **Go Live** in the bottom status bar).
6. The portfolio will automatically open in your default browser at `http://127.0.0.1:5500/index.html`.

### Option 2: Direct File Open
You can also directly double-click `index.html` in Windows File Explorer or open it in any modern browser (Chrome, Edge, Firefox, Brave, Safari).

---

## 📸 How to Add Your Profile Picture

1. Prepare your photo in `.jpg` or `.png` format (a square 400x400 px or 600x600 px headshot works best).
2. Rename your file to `profile.jpg`.
3. Copy and paste it into the `assets/images/` directory, replacing the placeholder file:
   ```text
   c:\Portfolio\assets\images\profile.jpg
   ```
4. Refresh your browser. Your photo will immediately appear inside the glowing light green frame!
> **Note:** If the image is removed or missing, the website automatically falls back to a stylish initials avatar ("MM") with zero broken icons.

---

## 📄 How to Add Your CV / Resume

1. Export your resume/CV as a PDF.
2. Name the file `cv.pdf`.
3. Place it inside the `assets/` folder:
   ```text
   c:\Portfolio\assets\cv.pdf
   ```
4. Now, whenever a recruiter clicks the **"Download CV"** button in the About section, your PDF will download automatically.

---

## 📬 How to Configure the Contact Form (EmailJS)

The contact form is pre-wired to send messages straight to your personal email inbox using **EmailJS** (free tier includes 200 emails/month).

### Step 1: Create an EmailJS Account
1. Visit [https://www.emailjs.com](https://www.emailjs.com) and click **Sign Up Free**.

### Step 2: Add an Email Service
1. In the EmailJS Dashboard, navigate to **Email Services** -> **Add New Service**.
2. Select your email provider (e.g., **Gmail**).
3. Connect your account and click **Create Service**.
4. Copy your **Service ID** (e.g., `service_abc123`).

### Step 3: Create an Email Template
1. In the Dashboard, go to **Email Templates** -> **Create New Template**.
2. Configure the template fields:
   - **Subject**: `New Portfolio Message from {{from_name}}`
   - **Content**:
     ```text
     You received a new message from your portfolio website:

     Name: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}

     Message:
     {{message}}
     ```
   - In the **Settings** tab of the template, set **Reply To** to `{{from_email}}` so you can reply directly to the sender.
3. Click **Save** and copy your **Template ID** (e.g., `template_xyz456`).

### Step 4: Get Your Public Key
1. Go to **Account** -> **API Keys**.
2. Copy your **Public Key** (e.g., `user_789abc...`).

### Step 5: Paste Credentials into `js/config.js`
Open `c:\Portfolio\js\config.js` and paste your keys:

```javascript
const PORTFOLIO_CONFIG = {
  personal: {
    name: "Muhammed Midlaj P",
    title: "Flutter Development Intern",
    company: "Bridgeon Solution",
    education: "Higher Secondary Education in Journalism at GHSS Edakkara",
    emailPlaceholder: "your.real.email@gmail.com",
    linkedinPlaceholder: "https://linkedin.com/in/your-profile",
    githubPlaceholder: "https://github.com/your-username",
    cvPath: "assets/cv.pdf"
  },

  emailjs: {
    SERVICE_ID: "service_abc123",    // <-- Replace with your Service ID
    TEMPLATE_ID: "template_xyz456",  // <-- Replace with your Template ID
    PUBLIC_KEY: "your_public_key",   // <-- Replace with your Public Key
    ...
  }
};
```

Save the file and refresh your browser. All contact form submissions will now be delivered directly to your email inbox!

---

## 🛠️ How to Add Projects in the Future

When you are ready to showcase your Flutter mobile apps or web projects:

1. Open `index.html`.
2. Locate the `<section id="projects">` section.
3. You will find a commented-out template `<article class="project-card">`:
   ```html
   <article class="project-card">
     <div class="project-image-box">
       <img src="assets/images/project-1.jpg" alt="App Screenshot" class="project-img">
     </div>
     <div class="project-content">
       <div class="project-tags">
         <span class="tag">Flutter</span>
         <span class="tag">Dart</span>
         <span class="tag">Hive</span>
       </div>
       <h3 class="project-title">My Mobile App Name</h3>
       <p class="project-description">
         A brief description of the features and problems solved.
       </p>
       <div class="project-footer">
         <a href="https://github.com/your-username/repo" target="_blank">Source Code</a>
         <a href="https://your-demo-url.com" target="_blank">Live Demo</a>
       </div>
     </div>
   </article>
   ```
4. Uncomment the block, add your project image to `assets/images/`, and customize the details.

---

## 📄 License & Attribution

Designed and developed for **Muhammed Midlaj P**.
&copy; 2026 Muhammed Midlaj P. All rights reserved.
Built with HTML5, CSS3, and Vanilla JavaScript.
