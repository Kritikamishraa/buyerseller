import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import brandsReducer from "./slices/brandsSlice";
import contactReducer from "./slices/contactSlice";
import sellerCategoryReducer from "./slices/sellerCategoriesSlice";
import productReducer from "./slices/sellerProductSlice";
import buyerCategoriesReducer from "./slices/buyerCategoriesSlice";
import orderReducer from "./slices/ordersSlice";
import supportReducer from "./slices/supportSlice";
import sellerChatReducer from "./slices/sellerChatSlice";
import buyerNetworkReducer from "./slices/buyerNetworkSlice";
import cartReducer from "./slices/cartSlice";
import paymentOptionReducer from "./slices/paymentOptionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    brands: brandsReducer,
    contact: contactReducer,
    sellerCategory: sellerCategoryReducer,
    products: productReducer,
    buyerCategories: buyerCategoriesReducer,
    orders: orderReducer,
    support: supportReducer,
    sellerChat: sellerChatReducer,
    buyerNetwork: buyerNetworkReducer,
    cart: cartReducer,
    paymentOptions: paymentOptionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

