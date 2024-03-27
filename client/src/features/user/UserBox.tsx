import { Card } from "@mui/material";

interface Props {
  name: string;
}
export const UserBox = ({ name }: Props) => {
  return (
    <Card >
      {name? name : 'X'}
    </Card>
  );
};
