
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProductCart } from "../../slices/cart.slice";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleClickAddProduct = (e) => {
        e.preventDefault();
        dispatch(addProductCart({productId: product.id, quantity: 1}))
    }
     
  return (
    <Link to={`/products/${product.id}`} className="border-[1px] border-gray-400 rounded-md shadow-xl   ">
      <div className="p-4 border-b-[1px] border-gray-400 h-[200px] overflow-hidden ">
        <img className="h-full w-full object-contain" src={product.images[1].url} alt="" />
      </div>

      <section className="relative p-4">
        <h4 className="text-gray-400/80 font-bold">{product.brand}</h4>
        <h3 className="font-bold text-sm ml-2">{product.title}</h3>

        <h4 className="text-gray-400/80 font-bold mt-4">price</h4>
        <span className="font-bold text-sm ml-2">{product.price}</span>

        <button onClick={handleClickAddProduct} className="absolute right-4 bottom-4 bg-red-500 p-2 text-white rounded-full w-[40px] aspect-square hover:bg-red-500/50 transition-colors">
          <i className="bx bx-cart-alt"></i>
        </button>
      </section>
    </Link>
  );
};

export default ProductCard;
