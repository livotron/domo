import axios from "axios";
import { Claim, Dive } from "./types";

export interface WriteClaimProps {
  title: string;
  text: string;
  level: number;
}
export async function writeClaim(props: WriteClaimProps): Promise<Claim> {
  const response = await axios.post<Claim>("/claims", props);
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

export async function callIncrementDive(): Promise<Dive> {
  const response = await axios.post<Dive>("/claims/increment-dive");
  return response.data;
}

export interface AcknowledgeClaimProps {
  creationTime: string;
  creatorName: string;
}

export async function acknowledgeClaimCall(
  props: AcknowledgeClaimProps
): Promise<Dive> {
  const response = await axios.post<Dive>("/claims/acknowledge", props);
  return response.data;
}

export async function fetchClaims(): Promise<Claim[]> {
  const response = await axios.get<Claim[]>("/claims/get-claims");
  return response.data;
}
