export default function CourseVideoSkeleton() {
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30 animate-pulse">
      <div className="w-full flex flex-row gap-2 px-2">
        <div className="rounded-full bg-slate-700 h-5 w-5" />
        <div className="w-full">
          <div className="h-3 mb-2 bg-slate-700 rounded" />
          <div className="flex gap-2 mb-4">
            <div className="h-2 bg-slate-700 rounded-full w-24" />
            <div className="border-slate-700 border-r-2" />
            <div className="h-2 bg-slate-700 rounded-full w-24" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row gap-2 px-2 pt-2">
        <div className="rounded-full bg-slate-700 h-5 w-5" />
        <div className="w-full">
          <div className="h-3 mb-2 bg-slate-700 rounded" />
          <div className="flex gap-2 mb-4">
            <div className="h-2 bg-slate-700 rounded-full w-24" />
            <div className="border-slate-700 border-r-2" />
            <div className="h-2 bg-slate-700 rounded-full w-24" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row gap-2 px-2 pt-2">
        <div className="rounded-full bg-slate-700 h-5 w-5" />
        <div className="w-full">
          <div className="h-3 mb-2 bg-slate-700 rounded" />
          <div className="flex gap-2 mb-4">
            <div className="h-2 bg-slate-700 rounded-full w-24" />
            <div className="border-slate-700 border-r-2" />
            <div className="h-2 bg-slate-700 rounded-full w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
