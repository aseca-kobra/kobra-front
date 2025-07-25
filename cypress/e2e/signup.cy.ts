describe("Signup screen", () => {
    const randomUser = `user${Date.now()}`;

    beforeEach(() => {
        cy.visit("/");
        cy.contains("button", "¿No tienes una cuenta? Regístrate").click();
    });

    it("Visit signup page", () => {
        cy.contains("Crear cuenta");
    });

    it("Invalid name format (empty)", () => {
        cy.get('input[name="email"]').type(`user${randomUser}@example.com`);
        cy.get('input[name="password"]').type("Password123!");
        cy.get('input[name="confirmPassword"]').type("Password123!");

        cy.get('button[type="submit"]').click();
        cy.contains("El nombre es obligatorio");
    });

    it("Invalid email format (empty)", () => {
        cy.get('input[name="name"]').type(randomUser);
        cy.get('input[name="password"]').type("Password123!");
        cy.get('input[name="confirmPassword"]').type("Password123!");

        cy.get('button[type="submit"]').click();
        cy.contains("El email es obligatorio");
    });

    it("Invalid email format (invalid email)", () => {
        cy.get('input[name="name"]').type(randomUser);
        cy.get('input[name="email"]').type("incorrectemailformat");
        cy.get('input[name="password"]').type("Password123!");
        cy.get('input[name="confirmPassword"]').type("Password123!");

        cy.get('button[type="submit"]').click();
        cy.contains("Email inválido");
    });

    it("Invalid password format (empty)", () => {
        cy.get('input[name="name"]').type(randomUser);
        cy.get('input[name="email"]').type(`user${randomUser}@example.com`);
        cy.get('input[name="confirmPassword"]').type("Password123!");

        cy.get('button[type="submit"]').click();
        cy.contains("La contraseña es obligatoria");
    });

    it("Invalid password format (short)", () => {
        cy.get('input[name="name"]').type(randomUser);
        cy.get('input[name="email"]').type(`user${randomUser}@example.com`);
        cy.get('input[name="password"]').type("pas");
        cy.get('input[name="confirmPassword"]').type("pas");

        cy.get('button[type="submit"]').click();
        cy.contains("La contraseña debe tener al menos 6 caracteres");
    });

    it("Failed signup (email already exists)", () => {
        cy.get('input[name="name"]').type("user1");
        cy.get('input[name="email"]').type("user1@example.com");
        cy.get('input[name="password"]').type("Password123!");
        cy.get('input[name="confirmPassword"]').type("Password123!");

        cy.get('button[type="submit"]').click();

        cy.contains("Email already exists");
    });

    it("Successful signup", () => {
        cy.get('input[name="name"]').type(randomUser);
        cy.get('input[name="email"]').type(`user${randomUser}@example.com`);
        cy.get('input[name="password"]').type("Password123!");
        cy.get('input[name="confirmPassword"]').type("Password123!");

        cy.get('button[type="submit"]').click();

        cy.contains("Iniciar sesión");
    });

    it("Successful login with new user", () => {
        cy.visit("/");

        cy.get('input[name="email"]').type(`user${randomUser}@example.com`);
        cy.get('input[name="password"]').type("Password123!");

        cy.get('button[type="submit"]').click();

        cy.url().should("include", "/home");
    });
});