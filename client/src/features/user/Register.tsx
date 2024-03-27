import { FormEvent, useState } from "react";
import { registerUser } from "./userApi";

export const Register = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registered, setRegistered] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setRegistered(false);
    setError("");
    // try {
    //   const res = await registerUser({ name, password })
    //   console.log(res)
    //   setRegistered(true);
    // } catch(e: any) {
    //   console.error(e)
    //   setError(e.response.data.message)
    // }
    
  };
  return (
    <>
      <h2>Register</h2>
      {/* <Form onSubmit={(e) => handleSubmit(e)}>
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
        <Button variant="primary" type="submit" disabled={registered}>
          Submit
        </Button>
        {registered && (
          <p className="textSuccess">You are registered sucessfully</p>
        )}
        {error && (
          <p className="text-danger">{error}</p>
        )}
      </Form> */}
    </>
  );
};
