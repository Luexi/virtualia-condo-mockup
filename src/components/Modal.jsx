import React from "react";
import { Ic } from "./ui.jsx";

export default function Modal({ title, children, footer, onClose }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <section className="modal modal--lg" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal__header">
          <div className="row row--between">
            <div className="card__title">{title}</div>
            <button className="icon-btn" aria-label="Cerrar" onClick={onClose}>
              <Ic name="X" size={18} />
            </button>
          </div>
        </div>
        <div className="modal__body">{children}</div>
        {footer ? <div className="modal__footer">{footer}</div> : null}
      </section>
    </>
  );
}
