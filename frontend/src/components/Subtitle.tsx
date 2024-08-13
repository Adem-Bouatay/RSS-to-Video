import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";

const title: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontWeight: "bold",
  fontSize: 30,
  textAlign: "center",
  position: "absolute",
  bottom: 50,
  width: "100%",
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
        const delay = i * 5;

        const scale = spring({
          fps: videoConfig.fps,
          frame: frame - delay,
          config: {
            damping: 200,
          },
        });

        return (
          <span
            key={_word}
            style={{
              ...word,
              color: "#000000",
              transform: `scale(${scale})`,
            }}
          >
            {_word}
          </span>
        );
      })}
    </h1>
  );
};
