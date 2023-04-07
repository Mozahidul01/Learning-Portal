export default function StudentQuizSkeleton() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <div className="h-6 mb-4 bg-slate-700 rounded" />
          <div className="h-2 mb-2 bg-slate-700 rounded" />
        </div>
        <div className="p-2">
          <div className="space-y-8 ">
            <div className="quiz">
              <div className="h-5 mb-6 bg-slate-700 rounded" />
              <form className="quizOptions">
                <div className="h-4 mb-2 bg-slate-700 rounded" />
                <div className="h-4 mb-2 bg-slate-700 rounded" />
                <div className="h-4 mb-2 bg-slate-700 rounded" />
                <div className="h-4 mb-2 bg-slate-700 rounded" />
              </form>
            </div>
            <div className="quiz">
              <div className="h-5 mb-6 bg-slate-700 rounded" />
              <form className="quizOptions">
                <div className="h-4 mb-2 bg-slate-700 rounded" />
                <div className="h-4 mb-2 bg-slate-700 rounded" />
                <div className="h-4 mb-2 bg-slate-700 rounded" />
                <div className="h-4 mb-2 bg-slate-700 rounded" />
              </form>
            </div>
          </div>
          <div className="h-8 w-16 bg-slate-700 rounded-full ml-auto mt-8" />
        </div>
      </div>
    </section>
  );
}
