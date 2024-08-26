import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { Background } from "./components/Background";
import { Subtitles } from "./components/Subtitles";
import { donut } from "./presentations/CirclePresentation";

export const Frame: React.FC<{ article: any }> = ({ article }) => {
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
        {article.map((item: any, index: number) => {
          return (
            <>
              {index !== 0 && (
                <>
                  <TransitionSeries.Sequence
                    key={`transition-${index}`}
                    durationInFrames={25}
                  >
                    <AbsoluteFill
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom right, #c7007e, #ffd000)",
                        width: "100%",
                        height: "100%",
                      }}
                    ></AbsoluteFill>
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
                      durationInFrames: 20,
                      durationRestThreshold: 0.01,
                    })}
                  />
                </>
              )}
              <TransitionSeries.Sequence
                key={`sequence-${index}`}
                durationInFrames={item.totalDuration * 30}
              >
                <AbsoluteFill style={{ opacity }}>
                  <Sequence durationInFrames={item.totalDuration * 30}>
                    <Background backgroundImage={item.image} />
                    <Subtitles subtitles={item.text} />
                  </Sequence>
                </AbsoluteFill>
              </TransitionSeries.Sequence>
            </>
          );
        })}
      </TransitionSeries>
    </>
  );
};
