
/// <reference types="cypress" />

describe(' tests for BurgerConstructor `Stellar Burgers` ', () => {
  beforeEach(() => {
    cy.fixture('ingredients').as('ingredientsData');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' }).as('getIngredients')
    cy.visit('http://localhost:4000');
    
  })

  afterEach(() => {
    cy.clearAllCookies()
  })

  describe('data received and displayed', () => {
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
  }), 

  describe('all ingredients are added to the constructor', () => {
    it('the buns are added', () => {
      cy.get('[data-cy-type="bun"]').first().within(() => {
        cy.get('button').contains('Добавить').click()
      });

      cy.get('[data-cy="bun-top"]').should('exist').then((bun) => {
        const addedBunTopId = bun.attr('data-cy-id');
        cy.log('Added bun top ID:', addedBunTopId);
        expect(addedBunTopId).to.exist;
      })

      cy.get('[data-cy="bun-bottom"]').should('exist').then((bun) => {
        const addedBunBottomId = bun.attr('data-cy-id');
        expect(addedBunBottomId).to.exist;
      })

      cy.fixture('ingredients').then((data) => {
        const ingredients =  data.data;
        const buns = ingredients.filter((item => item.type === 'bun'));
        const bunsIds = buns.map(item => item._id);

        cy.get('[data-cy="bun-top"], [data-cy="bun-bottom"]').then((buns) => {
          const addedBunsIds = buns.toArray().map((bun) => bun.getAttribute('data-cy-id'));
          const isBunInConstructor = bunsIds.some(bunId => addedBunsIds.includes(bunId));
          expect(isBunInConstructor).to.be.true;
        })
      })
    }),

    it('the filling are added', () => {
      cy.get('[data-cy-type="main"], [data-cy-type="sauce"]').first().within(() => {
        cy.get('button').contains('Добавить').click()
      });

      cy.get('[data-cy="ingredient"]').should('exist').then((ingredient) => {
        const addedIngredientId = ingredient.attr('data-cy-id');
        expect(addedIngredientId).to.exist;
      });

      cy.fixture('ingredients').then((data) => {
        const ingredients = data.data;
        const fillingIngredients = ingredients.filter((item => item.type === 'main' || item.type === 'sauce'));
        const fillingIds = fillingIngredients.map(item => item._id);
      
        cy.get('[data-cy="ingredient"]').then((ingredients) => {
          const addedIngredientIds = ingredients.toArray().map((ingredient) => ingredient.getAttribute('data-cy-id'));
          const isIngredientInConstructor = fillingIds.some(fillingId => addedIngredientIds.includes(fillingId));
          expect(isIngredientInConstructor).to.be.true;
        });
      })
    })
  }),

  describe('interaction with modals', () => {
    it('the modal is opened', () => {
      cy.get('[data-cy-type="bun"], [data-cy-type="main"], [data-cy-type="sauce"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').contains('Детали ингредиента').should('be.visible');
    }),

    it('the modal is closed by click close button', () => {
      cy.get('[data-cy-type="bun"], [data-cy-type="main"], [data-cy-type="sauce"]').first().click();
      cy.get('[data-cy="modal_close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    }),

    it('the modal is closed by click overlay', () => {
      cy.get('[data-cy-type="bun"], [data-cy-type="main"], [data-cy-type="sauce"]').first().click();
      cy.get('[data-cy="overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    })
  })
})