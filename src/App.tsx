import "./App.css";
import Dashboard from "./routes/Dashboard";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Workflows from "./routes/Workflows";
import Settings from "./routes/Settings";
import EditorSettings from "./routes/Workflows/Editor/EditorSettings";
import EditorLayout from "./routes/EditorLayout";
import FormEditor from "./routes/Workflows/Editor/FormEditor";
import PhasesEditor from "./routes/Workflows/Editor/PhasesEditor";

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
      element: <EditorLayout />,
      children: [
        {
          path: "workflows/editor",
          children: [
            {
              index: true,
              element: <EditorSettings />,
            },
            {
              path: "form",
              element: <FormEditor />,
            },
            {
              path: "phases",
              element: <PhasesEditor />,
            },
          ],
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
