import { Card } from "@mui/material";

interface Props {
  name: string;
  changeUser: (name: string) => void;
  central?: boolean
}
export const UserBox = ({ name, changeUser, central }: Props) => {
  return (
    <Card onClick={() => !central && changeUser(name)}>
      {name? name : 'X'}
    </Card>
  );
};
