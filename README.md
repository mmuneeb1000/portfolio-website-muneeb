# Portfolio — React + Express + Node.js

Terminal-style developer portfolio with a React frontend and Express API backend.

## Project Structure

```
portfolio/
├── server/
│   └── index.js          # Express API (port 5000)
├── client/
│   ├── index.html
│   ├── vite.config.js    # Proxies /api → Express
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles/
│       │   └── global.css
│       └── components/
│           ├── Navbar.jsx
│           ├── Hero.jsx      # Typewriter terminal animation
│           ├── Projects.jsx  # ls -la style listing
│           ├── Blog.jsx
│           ├── Contact.jsx   # POSTs to /api/contact
│           └── Footer.jsx
└── package.json              # Root scripts
```

## API Endpoints

| Method | Route           | Description                  |
|--------|-----------------|------------------------------|
| GET    | /api/projects   | Returns project list         |
| GET    | /api/posts      | Returns blog posts           |
| POST   | /api/contact    | Accepts contact form payload |
| GET    | /api/health     | Server health check          |

## Getting Started

### 1. Install dependencies

```bash
# Install root + client deps
npm run install:all
```

Or manually:
```bash
npm install           # root (Express, cors)
cd client && npm install  # React, Vite
```

### 2. Run in development

```bash
npm run dev
```

This starts both servers concurrently:
- **React** on http://localhost:3000
- **Express API** on http://localhost:5000

Vite proxies all `/api` requests to Express automatically.

### 3. Build for production

```bash
cd client && npm run build
```

Then serve the `client/dist` folder with Express by adding:

```js
app.use(express.static(path.join(__dirname, "../client/dist")));
```

## Customization

1. **Your info** — update the `lines` array in `Hero.jsx`
2. **Projects** — edit the `projects` array in `server/index.js`
3. **Blog posts** — edit the `posts` array in `server/index.js`
4. **Links** — update github/linkedin/twitter hrefs in `Contact.jsx` and `Navbar.jsx`
5. **Colors** — all CSS variables are in `src/styles/global.css`
