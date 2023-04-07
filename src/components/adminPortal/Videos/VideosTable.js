import React from "react";
import VideosTableHeader from "./VideosTableHeader";
import VideosTableBody from "./VideosTableBody";

export default function VideosTable() {
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <VideosTableHeader />
      <VideosTableBody />
    </table>
  );
}
