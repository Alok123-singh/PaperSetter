import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseEntity : {
        courseName: "Inventory Management",
        courseCode: "IRV193519364",
        licenses: "60",
        startTime: "2024-01-01T04:51:00",
        endTime: "2024-01-03T04:51:00",
        attempts: "1",
        groupFiveEntityList: [
            {
                limit: 5,
                groupCode: "A-1",
                students: ["Alok","Anand"]
            },
            {
                limit: 5,
                groupCode: "A-2",
                students: []
            },
            {
                limit: 5,
                groupCode: "A-3",
                students: []
            },
            {
                limit: 5,
                groupCode: "A-4",
                students: []
            },
            {
                limit: 5,
                groupCode: "A-5",
                students: []
            },
            {
                limit: 5,
                groupCode: "A-6",
                students: []
            },
            {
                limit: 5,
                groupCode: "A-7",
                students: []
            },
            {
                limit: 5,
                groupCode: "A-8",
                students: []
            },
            {
                limit: 5,
                groupCode: "A-9",
                students: []
            },
            {
                limit: 5,
                groupCode: "A-10",
                students: []
            },
            {
                limit: 5,
                groupCode: "A-11",
                students: []
            },
            {
                limit: 5,
                groupCode: "A-12",
                students: []
            },
            
        ],
        groupFourEntityList: [
            {
                limit: 4,
                groupCode: "A-13",
                students: []
            }
        ]
    },
    // courseEntity : {},
    courseEntities : [],
    instructorName : '',
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers : {
        setCourseEntity: (state,action) => {
            state.courseEntity = action.payload;
        },
        setCourseEntities: (state,action) => {
            state.courseEntities = action.payload;
        },
        setInstructorName: (state,action) => {
            state.instructorName = action.payload;
        }
    }

});

export const { setCourseEntity, setCourseEntities, setInstructorName } = courseSlice.actions;

export default courseSlice.reducer;