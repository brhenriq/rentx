import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/implementations/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarPath: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatarPath }: IRequest): Promise<void> {
    const user = await this.usersRepository.findUserById(user_id);

    user.avatar = avatarPath;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
