import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import { FooterContainer, Name, Price, ProductCardContainer } from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => {
        addItemToCart(product);
    };

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name} product`} />
            <FooterContainer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </FooterContainer>
            <Button buttonType="inverted" type="button" onClick={addProductToCart}>
                Add to card
            </Button>
        </ProductCardContainer>
    );
};

export default ProductCard;
