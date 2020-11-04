/// <reference types="cypress" />

context("WeatherBoard", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully load weather data", () => {
    cy.route2("/location/search/?query=London", {
      fixture: "locations.json",
    }).as("getLocations");

    cy.route2("/location/44418", { fixture: "location.json" }).as(
      "getLocation"
    );

    cy.get("[data-testid=txt-search-input]")
      .type("London")
      .should("have.value", "London");
    cy.get("[data-testid=btn-search-input]").click();

    cy.wait(["@getLocations", "@getLocation"]);

    cy.get("[data-testid=card-weather-board]").should("exist");
  });

  it("fail load weather data", () => {
    cy.route2("/location/search/?query=London", "").as("getLocations");

    cy.get("[data-testid=txt-search-input]")
      .type("London")
      .should("have.value", "London");
    cy.get("[data-testid=btn-search-input]").click();

    cy.wait(["@getLocations"]);

    cy.get("[data-testid=card-weather-board]").should("not.exist");
  });
});
