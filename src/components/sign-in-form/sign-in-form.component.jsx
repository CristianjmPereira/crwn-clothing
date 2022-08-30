import { useState } from "react";
import { sighInUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };


    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await sighInUserWithEmailAndPassword(email, password);
            console.log(user);
            resetFormFields();
        } catch (error) {
            console.log("User creation encountered and error: ", error.message);
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={"Email"} required type="email" value={email} name="email" onChange={handleChange} />
                <FormInput
                    label={"Password"}
                    required
                    type="password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={'google'} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
