import { createContext, useContext, useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

type GifContextType = {
  gf: GiphyFetch;
  gifs: any;
  setGifs: React.Dispatch<React.SetStateAction<any>>;
  selectTab: any;
  setSelectTab: React.Dispatch<React.SetStateAction<any>>;
  favorites: any;
  setFavorites: React.Dispatch<React.SetStateAction<any>>;
};

const GifContext = createContext<GifContextType | undefined>(undefined);

export const UseGifProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gifs, setGifs] = useState([]);
  const [selectTab, setSelectTab] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const gf = new GiphyFetch(import.meta.env.VITE_API_KEY);

  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        selectTab,
        setSelectTab,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const useGifContext = () => {
  const context = useContext(GifContext);
  if (!context) {
    throw new Error("useGifContext must be used within a UseGifProvider");
  }
  return context;
};
