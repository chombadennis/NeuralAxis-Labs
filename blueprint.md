# Project Blueprint: NeuralAxis Labs

## Overview
NeuralAxis Labs is a premium React web application integrated with Firebase, showcasing state-of-the-art technological solutions in Artificial Intelligence, machine learning, logistics, and construction operations. The codebase leverages React 19, Vite, MUI v7, and Firebase services, wrapped in a high-fidelity futuristic dark theme.

---

## Technical Stack & Architecture

- **Core Framework**: React 19 (Functional Components, Hooks)
- **Routing**: React Router Dom v7
- **Styling**: MUI v7 with Emotion (`@emotion/react`, `@emotion/styled`), custom glassmorphism overrides, Google Fonts (`Lora`, `Inter`, `Lexend`, `Outfit`)
- **Backend & Database**: Firebase Firestore, Firebase Authentication, Cloud Functions (for email dispatching)
- **Development Tooling**: Vite 7, Vitest, ESLint 9

---

## Existing Features & Component Structure

### Pages
- **HomePage (`src/pages/HomePage.jsx`)**: The main landing experience compiling home sections.
- **AdminPage (`src/pages/Admin.jsx`)**: Protected workspace dashboard for content administration.
- **AuthPage (`src/pages/AuthPage.jsx`)**: Unified Sign-in / Sign-up portal backed by Firebase Auth.
- **Policies & Terms (`src/pages/Policy.jsx`, `src/pages/Terms.jsx`)**: Static compliance and legal document pages.

### Home Sections
1. **Hero (`src/sections/Hero.jsx`)**: Landing presentation area (being upgraded).
2. **About (`src/sections/About.jsx`)**: Company identity, mission, and three core tech pillars (Bespoke AI, Advanced Analytics, High-Performance Web).
3. **Services (`src/sections/Services.jsx`)**: Breakdown of the 4 core business sectors:
   - Construction Site Intelligence
   - Operations & Logistics Systems
   - Enterprise Collaboration Platforms
   - Business Intelligence & Analytics
4. **Projects (`src/sections/Projects.jsx` & `src/components/ProjectCard.jsx`)**: Portfolio showcase pulling project items (from Firestore with static fallback).
5. **Contact (`src/sections/Contact.jsx`)**: Location cards and dynamic email contact form sending messages via Firebase Cloud Functions.

### Styling & Theme Design System (`src/theme.js`)
- **Theme Mode**: Dark
- **Color Palette**:
  - Primary (Cyan): `#00F2FE` / `#00C9FF` (Glows, hover states)
  - Secondary (Electric Purple): `#9C27B0` / `#6A0080` (Ambient blur)
  - Accent/Error (Warm Amber): `#E67E22` (Buttons, alerts, contact theme)
  - Background: `#070913` (Deep Navy) and `#0F1225` (Dark Slate Indigo)
- **Glassmorphic Cards**: Preconfigured inside `MuiPaper` styleOverrides (blur, border opacity, background transparency).

---

## Action Plan: Hero Graphics Redesign

### Objective
Upgrade the Hero page to feature a modern, split-pane layout on desktop (720px+) combining a high-converting text section on the left with a highly visual, interactive dashboard widget console on the right. The graphics console will showcase NeuralAxis' four services dynamically.

### Key Tasks
1. **Backup Existing Code**: Create `src/sections/Hero.bak.jsx` containing the original simple logo/header layout.
2. **Create Graphics Console Component (`src/components/HeroGraphics.jsx`)**:
   - Create tabs for Site Intelligence, Logistics, Collaboration, and Analytics.
   - Build active visualization screens using animated SVGs, HTML canvas mesh, code/log ticker simulation, and interactive KPI gauges.
   - Match all color schemes to the brand palette (Cyan/Purple/Navy/Amber).
3. **Redesign Main Hero Component (`src/sections/Hero.jsx`)**:
   - Change layout structure to use flex/grid layout (`md: 'row'`, `xs: 'column'`).
   - Center alignment on mobile; side-by-side alignment on larger monitors.
   - Refine text contrast, size scaling, and typography.
   - Optimize "Let's Engage" and "Explore Portfolio" button sizes for mobile/small viewports by setting the buttons' width to `auto`, centering them within the parent container, and using reduced height and width padding (`10px 24px` and `9px 22px` respectively) while preserving the `1rem` font size.
4. **Validation**: Check compilation, linting rules, and responsiveness across browsers and viewport widths.
