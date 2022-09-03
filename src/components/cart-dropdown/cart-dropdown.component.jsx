import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
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
