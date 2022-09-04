import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { FooterContainer, Name, Price, ProductCardContainer } from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => {
        dispatch(addItemToCart(cartItems, product));
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
