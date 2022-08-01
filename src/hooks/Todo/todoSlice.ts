import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../../interface/Todo";

interface TodoSliceState {
  todos: Todo[];
}

interface SubTaskIsDone {
  taskId: number;
  subTaskId: number;
}

interface UpdateTaskStatus {
  taskId: number;
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
          isDone: false,
        },
      ],
      status: "TODO",
    },
    {
      id: 2,
      title: "asdsad",
      subtitle: "Configure React Redux",
      tasks: [
        {
          id: 1,
          title: "Cvzzxc",
          isDone: false,
        },
        {
          id: 2,
          title: "Setsad",
          isDone: false,
        },
        {
          id: 3,
          title: "Setqweqws",
          isDone: false,
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
    updateTaskStatus: (state, action: PayloadAction<UpdateTaskStatus>) => {
      const todoIndex = state.todos.findIndex(
        (a) => a.id === action.payload.taskId
      );

      const taskTodo = state.todos[todoIndex].tasks.filter(
        (a) => a.isDone === true
      ).length;
      const taskInProgress = state.todos[todoIndex].tasks.some(
        (a) => a.isDone === true
      );
      const taskIsDone = state.todos[todoIndex].tasks.every(
        (a) => a.isDone === true
      );

      if (taskTodo === 0) {
        state.todos[todoIndex].status = "TODO";
      }

      if (taskInProgress) {
        state.todos[todoIndex].status = "PROGRESS";
      }

      if (taskIsDone) {
        state.todos[todoIndex].status = "DONE";
      }

      state.todos = [...state.todos];
    },
    deleteTask: (state, action: PayloadAction<UpdateTaskStatus>) => {
      const filteredTasks = state.todos.filter(
        (task) => task.id !== action.payload.taskId
      );

      state.todos = filteredTasks;
    },
    selectTask: (state, action: PayloadAction<UpdateTaskStatus>) => {
      const filteredTask = state.todos.filter(
        (task) => task.id === action.payload.taskId
      );

      state.todos = filteredTask;
    },
  },
});

export const {
  addTodo,
  selectTask,
  deleteTask,
  subTaskIsDone,
  updateTaskStatus,
} = todoSlice.actions;
