context("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("initially displays a loading indicator", () => {
    cy.findByTestId("loading").should("exist");
  });

  it("displays 'staging' Envs", () => {
    cy.findByTestId("public-url").should(
      "have.text",
      "http://localhost:3000/api/"
    );
    cy.findByTestId("public-env").should("have.text", "staging");
  });

  it("displays 'staging' API author and quote", () => {
    cy.findByTestId("quote").should(
      "have.text",
      "Life is trying things to see if they work."
    );
    cy.findByTestId("author").should("have.text", "Ray Bradbury");
  });
});
