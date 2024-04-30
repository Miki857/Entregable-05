import { createSlice } from "@reduxjs/toolkit";

const pokemonId = createSlice({
    name: "pokemonId",
    initialState: -1,
    reducers: {
        changeID: (value, action) => (+action.payload)
    }
});

export const {changeID} = pokemonId.actions;

export default pokemonId.reducer;