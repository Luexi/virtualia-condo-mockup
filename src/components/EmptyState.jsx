import React from "react";
import { Ic } from "./ui.jsx";

export default function EmptyState({
  icon = "FolderOpen",
  title = "Sin registros",
  text = "No hay información para esta vista.",
}) {
  return (
    <div className="empty">
      <span className="empty__icon">
        <Ic name={icon} size={22} />
      </span>
      <div className="empty__title">{title}</div>
      <div className="empty__text">{text}</div>
    </div>
  );
}
