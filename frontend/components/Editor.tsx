import { CompositionProps } from "@/types/constants";
import { z } from "zod";
import React, { useState, useEffect } from "react";

const Editor: React.FC<{
  articleData: z.infer<typeof CompositionProps>;
  setInputProps: React.Dispatch<
    React.SetStateAction<z.infer<typeof CompositionProps>>
  >;
}> = ({ articleData, setInputProps }) => {
  const [title, setTitle] = useState(articleData.title);
  const [subParagraphs, setSubParagraphs] = useState<string[]>([]);
  const [voice, setVoice] = useState("homme");
  const [transitionType, setTransitionType] = useState("circle");

  useEffect(() => {
    const paragraphs: string[] = [];
    articleData.article.forEach((paragraph) => {
      paragraph.text.forEach((line) => {
        paragraphs.push(line.text);
      });
    });
    setSubParagraphs(paragraphs);
  }, [articleData]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    articleData.title = e.target.value;
  };

  const handleSubParagraphChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newSubParagraphs = [...subParagraphs];
    newSubParagraphs[index] = e.target.value;
    setSubParagraphs(newSubParagraphs);
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoice(e.target.id);
  };

  const handleTransitionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransitionType(e.target.id);
    articleData.transitionType = e.target.id;
  };

  const handleSubmit = () => {
    const updatedArticleData = {
      ...articleData,
      title,
      transitionType,
    };
    setInputProps(updatedArticleData);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col space-y-5 bg-secondary rounded-xl">
        <h1 className="text-2xl font-semibold text-primary">Éditeur :</h1>
        <span>
          <p className="text-lg text-amber-600">Titre de la vidéo</p>
          <input
            type="text"
            className="w-full h-10 p-2 mt-2 shadow-md border-primary rounded-xl"
            value={title}
            onChange={handleTitleChange}
          />
        </span>
        <span>
          <p className="text-lg text-amber-600">Contenu de l'article</p>
          <div className="w-full h-52 p-2 bg-white shadow-md border-primary rounded-xl mt-4">
            <div className="w-full h-full flex font-medium text-primary p-2 space-x-4 overflow-x-scroll custom-scrollbar-primary">
              {subParagraphs.map((text, index) => (
                <textarea
                  key={index}
                  className="h-full flex-shrink-0 w-96 p-2 overflow-y-scroll custom-scrollbar-primary resize-none border border-primary rounded-xl"
                  value={text}
                  onChange={(e) => handleSubParagraphChange(index, e)}
                />
              ))}
            </div>
          </div>
        </span>
        <span>
          <p className="text-lg text-amber-600">Contenu vocal</p>
          <div className="flex items-center space-x-2 text-lg font-medium text-primary py-2">
            <input
              className="accent-primary peer/homme"
              id="homme"
              name="voice"
              type="radio"
              checked={voice === "homme"}
              onChange={handleVoiceChange}
            />
            <label
              htmlFor="homme"
              className="pe-8 text-gray-500 peer-checked/homme:text-primary"
            >
              Homme
            </label>
            <input
              className="accent-primary peer/femme"
              id="femme"
              name="voice"
              type="radio"
              checked={voice === "femme"}
              onChange={handleVoiceChange}
            />
            <label
              htmlFor="femme"
              className="text-gray-500 peer-checked/femme:text-primary"
            >
              Femme
            </label>
          </div>
        </span>
        <span>
          <p className="text-lg text-amber-600">Transitions</p>
          <div className="w-full h-20 p-2 bg-white shadow-md border-primary rounded-xl mt-4">
            <div className="w-full h-full flex font-medium text-primary p-2 space-x-4 overflow-x-scroll custom-scrollbar-primary">
              <input
                id="circle"
                name="transition"
                type="radio"
                className="hidden peer/circle"
                checked={transitionType === "circle"}
                onChange={handleTransitionChange}
              />
              <label
                htmlFor="circle"
                className="h-full flex-shrink-0 w-20 text-center p-2 border border-primary rounded-xl peer-checked/circle:bg-gradient-to-r from-rose-500 to-yellow-500 duration-200 peer-checked/circle:text-white"
              >
                Circle
              </label>

              <input
                id="star"
                name="transition"
                type="radio"
                className="hidden peer/star"
                checked={transitionType === "star"}
                onChange={handleTransitionChange}
              />
              <label
                htmlFor="star"
                className="h-full flex-shrink-0 w-20 text-center p-2 border border-primary rounded-xl peer-checked/star:bg-gradient-to-r from-rose-500 to-yellow-500 duration-200 peer-checked/star:text-white"
              >
                Star
              </label>
            </div>
          </div>
        </span>
        <button
          className="w-full h-10 bg-primary text-white rounded-xl shadow-md"
          onClick={handleSubmit}
        >
          Mettre a jour la vidéo
        </button>
      </div>
    </>
  );
};

export default Editor;
