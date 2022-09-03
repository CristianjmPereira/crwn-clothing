import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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
        return total + cartItem.quantity * cartItem.price;
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
    cartCount: 0,
    cartTotal: 0,
    toggleCart: () => {},
    incrementCartItems: () => {},
    removeItemToCart: () => {},
});

const INITIAL_VALUES = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default: {
            throw new Error(`Unhandled type of ${type} in cartReducer`);
        }
    }
};

export const CartProvider = ({ children }) => {
    const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_VALUES);


    const toggleCart = () => {
        const action = createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, !isCartOpen);
        dispatch(action);
    };

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = getCartQuantityItems(newCartItems);
        const newCartTotal = getCartTotalPriceItems(newCartItems);
        
        const action = createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
        });

        dispatch(action);
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const incrementCartItems = (cartItem) => {
        const newCartItems = incrementQuantityCartItem(cartItems, cartItem);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const value = {
        isCartOpen,
        cartItems,
        cartCount,
        cartTotal,
        toggleCart,
        addItemToCart,
        incrementCartItems,
        removeItemToCart,
        clearItemFromCart,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
