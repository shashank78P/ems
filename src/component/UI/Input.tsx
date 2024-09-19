import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef<HTMLInputElement, InputProp>(
  (
    {
      type = "text",
      name,
      value,
      onChangeHandler,
      placeholder,
      required,
      styleClassName,
      checked
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        onChange={(e) => {
          onChangeHandler && onChangeHandler(e);
        }}
        checked={checked}
        value={value}
        name={name}
        placeholder={placeholder}
        required={required}
        className={twMerge(`border p-3 w-full my-2 text-base outline-0 rounded-md `, styleClassName)}
      />
    );
  }
);

export default Input;

type InputProp = {
  type: "text" | "number" | "email" | "password" | "radio" | "checkbox" | "file";
  name: string;
  value?:string
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  styleClassName?: string;
  checked ? : boolean
};
