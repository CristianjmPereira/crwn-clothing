import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

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
    }

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
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('User creation encountered and error: ', error.message);
            };
        }
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Display Name</label>
                <input required type="text" value={displayName} name="displayName" onChange={handleChange} />

                <label htmlFor="">Email</label>
                <input required type="email" value={email} name="email" onChange={handleChange} />

                <label htmlFor="">Password</label>
                <input required type="password" value={password} name="password" onChange={handleChange} />

                <label htmlFor="">Confirm Password</label>
                <input
                    required
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignUpForm;
