import { expect, browser, $ } from "@wdio/globals";

describe("Debin", () => {
  let initialBalance: number;
  let loggedIn = false;

  const parseBalance = (text: string): number =>
    parseFloat(
      text.replace("$", "").trim().replace(/\./g, "").replace(",", ".")
    );

  const getBalance = async (): Promise<number> => {
    const balanceElement = await $("h4.MuiTypography-h4");
    const text = await balanceElement.getText();
    return parseBalance(text);
  };

  beforeEach(async () => {
    await browser.pause(2000);
    const contexts = await browser.getContexts();
    const webviewContext = contexts.find((c) => c.includes("WEBVIEW"));
    expect(webviewContext).toBeDefined();
    await browser.switchContext(webviewContext!);

    if (!loggedIn) {
      const emailInput = await $("#email");
      await emailInput.click();
      await browser.keys(["Control", "a"]);
      await browser.keys("Delete");
      await emailInput.setValue("user1@example.com");

      const passwordInput = await $("#password");
      await passwordInput.click();
      await browser.keys(["Control", "a"]);
      await browser.keys("Delete");
      await passwordInput.setValue("Password123!");

      await $('button[type="submit"]').click();
      await browser.pause(2000);
      loggedIn = true;
    }

    initialBalance = await getBalance();

    const debinButton = await $('button[name="debin"]');
    await debinButton.click();
  });

  it("should not allow empty amount", async () => {
    const confirmButton = await $('button[name="confirm"]');
    await confirmButton.click();

    const amountError = await $(".MuiFormHelperText-root.Mui-error");
    const errorText = await amountError.getText();
    expect(errorText).toBe("Por favor ingrese un monto válido");

    const cancelButton = await $('button[name="cancel"]');
    await cancelButton.click();

    const balance = await getBalance();
    expect(balance).toBe(initialBalance);
  });

  it("should not allow amount greater than bank funds", async () => {
    const amountInput = await $('input[name="amount"]');
    await amountInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await amountInput.setValue("10000000000000");

    const confirmButton = await $('button[name="confirm"]');
    await confirmButton.click();

    const body = await $("body");
    const errorText = await body.getText();
    expect(errorText).toContain("No hay saldo suficiente en la cuenta");

    const cancelButton = await $('button[name="cancel"]');
    await cancelButton.click();

    const balance = await getBalance();
    expect(balance).toBe(initialBalance);
  });

  it("should not allow amount of zero", async () => {
    const amountInput = await $('input[name="amount"]');
    await amountInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await amountInput.setValue("0");

    const confirmButton = await $('button[name="confirm"]');
    await confirmButton.click();

    const body = await $("body");
    const errorText = await body.getText();
    expect(errorText).toContain("Por favor ingrese un monto válido");

    const cancelButton = await $('button[name="cancel"]');
    await cancelButton.click();

    const balance = await getBalance();
    expect(balance).toBe(initialBalance);
  });

  it("should perform successful debin", async () => {
    const amountInput = await $('input[name="amount"]');
    await amountInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await amountInput.setValue("1000");

    const confirmButton = await $('button[name="confirm"]');
    await confirmButton.click();

    await browser.pause(2000);
    const balance = await getBalance();
    expect(balance).toBe(initialBalance + 1000);
  });

  it("should show error if user not registered in bank", async () => {
    const randomUser = `user${Date.now()}`;

    const cancelButton = await $('button[name="cancel"]');
    await cancelButton.click();

    const logoutButton = await $('button[name="logout"]');
    await logoutButton.click();

    const confirmLogout = await $('button[name="confirm"]');
    await confirmLogout.click();

    await browser.pause(1000);

    const registerButton = await $("button=¿No tienes una cuenta? Regístrate");
    await registerButton.click();

    const nameInput = await $("#name");
    await nameInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await nameInput.setValue(randomUser);

    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await emailInput.setValue(`${randomUser}@example.com`);

    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await passwordInput.setValue("Password123!");

    const confirmPasswordInput = await $("#confirmPassword");
    await confirmPasswordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await confirmPasswordInput.setValue("Password123!");

    const registerSubmit = await $('button[type="submit"]');
    await registerSubmit.click();
    await browser.pause(1000);

    const loginEmailInput = await $("#email");
    await loginEmailInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await loginEmailInput.setValue(`${randomUser}@example.com`);

    const loginPasswordInput = await $("#password");
    await loginPasswordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await loginPasswordInput.setValue("Password123!");

    const loginButton = await $('button[type="submit"]');
    await loginButton.click();
    await browser.pause(1000);

    initialBalance = await getBalance();

    const debinButton = await $('button[name="debin"]');
    await debinButton.click();

    const amountInput = await $('input[name="amount"]');
    await amountInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await amountInput.setValue("1");

    const confirmButton = await $('button[name="confirm"]');
    await confirmButton.click();

    const body = await $("body");
    const errorText = await body.getText();
    expect(errorText).toContain("Cuenta no encontrada");

    const finalCancelButton = await $('button[name="cancel"]');
    await finalCancelButton.click();

    const balance = await getBalance();
    expect(balance).toBe(initialBalance);
  });
});
