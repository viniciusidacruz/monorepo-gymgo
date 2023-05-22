import { CheckIn } from "@prisma/client";

export interface ICheckInUseCaseRequest {
  gymId: string;
  userId: string;
}

export interface ICheckInUseCaseResponse {
  checkIn: CheckIn;
}
