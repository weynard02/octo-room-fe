import React from "react";
import { Button } from "./Button";

export const NavButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className = "", ...props }) => (
  <Button
    type="button"
    className={`px-3 py-2 bg-white hover:bg-gray-100 active:bg-gray-200  border-gray-300  transition-colors leading-none flex items-center justify-center ${className}`}
    {...props}
  >
    {children}
  </Button>
);

export default NavButton;
