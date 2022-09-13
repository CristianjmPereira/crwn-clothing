import { useSelector } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, TotalContainer } from "./checkout.styles";

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
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
            <PaymentForm />
        </CheckoutContainer>
    );
};

export default Checkout;
