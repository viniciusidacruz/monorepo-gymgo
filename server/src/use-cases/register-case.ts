import { hash } from "bcryptjs";

import { UsersRepository } from "@/repositories";
import { UserAlreadyExistsError } from "@/use-cases/errors";

import { IRegisterUseCaseRequest, IRegisterUseCaseResponse } from "./register-case.types";

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
