import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import { fetchCategoriesStart } from '../../store/categories/category.action';
import Category from '../category/category.components';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    );
};

export default Shop;
