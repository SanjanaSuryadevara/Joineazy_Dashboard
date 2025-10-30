# Joineazy – Assignment & Review Dashboard (Frontend)

A clean, responsive React + Tailwind dashboard that supports **role-based** views:

- **Students**: See their assignments and confirm submission using a **double-verification** flow ("Yes, I have submitted" → Final confirmation).
- **Admins (Professors)**: Create assignments with a **Drive link**, assign to students, and track **per-assignment progress** with progress bars and a student status table.

> No backend required — data is stored in `localStorage`. You can reset to the seeded demo data from the header.

---

## Tech Stack
- React + Vite
- Tailwind CSS
- Component-first architecture with basic hooks (`useState`, `useEffect`, `useMemo`, Context for shared state)

## Live Demo (how to deploy)
- **Netlify**: Create a new site from Git, set build command `npm run build` and publish directory `dist`.
- **Vercel**: Import Git repo, Framework preset **Vite**, then Deploy.
- (Optional) Dockerfile can be added later if needed.

## Getting Started (Local)
```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev
# Visit the URL shown (e.g., http://localhost:5173)
```

## Folder Structure
```
src/
  components/
    AssignmentCard.jsx
    ConfirmDialog.jsx
    Navbar.jsx
    ProgressBar.jsx
    AssignmentForm.jsx
  context/
    DataContext.jsx
  pages/
    Admin.jsx
    Student.jsx
  utils/
    storage.js
  App.jsx
  index.css
  main.jsx
```

## Design & Component Decisions
- **Navbar**: houses a role/user switcher (demo only) and a reset button to reseed data.
- **DataContext**: central store (simulating backend). Seeds sample users/assignments and persists to `localStorage`.
- **Student flow**: Each assignment card has a two-step confirmation (button → modal) before marking as submitted.
- **Admin flow**: Create assignments (title, due date, Google Drive link), assign to students, and track submissions with a **progress bar** and table.
- **Responsive UI**: Tailwind utility classes ensure mobile-first design with grid-based layouts and rounded, soft-shadowed cards.

## Mock Data
- Users:
  - `Professor Ada` (admin)
  - `Sanjana Suryadevara` (student)
  - `Aarav Sharma` (student)
- Two sample assignments are included at first run.

## Notes
- Authentication/authorization is **not** implemented (by design per spec). Use the **user switcher** to view each role.
- For a real app, replace `DataContext` with API calls and add auth.

## Submission Checklist
- [ ] Push this project to a public GitHub repo.
- [ ] Deploy to Netlify/Vercel and add the URL to your submission PDF.
- [ ] Record a short walkthrough video (2–4 min) and include the link in the PDF.
- [ ] Update this README with your links.
```

