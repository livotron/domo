import { Card } from "react-bootstrap";

interface Props {
  name: string;
}
export const UserBox = ({ name }: Props) => {
  return (
    <Card className="text-center" style={{ width: "200px", height: "100px" }}>
      <Card.Body>{name? name : 'X'}</Card.Body>
    </Card>
  );
};
