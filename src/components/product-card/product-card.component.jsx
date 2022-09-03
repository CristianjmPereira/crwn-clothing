import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
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
            <Button buttonType={BUTTON_TYPES_CLASSES.inverted} type="button" onClick={addProductToCart}>
                Add to card
            </Button>
        </ProductCardContainer>
    );
};

export default ProductCard;
