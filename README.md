# Portify

Portify is a client-side portfolio builder — a small static web app that helps create and preview personal portfolio pages.

Files of interest
- `index.html` — main entry / landing page
- `dashboard.html`, `preview.html`, `signup.html`, `login.html` — app pages
- `css/` and `js/` — styles and client-side scripts
- `templates/` and `js/templates/` — prebuilt templates and styles

Quick start

1. Open the project in your browser by opening `index.html` directly, or run a simple local server for full functionality:

```bash
# from the repository root
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Development notes
- This is a static site — no build step is required. The app relies on client-side JavaScript and localStorage.
- If you want a live-reload development experience, consider installing an editor extension (Live Server) or using a small Node tool such as `live-server`.

License

This project is licensed under the MIT License — see `LICENSE` for details.

Contributing

Small improvements, bugfixes, or updated templates are welcome. Open a pull request with a short description of the change.

Enjoy!
