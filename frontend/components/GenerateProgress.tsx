import React from "react";
import { ProgressBar } from "./ProgressBar";

const GenerateProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="w-full flex rounded-xl flex-col items-center justify-center h-72">
      <span className="font-bold text-lg animate-pulse">Generating...</span>
      <ProgressBar progress={progress} />
      <h1 className="font-bold">{Math.round(progress * 100)} %</h1>
    </div>
  );
};

export default GenerateProgress;
