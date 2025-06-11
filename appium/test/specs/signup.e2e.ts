import { expect, browser, $ } from "@wdio/globals";

describe("Signup screen", () => {
  let initialized = false;
  let user = null;
  beforeEach(async () => {
    if (!initialized) {
      await browser.pause(2000);
      const contexts = await browser.getContexts();
      const webviewContext = contexts.find((c) => c.includes("WEBVIEW"));
      expect(webviewContext).toBeDefined();
      await browser.switchContext(webviewContext!);

      const registerButton = await $(
        "button=¿No tienes una cuenta? Regístrate"
      );
      await registerButton.click();
      initialized = true;
    }
  });

  it("Visit signup page", async () => {
    const signupText = await $("body");
    const text = await signupText.getText();
    expect(text).toContain("Crear cuenta");
  });

  it("Invalid name format (empty)", async () => {
    const submitButton = await $('button[type="submit"]');
    await submitButton.click();

    const nameError = await $("#name-helper-text");
    const errorText = await nameError.getText();
    expect(errorText).toBe("El nombre es obligatorio");
  });

  it("Invalid email format (empty)", async () => {
    const submitButton = await $('button[type="submit"]');
    await submitButton.click();

    const emailError = await $("#email-helper-text");
    const errorText = await emailError.getText();
    expect(errorText).toBe("El email es obligatorio");
  });

  it("Invalid email format (invalid email)", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await emailInput.setValue("incorrectemailformat");

    const submitButton = await $('button[type="submit"]');
    await submitButton.click();

    const emailError = await $("#email-helper-text");
    const errorText = await emailError.getText();
    expect(errorText).toBe("Email inválido");
  });

  it("Invalid password format (empty)", async () => {
    const submitButton = await $('button[type="submit"]');
    await submitButton.click();

    const passwordError = await $("#password-helper-text");
    const errorText = await passwordError.getText();
    expect(errorText).toBe("La contraseña es obligatoria");
  });

  it("Invalid password format (short)", async () => {
    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await passwordInput.setValue("pas");

    const submitButton = await $('button[type="submit"]');
    await submitButton.click();

    const passwordError = await $("#password-helper-text");
    const errorText = await passwordError.getText();
    expect(errorText).toBe("La contraseña debe tener al menos 6 caracteres");
  });

  it("Failed signup (email already exists)", async () => {
    const nameInput = await $("#name");
    await nameInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await nameInput.setValue("user1");

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

    const confirmPasswordInput = await $("#confirmPassword");
    await confirmPasswordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await confirmPasswordInput.setValue("Password123!");
    await browser.execute(() => document.activeElement?.blur());

    const submitButton = await $('button[type="submit"]');
    await submitButton.click();
    await browser.pause(2000);

    const errorMessage = await $(".MuiAlert-message");
    const text = await errorMessage.getText();
    const isVisible = await errorMessage.isDisplayed();
    expect(isVisible).toBe(true);
    expect(text).toBe("Email already exists");
  });

  it("Successful signup", async () => {
    const randomUser = `user${Date.now()}`;
    user = randomUser;

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
    await browser.execute(() => document.activeElement?.blur());

    const submitButton = await $('button[type="submit"]');
    await submitButton.waitForDisplayed();
    await submitButton.waitForEnabled();
    await submitButton.scrollIntoView();
    await submitButton.click();
    await browser.pause(2000);

    const loginScreen = await $("body");
    const text = await loginScreen.getText();
    expect(text).toContain("Iniciar sesión");
  });

  it("Successful login with new user", async () => {
    const emailInput = await $("#email");
    await emailInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await emailInput.setValue(`${user}@example.com`);

    const passwordInput = await $("#password");
    await passwordInput.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Delete");
    await passwordInput.setValue("Password123!");
    await browser.execute(() => document.activeElement?.blur());

    const submitButton = await $('button[type="submit"]');
    await submitButton.waitForDisplayed();
    await submitButton.waitForEnabled();
    await submitButton.scrollIntoView();
    await submitButton.click();

    await browser.pause(2000);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("/home");
  });
});
