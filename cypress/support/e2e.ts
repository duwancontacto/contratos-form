// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide XHR requests from command log
const app = window.top;
if (app) {
  app.console.log = () => {};
}

// Hide fetch requests from command log
Cypress.on('uncaught:exception', () => {
  return false;
});

// Add custom command for waiting for network requests to complete
Cypress.Commands.add('waitForNetworkIdle', () => {
  cy.intercept('**/*').as('networkRequests');
  cy.wait('@networkRequests', { timeout: 10000 });
}); 