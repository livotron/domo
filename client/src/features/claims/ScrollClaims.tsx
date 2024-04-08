import { useAppDispatch } from "app/store";
import { useEffect } from "react";
import {
  acknowledgeClaim,
  cleanClaims,
  createDive,
  getClaims,
  incrementDive,
} from "./slice";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { Button, Typography } from "@mui/material";
import { Claim } from "./types";
import { DateTime } from "luxon";

type ClaimStatus = "DONE" | "IN_PROGRESS" | "IN_QUEUE";
interface ClaimWithStatus {
  claim: Claim;
  status: ClaimStatus;
}
export const ScrollClaims = () => {
  const {
    claims,
    myDive: dive,
    claimsInitiated,
    loading,
  } = useSelector((state: RootState) => state.claims);

  let shown = false;
  const claimsWithStatus = claims.map<ClaimWithStatus>((claim) => {
    if (claim.createdAt <= dive.stopAt) {
      return { claim, status: "DONE" };
    }
    if (!shown) {
      shown = true;
      return { claim, status: "IN_PROGRESS" };
    }
    return { claim, status: "IN_QUEUE" };
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!claimsInitiated) dispatch(getClaims());
  }, [dispatch, claimsInitiated]);

  const handleDiveIncrement = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(cleanClaims());
    dispatch(incrementDive());
  };

  const handleDiveRestart = () => {
    dispatch(cleanClaims());
    dispatch(createDive());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAcknowledgePressed = (
    creationTime: string,
    creatorName: string
  ) => {
    dispatch(acknowledgeClaim({ creationTime, creatorName }));
  };

  const readInProgress = Boolean(
    claimsWithStatus.find((cws) => cws.status === "IN_PROGRESS")
  );

  const listOfClaims = claimsWithStatus.map((cws) => {
    return (
      <div key={cws.claim.createdAt}>
        <Typography variant="h5">{cws.claim.title}</Typography>
        <br />
        <Typography>{cws.claim.text}</Typography>
        <br />
        <Typography>By: {cws.claim.createdBy.name}</Typography>
        <br />
        <Typography>At: {cws.claim.createdAt}</Typography>
        <Button
          type="submit"
          variant="contained"
          onClick={() =>
            handleAcknowledgePressed(
              cws.claim.createdAt,
              cws.claim.createdBy.name
            )
          }
          disabled={cws.status !== "IN_PROGRESS" || loading}
        >
          {cws.status === "IN_QUEUE" ? "НА ЧЕРЗІ" : "ОЗНАЙОМЛЕНИЙ"}
        </Button>
      </div>
    );
  });
  return (
    <div>
      {listOfClaims}
      <br />
      <Button
        type="submit"
        variant="contained"
        onClick={handleDiveIncrement}
        disabled={loading || readInProgress || dive.level > 8}
      >
        НАСТУПНИЙ РІВЕНЬ
      </Button>
      <Button
        type="submit"
        variant="contained"
        onClick={handleDiveRestart}
        disabled={loading || readInProgress || dive.level < 2}
      >
        БАЗОВИЙ РІВЕНЬ
      </Button>
    </div>
  );
};
