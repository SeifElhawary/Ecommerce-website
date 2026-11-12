import { useContext } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../components/CartContext";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/Fav.css'
function FavPage() {
    const { favItems, cartItems, addToCart, addToFav } = useContext(Cart);
    return (
        <div className="favPage">
            {favItems && favItems.length > 0 ? favItems.map((i) => {
                const inCart = cartItems.find((item) => i.id === item.id);

                return (
                    <div className="product" key={i.id}>
                        <Link to={`/products/${i.id}`}>
                            <div className="img">
                                <img src={i.images[0]} alt={i.title} />
                            </div>
                            <h3>{i.title}</h3>
                            <div className="stars">
                                <span><StarIcon/></span>
                                <span><StarIcon/></span>
                                <span><StarIcon/></span>
                                <span><StarIcon/></span>
                                <span><StarBorderIcon/></span>
                            </div>
                            <div className="price">
                                <p className='priceNow'>${i.price}</p>
                            </div>
                        </Link>
                        
                        <div className="icons">
                            <span 
                                style={inCart ? { backgroundColor: "orange", pointerEvents: "none" } : null} 
                                onClick={() => addToCart(i)}
                            >
                                <AddShoppingCartIcon/>
                            </span>
                            <span 
                                style={{ backgroundColor: 'red' }} 
                                onClick={() => addToFav(i)}
                            >
                                <FavoriteIcon/>
                            </span>
                            <span><ReplyIcon/></span>
                        </div>
                        
                        {inCart ? (
                            <p style={{ textAlign: "center", color: "orange", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                <CheckCircleIcon/>In Cart
                            </p>
                        ) : null}
                    </div>
                );
            }) : <p>No item in Fav</p>}
        </div>
    );
}

export default FavPage;