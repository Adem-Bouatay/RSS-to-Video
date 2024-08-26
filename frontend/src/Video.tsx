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
import { extractData, publicFolderPath } from "./utils/extractData";
import { Loading } from "./components/Loading";
import { useEffect, useState } from "react";

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const [data, setData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    extractData().then((data: any) => {
      setData(data);
      setIsFetching(false);
    });
  }, []);

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
        {isFetching ? (
          <TransitionSeries.Sequence durationInFrames={500}>
            <Loading />
          </TransitionSeries.Sequence>
        ) : (
          <TransitionSeries.Sequence
            durationInFrames={data["articleDuration"] * 95}
          >
            <Frame article={data["article"]} />
          </TransitionSeries.Sequence>
        )}
      </TransitionSeries>
      <Audio src={`${publicFolderPath}/BackgroundMusic.mp3`} />
    </>
  );
};
