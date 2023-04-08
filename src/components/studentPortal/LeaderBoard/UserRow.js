import LeaderboardHead from "./LeaderboardHead";

export default function UserRow({ userRank, name }) {
  const { rank, studentName, quizMark, assignmentMark, totalMark } =
    userRank || {
      rank: "-",
      studentName: name,
      quizMark: "-",
      assignmentMark: "-",
      totalMark: "-",
    };

  return (
    <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
      <LeaderboardHead />

      <tbody>
        <tr className="border-2 border-cyan">
          <td className="table-td text-center font-bold">{rank}</td>
          <td className="table-td text-center font-bold"> {studentName} </td>
          <td className="table-td text-center font-bold"> {quizMark} </td>
          <td className="table-td text-center font-bold"> {assignmentMark} </td>
          <td className="table-td text-center font-bold"> {totalMark} </td>
        </tr>
      </tbody>
    </table>
  );
}
