export interface IProfile {
  id: string
  phone: string
  country: string
  city: string
  address: string
  dob: Date
  shortDescription: string
  fullDescription: string
  avtUrl: string
  firstName: string
  lastName: string
}

export interface ProfileInfoProps {
  avatar: string
  name: string
  shortDescription: string
  fullDescription: string
  facebook: string
  instagram: string
}
