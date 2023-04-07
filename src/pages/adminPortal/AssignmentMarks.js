import MarksTableHead from "../../components/adminPortal/AssignmentMarks/MarksTableHead";
import MarksTableRow from "../../components/adminPortal/AssignmentMarks/MarksTableRow";
import Navbar from "../../components/adminPortal/Navbar/Navbar";
import AssignmentMarksSkeleton from "../../components/ui/Skeletons/AssignmentMarksSkeleton";
import { useGetAssignmentMarksQuery } from "../../features/assignmentMarks/assignmentMarksApi";
import Error from "./../../components/ui/Error";

export default function AssignmentMarks() {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
    error,
  } = useGetAssignmentMarksQuery();

  //Decide what to render
  let content;

  if (isLoading) {
    content = <AssignmentMarksSkeleton />;
  }

  if (!isLoading && isError) {
    content = <Error message="Something went wrong" />;
    console.error(error);
  }

  if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = (
      <p className="px-6 py-4 font-medium text-center shadow capitalize">
        No Assignment Found
      </p>
    );
  }

  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    const allAssignmentCount = assignmentMarks.length;
    const pendingAssignmentsCount = assignmentMarks.filter(
      (mark) => mark.status === "pending"
    ).length;
    const publishedAssignmentsCount = assignmentMarks.filter(
      (mark) => mark.status === "published"
    ).length;

    content = (
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{allAssignmentCount}</span>
              </li>
              <li>
                Pending <span>{pendingAssignmentsCount}</span>
              </li>
              <li>
                Mark Sent <span>{publishedAssignmentsCount}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <MarksTableHead />
                <tbody className="divide-y divide-slate-600/50">
                  {assignmentMarks.map((assignmentMark) => (
                    <MarksTableRow
                      key={assignmentMark.id}
                      assignmentMark={assignmentMark}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Navbar />

      {content}
    </>
  );
}
