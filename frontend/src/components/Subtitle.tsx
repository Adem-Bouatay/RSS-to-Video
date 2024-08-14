import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";

const title: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontWeight: "bold",
  fontSize: 30,
  textAlign: "justify",
  position: "absolute",
  padding: 20,
  left: "0px",
  right: "0px",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "black",
  bottom: 50,
  width: "90%",
};

const word: React.CSSProperties = {
  marginLeft: 10,
  marginRight: 10,
  display: "inline-block",
};

export const Subtitle: React.FC<{
  subtitleText: string;
}> = ({ subtitleText }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const words = subtitleText.split(" ");

  return (
    <h1 style={title}>
      {words.map((_word, i) => {
        const delay = i * 2;

        const scale = spring({
          fps: videoConfig.fps,
          frame: frame - delay,
          config: {
            damping: 100,
          },
        });

        return (
          <span
            key={i}
            style={{
              ...word,
              color: "#fff",
              transform: `opacity(${scale})`,
            }}
          >
            {_word}
          </span>
        );
      })}
    </h1>
  );
};
