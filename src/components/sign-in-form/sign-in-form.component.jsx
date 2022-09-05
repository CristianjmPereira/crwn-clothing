import { useState } from "react";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { ButtonsContainer, SignUpContainer } from "./sign-in-form.styles";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        try {
            dispatch(googleSignInStart());
        } catch (error) {
            console.log(error.message);
        };
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email");
                    break;
                default:
                    console.log("User creation encountered and error: ", error.message);
            }
        }
    };

    return (
        <SignUpContainer>
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
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPES_CLASSES.google} type="button" onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignUpContainer>
    );
};

export default SignInForm;
