import { hash } from "bcryptjs";

import { UsersRepository } from "@/repositories";
import { UserAlreadyExistsError } from "@/use-cases/errors";

import { IRegisterUseCase } from "./types";

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {};

    async execute({ name, email, password }: IRegisterUseCase) {
        const password_hash = await hash(password, 6);
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email);
    
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }
        
        await this.usersRepository.create({
            name,
            email,
            password_hash
        })
    }
};