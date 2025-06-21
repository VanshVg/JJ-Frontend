import { ButtonDisplayType, IButtonProps } from "./types";

const Button = ({
  label,
  type,
  isLoading,
  isDisabled,
  displayType,
  onClickHandler,
  externalClasses,
}: IButtonProps) => {
  let buttonClasses = "";

  switch (displayType) {
    case ButtonDisplayType.Primary:
      buttonClasses = `rounded-[5px] border-[1px] text-xl font-medium transition-all duration-300 flex gap-2 cursor-pointer items-center text-white bg-primary hover:bg-white hover:text-primary hover:border-primary ${
        externalClasses ?? ""
      }`;
      break;
    case ButtonDisplayType.Secondary:
      buttonClasses = `rounded-[5px] border-[1px] text-xl font-medium transition-all duration-300 flex gap-2 cursor-pointer items-center text-primary bg-white hover:bg-primary hover:text-white hover:border-white ${
        externalClasses ?? ""
      }`;
  }
  return (
    <button
      className={buttonClasses}
      type={type || "button"}
      onClick={onClickHandler}
      disabled={isDisabled || false}
    >
      {isLoading ? <p>Loading...</p> : label}
    </button>
  );
};

export default Button;
