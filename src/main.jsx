import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Make sure you have your styles

import RootLayout from "./layout/RootLayout"; // Import your root layout
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";

// Import your pages
import {
  LoginPage,
  Question,
  RegisterPage,
  NotFound,
  SingleQuestion,
  RequireAuth,
  RequireLogout,
  Success,
  Landingpage,  // Import your LandingPage component
} from "./pages";  // Ensure that this path is correct

// Set up the router configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      {/* Default route is the LandingPage */}
      <Route index element={<Landingpage />} /> 

      {/* Non-authenticated routes */}
      <Route element={<RequireLogout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<RequireAuth />}>
        <Route path="quiz" element={<App />} />  {/* Change App route to /quiz */}
        <Route path="question" element={<Question />} />
        <Route path="question/:id" element={<SingleQuestion />} />
        <Route path="finish" element={<Success />} />
      </Route>
    </Route>
  )
);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
