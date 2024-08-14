
/// <reference types="cypress" />

type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
}

describe(' tests for BurgerConstructor `Stellar Burgers` ', () => {
  beforeEach(() => {
    cy.fixture('ingredients').as('ingredientsData');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' }).as('getIngredients')
    cy.visit('http://localhost:4000');
    
  })

  it('interception and check request of endpoint `api/ingredients`', () => {
    cy.wait('@getIngredients').then((interception) => {
      cy.get('@ingredientsData').then((ingredients) => {
        expect(interception.response?.body).to.deep.equal(ingredients)
      })
    })
  }),

  it('all ingredients are displayed', () => {
    cy.get('[data-cy-type="bun"]').should('have.length.at.least', 1);
    cy.get('[data-cy-type="main"]').should('have.length.at.least', 1);
    cy.get('[data-cy-type="sauce"]').should('have.length.at.least', 1)
  })
})