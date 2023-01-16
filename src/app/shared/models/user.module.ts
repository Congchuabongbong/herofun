export class User {
  username?: string;
  password?: string;
  confirmPassword?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface Profile{
  id: number,
  firstName: string,
  account: {
    id: number;
    username: string;
  },
  lastName: string,
  dateOfBirth: string,
  email: string,
  avatar: string,
  phone: string,
  address: string,
  createdAt: string,
  updatedAt: string

}
