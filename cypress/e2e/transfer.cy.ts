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
        cy.get('input[name="email"]').type("user1@example.com");
        cy.get('input[name="password"]').type("Password123!");
        cy.get('button[type="submit"]').click();

        getBalance().then((balance) => {
            initialBalance = balance;
        });
        cy.get('button[name="transfer"]').click();
    });

    // it("Invalid transfer (empty email)", () => {
    //     cy.get('button[name="confirm"]').click();
    //     cy.contains("El email es requerido");
    //     cy.get('button[name="cancel"]').click();
    //
    //     getBalance().should("equal", initialBalance);
    // });
    //
    // it("Invalid transfer (invalid email format)", () => {
    //     cy.get('input[name="email"]').type("incorrectemailformat");
    //     cy.get('button[name="confirm"]').click();
    //     cy.contains("Ingrese un email válido");
    //     cy.get('button[name="cancel"]').click();
    //
    //     getBalance().should("equal", initialBalance);
    // });
    //
    // it("Invalid transfer (empty amount)", () => {
    //     cy.get('button[name="confirm"]').click();
    //     cy.contains("El monto es requerido");
    //     cy.get('button[name="cancel"]').click();
    //
    //     getBalance().should("equal", initialBalance);
    // });
    //
    // it("Invalid transfer (amount equals 0)", () => {
    //     cy.get('input[name="amount"]').type("0");
    //     cy.get('button[name="confirm"]').click();
    //     cy.contains("Ingrese un monto válido mayor a 0");
    //     cy.get('button[name="cancel"]').click();
    //
    //     getBalance().should("equal", initialBalance);
    // });
    //
    // it("Invalid transfer (not enough balance)", () => {
    //     cy.get('input[name="amount"]').type("10000000000000");
    //     cy.get('button[name="confirm"]').click();
    //     cy.contains("Saldo insuficiente para realizar la transferencia");
    //     cy.get('button[name="cancel"]').click();
    //
    //     getBalance().should("equal", initialBalance);
    // });

    it("Successful transfer", () => {
        const amount = 10;

        // 1) Logueo como user2 y tomo su balance inicial
        cy.get('button[name="cancel"]').click();
        cy.get('button[name="logout"]').click();
        cy.get('button[name="confirm"]').click();
        cy.get('input[name="email"]').type("user2@example.com");
        cy.get('input[name="password"]').type("Password123!");
        cy.get('button[type="submit"]').click();

        getBalance().then((initialReceiverBalance) => {
            // 2) Vuelvo a loguear como user1 y hago la transferencia
            cy.get('button[name="logout"]').click();
            cy.get('button[name="confirm"]').click();
            cy.get('input[name="email"]').type("user1@example.com");
            cy.get('input[name="password"]').type("Password123!");
            cy.get('button[type="submit"]').click();

            // Asumo que initialBalance ya está definido en beforeEach
            cy.get('button[name="transfer"]').click();
            cy.get('input[name="email"]').type("user2@example.com");
            cy.get('input[name="amount"]').type(amount.toString());
            cy.get('button[name="confirm"]').click();

            // 3) Valido el balance de user1
            getBalance().should("equal", initialBalance - amount);

            // 4) Logueo de nuevo como user2 y verifico su nuevo balance
            cy.get('button[name="logout"]').click();
            cy.get('button[name="confirm"]').click();
            cy.get('input[name="email"]').type("user2@example.com");
            cy.get('input[name="password"]').type("Password123!");
            cy.get('button[type="submit"]').click();

            getBalance().should("equal", initialReceiverBalance + amount);
        });
    });
});