import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/User';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/createUserUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementation/DayjsDateProvider';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456',
      email: 'user@test.com',
      password: '123456',
      name: 'User Test',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a none existent user ', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'inexistent@user.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('Incorrect email/password'));
  });

  it('should not be able to authenticate an user with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '999',
      email: 'user@epasswordError.com',
      password: '123456',
      name: 'user password incorrect',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      }),
    ).rejects.toEqual(new AppError('Incorrect email/password'));
  });
});
