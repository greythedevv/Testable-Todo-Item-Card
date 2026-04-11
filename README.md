# 📝 HNG Todo Card — Frontend Wizards Stage 0

A clean, modern, accessible, and fully testable **Todo Item Card** built with **React 19**, **Vite 8**, and **Tailwind CSS v4**. This project was built as part of the **Frontend Wizards Stage 0 Task** for HNG.

---

## 📸 Preview

> A single polished todo card with priority badge, time remaining countdown, status indicator, tags, and action buttons — all keyboard-navigable and screen-reader accessible.

---

## 🚀 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev/) | ^19.2.4 | UI Component Library |
| [Vite](https://vitejs.dev/) | ^8.0.4 | Build Tool & Dev Server |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.2.2 | Utility-First Styling |
| [@tailwindcss/postcss](https://tailwindcss.com/docs/installation/using-postcss) | ^4.2.2 | PostCSS Integration for Tailwind v4 |
| [PostCSS](https://postcss.org/) | ^8.5.9 | CSS Processing |
| [Autoprefixer](https://github.com/postcss/autoprefixer) | ^10.4.27 | CSS Vendor Prefixing |
| [ESLint](https://eslint.org/) | ^9.39.4 | Code Linting |

---

## 📁 Project Structure

```
HNG-TODO-CARD/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   └── TodoCard.jsx        # Main Todo Card component
│   ├── App.css                 # Tailwind v4 CSS entry point
│   ├── App.jsx                 # Root App component
│   └── main.jsx                # React entry point
├── .eslintrc.js
├── index.html
├── package.json
├── postcss.config.js           # PostCSS config for Tailwind v4
└── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — **v18 or higher** recommended
- [npm](https://www.npmjs.com/) — comes with Node.js

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/HNG-TODO-CARD.git
cd HNG-TODO-CARD
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Start the Development Server

```bash
npm run dev
```

The app will run at **http://localhost:5173** by default.

---

### 4. Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready for deployment.

---

### 5. Preview the Production Build Locally

```bash
npm run preview
```

---

## 🎨 Tailwind CSS v4 Setup

> ⚠️ This project uses **Tailwind CSS v4**, which has a different setup from v3. Do **not** use the old `@tailwind base/components/utilities` directives.

### `src/App.css`

```css
@import "tailwindcss";
```

### `postcss.config.js`

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### `src/main.jsx`

```jsx
import "./App.css"; // Must import the CSS here
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

> Tailwind v4 does **not** require a `tailwind.config.js` file. Content scanning is handled automatically.

---

## 🧩 Component Overview — `TodoCard.jsx`

Located at `src/components/TodoCard.jsx`, this is the core component of the project.

### Features

| Feature | Details |
|---------|---------|
| **Task Title** | Displays the task name; gets a strikethrough when completed |
| **Priority Badge** | Shows `High`, `Medium`, or `Low` with colour-coded styling |
| **Description** | A short summary of the task |
| **Due Date** | Rendered with a semantic `<time>` element and `dateTime` attribute |
| **Time Remaining** | Live-calculated countdown — "Due in 4 days", "Due tomorrow", "Overdue by 2 days", etc. Updates every 60 seconds |
| **Status Indicator** | Shows `Pending` or `Done`, updated when checkbox is toggled |
| **Checkbox Toggle** | Real `<input type="checkbox">` inside a `<label>` — fully keyboard accessible |
| **Tags** | Three tags (`work`, `urgent`, `design`) rendered as a `<ul role="list">` of pill-styled `<li>` elements |
| **Edit Button** | Logs `"edit clicked"` to the console |
| **Delete Button** | Triggers a browser `alert("Delete clicked")` |

---

### State

```jsx
const [completed, setCompleted] = useState(false); // Tracks checkbox state
const [status, setStatus] = useState("Pending");   // Tracks status label
const [timeRemaining, setTimeRemaining] = useState(""); // Countdown text
```

### Time Remaining Logic

```jsx
const dueDate = new Date("2026-04-16T18:00:00Z");

const updateTime = () => {
  const now = new Date();
  const diff = dueDate - now;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours   = Math.floor(diff / (1000 * 60 * 60));
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diff < 0)        text = `Overdue by ${Math.abs(days)} day(s)`;
  else if (days > 1)   text = `Due in ${days} days`;
  else if (days === 1) text = "Due tomorrow";
  else if (hours > 0)  text = `Due in ${hours} hours`;
  else if (minutes > 0)text = `Due in ${minutes} minutes`;
  else                 text = "Due now!";
};

useEffect(() => {
  updateTime();
  const interval = setInterval(updateTime, 60000); // Refresh every 60s
  return () => clearInterval(interval);
}, []);
```

---

## ✅ Required `data-testid` Attributes

All automated test IDs are implemented exactly as specified:

| Element | `data-testid` |
|---------|--------------|
| Card root container | `test-todo-card` |
| Task title | `test-todo-title` |
| Task description | `test-todo-description` |
| Priority badge | `test-todo-priority` |
| Due date | `test-todo-due-date` |
| Time remaining | `test-todo-time-remaining` |
| Status indicator | `test-todo-status` |
| Checkbox toggle | `test-todo-complete-toggle` |
| Tags list | `test-todo-tags` |
| "work" tag | `test-todo-tag-work` |
| "urgent" tag | `test-todo-tag-urgent` |
| "design" tag | `test-todo-tag-design` |
| Edit button | `test-todo-edit-button` |
| Delete button | `test-todo-delete-button` |

---

## ♿ Accessibility

This component is built with accessibility as a first-class concern:

- ✅ **Semantic HTML** — uses `<article>`, `<time>`, `<label>`, `<button>`, `<ul>`, `<li>`, `<p>`
- ✅ **Checkbox** — real `<input type="checkbox">` inside a `<label>`, with `aria-label="Mark task as completed"`
- ✅ **Priority badge** — has `aria-label="High priority"`
- ✅ **Live region** — time remaining wrapped in `aria-live="polite"` for screen reader announcements
- ✅ **Keyboard navigable** — Tab order: checkbox → Edit → Delete
- ✅ **Visible focus styles** — via Tailwind's default focus ring
- ✅ **WCAG AA colour contrast** — all text meets minimum contrast ratios
- ✅ **No icon-only buttons** — all buttons have visible text labels

---

## 📱 Responsiveness

| Viewport | Behaviour |
|----------|-----------|
| **Mobile (320px+)** | Full-width card, vertically stacked layout |
| **Tablet / Desktop (500px+)** | Comfortable `max-w-md` (448px) centered card |
| **Tags** | `flex flex-wrap` — pills wrap gracefully at any width |
| **No horizontal overflow** | Tested from 320px to 1200px |

---

## 🔬 Behaviour Summary

| Interaction | Result |
|-------------|--------|
| Check the checkbox | Title gets strikethrough, status changes to `Done` |
| Uncheck the checkbox | Title restores, status returns to `Pending` |
| Click **Edit** | `console.log("edit clicked")` fires |
| Click **Delete** | `alert("Delete clicked")` fires |
| Page load | Time remaining calculated immediately |
| Every 60 seconds | Time remaining automatically refreshes |

---

## 📦 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Start local development at `localhost:5173` |
| Build | `npm run build` | Bundle for production into `dist/` |
| Preview | `npm run preview` | Preview the production build locally |
| Lint | `npm run lint` | Run ESLint checks |

---

## 🌐 Deployment

This project can be deployed to any static hosting platform:

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages (using gh-pages)

```bash
npm install -D gh-pages
```

Add to `package.json` scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Then run:

```bash
npm run deploy
```

> Make sure to set `base` in `vite.config.js` to your repo name if deploying to GitHub Pages:
> ```js
> export default { base: "/HNG-TODO-CARD/" }
> ```

---

## 📋 Acceptance Criteria Checklist

- [x] All `data-testid` elements exist and are visible
- [x] Checkbox is focusable, togglable via keyboard, and screen-reader accessible
- [x] Time remaining shows a correct, human-readable value
- [x] Edit and Delete buttons are present and keyboard-focusable
- [x] Semantic HTML used correctly (`article`, `time`, `label`, `button`, `ul/li`)
- [x] Responsive layout from 320px to 1200px
- [x] No layout shift or horizontal overflow with long content
- [x] Priority and status are clearly displayed

---

## 👤 Author

**Greatness**
- GitHub: [@greythedevv](https://github.com/greythedevv)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
