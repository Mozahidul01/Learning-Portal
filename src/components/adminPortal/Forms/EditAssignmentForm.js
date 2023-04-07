import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditAssignmentMutation } from "../../../features/assignments/assignmentsApi";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { toast } from "react-toastify";
import Error from "../../ui/Error";

export default function EditAssignmentForm({ assignment }) {
  const {
    id,
    title: initialTitle,
    video_id: initialVideoId,
    totalMark: initialtotalMark,
  } = assignment || {};

  const [title, setTitle] = useState(initialTitle);
  const [totalMark, setTotalMark] = useState(initialtotalMark);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //fetch videos from server
  const {
    data: videos,
    isLoading: isVideosLoading,
    isError: isVideosError,
  } = useGetVideosQuery();

  // Check if any videos have been found
  const foundVideos = !isVideosLoading && !isVideosError && videos?.length > 0;

  //initial Selected video find
  let initialSelectedVideo = null;
  if (foundVideos) {
    const initialVideo = videos.find((v) => v.id === initialVideoId);
    initialSelectedVideo = {
      id: initialVideo?.id,
      title: initialVideo?.title,
    };
  }

  // Selected video state handle
  const [selectedVideo, setSelectedVideo] = useState(initialSelectedVideo);

  const [editAssignment, { isLoading, isError, isSuccess }] =
    useEditAssignmentMutation();

  //handle Submit Request
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const updatedAssignment = {
      title,
      video_id: Number(selectedVideo?.id),
      video_title: selectedVideo?.title,
      totalMark: Number(totalMark),
    };

    editAssignment({ id, data: updatedAssignment });
  };

  //handle success and error responses
  useEffect(() => {
    if (isError) {
      setError("There was an error");
    }
    if (isSuccess) {
      navigate("/admin/assignments");
      toast.info("Assignment Edited Successfully !", {
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
          value={title}
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
            value={selectedVideo?.id}
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
            value={totalMark}
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
        Update assignment
      </button>
    </form>
  );
}
