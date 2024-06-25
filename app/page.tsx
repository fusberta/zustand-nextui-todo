'use client'

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import { CheckIcon, CircleCheckBigIcon, DeleteIcon, EditIcon, Rocket } from "lucide-react";
import { Todo, useStore } from "./store/store";
import { Key, useCallback, useState } from "react";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

type ColumnKey = 'id' | 'text' | 'completed' | 'actions';
const columns = [
  { name: "ID", uid: "id" },
  { name: "TEXT", uid: "text" },
  { name: "COMPLETED", uid: "completed" },
  { name: "ACTIONS", uid: "actions" },
];

export default function Home() {

  const [todo, setTodo] = useState<string>("");
  const { Todos, addTodo, removeTodo, completeTodo, updateTodo } = useStore();
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleAdd = () => {
    if (!todo.trim()) return alert("Please enter a todo");
    addTodo({ id: Todos.length + 1, text: todo, completed: false });
    setTodo("");
  }

  const handleEdit = (id: number, text: string) => {
    setEditTodoId(id);
    setEditText(text);
  }

  const handleUpdate = (id: number) => {
    if (!editText.trim()) return alert("Please enter a todo");
    updateTodo(id, editText);
    setEditTodoId(null);
    setEditText("");
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }

  const renderCell = useCallback((todo: Todo, columnKey: ColumnKey) => {
    const cellValue = todo[columnKey as keyof Todo];

    switch (columnKey) {

      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "text":
        return (
          editTodoId === todo.id ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="text-sm capitalize"
            />
          ) : (
            <p className="text-sm capitalize">{cellValue}</p>
          )
        );
      case "completed":
        return (
          <Chip className="capitalize" color={todo.completed ? "success" : "secondary"} size="sm" variant="flat">
            {cellValue.toString()}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center gap-2 w-full">
            {editTodoId === todo.id ? (
              <Tooltip content="Confirm edit">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleUpdate(todo.id)}>
                  <CheckIcon />
                </span>
              </Tooltip>
            ) : (
              <>
                <Tooltip content="Edit todo">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleEdit(todo.id, todo.text)}>
                    <EditIcon />
                  </span>
                </Tooltip>
                <Tooltip content="Complete todo">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => completeTodo(todo.id)}>
                    <CircleCheckBigIcon />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete todo">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => removeTodo(todo.id)}>
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, [editTodoId, editText]);


  return (
    <main>
      <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-500/10">
        <h1 className="text-3xl font-semibold tracking-wider">Welcome to Todo App</h1>
        <p className="mt-2">A todo app made with lots of love</p>
      </div>
      <div className="flex space-x-2 pt-16 w-5/6 mx-auto lg:w-1/3 ">
        <Input
          label='Add Todo'
          placeholder='make code review'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleAdd} variant="ghost" className="py-[26px]"><Rocket /></Button>
      </div>
      <div className="flex pt-8 items-center space-x-2 mb-3 w-5/6 mx-auto lg:w-1/3">
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={Todos}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey: Key) => <TableCell>{renderCell(item, columnKey as ColumnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
