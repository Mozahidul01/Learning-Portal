import React, { useEffect, useState } from "react";
import Error from "../../ui/Error";
import {
  useAddAssignmentMarkMutation,
  useGetFilteredAssignmentMarksQuery,
} from "../../../features/assignmentMarks/assignmentMarksApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AssignmentModal({ open, control, assignment }) {
  const { id, title, totalMark } = assignment[0] || {};

  const [gitRepo, setGitRepo] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //get user information
  const { user } = useSelector((state) => state.auth);

  const { id: user_id, name: user_name } = user || {};

  const {
    data: assignmentMark,
    isLoading: isAssignmentMarkLoading,
    isError: isAssignmentMarkError,
  } = useGetFilteredAssignmentMarksQuery({
    sId: user_id,
    aId: id,
  });

  const [addAssignmentMark, { isLoading, isError, isSuccess }] =
    useAddAssignmentMarkMutation();

  //Check to see if the assignment has already been submitted.
  let foundAssignmentMark;
  if (
    !isAssignmentMarkLoading &&
    !isAssignmentMarkError &&
    assignmentMark?.length > 0
  ) {
    const { repo_link, status, mark } = assignmentMark[0] || {};

    foundAssignmentMark = (
      <div className="gap-2 border-b pb-4">
        <div className="flex gap-3 items-center mb-4">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 24 24"
            className="text-cyan"
            height={30}
            width={30}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              d="M0 0h24v24H0V0z"
            />
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zm-6.49-5.84c.41-.73 1.18-1.16 1.63-1.8.48-.68.21-1.94-1.14-1.94-.88 0-1.32.67-1.5 1.23l-1.37-.57C11.51 5.96 12.52 5 13.99 5c1.23 0 2.08.56 2.51 1.26.37.6.58 1.73.01 2.57-.63.93-1.23 1.21-1.56 1.81-.13.24-.18.4-.18 1.18h-1.52c.01-.41-.06-1.08.26-1.66zm-.56 3.79c0-.59.47-1.04 1.05-1.04.59 0 1.04.45 1.04 1.04 0 .58-.44 1.05-1.04 1.05-.58 0-1.05-.47-1.05-1.05z" />
          </svg>
          <h2 className="md:text-xl font-bold">
            You have already Submitted this Assignment
          </h2>
        </div>

        <ul className="font-semibold text-sm md:text-base">
          <li>
            Your Submited Assignment Status is :
            <span className="text-cyan capitalize"> {status}</span>
          </li>

          <li>
            Your Submitted Repository Link :
            <span className="text-cyan"> {repo_link}</span>
          </li>

          {status === "published" && (
            <li>
              Your Have Obtain : <span className="text-cyan"> {mark} Mark</span>
            </li>
          )}
        </ul>
      </div>
    );
  }

  // handle Submit Request
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const newAssignmentMark = {
      student_id: user_id,
      student_name: user_name,
      assignment_id: id,
      title: title,
      createdAt: new Date().toISOString(),
      totalMark: totalMark,
      mark: 0,
      repo_link: gitRepo,
      status: "pending",
    };

    addAssignmentMark(newAssignmentMark);
  };

  //handle success & error  responses
  useEffect(() => {
    if (isError) {
      setError("Assignment Failed to Submit");
    }
    if (isSuccess) {
      navigate("/leaderboard");
    }
  }, [isError, isSuccess, navigate]);

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-screen inset-0 z-10 bg-black/90 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] md:w-[720px] space-y-8 bg-secondary p-6 md:p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-left text-2xl font-extrabold text-slate-100">
            Submit Your Assignment
          </h2>
          <h2 className="text-lg font-semibold text-cyan">{title}</h2>

          {foundAssignmentMark}

          <form
            className="mt-8 space-y-4 rounded-md shadow-sm"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="gitRepo"
                className="pb-2 block"
              >
                Your GitHub repository link
              </label>
              <input
                id="gitRepo"
                name="git-repo"
                type="url"
                required
                className="login-input"
                placeholder="Repository Link"
                value={gitRepo}
                onChange={(e) => setGitRepo(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || foundAssignmentMark}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Submit
            </button>
          </form>
          {error && <Error message={error} />}
        </div>
      </>
    )
  );
}
