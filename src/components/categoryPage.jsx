import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Cart } from "./CartContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import Alert from "@mui/material/Alert";
import "../styles/cate.css";

function CategoryPage() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const {addToCart, cartItems } = useContext(Cart)
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/category/${name}`);
        const data = await res.json();
        setProducts(data.products || []);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching category products:", err);
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [name]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  if (loading) {
    return <p style={{ marginTop: "150px", textAlign: "center", color: "white" }}>Loading...</p>;
  }

  return (
    <>
      <div className="catePage" style={{ marginTop: "150px" }}>
        {products.length > 0 ? (
          products.map((item) => (
            <div style={cartItems.find((i)=>i.id === item.id)? {borderColor:'orange'}: null} className="card" key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.images?.[0]} alt={item.title} />
                <h3>{item.title}</h3>
                <p className="priceNow">${item.price}</p>
              </Link>
              
              <div className="icons">
                <span onClick={() => handleAddToCart(item)} style={{ cursor: "pointer" }}>
                  <AddShoppingCartIcon />
                </span>
                <span style={{ cursor: "pointer" }}>
                  <FavoriteIcon />
                </span>
                <span style={{ cursor: "pointer" }}>
                  <ReplyIcon />
                </span>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>Products not found</p>
        )}
      </div>

      {showAlert && (
        <Alert 
          sx={{ 
            width: "400px", 
            position: "fixed", 
            bottom: "20px", 
            right: "20px", 
            zIndex: 9999, 
            backgroundColor: "green",
            color: "white"
          }} 
          severity="success"
        >
          Product added to cart successfully!
        </Alert>
      )}
    </>
  );
}

export default CategoryPage;