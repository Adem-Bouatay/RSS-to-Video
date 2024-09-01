import { z } from "zod";
import { useRendering } from "../helpers/use-rendering";
import { CompositionProps, COMP_NAME } from "../types/constants";
import { Button } from "./Button";
import { DownloadButton } from "./DownloadButton";
import { ErrorComp } from "./Error";
import { ProgressBar } from "./ProgressBar";
import { calculateDurationInFrames } from "@/remotion/utils/DurationCalculator";

const formatSeconds = (seconds: number) => {
  const date = new Date(1970, 0, 1);
  date.setSeconds(seconds);
  return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
};

export const RenderControls: React.FC<{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  inputProps: z.infer<typeof CompositionProps>;
}> = ({ text, setText, inputProps }) => {
  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps);
  const durationInFramesWithoutStartFrame = calculateDurationInFrames(
    inputProps["articleDuration"],
    inputProps["article"].length,
    30
  );
  const duration = (durationInFramesWithoutStartFrame + 30) / 30;

  return (
    <div className="flex flex-col">
      {state.status === "init" ||
      state.status === "invoking" ||
      state.status === "error" ? (
        <>
          <div className="flex flex-col items-center space-y-10">
            <span className="flex items-center space-x-5 text-lg font-medium">
              <h1 className="text-primary">Duration:</h1>
              <p className="text-gray-500">{formatSeconds(duration)}</p>
            </span>
            <Button
              disabled={state.status === "invoking"}
              loading={state.status === "invoking"}
              onClick={renderMedia}
            >
              Render video
            </Button>
          </div>
          {state.status === "error" ? (
            <ErrorComp message={state.error.message}></ErrorComp>
          ) : null}
        </>
      ) : null}
      {state.status === "rendering" || state.status === "done" ? (
        <>
          <ProgressBar
            progress={state.status === "rendering" ? state.progress : 1}
          />
          <div>
            <DownloadButton undo={undo} state={state}></DownloadButton>
          </div>
        </>
      ) : null}
    </div>
  );
};
