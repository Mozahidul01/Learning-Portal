import Navbar from "../../components/studentPortal/Navbar/Navbar";
import useLeaderboardData from "../../hooks/useLeaderboardData";
import StudentRow from "../../components/studentPortal/LeaderBoard/StudentRow";
import { useSelector } from "react-redux";
import UserRow from "../../components/studentPortal/LeaderBoard/UserRow";
import LeaderboardHead from "../../components/studentPortal/LeaderBoard/LeaderboardHead";

export default function LeaderBoard() {
  const { user } = useSelector((state) => state.auth);

  //get the leaderboard data from custom hook
  const leaderboardData = useLeaderboardData();

  //find the user Rank
  const userRank = leaderboardData.find((data) => data.studentId === user.id);

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>

            <UserRow
              userRank={userRank}
              name={user.name}
            />
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <LeaderboardHead />

              <tbody>
                {leaderboardData.map((data) => (
                  <StudentRow
                    key={data.id}
                    data={data}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
