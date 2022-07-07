import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../../interface/Todo";

interface TodoSliceState {
  todos: Todo[];
}

interface SubTaskIsDone {
  taskId: number;
  subTaskId: number;
}

const initialState: TodoSliceState = {
  todos: [
    {
      id: 1,
      title: "React Redux",
      subtitle: "Configure React Redux",
      tasks: [
        {
          id: 1,
          title: "Create Store",
          isDone: false,
        },
        {
          id: 2,
          title: "Setup slicers",
          isDone: false,
        },
        {
          id: 3,
          title: "Setup actions",
          isDone: true,
        },
      ],
      status: "TODO",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [
        ...state.todos,
        {
          id: state.todos.length + 1,
          status: action.payload.status,
          subtitle: action.payload.subtitle,
          tasks: action.payload.tasks,
          title: action.payload.title,
        },
      ];
    },
    subTaskIsDone: (state, action: PayloadAction<SubTaskIsDone>) => {
      const todoIndex = state.todos.findIndex(
        (a) => a.id === action.payload.taskId
      );
      const subTaskIndex = state.todos[todoIndex].tasks.findIndex(
        (b) => b.id === action.payload.subTaskId
      );

      state.todos[todoIndex].tasks[subTaskIndex].isDone =
        !state.todos[todoIndex].tasks[subTaskIndex].isDone;

      state.todos = [...state.todos];
    },
  },
});

export const { addTodo, subTaskIsDone } = todoSlice.actions;
