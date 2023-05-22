import { compare } from "bcryptjs";
import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryUsersRepository } from "@/repositories";
import { UserAlreadyExistsError } from "@/use-cases/errors";

import { RegisterUseCase } from "./register-case";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("RegisterUseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("Should hash user password upon registration", async () => {
    

    const { user } = await sut.execute({
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
    const email = "envkt1@example.com";

    await sut.execute({
      email,
      name: "John Doe",
      password: "1234567890",
    });

    expect(() =>
      sut.execute({
        email,
        name: "John Doe",
        password: "1234567890",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("Should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      password: "1234567890",
      email: "envkt1@example.com",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
