export type User = {
  name: string
}


export enum Direction {
  up = "UP",
  right = "RIGHT",
  left = "LEFT",
  down = 'DOWN'
}

export type Partner = {
  direction: Direction,
  user: User
}

export type ValidationRelation = {
  direction: Direction,
  hash: string
}

export interface VerifyUserProps {
  partnerName: string;
  direction: Direction;
  hash: string;
}