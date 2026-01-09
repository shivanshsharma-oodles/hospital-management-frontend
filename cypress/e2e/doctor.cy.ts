/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

/**
 * Doctor Features Tests
 * Tests for doctor dashboard, managing slots, viewing appointments, completing appointments with medical records
 */

describe('Doctor Features', () => {
  const testDoctor = {
    email: 'jonas@gmail.com',
    password: 'jonas',
  };

  beforeEach(() => {
    // Custom command handles the /login -> / -> /dashboard or /choose-role flow
    cy.loginAsPatient(testDoctor.email, testDoctor.password);

    // If Jonas has multiple roles, we must select DOCTOR to enter the DoctorLayout
    cy.url().then((url) => {
      if (url.includes('/choose-role')) {
        cy.selectRole('DOCTOR');
      }
    });
  });

  describe('Doctor Dashboard', () => {
    it('should display doctor dashboard with key sections', () => {
      cy.visit('/doctor/dashboard');
      cy.url().should('include', '/doctor/dashboard');

      // Check for dashboard content
      cy.get('div, h1, h2, h3').should('have.length.greaterThan', 0);
    });

    it('should display doctor profile information', () => {
      cy.visit('/doctor/dashboard');

      // 1. Wait for the Loader to disappear (important for stability)
      cy.get('[data-slot="loader"], .spinner, :contains("Loading")', { timeout: 10000 }).should('not.exist');

      // 2. Use cy.contains to wait for the specific text pattern "Welcome! Dr."
      // This is much more reliable than looping through all divs
      cy.contains('h1', /Welcome! Dr\./i, { timeout: 10000 }).should('be.visible');

      // 3. Verify the specific doctor name is rendered (assuming 'Jonas' is returned by mock/seed)
      cy.get('h1').should(($h1) => {
        const text = $h1.text();
        // Ensure it doesn't just show the fallback "Welcome! Dr. Doctor"
        expect(text).to.not.equal("Welcome! Dr. Doctor");
        expect(text.length).to.be.greaterThan(12); // Length of "Welcome! Dr. "
      });
    });

    it('should have navigation links to appointments and slots', () => {
      cy.visit('/doctor/dashboard');

      // Check for links to appointments and slots
      cy.contains('a, button', /appointments/i).should('exist');
      cy.contains('a, button', /slots/i).should('exist');
    });

    it('should display appointment statistics or summary if available', () => {
      cy.visit('/doctor/dashboard');

      // Look for statistics, counters, or summary cards (later)
      // cy.get('div, span, p').then(($elements) => {
      //   const hasStats = Array.from($elements).some((el) =>
      //     el.textContent?.includes('Appointment') ||
      //     el.textContent?.includes('Patient') ||
      //     el.textContent?.includes('Schedule')
      //   );
      //   expect(hasStats).to.be.true;
      // });
    });
  });


  describe('Manage Slots', () => {
    beforeEach(() => {
      // Ensure we are on the slots management page
      cy.visit('/doctor/slots');
    });

    it('should handle slots list or empty state correctly', () => {
      cy.visit('/doctor/slots');

      // 1. Wait for loading to finish
      cy.contains('div', 'Loading slots...', { timeout: 10000 }).should('not.exist');

      // 2. wait for any identifying element to appear
      // This ensures React has finished rendering the final state
      cy.get('body').should(($body) => {
        const hasSlots = $body.find('.grid div.border.rounded-lg').length > 0;
        const isEmpty = $body.find('h3:contains("No Slots Available")').length > 0;

        // retry test till one of them gets true.
        expect(hasSlots || isEmpty, "Expected to find either slots or empty state message").to.be.true;
      });

      // 3. Now perform the final check safely
      cy.get('body').then(($body) => {
        if ($body.find('h3:contains("No Slots Available")').length > 0) {
          cy.log('STATUS: Empty state detected');
          cy.get('h3').contains('No Slots Available').should('be.visible');
          cy.get('p').contains(/Create slots/i).should('be.visible');
        } else {
          cy.log('STATUS: Slots detected');
          cy.get('.grid > div').should('have.length.greaterThan', 0);
          cy.get('.grid').contains(/:[0-9]{2}/).should('be.visible'); // Matches time format
        }
      });
    });

    it('should display slot details (date, start-time, end-time) within slot cards', () => {
      cy.visit('/doctor/slots');

      // 1. Wait for loading to finish to avoid race conditions
      cy.contains('div', 'Loading slots...', { timeout: 10000 }).should('not.exist');

      // 2. Check for the container

      cy.get('body').should(($body) => {
        const hasSlots = $body.find('.grid div.border.rounded-lg').length > 0;
        const isEmpty = $body.find('h3:contains("No Slots Available")').length > 0;

        // retry test till one of them gets true.
        expect(hasSlots || isEmpty, "Expected to find either slots or empty state message").to.be.true;
      });

      cy.get('body').then(($body) => {
        if ($body.find('h3:contains("No Slots Available")').length > 0) {
          cy.log('Skipping content check: No slots currently exist');
          cy.contains('h3', 'No Slots Available').should('be.visible');
        } else {
          // 3. TARGETED CHECK: Ensure the grid has cards
          cy.get('.grid div.border.rounded-lg').first().within(() => {

            // Verify Date format (e.g., "09 January 2026")
            cy.contains(/[0-9]{2} [A-Z][a-z]+ 202[0-9]/).should('be.visible');

            // Verify Time format (e.g., "09:50 AM")
            cy.contains(/[0-9]{1,2}:[0-9]{2}/).should('be.visible');
          });
        }
      });
    });

    it('should allow adding a new slot via modal', () => {
      cy.visit('/doctor/slots');

      // Click the Add Slot button
      cy.contains('button', /Add Slot/i).click();

      // Scope testing inside the Modal/Dialog
      cy.get('[role="dialog"]').within(() => {
        // Format: YYYY-MM-DD for HTML5 date inputs
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 2); // 2 days in future to avoid today logic.
        const dateString = futureDate.toLocaleDateString('sv-SE');

        // Generate a random start hour based on the current timestamp 
        const randomHour = Math.floor(Math.random() * 12) + 8; // Random hour between 8 AM and 8 PM
        const startTime = `${String(randomHour).padStart(2, '0')}:00`;
        const endTime = `${String(randomHour).padStart(2, '0')}:30`;

        // Type for test
        cy.get('input[type="date"]').type(dateString);
        cy.get('input[type="time"]').first().type(startTime); // Start Time
        cy.get('input[type="time"]').last().type(endTime);  // End Time

        cy.get('button').contains(/Add Slot/i).click();
      });

      // Verification of success toast
      cy.get('[role="status"]').should('be.visible');
    });

    it('should show error when creating a slot for a past date', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const pastDate = yesterday.toLocaleDateString('sv-SE');

      cy.contains('button', /Add Slot/i).click();
      cy.get('[role="dialog"]').within(() => {
        cy.get('input[type="date"]').type(pastDate);
        cy.get('input[type="time"]').first().type('10:00');
        cy.get('input[type="time"]').last().type('11:00');
        cy.get('button').contains(/Add Slot/i).click();
      });

      // Check for the specific error message from your showError utility
      cy.get('[role="status"]').should('contain', 'Cannot create a slot for a past date');
    });

    it('should show error when slots overlap', () => {
      const futureDate = '2026-12-25';

      // 1. Create the first slot
      cy.contains('button', /Add Slot/i).click();
      cy.get('[role="dialog"]').within(() => {
        cy.get('input[type="date"]').type(futureDate);
        cy.get('input[type="time"]').first().type('14:00');
        cy.get('input[type="time"]').last().type('15:00');
        cy.get('button').contains(/Add Slot/i).click();
      });

      // WAIT for the modal to close before continuing
      cy.get('button').contains(/Cancel/i).click()
      cy.get('[role="dialog"]').should('not.exist');

      // 2. Try creating the same slot again
      // Use {force: true} because Radix UI sometimes keeps the scroll lock on the body too long
      cy.contains('button', /Add Slot/i).click({ force: true });

      cy.get('[role="dialog"]').within(() => {
        cy.get('input[type="date"]').type(futureDate);
        cy.get('input[type="time"]').first().type('14:00');
        cy.get('input[type="time"]').last().type('15:00');
        cy.get('button').contains(/Add Slot/i).click();
      });

      // 3. Verify the overlap error message
      // Since this is an error, look for "overlaps" or the specific backend message
      cy.get('[role="status"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'overlaps');
    });

    it('should allow deleting an existing slot', () => {
      cy.visit('/doctor/slots');

      // Ensure table/slots have loaded first
      cy.contains('button', /Delete/i).should('be.visible');

      // 1. Click initial delete
      cy.contains('button', /Delete/i).first().click();

      // 2. Click confirm in modal
      cy.get('[role="dialog"]').within(() => {
        // We use force: true because of Radix UI body-lock
        cy.contains('button', /Confirm|Delete/i).click({ force: true });
      });

      // 3. Verify success (This will only pass if API returns 2xx, not 500)
      cy.get('[role="status"]', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Slot Deleted');
    });

  });


  describe('Doctor Appointments Management', () => {
    beforeEach(() => {
      // Navigate to appointments
      cy.visit('/doctor/appointments');
      // wait for the page container to load.
      cy.contains('h1', /Manage Appointments/i).should('be.visible');
    });

    it('should filter appointments using tabs and handle empty states', () => {
      // 1. Check Requests tab
      cy.contains('button', /Requests/i).click();
      cy.get('body').then(($body) => {
        if ($body.text().includes('No appointments found')) {
          cy.contains('No appointments found in this category.').should('be.visible');
        } else {
          cy.get('table').should('be.visible');
        }
      });

      // // 2. Check Scheduled tab
      cy.contains('button', /Scheduled/i).click();
      cy.get('body').then(($body) => {
        if ($body.text().includes('No appointments found')) {
          cy.contains('No appointments found in this category.').should('be.visible');
        } else {
          cy.get('table').should('be.visible');
          cy.contains('td', 'Patient').should('be.visible');
        }
      });

      // 3. Check Completed tab
      cy.contains('button', /Completed/i).click();
      cy.get('body').then(($body) => {
        if ($body.text().includes('No appointments found')) {
          cy.contains('No appointments found in this category.').should('be.visible');
        } else {
          cy.get('table').should('be.visible');
          cy.contains('td', 'Patient').should('be.visible');
        }
      });

      // 4. Check Cancelled tab
      cy.contains('button', /Cancelled/i).click();
      cy.get('body').then(($body) => {
        if ($body.text().includes('No appointments found')) {
          cy.contains('No appointments found in this category.').should('be.visible');
        } else {
          cy.get('table').should('be.visible');
          cy.contains('td', 'Patient').should('be.visible');
        }
      });
    });

    it('should allow Accepting a pending appointment', () => {
      cy.contains('button', /Requests/i).click();

      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Accept")').length > 0) {
          cy.contains('button', 'Accept').first().click();
          cy.get('[role="status"]', { timeout: 10000 }).should('be.visible');
        } else {
          cy.log('Skipping Accept test: No pending appointments found.');
        }
      });
    });

    it('should allow Rejecting a pending appointment', () => {
      cy.contains('button', /Requests/i).click();

      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Reject")').length > 0) {
          cy.contains('button', 'Reject').first().click();
          cy.get('[role="status"]', { timeout: 10000 }).should('be.visible');
        } else {
          cy.log('Skipping Reject test: No pending appointments found.');
        }
      });
    });

    it('should complete a scheduled appointment from the table', () => {
      cy.contains('button', /Scheduled/i).click();

      cy.get('body').then(($body) => {
        if ($body.text().includes('No appointments found')) {
          cy.contains('No appointments found in this category.').should('be.visible');
        } else {
          cy.get('table').then(($table) => {
            // Check if table has rows and the specific button
            const completeBtn = $table.find('button:contains("Complete")');

            if (completeBtn.length > 0) {
              cy.wrap(completeBtn).first().click();
              cy.url().should('include', '/complete');

              // Form Fill
              cy.get('textarea[name="symptoms"]').type('Symptoms text');
              cy.get('textarea[name="diagnosis"]').type('Diagnosis text');
              cy.get('textarea[name="prescription"]').type('Prescription text');
              cy.get('button[type="submit"]').click();

              // Success Modal
              cy.get('[role="dialog"]').within(() => {
                cy.contains('Medical Record Added').should('be.visible');
                cy.contains('button', 'Close').click();
              });
            } else {
              cy.log('No "Complete" button found in Scheduled table.');
            }
          });
        }
      });
    });

    it('should cancel a scheduled appointment from the table', () => {
      cy.contains('button', /Scheduled/i).click();

      cy.get('body').then(($body) => {
        if ($body.text().includes('No appointments found')) {
          cy.contains('No appointments found in this category.').should('be.visible');
        } else {
          cy.get('table').then(($table) => {
            const cancelBtn = $table.find('button:contains("Cancel")');

            if (cancelBtn.length > 0) {
              cy.wrap(cancelBtn).first().click();

              cy.get('[role="status"]').should('be.visible');
              cy.contains(/cancelled|success/i).should('be.visible');
            } else {
              cy.log('No "Cancel" button found in Scheduled table.');
            }
          });
        }
      });

    });

    it('should allow viewing prescription details for completed appointments', () => {

      cy.contains('button', /Completed/i).click();
      cy.get('body').then(($body) => {
        if ($body.text().includes('No appointments found')) {
          cy.contains('No appointments found in this category.').should('be.visible');
        } else {
          cy.get('table').should('be.visible');
          if ($body.find('button:contains("View Details")').length > 0) {
            cy.contains('button', 'View Details').first().click({ force: true });

            // Should navigate to prescription page
            cy.url().should('include', '/doctor/appointment-details/');

            // Check for Prescription UI elements
            cy.contains('Symptoms').should('be.visible');
            cy.contains('Prescription').should('be.visible');
            cy.contains('Clinical Diagnosis').should('be.visible');
            cy.contains('button', /Print/i).should('be.visible').click();
          }
        }
      });
    });

  });



  // describe('Doctor Navigation', () => {
  //   it('should have working navigation between doctor pages', () => {
  //     cy.visit('/doctor/dashboard');

  //     // Navigate to appointments
  //     cy.contains('a, button', /appointment/i).click();
  //     cy.url().should('include', '/doctor/appointments');

  //     // Navigate to slots
  //     cy.contains('a, button', /slot/i).click();
  //     cy.url().should('include', '/doctor/slots');

  //     // Navigate back to dashboard
  //     cy.contains('a, button', /dashboard|home/i).click();
  //     cy.url().should('include', '/doctor/dashboard');
  //   });

  //   it('should preserve doctor session while navigating', () => {
  //     cy.visit('/doctor/dashboard');
  //     cy.checkAuthToken();

  //     cy.visit('/doctor/appointments');
  //     cy.checkAuthToken();

  //     cy.visit('/doctor/slots');
  //     cy.checkAuthToken();
  //   });
  // });

});

