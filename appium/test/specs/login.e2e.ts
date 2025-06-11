import { expect, browser, $ } from "@wdio/globals";

describe("Login screen", () => {
  it("should show login screen", async () => {
    await browser.pause(2000);
    const contexts = await browser.getContexts();
    const webviewContext = contexts.find((c) => c.includes("WEBVIEW"));
    expect(webviewContext).toBeDefined();
    await browser.switchContext(webviewContext!);

    const loginText = await $("body");
    const text = await loginText.getText();
    expect(text).toContain("Iniciar sesión");
  });

  it("should show error on empty email", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");

    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");

    await $('button[type="submit"]').click();
    await browser.pause(1000);

    const emailError = await $("#email-helper-text");
    const errorText = await emailError.getText();
    const isVisible = await emailError.isDisplayed();
    expect(isVisible).toBe(true);
    expect(errorText).toBe("El email es obligatorio");
  });

  it("should show error on empty password", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await emailInput.setValue("user1@example.com");

    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");

    await $('button[type="submit"]').click();
    await browser.pause(1000);

    const passwordError = await $("#password-helper-text");
    const errorText = await passwordError.getText();
    const isVisible = await passwordError.isDisplayed();
    expect(isVisible).toBe(true);
    expect(errorText).toBe("La contraseña es obligatoria");
  });
});

describe("Invalid Email", () => {
  it("should not accept invalid email", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await emailInput.setValue("user1");

    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await passwordInput.setValue("Password123!");

    await $('button[type="submit"]').click();
    await browser.pause(2000);

    const errorHelperText = await $("#email-helper-text");
    const text = await errorHelperText.getText();
    const isVisible = await errorHelperText.isDisplayed();
    expect(isVisible).toBe(true);
    expect(text).toBe("Email inválido");
  });
});

describe("Invalid Password", () => {
  it("should not accept invalid password", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await emailInput.setValue("user1@example.com");

    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await passwordInput.setValue("p");

    await $('button[type="submit"]').click();
    await browser.pause(2000);

    const errorHelperText = await $("#password-helper-text");
    const text = await errorHelperText.getText();
    const isVisible = await errorHelperText.isDisplayed();
    expect(isVisible).toBe(true);
    expect(text).toBe("La contraseña debe tener al menos 6 caracteres");
  });
});

describe("Invalid Login Email", () => {
  it("should not login with invalid email", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await emailInput.setValue("user1@hotmail.com");

    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await passwordInput.setValue("Password123!");

    await $('button[type="submit"]').click();
    await browser.pause(2000);

    const errorMessage = await $(".MuiAlert-message");
    const text = await errorMessage.getText();
    const isVisible = await errorMessage.isDisplayed();
    expect(isVisible).toBe(true);
    expect(text).toBe("Invalid credentials");
  });
});

describe("Invalid Login Password", () => {
  it("should not login with invalid password", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await emailInput.setValue("user1@example.com");

    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await passwordInput.setValue("Password456!");

    await $('button[type="submit"]').click();
    await browser.pause(2000);

    const errorMessage = await $(".MuiAlert-message");
    const text = await errorMessage.getText();
    const isVisible = await errorMessage.isDisplayed();
    expect(isVisible).toBe(true);
    expect(text).toBe("Invalid credentials");
  });
});

describe("Valid Login", () => {
  it("should login with valid credentials", async () => {
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

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("/home");
  });
});
