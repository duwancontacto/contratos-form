/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    waitForNetworkIdle(): Chainable<void>;
  }
}

Cypress.Commands.add('waitForNetworkIdle', () => {
  cy.intercept('**/*').as('networkRequests');
  cy.wait('@networkRequests', { timeout: 10000 });
}); 