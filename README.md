# Portify

Portify is a client-side portfolio builder — a small static web app that helps create and preview personal portfolio pages.

Files of interest
- `index.html` — main entry / landing page
- `dashboard.html`, `preview.html`, `signup.html`, `login.html` — app pages
- `css/` and `js/` — styles and client-side scripts
- `templates/` and `js/templates/` — prebuilt templates and styles

1. **AI-Powered Generation**: Create a full professional portfolio in seconds using Google Gemini 1.5 Flash.
2. **Professional PDF Export**: High-DPI (2x scale), multi-page PDF generation with optimized print layouts.
3. **Standalone HTML Download**: Export your portfolio as a single, self-contained website file.
4. **9+ Professional Sections**: Full support for Projects, Experience, Skills, Certifications, and more.
5. **Aetherium Template**: Immersive cosmic design with glassmorphism and real-time theme toggles.

## Quick Start

1. **Configure Environment**: Create a `.env` file in the root and add your `GEMINI_API_KEY`.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Server**:
   ```bash
   node server.js
   ```
4. **Access the App**: Open `http://localhost:5001/form.html` in your browser.

## Tech Stack
- **Frontend**: Vanilla JS, HTML5, CSS3 (Glassmorphism), Iconify.
- **Backend**: Node.js, Express, Google Generative AI SDK (@google/generative-ai).
- **Export**: html2canvas, jsPDF.

License

This project is licensed under the MIT License — see `LICENSE` for details.

Contributing

Small improvements, bugfixes, or updated templates are welcome. Open a pull request with a short description of the change.

Enjoy!
