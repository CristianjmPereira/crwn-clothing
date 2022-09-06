import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";

import { LogoContainer, NavigationContainer, NavLink, NavLinks } from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/users.selector";
import { selectCartIsOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectCartIsOpen);

    const handleSignOut = () => {
        dispatch(signOutStart());
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo alt="Crwn Logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={handleSignOut}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to="/auth">
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
