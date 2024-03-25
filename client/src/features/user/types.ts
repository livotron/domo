export type User = {
  name: string,
  password: string,
}


export enum Direction {
  up = "UP",
  right = "RIGHT",
  left = "LEFT",
  down = 'DOWN'
}

export type ValidationRelation = {
  direction: Direction,
  hash: string
}