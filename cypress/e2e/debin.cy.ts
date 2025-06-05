describe("Debin", () => {
    let initialBalance: number;

    const parseBalance = (texto: string) =>
        parseFloat(texto.replace("$", "").trim().replace(/\./g, "").replace(",", "."));

    const getBalance = () =>
        cy.get("h4.MuiTypography-h4")
            .invoke("text")
            .then(parseBalance);

    beforeEach(() => {
        cy.visit("/");
        cy.get('input[name="email"]').type("user1@example.com");
        cy.get('input[name="password"]').type("password1");
        cy.get('button[type="submit"]').click();

        getBalance().then((balance) => {
            initialBalance = balance;
        });
        cy.get('button[name="debin"]').click();
    });

    it("Invalid debin (empty amount)", () => {
        cy.get('button[name="confirm"]').click();
        cy.contains("Por favor ingrese un monto válido");
        cy.get('button[name="cancel"]').click();

        getBalance().should("equal", initialBalance);
    });

    it("Invalid debin (not enough money in bank)", () => {
        cy.get('input[name="amount"]').type("10000000000000");
        cy.get('button[name="confirm"]').click();
        cy.contains("No hay saldo suficiente en la cuenta");
        cy.get('button[name="cancel"]').click();

        getBalance().should("equal", initialBalance);
    });

    it("Invalid debin (amount = 0)", () => {
        cy.get('input[name="amount"]').type("0");
        cy.get('button[name="confirm"]').click();
        cy.contains("Por favor ingrese un monto válido");
        cy.get('button[name="cancel"]').click();

        getBalance().should("equal", initialBalance);
    });

    it("Invalid debin (user not registered in bank)", () => {
        const randomUser = `user${Date.now()}`;

        //log out the current user
        cy.get('button[name="cancel"]').click();
        cy.get('button[name="logout"]').click();
        cy.get('button[name="confirm"]').click();

        // Register a new user
        cy.visit("/");
        cy.contains("button", "¿No tienes una cuenta? Regístrate").click();
        cy.get('input[name="name"]').type(randomUser);
        cy.get('input[name="email"]').type(`user${randomUser}@example.com`);
        cy.get('input[name="password"]').type("password1");
        cy.get('input[name="confirmPassword"]').type("password1");
        cy.get('button[type="submit"]').click();
        // Log in with the new user
        cy.visit("/");
        cy.get('input[name="email"]').type(`user${randomUser}@example.com`);
        cy.get('input[name="password"]').type("password1");
        cy.get('button[type="submit"]').click();
        // Try to debin
        getBalance().then((balance) => {
            initialBalance = balance;
            cy.get('button[name="debin"]').click();
            cy.get('input[name="amount"]').type("1");
            cy.get('button[name="confirm"]').click();
            cy.contains("Cuenta no encontrada");
            cy.get('button[name="cancel"]').click();

            getBalance().should("equal", initialBalance);
        });
    });


    it("Successful debin", () => {
        cy.get('input[name="amount"]').type("1000");
        cy.get('button[name="confirm"]').click();

        getBalance().should("equal", initialBalance + 1000);
    });
});