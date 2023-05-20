import { User } from "@prisma/client";

export interface IRegisterUseCase {
    name: string;
    email: string;
    password: string;
}

export interface IRegisterUseCaseResponse {
    user: User;
}