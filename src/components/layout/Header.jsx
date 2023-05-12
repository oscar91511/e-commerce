import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { changeIsShowCart } from '../../slices/cart.slice'

const Header = () => {
  const { token } = useSelector((store) => store.userInfo);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleClickChangeShowCart = () => {
    if(!token) return navigate("/login")
    dispatch(changeIsShowCart());
  };
  
  return (
    <section className='  pt-4 py-4 flex justify-between items-center md:border-[1px] '>
      <Link to="/">
        <h1 className='text-3xl hover:text-red-400 text-red-500 p-2 sm:pl-6 font-bold'>Amazing </h1>
      </Link>

      <nav className='text-2xl flex md:gap-20 gap-8 px-10  '>
      <Link to="/login" >
          <i className=' hover:text-red-500  text-gray-600/50 bx bx-user'></i>
          </Link>
          <Link to="/purchases">
          <i className='hover:text-red-500 text-gray-600/50 bx bx-box'></i>
          </Link>
          <button onClick={handleClickChangeShowCart}>
          <i className='hover:text-red-500  text-gray-600/50  bx bx-cart'></i>
          </button>
      </nav>
    </section>
  )
}

export default Header