import React from "react";
import Home from "./Components/Home";
import { Routes, Route, Link, useLoaderData, useLocation } from "react-router-dom";
import UserDetails from "./Components/UserDetails";
import Routing from "./Components/Routing";
function App() {
  const{search,pathname}=useLocation()
  return (
    <div className="w-full h-screen">
      {(pathname!='/' || search.length>0) && ( <Link className="bg-pink-100 absolute left-[17%] top-[3%]" to='/'>Home</Link>)}
    
    <Routing> </Routing>
    </div>
  );
}

export default App;
