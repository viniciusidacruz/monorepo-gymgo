import { FastifyInstance } from "fastify";

import { authenticate, register } from "@http/controllers";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);
}