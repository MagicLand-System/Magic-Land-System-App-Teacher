import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import courseReducer, { fetchCourseCategories } from "./features/courseSlice";
import studentList, { fetchStudentList } from "./features/studentSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        course: courseReducer,
        student: studentList
    },
});

store.dispatch(fetchCourseCategories());
store.dispatch(fetchStudentList());
