import { CheckInsRepository } from "@/repositories";

import {
  ICheckInUseCaseRequest,
  ICheckInUseCaseResponse,
} from "./check-in-case.types";

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const checkInOnSomeDay =  await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

    if (checkInOnSomeDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
