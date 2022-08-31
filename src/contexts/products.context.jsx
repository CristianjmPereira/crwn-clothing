import { createContext, useEffect, useState } from "react";

import SHOP_PRODUCTS from '../resources/shop-data.json';

export const ProductsContext = createContext({
    products: [],
    setProducts: () => []
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const values = {
        products, setProducts
    }

    useEffect(() => {
        setProducts(SHOP_PRODUCTS);
    }, []);
    return <ProductsContext.Provider value={values}>{children}</ProductsContext.Provider>
}