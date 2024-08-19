import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PetitFormalScript";

const { fontFamily } = loadFont();

export const StartTitle = ({ title }: { title: string }) => {
  const characters = title.split("");
  console.log(characters);
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundImage: "linear-gradient(to bottom right, #c7007e, #ffd000)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      {characters.map((letter, i) => {
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
            key={i}
            style={{
              fontFamily,
              fontWeight: "bold",
              fontSize: "180px",
              transform: `scale(${scale})`,
            }}
          >
            {letter}
          </span>
        );
      })}
    </AbsoluteFill>
  );
};
