import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import { setCategories } from '../../store/categories/category.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import Category from '../category/category.components';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategories = async () => {
            const categoryArray = await getCategoriesAndDocuments();

            dispatch(setCategories(categoryArray));
        };
        getCategories();
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
