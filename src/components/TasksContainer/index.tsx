import Todo from "../../interface/Todo";
import { useMediaQuery } from "../../utils/useMediaQuery";

import TodoCard from "../TodoCard";

import "./styles.css";

interface TasksContainerProps {
  label: string;
  id: string;
  todos?: Todo[];
}

export default function TasksContainer({
  label,
  todos,
  id,
}: TasksContainerProps) {
  const isSmall = useMediaQuery("(max-width: 980px)");

  const hideContainer = (
    id: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    let taskContainer = document.querySelector<HTMLElement>(`#${id}`);

    if (isSmall) {
      if (taskContainer?.classList.contains("hidden")) {
        taskContainer?.classList.remove("hidden");

        setTimeout(() => {
          taskContainer
            ?.querySelector<HTMLElement>(".task-container-cards")
            ?.classList.remove("hidden");
        }, 300);
      } else {
        taskContainer?.classList.add("hidden");

        setTimeout(() => {
          taskContainer
            ?.querySelector<HTMLElement>(".task-container-cards")
            ?.classList.add("hidden");
        }, 100);
      }
    }
  };

  return (
    <div
      className="tasks-container"
      id={id}
      onClick={(e) => hideContainer(id, e)}
    >
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
