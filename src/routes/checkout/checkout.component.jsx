import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";

const Checkout = () => {
    const { cartItems, incrementCartItems } = useContext(CartContext);

    const handleIncrementItem = (itemId) => {
        console.log(itemId);
        incrementCartItems(itemId);
    }

    return (
        <div>
            This is the checkout page
            <div>
                {cartItems.length === 0 ? (
                    <span>There is no items</span>
                ) : (
                    cartItems.map(({id, name, imageUrl, quantity, price}) => {
                        return (
                            <div key={id}>
                                <img src={imageUrl} alt={name} />
                                <div>
                                    <span>{name}</span>
                                    <span>
                                        {quantity} x ${price}
                                    </span>
                                    <span>decrement</span>
                                    <span onClick={() => handleIncrementItem(id)}>increment</span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Checkout;
