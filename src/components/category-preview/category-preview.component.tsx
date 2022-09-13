import { CategoryItem } from "../../store/categories/category.types";
import ProductCard from "../product-card/product-card.component";
import { CategoryPreviewContainer, PreviewContainer, TitleLink } from "./category-preview.styles";

export type CategoryPreviewPops = {
    title: string;
    products: CategoryItem[]
}

const CategoryPreview = ({ title, products }: CategoryPreviewPops) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <TitleLink to={title}>
                    {title.toUpperCase()}
                </TitleLink>
            </h2>
            <PreviewContainer>
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
            </PreviewContainer>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;
