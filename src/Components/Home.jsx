import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import axios from "../Utils/Axios";

function Home() {
  let [product, setProduct] = useContext(ProductContext);
;
  let { search } = useLocation();

  let category = decodeURIComponent(search.split("=")[1]);
  

  let [filteredProducts, setfilteredProducts] = useState(null);

  const getcategorydata = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filteredProducts || category=='undefined') setfilteredProducts(product);
    if (category != "undefined") {
      // getcategorydata();

      setfilteredProducts(product.filter(p=>p.category == category))

    }
  }, [category, product]);

  return product ? (
    <div className="flex w-full h-screen">
      <Navigation />

      <div className="p-4 flex overflow-x-hidden overflow-y-auto items-start justify-start flex-wrap gap-4 w-[85%]">
        {filteredProducts && 
        filteredProducts.map((p, id) => (
          <ul
            key={id}
            className="card mt-8 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 
                       border p-3 w-[18%] h-[280px] flex flex-col items-center"
          >
            <Link
              to={`/userDetails/${p.id}`}
              className="flex flex-col h-full w-full justify-between items-center"
            >
              <img
                className="mt-2 w-full h-[180px] object-contain transition-transform duration-300 hover:scale-105"
                src={p.image}
                alt=""
              />

              <h1 className="text-sm font-semibold text-center mt-2 line-clamp-2">
                {p.title}
              </h1>
            </Link>
          </ul>
        ))}
      </div>
    </div>
  ) : (
    "Loading"
  );
}

export default Home;
