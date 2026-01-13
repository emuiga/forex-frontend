Forex Conversion Frontend
Overview

This is a simple Next.js frontend that allows users to convert currencies and view a history of past conversions. It integrates directly with the Forex Conversion Backend API.

The focus is on correctness, clarity, and responsiveness rather than UI polish.

Tech Stack

Next.js (Pages Router)

TypeScript

Tailwind CSS

Features

Currency conversion form

Client-side input validation

Display of converted result

Conversion history list

Responsive layout

Setup Instructions
1. Install Dependencies
npm install

2. Environment Variables

Create a .env.local file:

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000


An .env.example file is included for reference.

3. Run the App
npm run dev


The frontend will be available at http://localhost:3001.

Approach

The main page composes a conversion form and a conversion history list.

API calls are abstracted into a small client layer.

React state is used directly; no external state management libraries.

Tailwind CSS is used for layout and responsiveness.

The UI remains minimal to keep focus on functionality.

Assumptions

The backend API is available and running.

No user authentication or session handling is required.

Conversion history is global rather than user-specific.

The list of currencies is derived from backend data.

Additional Notes

Client-side validation prevents obvious invalid submissions.

Backend validation is treated as the source of truth.
