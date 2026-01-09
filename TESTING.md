# Hospital Management Frontend - E2E Testing Guide

This document provides a comprehensive guide to the Cypress E2E tests for the Hospital Management Frontend.

## Overview

The test suite covers the following areas:
- **Authentication**: Login, signup, token management, and role-based access
- **Patient Features**: Dashboard, browse departments/doctors, book appointments, view medical records
- **Doctor Features**: Dashboard, manage slots, view/manage appointments, complete appointments with medical records
- **Protected Routes**: Authentication guards, role-based access control, protected layouts

## Test Structure

```
cypress/
├── e2e/
│   ├── auth.cy.ts              # Authentication tests
│   ├── patient.cy.ts           # Patient feature tests
│   ├── doctor.cy.ts            # Doctor feature tests
│   └── protected-routes.cy.ts   # Protected route and RBAC tests
├── support/
│   ├── commands.ts             # Custom Cypress commands
│   ├── e2e.ts                  # Global test configuration
│   └── index.d.ts              # TypeScript definitions for custom commands
└── cypress.config.ts           # Cypress configuration
```

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All E2E Tests
```bash
npm run test:e2e
```

### Run Specific Test Files
```bash
# Run only authentication tests
npm run test:auth

# Run only patient feature tests
npm run test:patient

# Run only doctor feature tests
npm run test:doctor

# Run only protected route tests
npm run test:protected
```

### Open Cypress Test Runner (Interactive Mode)
```bash
npm run cypress:open
```

### Run All Tests in Headless Mode
```bash
npm run cypress:run
```

## Test Configuration

The Cypress configuration is in `cypress.config.ts` with the following settings:
- **Base URL**: `http://localhost:5173` (Vite dev server)
- **Viewport**: 1280x720
- **Default Command Timeout**: 10 seconds
- **Request Timeout**: 10 seconds

## Custom Commands

Custom Cypress commands are available in `cypress/support/commands.ts`:

### `cy.loginAsPatient(email, password)`
Logs in a patient user and redirects to role selection page.

```typescript
cy.loginAsPatient('shivansh@gmail.com', 'shivansh');
```

### `cy.loginAsAdmin(email, password)`
Logs in an admin user and redirects to admin dashboard.

```typescript
cy.loginAsAdmin('admin@gmail.com', 'admin');
```

### `cy.selectRole(role)`
Selects a role from the role selection page.

```typescript
cy.selectRole('PATIENT');   // Select patient role
cy.selectRole('DOCTOR');    // Select doctor role
cy.selectRole('ADMIN');     // Select admin role
```

### `cy.logout()`
Clears authentication token and redirects to login page.

```typescript
cy.logout();
```

### `cy.checkAuthToken()`
Verifies that an auth token exists in localStorage.

```typescript
cy.checkAuthToken();
```

## Test Data

Tests use the following test credentials:

### Patient
```
Email: shivansh@gmail.com
Password: shivansh
```

### Doctor
```
Email: jonas@gmail.com
Password: jonas
```

### Admin
```
Email: admin@gmail.com
Password: admin
```

**Note**: Update these credentials based on your backend test data setup.

## Test Categories

### Authentication Tests (auth.cy.ts)
- Patient login with valid/invalid credentials
- Admin login with valid/invalid credentials
- Patient signup and email validation
- Password validation and confirmation
- JWT token storage and management
- Token persistence across page reloads
- Protected route access control
- Role-based dashboard access

**Test Cases**: 30+

### Patient Feature Tests (patient.cy.ts)
- Patient dashboard display
- Browse departments with filtering
- Browse doctors with filtering
- Book appointments
- View appointment details and prescriptions
- View and manage medical records
- Patient navigation and session persistence

**Test Cases**: 25+

### Doctor Feature Tests (doctor.cy.ts)
- Doctor dashboard display
- Manage appointment slots (add, delete, view)
- View and manage appointments
- Accept, reject, and cancel appointments
- Complete appointments with medical records
- View appointment details
- Doctor navigation and session persistence

**Test Cases**: 30+

### Protected Routes Tests (protected-routes.cy.ts)
- Unauthenticated access prevention
- Patient role access control
- Doctor role access control
- Admin role access control
- Role-based UI differences
- Token expiration handling
- Cross-role navigation prevention
- Protected layout functionality

**Test Cases**: 40+

## Prerequisites for Running Tests

1. **Development Server Running**
   ```bash
   npm run dev
   ```
   This starts the Vite dev server on `http://localhost:5173`

2. **Backend API Running**
   - The backend API should be running and accessible at the URL specified in your `.env` file
   - Ensure test data exists for the test credentials

3. **Environment Variables**
   - Set `VITE_API_URL` in your `.env` file to point to your backend API
   - Example: `VITE_API_URL=http://localhost:8080`

## Modifying Tests

### Update Test Credentials
Update the test credentials in each test file to match your backend test data:

```typescript
const testPatient = {
  email: 'your-test-patient@example.com',
  password: 'your-test-password',
};
```

### Update API Base URL
Edit `cypress.config.ts` to change the base URL:

```typescript
baseUrl: "http://your-app-url:port",
```

### Add New Test Cases
Create a new `*.cy.ts` file in `cypress/e2e/` and follow the existing test structure:

```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    cy.logout();
    cy.visit('/login');
  });

  it('should do something', () => {
    // Test implementation
  });
});
```

## Troubleshooting

### Tests Not Running
- Ensure the development server is running: `npm run dev`
- Check that the backend API is accessible
- Verify the base URL in `cypress.config.ts` is correct

### Authentication Failures
- Verify test credentials match backend test data
- Check that the JWT token is being properly stored in localStorage
- Ensure API endpoints match what the tests expect

### Timeout Errors
- Increase timeout values in `cypress.config.ts`
- Check for JavaScript errors in the browser console
- Verify the backend API is responding in time

### Element Not Found
- Verify the correct selectors are used
- Check element visibility and opacity
- Use `cy.get('*')` to see all elements on the page
- Adjust timeouts if elements load slowly

## Best Practices

1. **Use Custom Commands**: Utilize custom commands for common operations (login, logout, role selection)
2. **Wait for Elements**: Always wait for elements to be visible before interacting
3. **Test Data Cleanup**: Ensure test data is clean before running tests
4. **Meaningful Assertions**: Use assertions that clearly show what's being tested
5. **Avoid Hard Waits**: Use Cypress waits and retries instead of `cy.wait()`
6. **Test Independence**: Each test should be independent and not rely on previous test state

## CI/CD Integration

To integrate tests into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run E2E Tests
  run: npm run test:e2e
```

## Extending Tests

### Add API Mocking (Optional)
Consider using `cy.intercept()` for mocking API responses:

```typescript
cy.intercept('POST', '/auth/login', {
  statusCode: 200,
  body: { jwt: 'test-token', user: {} },
}).as('login');
```

### Add Visual Regression Testing (Optional)
Implement visual testing using Cypress plugins for screenshot comparison.

### Add Performance Testing (Optional)
Monitor page load times and API response times using Cypress timing features.

## Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Testing Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- [Assertions](https://docs.cypress.io/guides/references/assertions)

## Contact & Support

For issues or questions about the tests:
1. Check the test file comments for explanations
2. Review the Cypress documentation
3. Check the browser console for errors during test execution
