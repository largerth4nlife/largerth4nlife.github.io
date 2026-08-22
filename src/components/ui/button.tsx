import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost";
  size?: "default" | "sm";
};

export function Button({ className="", variant="default", size="default", ...props }: Props) {
  return <button className={`btn btn-${variant} btn-${size} ${className}`} {...props} />;
}