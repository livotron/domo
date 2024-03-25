import { FormEvent, useEffect, useState } from "react";
import { loginUser, me, registerUser } from "./userApi";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Direction } from "./types";

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
    try {
      const res = await loginUser({ name, password });
      console.log(res);
      localStorage.setItem("TOKEN", res.token);
      localStorage.setItem("TOKEN", res.token);
    } catch (e: any) {
      console.error(e);
      setError(e.response.data.message);
    }
  };

  useEffect(() => {
    me().then(({ name: userName }) => {
      setName(userName);
    });
  }, []);
  return (
    <Col>
      <Row>
        <h2>Register</h2>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={name}
              disabled
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPartner">
            <Form.Label>Partner's Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Partner's name"
              name="partner"
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formSelectDirection">
            <Form.Label>Select direction</Form.Label>
            <Form.Select>
              {Object.entries(Direction).map((dir) => (
                <option value={dir[1]}>{dir[0]}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={registered}>
            Submit
          </Button>
          {registered && (
            <p className="textSuccess">You are registered sucessfully</p>
          )}
          {error && <p className="text-danger">{error}</p>}
        </Form>
      </Row>
    </Col>
  );
};
