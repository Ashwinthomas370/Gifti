import { useEffect, useState } from "react";
import { useGifContext } from "../context/GifContext";
import { useParams } from "react-router-dom";
import Gif from "../components/Gif";

const Category = () => {
  const [searchResults, setSearchResults] = useState<any>([]);

  const { gf } = useGifContext();

  const { category } = useParams();

  const fetchSearchResults = async () => {
    const { data } = await gf.gifs(category as string, category as string);

    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {searchResults.length > 0 && <Gif gif={searchResults[0]} />}
        <span className="text-gray-400 text-sm pt-2">
          Tired of Boring Texts? Spice It Up with GIFs!🥵
        </span>
        {/* <FollowOn /> */}
        <div className="w-full h-0.5 mt-6 bg-gray-800" />
      </div>
      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category?.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>

        {searchResults.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
            {searchResults.slice(1).map((gif: any) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
