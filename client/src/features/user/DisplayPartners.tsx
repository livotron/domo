import { FormEvent, useEffect, useState } from "react";
import { Direction, Partner, User } from "./types";
import { UserBox } from "./UserBox";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { Grid } from "@mui/material";
import { useAppDispatch } from "app/store";
import { fetchByName, fetchPartners, receiveUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

const getPartnerName = (partner: User | undefined) => {
  return partner ? partner.name : "X";
};

export const DisplayPartners = () => {
  const partners = useSelector((state: RootState) => state.user.partners);
  const userName = useSelector((state: RootState) => state.user.user.name);
  const myName = useSelector((state: RootState) => state.user.me.name);

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeUser = (name: string) => {
    // dispatch(fetchByName(name));
    navigate(`/comrades/${name}`)
  };
  // useEffect(() => {
  //   console.log(userName, myName);
  //   if (!userName && !myName) return;
  //   if (!userName) {
  //     // dispatch(receiveUser({ name: myName }));
  //     console.log('navigate to my')
  //     navigate(`/comrades/${myName}`)
  //     return;
  //   }
  //   dispatch(receiveUser({ name: userName }));
  //   console.log('Navigate to new comrade')
  //   navigate(`/comrades/${userName}`, {replace: false})
  //   dispatch(fetchPartners());
  // }, [userName, myName]);
  return (
    <div>
      <Grid
        container
        marginY={0}
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <UserBox changeUser={changeUser} name={getPartnerName(partners[0])} />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <UserBox changeUser={changeUser} name={getPartnerName(partners[3])} />
        </Grid>
        <Grid item xs={4}>
          <UserBox central changeUser={changeUser} name={userName} />
        </Grid>
        <Grid item xs={4}>
          <UserBox changeUser={changeUser} name={getPartnerName(partners[1])} />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <UserBox changeUser={changeUser} name={getPartnerName(partners[2])} />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
};
