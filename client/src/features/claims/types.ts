import { User } from "features/user/types"

export type Claim = {
  title: string,
  text: string,
  level: number,
  createdAt: string,
  createdBy: User
}

export type Dive = {
  createdAt: string,
  stopAt: string,
  level: number,
  acknowlegmentLogs: string[]
}