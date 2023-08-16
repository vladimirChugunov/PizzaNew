import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
import { CartItem } from "./cartSlice";

type PizzaItems = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "Loading",
  SUCCES = "succes",
  ERROR = "error",
}

interface PizzaSliceState {
  items: PizzaItems[];
  isLoading: "Loading" | "succes" | "error";
}

const initialState: PizzaSliceState = {
  items: [],
  isLoading: Status.LOADING,
};

// async action
export const fetchPizzas = createAsyncThunk<
  PizzaItems[],
  Record<string, string>
>("pizza/fetchfetchPizzasStatus", async (params) => {
  // params: Record<string, string>  2 метод типизации
  const { categories, search, sort, currentPage } = params;
  const { data } = await axios.get<PizzaItems[]>(
    `https://64cb4d54700d50e3c705ad70.mockapi.io/pizzas2?${categories}${search}&sortBy=${sort}&order=desc`
  );
  return data; // return data as PizzaItems[]; 2 метод типизации
});

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItems[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.isLoading = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = Status.SUCCES;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.isLoading = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

// работа с fetch + async await + IIFE
// (async function getAllPizzas() {
//   let response = await fetch(
//     `https://64cb4d54700d50e3c705ad70.mockapi.io/pizzas2?${categories}${search}&sortBy=${sortType.sortProperty}&order=desc`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//     }
//   );
//   try {
//     let data = await response.json();
//     setItems(data);
//     window.scrollTo(0, 0);
//     return data;
//   } catch (e) {
//     console.log(e.message, "message");
//   } finally {
//   setIdLoading(false);
// }
// })();

// const fetchPizza = async () => {
//     setIdLoading(true);
//     // const page = categoryId < 1 ? `page=${currentPage}&limit=4` : ""; // ?page=${currentPage}&limit4&
//     const categories = categoryId > 0 ? `category=${categoryId}` : "";
//     const search = searchValue.length > 0 ? `&search=${searchValue}` : "";
//     const sort = sortType.sortProperty;
//     try {
//       dispatch(
//         fetchPizzas({
//           categories,
//           search,
//           sort,
//           currentPage,
//         })
//       );
//     } catch (error) {
//       console.log("Error", error);
//     } finally {
//       setIdLoading(false);
//     }
//     window.scrollTo(0, 0);
//   };

// Без ts
// extraReducers: {
//   // Обработка возвращеного promis функции ассинхронной
//   [fetchPizzas.pending]: (state) => {
//     state.isLoading = "loading";
//     state.items = [];
//   },
//   [fetchPizzas.fulfilled]: (state, action) => {
//     state.items = action.payload;
//     state.isLoading = "loading";
//   },
//   [fetchPizzas.rejected]: (state, action) => {
//     state.isLoading = "error";
//     state.items = [];
//   },
// },
