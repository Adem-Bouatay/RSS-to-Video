import { z } from "zod";
import { CompositionProps } from "./constants";

export const convertRequest = z.object({
  url: z.string().url(),
});

export const RenderRequest = z.object({
  id: z.string(),
  inputProps: CompositionProps,
});

export const ProgressRequest = z.object({
  bucketName: z.string(),
  id: z.string(),
});

export type ConvertState =
  | {
      errors?: {
        url?: string[];
      };
      message?: string;
    }
  | undefined;

export type ProgressResponse =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "progress";
      progress: number;
    }
  | {
      type: "done";
      url: string;
      size: number;
    };

export interface Article {
  title: string;
  article: Array<any>;
  articleDuration: number;
}
