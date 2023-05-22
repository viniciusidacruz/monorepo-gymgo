import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { UserAlreadyExistsError } from "@/use-cases/errors";
import { makeRegisterUseCase } from "@/use-cases/factories";


export async function register (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6)
    });

    const { email, name, password } = registerBodySchema.parse(request.body);

   try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ email, name, password });
   } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
    return reply.status(409).send({ message: err.message  });
    }

    throw err;
   }

   return reply.status(201).send();
}