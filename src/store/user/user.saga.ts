import { User } from "firebase/auth";
import { all, call, put, takeLatest } from "typed-redux-saga/macro";
import {
    AdditionalInformation,
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    sighInUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser,
} from "../../utils/firebase/firebase.utils";
import { EmailSignInStart, signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, SignUpStart, SignUpSuccess, signUpSuccess } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);

        if (userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }

    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

//I choose to not use destructuring here to make more visible the params
export function* signInWithEmail(action: EmailSignInStart) {
    const { payload } = action;
    const { email, password } = payload;
    const userCredential = yield* call(sighInUserWithEmailAndPassword, email, password);
    if (userCredential) {
        yield* call(getSnapshotFromUserAuth, userCredential.user);
    }
    try {
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;

        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password, displayName);
        if (userCredential) {
            yield* put(signUpSuccess(userCredential.user, { displayName }));
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch(error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOut() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOut),
    ]);
}
