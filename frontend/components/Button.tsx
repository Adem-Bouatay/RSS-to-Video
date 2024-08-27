import React, { forwardRef } from "react";
import { Spinner } from "./Spinner";

const ButtonForward: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    loading?: boolean;
    secondary?: boolean;
  }
> = ({ onClick, disabled, children, loading, secondary }, ref) => {
  return (
    <button
      ref={ref}
      className="p-3 flex items-center space-x-2 peer bg-orange-500 rounded-xl font-medium text-yellow-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {loading && (
        <>
          <Spinner size={20}></Spinner>
        </>
      )}
      <div>{children}</div>
    </button>
  );
};

export const Button = forwardRef(ButtonForward);
