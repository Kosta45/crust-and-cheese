import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem(state, action) {
            // state.items.push(action.payload)
            const findItem = state.items.find((obj) => {
                return obj.id === action.payload.id
            })

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }

            // state.totalPrice += action.payload.price
            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.price * item.count) + sum;
            }, 0)

        },
        removeItem(state, action) {
            state.items.filter((obj) => {
                obj.id !== action.payload
            })
        },
        clearItems(state) {
            state.items = []
        },
        minusItem(state, action) {
            console.log(action.payload)
        },
        plusItem(state, action) {
            console.log(action.payload)
        }
    }
});


export const { addItem, removeItem, clearItems, minusItem, plusItem } = basketSlice.actions;

export default basketSlice.reducer;