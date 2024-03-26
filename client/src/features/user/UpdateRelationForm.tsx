import { FormEvent, useEffect, useState } from "react";
import { loginUser, registerUser } from "./userApi";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { Direction } from "./types";
import { UserBox } from "./UserBox";

export const UpdateRelationForm = () => {
  const [name, setName] = useState<string>("");
  const [partner, setPartner] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registered, setRegistered] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setRegistered(false);
    setError("");
    // try {
    //   const res = await loginUser({ name, password });
    //   console.log(res);
    //   localStorage.setItem("TOKEN", res.token);
    //   localStorage.setItem("TOKEN", res.token);
    // } catch (e: any) {
    //   console.error(e);
    //   setError(e.response.data.message);
    // }
  };

  useEffect(() => {
    // me().then(({ name: userName }) => {
    //   setName(userName);
    // });
  }, []);
  return (
    <Container>
        <Row>
          <Col></Col>
          <Col>
          <UserBox name="" />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col><UserBox name={"name"} /></Col>
          <Col><UserBox name={"name"} /></Col>
          <Col><UserBox name={"name"} /></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
          <UserBox name="" />
          </Col>
          <Col></Col>
        </Row>
    </Container>
  );
};
