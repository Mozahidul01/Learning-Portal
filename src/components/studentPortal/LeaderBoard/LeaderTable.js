import React from "react";
import LeaderTableHead from "./LeaderTableHead";
import LeaderTableBody from "./LeaderTableBody";

export default function LeaderTable() {
  return (
    <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
      <LeaderTableHead />
      <LeaderTableBody />
    </table>
  );
}
