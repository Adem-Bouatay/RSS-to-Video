import React, { useMemo } from "react";

export const ProgressBar: React.FC<{
  progress: number;
}> = ({ progress }) => {
  const fill: React.CSSProperties = useMemo(() => {
    return {
      width: `${progress * 100}%`,
    };
  }, [progress]);

  return (
    <div className="w-2/3 h-3 rounded-md appearance-none bg-gray-300 mt-2.5 mb-6 shadow-md">
      <div
        className="bg-orange-500 h-full rounded-md transition-all ease-in-out duration-100"
        style={fill}
      ></div>
    </div>
  );
};
