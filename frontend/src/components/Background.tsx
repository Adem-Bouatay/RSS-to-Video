import React, { useState } from "react";
import { Img, useCurrentFrame } from "remotion";

export const Background: React.FC<{ backgroundImage: string }> = ({
  backgroundImage,
}) => {
  const frame = useCurrentFrame();

  const [imgSrc, setImgSrc] = useState(backgroundImage);
  const fallbackBackground =
    "https://media.istockphoto.com/id/1302642699/vector/abstract-red-vector-background-with-stripes-can-be-used-for-cover-design-poster-and.jpg?s=612x612&w=0&k=20&c=3cQPZx57nAV0f1evtuRk9p2EgmAVGb_A063Htb2_Gtw=";

  const scale = Math.min(1.3, frame / 700 + 1);

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
