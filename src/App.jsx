import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Header from "./components/layout/Header";
import NotFound from "./pages/NotFound";
import ProtectedAuth from "./components/auth/ProtectedAuth";
import Purchases from "./pages/Purchases";
import Cart from "./components/cart/Cart";



function App() {
  return (
    <section className="font-['Yantramanav'] grid grid-rows-[auto_1fr] min-h-screen " >

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedAuth />}>

        <Route path="/purchases" element={<Purchases />} />

        </Route>

        <Route path="/products/:id" element={<Products />}/>

        <Route path="/*" element={<NotFound />} />

      </Routes>

      <Cart />
    </section>
  );
}

export default App;
