import { compare } from "bcryptjs";
import { describe, it, expect } from "vitest";

import { RegisterUseCase } from ".";

describe("RegisterUseCase", () => {
  it("Should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
        async findByEmail (email) {
            return null
        },

        async create(data) {
            return {
                id: '1234',
                name: data.name,
                email: data.email,
                password_hash: data.password_hash,
                createdAt: new Date(),
            };
        },
    });

   const { user } = await registerUseCase.execute({
       name: "John Doe",
       password: "1234567890",
       email: "envkt1@example.com",
    });

    const isPasswordCorrectlyHashed = await compare('1234567890', user.password_hash)


    expect(isPasswordCorrectlyHashed).toBeTruthy();
});
});
