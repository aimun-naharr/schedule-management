import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import PrivateRoute from "./privateroutes/PrivateRoute.jsx";
import AdminRoute from "./privateroutes/AdminRoute.jsx";
import TeacherRoute from "./privateroutes/TeacherRoute.jsx";
import ReactCalender from "./pages/ReactCalender.jsx";
import Admin from "./pages/Admin.jsx";
import Teacher from "./pages/Teacher.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <ReactCalender /> },
      {
        path: "admin",
        element: (
          <AdminRoute>
            {" "}
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: "my-classes",
        element: (
          <TeacherRoute>
            <Teacher />
          </TeacherRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  // {
  //   path: "register",
  //   element: <Register />,
  // },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
