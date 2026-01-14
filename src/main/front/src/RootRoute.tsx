import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

export default function RootRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
