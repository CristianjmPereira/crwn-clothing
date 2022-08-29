import { Fragment } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

import "./sign-in.styles.scss";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    return (
        <Fragment>
            <div>
                <h1>Sign in component</h1>
                <button onClick={logGoogleUser}>Sigh in with Google Popup</button>
                <SignUpForm />
            </div>
        </Fragment>
    );
};

export default SignIn;
