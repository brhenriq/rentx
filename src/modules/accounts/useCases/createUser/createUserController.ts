import { Request, Response } from 'express';
import { CreateUserUseCase } from './createUserUseCase';
import { container } from 'tsyringe';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { driver_license, email, name, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      driver_license,
      email,
      name,
      password,
    });

    return response.status(201).json();
  }
}

export { CreateUserController };
