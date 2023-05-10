import { useEffect, useState } from "react"
import { axiosEcommerce } from "../../utils/configAxios"
import ProductCard from "../Home/ProductCard"


const SimilarProducts = ({categoryId, productId}) => {

  const [similarProducts, setSimilarProducts] = useState([])

  useEffect(() => {
    if(categoryId){
      axiosEcommerce.get(`products?categoryId=${categoryId}`)
    .then((res) => {
      const otherProducts = (res.data.filter(product => product.id !== productId))
      setSimilarProducts(otherProducts)
    })
    .catch((err) => console.log(err)) 
    }
   
  },[categoryId, productId])

  return (
    <section>
        <h2 className="text-red-500 font-bold text-lg mb-6 px-4">Discover Similiar items</h2>

        <section className="grid gap-4 py-4 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_320px))] justify-center items-center">
           {
            similarProducts.map(product =>  <ProductCard key={product.id} product={product} />)
           } 
        </section>
    </section>
  )
}

export default SimilarProducts