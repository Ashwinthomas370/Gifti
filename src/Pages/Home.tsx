import { useEffect } from "react";
import { useGifContext } from "../context/GifContext";
import Gif from "../components/Gif";

const Home = () => {
  const { gf, gifs, setGifs, selectTab } = useGifContext();

  const fetchTrendingGifs = async () => {
    const { data } = await gf.trending({
      type: selectTab,
      limit: 20,
      rating: "g",
    });
    setGifs(data);
  };

  console.log(gifs, "gifsss");

  useEffect(() => {
    fetchTrendingGifs();
  }, [selectTab]);

  return (
    <>
      <img
        src="/src/assests/giphybanner.webp"
        className="mt-2 rounded w-full h-80 mb-2"
      />

      <div className="columns-2  md:columns-3 lg:columns-4 xl:colums-5 gap-2">
        {gifs.map((gif: any) => (
          <Gif gif={gif} />
        ))}
      </div>
    </>
  );
};

export default Home;
