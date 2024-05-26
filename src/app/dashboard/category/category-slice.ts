import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductService } from '@/app/services/product-service';

interface Category {
  id: number;
  name: string;
  image: string;
}

 export interface CategoryState {
  categories: Category[];
  updateCategory:{};
  loading: boolean;
  error?:any;
}

const initialState: CategoryState = {
  categories: [],
  updateCategory:{},
  loading: false,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories', async () => {
  const categories = await ProductService.getCategories();
  return categories;
});

export const addNewCategory = createAsyncThunk(
  'categories/addCategory', async ({name,image}:{name:string,image:string}) => {
  const category = await ProductService.addNewCategory(name,image);
  return category;
});
 
export const updateCategory = createAsyncThunk(
  'categories/updateCategory', async ({ id, name ,image}: { id: number; name: string,image:string }) => {
  const success = await ProductService.updateCategory(id, name,image);
  if (success) {
    return { id, name };
  } else {
    throw new Error('Failed to update category');
  }
});

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory', async (id: number) => {
  await ProductService.deleteCategory(id);
  return id;
});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(addNewCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) =>{
        state.loading=false;
        state.updateCategory=action.payload;
       })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      });
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
