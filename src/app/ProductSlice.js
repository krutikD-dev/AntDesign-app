import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

const initialState = {
  products: [],
  product: null,
  categories: [],
  status: null,
  productStatus: null,
  categoryStatus: null,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await api.get("/products", { params: { limit: 50 } });
    return response.data.products;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category) => {
    const res = await api.get(`/products/category/${category}`);
    return res.data.products;
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const res = await api.get("/products/categories");
    return res.data.map((cat) => cat.slug);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    console.log(builder)
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = false;
        state.products = action.payload;
      })
      
      .addCase(fetchProductById.pending, (state) => {
        state.productStatus = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productStatus = false;
        state.product = action.payload;
      })

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = false;
        state.products = action.payload;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.categoryStatus = true;
      })
       .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoryStatus = false;
        state.categories = action.payload;
      });
}});

export default productsSlice.reducer;   