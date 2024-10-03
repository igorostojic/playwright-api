import { test, expect } from "@playwright/test";
import { Utils } from "../../support/Utils";

test.describe("GET request", () => {
  test("should return status 200", async function ({ request }) {
    const response = await request.get(`${Utils.baseUrl}/users/2`);
    const body = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    expect(body.data.id).toBe(2);
    expect(body.data.first_name).toBe("Janet");
  });
});
