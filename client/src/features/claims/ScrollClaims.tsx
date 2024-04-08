import { useAppDispatch } from "app/store";
import { useEffect } from "react";
import { createDive, getClaims, incrementDive } from "./slice";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { Button, Typography } from "@mui/material";

export const ScrollClaims = () => {
  const claims = useSelector((state: RootState) => state.claims.claims);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getClaims());
  }, [dispatch]);

  const handleDiveIncrement = () => {
    dispatch(incrementDive());
  };

  const handleDiveRestart = () => {
    dispatch(createDive());
  };

  const listOfClaims = claims.map((claim) => {
    return (
      <>
        <Typography variant="h5">{claim.title}</Typography>
        <br />
        <Typography>{claim.text}</Typography>
        <br />
        <Typography>By: {claim.createdBy.name}</Typography>
        <br />
        <Typography>At: {claim.createdAt}</Typography>
      </>
    );
  });
  return (
    <div>
      {listOfClaims}
      <Button
        type="submit"
        variant="contained"
        onClick={handleDiveIncrement}
        disabled={claims.length > 0}
      >
        ПІДГРУЗКА
      </Button>
      <Button
        type="submit"
        variant="contained"
        onClick={handleDiveRestart}
        disabled={claims.length > 0}
      >
        З ПОЧАТКУ
      </Button>
    </div>
  );
};
