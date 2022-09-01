import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <span className="empty-message"> There is no items in cart</span>
                ) : (
                    cartItems.map((item) => <CartItem item={item} key={item.id}/>)
                )}
            </div>
            <Button type="button">GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;
