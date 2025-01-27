import React from "react";

interface ButtonProps {
  value: string;
}

const Button = ({ value }: ButtonProps) => {
  return (
    <button className="h-12 rounded-lg bg-white text-black font-bold px-5 hover:bg-emerald-200">
      {value}
    </button>
  );
};

export default Button;
