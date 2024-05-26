import { Product } from "@/app/models/product";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductService } from "@/app/services/product-service";

export interface ProductState {
  products: Product[];
  updateProduct:{};
  inProgress: boolean;
  error?: any;
}

const initialState: ProductState = {
  products:[],
  updateProduct:{},
  inProgress: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await ProductService.getProducts();
    return products;
  }
);

interface AddProductPayload {
  title: string;
  description:string;
  price: number;
  categoryId:number;
  images:string[];
}
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async ({title, price,categoryId, description ,images}: AddProductPayload, thunkAPI) => {
    try {
      const response = await ProductService.addNewProduct(title, price,categoryId, description,images);
      return response;
    } catch (error) {
      console.error('Error occured, adding product:', error);
      throw error;
    }
  }
);
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (productData: {
    title: string;
    price: number;
    categoryId: number;
    description: string;
    images: string[];
  },thunkAPI) => {
    const response = await ProductService.addNewProduct(
      productData.title,
      productData.price,
      productData.categoryId,
      productData.description,
      productData.images
    );
    return response;
  }
);

interface EditProductPayload {
  id: number;
  title: string;
  price: number;
}

export const updateProduct = createAsyncThunk(
  'products/updateProduct', async ({ id, title ,price}: { id: number; title: string,price:number }) => {
  const success = await ProductService.updateProduct(id, title,price);
  if (success) {
    return { id, name };
  } else {
    throw new Error('Failed to update category');
  }
});
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    await ProductService.deleteProduct(id);
    return id;
  }
); 
export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.inProgress = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action:PayloadAction<Product[]>) => {
      state.inProgress = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error;
      state.inProgress = false;
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
        state.inProgress=false;
        state.products.push(action.payload);
    });
    builder.addCase(deleteProduct.fulfilled, (state, action:PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) =>{
          state.inProgress=false;
          state.updateProduct=action.payload;
    });
  },
});
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
