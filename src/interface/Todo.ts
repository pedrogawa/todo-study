export default interface Todo {
  id: number;
  title: string;
  subtitle: string;
  tasks: Task[];
  status: "TODO" | "PROGRESS" | "DONE";
}

export interface Task {
  id: number;
  title: string;
  isDone: boolean;
}
