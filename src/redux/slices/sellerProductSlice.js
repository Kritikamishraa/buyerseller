// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axiosInstance";

// const BASE_URL = "/api/v1/seller-products";

// // GET: All products
// export const getAllProducts = createAsyncThunk(
//   "products/getAll",
//   async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
//       return res.data; // backend ka full object return karega {success, page, totalPages, totalProducts, data: []}
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // GET: Products by category
// export const getProductsByCategoryId = createAsyncThunk(
//   "products/getByCategory",
//   async (categoryId, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/${categoryId}`);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // GET: Single product by ID
// export const getProductById = createAsyncThunk(
//   "products/getById",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/get/product/${productId}`
//       );
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // POST: Add a new product
// export const addProduct = createAsyncThunk(
//   "products/add",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${BASE_URL}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // PUT: Update product
// export const updateProduct = createAsyncThunk(
//   "products/update",
//   async ({ id, formData }, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(`${BASE_URL}/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // DELETE: Product
// export const deleteProduct = createAsyncThunk(
//   "products/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${BASE_URL}/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // GET: Products by logged-in user
// export const getUserProducts = createAsyncThunk(
//   "products/getByUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/get/user/product`);
//       return res.data.product;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // GET: Products by Buyer Category
// export const getProductsByBuyerCategoryId = createAsyncThunk(
//   "products/getByBuyerCategory",
//   async (buyerCategoryId, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/get/${buyerCategoryId}`);
//       return res.data; // backend return karega { success, buyerCategory, products }
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     allProducts: [],
//     page: 1,
//     totalPages: 1,
//     totalProducts: 0,
//     userProducts: [],
//     productDetails: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearProductDetails: (state) => {
//       state.productDetails = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // .addCase(getAllProducts.pending, (state) => {
//       //   state.loading = true;
//       // })
//       // .addCase(getAllProducts.fulfilled, (state, action) => {
//       //   state.loading = false;
//       //   state.allProducts = action.payload;
//       // })
//       // .addCase(getAllProducts.rejected, (state, action) => {
//       //   state.loading = false;
//       //   state.error = action.payload?.message;
//       // })

//       .addCase(getAllProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getAllProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.allProducts = action.payload.data;
//         state.page = action.payload.page;
//         state.totalPages = action.payload.totalPages;
//         state.totalProducts = action.payload.totalProducts;
//       })
//       .addCase(getAllProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(getProductsByCategoryId.fulfilled, (state, action) => {
//         state.allProducts = action.payload;
//       })

//       .addCase(getProductById.fulfilled, (state, action) => {
//         state.productDetails = action.payload;
//       })

//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.allProducts.push(action.payload);
//       })

//       .addCase(updateProduct.fulfilled, (state, action) => {
//         const index = state.allProducts.findIndex(
//           (p) => p._id === action.payload._id
//         );
//         if (index !== -1) state.allProducts[index] = action.payload;
//       })

//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.allProducts = state.allProducts.filter(
//           (p) => p._id !== action.payload
//         );
//       })

//       .addCase(getUserProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getUserProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userProducts = action.payload;
//       })
//       .addCase(getUserProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message;
//       })

//       // Buyer category products
//     .addCase(getProductsByBuyerCategoryId.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(getProductsByBuyerCategoryId.fulfilled, (state, action) => {
//       state.loading = false;
//       state.allProducts = action.payload.products; // products array
//       state.buyerCategory = action.payload.buyerCategory; // optional, agar frontend me dikhana ho
//     })
//     .addCase(getProductsByBuyerCategoryId.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload?.message || "Failed to fetch products by buyer category";
//     });
//   },
// });

// export const { clearProductDetails } = productSlice.actions;
// export default productSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosInstance";

const BASE_URL = "/api/v1/seller-products";

