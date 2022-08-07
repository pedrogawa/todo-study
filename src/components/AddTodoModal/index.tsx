import { useCallback, useEffect } from "react";
import { selectedTodo } from "../../hooks/store";

import { useSelector, useDispatch } from "react-redux";

import { addTodo } from "../../hooks/Todo/todoSlice";

import { Task } from "../../interface/Todo";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  SubmitHandler,
  useForm,
  FormProvider,
  useFieldArray,
} from "react-hook-form";

import { FormData, formSchema } from "../../utils/formDataObject";

import "./styles.css";
import { AiOutlineClose } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";

import { FormInput, DynamicInput } from "../FormInput";

interface AddTodoModalProps {
  id: number;
}

export default function AddTodoModal({ id }: AddTodoModalProps) {
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectedTodo);

  const methods = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (selectedTask) {
      methods.setValue("title", `${selectedTask.title}`);
      methods.setValue("subtitle", `${selectedTask.subtitle}`);
      methods.setValue("tasks", selectedTask.tasks);
    }
  }, [selectedTask, methods]);

  const { fields, append } = useFieldArray({
    name: "tasks",
    control: methods.control,
  });

  const { errors } = methods.formState;

  const showModal = useCallback(() => {
    const modal = document.querySelector<HTMLElement>(
      ".add-todo-container-modal"
    );

    methods.reset({ tasks: [], title: "", subtitle: "" });

    if (modal) {
      if (modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
      } else {
        modal.classList.add("hidden");
      }
    }
  }, [methods]);

  const handleForm: SubmitHandler<FormData> = useCallback(
    ({ title, subtitle, tasks }) => {
      const tasksMapped: Task[] = tasks.map((task, index) => {
        return {
          id: index,
          title: task.title,
          isDone: task.isDone,
        };
      });

      if (tasksMapped.length > 0) {
        dispatch(
          addTodo({
            id: 0,
            title,
            subtitle,
            tasks: tasksMapped,
            status: "TODO",
          })
        );

        showModal();
      }
    },
    [dispatch, showModal]
  );

  const addInput = () => {
    append({ title: "", isDone: false });
  };

  return (
    <div className="add-todo-container-modal hidden">
      <div className="add-todo-container">
        <div className="add-todo-container-header">
          <h2>Add Todo Modal</h2>
          <AiOutlineClose onClick={showModal} size={26} />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleForm)}>
            <FormInput name="title" label="Title" error={errors.title} />
            <FormInput
              name="subtitle"
              label="Subtitle"
              error={errors.subtitle}
            />

            <div className="new-subtask-container">
              <strong>Add new task</strong>
              <div className="new-subtask-button" onClick={addInput}>
                <BsPlus />
              </div>
            </div>
            <div className="subtask-container">
              {fields.map((item, index) => (
                <DynamicInput
                  key={index}
                  id={index}
                  error={errors?.tasks?.[index]?.title}
                />
              ))}
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
