describe("Login screen", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Visit login page", () => {
        cy.contains("Iniciar sesión");
    });

    it("Incorrect email format (not email)", () => {
        cy.get('input[name="email"]').type("incorrectemailformat");
        cy.get('input[name="password"]').type("password1");

        cy.get('button[type="submit"]').click();

        cy.contains("Email inválido");
    });

    it("Incorrect email format (empty)", () => {
        cy.get('input[name="password"]').type("password1");

        cy.get('button[type="submit"]').click();

        cy.contains("El email es obligatorio");
    });

    it("Incorrect password format (short)", () => {
        cy.get('input[name="email"]').type("incorrectemailformat");
        cy.get('input[name="password"]').type("pas");

        cy.get('button[type="submit"]').click();

        cy.contains("La contraseña debe tener al menos 6 caracteres");
    });

    it("Incorrect password format (empty)", () => {
        cy.get('input[name="email"]').type("incorrectemailformat");

        cy.get('button[type="submit"]').click();

        cy.contains("La contraseña es obligatoria");
    });

    it("Incorrect user login", () => {
        cy.get('input[name="email"]').type("incorrectuser@gmail.com");
        cy.get('input[name="password"]').type("password1");

        cy.get('button[type="submit"]').click();

        cy.contains("Invalid credentials");
        cy.url().should("not.include", "/home");
    });

    it("Successful login", () => {
        cy.get('input[name="email"]').type("user1@gmail.com");
        cy.get('input[name="password"]').type("password1");

        cy.get('button[type="submit"]').click();

        cy.url().should("include", "/home");
    });
});