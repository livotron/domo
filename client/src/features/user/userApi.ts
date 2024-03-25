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
    "/user/register",
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

interface loginPayload {
  name: string;
  token: string;
}
export async function loginUser(User: User): Promise<loginPayload> {
  const response = await axios.post<loginPayload>(
    "/user/login",
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

export async function me(): Promise<{ name: string }> {
  const response = await axios.get<{ name: string }>("/user/me");

  return response.data;
}
