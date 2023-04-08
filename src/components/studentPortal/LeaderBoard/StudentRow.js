export default function StudentRow({ data }) {
  const { rank, studentName, quizMark, assignmentMark, totalMark } = data || {};

  return (
    <tr className="border-b border-slate-600/50">
      <td className="table-td text-center">{rank}</td>
      <td className="table-td text-center">{studentName}</td>
      <td className="table-td text-center">{quizMark}</td>
      <td className="table-td text-center">{assignmentMark}</td>
      <td className="table-td text-center">{totalMark}</td>
    </tr>
  );
}
