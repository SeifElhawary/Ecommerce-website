import { createContext, useEffect, useState } from "react";

export const Cart = createContext(null);

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedItems = localStorage.getItem("cart");
        return savedItems && savedItems !== "undefined" ? JSON.parse(savedItems) : [];
    });
    const [favItems , setFavItems] = useState(()=>{
        const savedFav = localStorage.getItem('fav');
        return savedFav && savedFav !== 'undefind' ? JSON.parse(savedFav) : []
    })
    const addToFav = (item)=>{
      const inFav = favItems.find((i)=>i.id === item.id);
      if(inFav){
        return
      }else{
        setFavItems((prev)=>[...prev , item])
      } 
    }
    const increaseQuan = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuan = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1 
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
            )
        );
    };

    const addToCart = (item) => {
        setCartItems((prev) => {
            const existingItem = prev.find((i) => i.id === item.id);
            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);
      useEffect(() => {
        localStorage.setItem("fav", JSON.stringify(favItems));
    }, [favItems]);

    return (
        <Cart.Provider value={{ cartItems, addToCart, increaseQuan, decreaseQuan, removeFromCart , addToFav ,favItems }}>
            {children}
        </Cart.Provider>
    );
}