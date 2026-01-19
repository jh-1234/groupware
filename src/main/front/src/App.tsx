import { useEffect } from "react";
import "./App.css";
import { useReissue } from "./hooks/useAuth";
import RootRoute from "./RootRoute";
import ModalProvider from "./provider/ModalProvider";
import { Toaster } from "sonner";

function App() {
  const { mutate: refreshLogin, isPending } = useReissue();

  useEffect(() => {
    const check = window.location.pathname === "/login";

    if (!check) {
      refreshLogin();
    }
  }, []);

  if (isPending) return <div className="loading"></div>;

  return (
    <>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
