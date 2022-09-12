import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesFailed, fetchCategoriesSuccess } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
    try {
        // The first parameter for call is the called function and the second are the params.
        // In this example, 'categories' as params, is only to demonstrate the functionality.
        const categoryArray = yield* call(getCategoriesAndDocuments, 'categories');
        yield* put(fetchCategoriesSuccess(categoryArray));
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error));
    }
}


export function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
}