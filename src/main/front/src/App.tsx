import { useEffect } from "react";
import "./App.css";
import { useReissue } from "./hooks/useAuth";
import RootRoute from "./RootRoute";

function App() {
  const { mutate: refreshLogin, isPending } = useReissue();

  useEffect(() => {
    const check = window.location.pathname === "/login";

    if (!check) {
      refreshLogin();
    }
  }, []);

  if (isPending) return <div className="loading"></div>;

  return <RootRoute />;
}

export default App;
