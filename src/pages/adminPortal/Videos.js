import { Link } from "react-router-dom";
import Navbar from "../../components/adminPortal/Navbar/Navbar";
import VideosTable from "../../components/adminPortal/Videos/VideosTable";

export default function Videos() {
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link
                to="/admin/addVideo"
                className="btn ml-auto"
              >
                Add Video
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              <VideosTable />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