// 1. Get all products (Admin)
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
      return res.data; // {success, page, totalPages, totalProducts, data}
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 2. Get product by Category ID
export const getProductsByCategoryId = createAsyncThunk(
  "products/getByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${categoryId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 3. Get product by ID
export const getProductById = createAsyncThunk(
  "products/getById",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get/product/${productId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 4. Add Product
export const addProduct = createAsyncThunk(
  "products/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.product || res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 5. Update Product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.updatedProduct || res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 6. Delete Product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 7. Get Seller’s Own Products
export const getUserProducts = createAsyncThunk(
  "products/getByUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get/user/product`);
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 8. Get Buyer View Products
export const getBuyerProducts = createAsyncThunk(
  "products/getBuyerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get/buyer/products`);
      return res.data.products;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 9. Get Products by Buyer Category
export const getProductsByBuyerCategoryId = createAsyncThunk(
  "products/getByBuyerCategory",
  async (buyerCategoryId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/get/${buyerCategoryId}`);
      return res.data; // {success, products}
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 10. Update Product Buyer Category Visibility
export const updateProductBuyerCategoryVisibility = createAsyncThunk(
  "products/updateBuyerCategoryVisibility",
  async ({ productId, buyerCategory, visible }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/update-buyer-category-visibility`,
        {
          productId,
          buyerCategory,
          visible,
        }
      );
      return res.data.product; // updated product
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 11. Get Products by Connection (for Buyer)
export const getProductsByConnection = createAsyncThunk(
  "products/getProductsByConnection",
  async ({ connectionId, otherUserId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/get/products-by-connection`, {
        connectionId,
        otherUserId,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 12. Hide products for a buyerCategory
export const hideProductsByBuyerCategory = createAsyncThunk(
  "products/hideByBuyerCategory",
  async ({buyerCategoryId,productCategoryId}, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/hide-products-by-buyer-category`,
        { buyerCategoryId,productCategoryId }
      );
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    userProducts: [],
    buyerProducts: [],
    buyerCategory: null,
    page: 1,
    totalPages: 1,
    totalProducts: 0,
    productDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ------------------------------ Get All ------------------------------ */
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      /* ------------------------- Get User Products ------------------------- */
      .addCase(getUserProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.userProducts = action.payload;
      })
      .addCase(getUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      /* ----------------------- Get Buyer View Products ---------------------- */
      .addCase(getBuyerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBuyerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.buyerProducts = action.payload;
      })
      .addCase(getBuyerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      /* -------------------------- Buyer Category --------------------------- */
      .addCase(getProductsByBuyerCategoryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsByBuyerCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.products;
        state.buyerCategory = action.payload.buyerCategory;
      })
      .addCase(getProductsByBuyerCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Failed to fetch products by buyer category";
      })

      /* ---------------------------- Add Product ---------------------------- */
      .addCase(addProduct.fulfilled, (state, action) => {
        state.allProducts.push(action.payload);
      })

      /* --------------------------- Update Product -------------------------- */
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.allProducts.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.allProducts[index] = action.payload;
        }
      })

      /* --------------------------- Delete Product -------------------------- */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.allProducts = state.allProducts.filter(
          (p) => p._id !== action.payload
        );
      })
      // ------------------ Update Product Buyer Category Visibility ------------------
      .addCase(updateProductBuyerCategoryVisibility.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateProductBuyerCategoryVisibility.fulfilled,
        (state, action) => {
          state.loading = false;
          const updatedProduct = action.payload;
          const index = state.allProducts.findIndex(
            (p) => p._id === updatedProduct._id
          );
          if (index !== -1) {
            state.allProducts[index] = updatedProduct;
          }
          // Also update userProducts if needed
          const userIndex = state.userProducts.findIndex(
            (p) => p._id === updatedProduct._id
          );
          if (userIndex !== -1) {
            state.userProducts[userIndex] = updatedProduct;
          }
        }
      )
      .addCase(
        updateProductBuyerCategoryVisibility.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload?.message || "Failed to update product visibility";
        }
      )
      // ---------------------- Get Products by Connection ----------------------
      .addCase(getProductsByConnection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByConnection.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload.data || [];
        state.buyerCategory = action.payload.buyerCategory || null;
      })
      .addCase(getProductsByConnection.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch products by connection";
      })

      // ---------------------- Hide Products By Buyer Category ----------------------
      .addCase(hideProductsByBuyerCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hideProductsByBuyerCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Update the products in allProducts to reflect visibility=false for this buyerCategory
        const buyerCategoryId = action.meta.arg;

        state.allProducts = state?.allProducts?.map((product) => {
          const updatedVisibility = product?.productVisibility?.map((v) => {
            if (v.buyerCategory === buyerCategoryId) {
              return { ...v, visible: false };
            }
            return v;
          });
          return { ...product, productVisibility: updatedVisibility };
        });

        // Similarly update userProducts if needed
        state.userProducts = state.userProducts.map((product) => {
          const updatedVisibility = product.productVisibility.map((v) => {
            if (v.buyerCategory === buyerCategoryId) {
              return { ...v, visible: false };
            }
            return v;
          });
          return { ...product, productVisibility: updatedVisibility };
        });
      })
      .addCase(hideProductsByBuyerCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to hide products by buyerCategory";
      });
  },
});

export const { clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
