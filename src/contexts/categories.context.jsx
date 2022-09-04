import { createContext, useEffect, useReducer } from "react";
import { CATEGORIES_ACTION_TYPES } from "../store/categories/category.types";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

const categoriesReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
            return {
                ...state,
                categoriesMap: payload,
            };
        default:
            throw new Error(`Unhandled type of ${type} in categoriesReducer`);
    }
};

const INITIAL_STATE = {
    categoriesMap: {},
};

export const CategoriesProvider = ({ children }) => {
    const [{ categoriesMap }, dispatch] = useReducer(categoriesReducer, INITIAL_STATE);

    const setCategoriesMap = (categories) => {
        const action = createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categories);
        dispatch(action);
    };

    const values = {
        categoriesMap,
    };

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();

            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    }, []);

    return <CategoriesContext.Provider value={values}>{children}</CategoriesContext.Provider>;
};
