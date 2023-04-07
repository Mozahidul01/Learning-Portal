import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { useEditQuizMutation } from "../../../features/quizzes/quizzesApi";
import Error from "../../ui/Error";
import { toast } from "react-toastify";

export default function EditQuizForm({ quiz }) {
  const {
    id,
    question: initialQuestion,
    options,
    video_id: initialVideoId,
  } = quiz || {};

  const [question, setQuestion] = useState(initialQuestion);
  const [option1, setOption1] = useState(options[0]?.option);
  const [option2, setOption2] = useState(options[1]?.option);
  const [option3, setOption3] = useState(options[2]?.option);
  const [option4, setOption4] = useState(options[3]?.option);
  const [option1Answer, setOption1Answer] = useState(options[0]?.isCorrect);
  const [option2Answer, setOption2Answer] = useState(options[1]?.isCorrect);
  const [option3Answer, setOption3Answer] = useState(options[2]?.isCorrect);
  const [option4Answer, setOption4Answer] = useState(options[3]?.isCorrect);
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

  //add a new quiz to the server
  const [editQuiz, { isLoading, isError, isSuccess }] = useEditQuizMutation();

  //handle Submit Request
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    //New quiz object from the form fields
    const updatedQuiz = {
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

    editQuiz({ id, data: updatedQuiz });
  };

  //handle success and error responses
  useEffect(() => {
    if (isError) {
      setError("There was an error");
    }
    if (isSuccess) {
      navigate("/admin/quizzes");
      toast.info("Quiz Edited Successfully !", {
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
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {!question && <p className="text-red-300 text-xs italic">*Required</p>}
      </div>

      <div className="md:flex items-center justify-between  mb-6">
        <div className="md:w-3/4 lg:w-4/5 md:px-3">
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
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
          {!option1 && <p className="text-red-300 text-xs italic">*Required</p>}
        </div>

        <div className="flex items-center gap-3 md:px-3 mt-3">
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
            checked={option1Answer}
            onChange={(e) => setOption1Answer(e.target.checked ? true : false)}
          />
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-6">
        <div className="md:w-3/4 lg:w-4/5 md:px-3">
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
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
          {!option2 && <p className="text-red-300 text-xs italic">*Required</p>}
        </div>

        <div className="flex items-center gap-3 md:px-3  mt-3">
          <label
            className="uppercase tracking-wide text-grey-darker font-semibold"
            htmlFor="option2-answer"
          >
            Correct?
          </label>
          <input
            type="checkbox"
            className="form-checkbox"
            checked={option2Answer}
            onChange={(e) => setOption2Answer(e.target.checked ? true : false)}
          />
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-6">
        <div className="md:w-3/4 lg:w-4/5 md:px-3">
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
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
          {!option3 && <p className="text-red-300 text-xs italic">*Required</p>}
        </div>

        <div className="flex items-center gap-3 md:px-3 mt-3">
          <label
            className="uppercase tracking-wide text-grey-darker font-semibold"
            htmlFor="option3-answer"
          >
            Correct?
          </label>
          <input
            type="checkbox"
            className="form-checkbox"
            checked={option3Answer}
            onChange={(e) => setOption3Answer(e.target.checked ? true : false)}
          />
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-6">
        <div className="md:w-3/4 lg:w-4/5 md:px-3">
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
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
          />
          {!option4 && <p className="text-red-300 text-xs italic">*Required</p>}
        </div>

        <div className="flex items-center gap-3 md:px-3 mt-3">
          <label
            className="uppercase tracking-wide text-grey-darker font-semibold"
            htmlFor="option4-answer"
          >
            Correct?
          </label>
          <input
            type="checkbox"
            className="form-checkbox"
            checked={option4Answer}
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

      {error !== "" && <Error message={error} />}

      <button
        className="px-6 py-2 rounded-full bg-cyan block text-slate-900 font-semibold ml-auto mt-6 hover:opacity-90 active:opacity-100 active:scale-95 "
        type="submit"
        disabled={isLoading}
      >
        Update quiz
      </button>
    </form>
  );
}
