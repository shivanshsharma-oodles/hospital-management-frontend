/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

/**
 * Authentication Tests
 * Tests for login, signup, token handling, and auth state management
 */

describe('Authentication', () => {
  beforeEach(() => {
    cy.logout();
    cy.visit('/login');
  });
+
  describe('Patient Login', () => {
    it('should successfully log in a patient with valid credentials', () => {
      // Use valid credentials from your backend test data
      const testPatient = {
        email: 'shivansh@gmail.com',
        password: 'shivansh',
      };

      cy.get('input[placeholder*="email"], input[placeholder*="Email"]').type(testPatient.email);
      cy.get('input[placeholder*="password"], input[placeholder*="Password"]').type(testPatient.password);
      cy.get('button[type="submit"]').click();

      // Should redirect to role selection after successful login
      cy.url().should('include', '/patient/dashboard');
      cy.checkAuthToken();
    });

    it('should display error message on invalid credentials', () => {
      const invalidPatient = {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      };

      cy.get('input[placeholder*="email"], input[placeholder*="Email"]').type(invalidPatient.email);
      cy.get('input[placeholder*="password"], input[placeholder*="Password"]').type(invalidPatient.password);
      cy.get('button[type="submit"]').click();

      // Should see error notification
      cy.get('[role="status"]').should(($el) => {
        const text = $el.text().toLowerCase();
        expect(text).to.match(/invalid|failed|error/);
      });
    });

    it('should not submit form with empty email', () => {
      cy.get('input[placeholder*="password"], input[placeholder*="Password"]').type('shivansh');
      cy.get('button[type="submit"]').click();

      // Should show validation error or remain on login page
      cy.url().should('include', '/login');
    });

    it('should not submit form with empty password', () => {
      cy.get('input[placeholder*="email"], input[placeholder*="Email"]').type('shivansh@gmail.com');
      cy.get('button[type="submit"]').click();

      // Should show validation error or remain on login page
      cy.url().should('include', '/login');
    });
  });

  describe('Admin Login', () => {
    beforeEach(() => {
      cy.visit('/admin-login');
    });

    it('should successfully log in an admin with valid credentials', () => {
      const testAdmin = {
        email: 'admin@gmail.com',
        password: 'admin',
      };

      cy.get('input[placeholder*="email"], input[placeholder*="Email"]').type(testAdmin.email);
      cy.get('input[placeholder*="password"], input[placeholder*="Password"]').type(testAdmin.password);
      cy.get('button[type="submit"]').click();

      // Should redirect to admin dashboard directly
      cy.url().should('include', '/admin/dashboard');
      cy.checkAuthToken();
    });

    it('should display error message for invalid admin credentials', () => {
      const invalidAdmin = {
        email: 'notadmin@gmail.com',
        password: 'wrongpass',
      };

      cy.get('input[placeholder*="email"], input[placeholder*="Email"]').type(invalidAdmin.email);
      cy.get('input[placeholder*="password"], input[placeholder*="Password"]').type(invalidAdmin.password);
      cy.get('button[type="submit"]').click();

      cy.get('[role="status"]').should(($el) => {
        const text = $el.text().toLowerCase();
        expect(text).to.match(/invalid|failed|error/);
      });
    });
  });

  describe('Patient Signup', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });

    it('should successfully register a new patient and log in', () => {
      const newPatient = {
        email: `patient${Date.now()}@example.com`,
        password: 'patient123',
        name: 'Test Patient',
        phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      };

      // --- STEP 1: SIGNUP ---
      cy.visit('/signup');
      cy.get('input[placeholder*="name"], input[placeholder*="Name"]').type(newPatient.name);
      cy.get('input[placeholder*="email"], input[placeholder*="Email"]').type(newPatient.email);
      cy.get('input[placeholder*="phone"], input[placeholder*="Phone"]').type(newPatient.phone);
      cy.get('input[placeholder*="password"], input[placeholder*="Password"]').type(newPatient.password);

      cy.get('button[type="submit"]').click();

      // --- STEP 2: LOGIN (Mandatory) ---
      // Wait for redirect to login page
      cy.url().should('include', '/login');

      cy.get('input[placeholder*="email"], input[placeholder*="Email"]').type(newPatient.email);
      cy.get('input[placeholder*="password"], input[placeholder*="Password"]').type(newPatient.password);
      cy.get('button[type="submit"]').click();

      // --- STEP 3: VERIFY ---
      cy.url().should('include', '/dashboard');
      cy.checkAuthToken();
    });

    it('should display error when email already exists', () => {
      const existingPatient = {
        email: 'shivansh@gmail.com', // Assuming this patient already exists
        password: 'shivansh',
        name: 'Shivansh',
        phone: '1234569870',
      };

      cy.get('input[placeholder*="name"], input[placeholder*="Name"]').type(existingPatient.name);
      cy.get('input[placeholder*="email"], input[placeholder*="Email"]').type(existingPatient.email);
      cy.get('input[placeholder*="phone"], input[placeholder*="Phone"]').type(existingPatient.phone);
      cy.get('input[placeholder*="password"], input[placeholder*="Password"]').first().type(existingPatient.password);

      cy.get('button[type="submit"]').click();

      // Should show error about email already in use
      cy.get('[role="status"]').should(($el) => {
        const text = $el.text().toLowerCase();
        expect(text).to.match(/exist|already|email/);
      });
    });
  });

  describe('Token Management', () => {
    it('should store JWT token in localStorage after login', () => {
      const testPatient = {
        email: 'shivansh@gmail.com',
        password: 'shivansh',
      };

      cy.loginAsPatient(testPatient.email, testPatient.password);

      cy.window().then((win) => {
        const token = win.localStorage.getItem('authToken');
        expect(token).to.exist;

        // Regex: .replace(/"/g, '') 
        const cleanToken = token.replace(/"/g, '');
        expect(cleanToken).to.match(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
      });
    });

    it('should remove token on logout', () => {
      const testPatient = {
        email: 'shivansh@gmail.com',
        password: 'shivansh',
      };

      cy.loginAsPatient(testPatient.email, testPatient.password);
      cy.checkAuthToken();

      cy.logout();

      cy.window().then((win) => {
        const token = win.localStorage.getItem('authToken');
        expect(token).to.be.null;
      });
    });

    it('should persist token across page reloads', () => {
      const testPatient = {
        email: 'shivansh@gmail.com',
        password: 'shivansh',
      };

      cy.loginAsPatient(testPatient.email, testPatient.password);

      cy.window().then((win) => {
        const token = win.localStorage.getItem('authToken');
        expect(token).to.exist;

        // Reload page
        cy.reload();

        // Token should still exist
        cy.window().then((reloadedWin) => {
          expect(reloadedWin.localStorage.getItem('authToken')).to.equal(token);
        });
      });
    });
  });

  describe('Role Selection', () => {
    it('should navigate to patient dashboard when PATIENT role is selected', () => {
      const testPatient = {
        email: 'jenny@gmail.com',
        password: '9080706050',
      };

      cy.loginAsPatient(testPatient.email, testPatient.password);
      cy.selectRole('PATIENT');

      cy.url().should('include', '/patient/dashboard');
    });

    it('should navigate to doctor dashboard when DOCTOR role is selected', () => {
      const testDoctor = {
        email: 'jenny@gmail.com',
        password: '9080706050',
      };

      cy.loginAsPatient(testDoctor.email, testDoctor.password);
      cy.selectRole('DOCTOR');

      cy.url().should('include', '/doctor/dashboard');
    });

    it('should prevent access to other role dashboards without permission', () => {
      const testPatient = {
        email: 'shivansh@gmail.com',
        password: 'shivansh',
      };

      cy.loginAsPatient(testPatient.email, testPatient.password);

      // Wait for initial dashboard to load (Confirming user is logged in)
      cy.url().should('include', '/patient/dashboard');

      // now manually try to acess doctor dashboard
      cy.visit('/doctor/dashboard');

      // ProtectedLayout will catch this ad will redirect to patient dashboard
      // So, we check that is not URL /doctor/dashboard
      cy.url().should('not.include', '/doctor/dashboard');
      cy.url().should('include', '/patient/dashboard'); // Wapas redirect ho gaya
    });
  });

  describe('Protected Routes', () => {
    it('should redirect to login when accessing protected route without token', () => {
      cy.logout();
      cy.visit('/patient/dashboard');

      cy.url().should('include', '/login');
    });

    it('should redirect to login when accessing role-protected route without proper auth', () => {
      cy.logout();
      cy.visit('/doctor/appointments');

      cy.url().should('include', '/login');
    });

    it('should allow access to protected route with valid token', () => {
      const testPatient = {
        email: 'shivansh@gmail.com',
        password: 'shivansh',
      };

      cy.loginAsPatient(testPatient.email, testPatient.password);

      cy.visit('/patient/appointments');
      cy.url().should('include', '/patient/appointments');
    });
  });
});
