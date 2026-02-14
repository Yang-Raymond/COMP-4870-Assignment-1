import { Link } from "react-router-dom";

// Displays 404 error page with decorative graphics and link to home.
export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] relative flex flex-col items-center justify-start overflow-hidden pt-20">
      <h1 className="z-0 text-[12rem] md:text-[16rem] font-extrabold text-(--brand-pink)/40 leading-none select-none absolute top-10 left-1/2 -translate-x-1/2">
        404
      </h1>
      <div className="z-20 relative w-full max-w-5xl -mt-12 md:-mt-28 flex justify-center px-4 pointer-events-none">
        <img
          className="w-full relative z-10"
          src="/images/mountains.png"
          alt="Mountains"
        />
        <img
          className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-24 md:w-32 z-20 drop-shadow-xl"
          src="/images/penguin.png"
          alt="Penguin"
        />
      </div>
      <div className="z-20 relative text-center pb-16 px-6 mt-12 md:mt-24">
        <h2 className="text-3xl md:text-4xl font-bold text-(--text) tracking-tight">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-(--muted) max-w-md mx-auto leading-relaxed">
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="btn-primary shadow-lg shadow-(--brand-pink)/20 px-8 py-3 text-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
