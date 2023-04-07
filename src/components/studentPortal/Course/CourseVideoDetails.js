import { Link, useParams } from "react-router-dom";
import PlayerSkeleton from "../../ui/Skeletons/PlayerSkeleton";
import Error from "../../ui/Error";
import { useGetVideoQuery } from "../../../features/videos/videosApi";
import formatDate from "../../../utils/formateDate";
import AssignmentModal from "./AssignmentModal";
import { useState } from "react";
import { useGetRelatedAssignmentQuery } from "../../../features/assignments/assignmentsApi";
import { useGetRelatedQuizQuery } from "../../../features/quizzes/quizzesApi";

const CourseVideoDetails = () => {
  const [isAssignmentModal, setIsAssignmentModal] = useState(false);
  const { id } = useParams();

  const { data: video, isLoading, isError, error } = useGetVideoQuery(id);

  const {
    data: assignment,
    isLoading: isAssignmentLoading,
    isError: isAssignmentError,
  } = useGetRelatedAssignmentQuery(id);

  const {
    data: quizzes,
    isLoading: isQuizzesLoading,
    isError: isQuizzesError,
  } = useGetRelatedQuizQuery(id);

  //Toggle Assignment Modal
  const toggleAssignmentModal = () => {
    setIsAssignmentModal((prev) => !prev);
  };

  // Check if any Quiz have been found
  const foundQuiz = !isQuizzesLoading && !isQuizzesError && quizzes?.length > 0;

  //Decide whether to show the assignment button
  let foundAssignment = null;

  if (!isAssignmentLoading && !isAssignmentError && assignment?.length > 0) {
    foundAssignment = (
      <>
        <button
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          onClick={toggleAssignmentModal}
        >
          এসাইনমেন্ট
        </button>
        <AssignmentModal
          assignment={assignment}
          open={isAssignmentModal}
          control={toggleAssignmentModal}
        />
      </>
    );
  }

  //Decide What to render
  let content;

  if (isLoading) {
    content = <PlayerSkeleton />;
  } else if (isError) {
    content = (
      <div className="w-full aspect-video flex items-center justify-center">
        <Error message="Something went wrong" />
        {console.error(error)}
      </div>
    );
  } else {
    const { id, title, description, url, createdAt } = video;
    content = (
      <div className="col-span-full w-full lg:col-span-2">
        <iframe
          width="100%"
          className="aspect-video"
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            {title}
          </h1>
          <h2 className="pb-4 text-sm leading-[1.7142857] text-slate-400">
            Uploaded on {formatDate(createdAt)}
          </h2>

          <div className="flex gap-4">
            {foundAssignment}
            {foundQuiz && (
              <Link
                to={`/quiz/${id}`}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                কুইজে অংশগ্রহণ করুন
              </Link>
            )}
          </div>

          <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
        </div>
      </div>
    );
  }

  return content;
};

export default CourseVideoDetails;
