import { create } from "zustand";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoState {
    Todos: Todo[];
    addTodo: (todo: Todo) => void;
}

export const useStore = create<TodoState>((set) => ({
    Todos: [],
    addTodo: (todo) => set((state) => ({ Todos: [...state.Todos, todo] })),
    removeTodo: (id: number) => set((state) => ({ Todos: state.Todos.filter((todo) => todo.id! == id) })),
}));