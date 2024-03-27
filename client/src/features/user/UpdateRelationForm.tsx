import { Direction, Partner } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { DisplayPartners } from "./DisplayPartners";

export const UpdateRelationForm = () => {
  const userName = useSelector((state: RootState) => state.user.user.name);
  const partners = useSelector((state: RootState) => state.user.partners);

  return (<></>
    // <Container>
    //   <DisplayPartners />
    //   <Row>
    //     Some update relations stuff
    //   </Row>
    // </Container>
  );
};
