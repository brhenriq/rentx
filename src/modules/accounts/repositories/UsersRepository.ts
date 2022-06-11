import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '../dtos/User';
import { User } from '../entities/User';
import { IUsersRepository } from './implementations/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    driver_license,
    email,
    password,
    username,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      driver_license,
      email,
      password,
      username,
    });

    await this.repository.save(user);
  }

  async listAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async findUserByName(name: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        name,
      },
    });

    return user;
  }
}

export { UsersRepository };
