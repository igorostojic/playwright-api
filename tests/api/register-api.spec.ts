import { test, expect } from "@playwright/test";
import { Utils } from "../../support/Utils";
import * as data from "../../test-data/login-data.json";
import * as error from "../../test-data/error-messages.json";

test.describe("Register API", () => {
  test("POST request (valid user) - should return status 200 and successfully register", async function ({
    request,
  }) {
    const response = await request.post(`${Utils.baseUrl}/register/`, {
      data: {
        email: `${data.validEmailAddress}`,
        password: `${data.validPassword}`,
      },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.id).toBeTruthy();
    expect(responseBody.token).toBeTruthy();
  });

  test("POST request (invalid user) - should return status 400 and unsuccessfully register", async function ({
    request,
  }) {
    const response = await request.post(`${Utils.baseUrl}/register/`, {
      data: {
        email: `${data.invalidEmailAddress}`,
        password: `${data.invalidPassword}`,
      },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe(`${error.undefinedUser}`);
  });

  test("POST request (email only) - should return status 400", async function ({
    request,
  }) {
    const response = await request.post(`${Utils.baseUrl}/register/`, {
      data: {
        email: `${data.validEmailAddress}`,
      },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe(`${error.missingPassword}`);
  });
});
