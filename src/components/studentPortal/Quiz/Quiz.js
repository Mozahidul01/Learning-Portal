import { useEffect, useState } from "react";
import { useAddQuizMarkMutation } from "../../../features/quizMark/quizMarkApi";
import { useNavigate } from "react-router-dom";
import Error from "../../ui/Error";

export default function Quiz({ quizzes, quizResult, userId, userName }) {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [addQuizMark, { isLoading, isError, isSuccess }] =
    useAddQuizMarkMutation();

  //handle option onchange
  const handleAnswerChange = (e, quizId, optionId) => {
    const isChecked = e.target.checked;
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      if (isChecked) {
        updatedAnswers[quizId] = [...(updatedAnswers[quizId] || []), optionId];
      } else {
        updatedAnswers[quizId] = updatedAnswers[quizId].filter(
          (id) => id !== optionId
        );
      }
      return updatedAnswers;
    });
  };

  //hanlde quizAnwer Submit
  const handleSubmit = (e) => {
    // Count the number of correct and wrong answers
    let totalCorrect = 0;
    let totalWrong = 0;
    const selectedOptions = {}; // store selected options for each quiz using quiz ID as key

    quizzes.forEach((quiz) => {
      let quizCorrect = true;
      quiz.options.forEach((option) => {
        const selected =
          answers[quiz.id] && answers[quiz.id].includes(option.id);
        const correct = option.isCorrect;
        if (selected && !correct) {
          quizCorrect = false;
        } else if (!selected && correct) {
          quizCorrect = false;
        }
      });
      if (quizCorrect) {
        totalCorrect++;
      } else {
        totalWrong++;
      }
      selectedOptions[quiz.id] = answers[quiz.id];
    });

    // Calculate the mark
    const totalMark = quizzes.length * 5;
    const mark = totalCorrect * 5;

    const newQuizMark = {
      student_id: userId,
      student_name: userName,
      video_id: quizzes[0].video_id,
      video_title: quizzes[0].video_title,
      totalQuiz: quizzes?.length,
      totalCorrect,
      totalWrong,
      totalMark,
      mark,
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
                    onChange={(e) => handleAnswerChange(e, quiz.id, option.id)}
                  />
                  {option.option}
                </label>
              ))}
            </form>
          </div>
        ))}
      </div>

      {error !== "" && <Error message={error} />}

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
