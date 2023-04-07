import { useEffect, useState } from "react";
import formatDate from "../../../utils/formateDate";
import { toast } from "react-toastify";
import { useEditAssignmentMarksMutation } from "../../../features/assignmentMarks/assignmentMarksApi";

export default function MarksTableRow({ assignmentMark }) {
  const {
    id,
    title,
    createdAt,
    student_name,
    totalMark,
    repo_link,
    mark,
    status,
  } = assignmentMark || {};

  const [obtainMark, setObtainMark] = useState(totalMark);

  const [editAssignmentMarks, { isLoading, isError }] =
    useEditAssignmentMarksMutation();

  //handle Submit request
  const handleSubmit = () => {
    const updatedMarks = {
      mark: Number(obtainMark),
      status: "published",
    };

    //check if the obtainMark is more than total marks
    if (obtainMark > totalMark) {
      toast.error("You cannot give more than total marks !", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      editAssignmentMarks({ id, data: updatedMarks });
    }
  };

  //handle success  responses
  useEffect(() => {
    if (isError) {
      toast.error("Failed To Update Assignment Marks", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [isError]);

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">
        {formatDate(createdAt, "DD MMM YYYY hh:mm:ss A")}
      </td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>

      {status === "pending" ? (
        <td className="table-td input-mark">
          <input
            type="number"
            required
            defaultValue={totalMark}
            onChange={(e) => setObtainMark(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </td>
      ) : (
        <td className="table-td"> {mark} </td>
      )}
    </tr>
  );
}
