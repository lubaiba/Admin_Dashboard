import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../loginpage/login-slice'
import productsReducer from '../dashboard/products/product-slice'
import categoriesReducer from '../dashboard/category/category-slice'
export const store = configureStore({
  reducer: {
    login:loginReducer,
    products:productsReducer,
    category:categoriesReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch