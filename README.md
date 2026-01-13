# Forex Conversion Frontend

## Overview

This is a simple Next.js frontend that allows users to convert currencies and view a history of past conversions. It integrates directly with the Forex Conversion Backend API.

The focus is on correctness, clarity, and responsiveness rather than UI polish.

## Tech Stack

- **Next.js** (Pages Router)
- **TypeScript**
- **Tailwind CSS**

## Features

- Currency conversion form with amount, base currency, and target currency inputs
- Client-side input validation
- Display of converted result immediately after submission
- Conversion history list showing past conversions with relevant details
- Responsive layout for various screen sizes
- Graceful error handling with user-friendly messages

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

An `.env.example` file is included for reference.

### 3. Run the App

```bash
npm run dev
```

The frontend will be available at `http://localhost:3001`.

## Approach

### Frontend Functionality

**Conversion Form:**
- Form component (`ConversionForm`) allows users to input:
  - Amount to convert (numeric input with validation)
  - Base currency (dropdown populated from backend rates)
  - Target currency (dropdown populated from backend rates)
- Form submission sends POST request to `/convert` HTTP service
- Client-side validation ensures:
  - Amount is a positive number
  - Both currencies are selected
  - Base and target currencies are different

**Result Display & History:**
- Upon successful conversion, the converted amount and result are displayed immediately
- Conversion history is automatically refreshed to show the new conversion
- History list displays past conversions with relevant details (amount, currencies, result, timestamp)

**Input Validation:**
- Client-side validation prevents invalid submissions before API calls
- Validates numeric input, required fields, and currency selection
- Backend validation is treated as the source of truth for final validation

### Code Organization

**Modular Structure:**
- API client layer (`src/lib/api.ts`) abstracts all HTTP calls to the backend
- Type definitions (`src/types/conversion.ts`) centralize TypeScript interfaces
- Components are separated into reusable modules:
  - `ConversionForm` - handles form input and submission
  - `ConversionHistory` - displays list of past conversions
- Main page (`src/pages/index.tsx`) composes these components

**Modern JavaScript/TypeScript:**
- Uses async/await for all API calls
- TypeScript for type safety throughout
- React hooks (useState, useEffect) for state management
- No external state management libraries - React state is used directly

**Error Handling:**
- Try-catch blocks wrap all async operations
- User-friendly error messages displayed in the UI
- Network errors and API errors are handled gracefully
- Loading states provide feedback during API calls

**Responsive Design:**
- Tailwind CSS used for layout and responsiveness
- Mobile-first approach with responsive breakpoints
- UI remains minimal and functional - polish is not a priority, but responsiveness is expected

## Assumptions

- The backend API is available and running
- No user authentication or session handling is required
- Conversion history is global rather than user-specific
- The list of currencies is derived from backend data

## Additional Notes

- Client-side validation prevents obvious invalid submissions
- Backend validation is treated as the source of truth