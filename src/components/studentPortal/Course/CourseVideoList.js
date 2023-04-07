import { useGetVideosQuery } from "../../../features/videos/videosApi";
import CourseVideo from "./CourseVideo";
import CourseVideoSkeleton from "./../../ui/Skeletons/CourseVideoSkeleton";
import Error from "./../../ui/Error";

export default function CourseVideoList() {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  //Decide what to render
  let content;

  if (isLoading) {
    content = <CourseVideoSkeleton />;
  }

  if (!isLoading && isError) {
    content = <Error message="Something went wrong" />;
    console.error(error);
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = (
      <p className="px-6 py-4 font-medium text-center shadow capitalize">
        No Video Found
      </p>
    );
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => {
      return (
        <CourseVideo
          key={video.id}
          video={video}
        />
      );
    });
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
}
