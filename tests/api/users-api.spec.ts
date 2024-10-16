import { test, expect } from "@playwright/test";
import { Utils } from "../../support/Utils";
import * as data from "../../test-data/user.json";

test.describe("Users API tests", () => {
  test("GET request - should return status 200", async function ({ request }) {
    const response = await request.get(`${Utils.baseUrl}/users/2`);
    const body = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    expect(body.data.first_name).toBe(`${data.existingUserName}`);
  });

  test("GET request - should return 404 status", async function ({ request }) {
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

  test("POST request - should return status 201", async function ({ request }) {
    const response = await request.post(`${Utils.baseUrl}/users/`, {
      data: {
        id: `${data.newUserId}`,
        first_name: `${data.newUserId}`,
        last_name: `${data.newUserLastName}`,
        email: `${data.email}`,
      },
    });

    const responseBody = JSON.parse(await response.text());

    expect(response.status()).toBe(201);
    expect(responseBody.createdAt).toBeTruthy();
  });

  test("PUT reqest - should return status 200 and update user data", async function ({
    request,
  }) {
    const response = await request.put(`${Utils.baseUrl}/users/888`, {
      data: {
        first_name: `${data.newUserName} + Updated`,
        last_name: `${data.newUserLastName} + Updated`,
      },
    });
    const responseBody = JSON.parse(await response.text());

    expect(response.status()).toBe(200);
    expect(responseBody.first_name).toBe(`${data.newUserName} + Updated`);
    expect(responseBody.updatedAt).toBeTruthy();
  });

  test("DELETE request - should return 204 status", async function ({
    request,
  }) {
    const response = await request.delete(`${Utils.baseUrl}/users/888`);

    expect(response.status()).toBe(204);
  });
});
