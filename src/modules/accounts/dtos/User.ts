interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

interface ICreateUserTokenDTO {
  user_id: string;
  expires_in: Date;
  refresh_token: string;
}

export { ICreateUserDTO, ICreateUserTokenDTO };
