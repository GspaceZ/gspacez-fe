export interface IRole {
  description: string
  name: string
  permissions: any[]
}

export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: IRole[]
}
