import { twMerge } from "tailwind-merge";

const InputContainer = ({ children, label, classNameStyle }: InputContainerProp) => {
  return (
    <div className={twMerge(`text-gray-700 text-lg `, classNameStyle )}>
      <div>{label}</div>
      <div>{children}</div>
    </div>
  );
};

export default InputContainer;

type InputContainerProp = {
  children: React.ReactNode;
  label: string;
  classNameStyle ?: string
};
