import { useEffect, useMemo, useState } from "react"
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
    <main className="px-1 bg-yellow-100/30">
      <form onSubmit={handleSubmit}>
        <div className="  mt-5 flex pb-4 justify-center">
          <input className="py-2 px-6 rounded-[8px] border-[1px] sm:w-[380px]  w-[240px] shadow-2xl sm:px-24  " id="productName" type="text" placeholder="What are you looking for?" />
          <button className="rounded-[8px]  border-[1px] px-4 hover:bg-red-500/90 bg-red-500"><i className='bx bx-search text-white '></i></button>
        </div>

        <ul className=" truncate sm:justify-start gap-5 sm:text-xl text-[13px] font-bold flex flex-grow border-4 border-s-0 border-r-0 border-double  
         sm:text-red-500  sm:hover:text-black  p-5  sm:gap-6 items-center justify-center">
          <li className="cursor-pointer  hover:text-red-500" onClick={handleClickCategory} data-category={0}>All</li>
          {
            categories.map(category =><li className=" cursor-pointer hover:text-red-500" onClick={handleClickCategory} data-category={category.id} key={category.id}>{category.name}</li>)
          }
        </ul>
      </form>

      <section className=" py-4 grid gap-4 pb-10 sm:gap-8 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_320px))] justify-center">
        {
          productsByName.map(product => <ProductCard key={product.id} product={product} />)
        }
      </section>
    </main>
  )
}

export default Home