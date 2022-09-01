import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(({ id }) => id === productToAdd.id);

    if (existingCartItem) {
        return incrementQuantityCartItem(cartItems, productToAdd.id);
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const incrementQuantityCartItem = (cartItems, productId) => {
    return cartItems.map((cartItem) =>
        cartItem.id === productId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
};

const getCartQuantityItems = (cartItems) => {
    return cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity;
    }, 0);
};

export const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    toggleCart: () => {},
    cartCount: 0,
    incrementCartItems: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const incrementCartItems = (productId) => {
        setCartItems(incrementQuantityCartItem(cartItems, productId));
    }

    useEffect(() => {
        setCartCount(getCartQuantityItems(cartItems));
    }, [cartItems]);

    const value = { isCartOpen, toggleCart, addItemToCart, cartItems, cartCount, incrementCartItems };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
