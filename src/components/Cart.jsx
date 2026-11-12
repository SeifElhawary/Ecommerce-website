import { useContext, useState } from "react"
import { Cart } from "./CartContext"
import '../styles/cart.css'
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

function Cartt() {
    const { cartItems, decreaseQuan, increaseQuan, removeFromCart } = useContext(Cart)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });

    const handleDelete = (id) => {
        removeFromCart(id);
        setShowDeleteAlert(true);

        setTimeout(() => {
            setShowDeleteAlert(false);
        }, 2000);
    };

    return (
        <div className="container cart">
            <div className="cartBox">
                <h1>Order Summary</h1>
                <div className="products">
                    {cartItems.length > 0 ? cartItems.map((item, index) => {
                        return(
                            <div key={index} className="item">
                                <img src={item.images?.[0] || 'placeholder.jpg'} alt={item.title} />
                                <div className="info">
                                    <p>{item.title}</p>
                                    <p>${item.price}</p>
                                    <div className="btns">
                                        <span onClick={() => decreaseQuan(item.id)}>-</span>
                                        <span className="quantity">{item.quantity}</span>
                                        <span onClick={() => increaseQuan(item.id)}>+</span>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(item.id)}>
                                    <DeleteIcon className="del"/>
                                </button>
                            </div>
                        )
                    }): <p>No item in Cart!</p>}
                </div>
                <div className="total">
                    <div className="tt">
                        <span>Total:</span>
                        <span>${Math.floor(total)}</span>
                    </div>
                    <button disabled={cartItems.length === 0}>Place Order</button>
                </div>
            </div>

            {showDeleteAlert && (
                <Alert 
                    sx={{ 
                        width: "400px", 
                        position: "fixed", 
                        bottom: "20px", 
                        right: "20px", 
                        zIndex: 9999, 
                        backgroundColor:'red'
                    }} 
                    severity="error"
                >
                    Product removed from cart!
                </Alert>
            )}
        </div>
    )
}

export default Cartt