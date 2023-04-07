import { useEffect, useState } from "react";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { useAddAssignmentMutation } from "../../../features/assignments/assignmentsApi";
import { useNavigate } from "react-router-dom";
import Error from "../../ui/Error";
import { toast } from "react-toastify";

export default function AddAssignmentForm() {
  const [title, setTitle] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [totalMark, setTotalMark] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    data: videos,
    isLoading: isVideosLoading,
    isError: isVideosError,
  } = useGetVideosQuery();

  const [addAssignment, { isLoading, isError, isSuccess }] =
    useAddAssignmentMutation();

  // Check if any videos have been found
  const foundVideos = !isVideosLoading && !isVideosError && videos?.length > 0;

  //handle Submit Request
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const newAssignment = {
      title,
      video_id: Number(selectedVideo?.id),
      video_title: selectedVideo?.title,
      totalMark: Number(totalMark),
    };

    addAssignment(newAssignment);
  };

  //handle success and error responses
  useEffect(() => {
    if (isError) {
      setError("There was an error");
    }
    if (isSuccess) {
      navigate("/admin/assignments");
      toast.success("Assignment Added Successfully !", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [isError, isSuccess, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="md:w-full md:px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
          htmlFor="assignment-title"
        >
          assignment Title
        </label>
        <input
          className="form-input"
          required
          id="assignment-title"
          type="text"
          placeholder="Enter assignment Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {!title && <p className="text-red-300 text-xs italic">*Required</p>}
      </div>

      <div className="md:flex mb-2">
        <div className="md:w-1/2 md:px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
            htmlFor="assignment-description"
          >
            Video
          </label>

          <select
            className="form-input cursor-pointer"
            id="assignment-video"
            onChange={(e) =>
              setSelectedVideo({
                id: e.target.options[e.target.selectedIndex].value,
                title: e.target.options[e.target.selectedIndex].text,
              })
            }
          >
            <option
              defaultValue
              hidden
            >
              Select A Video
            </option>
            {foundVideos &&
              videos.map((video) => (
                <option
                  key={video.id}
                  value={video.id}
                >
                  {video.title}
                </option>
              ))}
          </select>

          {!selectedVideo && (
            <p className="text-red-300 text-xs italic">*Required</p>
          )}
        </div>

        <div className="md:w-1/2 md:px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
            htmlFor="assignment-marks"
          >
            Assignment Marks
          </label>
          <input
            className="form-input"
            required
            id="assignment-marks"
            type="number"
            placeholder="Enter Assignment Marks"
            onChange={(e) => setTotalMark(e.target.value)}
          />
          {!totalMark && (
            <p className="text-red-300 text-xs italic">*Required</p>
          )}
        </div>
      </div>

      {error !== "" && <Error message={error} />}

      <button
        className="px-6 py-2 rounded-full bg-cyan block text-slate-900 font-semibold ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
        type="submit"
        disabled={isLoading}
      >
        Save assignment
      </button>
    </form>
  );
}
