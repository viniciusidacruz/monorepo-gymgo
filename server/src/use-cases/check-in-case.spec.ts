import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories";

import { CheckInUseCase } from "./check-in-case";

let sut: CheckInUseCase;
let checkInsRepository: InMemoryCheckInsRepository;

describe("CheckInUseCase", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-id-1",
      userId: "user-id-1",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 5, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-id-1",
      userId: "user-id-1",
    });

   await expect(() =>
      sut.execute({
        gymId: "gym-id-1",
        userId: "user-id-1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2023, 5, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-id-1",
      userId: "user-id-1",
    });

    vi.setSystemTime(new Date(2023, 5, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-id-1",
      userId: "user-id-1",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
