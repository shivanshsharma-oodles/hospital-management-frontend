# Hospital Management - Frontend

React + Vite frontend for a hospital management system. Provides UI for public visitors, patients, doctors, and admins; integrates with backend Spring APIs for auth, departments, doctors, appointments, and more.

**Tech Stack:**
- **Framework:** React + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS & Shadcn UI
- **HTTP client:** Axios

**Quick Start**

- Install dependencies:

	`npm install`

- Run dev server:

	`npm run dev`

- Build:

	`npm run build`

- Preview production build:

	`npm run preview`


**Environment**
- Create a `.env` (or provide env vars to your environment). The app reads the API base URL from `VITE_API_URL` and exposes it as `env.API_URL`.

Example .env:

VITE_API_URL=https://api.example.com


**Project Structure (important parts)**
- `src/` - application source
	- `src/services/spring-apis/` - API wrappers used by the app
	- `src/config/axios.config.ts` - Axios instances (`publicApi`, `privateApi`) configured to use `env.API_URL` and auth token
	- `src/pages/` - route pages for public, patient, doctor, admin
	- `src/components/` - shared UI components


**Scripts**
- `npm run dev` - start Vite dev server
- `npm run build` - build production assets (runs `tsc -b && vite build`)
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint


**APIs Used (summary)**
All API calls are made via the wrappers in `src/services/spring-apis/`. The app expects a RESTful backend (Spring) mounted under the base URL given by `VITE_API_URL`.

- `auth.service.ts` (publicApi/privateApi)
	- POST `/auth/signup` - sign up a new user
	- POST `/auth/login` - login (stores JWT in client storage)
	- POST `/auth/admin/login` - admin login
	- GET `/auth/me` - get current authenticated user

- `public.service.ts` (publicApi)
	- GET `/departments` - list all departments
	- POST `/departments/{id}` - (used in code as DepartmentById)
	- GET `/doctors` - list all doctors
	- GET `/doctors/{id}` - get doctor by id
	- GET `/doctors/department/{id}` - list doctors by department id

- `admin.service.ts` (privateApi - admin endpoints)
	- POST `/departments` - add department
	- DELETE `/departments/{id}` - delete department
	- GET `/doctors/admin/{id}` - get complete doctor profile (admin)
	- POST `/doctors/admin/create` - create doctor
	- DELETE `/doctors/admin/{id}` - delete doctor

- `common.service.ts` (privateApi)
	- GET `/appointments/me` - appointments for current user
	- PUT `/appointments/{id}/cancel` - cancel appointment
	- GET `/doctors/{doctorId}/slots` - get slots for a doctor

- `doctor.service.ts` (privateApi - doctor endpoints)
	- GET `/doctors/me` - fetch current doctor profile
	- PUT `/doctors` - update doctor
	- POST `/doctors/slots` - add slots
	- DELETE `/doctors/slots/{id}` - delete a slot
	- GET `/doctors/slots` - fetch my slots
	- PUT `/appointments/{id}/status` - manage pending appointment (SCHEDULED | REJECTED)
	- PUT `/appointments/{id}/complete` - complete appointment (medical record payload)

- `patient.service.ts` (privateApi - patient endpoints)
	- GET `/patients/me` - fetch current patient profile
	- PUT `/patients` - update patient
	- POST `/appointments` - book appointment (payload: `{ doctorSlotId }`)


Notes:
- Auth tokens are stored via the project's `storage` helper when logging in. `privateApi` should attach the token to requests (see `src/config/axios.config.ts`).
- The above routes were inferred from the service wrapper functions; consult your backend API docs for request/response shapes and validation rules.


If you want, I can:
- Create separate the API docs with example request/response shapes for each endpoint.