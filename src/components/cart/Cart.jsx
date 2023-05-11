import React, { useEffect } from "react";
import { useDispatch,  useSelector } from "react-redux";
import { changeIsShowCart, getCartProducts } from "../../slices/cart.slice";
import CartProduct from "./CartProduct";

const Cart = () => {
  const { isShowCart, products } = useSelector((store) => store.cart);
  const {token} = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();

  const handleClickChangeShowCart = () => {
    dispatch(changeIsShowCart());
  };

  const totalPrice = products.reduce(( acc, curr ) => acc + curr.quantity * (curr.product.price), 0)

  useEffect(() => {
    if (isShowCart) {
      dispatch(getCartProducts());
    }
  }, [isShowCart]);

  return (
    <section
      className={`fixed top-[40px] min-h-[calc(100vh_-_60px)]
     bg-white shadow-xl h-screen 
       w-[300px] 
       ${
         isShowCart && token ? "right-0" : "-right-full"
       } duration-200 p-3 grid grid-rows-[auto_1fr_auto]`}
    >
      <h2 className="text-xl font-bold">Shopping card</h2>
      <i
        onClick={handleClickChangeShowCart}
        className="bx bx-x absolute top-2 right-3 text-xl hover:text-red-500
        cursor-pointer"
      ></i>

      {/* products of cartshop */}
      <section className="overflow-y-auto grid gap-10 py-4">
        {products.map((product) => (
          <CartProduct key={product.id} product={product} />
        ))}
      </section>
      {/* checkout */}
      <section className="grid grid-cols-2 py-10 border-t-[1px]
       border-gray-400">
        <span>Total</span>
        <h4 className="text-end">$ {totalPrice}</h4>
        <button
          className="w-full col-span-2 bg-red-500 py-2 text-white font-bold hover:bg-red-400
           transition-colors rounded-sm mt-6"
        >
          Checkout
        </button>
      </section>
      
    </section>
  );
};

export default Cart;
