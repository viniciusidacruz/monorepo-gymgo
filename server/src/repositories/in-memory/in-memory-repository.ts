import { Prisma, User } from "@prisma/client";

import { UsersRepository } from "@/repositories";

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = [];

    async findByEmail(email: string) {
        const user = this.users.find(user => user.email === email);

        if (!user) {
            return null;
        }

        return user;
    };

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: '1234',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            createdAt: new Date(),
        };

        this.users.push(user);

        return user;
    };
}