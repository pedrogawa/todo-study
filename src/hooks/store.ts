import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./Todo/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectTodoCards = (state: RootState) => state.todos.todos;
export const selectedTodo = (state: RootState) => state.todos.selectedTodo;

export default store;
