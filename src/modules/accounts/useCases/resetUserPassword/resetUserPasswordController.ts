import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetUserPasswordUseCase } from './resetUserPasswordUseCase';

class ResetUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, confirm_password } = request.body;
    const { token } = request.query;

    const resetUserPasswordUseCase = container.resolve(
      ResetUserPasswordUseCase,
    );

    await resetUserPasswordUseCase.execute({
      password,
      confirm_password,
      token: String(token),
    });

    return response.send();
  }
}

export { ResetUserPasswordController };
