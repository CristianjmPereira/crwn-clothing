import { CartItem as CartItemType } from '../../store/cart/cart.types.js';
import { CartItemContainer, ItemDetails } from './cart-item.styles.jsx';

export type CartItemProps = {
    item: CartItemType
}

const CartItem = ({ item }: CartItemProps) => {
    const { name, imageUrl, price, quantity } = item;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <span>{name}</span>
                <span>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;