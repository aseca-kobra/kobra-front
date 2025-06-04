describe("Login screen", () => {
    it("Visit login page", () => {
        cy.visit("/");
        cy.contains("Iniciar sesión");
    });

    it("Incorrect email format (not email)", () => {
        cy.visit("/");

        cy.get('input[name="email"]').type("incorrectemailformat");
        cy.get('input[name="password"]').type("password1");

        cy.get('button[type="submit"]').click();

        cy.contains("Email inválido");
    });

    it("Incorrect email format (empty)", () => {
        cy.visit("/");

        cy.get('input[name="password"]').type("password1");

        cy.get('button[type="submit"]').click();

        cy.contains("El email es obligatorio");
    });

    it("Incorrect password format (short)", () => {
        cy.visit("/");

        cy.get('input[name="email"]').type("incorrectemailformat");
        cy.get('input[name="password"]').type("pas");

        cy.get('button[type="submit"]').click();

        cy.contains("La contraseña debe tener al menos 6 caracteres");
    });

    it("Incorrect password format (empty)", () => {
        cy.visit("/");

        cy.get('input[name="email"]').type("incorrectemailformat");

        cy.get('button[type="submit"]').click();

        cy.contains("La contraseña es obligatoria");
    });

    it("Incorrect user login", () => {
        cy.visit("/");

        cy.get('input[name="email"]').type("incorrectuser@gmail.com");
        cy.get('input[name="password"]').type("password1");

        cy.get('button[type="submit"]').click();

        cy.contains("Invalid credentials");
        cy.url().should("not.include", "/home");
    });

    it("Successful login", () => {
        cy.visit("/");

        cy.get('input[name="email"]').type("user1@gmail.com");
        cy.get('input[name="password"]').type("password1");

        cy.get('button[type="submit"]').click();

        cy.url().should("include", "/home");
    });
});