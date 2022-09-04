import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProductCard from "../../components/product-card/product-card.component";

import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import { selectCategoriesMap } from '../../store/categories/category.selector'

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!categoriesMap) return;

        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toLocaleUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
            </CategoryContainer>
        </Fragment>
    );
};

export default Category;
