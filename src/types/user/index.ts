export interface Role {
  description: string
  name: string
  permissions: any[]
}

export interface User {
  email: string
  firstName: string
  id: string
  lastName: string
  roles: Role[]
}
