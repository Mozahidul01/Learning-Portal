import { Link } from "react-router-dom";
import AssignmentTable from "../../components/adminPortal/Assignment/AssignmentTable";
import Navbar from "../../components/adminPortal/Navbar/Navbar";

export default function Assignments() {
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link
                to="/admin/addAssignment"
                className="btn ml-auto"
              >
                Add Assignment
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              <AssignmentTable />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
