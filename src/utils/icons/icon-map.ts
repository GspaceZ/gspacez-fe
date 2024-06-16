import { IconType } from 'react-icons'
import {
  GoSidebarCollapse,
  GoHome,
  GoSearch,
  GoStopwatch
} from 'react-icons/go'
import { CgProfile } from 'react-icons/cg'
import { CiStreamOn } from 'react-icons/ci'
import { LuFlag } from 'react-icons/lu'
import { BsSend } from "react-icons/bs"
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5"
import { PiMessengerLogo } from "react-icons/pi"

export const iconMap: Record<string, IconType> = {
  GoSidebarCollapse: GoSidebarCollapse,
  GoHome: GoHome,
  GoSearch: GoSearch,
  GoStopwatch: GoStopwatch,
  CgProfile: CgProfile,
  CiStreamOn: CiStreamOn,
  LuFlag: LuFlag,
  BsSend: BsSend,
  IoNotificationsOutline: IoNotificationsOutline,
  IoSettingsOutline: IoSettingsOutline,
  PiMessengerLogo: PiMessengerLogo
}
