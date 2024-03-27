import { FormEvent, useEffect, useState } from "react";
import { loginUser, registerUser } from "./userApi";
import { Direction, Partner } from "./types";
import { UserBox } from "./UserBox";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";

const getPartnerName = (partner: Partner | undefined) => {
  return partner ? partner.user.name : "X";
};

export const DisplayPartners = () => {
  const userName = useSelector((state: RootState) => state.user.user.name);
  const partners = useSelector((state: RootState) => state.user.partners);

  return (<></>
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
