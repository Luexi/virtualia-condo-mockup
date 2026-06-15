import React from "react";
import { Ic } from "./ui.jsx";

export default function ActionButton({ icon, children, variant = "secondary", ...props }) {
  return (
    <button className={`btn btn--${variant}`} {...props}>
      {icon ? <Ic name={icon} size={16} /> : null}
      {children}
    </button>
  );
}
