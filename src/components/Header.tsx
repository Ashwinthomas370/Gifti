import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { useGifContext } from "../context/GifContext";
import { ICategory } from "@giphy/js-fetch-api";

const Header = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showCategory, setShowCategory] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { gf } = useGifContext();

  const fetchGifs = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  return (
    <nav className="w-full p-4 shadow-md">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <Link to="/">
          <h1 className="text-2xl font-bold">GIFTI</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {categories.slice(0, 5).map((el, index) => (
            <Link
              key={index}
              to={`/${el.name_encoded}`}
              className="border-b-4 hover:bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-2 rounded-md"
            >
              {el.name}
            </Link>
          ))}
          <CiMenuKebab
            onClick={() => setShowCategory(!showCategory)}
            className="text-2xl cursor-pointer mt-4"
          />
        </div>

        <div className="flex md:hidden">
          {showMobileMenu ? (
            <FaTimes
              onClick={() => setShowMobileMenu(false)}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <FaBars
              onClick={() => setShowMobileMenu(true)}
              className="text-2xl cursor-pointer"
            />
          )}
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden bg-gradient-to-r from-pink-600 to-purple-500 p-4 mt-2 rounded-md shadow-md">
          <div className="flex items-center space-x-2 mb-3">
            <h1 className="text-lg font-semibold">Category</h1>
            <FaChevronRight className="text-sm" />
          </div>

          <ul className="flex flex-col space-y-2">
            {categories.map((el, index) => (
              <>
                <li key={index} className="text-white">
                  <Link
                    to={`/${el.name_encoded}`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {el.name}
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </div>
      )}

      {/* Desktop Category Dropdown */}
      {showCategory && (
        <div className="hidden md:block bg-gradient-to-r from-pink-600 to-purple-500 p-4 mt-2 max-w-4xl mx-auto rounded-md shadow-md">
          <div className="mb-4 border-b-4 border-gradient-to-r from-pink-600 to-purple-500 pb-2">
            <h2 className="text-white text-xl font-bold">Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((el) => (
              <div
                key={el.name}
                className="text-white hover:bg-pink-700 rounded-md p-2 cursor-pointer"
              >
                <Link
                  to={`/${el.name_encoded}`}
                  onClick={() => setShowCategory(false)}
                >
                  {el.name_encoded}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
