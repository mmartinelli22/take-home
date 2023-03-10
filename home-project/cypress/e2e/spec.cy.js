describe('user flow', () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=eV5AfvtU754uWNOdA41xv0eG5YGvdUAx",
      {
        fixture: "/example.json",
      }
    )
      .as("sampleData")
      .visit("http://localhost:3000");
  });
  it("Should display stubbed data as a list of articles", () => {
    cy.wait("@sampleData")
      .its("response.body.results")
      .should("have.length", 3)
      .get('.nav-container').should('exist')
      .get('.app-title').should('contain', 'NY Times News Reader')
      .get(".section-container")
      .get("p")
      .first()
      .should("contain", "BOOKS")
      .get("h2")
      .first()
      .should("contain", "15 Books Coming in November")
      .get(".byline")
      .should("contain", "By Alan Light");
  });
  it("Should lead the user to a details page on article title click", () => {
    cy.get("h2")
      .last()
      .should(
        "contain",
        "James Cameron and the Cast of ‘Avatar: The Way of Water’ Hold Their Breath"
      )
      .click()
      .url()
      .should("eq", "http://localhost:3000/Article")
      .get(".information-container")
      .should("exist")
      .get("h1")
      .should("contain", "James Cameron")
      .get(".byline")
      .should("contain", "By Kyle Buchanan")
      .get(".published")
      .should("contain", "Tuesday, October 25 2022")
      .get(".abstract")
      .should("contain", "The original was the biggest hit ever")
      .get(".anchor")
      .should("exist")
      .get("button")
      .should("contain", "Return Home");
  });
  it("Should take the user back to the article list after hitting the Return Home button", () => {
    cy.get("h2")
      .last()
      .should(
        "contain",
        "James Cameron and the Cast of ‘Avatar: The Way of Water’ Hold Their Breath"
      )
      .click()
      .url()
      .should("eq", "http://localhost:3000/Article")
      .get("button")
      .should("contain", "Return Home")
      .click()
      .url()
      .should("eq", "http://localhost:3000/");
  });
  it("Should take the user to the article page on the NY Times website", () => {
    cy.get("h2")
      .last()
      .should(
        "contain",
        "James Cameron and the Cast of ‘Avatar: The Way of Water’ Hold Their Breath"
      )
      .click()
      .url()
      .should("eq", "http://localhost:3000/Article")
      .get(".anchor")
      .then((link) => {
        cy.request(link.prop("href")).its("status").should("eq", 200);
      });
  })
})