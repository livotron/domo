
export type Claim = {
  title: string,
  text: string,
  level: number,
  createdAt?: string
}

export type Dive = {
  createdAt: string,
  stopAt: string,
  level: number,
  acknowlegmentLogs: string[]
}