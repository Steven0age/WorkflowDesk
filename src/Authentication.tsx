import { useEffect, useState } from "react";
import { Auth } from "./components/Auth";
import { supabase } from "./supabase-client";
import Dashboard from "./routes/Dashboard";
import Root from "./routes/Root";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Workflows from "./routes/Workflows";
import Settings from "./routes/Settings";
import EditorSettings from "./routes/Workflows/Editor/EditorSettings";
import EditorLayout from "./routes/EditorLayout";
import FormEditor from "./routes/Workflows/Editor/FormEditor";
import PhasesEditor from "./routes/Workflows/Editor/PhasesEditor";
import { useApp } from "./context/AppContext";

export function Authentication() {
  const [session, setSession] = useState<any>(null);

  const { setUserRole, setOrganizationId } = useApp();

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Root />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "workflows", element: <Workflows /> },
          { path: "settings", element: <Settings /> },
        ],
      },

      {
        path: "/workflows/editor",
        element: <EditorLayout />,
        children: [
          { index: true, element: <Navigate to="new" replace /> },

          {
            path: "new",
            children: [
              { index: true, element: <EditorSettings /> },
              { path: "form", element: <FormEditor /> },
              { path: "phases", element: <PhasesEditor /> },
            ],
          },

          {
            path: ":workflowId",
            children: [
              { index: true, element: <EditorSettings /> },
              { path: "form", element: <FormEditor /> },
              { path: "phases", element: <PhasesEditor /> },
            ],
          },
        ],
      },
    ],
    {
      basename: import.meta.env.BASE_URL,
    },
  );

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log("currentSession:", currentSession);
    if (currentSession.error) {
      console.error("fetchSession error:", currentSession.error);
      return;
    }
    console.log("setSession(currentSession.data.session); ausgeführt");
    setSession(currentSession.data.session);
  };

  const fetchMembershipData = async (userId: string) => {
    const { data, error } = await supabase
      .from("organization_members")
      .select("organization_id, role")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("fetchMembershipData error:", error);
      setOrganizationId(null);
      setUserRole(null);
      throw error;
    }

    setOrganizationId(data?.organization_id ?? null);
    setUserRole(data?.role ?? null);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetchMembershipData(session.user.id);
  }, [session]);

  return <>{session ? <RouterProvider router={router} /> : <Auth />}</>;
}
