import React from "react";
import "./styles.css";
import { FieldError, useFormContext } from "react-hook-form";
import { BiError, BiRegistered } from "react-icons/bi";

interface FormInputProps {
  name: string;
  label: string;
  error?: FieldError;
}

const FormInput = React.forwardRef<FormInputProps, any>(
  ({ name, label, error }: FormInputProps, ref) => {
    const { register } = useFormContext();

    return (
      <div className="input-container">
        <label>{label}</label>
        <div className="input-content">
          <input id={name} {...register(name)} />
        </div>
        {error ? (
          <div className="error-message-container">
            <BiError size={26} />
            {error.message}
          </div>
        ) : (
          <div className="error-message-placeholder" />
        )}
      </div>
    );
  }
);

interface DynamicInputProps {
  id: number;
  // name: string;
  error?: FieldError;
}

const DynamicInput = React.forwardRef<FormInputProps, any>(
  ({ id, error }: DynamicInputProps, ref) => {
    const { register } = useFormContext();

    console.log(error);

    return (
      <div className="subtask-input-container">
        <input id={`tasks[${id}]title`} {...register(`tasks.${id}.title`)} />
        {error ? (
          <div className="error-message-container">
            <BiError size={26} />
            {error.message}
          </div>
        ) : (
          <div className="error-message-placeholder" />
        )}
      </div>
    );
  }
);

export { FormInput, DynamicInput };
