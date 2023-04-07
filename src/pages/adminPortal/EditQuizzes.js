import { useParams } from "react-router-dom";
import EditQuizForm from "../../components/adminPortal/Forms/EditQuizForm";
import Navbar from "./../../components/adminPortal/Navbar/Navbar";
import { useGetQuizQuery } from "../../features/quizzes/quizzesApi";
import FormSkeleton from "../../components/ui/Skeletons/FormSkeleton";
import Error from "../../components/ui/Error";

export default function EditQuizzes() {
  const { id } = useParams();

  const { data: quiz, isLoading, isError, error } = useGetQuizQuery(id);

  //Decide what to render

  let content = null;

  if (isLoading) {
    content = <FormSkeleton />;
  } else if (isError) {
    content = <Error message="There was an error" />;
    console.error(error);
  } else {
    content = <EditQuizForm quiz={quiz} />;
  }

  return (
    <>
      <Navbar />
      <div className="container relative mx-auto my-10">
        <div className="bg-secondary mx-auto lg:max-w-4xl md:max-w-2xl max-w-sm shadow-md rounded md:px-8 px-6 pt-6 pb-8 mb-4 flex flex-col my-2">
          <h1 className="mt-4 mb-14 lg:text-4xl md:text-3xl text-2xl font-bold uppercase text-center">
            Edit Quiz
          </h1>

          {content}
        </div>
      </div>
    </>
  );
}
