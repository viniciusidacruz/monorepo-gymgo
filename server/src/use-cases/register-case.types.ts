import { User } from "@prisma/client";

export interface IRegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export interface IRegisterUseCaseResponse {
    user: User;
}