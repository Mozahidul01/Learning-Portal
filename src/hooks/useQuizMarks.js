import { useEffect, useState } from "react";

// Custom hook to calculate quiz marks
export default function useQuizMarks(quizzes, answers) {
  // Initialize state for quiz marks
  const [quizMarks, setQuizMarks] = useState({
    totalCorrect: 0,
    totalWrong: 0,
    totalMark: 0,
    mark: 0,
  });

  useEffect(() => {
    // Define variables to count correct and wrong answers
    let totalCorrect = 0;
    let totalWrong = 0;

    // Loop through each quiz
    quizzes.forEach((quiz) => {
      let quizCorrect = true;

      // Loop through each option in the quiz
      quiz.options.forEach((option) => {
        // Check if the option is selected and if it is correct
        const selected =
          answers[quiz.id] && answers[quiz.id].includes(option.id);
        const correct = option.isCorrect;

        // If the selected option is incorrect, set the quizCorrect false
        if (selected && !correct) {
          quizCorrect = false;

          // If the correct option is not selected, set the quizCorrect false
        } else if (!selected && correct) {
          quizCorrect = false;
        }
      });

      // If all options are correct, increment the totalCorrect counter
      if (quizCorrect) {
        totalCorrect++;

        // Otherwise, increment the totalWrong counter
      } else {
        totalWrong++;
      }
    });

    // Calculate the total mark and mark for the quiz
    const totalMark = quizzes.length * 5;
    const mark = totalCorrect * 5;

    // Update the quiz marks state with the calculated values
    setQuizMarks({
      totalCorrect,
      totalWrong,
      totalMark,
      mark,
    });
  }, [quizzes, answers]);

  return quizMarks;
}
