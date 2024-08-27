import { ArticleProvider } from "@/context/ArticleProvider";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article to video",
  description: "A website to turn articles into videos",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-primary font-poppins custom-scrollbar">
        <Navbar />
        <main className="px-2 h-full">
          <ArticleProvider>
            <div className="bg-secondary w-full rounded-xl">{children}</div>
          </ArticleProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
