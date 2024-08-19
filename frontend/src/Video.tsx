import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { donut } from "./presentations/CirclePresentation";
import { Frame } from "./frame";
import { StartTitle } from "./components/StartTitle";

export const Video: React.FC = () => {
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
        <TransitionSeries.Sequence durationInFrames={100}>
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
            durationInFrames: 40,
            durationRestThreshold: 0.01,
          })}
        />
        <TransitionSeries.Sequence durationInFrames={2880}>
          <Frame />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
