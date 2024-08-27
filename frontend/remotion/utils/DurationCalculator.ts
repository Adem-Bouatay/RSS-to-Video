// calculateDuration.ts

// Utility function to calculate duration in frames based on text length
export const calculateDurationInFrames = (
  text: string,
  fps: number
): number => {
  const wordsPerSecond = 2.5; // Adjust this value based on desired speed
  const wordCount = text.split(" ").length;
  const durationInSeconds = wordCount / wordsPerSecond;
  return Math.ceil(durationInSeconds * fps);
};
