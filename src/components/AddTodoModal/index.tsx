import { useCallback, useEffect } from "react";
import { selectTodoCards } from "../../hooks/store";

import { useSelector, useDispatch } from "react-redux";

import { addTodo, selectTask } from "../../hooks/Todo/todoSlice";

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

export default function AddTodoModal() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodoCards);

  const methods = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (todos.selectedTodo) {
      methods.setValue("title", `${todos.selectedTodo.title}`);
      methods.setValue("subtitle", `${todos.selectedTodo.subtitle}`);
      methods.setValue("tasks", todos.selectedTodo.tasks);
    }
  }, [todos.selectedTodo, methods]);

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
    dispatch(selectTask({ taskId: 0 }));

    if (modal) {
      modal.classList.add("hidden");
    }
  }, [methods, dispatch]);

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
