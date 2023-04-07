export default function QuizSkeleton() {
  return (
    <tr>
      <td className="table-td">
        <div className="h-2 bg-slate-700 rounded w-60" />
      </td>
      <td className="table-td">
        <div className="h-2 bg-slate-700 rounded w-60" />
      </td>
      <td className="table-td flex gap-x-2 justify-center">
        <div className="h-3 bg-slate-700 rounded w-16" />
        <div className="h-3 bg-slate-700 rounded w-16" />
      </td>
    </tr>
  );
}
