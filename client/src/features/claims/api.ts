import axios from "axios";
import { Claim, Dive } from "./types";

export async function writeClaim(props: Claim): Promise<Claim> {
  const response = await axios.post<Claim>("/claims", { ...props });
  return response.data;
}

export async function getDive(): Promise<Dive | null> {
  const response = await axios.get<Dive | null>("/claims/get-dive");
  return response.data;
}

export async function callCreateDive(): Promise<Dive> {
  const response = await axios.post<Dive>("/claims/new-dive");
  return response.data;
}
