import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totelPrice: 0,
    items: []
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload)
        },
        removeItem(state, action) {
            state.items.filter((obj) => {
                obj.id !== action.payload
            })
        },
        clearItems(state) {
            state.items = []
        }
    }
});


export const { addItem, removeItem, clearItems } = basketSlice.actions;

export default basketSlice.reducer;