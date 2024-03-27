import { FormEvent, useEffect, useState } from "react";
import { loginUser, registerUser } from "./userApi";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
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
  const sortedPartners = [
    partners.find((partner) => partner.direction === Direction.up),
    partners.find((partner) => partner.direction === Direction.right),
    partners.find((partner) => partner.direction === Direction.down),
    partners.find((partner) => partner.direction === Direction.left),
  ];

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <UserBox name={getPartnerName(sortedPartners[0])} />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <UserBox name={getPartnerName(sortedPartners[3])} />
        </Col>
        <Col>
          <UserBox name={userName} />
        </Col>
        <Col>
          <UserBox name={getPartnerName(sortedPartners[1])} />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <UserBox name={getPartnerName(sortedPartners[2])} />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
