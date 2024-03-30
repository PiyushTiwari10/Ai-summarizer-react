import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <nav className="flex justify-between pl-12 pr-12 pt-2  w-full">
        <img src={logo}></img>
        <button
          onClick={() => {
            window.open("https://github.com/dashboard");
          }}
          className="bg-gradient-to-r from-orange-500 p-2 rounded-lg font-semibold "
        >
          Github
        </button>
      </nav>

      <h1 className="text-5xl font-bold text-center pt-10  ">
        Summarize <br />
        Your Articles Using
        <br /> 
        <span className="bg-gradient-to-r from-orange-500 rounded-lg ">
          OpenAI GPT-4
        </span>
      </h1>

      <h1 className="desc">
        Simplify your reading with Summize,
        <br /> an open-source article summarizer that transforms lengthy
        articles into clear and concise summaries
      </h1>
    </div>
  );
};

export default Hero;
