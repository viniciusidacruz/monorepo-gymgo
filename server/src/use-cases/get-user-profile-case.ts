import { UsersRepository } from "@/repositories";
import { ResourceNotFoundError } from "@/use-cases/errors";

import {
  IGetUserProfileUseCaseRequest,
  IGetUserProfileUseCaseResponse,
} from "./get-user-profile-case.types";

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
