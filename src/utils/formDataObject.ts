import * as Yup from "yup";

interface Task {
  title: string;
  isDone: boolean;
}

export const formSchema = Yup.object().shape({
  title: Yup.string().required("Title is required."),
  subtitle: Yup.string().required("Subtitle is required."),
  tasks: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title for subtask is required."),
      isDone: Yup.boolean(),
    })
  ),
});

export type FormData = {
  title: string;
  subtitle: string;
  tasks: Task[];
};
