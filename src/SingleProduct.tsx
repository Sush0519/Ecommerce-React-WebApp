import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: { rate: number; count: number };
  image: string;
}

export default function SingleProduct() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details by ID
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const image = `${process.env.PUBLIC_URL}/Images/tag.png`;

  const descriptionItems = product.description
    .split(/;|(?<!\d)\.(?!\d)|(?<=\w)\.\s+(?=[A-Z])|(?<=\w)\s*\(\s*|\s*\)\s*/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return (
    <div className="flex bg-white flex-wrap mt-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="absolute flex justify-center items-center top-16 left-4 bg-[#ff9e00] text-white px-2 py-2 rounded-full hover:bg-orange-500 transition"
      >
        <IoMdArrowRoundBack className="w-8 h-8" />
      </button>

      {/* Image Display */}
      <div className=" w-full flex flex-col items-center md:h-[93vh] md:w-1/2">
        <img
          className="w-[28rem] h-[28rem] md:pt-20 object-contain"
          src={product.image}
          alt={product.title}
        />

        {/*Buy Buttons */}
        <div className=" flex pt-5 md:pt-0 justify-center items-center text-xl mt-auto w-full">
          <button className=" bg-[#f7d53d] w-1/2 font-bold flex justify-center items-center text-white py-4 ">
            <AiOutlineShoppingCart className="w-7 h-7 mx-2 " /> Add To Cart
          </button>
          <button className=" bg-[#ff9e00] w-1/2 font-bold flex justify-center items-center text-white  py-4 ">
            <AiOutlineThunderbolt className="w-7 h-7 mx-2 " /> Buy Now
          </button>
        </div>
      </div>
      {/* Description Display */}
      <div className=" items-start justify-center flex flex-col w-full md:h-[93vh] md:w-1/2 p-4">
        <p className="text-3xl md:text-4xl pb-4 ">{product.title}</p>

        {/* Rating */}
        <div className="flex my-2">
          <p className="mr-2 flex items-center text-white px-2 rounded-md bg-[#f7d53d]">
            {product.rating.rate}★
          </p>
          <p className="text-xl text-gray-400">
            {product.rating.count} Ratings
          </p>
        </div>

        <p className="text-3xl font-bold py-3 text-green-600">
          ${product.price}
        </p>

        {/* Bullet-point Description */}
        <ul className=" my-4 space-y-2">
          {descriptionItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <img
                src={image}
                alt=""
                className="w-6 h-6 mr-2 mt-1"
                style={{ flexShrink: 0 }}
              />
              <span>{item}.</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
