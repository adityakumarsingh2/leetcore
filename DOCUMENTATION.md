# LeetCore Project Documentation

LeetCore is a full-stack learning and practice platform for DSA, core CS subjects, online assessment preparation, contests, and user progress tracking. The current project contains a React/Vite frontend, an Express/MongoDB backend, GitHub OAuth authentication, protected dashboard pages, and a placeholder C++ engine folder for future code-execution work.

This document explains the current project in detail: purpose, architecture, setup, routes, pages, components, authentication flow, environment variables, styling conventions, and future work.

## Table of Contents

1. [Project Purpose](#project-purpose)
2. [Current Feature Status](#current-feature-status)
3. [Tech Stack](#tech-stack)
4. [Repository Structure](#repository-structure)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [Authentication Flow](#authentication-flow)
8. [Routes](#routes)
9. [Dashboard Pages](#dashboard-pages)
10. [Profile Section](#profile-section)
11. [Landing Page](#landing-page)
12. [Styling and UI System](#styling-and-ui-system)
13. [Environment Variables](#environment-variables)
14. [Local Setup](#local-setup)
15. [Scripts](#scripts)
16. [Data Model](#data-model)
17. [API Endpoints](#api-endpoints)
18. [C++ Engine](#c-engine)
19. [Testing and Verification](#testing-and-verification)
20. [Known Limitations](#known-limitations)
21. [Future Improvements](#future-improvements)
22. [Developer Workflow](#developer-workflow)
23. [Troubleshooting](#troubleshooting)

## Project Purpose

LeetCore is designed to help students and developers prepare for technical interviews through:

- Structured DSA topic roadmaps.
- Core CS learning areas such as Operating Systems, DBMS, Computer Networks, and OOP.
- GitHub login based user accounts.
- A protected dashboard experience.
- Profile and progress overview screens.
- Online assessment practice pages.
- Contest pages.
- Feedback and bug-report collection screens.
- Sponsor page for future monetization or partnerships.

The long-term product direction is an all-in-one preparation platform with practice, analytics, contests, recommendations, and code execution.

## Current Feature Status

### Implemented

- React landing page.
- Login modal that starts GitHub OAuth.
- Express backend with GitHub OAuth callback.
- MongoDB user persistence.
- JWT cookie authentication.
- Protected dashboard routes.
- Logout flow.
- Dashboard homepage with category navigation and topic cards.
- Profile page with user information, progress cards, badges, consistency heatmap, suggestions, and contest rating.
- Feedback page.
- Report Bug page.
- Become Sponsor page.
- Online Assessment page.
- Contest page.
- Responsive dashboard shell and left navigation.
- Build and lint scripts.

### Partially Implemented or Placeholder

- Topic `Start` and `Practice` links exist in the DSA topic cards, but matching route pages are not currently implemented.
- Operating System, Computer Networks, DBMS, and OOP cards are marked as work in progress.
- Online Assessment and Contest pages are UI screens only; they do not currently submit or fetch real assessment/contest data.
- Feedback, Report Bug, and Sponsor forms are UI-only; they do not currently submit to backend endpoints.
- Profile progress metrics are currently static/demo values mixed with authenticated user data.
- C++ engine folder exists, but `main.cpp` is currently empty.

### Planned

- Real problem pages.
- Real practice editor.
- Code execution integration.
- Persistent progress tracking.
- Backend APIs for feedback, bug reports, sponsor requests, contests, and assessments.
- Admin dashboard.
- Multi-language execution support.

## Tech Stack

### Frontend

- React 19.
- Vite 8.
- React Router 7.
- Tailwind CSS 4.
- Lucide React icons.
- Axios for API requests.
- Framer Motion, GSAP, Lenis are installed for animation/scroll experiences.
- React Icons is installed for icon support.

### Backend

- Node.js.
- Express 5.
- MongoDB with Mongoose.
- GitHub OAuth using direct GitHub API requests.
- JWT for authentication.
- Cookie Parser for reading auth cookies.
- CORS for frontend/backend communication.
- Dotenv for environment configuration.
- Nodemon for local server restart.

### Engine

- C++ folder exists for future code execution.
- No active execution implementation is currently connected.

## Repository Structure

```text
leetcore/
├── Client/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── auth/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── features/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
├── Server/
│   ├── src/
│   │   ├── app.js
│   │   ├── index.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   └── package.json
├── Cpp-engine/
│   └── main.cpp
├── README.md
└── DOCUMENTATION.md
```

## Frontend Architecture

The frontend lives in `Client/src`.

### Entry Point

File: `Client/src/main.jsx`

Responsibilities:

- Creates the React root.
- Wraps the app with `StrictMode`.
- Adds `AuthProvider`.
- Adds `BrowserRouter`.
- Imports global CSS.

Render tree:

```jsx
<StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
</StrictMode>
```

### App Routing

File: `Client/src/App.jsx`

Responsibilities:

- Defines public and protected routes.
- Wraps dashboard routes with `ProtectedRoute`.
- Imports dashboard pages.

Main route groups:

- Public landing route: `/`
- Protected dashboard route: `/dashboard`
- Protected profile route: `/dashboard/profile`
- Protected utility routes: feedback, report bug, sponsor.
- Protected preparation routes: online assessment, contest.

### Authentication Context

File: `Client/src/context/AuthContext.jsx`

Responsibilities:

- Stores authenticated user state.
- Stores loading state while checking session.
- Calls `/api/v1/auth/me` on mount.
- Exposes `user`, `setUser`, `loading`, and `logout`.
- Performs logout through `/api/v1/auth/logout`.
- Redirects to `/` after logout.

Context values:

```js
{
  user,
  setUser,
  loading,
  logout
}
```

### Protected Route

File: `Client/src/components/common/ProtectedRoute.jsx`

Responsibilities:

- Reads `user` and `loading` from auth context.
- Shows a loading state while the auth check is running.
- Redirects unauthenticated users to `/`.
- Renders children for authenticated users.

### Dashboard Shell

File: `Client/src/features/dashboard/components/DashboardPageShell.jsx`

Responsibilities:

- Provides shared dashboard layout.
- Renders the left navigation.
- Wraps page content in the dashboard panel.
- Keeps all secondary dashboard pages visually consistent.

Used by:

- Feedback page.
- Report Bug page.
- Become Sponsor page.
- Online Assessment page.
- Contest page.

## Backend Architecture

The backend lives in `Server/src`.

### Server Entry

File: `Server/src/index.js`

Responsibilities:

- Loads environment variables.
- Imports Express app.
- Connects to MongoDB.
- Starts the server on `process.env.PORT` or `4000`.

Flow:

```text
Load env
  -> create app
  -> connect MongoDB
  -> listen on PORT
```

### Express App

File: `Server/src/app.js`

Responsibilities:

- Creates Express app.
- Enables cookie parsing.
- Configures CORS.
- Enables JSON request parsing.
- Mounts auth routes under `/api/v1`.

Allowed frontend origins:

- `http://localhost:5173`
- `http://localhost:5174`
- `process.env.CLIENT_URL`

### Database Connection

File: `Server/src/config/Connectdb.js`

Responsibilities:

- Connects to MongoDB using `process.env.DB_URL`.
- Logs success or failure.

### Routes

File: `Server/src/routes/Login.route.js`

Responsibilities:

- Defines GitHub login route.
- Defines GitHub callback route.
- Defines logout route.
- Defines current-user route.

### Controllers

Files:

- `Server/src/controllers/auth.controller.js`
- `Server/src/controllers/getuser.controller.js`

Responsibilities:

- Build GitHub OAuth redirect URL.
- Exchange GitHub code for access token.
- Fetch GitHub profile and email.
- Create or update user in MongoDB.
- Generate JWT.
- Set JWT cookie.
- Clear cookie on logout.
- Return current user for authenticated requests.

### Auth Middleware

File: `Server/src/middleware/auth.middleware.js`

Responsibilities:

- Reads JWT from `req.cookies.token`.
- Rejects requests without token.
- Verifies token using `JWT_SECRET`.
- Adds decoded token to `req.user`.
- Calls `next()` if token is valid.

## Authentication Flow

LeetCore uses GitHub OAuth and a JWT stored in an HTTP-only cookie.

### Login Flow

1. User clicks `Sign In` on landing page.
2. Login modal opens.
3. User clicks `Continue with GitHub`.
4. Browser navigates to:

```text
GET /api/v1/auth/github/login
```

5. Backend redirects user to GitHub OAuth.
6. GitHub redirects back to:

```text
GET /api/v1/auth/github/callback?code=...
```

7. Backend exchanges code for GitHub access token.
8. Backend fetches GitHub user profile.
9. Backend fetches GitHub emails.
10. Backend creates or updates the user in MongoDB.
11. Backend signs a JWT containing user id.
12. Backend stores JWT in cookie named `token`.
13. Backend redirects user to `/dashboard`.

### Session Check Flow

1. App loads.
2. `AuthProvider` calls:

```text
GET /api/v1/auth/me
```

3. Browser sends cookie automatically because `withCredentials: true` is enabled.
4. Backend validates JWT.
5. Backend returns the user.
6. Client stores user in context.

### Logout Flow

1. User opens avatar dropdown.
2. User clicks `Logout`.
3. Client calls:

```text
POST /api/v1/auth/logout
```

4. Backend clears cookie.
5. Client clears local user state.
6. Client redirects to `/`.

## Routes

### Frontend Routes

| Route | Access | Page | Purpose |
|---|---|---|---|
| `/` | Public | LandingPage | Marketing and login entry |
| `/dashboard` | Protected | Dashboard | Main roadmap dashboard |
| `/dashboard/profile` | Protected | Profile | User profile and progress |
| `/dashboard/feedback` | Protected | FeedbackPage | Feedback form UI |
| `/dashboard/reportbug` | Protected | ReportBugPage | Bug report form UI |
| `/dashboard/report-bug` | Protected | ReportBugPage | Alias for bug report |
| `/dashboard/become-sponsor` | Protected | BecomeSponsorPage | Sponsor request UI |
| `/dashboard/online-assessment` | Protected | OnlineAssessmentPage | OA practice UI |
| `/dashboard/contest` | Protected | ContestPage | Contest UI |

### Backend Routes

| Method | Route | Protected | Purpose |
|---|---|---|---|
| `GET` | `/api/v1/auth/github/login` | No | Redirect user to GitHub OAuth |
| `GET` | `/api/v1/auth/github/callback` | No | Handle GitHub OAuth callback |
| `POST` | `/api/v1/auth/logout` | No | Clear auth cookie |
| `GET` | `/api/v1/auth/me` | Yes | Return logged-in user |

## Dashboard Pages

### Dashboard Home

File: `Client/src/features/dashboard/dashboard.jsx`

Purpose:

- Main protected dashboard screen.
- Shows left navigation.
- Shows main content.
- Shows right sidebar on large screens.

Main child components:

- `DashLeftNavBar`
- `Dashmain`
- `DashRightNavBar`

### Dashboard Main

File: `Client/src/features/dashboard/components/dashmain.jsx`

Purpose:

- Renders category navigation.
- Renders topic cards.

Child components:

- `Dashmainnavbar`
- `Topics`

### Category Navbar

File: `Client/src/components/layout/dashnavbar.jsx`

Purpose:

- Shows high-level category cards.
- Clicking a category scrolls to that category section.

Categories:

- DSA.
- OS.
- CN.
- DBMS.
- OOPs.

### Topic Cards

File: `Client/src/features/dashboard/components/topics.jsx`

Purpose:

- Displays DSA topic cards.
- Displays WIP cards for core CS topics.

Current DSA topics:

- Arrays.
- Strings.
- Hashing.
- Two Pointers.
- Sliding Window.
- Binary Search.
- Linked List.
- Stack.
- Queue.
- Recursion.
- Backtracking.
- Trees.
- Binary Search Tree.
- Heap / Priority Queue.
- Graphs.
- Trie.
- Greedy.
- Dynamic Programming.
- Bit Manipulation.

Each DSA topic card has:

- Title.
- Description.
- `Start` link.
- `Practice` link.

Important note:

- The topic card links currently point to future pages.
- Matching route components are not implemented yet.

### Left Navigation

File: `Client/src/features/dashboard/components/dashleftnavbar.jsx`

Purpose:

- Shows app logo.
- Shows main dashboard navigation.
- Shows user avatar.
- Opens account dropdown.

Main links:

- Home: `/dashboard`
- OA: `/dashboard/online-assessment`
- Contest: `/dashboard/contest`

Dropdown links:

- Profile: `/dashboard/profile`
- Feedback: `/dashboard/feedback`
- Report Bug: `/dashboard/reportbug`
- Become Sponsor: `/dashboard/become-sponsor`
- Logout action.

Responsive behavior:

- Desktop: vertical sidebar.
- Mobile/tablet: horizontal top bar.

### Right Sidebar

File: `Client/src/features/dashboard/components/dashrightnavbar.jsx`

Purpose:

- Shows dashboard side widgets on large screens.

Child components:

- `Calendar`
- `Motivation`
- `RightTips`

### Calendar

File: `Client/src/components/layout/calender.jsx`

Purpose:

- Displays a monthly calendar widget.
- Shows sample event dots.
- Shows selected/upcoming event list.

### Motivation

File: `Client/src/components/layout/motivation.jsx`

Purpose:

- Displays motivational content in the dashboard sidebar.

### Right Tips

File: `Client/src/features/dashboard/components/righttips.jsx`

Purpose:

- Shows a small ad/sponsor placement card.
- Shows short platform prompts.

## Profile Section

Main file: `Client/src/features/Profile/profile.jsx`

Purpose:

- Shows a complete user profile dashboard.
- Combines real authenticated user data with demo progress UI.
- Responsive across desktop and mobile.

Components:

### UserDetail

File: `Client/src/features/Profile/components/UserDetail.jsx`

Shows:

- Avatar or default user icon.
- Name.
- Username.
- Bio.
- Email.
- Joined date.
- Timezone label.
- GitHub profile link.
- Summary stats.

Real user fields used:

- `name`
- `username`
- `avatar`
- `bio`
- `email`
- `profileUrl`
- `createdAt`

### OverallProgress

File: `Client/src/features/Profile/components/overallProgress.jsx`

Shows:

- Circular solved-problem progress ring.
- Topic progress mini cards.

Current values are static demo values.

### Milestone

File: `Client/src/features/Profile/components/milestone.jsx`

Shows:

- Badge count.
- Badge visuals.
- Most recent badge.

Current values are static demo values.

### ConsistencyBar

File: `Client/src/features/Profile/components/consistencybar.jsx`

Shows:

- Yearly submission count.
- Active days.
- Max streak.
- Heatmap-style activity grid.

Current values are static demo values.

### Suggestion

File: `Client/src/features/Profile/components/suggestion.jsx`

Shows:

- Smart learning recommendations.
- Suggested focus areas.

Current values are static demo values.

### ContestRating

File: `Client/src/features/Profile/components/contestrating.jsx`

Shows:

- Weekly contest rating chart.
- Current rating.
- Peak rating.
- Number of contests played.

Current values are static demo values.

## Landing Page

Main file: `Client/src/pages/landingpage.jsx`

Purpose:

- Public first screen.
- Explains product value.
- Opens login modal.

Child components:

- `LandingNavbar`
- `HeroSection`
- `Features`
- `Feedback`
- `AboutCreator`
- `Footer`
- `Login`

### Login Modal

File: `Client/src/auth/Login.jsx`

Purpose:

- Displays modal login card.
- Starts GitHub OAuth.

Login URL:

```js
`${VITE_API_URL}/api/v1/auth/github/login`
```

Fallback API URL:

```text
http://localhost:4000
```

## Secondary Dashboard Pages

### Feedback Page

File: `Client/src/features/dashboard/feedback.jsx`

Purpose:

- Collect product feedback from users.
- UI includes feedback type, rating, message textarea, and submit button.

Current status:

- UI-only. No backend submission endpoint is connected yet.

### Report Bug Page

File: `Client/src/features/dashboard/reportbug.jsx`

Purpose:

- Let users describe bugs.
- UI includes bug area, priority, title, steps to reproduce, and submit button.

Current status:

- UI-only. No backend submission endpoint is connected yet.

### Become Sponsor Page

File: `Client/src/features/dashboard/becomesponsor.jsx`

Purpose:

- Let brands or creators request a sponsorship partnership.
- Explains benefits.
- Provides a sponsor request form.

Current status:

- UI-only. No backend submission endpoint is connected yet.

### Online Assessment Page

File: `Client/src/features/dashboard/onlineassessment.jsx`

Purpose:

- Present online assessment practice sets.
- Shows assessment title, level, duration, question count, and status.

Current status:

- UI-only. Assessments are static data.

### Contest Page

File: `Client/src/features/dashboard/contest.jsx`

Purpose:

- Present contest events and sample standings.
- Shows contest cards and leaderboard preview.

Current status:

- UI-only. Contest data is static.

## Styling and UI System

Global stylesheet:

```text
Client/src/index.css
```

### Styling Approach

- Tailwind utility classes are used directly in JSX.
- Global CSS variables define key brand colors.
- Reusable utility classes exist for shell/card styling.
- Dark dashboard interface uses panels, borders, and muted text.
- Orange is the primary accent color.

### Important CSS Variables

```css
--lc-bg: #080808;
--lc-panel: #101011;
--lc-panel-soft: #151516;
--lc-line: rgba(255, 255, 255, 0.1);
--lc-muted: #a3a3ad;
--lc-orange: #f46717;
--lc-orange-soft: rgba(244, 103, 23, 0.14);
```

### Utility Classes

`lc-shell`

- Used for landing page background.
- Includes radial background effects and base background color.

`lc-card`

- Used for glassy/dark cards.
- Adds border and shadow.

`lc-orange-glow`

- Adds orange glow shadow.

`scrollbar-hide`

- Hides scrollbars for horizontal card sections.

### Responsive Patterns

Common patterns used:

- `flex-col md:flex-row` for mobile-to-desktop layout.
- `grid grid-cols-1 lg:grid-cols-2` for responsive cards.
- Sidebar hidden on smaller screens where appropriate.
- Dashboard left navigation becomes a top navigation bar on mobile.

## Environment Variables

### Client

Location:

```text
Client/.env
```

Required:

```env
VITE_API_URL=http://localhost:4000
```

Purpose:

- Defines backend URL used by Axios and login redirect.

### Server

Location:

```text
Server/.env
```

Required:

```env
PORT=4000
DB_URL=mongodb://127.0.0.1:27017/leetcore
JWT_SECRET=your_jwt_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:4000/api/v1/auth/github/callback
CLIENT_URL=http://localhost:5174
```

Variable explanations:

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `DB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWT cookies |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client id |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret |
| `GITHUB_CALLBACK_URL` | Backend callback URL configured in GitHub OAuth app |
| `CLIENT_URL` | Frontend URL used after successful login |

## Local Setup

### Prerequisites

Install:

- Node.js.
- npm.
- MongoDB or a MongoDB Atlas connection string.
- Git.
- g++ only if working on future C++ engine functionality.

### 1. Clone Repository

```bash
git clone https://github.com/MOHITGODARA1/leetcore.git
cd leetcore
```

### 2. Install Client Dependencies

```bash
cd Client
npm install
```

### 3. Create Client Environment File

Create:

```text
Client/.env
```

Add:

```env
VITE_API_URL=http://localhost:4000
```

### 4. Install Server Dependencies

```bash
cd ../Server
npm install
```

### 5. Create Server Environment File

Create:

```text
Server/.env
```

Add your own values:

```env
PORT=4000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:4000/api/v1/auth/github/callback
CLIENT_URL=http://localhost:5174
```

### 6. Configure GitHub OAuth App

In GitHub:

1. Open Developer Settings.
2. Create a new OAuth App.
3. Set Homepage URL to your frontend URL, for example:

```text
http://localhost:5174
```

4. Set Authorization callback URL to:

```text
http://localhost:4000/api/v1/auth/github/callback
```

5. Copy Client ID and Client Secret to `Server/.env`.

### 7. Run Backend

```bash
cd Server
npm start
```

Expected output:

```text
Database connected successfully
Server is running on port 4000
```

### 8. Run Frontend

```bash
cd Client
npm run dev
```

Open the Vite URL shown in the terminal.

Common local URL:

```text
http://localhost:5174
```

## Scripts

### Client Scripts

Run inside `Client`.

| Script | Command | Purpose |
|---|---|---|
| Dev | `npm run dev` | Start Vite dev server |
| Build | `npm run build` | Build production client |
| Lint | `npm run lint` | Run ESLint |
| Preview | `npm run preview` | Preview built app |

### Server Scripts

Run inside `Server`.

| Script | Command | Purpose |
|---|---|---|
| Start | `npm start` | Start backend with nodemon |
| Test | `npm test` | Placeholder test script |

## Data Model

### User Model

File:

```text
Server/src/models/User.models.js
```

Schema fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| `githubId` | String | Yes | Unique GitHub id |
| `username` | String | Yes | GitHub login |
| `email` | String | Yes | Primary/verified email or generated fallback |
| `avatar` | String | No | GitHub avatar URL |
| `profileUrl` | String | No | GitHub profile URL |
| `bio` | String | No | GitHub bio |
| `name` | String | No | GitHub name or login |
| `lastLogin` | Date | No | Updated during login |
| `createdAt` | Date | Auto | Mongoose timestamp |
| `updatedAt` | Date | Auto | Mongoose timestamp |

Indexes:

- `githubId`
- `username`
- `email`

## API Endpoints

### Start GitHub Login

```http
GET /api/v1/auth/github/login
```

Purpose:

- Redirects user to GitHub OAuth authorization page.

Required server env:

- `GITHUB_CLIENT_ID`
- `GITHUB_CALLBACK_URL`

### GitHub Callback

```http
GET /api/v1/auth/github/callback?code=...
```

Purpose:

- Receives GitHub OAuth code.
- Exchanges code for access token.
- Fetches GitHub user and email.
- Creates or updates user.
- Creates JWT cookie.
- Redirects to dashboard.

Required server env:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `JWT_SECRET`
- `CLIENT_URL`

### Current User

```http
GET /api/v1/auth/me
```

Protected:

- Yes.

Requires:

- `token` cookie.

Success response shape:

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "githubId": "...",
    "username": "...",
    "email": "...",
    "avatar": "...",
    "profileUrl": "...",
    "bio": "...",
    "name": "...",
    "lastLogin": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Logout

```http
POST /api/v1/auth/logout
```

Purpose:

- Clears the `token` cookie.

Success response:

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

## C++ Engine

Folder:

```text
Cpp-engine/
```

Current file:

```text
Cpp-engine/main.cpp
```

Current status:

- Present but empty.
- Not connected to frontend or backend.

Future expected responsibilities:

- Compile and run user code.
- Execute DSA logic.
- Return output/errors/performance metrics.
- Support sandboxed execution.

Important future safety note:

- User-submitted code execution must be isolated.
- Avoid running untrusted code directly on the host machine.
- Use Docker, process limits, timeouts, memory limits, and file-system isolation.

## Testing and Verification

### Current Available Checks

Client lint:

```bash
cd Client
npm run lint
```

Client production build:

```bash
cd Client
npm run build
```

### Current Test Coverage

- No automated frontend test suite currently exists.
- No automated backend test suite currently exists.
- Server `npm test` is still a placeholder.

### Recommended Future Tests

Frontend:

- Route rendering tests.
- Auth redirect tests.
- Dashboard navigation tests.
- Responsive component tests.
- Form validation tests.

Backend:

- Auth route tests.
- JWT middleware tests.
- User model tests.
- Logout tests.
- CORS behavior tests.

End-to-end:

- GitHub login flow mock.
- Protected dashboard access.
- Logout flow.
- Feedback/report form submission once APIs exist.

## Known Limitations

1. Many dashboard metrics are static demo values.
2. Feedback, Report Bug, Sponsor, Online Assessment, and Contest pages do not submit to backend yet.
3. DSA topic Start/Practice route pages are not implemented yet.
4. C++ engine is not implemented.
5. Server does not currently expose APIs for progress tracking.
6. Server does not currently expose APIs for contests or assessments.
7. Server test script is placeholder.
8. Frontend route protection depends on successful `/auth/me` response.
9. CORS allowed origins must match the exact frontend dev URL.
10. GitHub OAuth requires correct callback configuration.

## Future Improvements

### Product

- Real topic lessons.
- Practice problem pages.
- User progress persistence.
- Recommendations based on weak topics.
- Contest registration and ranking.
- Online assessment scoring.
- Submission history.
- Badges and streak persistence.
- Admin content management.

### Engineering

- Add backend APIs for all UI forms.
- Add validation using a schema library.
- Add frontend form state and submission states.
- Add loading, success, and error toasts.
- Add automated tests.
- Add Docker setup.
- Add CI pipeline.
- Add centralized route constants.
- Add centralized component library.
- Add code execution sandbox.

### Security

- Use secure cookies in production.
- Add CSRF protection for cookie-authenticated mutation routes.
- Add stricter CORS in production.
- Add rate limiting on auth endpoints.
- Add input validation on future form APIs.
- Avoid returning sensitive fields from user documents.

## Developer Workflow

### Recommended Branch Naming

```text
feature/page-name
fix/bug-name
refactor/module-name
docs/topic-name
```

### Before Pushing Changes

Run:

```bash
cd Client
npm run lint
npm run build
```

If backend changes are made:

```bash
cd Server
npm start
```

Manually verify:

- Landing page loads.
- Login modal opens.
- Dashboard route protects unauthenticated users.
- Logged-in dashboard loads.
- Profile page renders.
- Left navbar links work.
- Logout redirects home.

### Adding a New Dashboard Page

1. Create page file in:

```text
Client/src/features/dashboard/
```

2. Wrap content with:

```jsx
<DashboardPageShell>
  ...
</DashboardPageShell>
```

3. Import the page in `Client/src/App.jsx`.
4. Add a protected route.
5. Add nav link if needed in `dashleftnavbar.jsx`.
6. Run lint and build.

### Adding a New Backend Route

1. Add controller function in `Server/src/controllers`.
2. Add route in `Server/src/routes/Login.route.js` or create a new route file.
3. Mount new route file in `Server/src/app.js`.
4. Add middleware if protected.
5. Validate request body.
6. Return consistent JSON responses.

## Troubleshooting

### Dashboard Redirects to Landing Page

Cause:

- User is not authenticated.
- `/api/v1/auth/me` failed.
- Cookie not present.
- Backend not running.
- `VITE_API_URL` is wrong.

Fix:

- Start backend.
- Check `Client/.env`.
- Check browser cookies.
- Log in again with GitHub.

### GitHub Login Fails

Possible causes:

- Missing GitHub env variables.
- Wrong callback URL in GitHub OAuth app.
- `GITHUB_CALLBACK_URL` does not match GitHub settings.
- Backend is not running.
- GitHub email is private, but fallback email generation should still handle this.

Fix:

- Verify `GITHUB_CLIENT_ID`.
- Verify `GITHUB_CLIENT_SECRET`.
- Verify callback URL exactly.
- Restart backend after changing `.env`.

### CORS Error

Cause:

- Frontend URL is not listed in backend allowed origins.

Fix:

- Set `CLIENT_URL` in `Server/.env`.
- Make sure it matches the actual Vite URL exactly.
- Restart backend.

### MongoDB Connection Fails

Cause:

- Invalid `DB_URL`.
- MongoDB not running.
- Atlas IP access not configured.

Fix:

- Check `DB_URL`.
- Start local MongoDB or update Atlas network access.
- Restart server.

### Logout Does Not Work

Possible causes:

- Backend is not running.
- `VITE_API_URL` is wrong.
- Cookie cannot be cleared due to domain/sameSite mismatch.

Fix:

- Confirm `/api/v1/auth/logout` returns success.
- Confirm client calls the correct API URL.
- Use the same host style for frontend/backend during local work, for example avoid mixing `localhost` and `127.0.0.1` unless CORS/cookies are configured for it.

### Vite Port Is Different

Vite may use a different port if the default is busy.

Fix:

- Update `CLIENT_URL` in server env to the actual frontend URL.
- Update GitHub OAuth app Homepage URL if needed.
- Restart backend.

## Project Summary

LeetCore currently has a solid foundation:

- Modern React frontend.
- Protected dashboard.
- GitHub OAuth.
- MongoDB user storage.
- Multiple polished dashboard pages.
- Responsive UI shell.

The next major step is connecting the static UI screens to real backend data and implementing the learning/practice engine.
