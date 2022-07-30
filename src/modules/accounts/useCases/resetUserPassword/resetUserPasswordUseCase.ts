import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
  confirm_password: string;
}

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute({
    confirm_password,
    password,
    token,
  }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    console.log({ confirm_password, password, token, userToken, ...userToken });

    if (!userToken) {
      console.log('caiu aqui');

      throw new AppError('Token does not exists');
    }

    if (confirm_password !== password) {
      console.log('ou aqui');

      throw new AppError('Password and Confirm Password does not match');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Expired Token!');
    }

    const user = await this.usersRepository.findUserById(userToken.user_id);
    console.log(user);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetUserPasswordUseCase };
