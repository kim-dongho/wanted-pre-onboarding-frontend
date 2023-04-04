import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  },
});

export default {
  signUpMember(payload: object) {
    return instance.post("/auth/signup", payload);
  },
  signInMember(payload: object) {
    return instance.post("/auth/signin", payload);
  },
  createTodo(payload: { todo: string }) {
    return instance.post("/todos", payload);
  },
  getTodo() {
    return instance.get("/todos");
  },
  updateTodo(id: number, payload: { todo: string; isCompleted: boolean }) {
    return instance.put(`/todos/${id}`, payload);
  },
  deleteTodo(id: number) {
    return instance.delete(`/todos/${id}`);
  },
};
