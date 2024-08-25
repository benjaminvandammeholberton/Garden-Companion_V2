import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactNode } from "react";

import "./index.css";

import Dashboard from "./pages/Dashboard";
// import Guide from "./pages/Guide";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import useAuth from "./hooks/useAuth";
// import Network from "./pages/Network";
// import Tools from "./pages/Tools";
// import Seeds from "./pages/Seeds";
import Layout from "./pages/Layout";
import Auth from "./pages/Auth";
// import MySpace from "./pages/MySpace";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./contexts/theme-provider";

interface ProtectedRouteProps {
  element: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [user] = useAuth();
  if (user) {
    return element;
  }
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      element: <Layout />,
      children: [
        {
          path: "me/dashboard",
          element: <ProtectedRoute element={<Dashboard />} />,
        },
        // {
        //   path: "me/seeds",
        //   element: <ProtectedRoute element={<Seeds />} />,
        // },
        // {
        //   path: "me/myspace",
        //   element: <ProtectedRoute element={<MySpace />} />,
        // },

        // {
        //   path: "me/guide",
        //   element: <ProtectedRoute element={<Guide />} />,
        // },
        // {
        //   path: "me/tools",
        //   element: <ProtectedRoute element={<Tools />} />,
        // },
        // {
        //   path: "/network",
        //   element: <ProtectedRoute element={<Network />} />,
        // },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
