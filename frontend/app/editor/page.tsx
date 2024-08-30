"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { Video } from "../../remotion/Video";
import {
  CompositionProps,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { z } from "zod";
import { RenderControls } from "../../components/RenderControls";
import Editor from "@/components/Editor";
import { useArticle } from "@/context/ArticleProvider";

const Home: NextPage = () => {
  const { articles } = useArticle();

  const [text, setText] = useState<string>(articles[0].title);

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: articles[0].title,
      article: articles[0].article,
      articleDuration: articles[0].articleDuration,
    };
  }, [text]);

  console.log(inputProps);

  return (
    <div className="w-full h-full p-14">
      <div className="w-full flex flex-col items-center lg:flex-row lg:items-start space-x-12 h-full mb-10">
        <section className="w-1/2">
          <div className="rounded-xl relative">
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 opacity-40 blur"></div>
            <Player
              component={Video}
              inputProps={inputProps}
              durationInFrames={(inputProps.articleDuration + 20) * 30}
              fps={VIDEO_FPS}
              compositionHeight={VIDEO_HEIGHT}
              compositionWidth={VIDEO_WIDTH}
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "5 10 10px rgba(0, 0, 0, 0.2)",
              }}
              controls
            />
          </div>
          <div className="pt-10">
            <RenderControls
              text={text}
              setText={setText}
              inputProps={inputProps}
            ></RenderControls>
          </div>
        </section>
        <section className="w-1/2">
          <Editor articleData={articles[0]} />
        </section>
      </div>
    </div>
  );
};

export default Home;
