import { Card } from "@mui/material";

interface Props {
  name: string;
  changeUser: (name: string) => void;
}
export const UserBox = ({ name, changeUser }: Props) => {
  return (
    <Card onClick={() => changeUser(name)}>
      {name? name : 'X'}
    </Card>
  );
};
