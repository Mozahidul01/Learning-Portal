import React, { useEffect, useState } from "react";
import Error from "../../ui/Error";
import { useEditVideoMutation } from "../../../features/videos/videosApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditVideoForm({ video }) {
  const {
    id,
    title: initialTitle,
    description: initialDescription,
    url: initialUrl,
    views: initialViews,
    duration: initialDuration,
  } = video || {};

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [url, setUrl] = useState(initialUrl);
  const [views, setViews] = useState(initialViews);
  const [duration, setDuration] = useState(initialDuration);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [editVideo, { isLoading, isError, isSuccess }] = useEditVideoMutation();

  //handle Submit Request
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const updatedVideo = {
      title,
      description,
      url,
      views,
      duration,
    };

    editVideo({ id, data: updatedVideo });
  };

  //handle success and error responses
  useEffect(() => {
    if (isError) {
      setError("There was an error");
    }
    if (isSuccess) {
      navigate("/admin/videos");
      toast.info("The video Edited Successfully !", {
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
          htmlFor="video-title"
        >
          Video Title
        </label>
        <input
          className="form-input"
          required
          id="video-title"
          type="text"
          placeholder="Enter Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!title && <p className="text-red-300 text-xs italic">*Required</p>}
      </div>

      <div className="md:w-full md:px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
          htmlFor="video-description"
        >
          Video Description
        </label>
        <textarea
          className="form-input"
          rows="4"
          required
          id="video-description"
          placeholder="Enter Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {!description && (
          <p className="text-red-300 text-xs italic">*Required</p>
        )}
      </div>

      <div className="md:w-full md:px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
          htmlFor="video-url"
        >
          Video url
        </label>
        <input
          className="form-input"
          required
          id="video-url"
          type="url"
          placeholder="Enter Video url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {!url && <p className="text-red-300 text-xs italic">*Required</p>}
      </div>

      <div className="md:flex mb-2">
        <div className="md:w-1/2 md:px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
            htmlFor="video-duration"
          >
            Video Duration
          </label>
          <input
            className="form-input"
            required
            id="video-duration"
            type="text"
            placeholder="Enter video duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          {!duration && (
            <p className="text-red-300 text-xs italic">*Required</p>
          )}
        </div>
        <div className="md:w-1/2 md:px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
            htmlFor="video-views"
          >
            Video Views
          </label>
          <input
            className="form-input"
            required
            id="video-views"
            type="text"
            placeholder="Enter Total Views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
          {!views && <p className="text-red-300 text-xs italic">*Required</p>}
        </div>
      </div>

      {error !== "" && <Error message={error} />}

      <button
        className="px-6 py-2 rounded-full bg-cyan block text-slate-900 font-semibold ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
        type="submit"
        disabled={isLoading}
      >
        Update Video
      </button>
    </form>
  );
}
