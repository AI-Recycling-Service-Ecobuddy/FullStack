"use client";

import React from "react";
import Logo from "../ui/Logo";
import LinksNav from "./LinksNav";

export default function Navbar() {
  return (
    <nav>
      <div className="w-full h-20 bg-emerald-800 ">
        <div className="container mx-auto px-4 h-full">
          <div className="relative flex justify-between items-center h-full">
            <div className="w-1/3 " />
            <div className=" absolute left-1/2 transform -translate-x-1/2">
              <Logo />
            </div>
            <div className="w-3/4 flex justify-end ">
              <LinksNav />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
