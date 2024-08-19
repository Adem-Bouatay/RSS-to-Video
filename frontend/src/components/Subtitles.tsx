import React from "react";
import { spring, Audio, useCurrentFrame, useVideoConfig } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { FONT_FAMILY } from "./constants";

const title: React.CSSProperties = {
  position: "absolute",
  left: "0px",
  right: "0px",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#000000",
  border: "0.5px solid #fff",
  bottom: 50,
  height: "17%",
  width: "90%",
};
const textStyle: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontWeight: "bold",
  fontSize: 40,
  textAlign: "justify",
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
    <div style={title}>
      <TransitionSeries>
        {subtitles.map((subItem: any, subIndex: number) => (
          <TransitionSeries.Sequence
            key={`sub-sequence-${subIndex}`}
            durationInFrames={subItem.duration * 30 + 25}
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
            {subItem.audio && <Audio src={subItem.audio} />}
          </TransitionSeries.Sequence>
        ))}
        <TransitionSeries.Transition
          presentation={slide()}
          timing={linearTiming({ durationInFrames: 30 })}
        />
      </TransitionSeries>
    </div>
  );
};
