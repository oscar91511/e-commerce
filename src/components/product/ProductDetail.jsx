import React, { useEffect, useState } from "react";
import { axiosEcommerce } from "../../utils/configAxios";
import SimilarProducts from "./SimilarProducts";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductCart } from "../../slices/cart.slice";

const stylePositionImages = {
    "o": "-ml-[0%]",
    "1": "-ml-[100%]",
    "2": "-ml-[200%]"
}

const ProductDetail = ({ productId }) => {
  const [productData, setProductData] = useState();
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const [imageToShow, setImageToShow] = useState(0);

  const handleClickPlus = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
  };

  const handleClickLess = () => {
    const newCounter = counter - 1;
    if (newCounter > 0) {
      setCounter(newCounter);
    }
  };

  const handleClickAddToCart = () => {
    dispatch(addProductCart({ quantity: counter, productId: productData.id }));
  };

  const nextImage = () => {
    const newImagePosition = imageToShow + 1;
    if (newImagePosition <= 2) {
      setImageToShow(newImagePosition);
    } else {
      setImageToShow(0);
    }
  };

  const previusImage = () => {
    const newImagePosition = imageToShow - 1;
    if (newImagePosition >= 0) {
      setImageToShow(newImagePosition);
    } else {
      setImageToShow(2);
    }
  };

  useEffect(() => {
    axiosEcommerce
      .get(`products/${productId}`)
      .then((res) => setProductData(res.data))
      .catch((err) => console.log(err));
  }, [, productId]);

  return (
    <>
      <section className="flex gap-2 items-center justify-center">
        <Link to="/">Home</Link>
        <div className="h-[6px] aspect-square bg-red-500 rounded-s-full"></div>
        <span className="font-bold">{productData?.title}</span>
      </section>

      <section className="grid gap-6 px-4 sm:grid-cols-2 sm:items-center max-w-[1000px] mx-auto">
        {/* Slider*/}
        <section className="overflow-hidden ">
          <section className={`flex w-[300%] ${stylePositionImages[imageToShow]} duration-200`}>
            <div className="h-[300px] w-[calc(100%_/_3)] p-4">
              <img
                className="h-full w-full object-contain"
                src={productData?.images[0].url}
                alt=""
              />
            </div>
            <div className="h-[300px] w-[calc(100%_/_3)] p-4">
              <img
                className="h-full w-full  object-contain"
                src={productData?.images[1].url}
                alt=""
              />
            </div>
            <div className="h-[300px] w-[calc(100%_/_3)] p-4">
              <img
                className="h-full w-full  object-contain"
                src={productData?.images[2].url}
                alt=""
              />
            </div>
          </section>
          <i onClick={nextImage}
            className="bx bxs-right-arrow absolute top-1/3 -translate-y-1/2
             right-2 text-red-400 cursor-pointer"
          ></i>
          <i onClick={previusImage}
            className="bx bxs-left-arrow absolute top-1/3 -translate-y-1/2
             left-2 text-red-400 cursor-pointer"
          ></i>
        </section>
        <section>
          <h4 className="text-gray-400/90 font-bold mt-6">
            {productData?.brand}
          </h4>
          <h3 className="font-bold text-lg text-gray-700/90  ml-2">
            {productData?.title}
          </h3>

          <section className="grid grid-cols-2 mt-6">
            <article>
              <h4 className="text-red-400 font-bold">price</h4>
              <span className="font-bold  text-lg ml-2">
                $ {productData?.price}
              </span>
            </article>

            <article>
              <h4 className="text-red-400 font-bold">Quantity</h4>
              <div className="flex items-center">
                <button
                  onClick={handleClickLess}
                  className="border-[1px] p-2 px-4 hover:bg-red-500 hover:text-white transition-colors "
                >
                  -
                </button>
                <span className="border-[1px] p-2 px-4 border-x-0 ">
                  {counter}
                </span>
                <button
                  onClick={handleClickPlus}
                  className="border-[1px] p-2 px-4 hover:bg-red-500 hover:text-white transition-colors "
                >
                  +
                </button>
              </div>
            </article>
          </section>

          <button
            onClick={handleClickAddToCart}
            className="w-full bg-red-500 py-2 text-white font-bold hover:bg-red-400 transition-colors rounded-sm mt-6"
          >
            Add to cart <i className="bx bx-cart"></i>
          </button>

          <p className="text-sm my-6 text-gray-700/90">
            {productData?.description}
          </p>
        </section>
      </section>
      <SimilarProducts
        productId={productData?.id}
        categoryId={productData?.categoryId}
      />
    </>
  );
};

export default ProductDetail;
