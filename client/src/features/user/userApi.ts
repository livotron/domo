import axios from "axios";
import { User } from "./types";

export async function readUsers(): Promise<User> {
  const response = await axios.get<User>("/testAPI/", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  return response.data;
}

export async function registerUser(User: User): Promise<User> {
  const response = await axios.post<User>(
    "/users/register",
    {
      name: User.name,
      password: User.password,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  return response.data;
}
