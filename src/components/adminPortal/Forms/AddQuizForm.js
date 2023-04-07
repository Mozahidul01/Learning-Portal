import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { useAddQuizMutation } from "../../../features/quizzes/quizzesApi";
import Error from "../../ui/Error";
import { toast } from "react-toastify";

export default function AddQuizForm() {
  const [question, setQuestion] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option1Answer, setOption1Answer] = useState(false);
  const [option2Answer, setOption2Answer] = useState(false);
  const [option3Answer, setOption3Answer] = useState(false);
  const [option4Answer, setOption4Answer] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //fetch videos from the server
  const {
    data: videos,
    isLoading: isVideosLoading,
    isError: isVideosError,
  } = useGetVideosQuery();

  //add a new quiz to the server
  const [addQuiz, { isLoading, isError, isSuccess }] = useAddQuizMutation();

  // Check if any videos have been found
  const foundVideos = !isVideosLoading && !isVideosError && videos?.length > 0;

  //handle Submit Request
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    //New quiz object from the form fields
    const newQuiz = {
      question,
      video_id: Number(selectedVideo?.id),
      video_title: selectedVideo?.title,
      options: [
        { id: 1, option: option1, isCorrect: option1Answer },
        { id: 2, option: option2, isCorrect: option2Answer },
        { id: 3, option: option3, isCorrect: option3Answer },
        { id: 4, option: option4, isCorrect: option4Answer },
      ],
    };

    addQuiz(newQuiz);
  };

  //handle success and error responses
  useEffect(() => {
    if (isError) {
      setError("There was an error");
    }
    if (isSuccess) {
      navigate("/admin/quizzes");
      toast.success("Quiz Added Successfully !", {
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
          htmlFor="quiz-title"
        >
          Question
        </label>
        <input
          className="form-input"
          required
          id="quiz-title"
          type="text"
          placeholder="Enter Question"
          onChange={(e) => setQuestion(e.target.value)}
        />
        {!question && <p className="text-red-300 text-xs italic">*Required</p>}
      </div>

      <div className="md:flex mb-6">
        <div className="w-3/4 md:px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
            htmlFor="quiz-option1"
          >
            Option 01
          </label>
          <input
            className="form-input"
            required
            id="quiz-option1"
            type="text"
            placeholder="Enter Option 01"
            onChange={(e) => setOption1(e.target.value)}
          />
          {!option1 && <p className="text-red-300 text-xs italic">*Required</p>}
        </div>

        <div className="flex items-center gap-3 md:px-3">
          <label
            htmlFor="option1-answer"
            className="uppercase tracking-wide text-grey-darker font-semibold"
          >
            Correct ?
          </label>
          <input
            id="option1-answer"
            type="checkbox"
            className="form-checkbox"
            onChange={(e) => setOption1Answer(e.target.checked ? true : false)}
          />
        </div>
      </div>

      <div className="md:flex mb-6">
        <div className="md:w-3/4 md:px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
            htmlFor="quiz-option2"
          >
            Option 02
          </label>
          <input
            className="form-input"
            required
            id="quiz-option2"
            type="text"
            placeholder="Enter Option 02"
            onChange={(e) => setOption2(e.target.value)}
          />
          {!option2 && <p className="text-red-300 text-xs italic">*Required</p>}
        </div>

        <div className="flex items-center gap-3 md:px-3">
          <label
            className="uppercase tracking-wide text-grey-darker font-semibold"
            htmlFor="option2-answer"
          >
            Correct?
          </label>
          <input
            type="checkbox"
            className="form-checkbox"
            onChange={(e) => setOption2Answer(e.target.checked ? true : false)}
          />
        </div>
      </div>

      <div className="md:flex mb-6">
        <div className="md:w-3/4 md:px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
            htmlFor="quiz-option3"
          >
            Option 03
          </label>
          <input
            className="form-input"
            required
            id="quiz-option3"
            type="text"
            placeholder="Enter Option 03"
            onChange={(e) => setOption3(e.target.value)}
          />
          {!option3 && <p className="text-red-300 text-xs italic">*Required</p>}
        </div>

        <div className="flex items-center gap-3 md:px-3">
          <label
            className="uppercase tracking-wide text-grey-darker font-semibold"
            htmlFor="option3-answer"
          >
            Correct?
          </label>
          <input
            type="checkbox"
            className="form-checkbox"
            onChange={(e) => setOption3Answer(e.target.checked ? true : false)}
          />
        </div>
      </div>

      <div className="md:flex mb-6">
        <div className="md:w-3/4 md:px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
            htmlFor="quiz-option4"
          >
            Option 04
          </label>
          <input
            className="form-input"
            required
            id="quiz-option4"
            type="text"
            placeholder="Enter Option 04"
            onChange={(e) => setOption4(e.target.value)}
          />
          {!option4 && <p className="text-red-300 text-xs italic">*Required</p>}
        </div>

        <div className="flex items-center gap-3 md:px-3">
          <label
            className="uppercase tracking-wide text-grey-darker font-semibold"
            htmlFor="option4-answer"
          >
            Correct?
          </label>
          <input
            type="checkbox"
            className="form-checkbox"
            onChange={(e) => setOption4Answer(e.target.checked ? true : false)}
          />
        </div>
      </div>

      <div className="md:w-full md:px-3 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
          htmlFor="quiz-description"
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

      {error !== "" && <Error message={error} />}

      <button
        className="px-6 py-2 rounded-full bg-cyan block text-slate-900 font-semibold ml-auto mt-6 hover:opacity-90 active:opacity-100 active:scale-95 "
        type="submit"
        disabled={isLoading}
      >
        Save quiz
      </button>
    </form>
  );
}
