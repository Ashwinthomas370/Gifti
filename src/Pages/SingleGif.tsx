import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGifContext } from "../context/GifContext";
import Gif from "../components/Gif";

const SingleGif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState<any>({});
  const [relatedGifs, setRelatedGifs] = useState<any>([]);
  const { gf } = useGifContext();

  const fetchSingleGif = async () => {
    const gifId = slug?.split("-");
    if (gifId) {
      const { data } = await gf.gif(gifId[gifId?.length - 1]);
      const { data: related } = await gf.related(gifId[gifId.length - 1], {
        limit: 10,
      });
      setGif(data);
      setRelatedGifs(related);
    }
  };

  useEffect(() => {
    fetchSingleGif();
  }, [type, slug]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-full max-w-md overflow-hidden rounded-lg">
            <img
              src={gif?.images?.fixed_width.url || gif?.images?.original.url}
              alt={gif?.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {gif?.title || "Untitled GIF"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              By {gif?.username || "Anonymous"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 px-1">
          More Like This
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {relatedGifs.map((relatedGif: any) => (
            <Gif key={relatedGif.id} gif={relatedGif} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleGif;
