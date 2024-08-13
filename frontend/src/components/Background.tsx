import React, { useState } from "react";
import {
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Background: React.FC<{ backgroundImage: string }> = ({
  backgroundImage,
}) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const [imgSrc, setImgSrc] = useState(backgroundImage);
  const fallbackBackground =
    "https://media.istockphoto.com/id/1302642699/vector/abstract-red-vector-background-with-stripes-can-be-used-for-cover-design-poster-and.jpg?s=612x612&w=0&k=20&c=3cQPZx57nAV0f1evtuRk9p2EgmAVGb_A063Htb2_Gtw=";

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

  const handleError = () => {
    setImgSrc(fallbackBackground); // Use fallback image if the main image fails to load
  };

  return (
    <Img
      style={{ height: "100%", width: "auto", objectFit: "cover" }}
      src={imgSrc}
      onError={handleError} // Fallback if image fails to load
      alt="Background"
    />
  );
};
