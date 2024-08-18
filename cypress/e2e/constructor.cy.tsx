/// <reference types="cypress" />

const dataSelectors = {
  bunTop: '[data-cy="bun-top"]',
  bunBottom: '[data-cy="bun-bottom"]',
  ingredient: '[data-cy="ingredient"]',
  bunType: '[data-cy-type="bun"]',
  mainType: '[data-cy-type="main"]',
  sauceType: '[data-cy-type="sauce"]',
  modal: '[data-cy="modal"]',
  modalCloseButton: '[data-cy="modal_close-button"]',
  overlay: '[data-cy="overlay"]',
  orderButton: '[ data-cy="order-button"]'
}

describe(' tests for BurgerConstructor `Stellar Burgers` ', () => {
  beforeEach(() => {
    cy.fixture('ingredients').as('ingredientsData');
    cy.fixture('user').as('userData');
    cy.fixture('userOrder').as('userOrderData');

    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user' }).as('getUser');
    cy.intercept('POST', '/api/orders', { fixture: 'userOrder' }).as('postToOrders');

    cy.visit('/');
    cy.setCookie('accessToken', 'newAccessToken');
    cy.setCookie('refreshToken', 'newRefreshToken');

    cy.wait('@getUser');
    cy.wait('@getIngredients');
  })

  afterEach(() => {
    cy.clearAllCookies();
    localStorage.clear();
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
      cy.get(dataSelectors.bunType).should('have.length.at.least', 1);
      cy.get(dataSelectors.mainType).should('have.length.at.least', 1);
      cy.get(dataSelectors.sauceType).should('have.length.at.least', 1)
    })
  }), 

  describe('all ingredients are added to the constructor', () => {
    it('the buns are added', () => {
      cy.get(dataSelectors.bunType).first().within(() => {
        cy.get('button').contains('Добавить').click()
      });

      cy.get(dataSelectors.bunTop).should('exist').then((bun) => {
        const addedBunTopId = bun.attr('data-cy-id');
        expect(addedBunTopId).to.exist;
      })

      cy.get(dataSelectors.bunBottom).should('exist').then((bun) => {
        const addedBunBottomId = bun.attr('data-cy-id');
        expect(addedBunBottomId).to.exist;
      })

      cy.fixture('ingredients').then((data) => {
        const ingredients =  data.data;
        const buns = ingredients.filter((item => item.type === 'bun'));
        const bunsIds = buns.map(item => item._id);

        cy.get(`${dataSelectors.bunTop, dataSelectors.bunBottom}`).then((buns) => {
          const addedBunsIds = buns.toArray().map((bun) => bun.getAttribute('data-cy-id'));
          const isBunInConstructor = bunsIds.some(bunId => addedBunsIds.includes(bunId));
          expect(isBunInConstructor).to.be.true;
        })
      })
    }),

    it('the filling are added', () => {
      cy.get(`${dataSelectors.mainType, dataSelectors.sauceType}`).first().within(() => {
        cy.get('button').contains('Добавить').click()
      });

      cy.get(dataSelectors.ingredient).should('exist').then((ingredient) => {
        const addedIngredientId = ingredient.attr('data-cy-id');
        expect(addedIngredientId).to.exist;
      });

      cy.fixture('ingredients').then((data) => {
        const ingredients = data.data;
        const fillingIngredients = ingredients.filter((item => item.type === 'main' || item.type === 'sauce'));
        const fillingIds = fillingIngredients.map(item => item._id);
      
        cy.get(dataSelectors.ingredient).then((ingredients) => {
          const addedIngredientIds = ingredients.toArray().map((ingredient) => ingredient.getAttribute('data-cy-id'));
          const isIngredientInConstructor = fillingIds.some(fillingId => addedIngredientIds.includes(fillingId));
          expect(isIngredientInConstructor).to.be.true;
        });
      })
    })
  }),

  describe('interaction with modals', () => {
    it('the modal is opened', () => {
      cy.get(`${dataSelectors.bunType, dataSelectors.mainType, dataSelectors.sauceType}`).first().click();
      cy.get(dataSelectors.modal).should('be.visible');
      cy.get(dataSelectors.modal).contains('Детали ингредиента').should('be.visible');
    }),

    it('the modal is closed by click close button', () => {
      cy.get(`${dataSelectors.bunType, dataSelectors.mainType, dataSelectors.sauceType}`).first().click();
      cy.get(dataSelectors.modalCloseButton).click();
      cy.get(dataSelectors.modal).should('not.exist');
    }),

    it('the modal is closed by click overlay', () => {
      cy.get(`${dataSelectors.bunType, dataSelectors.mainType, dataSelectors.sauceType}`).first().click();
      cy.get(dataSelectors.overlay).click({ force: true });
      cy.get(dataSelectors.modal).should('not.exist');
    })
  }),

  describe('the order placed successfully', () => {
    it('the placing after authorization', () => {
      cy.get(dataSelectors.bunType).first().within(() => {
        cy.get('button').contains('Добавить').click();
      });
      cy.get(dataSelectors.mainType).first().within(() => {
        cy.get('button').contains('Добавить').click();
      });
      cy.get(dataSelectors.sauceType).first().within(() => {
        cy.get('button').contains('Добавить').click();
      });

      cy.get(dataSelectors.orderButton).should('exist').click();
      cy.wait('@postToOrders');

      cy.get(dataSelectors.modal).contains('идентификатор заказа').should('be.visible');
      cy.contains('66123').should('exist');
      cy.get(dataSelectors.modalCloseButton).click();
      cy.get(dataSelectors.modal).should('not.exist');

      cy.get(dataSelectors.bunTop).should('not.exist');
      cy.get(dataSelectors.bunBottom).should('not.exist');
      cy.get(dataSelectors.ingredient).should('not.exist');
    })
  })
})