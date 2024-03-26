import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { loginUser } from "./userApi";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, setLogin] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLogin(false);
    setError("");
    // try {
    //   const res = await loginUser({ name, password });
    //   console.log(res);
    //   localStorage.setItem("TOKEN", res.token);
    //   setLogin(true);
    //   navigate("/auth");
    // } catch (e: any) {
    //   console.error(e);
    //   setError(e.response.data.message);
    // }
  };
  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
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
        <Button variant="primary" type="submit" disabled={login}>
          Submit
        </Button>
        {login && <p className="textSuccess">You are logged in sucessfully</p>}
        {error && <p className="text-danger">{error}</p>}
      </Form>
    </>
  );
};
