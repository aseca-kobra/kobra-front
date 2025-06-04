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
        cy.get('input[name="email"]').type("user1@gmail.com");
        cy.get('input[name="password"]').type("password1");
        cy.get('button[type="submit"]').click();

        getBalance().then((balance) => {
            initialBalance = balance;
        });

        cy.contains("button", "Debin").click();
    });

    it("Invalid debin (empty amount)", () => {
        cy.get('button[name="confirm"]').click();
        cy.contains("Por favor ingrese un monto válido");
        cy.get('button[name="cancel"]').click();

        getBalance().should("equal", initialBalance);
    });

    // it("Invalid debin (not enough money in bank)", () => {
    //     cy.get('button[name="confirm"]').click();
    //     cy.contains("No hay saldo suficiente en la cuenta");
    //     cy.get('button[name="cancel"]').click();
    //
    //     getBalance().should("equal", initialBalance);
    // });

    it("Invalid debin (amount = 0)", () => {
        cy.get('input[name="amount"]').type("0");
        cy.get('button[name="confirm"]').click();
        cy.contains("Por favor ingrese un monto válido");
        cy.get('button[name="cancel"]').click();

        getBalance().should("equal", initialBalance);
    });

    it("Successful debin", () => {
        cy.get('input[name="amount"]').type("1000");
        cy.get('button[name="confirm"]').click();

        getBalance().should("equal", initialBalance + 1000);
    });
});