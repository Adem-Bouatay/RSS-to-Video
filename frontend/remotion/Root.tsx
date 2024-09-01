import { Composition } from "remotion";
import { Video } from "./Video";
import { calculateDurationInFrames } from "./utils/DurationCalculator";
import { defaultMyCompProps } from "./components/constants";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="test"
        component={Video}
        durationInFrames={calculateDurationInFrames(
          defaultMyCompProps.articleDuration,
          defaultMyCompProps.article.length,
          30
        )}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={defaultMyCompProps}
      />
    </>
  );
};
