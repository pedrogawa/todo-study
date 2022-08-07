import { useMemo } from "react";

import "./styles.css";

import { BsPlus } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";

import { useSelector } from "react-redux";
import { selectTodoCards } from "../../hooks/store";

import TasksContainer from "../TasksContainer";

import { showModal } from "../../utils/showModal";

export default function RightContainer() {
  const todos = useSelector(selectTodoCards);

  const mappedTodos = useMemo(() => {
    return {
      todos: {
        tasks: todos.filter((a) => a.status === "TODO"),
        length: todos.filter((a) => a.status === "TODO").length,
      },
      inProgress: {
        tasks: todos.filter((a) => a.status === "PROGRESS"),
        length: todos.filter((a) => a.status === "PROGRESS").length,
      },
      done: {
        tasks: todos.filter((a) => a.status === "DONE"),
        length: todos.filter((a) => a.status === "DONE").length,
      },
    };
  }, [todos]);

  return (
    <div className="right-container">
      <div className="right-header">
        <strong>Welcome back, Pedro 👋🏻</strong>
        <div className="right-left-header">
          <div className="right-left-date">
            <AiOutlineCalendar size={22} />
            <span>19 May 2022</span>
          </div>
        </div>
      </div>
      <div className="tasks-container-add-new" onClick={showModal}>
        <div className="tasks-container-add-new-button">
          <BsPlus />
        </div>
        <strong>Add new task</strong>
      </div>
      <div className="right-content-tasks">
        <TasksContainer
          label={`To do (${mappedTodos.todos.length})`}
          todos={mappedTodos.todos.tasks}
        />
        <TasksContainer
          label={`In progress (${mappedTodos.inProgress.length})`}
          todos={mappedTodos.inProgress.tasks}
        />
        <TasksContainer
          label={`Done (${mappedTodos.done.length})`}
          todos={mappedTodos.done.tasks}
        />
      </div>
    </div>
  );
}
