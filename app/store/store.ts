import { create } from "zustand";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoState {
    Todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (id: number) => void;
    completeTodo: (id: number) => void;
    updateTodo: (id: number, text: string) => void;
}

export const useStore = create<TodoState>((set) => ({
    Todos: [],
    addTodo: (todo) => set((state) => ({ Todos: [...state.Todos, todo] })),
    removeTodo: (id: number) => set((state) => ({ Todos: state.Todos.filter((todo) => todo.id !== id) })),
    completeTodo: (id: number) => set((state) => ({ Todos: state.Todos.map((todo) => (todo.id === id? {...todo, completed:!todo.completed } : todo)) })),
    updateTodo: (id: number, text: string) => set((state) => ({ Todos: state.Todos.map((todo) => (todo.id === id? {...todo, text } : todo)) })),
}));