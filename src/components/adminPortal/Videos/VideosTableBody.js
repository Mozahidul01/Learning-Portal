import VideosTableRow from "./VideosTableRow";
import VideosSkeleton from "./../../ui/Skeletons/VideosSkeleton";
import Error from "./../../ui/Error";
import { useGetVideosQuery } from "../../../features/videos/videosApi";

export default function VideosTableBody() {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  //Decide what to render
  let content;

  if (isLoading) {
    content = (
      <>
        <VideosSkeleton />
        <VideosSkeleton />
        <VideosSkeleton />
      </>
    );
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
        <VideosTableRow
          key={video.id}
          video={video}
        />
      );
    });
  }
  return <tbody className="divide-y divide-slate-600/50">{content}</tbody>;
}
