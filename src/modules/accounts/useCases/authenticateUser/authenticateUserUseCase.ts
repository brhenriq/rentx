import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/implementations/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findUserByEmail(email);

    if (!userExists) {
      throw new Error('Incorrect email/password');
    }

    const passwordMatch = compare(password, userExists.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email/password');
    }

    const payload = {
      email: userExists.email,
      name: userExists.name,
      id: userExists.id,
    };

    const token = sign(payload, '4ff2a0f940bfb62074336ed46dc7d42f', {
      subject: userExists.id,
      expiresIn: '1d',
    });

    return {
      user: {
        name: userExists.name,
        email: userExists.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
