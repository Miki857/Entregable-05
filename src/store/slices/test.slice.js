import { createSlice } from "@reduxjs/toolkit";

const test = createSlice({
    name: "test",
    initialState: 0,
    reducers: {
        changeTest: (value, action) => value + 1
    }
});

export const {changeTest} = test.actions;

export default test.reducer;