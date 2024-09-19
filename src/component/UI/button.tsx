import { twMerge } from "tailwind-merge";

const Button = ({ type, children, onClickHandler, classNameStyle }: buttonProp) => {
  return (
    <button
      type={type}
      onClick={() => {
        onClickHandler && onClickHandler();
      }}
      className={twMerge('bg-gray-700  text-white px-6 py-3 text-lg rounded-lg shadow-md select-none' , classNameStyle)}
    >
      {children}
    </button>
  );
};

export default Button;

type buttonProp = {
  type: "button" | "reset" | "submit";
  children: React.ReactNode;
  onClickHandler?: Function;
  classNameStyle ?: string
};
