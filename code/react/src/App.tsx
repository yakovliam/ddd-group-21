import { BrowserRouter, Route, Routes } from "react-router";
import AuthenticationContextWrapper from "@/components/auth/AuthenticationContextWrapper";
import HomePage from "@/pages/home/HomePage";
import Layout from "./components/auth/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthenticationContextWrapper />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
          </Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
