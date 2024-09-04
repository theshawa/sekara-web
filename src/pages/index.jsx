import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import landingBg from "../assets/landing-bg.webp";
import { Logo } from "../common/Logo";

export const LandingPage = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${landingBg})`,
        }}
        className="min-h-screen flex w-full relative p-5"
      >
        <div
          className={`w-full h-full absolute transition-colors left-0 top-0 duration-500 ease-in-out  ${
            active ? "bg-stone-950/90" : "bg-stone-950/60"
          }`}
        ></div>
        <div className="flex flex-col items-center max-w-lg mx-auto mt-[30vh] text-stone-50 w-full relative">
          <Logo className="w-48" />
          <p className="text-stone-300 mt-5 text-xl">
            Exploring wonder of writing...
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/app/?query=${query}`);
            }}
            className={`flex items-center w-full max-w-lg py-2.5 rounded-full  backdrop-blur-sm px-4 mt-10 ${
              active ? "bg-stone-100/30" : "bg-stone-100/20"
            } transition-colors duration-500 ease-in-out`}
          >
            <MagnifyingGlassIcon className="size-4 text-stone-300" />
            <input
              type="text"
              className="bg-transparent ml-2 text-lg placeholder:text-stone-300 flex-1 text-stone-200"
              placeholder="Search here..."
              value={query}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <div className="flex space-x-2">
            <Link
              to={"/app"}
              className="w-max max-w-full mx-auto mt-10 px-3 flex items-center py-2 rounded-md hover:backdrop-blur-sm hover:bg-stone-50/10 transition-all duration-500"
            >
              Explore Articles
            </Link>
            <Link
              to={"#about"}
              className="w-max max-w-full mx-auto mt-10 px-3 flex items-center py-2 rounded-md hover:backdrop-blur-sm hover:bg-stone-50/10 transition-all duration-500"
            >
              About
            </Link>
          </div>
          <button className="mt-auto mx-auto"></button>
        </div>
      </div>
      <section
        id="about"
        className="max-w-screen-sm mx-auto  w-full px-5 py-20"
      >
        <h1 className="font-semibold">Welcome to Sēkara</h1>
        <p className="mt-5">
          Sēkara blog platform developed by a team of five second-year Computer
          Science undergraduates from the University of Colombo School of
          Computing (UCSC). As part of our Rapid Application Development (RAD)
          course, we’ve built Sēkara using the MERN Stack MongoDB, Express.js,
          React.js, and Node.js over a six-month period.
          <br />
          <br />
          Our goal with Sēkara is to create a space for thoughtful stories,
          insightful articles, and meaningful conversations. In a world
          overwhelmed by noise, Sēkara offers a platform where writers can share
          their experiences, ideas, and expertise in a calm, focused
          environment. Whether you're a professional writer or someone with a
          unique perspective to share, Sēkara is a place for your voice to be
          heard.
          <br />
          <br />
          Our team{" "}
          <a
            href="https://theshawa-dev.web.app"
            target="_blank"
            className="link"
          >
            Theshawa Dasun
          </a>
          ,{" "}
          <a
            href="http://www.linkedin.com/in/imalsha-jathunarachchi-698684252"
            target="_blank"
            className="link"
          >
            Imalsha Jathunarachchi
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/rowneth"
            target="_blank"
            className="link"
          >
            Don Roneth
          </a>
          ,{" "}
          <a
            href="http://www.linkedin.com/in/manusha-ranaweera-200b06254"
            className="link"
            target="_blank"
          >
            Manusha Ranaweera
          </a>
          , and{" "}
          <a
            href="https://www.linkedin.com/in/chamika-wijesinghe-3394062a2"
            className="link"
            target="_blank"
          >
            Chamika Hasith
          </a>{" "}
          came together to build Sēkara as both a learning experience and a
          meaningful contribution to the digital world. Using the MERN Stack,
          we’ve created a dynamic, scalable platform designed to facilitate
          deep, engaging interactions through the power of writing.
          <br />
          <br />
          We believe that great ideas deserve a great platform, and Sēkara is
          our answer to that need. Through this project, we’ve combined our
          technical knowledge with a passion for creating a space that supports
          thoughtful discourse and knowledge sharing.
          <br />
          <br />
        </p>
        <Link to={"/app"} className="w-max mt-5 btn">
          Explore Platform
        </Link>
      </section>
    </>
  );
};
