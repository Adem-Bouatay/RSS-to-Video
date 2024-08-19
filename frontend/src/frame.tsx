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
import { extractData } from "./utils/extractData";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import { donut } from "./presentations/CirclePresentation";

export const Frame: React.FC = () => {
  const frame = useCurrentFrame();
  const [data, setData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    extractData().then((data: any) => {
      setData(data);
      setIsFetching(false);
    });
  }, []);

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
      {isFetching ? (
        <AbsoluteFill style={{ backgroundColor: "white" }}>
          <Loading />
        </AbsoluteFill>
      ) : (
        <TransitionSeries
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, #c7007e, #ffd000)",
          }}
        >
          {data.map((item: any, index: number) => {
            return (
              <>
                <>
                  {index !== 0 && (
                    <>
                      <TransitionSeries.Sequence
                        key={`transition-${index}`}
                        durationInFrames={40}
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
                          durationInFrames: 40,
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
              </>
            );
          })}
        </TransitionSeries>
      )}
    </>
  );
};
