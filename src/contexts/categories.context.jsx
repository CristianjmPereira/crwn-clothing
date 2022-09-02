import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const values = {
        categoriesMap
    }

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();

            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    }, []);

    return <CategoriesContext.Provider value={values}>{children}</CategoriesContext.Provider>
}