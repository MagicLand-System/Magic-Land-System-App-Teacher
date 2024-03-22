import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { courseCategories } from '../../constants/course';

const initialState = {
    courseCategories: [],
    loading: true,
    error: null,
};

export const fetchCourseCategories = createAsyncThunk(
    'course/fetch_course_categories',
    async (_, thunkAPI) => {
        try {
            const response = await courseCategories();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

const courseSlice = createSlice({
    name: 'course',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCourseCategories.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchCourseCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.courseCategories = action.payload;
        });

        builder.addCase(fetchCourseCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    },
});

export default courseSlice.reducer;
