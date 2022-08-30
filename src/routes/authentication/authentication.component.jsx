import { Fragment } from "react";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import "./authentication.styles.scss";

const Authentication = () => {
    return (
        <Fragment>
            <div>
                <h1>Sign in component</h1>
                <SignInForm />
                <SignUpForm />
            </div>
        </Fragment>
    );
};

export default Authentication;
