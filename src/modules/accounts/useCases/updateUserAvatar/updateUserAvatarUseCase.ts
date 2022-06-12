import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './updateUserAvatarController';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const { id } = request.user;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    updateUserAvatarUseCase.execute({ user_id: id, avatarPath: filename });

    return response.status(204).json();
  }
}

export { UpdateUserAvatarController };
