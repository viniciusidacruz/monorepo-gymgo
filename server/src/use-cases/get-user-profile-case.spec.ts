import { hash } from "bcryptjs";
import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryUsersRepository } from "@/repositories";
import { ResourceNotFoundError } from "@/use-cases/errors";

import { GetUserProfileUseCase } from "./get-user-profile-case";

let sut: GetUserProfileUseCase;
let usersRepository: InMemoryUsersRepository;

describe("GetUserProfileUseCase", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("Should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("John Doe");
  });

  it("Should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "not-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
