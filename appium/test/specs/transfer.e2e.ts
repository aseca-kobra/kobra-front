import { expect, browser, $ } from "@wdio/globals";

describe("Transfer", () => {
  let initialBalance: number;

  const parseBalance = (texto: string) =>
    parseFloat(
      texto.replace("$", "").trim().replace(/\./g, "").replace(",", ".")
    );

  const getBalance = async (): Promise<number> => {
    const el = await $("h4.MuiTypography-h4");
    const text = await el.getText();
    return parseBalance(text);
  };

  const clearAndType = async (sel: string, value: string) => {
    const inp = await $(sel);
    await inp.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await inp.setValue(value);
  };

  it("Invalid transfer (empty email)", async () => {
    await browser.pause(2000);
    const contexts = await browser.getContexts();
    const webview = contexts.find((c) => c.includes("WEBVIEW"));
    expect(webview).toBeDefined();
    await browser.switchContext(webview!);

    // Login user1
    await clearAndType('input[name="email"]', "user1@example.com");
    await clearAndType('input[name="password"]', "Password123!");
    await $('button[type="submit"]').click();
    await browser.pause(2000);

    initialBalance = await getBalance();

    await $('button[name="transfer"]').click();

    await $('button[name="confirm"]').click();
    const text = await browser.$("body").getText();
    expect(text).toContain("El email es requerido");
    await $('button[name="cancel"]').click();
    expect(await getBalance()).toBe(initialBalance);
  });

  it("Invalid transfer (invalid email format)", async () => {
    await $('button[name="transfer"]').click();
    await clearAndType('input[name="email"]', "incorrectemailformat");
    await $('button[name="confirm"]').click();
    const text = await browser.$("body").getText();
    expect(text).toContain("Ingrese un email válido");
    await $('button[name="cancel"]').click();
    expect(await getBalance()).toBe(initialBalance);
  });

  it("Invalid transfer (empty amount)", async () => {
    await $('button[name="transfer"]').click();
    await $('button[name="confirm"]').click();
    const text = await browser.$("body").getText();
    expect(text).toContain("El monto es requerido");
    await $('button[name="cancel"]').click();
    expect(await getBalance()).toBe(initialBalance);
  });

  it("Invalid transfer (amount equals 0)", async () => {
    await $('button[name="transfer"]').click();
    await clearAndType('input[name="amount"]', "0");
    await $('button[name="confirm"]').click();
    const text = await browser.$("body").getText();
    expect(text).toContain("Ingrese un monto válido mayor a 0");
    await $('button[name="cancel"]').click();
    expect(await getBalance()).toBe(initialBalance);
  });

  it("Invalid transfer (not enough balance)", async () => {
    await $('button[name="transfer"]').click();
    await clearAndType('input[name="amount"]', "10000000000000");
    await $('button[name="confirm"]').click();
    const text = await browser.$("body").getText();
    expect(text).toContain("Saldo insuficiente para realizar la transferencia");
    await $('button[name="cancel"]').click();
    expect(await getBalance()).toBe(initialBalance);
  });

  it("Successful transfer", async () => {
    await $('button[name="transfer"]').click();
    const amount = 10;

    // paso 1: logueo user2
    await $('button[name="cancel"]').click();
    await $('button[name="logout"]').click();
    await $('button[name="confirm"]').click();
    await clearAndType('input[name="email"]', "user2@example.com");
    await clearAndType('input[name="password"]', "Password123!");
    await $('button[type="submit"]').click();
    await browser.pause(2000);
    const receiverBalance = await getBalance();

    // paso 2: vuelvo a loguear user1
    await $('button[name="logout"]').click();
    await $('button[name="confirm"]').click();
    await clearAndType('input[name="email"]', "user1@example.com");
    await clearAndType('input[name="password"]', "Password123!");
    await $('button[type="submit"]').click();
    await browser.pause(2000);

    await $('button[name="transfer"]').click();
    await clearAndType('input[name="email"]', "user2@example.com");
    await clearAndType('input[name="amount"]', amount.toString());
    await $('button[name="confirm"]').click();
    await browser.pause(2000);

    // validar balance user1
    expect(await getBalance()).toBe(initialBalance - amount);

    // paso 3: loguear user2 de nuevo
    await $('button[name="logout"]').click();
    await $('button[name="confirm"]').click();
    await clearAndType('input[name="email"]', "user2@example.com");
    await clearAndType('input[name="password"]', "Password123!");
    await $('button[type="submit"]').click();
    await browser.pause(2000);

    expect(await getBalance()).toBe(receiverBalance + amount);
  });
});
