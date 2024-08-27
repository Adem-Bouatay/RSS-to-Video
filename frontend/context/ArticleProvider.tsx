"use client";
import React, { createContext, useState } from "react";
import { Article } from "@/types/schema";

interface ArticleContextValue {
  articles: Article[];
  addArticle: (article: Article) => void;
}

const initialContextValue: ArticleContextValue = {
  articles: [],
  addArticle: () => {},
};

const ArticleContext = createContext<ArticleContextValue>(initialContextValue);

export const useArticle = () => {
  const context = React.useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within an ArticleProvider");
  }
  return context;
};

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);

  const addArticle = (article: Article) => {
    setArticles((prevArticles) => [...prevArticles, article]);
  };

  const contextValue: ArticleContextValue = {
    articles,
    addArticle,
  };

  return (
    <ArticleContext.Provider value={contextValue}>
      {children}
    </ArticleContext.Provider>
  );
};
