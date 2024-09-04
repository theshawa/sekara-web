import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import landingBg from "../assets/landing-bg.webp";
import { Logo } from "../common/Logo";

export const LandingPage = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${landingBg})`,
      }}
      className="min-h-screen flex w-full relative"
    >
      <div
        className={`w-full h-full absolute transition-colors duration-500 ease-in-out  ${
          active ? "bg-stone-950/90" : "bg-stone-950/60"
        }`}
      ></div>
      <div className="flex flex-col items-center max-w-lg mx-auto mt-[30vh] text-stone-50 w-full relative">
        <Logo className="w-48" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/app/?query=${query}`);
          }}
          className={`flex items-center w-full max-w-lg h-12 rounded-full  backdrop-blur-sm px-4 mt-10 ${
            active ? "bg-stone-100/30" : "bg-stone-100/20"
          } transition-colors duration-500 ease-in-out`}
        >
          <MagnifyingGlassIcon className="size-4 text-stone-300" />
          <input
            type="text"
            className="bg-transparent ml-2 text-lg placeholder:text-stone-300 text-stone-200"
            placeholder="Search here..."
            value={query}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};
