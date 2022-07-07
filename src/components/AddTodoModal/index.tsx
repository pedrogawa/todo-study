import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { addTodo } from "../../hooks/Todo/todoSlice";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  SubmitHandler,
  useForm,
  FormProvider,
  useFieldArray,
} from "react-hook-form";

import { FormData, formSchema } from "../../utils/formDataObject";

import { showModal } from "../../utils/showModal";

import "./styles.css";
import { AiOutlineClose } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";

import FormInput from "../FormInput";

export default function AddTodoModal() {
  const dispatch = useDispatch();
  const methods = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const { fields, append } = useFieldArray({
    name: "tasks",
    control: methods.control,
  });

  console.log(fields.length);

  const { errors } = methods.formState;

  const handleForm: SubmitHandler<FormData> = useCallback(
    async ({ title, subtitle }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // dispatch(
      //   addTodo({
      //     id: 2,
      //     title,
      //     subtitle,
      //     tasks: [
      //       {
      //         id: 1,
      //         title: "Modal",
      //         isDone: false,
      //       },
      //     ],
      //     status: "TODO",
      //   })
      // );
    },
    []
  );

  const addInput = () => {
    let inputDiv = document.querySelector<HTMLDivElement>(".subtask-container");

    if (inputDiv) {
      const div = document.createElement("div");
      div.classList.add("subtask-input-container");
      const input = document.createElement("input");

      div.appendChild(input);

      inputDiv.appendChild(div);
    }
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
            <div className="subtask-container" />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
