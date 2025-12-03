import "./App.css";
import Dashboard from "./routes/Dashboard";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Workflows from "./routes/Workflows";
import Settings from "./routes/Settings";

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
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
