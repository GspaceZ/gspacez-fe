export interface IRole {
  description: string
  name: string
}

export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: IRole[]
}
