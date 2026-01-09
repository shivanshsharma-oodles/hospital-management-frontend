/// <reference types="cypress" />

// Custom command for patient login
Cypress.Commands.add('loginAsPatient', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('input[placeholder*="email"], input[placeholder*="Email"]').type(email);
    cy.get('input[placeholder*="password"], input[placeholder*="Password"]').type(password);
    cy.get('button[type="submit"]').click();

    // using regex to acknowledge both possibilities.
    // either user redirected to user dashboard (single role) or choose role (multi role)
    cy.url().should('match', /\/patient\/dashboard|\/doctor\/dashboard|\/choose-role/);
});

// Custom command for admin login
Cypress.Commands.add('loginAsAdmin', (email: string, password: string) => {
    cy.visit('/admin-login');
    cy.get('input[placeholder*="email"], input[placeholder*="Email"]').type(email);
    cy.get('input[placeholder*="password"], input[placeholder*="Password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin/dashboard');
});


Cypress.Commands.add('selectRole', (role: 'PATIENT' | 'DOCTOR' | 'ADMIN') => {
    // 1. Text convert as like in UI (Ex: PATIENT -> Patient)
    const formattedRole = role.charAt(0) + role.slice(1).toLowerCase();

    // 2. find Card or generic text which contains "Continue as Patient"
    cy.contains(`Continue as ${formattedRole}`, { timeout: 10000 })
        .should('be.visible')
        .click({ force: true }); // force: true if click is missed because of animation

    // 3. Verification
    cy.url().should('include', `/${role.toLowerCase()}/dashboard`);
});

// Custom command to clear auth token (logout)
Cypress.Commands.add('logout', () => {
    cy.window().then((win) => {
        win.localStorage.removeItem('authToken');
        win.sessionStorage.clear();
    });
    cy.visit('/login');
});

// Custom command to check if user is authenticated
Cypress.Commands.add('checkAuthToken', () => {
    cy.window().then((win) => {
        expect(win.localStorage.getItem('authToken')).to.not.be.null;
    });
});