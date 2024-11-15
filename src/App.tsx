import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layouts/App-Layout";
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import Favorites from "./Pages/Favorites";
import Search from "./Pages/Search";
import SingleGif from "./Pages/SingleGif";
import { UseGifProvider } from "./context/GifContext";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:category",
          element: <Category />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/search/:query",
          element: <Search />,
        },
        {
          path: "/:type/:slug",
          element: <SingleGif />,
        },
      ],
    },
  ]);
  return (
    <>
      <UseGifProvider>
        <RouterProvider router={router} />
      </UseGifProvider>
    </>
  );
}

export default App;
