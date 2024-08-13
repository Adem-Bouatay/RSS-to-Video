import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  fontFamily: FONT_FAMILY,
  color: "#000000",
};

const iconStyle: React.CSSProperties = {
  width: 50,
  height: 50,
  backgroundColor: "#000000", // Replace with your icon or color
  borderRadius: 10,
};

const loadingTextStyle: React.CSSProperties = {
  marginTop: 20,
  fontWeight: "bold",
  fontSize: 30,
  textAlign: "center",
};

export const Loading: React.FC = () => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  // Bounce animation for the icon
  const translateY = spring({
    fps: videoConfig.fps,
    frame,
    config: {
      damping: 10,
      stiffness: 100,
    },
    from: 0,
    to: -20,
  });

  return (
    <div style={containerStyle}>
      <div
        style={{
          ...iconStyle,
          transform: `translateY(${translateY}px)`,
        }}
      />
      <div style={loadingTextStyle}>Loading...</div>
    </div>
  );
};
