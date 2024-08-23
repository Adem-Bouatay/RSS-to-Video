import React from "react";
import { spring, Audio, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { FONT_FAMILY } from "./constants";

const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "end",
  width: "100%",
  paddingBottom: 80,
  justifyContent: "center",
};
const textStyle: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  padding: 40,
  backgroundColor: "rgba(0,0,0,.9)",
  border: "1px solid #fff",
  width: "95%",
  fontWeight: "bold",
  fontSize: 40,
  display: "block",
  flexWrap: "wrap",
  alignItems: "center",
  textAlign: "left",
  textJustify: "inter-word",
};

const word: React.CSSProperties = {
  marginLeft: 10,
  marginRight: 10,
  display: "inline-block",
};

export const Subtitles: React.FC<{
  subtitles: any;
}> = ({ subtitles }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const textToWords = (text: string) => {
    return text.split(" ");
  };

  return (
    <TransitionSeries>
      {subtitles.map((subItem: any, subIndex: number) => (
        <TransitionSeries.Sequence
          key={`sub-sequence-${subIndex}`}
          durationInFrames={subItem.duration * 30 + 30}
          style={container}
        >
          <h1 style={textStyle}>
            {textToWords(subItem.text).map((_word: String, i: number) => {
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
                    opacity: scale,
                  }}
                >
                  {_word}
                </span>
              );
            })}
          </h1>
          {/*subItem.audio && <Audio src={`${subItem.audio}`} />*/}
        </TransitionSeries.Sequence>
      ))}
    </TransitionSeries>
  );
};
