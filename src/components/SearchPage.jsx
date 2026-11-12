import { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { Cart } from "./CartContext";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import '../styles/SlideProduct.css'
function SearchPage() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const query = new URLSearchParams(useLocation().search).get("q");
  const { cartItems, addToCart } = useContext(Cart);

  useEffect(() => {
    const fetched = async () => {
      setLoad(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const result = await res.json();
        setData(result.products || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };

    if (query) {
      fetched();
    } else {
      setData([]);
      setLoad(false);
    }
  }, [query]);

  return (
    <div className="productSlider moveDown">
      <div className="container">
        <div className="top">
          <h2>Search Results for: "{query}"</h2>
        </div>

        {load ? (
          <p style={{ textAlign: "center", padding: "50px" }}>Loading...</p>
        ) : data.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {data.map((item) => {
              const isInCart = cartItems?.some(
                (cartItem) => cartItem.id === item.id,
              );
              const oldPrice =
                item.discountPercentage * item.price + item.price || null;

              return (
                <div
                  key={item.id}
                  className="product-card"
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    borderRadius: "8px",
                    background: "#201f1f07",
                  }}
                >
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <h3
                      style={{
                        fontSize: "16px",
                        margin: "10px 0",
                        height: "40px",
                        overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </h3>
                  </Link>

                  <div
                    className="stars"
                    style={{ color: "#ffc107", marginBottom: "8px" }}
                  >
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarBorderIcon fontSize="small" />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      ${item.price}
                    </span>
                    {oldPrice && (
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#888",
                          fontSize: "14px",
                        }}
                      >
                        ${oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: isInCart ? "transparent" : "#ffa41c",
                      border: "1px solid #ffa41c",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                    disabled={!item.id}
                    onClick={() => addToCart(item)}
                  >
                    {isInCart ? "In your Cart" : "Add To Cart"}
                    <AddShoppingCartIcon fontSize="small" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ textAlign: "center", padding: "50px" }}>
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
