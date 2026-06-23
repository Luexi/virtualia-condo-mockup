import React from "react";
import { Ic } from "./ui.jsx";

export default function StatusTag({
  children = "Condo by Virtualia",
}) {
  return (
    <span className="status-tag">
      <Ic name="Info" size={12} />
      {children}
    </span>
  );
}
