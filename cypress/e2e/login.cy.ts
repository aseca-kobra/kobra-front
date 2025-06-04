describe("Login screen", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Visit login page", () => {
        cy.contains("Iniciar sesión");
    });

    it("Invalid email format (empty)", () => {
        cy.get('button[type="submit"]').click();
        cy.contains("El email es obligatorio");
    });

    it("Invalid email format (invalid email)", () => {
        cy.get('input[name="email"]').type("incorrectemailformat");
        cy.get('button[type="submit"]').click();
        cy.contains("Email inválido");
    });

    it("Invalid password format (empty)", () => {
        cy.get('button[type="submit"]').click();
        cy.contains("La contraseña es obligatoria");
    });

    it("Invalid password format (short)", () => {
        cy.get('input[name="password"]').type("pas");
        cy.get('button[type="submit"]').click();
        cy.contains("La contraseña debe tener al menos 6 caracteres");
    });

    it("Incorrect user login", () => {
        cy.get('input[name="email"]').type("incorrectuser@example.com");
        cy.get('input[name="password"]').type("password1");

        cy.get('button[type="submit"]').click();

        cy.contains("Invalid credentials");
        cy.url().should("not.include", "/home");
    });

    it("Successful login", () => {
        cy.get('input[name="email"]').type("user1@example.com");
        cy.get('input[name="password"]').type("password1");

        cy.get('button[type="submit"]').click();

        cy.url().should("include", "/home");
    });
});