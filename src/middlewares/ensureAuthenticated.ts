import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/UsersRepository';

interface IPayload {
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(
      token,
      '4ff2a0f940bfb62074336ed46dc7d42f',
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const userExists = usersRepository.findUserById(user_id);

    if (!userExists) {
      throw new Error('User does not exists!');
    }

    next();
  } catch (error) {
    throw new Error(error.message || 'Invalid Token');
  }
}
