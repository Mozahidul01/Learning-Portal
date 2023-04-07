import AssignmentTableRow from "./AssignmentTableRow";
import Error from "./../../ui/Error";
import { useGetAssignmentsQuery } from "../../../features/assignments/assignmentsApi";
import AssignmentsSkeleton from "../../ui/Skeletons/AssignmentsSkeleton";

export default function AssignmentTableBody() {
  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery();

  //Decide what to render
  let content;

  if (isLoading) {
    content = (
      <>
        <AssignmentsSkeleton />
        <AssignmentsSkeleton />
        <AssignmentsSkeleton />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="Something went wrong" />;
    console.error(error);
  }

  if (!isLoading && !isError && assignments?.length === 0) {
    content = (
      <p className="px-6 py-4 font-medium text-center shadow capitalize">
        No Assignment Found
      </p>
    );
  }

  if (!isLoading && !isError && assignments?.length > 0) {
    content = assignments.map((assignment) => {
      return (
        <AssignmentTableRow
          key={assignment.id}
          assignment={assignment}
        />
      );
    });
  }
  return <tbody className="divide-y divide-slate-600/50">{content}</tbody>;
}
