import React from "react";
import { Link, useLocation } from "react-router-dom";
import Routing from "./Components/Routing";

function App() {
  const { search, pathname } = useLocation();

  return (
    <div className="w-full min-h-screen bg-gray-100 relative">
      {/* Conditional Home Button */}
      {(pathname !== "/" || search.length > 0) && (
        <Link
          to="/"
          className="bg-pink-100 text-gray-800 font-semibold px-4 py-2 rounded shadow absolute left-4 top-4 hover:bg-pink-200 transition"
        >
          Home
        </Link>
      )}

      {/* Routes */}
      <Routing />
    </div>
  );
}

export default App;
