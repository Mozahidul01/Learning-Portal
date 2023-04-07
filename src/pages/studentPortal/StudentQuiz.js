import { useParams } from "react-router-dom";
import Quiz from "./../../components/studentPortal/Quiz/Quiz";
import { useGetRelatedQuizQuery } from "../../features/quizzes/quizzesApi";
import { useGetFilteredQuizMarkQuery } from "../../features/quizMark/quizMarkApi";
import { useSelector } from "react-redux";
import StudentQuizSkeleton from "./../../components/ui/Skeletons/StudentQuizSkeleton";
import Error from "../../components/ui/Error";
import Navbar from "./../../components/studentPortal/Navbar/Navbar";

export default function StudentQuiz() {
  const { vId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { name: userName, id: userId } = user || {};

  const {
    data: quizzes,
    isLoading: isQuizzesLoading,
    isError: isQuizzesError,
  } = useGetRelatedQuizQuery(vId);

  const {
    data: quizMark,
    isLoading: isQuizMarkLoading,
    isError: isQuizMarkError,
  } = useGetFilteredQuizMarkQuery({ sId: userId, vId });

  //Check to see if the Quiz has already been submitted.
  let foundQuizResult;

  if (!isQuizMarkLoading && !isQuizMarkError && quizMark.length > 0) {
    const { totalQuiz, totalCorrect, totalWrong, mark, totalMark } =
      quizMark[0] || {};

    foundQuizResult = (
      <div className="gap-2 border-b pb-4">
        <h2 className="text-cyan text-xl font-bold py-2 text-center">
          You have already taken this quiz
        </h2>
        <div className="flex w-full gap-8">
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

          <div className="flex gap-4 text-center font-semibold">
            <div>
              <p>{totalQuiz}</p>
              <p className="text-cyan">Total Quiz</p>
            </div>

            <div>
              <p>{totalCorrect}</p>
              <p className="text-cyan">Total Correct</p>
            </div>

            <div>
              <p>{totalWrong}</p>
              <p className="text-cyan">Total Wrong</p>
            </div>

            <div>
              <p>
                {mark} / {totalMark}
              </p>
              <p className="text-cyan">Mark / Total Mark</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //Decide what to render
  let content;

  if (isQuizzesLoading) {
    content = <StudentQuizSkeleton />;
  } else if (isQuizzesError) {
    content = (
      <div className="w-full aspect-video flex items-center justify-center">
        <Error message="Something went wrong" />
      </div>
    );
  } else {
    content = (
      <div>
        {foundQuizResult}

        <div className="mx-auto max-w-7xl px-5 pt-4">
          <div className="mb-2">
            <h1 className="text-xl md:text-2xl font-semibold">
              Quizzes for "{quizzes[0].video_title}"
            </h1>
            <p className="text-sm text-slate-400">
              Each question contains 5 Mark
            </p>
          </div>

          <Quiz
            quizResult={foundQuizResult}
            quizzes={quizzes}
            userId={userId}
            userName={userName}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">{content}</div>
      </section>
    </>
  );
}
