import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { SignUpContainer } from "./sign-up-form.styles.jsx";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            } else {
                console.log("User creation encountered and error: ", error.message);
            }
        }
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={"Display Name"}
                    required
                    type="text"
                    value={displayName}
                    name="displayName"
                    onChange={handleChange}
                />
                <FormInput label={"Email"} required type="email" value={email} name="email" onChange={handleChange} />
                <FormInput
                    label={"Password"}
                    required
                    type="password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                />
                <FormInput
                    label={"Confirm Password"}
                    required
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                />

                <Button type="submit">Submit</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;
