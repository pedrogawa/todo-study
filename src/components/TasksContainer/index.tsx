import Todo from "../../interface/Todo";

import TodoCard from "../TodoCard";

import "./styles.css";

interface TasksContainerProps {
  label: string;
  todos?: Todo[];
}

export default function TasksContainer({ label, todos }: TasksContainerProps) {
  return (
    <div className="tasks-container">
      <div className="tasks-container-header">
        <div className="tasks-container-header-text">
          <strong>{label}</strong>
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
