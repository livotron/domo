import axios from "axios";
import {
  LoginUserProps,
  Partner,
  User,
  VerifyUserProps,
} from "./types";
import { Direction } from "readline";

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
      // password: User.password,
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
// export async function loginUser(User: User): Promise<loginPayload> {
//   const response = await axios.post<loginPayload>(
//     "/user/login-old",
//     {
//       name: User.name,
//       // password: User.password,
//     },
//     {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//       },
//     }
//   );

//   return response.data;
// }

export async function getMe(): Promise<User> {
  const response = await axios.get<User>("/user/me");

  return response.data;
}

export async function getUserByName(name: string): Promise<User> {
  const response = await axios.get<User>(`/user/by-name/${name}`);

  return response.data;
}

export async function searchUsersByName(name: string): Promise<User[]> {
  const response = await axios.get<User[]>(`/user/search-by-name/${name}`);
  return response.data;
}

export async function getPartners(name: string): Promise<Partner[]> {
  const response = await axios.get<Partner[]>(`/user/partners/${name}`);

  return response.data;
}

// interface loginPayload {
//   name: string;
//   token: string;
// }
// export async function loginUser(User: User): Promise<loginPayload> {
//   const response = await axios.post<loginPayload>("/user/login-old", {
//     name: User.name,
//     // password: User.password,
//   });

//   return response.data;
// }

export async function verifyUser(props: VerifyUserProps): Promise<Partner[]> {
  const response = await axios.post<Partner[]>("/user/verify", { ...props });
  return response.data;
}

interface loginPayload {
  partners: Partner[];
  token: string;
}

export async function loginUser(props: LoginUserProps): Promise<loginPayload> {
  const response = await axios.post<loginPayload>("/user/login", {...props});
  return response.data;
}
