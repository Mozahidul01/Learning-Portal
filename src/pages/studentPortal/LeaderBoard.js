import LeaderTable from "../../components/studentPortal/LeaderBoard/LeaderTable";
import LeaderTableHead from "../../components/studentPortal/LeaderBoard/LeaderTableHead";
import Navbar from "../../components/studentPortal/Navbar/Navbar";

export default function LeaderBoard() {
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <LeaderTableHead />
              <tbody>
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">4</td>
                  <td className="table-td text-center font-bold">Saad Hasan</td>
                  <td className="table-td text-center font-bold">50</td>
                  <td className="table-td text-center font-bold">50</td>
                  <td className="table-td text-center font-bold">100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <LeaderTable />
          </div>
        </div>
      </section>
    </>
  );
}
