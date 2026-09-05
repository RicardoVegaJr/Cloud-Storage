# Cloud File Client

A React (Vite) front end for a cloud storage web app. Users can sign up, log in, and manage their files from a dashboard.

## Getting Started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm test            # run the Jest test suite
npm run lint        # run ESLint
npm run build       # production build
```

## Test Credentials

The app ships with built-in test accounts so testers can sign in **without a running backend server**. These accounts are defined in `src/auth/auth.js` and return a mock session token.

### Test Login

Use these credentials on the **Login** form:

| Field    | Value                  |
| -------- | ---------------------- |
| Email    | `tester@cloudfile.dev` |
| Password | `TestLogin123!`        |

### Test Signup

Use these credentials on the **Signup** form (any name may be entered):

| Field    | Value                         |
| -------- | ----------------------------- |
| Name     | `Signup Tester` (or any name) |
| Email    | `signup-tester@cloudfile.dev` |
| Password | `TestSignup123!`              |

> **Note:** The test signup password must match exactly. Any other email address is sent to the real backend API (`http://localhost:3000` by default, configurable via `VITE_API_BASE_URL`).

## Dashboard (Landing Page After Sign-In)

After a successful login or signup, the user is redirected to `/dashboard` — a file-manager page where they can:

- **Upload** files (multi-select supported) into the current folder
- **Rename** files inline
- **Delete** files
- **Move** files between folders (or back to Home) via the "Move to…" dropdown
- **Create** and delete folders (deleting a folder moves its files back to Home)
- **Sign out**, which clears the session token and returns to the home page

The dashboard requires a session token in `localStorage`; without one it redirects back to the home page.
