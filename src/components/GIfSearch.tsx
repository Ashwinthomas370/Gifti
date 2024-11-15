import { useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getSearchQuery = async () => {
    if (searchQuery.trim() === "") {
      return;
    }
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className="flex relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search all the GIFs and Stickers"
        className="w-full mb-3 pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
      />

      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6"
        >
          <HiMiniXMark size={22} />
        </button>
      )}
      <button
        onClick={getSearchQuery}
        className="bg-gradient-to-tr mb-3 from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br"
      >
        <HiOutlineMagnifyingGlass size={35} className="-scale-x-100" />
      </button>
    </div>
  );
};

export default GifSearch;
