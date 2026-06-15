import React from "react";
import { Ic } from "./ui.jsx";

export default function AppToast({ message }) {
  return message ? (
    <div className="toast">
      <span className="toast__icon">
        <Ic name="CheckCircle" size={16} />
      </span>
      {message}
    </div>
  ) : null;
}
