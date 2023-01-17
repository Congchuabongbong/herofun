export class User {
  username?: string;
  password?: string;
  confirmPassword?: string;
  accessToken?: string;
  refreshToken?: string;
}

export class Profile{
  constructor() {
    this.id = 0;
    this.firstName = "";
    this.account = new AccountBasic();
    this.lastName = "";
    this.dateOfBirth = "";
    this.email = "";
    this.avatar = "";
    this.phone = "";
    this.address = "";
    this.createdAt = "";
    this.updatedAt = "";
  }
  public id: number;
  public firstName: string;
  public account: AccountBasic;
  public lastName: string;
  public dateOfBirth: string;
  public email: string;
  public avatar: string;
  public phone: string;
  public address: string;
  public createdAt: string;
  public updatedAt: string;
}

export class AccountBasic{

  constructor() {
    this.id = 0;
    this.username = "";
  }
  public id: number;
  public username: string;
}
