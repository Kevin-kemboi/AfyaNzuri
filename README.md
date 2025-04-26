# AfyaNzuri

AfyaNzuri is a web application for managing health programs, clients, and enrollments. It provides a user-friendly interface for healthcare providers to track client data, manage wellness programs, and visualize insights through a dashboard. Built with a React frontend and Flask backend, AfyaNzuri ensures a responsive, accessible, and error-free experience.

## Features

- **Responsive Navigation**: Sticky header with desktop links and mobile hamburger menu for seamless page transitions.
- **Home Page**: Hero section with health-themed illustrations, stats, and testimonials.
- **Program Management**: Add, view, and export programs to CSV with pagination support.
- **Enrollment**: Enroll clients in programs with a celebratory confetti modal on success.
- **Client Management**: Add, search, and view client details with accessible forms and animations.
- **Dashboard**: Visualize client, program, and enrollment data with stats cards and charts (powered by Recharts).
- **Accessibility**: ARIA labels and keyboard navigation for inclusive user experience.
- **Error Handling**: Fixed React Router warnings and image loading issues for a smooth experience.
- **Backend APIs**: RESTful endpoints for clients, programs, enrollments, and analytics.

## Tech Stack

- **Frontend**:
  - React 18.2.0
  - React Router 6.14.0 (with future flags: `v7_startTransition`, `v7_relativeSplatPath`)
  - Tailwind CSS 3.4.1 (custom colors: `teal`, `mint-green`, `coral`, `navy`)
  - @heroicons/react 2.0.18
  - Framer Motion 10.12.16 (animations)
  - Recharts 2.7.2 (charts)
  - Axios 1.4.0 (API requests)
- **Backend**:
  - Flask 2.3.2
  - Flask-CORS 4.0.0
  - SQLite (`health.db` for data persistence)
- **Assets**:
  - Local SVGs: `healthcare-hero.svg`, `doctor-consultation.svg` (recommended from [Undraw](https://undraw.co/)).
- **Fonts**:
  - Poppins (headings), Roboto (body) via Google Fonts.


## Setup Instructions

### Prerequisites

- Node.js (>=18.x)
- Python (>=3.8)
- Git
- npm or yarn
- pip

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Kevin-kemboi/AfyaNzuri.git
   cd AfyaNzuri/frontend
npm install
npm start

### Backend Setup
 Clone the repository:
   ```bash
   git clone https://github.com/Kevin-kemboi/AfyaNzuri.git
   cd AfyaNzuri/backend
venv\Scripts\activate
pip install flask flask-cors
python app.py









