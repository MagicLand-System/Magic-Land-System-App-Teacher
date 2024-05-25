import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import courseReducer, { fetchCourseCategories } from "./features/courseSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseReducer,
    },
});

store.dispatch(fetchCourseCategories());
