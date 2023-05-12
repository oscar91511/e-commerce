import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProductCart } from "../../slices/cart.slice";
import Swal from 'sweetalert2'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleClickAddProduct = (e) => {
    e.preventDefault();
    dispatch(addProductCart({ productId: product.id, quantity: 1 }));
    Swal.fire({
      position: "justify-center",
      icon: "success",
      title: "added to cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  
  return (
    <Link
      to={`/products/${product.id}`}
      className=" border-[1px] border-gray-400 rounded-md shadow-xl   "
    >
      <div className="  relative pt-4 p-4 border-b-[1px] border-gray-800/90 h-[200px] overflow-hidden group">
        <img
          className="h-full w-full object-contain group-hover:opacity-0 transition-opacity duration-500"
          src={product.images[0].url}
          alt=""
        />
        <img
          className="h-full w-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          src={product.images[1].url}
          alt=""
        />
      </div>

      <section className="relative p-4">
        <h4 className="text-gray-400/80 font-bold">{product.brand}</h4>
        <h3 className="font-bold text-sm ml-2">{product.title}</h3>

        <h4 className="text-red-600/80 font-bold mt-4">price</h4>
        <span className="font-bold text-sm ml-2">$ {product.price}</span>

        <button
          onClick={handleClickAddProduct}
          className="absolute right-4 bottom-4 bg-red-500 p-2 text-white rounded-full w-[40px] aspect-square hover:bg-red-500/50 transition-colors"
        >
          <i className="bx bx-cart-alt"></i>
        </button>
      </section>
    </Link>
  );
};

export default ProductCard;
