import axios from "axios";
import { Todo } from "features/todoList/types";

// const baseUrl = "http://localhost:9000";

export async function readTodos(): Promise<Todo[]> {
  const response = await axios.get<Todo[]>('/testAPI/', {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  return response.data;
}

export async function writeTodos(todos: Todo[]) {
  await axios.put<Todo[]>('/testAPI/', todos);
}

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
)
