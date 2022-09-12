import { CartItem, CART_ACTION_TYPES } from "./cart.types";
import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

const addCartItem = (cartItems = [] as CartItem[], productToAdd: CategoryItem): CartItem[] => {
    const existingCartItem = cartItems.find(({ id }) => id === productToAdd.id);

    if (existingCartItem) {
        return incrementQuantityCartItem(cartItems, productToAdd);
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const incrementQuantityCartItem = (cartItems = [] as CartItem[], product: CategoryItem): CartItem[] => {
    return cartItems.map((cartItem) =>
        cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
};

const removeCartItem = (cartItems = [] as CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find(({ id }) => id === cartItemToRemove.id);

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(({ id }) => id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
};

const clearCartItem = (cartItems = [] as CartItem[], cartItemToClear: CartItem) => {
    return cartItems.filter(({ id }) => id !== cartItemToClear.id);
};

export type SetCartIsOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;


export const setIsCartOpen = withMatcher((boolean: boolean): SetCartIsOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems =  withMatcher((cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
})

export const addItemToCart = withMatcher((cartItems: CartItem[], productToAdd: CategoryItem): SetCartItems => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
});

export const incrementCartItems = withMatcher((cartItems: CartItem[], cartItem: CategoryItem): SetCartItems => {
    const newCartItems = incrementQuantityCartItem(cartItems, cartItem);
    return setCartItems(newCartItems);
});

export const removeItemFromCart = withMatcher((cartItems: CartItem[], cartItemToRemove: CartItem): SetCartItems => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
});

export const clearItemFromCart = withMatcher((cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
});
