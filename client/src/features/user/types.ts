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

export interface LoginUserProps {
  name: string;
  verifications: VerifyUserProps[];
}

export interface VerifyUserClient {
  partnerName: string;
  direction: Direction;
  password: string;
}

export interface LoginUserClient {
  token: string;
  verifications: VerifyUserClient[];
}

export const getOppositeDirection = (direction: Direction) => {
  switch (direction) {
    case Direction.up:
      return Direction.down;
    case Direction.right:
      return Direction.left;
    case Direction.down:
      return Direction.up;
    case Direction.left:
      return Direction.right;
  }
};