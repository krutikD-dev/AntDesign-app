import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

const initialState = {
  products: [],
  product: null,
  categories: [],
  status: "idle",
  productStatus: "idle",
  categoryStatus: "idle",
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
    // console.log(builder)
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'Success';
        state.products = action.payload;
      })
      
      .addCase(fetchProductById.pending, (state) => {
        state.productStatus = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productStatus = 'Success';
        state.product = action.payload;
      })

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'Success';
        state.products = action.payload;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.categoryStatus = 'loading';
      })
       .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoryStatus = 'Success';
        state.categories = action.payload;
      });
}});

export default productsSlice.reducer;   