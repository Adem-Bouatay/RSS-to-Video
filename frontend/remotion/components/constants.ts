import { z } from "zod";
export const FONT_FAMILY = "SF Pro Text, Helvetica, Arial, sans-serif";

export const CompositionProps = z.object({
  title: z.string(),
  article: z.array(
    z.object({
      text: z.array(
        z.object({
          text: z.string(), // The text content
          duration: z.number(), // The duration of this text
          audio: z.string().url(), // A URL to an audio file
        })
      ),
      image: z.string().url(), // A URL to an image
      totalDuration: z.number(), // The total duration for this article item
    })
  ),
  articleDuration: z.number(), // The total duration for the entire article
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "test",
  article: [
    {
      text: [
        {
          text: "lorem epsom",
          duration: 5,
          audio:
            "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        },
      ],
      image:
        "https://static.wikia.nocookie.net/aesthetics/images/d/d0/Yellow.jpeg/revision/latest?cb=20201102102140",
      totalDuration: 5,
    },
  ],
  articleDuration: 10,
};
