"use client";

import type { NextPage } from "next";
import React, { useRef, useState } from "react";
import { convertURL, getConvertProgress } from "@/app/api/convert";
import { useArticle } from "@/context/ArticleProvider";
import { useRouter } from "next/navigation";
import GenerateProgress from "@/components/GenerateProgress";

const Home: NextPage = () => {
  const router = useRouter();
  const url = useRef<string>("");
  const [state, setState] = useState<string>("initial");
  const [progress, setProgress] = useState(0);
  const { addArticle } = useArticle();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = await convertURL(url.current);
    const taskId = task.task_id;
    let status = task.status;
    setState("generating");
    while (status !== "completed") {
      const progress = await getConvertProgress(taskId);
      setProgress(progress.progress);
      status = progress.status;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (status === "completed") {
      const data = await getConvertProgress(taskId);
      addArticle(data);
      router.push("/editor");
    }
  };

  return (
    <>
      <div className="py-20 px-5 md:px-16 flex flex-col items-center space-y-20">
        {state === "initial" ? (
          <section className="bg-primary w-full md:w-[85%] lg:w-[75%]  h-full space-y-14 flex flex-col items-center font-semibold p-14 rounded-xl text-secondary">
            <h1 className="text-xl">Convertir Article en Video</h1>
            <form
              className="w-[65%] border-b-4 border-black flex justify-center h-10 rounded-xl"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex">
                <input
                  type="text"
                  id="url"
                  onChange={(e) => (url.current = e.target.value)}
                  className="h-full w-1/2 grow rounded-s-xl px-5 text-primary placeholder:text-gray-400"
                  placeholder="Placez le lien de l'article ici"
                />
                <button className="bg-orange-600 h-full w-fit px-2 rounded-e-xl hover:bg-sky-500 active:scale-[97%] duration-150">
                  Convertir
                </button>
              </div>
            </form>
            <p className="font-normal text-gray-300 w-3/4 text-center">
              Convertissez vos articles en vidéos en un clic. Il suffit de
              copier le lien de l'article et de cliquer sur convertir. C'est
              aussi simple que ça. Essayez maintenant!
            </p>
          </section>
        ) : (
          <GenerateProgress progress={progress} />
        )}
        <section className="w-full flex flex-wrap text-primary justify-between px-24">
          <div className="w-80">
            <h3 className="text-lg font-bold pb-2">Copier et Coller</h3>
            <p className="pb-5 text-justify">
              Il vous suffit de copier et coller le lien de l'article, et notre
              convertisseur s'occupera du reste, transformant votre texte en une
              vidéo professionnelle en un rien de temps.
            </p>

            <h3 className="text-lg font-bold pb-2">
              Support pour Tous les Appareils
            </h3>
            <p className="text-justify">
              Notre service est compatible avec tous les appareils, assurant une
              expérience fluide, que vous utilisiez un smartphone, une tablette
              ou un ordinateur.
            </p>
          </div>

          <div className="w-80">
            <h3 className="text-lg font-bold pb-2">
              Transformez Vos Articles en Vidéos avec l'IA
            </h3>
            <p className="pb-5 text-justify">
              Transformez vos articles en vidéos captivantes avec notre IA, qui
              génère une narration fluide et des visuels attrayants en un rien
              de temps.
            </p>

            <h3 className="text-lg font-bold pb-2">Création Simplifiée</h3>
            <p className="text-justify">
              Simplifiez la création de vidéos professionnelles avec notre
              technologie IA. En quelques clics, obtenez des vidéos de haute
              qualité prêtes à engager votre audience.
            </p>
          </div>

          <div className="w-80">
            <h3 className="text-lg font-bold pb-2">Des Vidéos de Qualité</h3>
            <p className="pb-5 text-justify">
              Nos outils vous permettent de créer des vidéos de qualité, en
              transformant facilement vos articles en contenu visuel attrayant.
            </p>

            <h3 className="text-lg font-bold pb-2">Facilité d'Utilisation</h3>
            <p className="text-justify">
              Profitez d'une interface simple et intuitive pour convertir vos
              articles en vidéos, avec un processus rapide et sans effort.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
