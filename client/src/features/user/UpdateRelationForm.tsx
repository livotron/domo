import { Direction, Partner } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { DisplayPartners } from "./DisplayPartners";
import { Container } from "@mui/material";
import { ValidateForm } from "./ValidateForm";

export const UpdateRelationForm = () => {

  return (
    <>
      <DisplayPartners />
      <ValidateForm />
    </>
  );
};
