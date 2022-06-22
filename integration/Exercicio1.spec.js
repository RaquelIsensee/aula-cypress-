/// <reference types="cypress" />
const dadosLogin = {
    USUARIO: "standard_user",
    USUARIO_BLOQUEADO: "locked_out_user",
    SENHA: "secret_sauce"
}
describe('Testes da Funcionalidade ABC', () => {
    beforeEach(()=>{
        cy.VisitURL()
    })
    it('Login com sucesso', () => {
        cy.login(dadosLogin.USUARIO,dadosLogin.SENHA)
        cy.get('.title').contains("Products")
    });
    it('Realizar compra', () => {
        cy.login(dadosLogin.USUARIO, dadosLogin.SENHA)
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').contains('Sauce Labs Backpack')
        cy.get('.inventory_item_price').contains('29.99')
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Raquel')
        cy.get('[data-test="lastName"]').type('Isensee')
        cy.get('[data-test="postalCode"]').type('123456')
        cy.get('[data-test="continue"]').click()

        cy.get('.inventory_item_name').contains('Sauce Labs Backpack')
        cy.get('.inventory_item_price').contains('29.99')
        cy.contains('Checkout: Overview')
        cy.get('[data-test="finish"]').click()
        cy.contains('THANK YOU FOR YOUR ORDER')

    });
    it('Login usuario bloqueado', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.login(dadosLogin.USUARIO_BLOQUEADO, dadosLogin.SENHA)
        cy.get('[data-test="error"]').contains("Epic sadface: Sorry, this user has been locked out.")
        });
    
});

