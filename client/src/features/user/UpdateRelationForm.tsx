import { Direction, Partner } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { DisplayPartners } from "./DisplayPartners";
import { Container } from "@mui/material";

export const UpdateRelationForm = () => {
  const userName = useSelector((state: RootState) => state.user.user.name);
  const partners = useSelector((state: RootState) => state.user.partners);

  return (
    <>
      <DisplayPartners />
      <div>
        Some update relations stuff
      </div>
    </>
  );
};
