import { test, expect } from "@playwright/test";
import { Utils } from "../../support/Utils";

test.describe("GET request", () => {
  test("should return status 200 and have correct data", async function ({
    request,
  }) {
    const response = await request.get(`${Utils.baseUrl}/users/2`);
    const body = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    expect(body.data.id).toBe(2);
    expect(body.data.first_name).toBe("Janet");
  });

  test("should return 404 status", async function ({ request }) {
    const response = await request.get(`${Utils.baseUrl}/users/404`);
    expect(response.status()).toBe(404);
  });

  test("should return list of six and 200 status", async function ({
    request,
  }) {
    const response = await request.get(`${Utils.baseUrl}/users?page=1`);
    const responseBody = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    expect(responseBody.data[1].id).toBe(2);
    expect(responseBody.data).toHaveLength(6);
  });
});
