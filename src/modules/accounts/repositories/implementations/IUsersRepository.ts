import { ICreateUserDTO } from '../../dtos/User';
import { User } from '../../entities/User';

interface IUsersRepository {
  create({
    name,
    driver_license,
    email,
    password,
    username,
  }: ICreateUserDTO): Promise<void>;
  listAll(): Promise<User[]>;
}

export { IUsersRepository };
