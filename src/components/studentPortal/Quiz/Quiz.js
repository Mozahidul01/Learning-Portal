import { useCallback, useEffect, useState } from "react";
import { useAddQuizMarkMutation } from "../../../features/quizMark/quizMarkApi";
import { useNavigate } from "react-router-dom";
import Error from "../../ui/Error";
import useQuizMarks from "../../../hooks/useQuizMarks";

export default function Quiz({ quizzes, quizResult, userId, userName }) {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [addQuizMark, { isLoading, isError, isSuccess }] =
    useAddQuizMarkMutation();

  //get Quiz Marks from custom hook
  const quizMarks = useQuizMarks(quizzes, answers);

  //handle option onchange.
  const handleAnswerChange = useCallback((quizId, optionId) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      // If the option is already in the answers array than remove it
      if (updatedAnswers[quizId]?.includes(optionId)) {
        updatedAnswers[quizId] = updatedAnswers[quizId].filter(
          (id) => id !== optionId
        );
      } else {
        //Otherwise  add the option id to the answers array for the quiz id
        updatedAnswers[quizId] = [...(updatedAnswers[quizId] || []), optionId];
      }
      return updatedAnswers;
    });
  }, []);

  //hanlde quizAnwer Submit
  const handleSubmit = () => {
    // Create a new quiz mark object
    const newQuizMark = {
      student_id: userId,
      student_name: userName,
      video_id: quizzes[0].video_id,
      video_title: quizzes[0].video_title,
      totalQuiz: quizzes?.length,
      ...quizMarks,
    };

    // add quiz result
    addQuizMark(newQuizMark);
  };

  //handle success & error  responses
  useEffect(() => {
    if (isError) {
      setError("Quiz Failed to Submit");
    }
    if (isSuccess) {
      navigate("/leaderboard");
    }
  }, [isError, isSuccess, navigate]);

  return (
    <div className="sm:p-2 flex flex-col">
      <div className="space-y-4 sm:space-y-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="quiz"
          >
            <h4 className="question">{quiz.question}</h4>
            <form className="quizOptions">
              {quiz.options.map((option) => (
                <label key={option.id}>
                  <input
                    type="checkbox"
                    checked={!!answers[quiz.id]?.includes(option.id)}
                    onChange={() => handleAnswerChange(quiz.id, option.id)}
                  />
                  {option.option}
                </label>
              ))}
            </form>
          </div>
        ))}
      </div>

      {error && <Error message={error} />}

      <button
        className="btn ml-auto mt-6"
        disabled={quizResult || isLoading}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
