import { Img, useCurrentFrame } from "remotion";

export const Background: React.FC<{ backgroundImage: string }> = ({
  backgroundImage,
}) => {
  const frame = useCurrentFrame();

  const scale = Math.min(1.3, frame / 700 + 1);

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
      src={backgroundImage}
    />
  );
};
