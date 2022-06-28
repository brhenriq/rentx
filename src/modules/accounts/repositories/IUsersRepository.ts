import { ICreateUserDTO } from '@modules/accounts/dtos/User';
import { User } from '@modules/accounts/entities/User';

interface IUsersRepository {
  create({
    name,
    driver_license,
    email,
    password,
  }: ICreateUserDTO): Promise<void>;
  listAll(): Promise<User[]>;
  findUserByEmail(email: string): Promise<User>;
  findUserByName(name: string): Promise<User>;
  findUserById(id: string): Promise<User>;
}

export { IUsersRepository };
