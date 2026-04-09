"use client";

import Lottie from "lottie-react";
import animationData from "../../../public/tennis-ball.json";

export function TennisBall() {
  return (
    <div className="h-8 w-8">
      <Lottie
        animationData={animationData}
        loop
        autoplay
      />
    </div>
  );
}