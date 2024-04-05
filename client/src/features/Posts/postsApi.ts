import axios from "axios";
import { Post } from "./types";

export async function writePost(props: Post): Promise<Post> {
  const response = await axios.post<Post>("/user/verify", { ...props });
  return response.data;
}