import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    productDetail: {},
    loading: false,
    error: null,  // Add error field for error handling
};

// Fetch products from the database
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await fetch('http://localhost:8000/api/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return await response.json();
});

// Fetch product details from the database
export const fetchProductDetail = createAsyncThunk("products/fetchProductDetail", async (id) => {
    const response = await fetch(`http://localhost:8000/api/products/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product with id ${id}`);
    }
    return await response.json();
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        removeProductDetail: (state) => {
            state.productDetail = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetail = action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
export const getAllProducts = (state) => state.products.items;
export const getProductDetail = (state) => state.products.productDetail;
export const getLoading = (state) => state.products.loading;
export const { removeProductDetail } = productsSlice.actions;
