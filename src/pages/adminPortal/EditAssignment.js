import { useParams } from "react-router-dom";
import EditAssignmentForm from "../../components/adminPortal/Forms/EditAssignmentForm";
import { useGetAssignmentQuery } from "../../features/assignments/assignmentsApi";
import Navbar from "./../../components/adminPortal/Navbar/Navbar";
import Error from "../../components/ui/Error";
import FormSkeleton from "../../components/ui/Skeletons/FormSkeleton";

export default function EditAssignment() {
  const { id } = useParams();
  const {
    data: assignment,
    isLoading,
    isError,
    error,
  } = useGetAssignmentQuery(id);

  //Decide What to render
  let content;

  if (isLoading) {
    content = <FormSkeleton />;
  } else if (isError) {
    content = <Error message="Something went wrong" />;
    console.error(error);
  } else {
    content = <EditAssignmentForm assignment={assignment} />;
  }

  return (
    <>
      <Navbar />
      <div className="container relative mx-auto my-16">
        <div className="bg-secondary mx-auto lg:max-w-4xl md:max-w-2xl max-w-sm shadow-md rounded md:px-8 px-6 pt-6 pb-8 mb-4 flex flex-col my-2">
          <h1 className="mt-4 mb-14 lg:text-4xl md:text-3xl text-2xl font-bold uppercase text-center">
            Edit assignment
          </h1>
          {content}
        </div>
      </div>
    </>
  );
}
