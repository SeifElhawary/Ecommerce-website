import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDet.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import { Cart } from "./CartContext";
import Alert from '@mui/material/Alert';
function ProductDet() {
  const { id } = useParams();
  const [det, setDeet] = useState({});
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState([]);
  const { addToCart , cartItems } = useContext(Cart);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const productData = await res.json();
        setDeet(productData);

        if (productData.category) {
          const catRes = await fetch(
            `https://dummyjson.com/products/category/${productData.category}`,
          );
          const catData = await catRes.json();
          setCat(catData.products || []);
        }

        setLoading(false);
      } catch (err) {
        console.log(err, "you have error in fetching details!");
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };
  const inCart = cartItems.find((item) => item.id == det.id);
  if (!det) {
    return (
      <p style={{ marginTop: "450px", textAlign: "center", color: "red" }}>
        Product not found
      </p>
    );
  }

  return (
    <>
      {loading ? (
        <p style={{ marginTop: "450px", textAlign: "center", color: "white" }}>
          Loading...
        </p>
      ) : (
        <>
          <div className="productDetails container">
            <div className="imgs">
              <img
                id="mainImg"
                className="mainImg"
                src={det.images?.[0]}
                alt={det.title}
              />
              <div className="anotherimgs">
                {det.images && det.images.length > 1
                  ? det.images.map((img, index) => (
                      <img
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          (document.getElementById("mainImg").src = img)
                        }
                        key={index}
                        src={img}
                        alt={det.title}
                      />
                    ))
                  : null}
              </div>
            </div>
            <div className="info">
              <h2>{det.title}</h2>
              <div className="stars">
                <span><StarIcon /></span>
                <span><StarIcon /></span>
                <span><StarIcon /></span>
                <span><StarIcon /></span>
                <span><StarBorderIcon /></span>
              </div>
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                ${det.price}
              </p>
              {det.stock > 0 && (
                <p>
                  Availability: <span>In Stock</span>
                </p>
              )}
              <p>Brand : {det.brand}</p>
              <p>{det.description}</p>
              <span style={{ color: "red" }}>
                Only {det.stock} left In stock
              </span>
              <br />
              <button
              style={inCart ? { backgroundColor:"transparent"} : null}
                disabled={loading || !det.id}
                onClick={() => handleAddToCart(det)}
              >
                {inCart ? "In your Cart" : "Add To Cart"}
                <AddShoppingCartIcon style={{ marginLeft: "10px" }} />
              </button>
            </div>
          </div>

          <div className="container cate">
            <h2 className="title">{det.category}</h2>
            <Splide
              options={{
                perPage: 5,
                arrows: true,
                pagination: false,
                gap: 10,
                breakpoints: {
                  1200: { perPage: 4 },
                  992: { perPage: 3 },
                  768: { perPage: 2 },
                  480: { perPage: 1 },
                },
              }}
            >
              {cat.length > 0 &&
                cat.map((data, index) => (
                  <SplideSlide key={index}>
                    <div className="product">
                      <Link to={`/products/${data.id}`}>
                        <div style={{ paddingTop: "15px" }} className="img">
                          <img
                            style={{ objectFit: "cover" }}
                            src={data.images[0]}
                            alt={data.title}
                          />
                        </div>
                        <h3>{data.title}</h3>
                        <div className="stars">
                          <span><StarIcon /></span>
                          <span><StarIcon /></span>
                          <span><StarIcon /></span>
                          <span><StarIcon /></span>
                          <span><StarBorderIcon /></span>
                        </div>
                        <div className="price">
                          <p className="priceNow">${data.price}</p>
                        </div>
                      </Link>
                      <div className="icons">
                        <span onClick={() => handleAddToCart(data)}>
                          <AddShoppingCartIcon />
                        </span>
                        <span>
                          <FavoriteIcon />
                        </span>
                        <span>
                          <ReplyIcon />
                        </span>
                      </div>
                    </div>
                  </SplideSlide>
                ))}
            </Splide>
          </div>

          {showAlert && (
            <Alert 
              sx={{ 
                width: "400px", 
                position: "fixed", 
                bottom: "20px", 
                right: "20px", 
                zIndex: 9999, 
                backgroundColor:"green" ,
              }} 
              severity="success"
            >
              Product added to cart successfully!
            </Alert>
          )}
        </>
      )}
    </>
  );
}

export default ProductDet;