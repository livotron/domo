import { FormEvent, useEffect, useState } from "react";
import { loginUser, registerUser } from "./userApi";
import { Direction, Partner } from "./types";
import { UserBox } from "./UserBox";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { Grid } from "@mui/material";

const getPartnerName = (partner: Partner | undefined) => {
  return partner ? partner.user.name : "X";
};

export const DisplayPartners = () => {
  const userName = useSelector((state: RootState) => state.user.user.name);
  const partners = useSelector((state: RootState) => state.user.partners);

  return (
    <Grid container spacing={8} justifyContent="center">
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <UserBox name={getPartnerName(partners[0])} />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <UserBox name={getPartnerName(partners[3])} />
      </Grid>
      <Grid item xs={4}>
        <UserBox name={userName} />
      </Grid>
      <Grid item xs={4}>
        <UserBox name={getPartnerName(partners[1])} />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <UserBox name={getPartnerName(partners[2])} />
      </Grid>
      <Grid item xs={4}></Grid>
    </Grid>
    // <Container>
    //   <Row>
    //     <Col></Col>
    //     <Col>
    //       <UserBox name={getPartnerName(partners[0])} />
    //     </Col>
    //     <Col></Col>
    //   </Row>
    //   <Row>
    //     <Col>
    //       <UserBox name={getPartnerName(partners[3])} />
    //     </Col>
    //     <Col>
    //       <UserBox name={userName} />
    //     </Col>
    //     <Col>
    //       <UserBox name={getPartnerName(partners[1])} />
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col></Col>
    //     <Col>
    //       <UserBox name={getPartnerName(partners[2])} />
    //     </Col>
    //     <Col></Col>
    //   </Row>
    // </Container>
  );
};
