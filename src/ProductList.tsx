import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./App.css";

// Define types for the product data
interface Product {
  id: number;
  title: string;
  price: number;
  rating: { rate: number; count: number };
  category: string;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const mensClothingRef = useRef<HTMLDivElement>(null);
  const womensClothingRef = useRef<HTMLDivElement>(null);
  const electronicsRef = useRef<HTMLDivElement>(null);
  const jeweleryRef = useRef<HTMLDivElement>(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Helper function to filter products by category
  const filterByCategory = (category: string) => {
    return products.filter((product) => product.category === category);
  };

  function trimTitle(title: string): string {
    const words = title.split(" "); // Split the title into an array of words
    if (words.length > 7) {
      return words.slice(0, 7).join(" ") + " ..."; // Join the first 8 words and add '...'
    }
    return title;
  }

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const cardElement = ref.current.querySelector(
        ".product-container"
      ) as HTMLElement;
      const containerWidth = ref.current.offsetWidth;

      const cardWidth = cardElement ? cardElement.offsetWidth : 300;

      let scrollOffset = direction === "left" ? -cardWidth : cardWidth;

      if (window.innerWidth <= 768) {
        const centerOffset = (containerWidth - cardWidth) / 2;
        scrollOffset =
          direction === "left"
            ? -(cardWidth + centerOffset)
            : cardWidth + centerOffset;
      }

      ref.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className=" mt-12 bg-[#dde1e7]  p-4">
      <div className="flex flex-col space-y-8">
        {/* Men's Clothing */}
        <div className="flex flex-col">
          <p className="text-3xl font-bold heading text-center mb-2">
            Men's Clothing
          </p>
          <div className="relative mx-[0.9rem] md:mx-[4.3rem]">
            <button
              className="absolute -left-5 top-1/2 transform -translate-y-1/2 text-2xl  z-10 bg-[#ff9e00] rounded-full text-white py-3 px-3"
              onClick={() => handleScroll(mensClothingRef, "left")}
            >
              <FaAngleLeft />
            </button>
            <div
              ref={mensClothingRef}
              className="flex overflow-x-auto space-x-4 items-center scrollbar-hide"
            >
              <div className="flex flex-nowrap py-6 px-2 justify-center gap-4">
                {filterByCategory("men's clothing").map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <div className="flex product-container rounded-lg w-80 h-[26.8rem] justify-start items-center bg-white flex-col p-4">
                      <div className="image-container">
                        <img
                          className="product-image"
                          src={product.image}
                          alt={trimTitle(product.title)}
                        />
                      </div>
                      <p className="px-2">{trimTitle(product.title)}</p>
                      <div className="flex justify-between mt-auto w-full px-2">
                        <p className="text-lg font-bold">${product.price}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-400">
                            {product.rating.count} Ratings
                          </p>
                          <p className="text-white px-2 py-[0.1rem] rounded-md bg-[#f7d53d]">
                            {product.rating.rate} ★
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <button
              className="absolute -right-5 top-1/2 transform -translate-y-1/2  text-2xl  z-10 bg-[#ff9e00] rounded-full text-white py-3 px-3"
              onClick={() => handleScroll(mensClothingRef, "right")}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Women's Clothing */}
        <div className="flex flex-col">
          <p className="text-3xl font-bold heading text-center mb-2">
            Women's Clothing
          </p>
          <div className="relative mx-[0.9rem] md:mx-[4.3rem]">
            <button
              className="absolute -left-5 top-1/2 transform -translate-y-1/2 text-2xl  z-10 bg-[#ff9e00] rounded-full text-white py-3 px-3"
              onClick={() => handleScroll(womensClothingRef, "left")}
            >
              <FaAngleLeft />
            </button>
            <div
              ref={womensClothingRef}
              className="flex overflow-x-auto space-x-4 items-center scrollbar-hide"
            >
              <div className="flex flex-nowrap py-6 px-2 justify-center gap-4">
                {filterByCategory("women's clothing").map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <div className="flex product-container rounded-lg w-80 h-[26.8rem] justify-start items-center bg-white flex-col p-4">
                      <div className="image-container">
                        <img
                          className="product-image"
                          src={product.image}
                          alt={trimTitle(product.title)}
                        />
                      </div>
                      <p className="px-2">{trimTitle(product.title)}</p>
                      <div className="flex justify-between mt-auto w-full px-2">
                        <p className="text-lg font-bold">${product.price}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-400">
                            {product.rating.count} Ratings
                          </p>
                          <p className="text-white px-2 py-[0.1rem] rounded-md bg-[#f7d53d]">
                            {product.rating.rate} ★
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <button
              className="absolute -right-5 top-1/2 transform -translate-y-1/2  text-2xl  z-10 bg-[#ff9e00] rounded-full text-white py-3 px-3"
              onClick={() => handleScroll(womensClothingRef, "right")}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Electronics */}
        <div className="flex flex-col">
          <p className="text-3xl font-bold heading text-center mb-2">
            Electronics
          </p>
          <div className="relative mx-[0.9rem] md:mx-[4.3rem]">
            <button
              className="absolute -left-5 top-1/2 transform -translate-y-1/2 text-2xl  z-10 bg-[#ff9e00] rounded-full text-white py-3 px-3"
              onClick={() => handleScroll(electronicsRef, "left")}
            >
              <FaAngleLeft />
            </button>
            <div
              ref={electronicsRef}
              className="flex overflow-x-auto space-x-4 items-center scrollbar-hide"
            >
              <div className="flex flex-nowrap py-6 px-2 justify-center gap-4">
                {filterByCategory("electronics").map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <div className="flex product-container rounded-lg w-80 h-[26.8rem] justify-start items-center bg-white flex-col p-4">
                      <div className="image-container">
                        <img
                          className="product-image"
                          src={product.image}
                          alt={trimTitle(product.title)}
                        />
                      </div>
                      <p className="px-2">{trimTitle(product.title)}</p>
                      <div className="flex justify-between mt-auto w-full px-2">
                        <p className="text-lg font-bold">${product.price}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-400">
                            {product.rating.count} Ratings
                          </p>
                          <p className="text-white px-2 py-[0.1rem] rounded-md bg-[#f7d53d]">
                            {product.rating.rate} ★
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <button
              className="absolute -right-5 top-1/2 transform -translate-y-1/2  text-2xl  z-10 bg-[#ff9e00] rounded-full text-white py-3 px-3"
              onClick={() => handleScroll(electronicsRef, "right")}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Jewelery */}
        <div className="flex flex-col">
          <p className="text-3xl font-bold heading text-center mb-2">
            Jewelery
          </p>
          <div className="relative mx-[0.9rem] md:mx-[4.3rem]">
            <button
              className="absolute -left-5 top-1/2 transform -translate-y-1/2 text-2xl  z-10 bg-[#ff9e00] rounded-full text-white py-3 px-3"
              onClick={() => handleScroll(jeweleryRef, "left")}
            >
              <FaAngleLeft />
            </button>
            <div
              ref={jeweleryRef}
              className="flex overflow-x-auto space-x-4 items-center scrollbar-hide"
            >
              <div className="flex flex-nowrap py-6 px-2 justify-center gap-4">
                {filterByCategory("jewelery").map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <div className="flex product-container rounded-lg w-80 h-[26.8rem] justify-start items-center bg-white flex-col p-4">
                      <div className="image-container">
                        <img
                          className="product-image"
                          src={product.image}
                          alt={trimTitle(product.title)}
                        />
                      </div>
                      <p className="px-2">{trimTitle(product.title)}</p>
                      <div className="flex justify-between mt-auto w-full px-2">
                        <p className="text-lg font-bold">${product.price}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-400">
                            {product.rating.count} Ratings
                          </p>
                          <p className="text-white px-2 py-[0.1rem] rounded-md bg-[#f7d53d]">
                            {product.rating.rate} ★
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <button
              className="absolute -right-5 top-1/2 transform -translate-y-1/2  text-2xl  z-10 bg-[#ff9e00] rounded-full text-white py-3 px-3"
              onClick={() => handleScroll(jeweleryRef, "right")}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
