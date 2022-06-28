import { inject, injectable } from 'tsyringe';
import { deleteFile } from '@utils/file';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

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

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarPath;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
