import { test, expect } from "@playwright/test";
import { Utils } from "../../support/Utils";
import * as data from "../../test-data/login-data.json";
import * as error from "../../test-data/error-messages.json";

test.describe("Login API", () => {
  test("POST request - should return status 200 and successfully login", async function ({
    request,
  }) {
    const response = await request.post(`${Utils.baseUrl}/login/`, {
      data: {
        email: `${data.validEmailAddress}`,
        password: `${data.validPassword}`,
      },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.token).toBeTruthy();
  });

  test("POST request - should return status 400 and error message", async function ({
    request,
  }) {
    const response = await request.post(`${Utils.baseUrl}/login/`, {
      data: {
        email: `${data.validEmailAddress}`,
      },
    });

    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe(`${error.missingPassword}`);
  });
});
