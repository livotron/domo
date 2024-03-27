import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthComponent() {
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("TOKEN");
    navigate("/");
  };
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "/testAPI/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }, []);

  return (
    <div>
      <h1 className="text-center">Auth Component</h1>
      <h3 className="text-center text-danger">{message}</h3>
      {/* <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button> */}
    </div>
  );
}
