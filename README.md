# NeuralAxis Labs

NeuralAxis Labs is a premium software consulting and development agency website built with React, Vite, and Material-UI. It features a modern dark-mode aesthetic with custom animations and provides an interactive landing page to showcase services, portfolios, and easily contact the team.

## Key Features

- **Modern Design System**: Built with glassmorphic cards, glowing highlights, dynamic hover effects, and optimized typography (Lora, Lexend, and Inter).
- **Interactive Sections**:
  - **Hero**: Clean, responsive value proposition with CTA triggers.
  - **Services**: Dynamic grid showing core solutions (Custom Software, Cloud Infrastructure, AI Systems, DevOps).
  - **About**: Custom overview of company values and philosophy.
  - **Projects**: Centered visual showcase featuring past client success stories with dynamic "Show More/Less" control.
  - **Contact**: Centered multi-field validated contact form with status feedback and custom loading indicators.
- **Firebase V2 HTTPS Cloud Function**: A serverless function built in Node.js using Resend API to automatically forward contact form messages directly to `neuralaxislabs@gmail.com`.

## Tech Stack

- **Frontend**: React, Vite, Material-UI (MUI), Emotion, React Scroll
- **Backend**: Firebase Hosting, Cloud Functions (2nd Gen)
- **Email Forwarding**: Resend SDK

## Development Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Set up your local environment variables in `.env`:
   ```env
   VITE_EMAIL_SEND_URL=https://<your-firebase-cloud-function-url>
   ```
3. Run the frontend development server:
   ```bash
   npm run dev
   ```
4. Set up the Cloud Function configuration:
   - Navigate to the `/functions` directory.
   - Run `npm install` to set up function dependencies.
   - Set the `RESEND_KEY` environment variable in Firebase to authorize email sending via Resend.
