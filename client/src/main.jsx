import React from 'react'
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.js"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import Landing from "./Landing/Landing.jsx";
import Game from "./Game/components/Game.jsx";
import { Login } from './pages/login'
import { Register } from "./pages/register";
import './index.css'
import {Paths} from "../paths.js";

const router = createBrowserRouter([
    { name: "Home", path: Paths.home, element: <Landing /> },
    { name: "Game", path: Paths.game, element: <Game /> },
    { name: "Login", path: Paths.login, element: <Login /> },
    { name: "Register", path: Paths.register, element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
