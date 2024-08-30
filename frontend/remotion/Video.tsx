import {
  interpolate,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
} from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { donut } from "./presentations/CirclePresentation";
import { Frame } from "./frame";
import { StartTitle } from "./components/StartTitle";
import { publicFolderPath } from "./utils/extractData";
import { CompositionProps } from "@/types/constants";
import { z } from "zod";

export const Video = (inputData: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

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
          presentation={donut({
            width: 1920,
            height: 1080,
          })}
          timing={springTiming({
            config: {
              damping: 200,
            },
            durationInFrames: 25,
            durationRestThreshold: 0.01,
          })}
        />

        <TransitionSeries.Sequence
          durationInFrames={inputData["articleDuration"] * 95}
        >
          <Frame article={inputData["article"]} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Audio src={`${publicFolderPath}/BackgroundMusic.mp3`} />
    </>
  );
};
