import { compare } from "bcryptjs";

import { UsersRepository } from "@/repositories";
import { InvalidCredentialsError } from "@/use-cases/errors";

import {
  IAuthenticateUseCaseRequest,
  IAuthenticateUseCaseResponse,
} from "./authenticate-case.types";

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
