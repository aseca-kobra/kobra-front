import { expect, browser, $ } from "@wdio/globals";

describe("Invalid Email", () => {
  it("should not accept invalid email", async () => {
    await browser.pause(2000);
    const contexts = await browser.getContexts();
    const webviewContext = contexts.find((c) => c.includes("WEBVIEW"));
    expect(webviewContext).toBeDefined();
    await browser.switchContext(webviewContext!);
    await $("#email").setValue("pedro");
    await $("#password").setValue("pedro123");
    await $('button[type="submit"]').click();
    await browser.pause(2000);
    const errorHelperText = await $("#email-helper-text");
    await expect(errorHelperText).toBeDisplayed();
    await expect(errorHelperText).toHaveText("Email inválido");
  });
});

describe("Invalid Password", () => {
  it("should not accept invalid password", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]); // Ctrl+A (para seleccionar todo)
    await browser.keys("Delete"); // Borrar
    await emailInput.setValue("pedro@gmail.com");
    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]); // Ctrl+A (para seleccionar todo)
    await browser.keys("Delete"); // Borrar
    await passwordInput.setValue("p");
    await $('button[type="submit"]').click();
    await browser.pause(2000);
    const errorHelperText = await $("#password-helper-text");
    await expect(errorHelperText).toBeDisplayed();
    await expect(errorHelperText).toHaveText(
      "La contraseña debe tener al menos 6 caracteres"
    );
  });
});

describe("Invalid Login Email", () => {
  it("should not login with invalid email", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]); // Ctrl+A (para seleccionar todo)
    await browser.keys("Delete"); // Borrar
    await emailInput.setValue("pedro@hotmail.com");
    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]); // Ctrl+A (para seleccionar todo)
    await browser.keys("Delete"); // Borrar
    await passwordInput.setValue("pedro123");
    await $('button[type="submit"]').click();
    await browser.pause(2000);
    const errorMessage = await $(".MuiAlert-message");
    await expect(errorMessage).toBeDisplayed();
    await expect(errorMessage).toHaveText("Invalid credentials");
  });
});

describe("Invalid Login Password", () => {
  it("should not login with invalid password", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]); // Ctrl+A (para seleccionar todo)
    await browser.keys("Delete"); // Borrar
    await emailInput.setValue("pedro@gmail.com");
    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]); // Ctrl+A (para seleccionar todo)
    await browser.keys("Delete"); // Borrar
    await passwordInput.setValue("pedro456");
    await $('button[type="submit"]').click();
    await browser.pause(2000);
    const errorMessage = await $(".MuiAlert-message");
    await expect(errorMessage).toBeDisplayed();
    await expect(errorMessage).toHaveText("Invalid credentials");
  });
});

describe("Valid Login", () => {
  it("should login with valid credentials", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]); // Ctrl+A (para seleccionar todo)
    await browser.keys("Delete"); // Borrar
    await emailInput.setValue("pedro@gmail.com");
    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]); // Ctrl+A (para seleccionar todo)
    await browser.keys("Delete"); // Borrar
    await passwordInput.setValue("pedro123");
    await $('button[type="submit"]').click();
    await browser.pause(2000);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("/home");
  });
});
