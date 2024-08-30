import React from "react";
import { ProgressBar } from "./ProgressBar";

const GenerateProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="w-full flex rounded-xl flex-col items-center justify-center h-72">
      <div className="font-bold text-lg">Generating</div>
      <ProgressBar progress={progress} />
      <h1 className="font-bold">{Number(progress * 100)} %</h1>
    </div>
  );
};

export default GenerateProgress;
