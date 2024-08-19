import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Audio,
} from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { Background } from "./components/Background";
import { Subtitle } from "./components/Subtitle";
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
                {index !== 0 && (
                  <>
                    <TransitionSeries.Sequence
                      key={index}
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
                  key={index}
                  durationInFrames={(item.duration + 1) * 30}
                >
                  <AbsoluteFill style={{ opacity }}>
                    <Sequence
                      from={0}
                      durationInFrames={(item.duration + 1) * 30}
                    >
                      <Background backgroundImage={item.image} />
                      <Subtitle subtitleText={item.text} />
                      {item.audio && <Audio src={item.audio} />}
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
