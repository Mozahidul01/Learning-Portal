import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGetAssignmentMarksQuery } from "../features/assignmentMarks/assignmentMarksApi";
import { useGetQuizzesMarksQuery } from "../features/quizMark/quizMarkApi";

export default function useLeaderboardData() {
  //Get QuizzesMark data
  const {
    data: quizzesMark,
    isLoading: isQuizzesMarkLoading,
    isError: isQuizzesMarkError,
  } = useGetQuizzesMarksQuery();

  //Get AssignmentMark data
  const {
    data: assignmentMark,
    isLoading: isAssignmentMarkLoading,
    isError: isAssignmentMarkError,
  } = useGetAssignmentMarksQuery();

  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    if (
      !isQuizzesMarkLoading &&
      !isAssignmentMarkLoading &&
      !isQuizzesMarkError &&
      !isAssignmentMarkError
    ) {
      // Combine quiz and assignment marks for each student
      const studentMarks = {};

      // Combine quiz marks
      quizzesMark.forEach((quiz) => {
        const studentId = quiz.student_id;

        if (!studentMarks[studentId]) {
          studentMarks[studentId] = { quizMark: 0, assignmentMark: 0 };
        }
        studentMarks[studentId].quizMark += quiz.mark;
      });

      // Combine assignment marks
      assignmentMark.forEach((assignment) => {
        const studentId = assignment.student_id;

        if (!studentMarks[studentId]) {
          studentMarks[studentId] = { quizMark: 0, assignmentMark: 0 };
        }
        studentMarks[studentId].assignmentMark += assignment.mark;
      });

      // Calculate total marks for each student and assign rank
      const leaderboardData = [];

      Object.keys(studentMarks).forEach((studentId) => {
        const student = studentMarks[studentId];
        const totalMark = student.quizMark + student.assignmentMark;

        const quiz = quizzesMark.find(
          (quiz) => quiz.student_id === Number(studentId)
        );

        const assignment = assignmentMark.find(
          (assignment) => assignment.student_id === Number(studentId)
        );

        const studentName = quiz ? quiz.student_name : assignment.student_name;

        leaderboardData.push({
          id: uuidv4(),
          studentId: Number(studentId),
          studentName,
          quizMark: student.quizMark,
          assignmentMark: student.assignmentMark,
          totalMark,
          rank: null, // initialize rank to null
        });
      });

      // Sort students based on total marks
      leaderboardData.sort((a, b) => b.totalMark - a.totalMark);

      let currentRank = 1;
      let prevTotalMark = null;

      // Assign ranks
      leaderboardData.forEach((student, index) => {
        const { totalMark } = student;

        if (prevTotalMark === null || prevTotalMark > totalMark) {
          // assign rank based on current position in sorted data
          student.rank = currentRank;
        } else {
          // assign same rank as previous student
          student.rank = leaderboardData[index - 1].rank;
        }

        prevTotalMark = totalMark;

        // check if the next student has a different total mark
        if (
          index < leaderboardData.length - 1 &&
          totalMark !== leaderboardData[index + 1].totalMark
        ) {
          // update current rank to next unique total mark value
          currentRank++;
        }
      });

      // Sort students based on rank
      const sortedLeaderBoard = leaderboardData.sort((a, b) => a.rank - b.rank);

      setLeaderboardData(sortedLeaderBoard);
    }
  }, [
    quizzesMark,
    assignmentMark,
    isQuizzesMarkLoading,
    isAssignmentMarkLoading,
    isQuizzesMarkError,
    isAssignmentMarkError,
  ]);

  return leaderboardData;
}
