describe("Transfer", () => {
    let initialBalance: number;

    const parseBalance = (texto: string) =>
        parseFloat(texto.replace("$", "").trim().replace(/\./g, "").replace(",", "."));

    const getBalance = () =>
        cy.get("h4.MuiTypography-h4")
            .invoke("text")
            .then(parseBalance);

    beforeEach(() => {
        cy.visit("/");
        cy.get('input[name="email"]').type("user1@gmail.com");
        cy.get('input[name="password"]').type("password1");
        cy.get('button[type="submit"]').click();

        getBalance().then((balance) => {
            initialBalance = balance;
        });
        cy.get('button[name="transfer"]').click();
    });

    it("Invalid transfer (empty email)", () => {
        cy.get('button[name="confirm"]').click();
        cy.contains("El email es requerido");
        cy.get('button[name="cancel"]').click();

        getBalance().should("equal", initialBalance);
    });

    it("Invalid transfer (invalid email format)", () => {
        cy.get('input[name="email"]').type("incorrectemailformat");
        cy.get('button[name="confirm"]').click();
        cy.contains("Ingrese un email válido");
        cy.get('button[name="cancel"]').click();

        getBalance().should("equal", initialBalance);
    });

    it("Invalid transfer (empty amount)", () => {
        cy.get('button[name="confirm"]').click();
        cy.contains("El monto es requerido");
        cy.get('button[name="cancel"]').click();

        getBalance().should("equal", initialBalance);
    });

    it("Invalid transfer (amount equals 0)", () => {
        cy.get('input[name="amount"]').type("0");
        cy.get('button[name="confirm"]').click();
        cy.contains("Ingrese un monto válido mayor a 0");
        cy.get('button[name="cancel"]').click();

        getBalance().should("equal", initialBalance);
    });

    it("Invalid transfer (not enough balance)", () => {
        cy.get('input[name="amount"]').type("10000000000000");
        cy.get('button[name="confirm"]').click();
        cy.contains("Saldo insuficiente para realizar la transferencia");
        cy.get('button[name="cancel"]').click();

        getBalance().should("equal", initialBalance);
    });

    it("Successful transfer", () => {
        cy.get('input[name="email"]').type("user2@gmail.com");
        cy.get('input[name="amount"]').type("1000");
        cy.get('button[name="confirm"]').click();

        getBalance().should("equal", initialBalance - 1000);
    });
});