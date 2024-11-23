export interface IProfile {
  id: string
  phone: string
  country: string
  city: string
  address: string
  dob: Date
  shortDesc: string
  fullDesc: string
  avtUrl: string
  firstName: string
  lastName: string
}

export interface ProfileInfoProps {
  avatar: string
  name: string
  shortDesc: string
  fullDesc: string
  facebook: string
  instagram: string
}
