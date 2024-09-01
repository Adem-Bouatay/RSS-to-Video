// calculateDuration.ts

// Utility function to calculate duration in frames based on text length
export const calculateDurationInFrames = (
  articleDuration: number,
  nbParagraphs: number,
  fps: number
): number => {
  return articleDuration * fps + nbParagraphs * 5; // 5 equals the duration of the transition between paragraphs 25 - 20
};
