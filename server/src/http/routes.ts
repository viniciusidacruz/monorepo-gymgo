import { FastifyInstance } from "fastify";

import { register } from "@http/controllers";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register);
}