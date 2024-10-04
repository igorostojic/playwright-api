import { test, expect } from "@playwright/test";
import { Utils } from "../../support/Utils";

test.describe("POST request", () => {
  test("to add a new user and expect status 201", async function ({ request }) {
    const response = await request.post(`${Utils.baseUrl}/users/`, {
      data: {
        id: 888,
        first_name: "Api",
        last_name: "Test",
        email: "apitest@test.com",
      },
    });

    const responseBody = JSON.parse(await response.text());

    expect(response.status()).toBe(201);
    expect(responseBody.createdAt).toBeTruthy();
  });

  test("update existing candidate information", async function ({ request }) {
    const response = await request.put(`${Utils.baseUrl}/users/888`, {
      data: {
        first_name: "Api Updated",
        last_name: "Test Updated",
      },
    });
    const responseBody = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    expect(responseBody.first_name).toBe("Api Updated");
  });

  test("remove created candidate", async function ({ request }) {
    const response = await request.delete(`${Utils.baseUrl}/users/888`);

    expect(response.status()).toBe(204);
  });
});
