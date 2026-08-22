import { useUser } from "@clerk/react";
import "./index.css";
import ProblemPage from "./pages/ProblemPage.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  // Wait until Clerk has finished checking authentication
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  console.log("isSignedIn:", isSignedIn);

  return (
    <>
      <h1 className="text-red-500 bg-orange-400 p-10 text-3xl">
        welcome to the app
      </h1>

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/problems"
          element={
            isSignedIn ? <ProblemPage /> : <Navigate to="/" replace />
          }
        />
      </Routes>

      <Toaster toastOptions={{duration:3000}}/>
    </>
  );
}

export default App;

//tw, daisyui, react-router, react-hot-toaster, reat-hot-toast,
//todo: react-query aka tanstack query , axios
//! mkdnksandka
//? mkdnksandka
//* mkdnksandka