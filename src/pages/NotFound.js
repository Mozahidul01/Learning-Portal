import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-secondary">
      <h1 className="relative text-9xl font-black text-white tracking-widest">
        404
        <span className="bg-cyan w-max px-2 text-sm rounded rotate-12 tracking-wide absolute top-16 left-16 ">
          Page Not Found
        </span>
      </h1>

      <Link
        to="/"
        className="relative my-5 inline-block text-sm font-medium text-cyan group active:text-cyan focus:outline-none focus:ring"
      >
        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-cyan group-hover:translate-y-0 group-hover:translate-x-0" />
        <span className="relative block px-8 py-3 bg-secondary border border-current">
          Go Home
        </span>
      </Link>
    </main>
  );
}
