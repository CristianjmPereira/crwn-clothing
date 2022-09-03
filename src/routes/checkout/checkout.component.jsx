import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, TotalContainer } from "./checkout.styles";

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock className="header-block">
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock className="header-block">
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock className="header-block">
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.length === 0 ? (
                <span>There is no items</span>
            ) : (
                cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
            )}
            <TotalContainer>Total: ${cartTotal}</TotalContainer>
        </CheckoutContainer>
    );
};

export default Checkout;
