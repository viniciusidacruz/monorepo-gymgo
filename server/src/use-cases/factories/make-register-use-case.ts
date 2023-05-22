import { RegisterUseCase } from "@/use-cases";
import { PrismaUsersRepository } from "@/repositories";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    return registerUseCase;
}