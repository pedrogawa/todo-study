import { BsPlus } from "react-icons/bs";
import Todo from "../../interface/Todo";

import TodoCard from "../TodoCard";

import "./styles.css";

interface TasksContainerProps {
  label: string;
  todos?: Todo[];
  onClick: () => void;
}

export default function TasksContainer({
  label,
  todos,
  onClick,
}: TasksContainerProps) {
  return (
    <div className="tasks-container">
      <div className="tasks-container-header">
        <div className="tasks-container-header-text">
          <strong>{label}</strong>
        </div>
        <div className="tasks-container-add-new" onClick={onClick}>
          <div className="tasks-container-add-new-button">
            <BsPlus />
          </div>
          <strong>Add new task</strong>
        </div>
      </div>
      <div className="task-container-cards">
        {todos?.map((a) => (
          <TodoCard key={a.id} todo={a} />
        ))}
      </div>
    </div>
  );
}
