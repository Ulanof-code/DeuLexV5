import { configureStore } from "@reduxjs/toolkit";
import { api } from "./serivices/api";
import auth from '../features/auth/authSlice'
import { listenerMiddleware } from "../middleware/auth.js";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware),
});
