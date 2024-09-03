import {
  interpolate,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
} from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { donut } from "./presentations/CirclePresentation";
import { star } from "./presentations/StarPresentation";
import { Frame } from "./frame";
import { StartTitle } from "./components/StartTitle";
import { CompositionProps } from "@/types/constants";
import { z } from "zod";
import { calculateDurationInFrames } from "./utils/DurationCalculator";

export const Video = (inputData: z.infer<typeof CompositionProps>) => {
  const { fps } = useVideoConfig();

  let transition = donut({
    width: 1920,
    height: 1080,
  });

  switch (inputData["transitionType"]) {
    case "circle":
      transition = donut({
        width: 1920,
        height: 1080,
      });
      break;
    case "star":
      transition = star({
        width: 1920,
        height: 1080,
      });
      break;

    default:
      transition = donut({
        width: 1920,
        height: 1080,
      });
      break;
  }

  return (
    <>
      <TransitionSeries
        style={{
          backgroundImage: "linear-gradient(to bottom right, #c7007e, #ffd000)",
        }}
      >
        <TransitionSeries.Sequence durationInFrames={55}>
          <StartTitle title="Latech" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={transition}
          timing={springTiming({
            config: {
              damping: 200,
            },
            durationInFrames: 25,
            durationRestThreshold: 0.01,
          })}
        />

        <TransitionSeries.Sequence
          durationInFrames={calculateDurationInFrames(
            inputData["articleDuration"],
            inputData["article"].length,
            fps
          )}
        >
          <Frame article={inputData["article"]} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
