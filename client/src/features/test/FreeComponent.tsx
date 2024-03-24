import axios from "axios";
import { useEffect, useState } from "react";

export default function FreeComponent() {
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    axios.get<{message: string}>('/testApi/free-endpoint')
      .then((res) => {
        setMessage(res.data.message)
      })
      .catch((e) => console.log(e.response.data.message))
  }, [])
  return (
    <div>
      <h1 className="text-center">Free Component</h1>
      <h3 className="text-center text-danger">{message}</h3>
    </div>
  );
}