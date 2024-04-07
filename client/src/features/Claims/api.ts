import axios from "axios";
import { Claim } from "./types";

export async function writeClaim(props: Claim): Promise<Claim> {
  const response = await axios.post<Claim>("/claims", { ...props });
  return response.data;
}