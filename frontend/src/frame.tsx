import { spring } from "remotion";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Logo } from "./components/Logo";
import { Subtitle } from "./components/Subtitle";
import { extractData } from "./utils/extractData";
import { useEffect, useState } from "react";

export const Frame: React.FC = () => {
  const frame = useCurrentFrame();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    extractData().then((data: any) => {
      setData(data);
    });
  }, []);
  console.log(data);

  const { durationInFrames, fps } = useVideoConfig();

  // Animate from 0 to 1 after 25 frames
  const logoTranslationProgress = spring({
    frame: frame - 25,
    fps,
    config: {
      damping: 100,
    },
  });

  // Move the logo up by 150 pixels once the transition starts
  const logoTranslation = interpolate(
    logoTranslationProgress,
    [0, 1],
    [0, -300]
  );

  // Fade out the animation at the end
  const opacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const text =
    "Vivre une période canicule quand on est en vacances, c'est une chose. Mais la subir alors qu'on doit travailler, ça en est une autre. Pour toutes celles qui doivent cumuler bureau et chaleurs extrêmes, la question du look à arborer face à de telles températures est sans doute survenue à plusieurs reprises. Comment rester chic et bien habillée même quand le thermomètre affiche 30+ degrés ? La réponse prend la forme d'une petite robe courte en lin repérée dans la nouvelle collection &Other Stories.";

  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <AbsoluteFill style={{ opacity }}>
        <AbsoluteFill style={{ transform: `translateY(${logoTranslation}px)` }}>
          <Logo />
        </AbsoluteFill>
        {/* Sequences can shift the time for its children! */}
        <Sequence from={35}>
          <Subtitle subtitleText={text} />
        </Sequence>
        <Sequence from={700}>
          <Subtitle subtitleText={text} />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
