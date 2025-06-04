describe("Login screen", () => {
    it("Visit login page", () => {
        cy.visit("/");
        cy.contains("Iniciar sesión");
    });


    it("Login with user1", () => {
        cy.visit("/");

        // Completa usuario y contraseña
        cy.get('input[name="email"]').type("user1@gmail.com");
        cy.get('input[name="password"]').type("password1");

        // Envía el formulario
        cy.get('button[type="submit"]').click();

        // Chequea que el login fue exitoso
        cy.contains("Bienvenido, usuario1");
    });
});