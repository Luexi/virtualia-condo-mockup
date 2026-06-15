import React from "react";
import EmptyState from "./EmptyState.jsx";

export default function DataTable({
  columns = [],
  rows = [],
  getKey = (_, index) => index,
  renderCell,
  emptyTitle = "Sin datos",
  emptyText = "No hay registros para mostrar.",
}) {
  if (!rows.length) return <EmptyState title={emptyTitle} text={emptyText} />;

  return (
    <div className="table-wrap">
      <table className="tbl">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key || column} className={column.numeric ? "num" : ""}>
                {column.label || column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={getKey(row, rowIndex)}>
              {columns.map((column) => (
                <td key={column.key || column} className={column.numeric ? "num" : ""}>
                  {renderCell ? renderCell(row, column, rowIndex) : row[column.key || column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
