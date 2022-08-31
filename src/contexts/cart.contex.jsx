import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };
    
    const values = { isCartOpen, toggleCart };
    return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};