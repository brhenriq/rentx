import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../../dtos/User';
import { IUsersRepository } from '../../repositories/implementations/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const emailAlreadyExists = await this.usersRepository.findUserByEmail(
      email,
    );

    if (emailAlreadyExists) throw new Error('E-mail already used');

    const passwordHashed = await hash(password, 8);

    await this.usersRepository.create({
      driver_license,
      email,
      name,
      password: passwordHashed,
    });
  }
}

export { CreateUserUseCase };
