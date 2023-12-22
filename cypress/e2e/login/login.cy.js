import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/^que eu estou na sessão de login$/, () => {
    cy.visit('/')
})

When(/^eu tento fazer login com credenciais inválidas$/, () => {
    cy.intercept('POST', 'http://localhost:8080/auth/login').as('loginCall')

    cy.fixture('user-credencials').then((dicionario) => {
        cy.get('input[name=email]').type(dicionario.usuarioInvalido.email)
        cy.get('input[name=password]').type(dicionario.usuarioInvalido.senha)
    })
    cy.get('button').click()
})

Then(/^o sistema deverá retornar uma mensagem de Usuário ou senha inválidos$/, () => {
    cy.wait('@loginCall').its('response.statusCode').should('eq', 403)

    cy.contains('Usuário ou senha inválidos').should('be.visible')
})

When(/^eu tento fazer login com credenciais válidas$/, () => {
    cy.intercept('POST', 'http://localhost:8080/auth/login').as('loginCall')

    cy.fixture('user-credencials').then((dicionario) => {
        cy.get('input[name=email]').type(dicionario.usuarioValido.email)
        cy.get('input[name=password]').type(dicionario.usuarioValido.senha)
    })
    cy.get('button').click()
})

Then(/^o sistema deverá ir para a página Home$/, () => {
    cy.wait('@loginCall').its('response.statusCode').should('eq', 200)

    cy.url().should('include', '/home')
})

When(/^eu clico no botão Cadastrar$/, () => {
    cy.get('a.link').contains('Cadastrar').click()
})

Then(/^o sistema deverá abrir a tela de cadastro de usuário$/, () => {
    cy.get('div.mat-dialog-container').should('be.visible')
})
