import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories";

import { CheckInUseCase } from "./check-in-case";

let sut: CheckInUseCase;
let checkInsRepository: InMemoryCheckInsRepository;

describe("CheckInUseCase", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("Should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-id-1",
      userId: "user-id-1",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
