import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/cart.context";

import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <CartProvider>
                    <App />
                </CartProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
