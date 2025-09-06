import { squarePattern } from "@/public";
import React from "react";

const SquarePattern = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-[550px]  lg:h-[700px] bg-repeat-x bg-top bg-cover opacity-10"
      style={{ backgroundImage: `url(${squarePattern})` }}
    />
  );
};

export default SquarePattern;
