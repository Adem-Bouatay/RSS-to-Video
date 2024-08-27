import React, { useState } from "react";
import { Img, useVideoConfig, useCurrentFrame } from "remotion";

export const Background: React.FC<{ backgroundImage: string }> = ({
  backgroundImage,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const [imgSrc, setImgSrc] = useState(backgroundImage);
  const fallbackBackground =
    "https://media.istockphoto.com/id/1302642699/vector/abstract-red-vector-background-with-stripes-can-be-used-for-cover-design-poster-and.jpg?s=612x612&w=0&k=20&c=3cQPZx57nAV0f1evtuRk9p2EgmAVGb_A063Htb2_Gtw=";

  // this animation zooms the image in at the first half and out at the second half
  const animation = (frame: number) => {
    if (durationInFrames > 300)
      if (frame < durationInFrames / 2) {
        return Math.min(1.3, frame / (durationInFrames / 0.3) + 1);
      } else {
        return Math.max(1, 1.3 - frame / (durationInFrames / 0.3));
      }
    else return Math.min(1.3, frame / (durationInFrames / 0.3) + 1);
  };

  const scale = animation(frame);

  const handleError = () => {
    setImgSrc(fallbackBackground); // Use fallback image if the main image fails to load
  };

  return (
    <Img
      style={{
        height: "100%",
        position: "absolute",
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        width: "auto",
        transform: `scale(${scale})`,
      }}
      src={imgSrc}
      onError={handleError} // Fallback if image fails to load
      alt="Background"
    />
  );
};
