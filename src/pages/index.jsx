import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import landingBg from "../assets/landing-bg.webp";
import { Logo } from "../common/Logo";

export const LandingPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <div className="p-0 min-h-screen flex w-full">
      <div
        style={{
          backgroundImage: `url(${landingBg})`,
        }}
        className="w-full h-full min-h-screen bg-slate-950 bg-cover bg-center rounded-xl text-slate-50 p-10 flex flex-col"
      >
        <div className="flex">
          <Logo className="text-stone-100 w-32" />
          <Link
            to="/app"
            className="ml-auto py-2 px-4 rounded-full bg-stone-700/90 hover:bg-stone-600/90 text-stone-200 backdrop-blur-sm font-medium"
          >
            Visit Home
          </Link>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/app/?query=${query}`);
          }}
          className="flex items-center w-max mx-auto max-w-full py-3 rounded-full bg-stone-700/90 backdrop-blur-sm px-6 mt-36 shadow-lg"
        >
          <MagnifyingGlassIcon className="size-5 text-stone-400" />
          <input
            type="text"
            className="bg-transparent ml-2 text-lg placeholder:text-stone-400 text-stone-200"
            placeholder="Search here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <div className="flex flex-col mt-auto">
          <h2 className="text-xl font-medium text-stone-50">
            Exploring wonders of writing
          </h2>
          <p className="mt-3 max-w-sm text-stone-50/70">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
            sapiente, ad incidunt rem neque quis facilis accusantium placeat
            nostrum quia beatae aliquid. Itaque eligendi voluptatem quia
            laudantium magnam est aspernatur.
          </p>
        </div>
      </div>
    </div>
  );
};
