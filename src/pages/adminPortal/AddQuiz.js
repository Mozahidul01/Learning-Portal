import AddQuizForm from "../../components/adminPortal/Forms/AddQuizForm";
import Navbar from "./../../components/adminPortal/Navbar/Navbar";

export default function AddQuiz() {
  return (
    <>
      <Navbar />
      <div className="container relative mx-auto my-10">
        <div className="bg-secondary mx-auto lg:max-w-4xl md:max-w-2xl max-w-sm shadow-md rounded md:px-8 px-6 pt-6 pb-8 mb-4 flex flex-col my-2">
          <h1 className="mt-4 mb-14 lg:text-4xl md:text-3xl text-2xl font-bold uppercase text-center">
            Add A New Quiz
          </h1>

          <AddQuizForm />
        </div>
      </div>
    </>
  );
}
