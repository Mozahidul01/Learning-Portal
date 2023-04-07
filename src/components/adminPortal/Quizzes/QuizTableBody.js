import QuizTableRow from "./QuizTableRow";
import Error from "./../../ui/Error";
import { useGetQuizzesQuery } from "../../../features/quizzes/quizzesApi";
import QuizSkeleton from "./../../ui/Skeletons/QuizSkeleton";

export default function QuizTableBody() {
  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();

  //Decide what to render
  let content;

  if (isLoading) {
    content = (
      <>
        <QuizSkeleton />
        <QuizSkeleton />
        <QuizSkeleton />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="Something went wrong" />;
    console.error(error);
  }

  if (!isLoading && !isError && quizzes?.length === 0) {
    content = (
      <p className="px-6 py-4 font-medium text-center shadow capitalize">
        No Assignment Found
      </p>
    );
  }

  if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes.map((quiz) => {
      return (
        <QuizTableRow
          key={quiz.id}
          quiz={quiz}
        />
      );
    });
  }
  return <tbody className="divide-y divide-slate-600/50">{content}</tbody>;
}
