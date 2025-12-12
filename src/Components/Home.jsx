import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import axios from "../Utils/Axios";

function Home() {
  const [product] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    if (!filteredProducts || category === "undefined") {
      setFilteredProducts(product);
    } else if (category !== "undefined") {
      setFilteredProducts(product.filter((p) => p.category === category));
    }
  }, [category, product]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Navigation />

      <div className="p-4 flex-1 flex flex-wrap gap-6 justify-center md:justify-start overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border w-full sm:w-[48%] md:w-[30%] lg:w-[22%] flex flex-col items-center p-3"
            >
              <Link
                to={`/userDetails/${p.id}`}
                className="flex flex-col h-full w-full justify-between items-center"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-[180px] object-contain transition-transform duration-300 hover:scale-105"
                />
                <h1 className="text-sm font-semibold text-center mt-2 line-clamp-2">
                  {p.title}
                </h1>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
