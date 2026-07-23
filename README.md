# Portfolio

A personal developer portfolio built with React and Vite, featuring a clean terminal-inspired interface that reflects a command line environment. The project highlights my work, reusable UI components, technical skills, and provides a simple way for visitors to get in touch.

## Features

- Terminal-inspired responsive interface
- Project showcase with GitHub and live demo links
- Components library displaying reusable UI elements
- Smooth scrolling navigation
- Custom animated cursor
- Contact form powered by EmailJS
- Reusable React component architecture
- Built with modern React practices and hooks

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS v4
- EmailJS
- React Icons

## Project Structure

```
src/
├── components/
├── pages/
├── data/
├── assets/
├── hooks/
├── styles/
└── App.jsx
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/mmuneeb1000/portfolio.git
cd portfolio
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Contact Form

The contact form uses EmailJS to send emails directly from the client. Configure your EmailJS Service ID, Template ID, and Public Key in the `.env` file before running the project.

## Future Improvements

- Blog integration
- Internationalization
- Project filtering and search
- CMS integration
- Animations with Framer Motion

## License

This project is open source and available under the MIT License.
