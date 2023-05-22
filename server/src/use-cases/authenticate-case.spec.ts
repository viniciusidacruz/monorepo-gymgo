import { hash } from "bcryptjs";
import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryUsersRepository } from "@/repositories";
import { InvalidCredentialsError } from "@/use-cases/errors";

import { AuthenticateUseCase } from "./authenticate-case";

let sut: AuthenticateUseCase;
let usersRepository: InMemoryUsersRepository;

describe("AuthenticateUseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("Should hash user password upon registration", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      password: "123456",
      email: "johndoe@example.com",
    });

    console.log('Usuário: ', user)

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        password: "123456",
        email: "notexiste@example.com",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        password: "123456789",
        email: "johndoe@example.com",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
