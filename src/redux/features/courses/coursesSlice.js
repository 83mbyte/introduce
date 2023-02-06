import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../../API/api";

const DATA_TEMPLATE_OBJECT = {
    course: {
        label: 'Course',
        path: 'courses/course',
        type: 'text',
        value: '',
        required: true
    },
    period: {
        label: 'Start - End date',
        path: 'courses/period',
        type: 'text',
        value: ''
    },
    institution: {
        label: 'Institution',
        path: 'courses/institution',
        type: 'text',
        value: ''
    },
    certificate: {
        label: 'Link to a certificate',
        path: 'courses/certificate',
        type: 'url',
        value: ''
    }
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        data: [],
        status: 'idle',
        error: ''
    },
    reducers: {
        addNewCoursesItem: (state) => {
            state.data = [...state.data, DATA_TEMPLATE_OBJECT];
        },
        removeCoursesItem: (state, action) => {
            state.data.splice(action.payload, 1);
            if (state.data.length < 1) {
                state.data = []
            }
        },
        coursesStateValueUpdate: (state, action) => {
            state.data[action.payload.path[0]][action.payload.path[1]].value = action.payload.value;
        },

    },
    extraReducers(builder) {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.data = action.payload;
                } else {
                    state.data = []
                }
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default coursesSlice.reducer;
export const { addNewCoursesItem, removeCoursesItem, coursesStateValueUpdate } = coursesSlice.actions;

export const fetchCourses = createAsyncThunk('courses/fecthCourses', async (userName) => {
    const response = await fetchAPI.fethingSubPath('courses', userName);
    if (response && response !== 'Error -- fethingSubPath from api.js') {
        return response;
    }
})