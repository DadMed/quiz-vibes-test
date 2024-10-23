import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { action as registerAction } from "./pages/Register/RegisterPage";
import { action as loginAction } from "./pages/Login/LoginPage";
import RootLayout from "./layout/RootLayout";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";

// Import LandingPage
import { LoginPage, Question, RegisterPage, NotFound, SingleQuestion, RequireAuth, RequireLogout, Success, Landingpage } from "./pages";

// Define the router with LandingPage as the default route
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      {/* Set LandingPage as the default route */}
      <Route index element={<Landingpage />} />

      {/* User needs to logout to access these routes */}
      <Route element={<RequireLogout />}>
        <Route path="login" element={<LoginPage />} action={loginAction} />
        <Route path="register" element={<RegisterPage />} action={registerAction} />
      </Route>

      {/* User needs to login to access these routes */}
      <Route element={<RequireAuth />}>
        <Route path="quiz" element={<App />} /> {/* You can move App to another route like /quiz */}
        <Route path="question" element={<Question />} />
        <Route path="question/:id" element={<SingleQuestion />} />
        <Route path="finish" element={<Success />} />
      </Route>
    </Route>
  )
);

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
