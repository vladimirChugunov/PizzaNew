import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: string;
  imageUrl: string;
  price: number;
  name: string;
  type: string;
  sizes: number;
  count: number;
};

interface cartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: cartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<String>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItems(state, action: PayloadAction<String>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    editTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice -= action.payload;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItems, removeItems, clearItems, editTotalPrice, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
