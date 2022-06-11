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
    await this.usersRepository.create({
      driver_license,
      email,
      name,
      password,
    });
  }
}

export { CreateUserUseCase };
