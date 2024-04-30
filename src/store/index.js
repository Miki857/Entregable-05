import { configureStore } from "@reduxjs/toolkit";
import pokemonId from "./slices/pokemon.slice";
import test from "./slices/test.slice";

const store = configureStore({
    reducer: {
        pokemonId,
        test
    }
});

export default store;