import { ICreateUserTokenDTO } from '@modules/accounts/dtos/UserTokens';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findUserByIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      userToken =>
        userToken.refresh_token === refresh_token &&
        userToken.user_id === user_id,
    );
  }

  async findByToken(token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      userToken => userToken.refresh_token === token,
    );
  }

  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex(userToken => userToken.id === id);

    this.usersTokens.splice(index);
  }
}

export { UsersTokensRepositoryInMemory };
