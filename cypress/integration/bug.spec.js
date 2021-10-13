describe(`inject document.domain to work with same-origin policy as 
    described in 'https://docs.cypress.io/guides/guides/web-security#Limitations'`, () => {
  const testButtonId = '#test-button';
  const expectedTestPage = '/some-other-page.html';

  beforeEach(() => cy.visit('/'));

  it('injects document.domain when only lowercase content-type header name', () => {
    cy.intercept('GET', '/some-other-page.html', { headers: { 'content-type': 'text/html'}} );
    cy.get(testButtonId).click();

    cy.location('pathname').should('eq', expectedTestPage);
  });

  it(`doesn't inject document.domain when only uppercase content-type header name`, () => {
    cy.intercept('GET', '/some-other-page.html', { headers: { 'Content-Type': 'text/html'}} );
    cy.get(testButtonId).click();

    cy.location('pathname').should('eq', expectedTestPage);
  });
});
