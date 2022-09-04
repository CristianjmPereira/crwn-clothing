export const loggerMiddleware = (state) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", state);

    next(action);

    console.log("next state: ", state.getState());
};
