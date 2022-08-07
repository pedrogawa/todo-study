import React, { useEffect, useCallback, useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  selectTask,
  subTaskIsDone,
  updateTaskStatus,
} from "../../hooks/Todo/todoSlice";
import { selectTodoCards } from "../../hooks/store";

import { BsListUl, BsTrash } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

import Todo from "../../interface/Todo";

import "./styles.css";
import { showModal } from "../../utils/showModal";

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodoCards);

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
      id: todo.id,
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

    const progressBar = document.querySelector<HTMLDivElement>(
      `#progress-bar-${mappedSubTasks.id}`
    );

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
  }, [mappedSubTasks, todos]);

  const showSubTasks = useCallback(
    (id: number, event: React.MouseEvent<HTMLDivElement>) => {
      const subTask = document.querySelector<HTMLElement>(
        `.todo-subtasks-${id}`
      );
      event.stopPropagation();
      if (subTask) {
        if (subTask.style.display === "none") {
          subTask.style.display = "";
          subTask.style.maxHeight = "fit-content";
        } else {
          subTask.style.display = "none";
        }
      }
    },
    []
  );

  const changeSubTaskStatus = useCallback(
    (
      taskId: number,
      subTaskId: number,
      event: React.MouseEvent<HTMLDivElement>
    ) => {
      event.stopPropagation();
      dispatch(subTaskIsDone({ taskId, subTaskId }));
      dispatch(updateTaskStatus({ taskId }));
    },
    [dispatch]
  );

  const onDeleteTask = (
    taskId: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    dispatch(deleteTask({ taskId }));
  };

  const onSelect = (taskId: number) => {
    console.log(taskId);
    dispatch(selectTask({ taskId }));
  };

  return (
    <div className="todo-card-container" onClick={showModal}>
      <div className="todo-card-header">
        <div className="todo-card-title" onClick={() => onSelect(todo.id)}>
          <strong>{todo.title}</strong>
          <span>{todo.subtitle}</span>
        </div>
        <div
          className="todo-card-icon"
          onClick={(e) => onDeleteTask(todo.id, e)}
        >
          <BsTrash />
        </div>
      </div>
      <div className="todo-card-progress-container">
        <div
          className="todo-card-progress-header"
          onClick={(e) => showSubTasks(todo.id, e)}
        >
          <div className="todo-card-progress-header-left">
            <BsListUl size={22} />
            <span>Progress</span>
          </div>
          <strong>
            {mappedSubTasks.todo}/{mappedSubTasks.done}
          </strong>
        </div>
        <div className={`todo-subtasks-${todo.id}`}>
          {mappedSubTasksTitle.map((subtask) => (
            <div
              className="subtasks"
              key={subtask.id}
              onClick={(event) =>
                changeSubTaskStatus(todo.id, subtask.id, event)
              }
            >
              <span>{subtask.title}</span>
              <span>{subtask.done ? <AiOutlineCheck /> : ""}</span>
            </div>
          ))}
        </div>
        <div className="todo-card-progress-bar">
          <div id={`progress-bar-${todo.id}`} />
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
