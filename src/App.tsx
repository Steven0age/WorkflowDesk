import "./App.css";
import Dashboard from "./routes/Dashboard";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Workflows from "./routes/Workflows";
import Settings from "./routes/Settings";
import Create from "./routes/Workflows/Create";
import FullscreenLayout from "./routes/FullscreenLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "workflows",
          element: <Workflows />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "/",
      element: <FullscreenLayout />,
      children: [
        {
          path: "workflows/create",
          element: <Create />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
