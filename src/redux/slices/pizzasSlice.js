import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPizzasData = createAsyncThunk(
    'pizza/fetchPizzasDataStatus',
    async ({ currentPage, category, sortBy, order, search }) => {
        const response = await axios.get(
            `https://66c4e535b026f3cc6cf0fed2.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`
        )
        return response.data
    },
)

const initialState = {
    items: [],
    status: 'loading'
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchPizzasData.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload
            state.status = 'succeeded'
        }).addCase(fetchPizzasData.pending, (state) => {
            state.status = "loading"
            state.items = []
        }).addCase(fetchPizzasData.rejected, (state) => {
            state.status = "error"
            state.items = []
            console.log(state.status)
        })
    }
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;