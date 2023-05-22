import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import { CheckIn, Prisma } from "@prisma/client";

import { CheckInsRepository } from "@/repositories";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheday = dayjs(date).startOf("date");
    const endOfTheday = dayjs(date).endOf("date");

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheday) && checkInDate.isBefore(endOfTheday);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) return null;

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      createdAt: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
