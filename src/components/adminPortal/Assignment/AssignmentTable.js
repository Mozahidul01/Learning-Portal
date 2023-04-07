import React from "react";
import AssignmentTableHead from "./AssignmentTableHead";
import AssignmentTableBody from "./AssignmentTableBody";

export default function AssignmentTable() {
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <AssignmentTableHead />
      <AssignmentTableBody />
    </table>
  );
}
