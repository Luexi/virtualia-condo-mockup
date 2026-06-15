import React from "react";
import { Ic } from "./ui.jsx";

export default function MetricCard({ title, value, icon, tone = "teal", delta, children }) {
  return (
    <article className={"kpi" + (tone ? ` kpi--${tone}` : "")}>
      <div className="kpi__head">
        {icon ? (
          <span className="kpi__icon">
            <Ic name={icon} size={19} />
          </span>
        ) : null}
        <span className="kpi__label">{title}</span>
      </div>
      <div className="kpi__value">{value}</div>
      {delta ? (
        <div className="kpi__sub" style={{ marginTop: 12 }}>
          {delta}
        </div>
      ) : null}
      {children}
    </article>
  );
}
