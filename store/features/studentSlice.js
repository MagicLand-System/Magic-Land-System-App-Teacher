import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudents } from '../../api/student';

const initialState = {
    studentList: [],
    loading: true,
    error: null,
};

export const fetchStudentList = createAsyncThunk(
    'student/fetch_student_list',
    async (_, thunkAPI) => {
        try {
            const response = await getStudents();
            console.log("reload student List");
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
);

const studentSlice = createSlice({
    name: 'student',
    initialState: initialState,
    reducers: {
        updateStudentList: (state, action) => {
            state.studentList = action.payload;
            console.log("state : ", state);
            console.log("action : ", action);
            console.log("state Length : ", state.studentList.length);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudentList.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchStudentList.fulfilled, (state, action) => {
            state.loading = false;
            state.studentList = action.payload;

        });

        builder.addCase(fetchStudentList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    },
});

export const { updateStudentList } = studentSlice.actions;
export default studentSlice.reducer;
