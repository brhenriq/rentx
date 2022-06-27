import { ICreateUserDTO } from '../../dtos/User';
import { User } from '../../entities/User';
import { IUsersRepository } from '../implementations/IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    driver_license,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      driver_license,
      email,
      password,
    });

    this.users.push(user);
  }

  async listAll(): Promise<User[]> {
    return this.users;
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findUserByName(name: string): Promise<User> {
    return this.users.find(user => user.name === name);
  }

  async findUserById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
}

export { UsersRepositoryInMemory };
