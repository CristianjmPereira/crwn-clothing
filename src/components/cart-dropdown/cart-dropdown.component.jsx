import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length === 0 ? (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                ) : (
                    cartItems.map((item) => <CartItem item={item} key={item.id} />)
                )}
            </CartItems>
            <Button type="button" onClick={goToCheckoutHandler}>
                GO TO CHECKOUT
            </Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
