import { spring } from "remotion";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "./components/Background";
import { Subtitle } from "./components/Subtitle";
import { extractData } from "./utils/extractData";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
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
  console.log(data);

  const { durationInFrames, fps } = useVideoConfig();

  // Animate from 0 to 1 after 25 frames
  const logoTranslationProgress = spring({
    frame: frame - 25,
    fps,
    config: {
      damping: 100,
    },
  });

  // Move the logo up by 150 pixels once the transition starts
  const logoTranslation = interpolate(
    logoTranslationProgress,
    [0, 1],
    [0, -300]
  );

  // Fade out the animation at the end
  const opacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <>
      {isFetching ? (
        <AbsoluteFill style={{ backgroundColor: "white" }}>
          <Loading />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{ backgroundColor: "white" }}>
          <AbsoluteFill style={{ opacity }}>
            {/* Sequences can shift the time for its children! */}
            {data.map((item: any, index: number) => (
              <Sequence key={index} from={index * 200} durationInFrames={200}>
                <AbsoluteFill
                  style={{ transform: `translateY(${logoTranslation}px)` }}
                >
                  <Background backgroundImage={item.image} />
                </AbsoluteFill>
                <Subtitle subtitleText={item.text} />
              </Sequence>
            ))}
          </AbsoluteFill>
        </AbsoluteFill>
      )}
    </>
  );
};
