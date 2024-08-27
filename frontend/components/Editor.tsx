import { Article } from "@/types/schema";
import React from "react";

const Editor: React.FC<{ articleData: Article }> = ({ articleData }) => {
  if (!articleData) {
    return <></>;
  }
  const subParagraphs: string[] = [];
  articleData.article.forEach((paragraph) => {
    const text = paragraph.text;
    text.map((line: any) => {
      subParagraphs.push(line.text);
    });
  });

  return (
    <>
      <div className="w-full h-full flex flex-col space-y-5 bg-secondary rounded-xl">
        <h1 className="text-2xl font-semibold text-primary">Éditeur :</h1>
        <span>
          <p className="text-lg text-amber-600">Titre de la vidéo</p>
          <input
            type="text"
            className="w-full h-10 p-2 mt-2 shadow-md border-primary rounded-xl"
            value={articleData.title}
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
                >
                  {text}
                </textarea>
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
              defaultChecked
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
                defaultChecked
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
                className="hidden peer/star "
              />
              <label
                htmlFor="star"
                className="h-full flex-shrink-0 w-20 text-center p-2 border border-primary rounded-xl peer-checked/star:bg-gradient-to-r from-rose-500 to-yellow-500 duration-200 peer-checked/star:text-white"
              >
                Star
              </label>

              <input
                id="fade"
                name="transition"
                type="radio"
                className="hidden peer/fade"
              />
              <label
                htmlFor="fade"
                className="h-full flex-shrink-0 w-20 text-center p-2 border border-primary rounded-xl peer-checked/fade:bg-gradient-to-r from-rose-500 to-yellow-500 duration-200 peer-checked/fade:text-white"
              >
                Fade
              </label>
            </div>
          </div>
        </span>
      </div>
    </>
  );
};

export default Editor;
