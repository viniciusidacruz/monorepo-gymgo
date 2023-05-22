import { AuthenticateUseCase } from "@/use-cases";
import { PrismaUsersRepository } from "@/repositories";

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    return authenticateUseCase;
}