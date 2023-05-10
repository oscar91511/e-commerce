import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { get } from "react-hook-form"
import ProductCard from "../components/Home/ProductCard"
import { axiosEcommerce } from "../utils/configAxios"


const Home = () => {

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState("")
  const [currentCategory, setCurrentCategory] = useState(0)

const handleSubmit = (e) => {
  e.preventDefault()
  const newProductName = e.target.productName.value
  setProductName(newProductName)
}

const productsByName = useMemo(() => {
  return products.filter((product) => product.title.toLowerCase().includes(productName.toLowerCase()))
}, [productName, products])

const handleClickCategory = (e) =>{
 setCurrentCategory(Number(e.target.dataset.category))
}

  useEffect (() => {
  
    axiosEcommerce
    .get("categories")
    .then((res) => setCategories(res.data))
    .catch((err) => console.log(err))
  }, [])

  useEffect (() => {
    if(currentCategory === 0){
      
      axiosEcommerce
      .get("products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
    }
  }, [currentCategory])

  useEffect(() => {
    if(currentCategory != 0){
      axiosEcommerce
      .get(`products?categoryId=${currentCategory}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
    }

  }, [currentCategory])

  return (
    <main className="px-2  ">
      <form onSubmit={handleSubmit}>
        <div className="mt-5 flex justify-center">
          <input className="py-2 border-[1px] shadow-2xl sm:px-24 font-semibold " id="productName" type="text" placeholder="Wha are you looking for?" />
          <button className="border-[1px] px-5 bg-red-500"><i className='bx bx-search'></i></button>
        </div>

        <ul>
          <li className="cursor-pointer" onClick={handleClickCategory} data-category={0}>All</li>
          {
            categories.map(category =><li className="cursor-pointer" onClick={handleClickCategory} data-category={category.id} key={category.id}>{category.name}</li>)
          }
        </ul>
      </form>

      <section className="grid gap-8 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_320px))] justify-center">
        {
          productsByName.map(product => <ProductCard key={product.id} product={product} />)
        }
      </section>
    </main>
  )
}

export default Home