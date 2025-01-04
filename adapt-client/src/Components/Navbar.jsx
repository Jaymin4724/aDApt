import React from "react";
import logo from "../assets/logo-transparent.png";
export default function Navbar() {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between p-2 px-3 m-3  bg-white shadow-2xl rounded-md  ">
      <div className=" flex gap-1 items-center justify-center">
        <img src={logo} alt="logo" className="h-6 w-6" />
        <div className="font-extralight text-2xl pb-1">aDApt</div>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <button>link1</button>
        <button>link2</button>
        <button>link3</button>
      </div>
      <button className="flex gap-2 justify-center items-center">
        Get Started
      </button>
    </div>
  );
}
