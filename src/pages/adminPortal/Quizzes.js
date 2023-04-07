import React from "react";
import Navbar from "../../components/adminPortal/Navbar/Navbar";
import QuizTable from "../../components/adminPortal/Quizzes/QuizTable";
import { Link } from "react-router-dom";

export default function Quizzes() {
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link
                to="/admin/addQuiz"
                className="btn ml-auto"
              >
                Add Quiz
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              <QuizTable />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
