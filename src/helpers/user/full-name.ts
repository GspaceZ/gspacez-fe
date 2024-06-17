import { Profile } from '@/types/profile'

export const fullName = (profile: Profile): string => {
  return profile.firstName + ' ' + profile.lastName
}
