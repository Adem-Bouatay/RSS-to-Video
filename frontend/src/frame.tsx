import { spring } from "remotion";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { clockWipe } from "@remotion/transitions/clock-wipe";

import { Background } from "./components/Background";
import { Subtitle } from "./components/Subtitle";
import { extractData } from "./utils/extractData";
import { useEffect, useState } from "react";

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

  const { durationInFrames, fps } = useVideoConfig();

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
        <div>Loading...</div>
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
                <TransitionSeries.Sequence key={index} durationInFrames={30}>
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
                  presentation={clockWipe({ width: 1920, height: 1080 })}
                  timing={springTiming({
                    config: {
                      damping: 200,
                    },
                    durationInFrames: 30,
                    durationRestThreshold: 0.01,
                  })}
                />
                <TransitionSeries.Sequence key={index} durationInFrames={200}>
                  <AbsoluteFill style={{ opacity }}>
                    <Sequence from={0} durationInFrames={200}>
                      <Background backgroundImage={item.image} />
                      <Subtitle subtitleText={item.text} />
                    </Sequence>
                  </AbsoluteFill>
                </TransitionSeries.Sequence>
              </>
            );
          })}
        </TransitionSeries>
      )}
    </>
  );
};
