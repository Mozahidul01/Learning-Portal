import CourseVideoList from "../../components/studentPortal/Course/CourseVideoList";
import CourseVideoDetails from "../../components/studentPortal/Course/CourseVideoDetails";
import Navbar from "../../components/studentPortal/Navbar/Navbar";

export default function CoursePlayer() {
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <CourseVideoDetails />
            <CourseVideoList />
          </div>
        </div>
      </section>
    </>
  );
}
