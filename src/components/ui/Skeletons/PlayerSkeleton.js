export default function PlayerSkeleton() {
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2 animate-pulse">
      <div className="aspect-video bg-slate-700 w-full" />
      <div>
        <div className="h-3 mb-2 bg-slate-700 rounded w-full" />
        <div className=" h-2 mb-4 bg-slate-700 rounded w-52" />

        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-slate-700 rounded-full w-24" />
          <div className="h-4 bg-slate-700 rounded-full w-24" />
        </div>
        <div className="h-2 mb-2  bg-slate-700 rounded" />
        <div className="h-2 mb-2 bg-slate-700 rounded" />
        <div className="h-2 mb-2 bg-slate-700 rounded" />
      </div>
    </div>
  );
}
