import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import '../styles/SlideProduct.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Cart } from './CartContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function Product({name , img , price , oldprice , id ,item}) {
    const {cartItems , addToCart , addToFav , favItems}= useContext(Cart);
    const inCart = cartItems.find((i)=> i.id === item.id )
    const inFav = favItems.find((i)=>i.id === item.id)
  return (
    <div  className="product">
        <Link to={`/products/${id}`}>
        <div className="img">
            <img src={img} alt={name} />
        </div>
        <h3>{name}</h3>
        <div className="stars">
            <span><StarIcon/></span>
            <span><StarIcon/></span>
            <span><StarIcon/></span>
            <span><StarIcon/></span>
           <span><StarBorderIcon/></span>
        </div>
        <div className="price">
            <p className='priceNow'>${price}</p>
            <p className='oldPrice'>${Math.round(oldprice)}</p>
        </div>
           </Link>
        <div className="icons">
            <span style={inCart ? {backgroundColor:"orange" , pointerEvents: "none"} : null} onClick={()=>addToCart(item)}><AddShoppingCartIcon/></span>
            <span style={inFav? {backgroundColor:'red' , pointerEvents:'none'}: null} onClick={()=>addToFav(item)}><FavoriteIcon/></span>
            <span><ReplyIcon/></span>
        </div>
        {inCart? <p style={{textAlign:"center" , color:"orange" , fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center" , gap:"10px" }}><CheckCircleIcon/>In Cart</p> : null}
    </div>
    
  )
}

export default Product