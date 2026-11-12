import Home from "./components/Home";
import { Route , Routes } from "react-router-dom";
import ProductDet from './components/ProductDet'
import TopHeader from "./components/TopHeader";
import BottomHeader from "./components/BottomHeader";
import Cartt from "./components/Cart";
import CategoryPage from "./components/categoryPage";
import SearchPage from './components/SearchPage'
import FavPage from "./components/FavPage";
function App() {
  return (
    <>
        <header>
        <TopHeader />
        <BottomHeader />
      </header>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/products/:id"  element={<ProductDet/>}/>
        <Route path="/cart"  element={<Cartt/>}/>
       <Route path="/category/:name"  element={<CategoryPage/>}/>
       <Route path="/products/search" element={<SearchPage />} />
       <Route path="/fav" element={<FavPage/>} />

      </Routes>
    </>
  );
}
export default App;
