import QuizTableBody from "./QuizTableBody";
import QuizTableHead from "./QuizTableHead";

export default function QuizTable() {
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full">
      <QuizTableHead />
      <QuizTableBody />
    </table>
  );
}
