import { compare } from "bcryptjs";
import { describe, it, expect } from "vitest";

import { RegisterUseCase } from ".";
import { InMemoryUsersRepository } from "@/repositories";
import { UserAlreadyExistsError } from "@/use-cases/errors";

describe("RegisterUseCase", () => {
  it("Should hash user password upon registration", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      password: "1234567890",
      email: "envkt1@example.com",
    });

    const isPasswordCorrectlyHashed = await compare(
      "1234567890",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBeTruthy();
  });

  it("Should not be able to register with same email twice", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const email = "envkt1@example.com";

    await registerUseCase.execute({
      email,
      name: "John Doe",
      password: "1234567890",
    });

    expect(() =>
      registerUseCase.execute({
        email,
        name: "John Doe",
        password: "1234567890",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("Should be able to register", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      password: "1234567890",
      email: "envkt1@example.com",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
