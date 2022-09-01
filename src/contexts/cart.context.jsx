import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(({ id }) => id === productToAdd.id);

    if (existingCartItem) {
        return incrementQuantityCartItem(cartItems, productToAdd);
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const incrementQuantityCartItem = (cartItems, product) => {
    return cartItems.map((cartItem) =>
        cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
};

const getCartQuantityItems = (cartItems) => {
    return cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity;
    }, 0);
};

const getCartTotalPriceItems = (cartItems) => {
    return cartItems.reduce((total, cartItem) => {
        return total + (cartItem.quantity * cartItem.price);
    }, 0);
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(({ id }) => id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(({ id }) => id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(({ id }) => id !== cartItemToClear.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    toggleCart: () => {},
    cartCount: 0,
    cartTotal: 0,
    incrementCartItems: () => {},
    removeItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        setCartCount(getCartQuantityItems(cartItems));
    }, [cartItems]);

    useEffect(() => {
        setCartTotal(getCartTotalPriceItems(cartItems));
    }, [cartItems]);

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const incrementCartItems = (cartItem) => {
        setCartItems(incrementQuantityCartItem(cartItems, cartItem));
    };

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const value = {
        isCartOpen,
        toggleCart,
        addItemToCart,
        cartItems,
        cartCount,
        cartTotal,
        incrementCartItems,
        removeItemToCart,
        clearItemFromCart,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
