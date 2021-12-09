import useSWR, { mutate } from "swr";
import { Project, Todo } from "../types";

const todoPath = "/api/todos";
const projectPath = "/api/projects";

export const useTodos = () => useSWR<Todo[]>(todoPath);
export const useProjects = () => useSWR<Project[]>(projectPath);

// TODO: Divide into multiple files for each model

export const createProject = async (title: string) => {
    mutate(projectPath, (projects) => [{ title, id: "new-project" }, ...projects], false);
    await fetch(projectPath, {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    mutate(projectPath);
  };

export async function getProject() {

}

export async function createTask() {

}

export async function toggleTask() {
    
}

export async function changeTask() {
    
}

export async function deleteTask() {
    
}

export const createTodo = async (text: string) => {
  mutate(todoPath, (todos) => [{ text, completed: false, id: "new-todo" }, ...todos], false);
  await fetch(todoPath, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  mutate(todoPath);
};

export const toggleTodo = async (todo: Todo) => {
  mutate(todoPath, (todos) => todos.map((t) => (t.id === todo.id ? { ...todo, completed: !t.completed } : t)), false);
  await fetch(`${todoPath}?todoId=${todo.id}`, {
    method: "PUT",
    body: JSON.stringify({ completed: !todo.completed }),
  });
  mutate(todoPath);
};

export const deleteTodo = async (id: string) => {
  mutate(todoPath, (todos) => todos.filter((t) => t.id !== id), false);
  await fetch(`${todoPath}?todoId=${id}`, { method: "DELETE" });
  mutate(todoPath);
};
