export interface IUser {
  username: string,
  classe: string,
  level: number,
  password: string,
}

export interface UserId extends IUser {
  id: number
}