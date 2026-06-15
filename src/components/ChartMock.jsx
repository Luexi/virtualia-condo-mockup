import React from "react";

export default function ChartMock({ items = [] }) {
  const max = Math.max(1, ...items.map((item) => item.value || 0));

  return (
    <div className="barchart">
      {items.map((item) => (
        <div key={item.label} className="barchart__col">
          <div className="barchart__bars">
            <div
              className="barchart__bar barchart__bar--cobrado"
              style={{ height: `${((item.value || 0) / max) * 150}px` }}
            />
          </div>
          <div className="barchart__label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
