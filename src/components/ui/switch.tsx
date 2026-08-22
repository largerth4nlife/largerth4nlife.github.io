import * as React from "react";

type Props = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
};

export function Switch({ checked=false, onCheckedChange, disabled, ...props }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={`switch ${checked ? "switch-on" : ""}`}
      {...props}
    >
      <span />
    </button>
  );
}