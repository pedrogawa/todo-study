import { useEffect, useCallback, useMemo } from "react";

import { useDispatch } from "react-redux";
import { subTaskIsDone } from "../../hooks/Todo/todoSlice";

import { BsListUl, BsThreeDots } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

import Todo from "../../interface/Todo";

import "./styles.css";

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const dispatch = useDispatch();

  const mappedSubTasksTitle = useMemo(() => {
    return todo.tasks.map((subtask) => {
      return {
        id: subtask.id,
        title: subtask.title,
        done: subtask.isDone,
      };
    });
  }, [todo]);

  const mappedSubTasks = useMemo(() => {
    return {
      title: todo.tasks.map((a) => a),
      todo: todo.tasks.filter((a) => a.isDone === true).length,
      done: todo.tasks.length,
    };
  }, [todo]);

  useEffect(() => {
    const percentage: string = (
      (mappedSubTasks.todo * 100) /
      mappedSubTasks.done
    ).toFixed(2);

    const progressBar = document.querySelector<HTMLDivElement>("#progress-bar");

    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
      if (Number(percentage) <= 25) {
        progressBar.style.backgroundColor = "red";
      } else if (Number(percentage) > 25 && Number(percentage) <= 75) {
        progressBar.style.backgroundColor = "orange";
      } else {
        progressBar.style.backgroundColor = "green";
      }
    }
  }, [mappedSubTasks]);

  const showSubTasks = () => {
    let subTasks = document.querySelector<HTMLElement>(".todo-subtasks");

    if (subTasks?.classList.contains("hidden")) {
      subTasks?.classList.remove("hidden");
    } else {
      subTasks?.classList.add("hidden");
    }
  };

  const changeSubTaskStatus = useCallback(
    (taskId: number, subTaskId: number) => {
      dispatch(subTaskIsDone({ taskId, subTaskId }));
    },

    [dispatch]
  );

  return (
    <div className="todo-card-container">
      <div className="todo-card-header">
        <div className="todo-card-title">
          <strong>{todo.title}</strong>
          <span>{todo.subtitle}</span>
        </div>
        <div className="todo-card-icon">
          <BsThreeDots />
        </div>
      </div>
      <div className="todo-card-progress-container">
        <div className="todo-card-progress-header" onClick={showSubTasks}>
          <div className="todo-card-progress-header-left">
            <BsListUl size={22} />
            <span>Progress</span>
          </div>
          <strong>
            {mappedSubTasks.todo}/{mappedSubTasks.done}
          </strong>
        </div>
        <div className="todo-subtasks">
          {mappedSubTasksTitle.map((subtask) => (
            <div
              className="subtasks"
              key={subtask.id}
              onClick={() => changeSubTaskStatus(todo.id, subtask.id)}
            >
              <span>{subtask.title}</span>
              <span>{subtask.done ? <AiOutlineCheck /> : ""}</span>
            </div>
          ))}
        </div>
        <div className="todo-card-progress-bar">
          <div id="progress-bar" />
        </div>
      </div>
      <div className="todo-card-footer">
        <div className="todo-card-date">
          <span>24 Aug 2022</span>
        </div>
      </div>
    </div>
  );
}
