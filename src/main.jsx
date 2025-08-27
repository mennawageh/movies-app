import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home";
import TvShow from "./pages/TvShow";
import ErrorPage from "./pages/ErrorPage";
import Movies from "./pages/Movies";
import TVShowDetails from "./pages/TVShowDetails";
import MoviesDetails from "./pages/MoviesDetails";
import Watchlist from "./pages/WatchList";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element: < Home/>,
      },
      {
        path: "/movies",
        element: < Movies/>,
      },
      {
        path:"/TV",
        element:<TvShow/>

      },{
        path:"/tv/:id" ,
        element:<TVShowDetails />
      },{
        path:"/movies/:id" ,
        element:<MoviesDetails />
      },{
        path:"/watchlist" ,
        element:<Watchlist />
      },
     
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
