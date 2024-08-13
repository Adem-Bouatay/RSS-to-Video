import {
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Logo: React.FC = () => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const development = spring({
    config: {
      damping: 100,
      mass: 0.5,
    },
    fps: videoConfig.fps,
    frame,
  });

  const rotationDevelopment = spring({
    config: {
      damping: 100,
      mass: 0.5,
    },
    fps: videoConfig.fps,
    frame,
  });

  const scale = spring({
    frame,
    config: {
      mass: 0.5,
    },
    fps: videoConfig.fps,
  });

  const logoRotation = interpolate(
    frame,
    [0, videoConfig.durationInFrames],
    [0, 360]
  );

  return (
    <Img
      style={{ height: "100%", width: "auto" }}
      src="https://cache.cosmopolitan.fr/data/photo/w1000_ci/6v/robe-quand-il-fait-chaud-travail.jpg"
    />
  );
};
