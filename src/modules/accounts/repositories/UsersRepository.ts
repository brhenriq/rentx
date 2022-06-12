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
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      driver_license,
      email,
      password,
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

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}

export { UsersRepository };
