describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login');
    });

    it('should display an error message when login fails', () => {
        cy.get('input[name=email]').type('wronguser@example.com');
        cy.get('input[name=password]').type('wrongpassword');
        cy.get('button').click();
        cy.contains('Usuário ou senha inválidos').should('be.visible');
    });

    it('should login successfully and navigate to home', () => {
        cy.get('input[name=email]').type('deividtlima@gmail.com');
        cy.get('input[name=password]').type('D.e.4212');
        cy.get('button').click();
        cy.url().should('include', '/home');
    });

    it('should fill in email and password', () => {
        cy.get('input[name=email]').type('user@example.com');
        cy.get('input[name=password]').type('password');
    });

    it('should submit the login form', () => {
        cy.get('input[name=email]').type('user@example.com');
        cy.get('input[name=password]').type('password');
        cy.get('button').click();
    });

    it('should display an error message when login fails', () => {
        cy.get('input[name=email]').type('wronguser@example.com');
        cy.get('input[name=password]').type('wrongpassword');
        cy.get('button').click();
        cy.get('.text').should('be.visible');
    });

    it('should navigate to forgot password when clicked', () => {
        cy.get('a[href="#"]').click();
    });

    it('should open the register dialog when clicked', () => {
        cy.get('a.link').click();
    });
});