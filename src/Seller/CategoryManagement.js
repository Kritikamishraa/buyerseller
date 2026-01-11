// import React, { useState, useEffect } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   getAllBuyerCategories,
//   createBuyerCategory,
//   deleteBuyerCategory,
//   updateBuyerCategory,
// } from "../redux/slices/buyerCategoriesSlice";
// import {
//   getAllSellerCategories,
//   createSellerCategory,
//   deleteSellerCategory,
//   updateSellerCategory,
// } from "../redux/slices/sellerCategoriesSlice";
// import { DataGrid } from "@mui/x-data-grid";
// import { Avatar, Button } from "@mui/material";

// const styles = {
//   catalogManagement: {
//     padding: "20px",
//     fontFamily: "sans-serif",
//   },
//   hr: {
//     border: "none",
//     borderTop: "1px solid #eee",
//     margin: "20px 0",
//   },
//   addBtn: {
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "10px 15px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "16px",
//     marginBottom: "20px",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "20px",
//     overflowX: "auto",
//   },
//   th: {
//     border: "1px solid #ddd",
//     padding: "12px",
//     textAlign: "left",
//     backgroundColor: "#f2f2f2",
//   },
//   td: {
//     border: "1px solid #ddd",
//     padding: "12px",
//   },
//   actionBtn: {
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "8px 12px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "14px",
//     marginRight: "5px",
//   },
//   deleteBtn: {
//     backgroundColor: "#dc3545",
//   },
//   modalBackdrop: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   modal: {
//     backgroundColor: "white",
//     width: "400px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//     display: "flex",
//     flexDirection: "column",
//   },
//   modalHeader: {
//     padding: "15px 20px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderBottom: "1px solid #e5e5e5",
//   },
//   modalHeaderText: {
//     margin: 0,
//   },
//   closeBtn: {
//     background: "none",
//     border: "none",
//     fontSize: "24px",
//     cursor: "pointer",
//   },
//   modalBody: {
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     boxSizing: "border-box",
//   },
//   modalFooter: {
//     padding: "15px 20px",
//     display: "flex",
//     justifyContent: "flex-end",
//     gap: "10px",
//     borderTop: "1px solid #e5e5e5",
//   },
//   cancelBtn: {
//     background: "none",
//     border: "none",
//     color: "#6c757d",
//     cursor: "pointer",
//     padding: "10px 15px",
//   },
//   saveBtn: {
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     padding: "10px 15px",
//     cursor: "pointer",
//   },
// };

// function CustomTabPanel({ children, value, index, ...other }) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3, paddingLeft: 0, paddingRight: 0 }}>{children}</Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const CategoryManagement = () => {
//   const dispatch = useDispatch();

//   // Redux state for buyer categories
//   const { categories: buyerCategories } = useSelector(
//     (state) => state.buyerCategories
//   );

//   const {
//     categories: sellerCategories,
//     loading: sellerLoading,
//     error: sellerError,
//   } = useSelector((state) => state.sellerCategory);

//   // Initial Data Fetch (useEffect)
//   useEffect(() => {
//     dispatch(getAllBuyerCategories());
//     dispatch(getAllSellerCategories());
//   }, [dispatch]);

//   const [tabValue, setTabValue] = useState(0);
//   const handleTabChange = (event, newValue) => setTabValue(newValue);
//   const [buyerModalOpen, setBuyerModalOpen] = useState(false);
//   const [buyerCategoryName, setBuyerCategoryName] = useState("");
//   const [discount, setDiscount] = useState("");
//   const [editingBuyer, setEditingBuyer] = useState(null);
//   const [sellerModalOpen, setSellerModalOpen] = useState(false);
//   const [sellerCategoryName, setSellerCategoryName] = useState("");
//   const [gst, setGst] = useState("");
//   const [editingSeller, setEditingSeller] = useState(null);
//   const [sellerImageBase64, setSellerImageBase64] = useState("");
//   const [sellerImagePreview, setSellerImagePreview] = useState("");

//   const handleSellerImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setSellerImageBase64(reader.result); // base64 string
//       setSellerImagePreview(reader.result); // preview
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleOpenBuyerModal = (category = null) => {
//     if (category) {
//       setEditingBuyer(category);
//       setBuyerCategoryName(category.name);
//       setDiscount(String(category.discount));
//     } else {
//       setEditingBuyer(null);
//       setBuyerCategoryName("");
//       setDiscount("");
//     }
//     setBuyerModalOpen(true);
//   };

//   const handleSaveBuyerCategory = async () => {
//     if (!buyerCategoryName || discount === "") return;

//     const categoryData = {
//       name: buyerCategoryName,
//       discount: Number(discount),
//     };

//     try {
//       if (editingBuyer) {
//         await dispatch(
//           updateBuyerCategory({
//             id: editingBuyer._id,
//             categoryData: categoryData,
//           })
//         ).unwrap();
//         await dispatch(getAllBuyerCategories());
//         toast.success("Buyer Category Updated Successfully!");
//       } else {
//         await dispatch(createBuyerCategory(categoryData)).unwrap();
//         toast.success("Buyer Category Added Successfully!");
//       }
//       setBuyerModalOpen(false);
//     } catch (error) {
//       const errorMessage =
//         error?.message || error?.error?.message || "Unknown Error";
//       toast.error(`Failed to save buyer category: ${errorMessage}`);
//     }
//   };

//   const handleDeleteBuyerCategory = async (id) => {
//     if (
//       window.confirm("Are you sure you want to delete this buyer category?")
//     ) {
//       try {
//         await dispatch(deleteBuyerCategory(id)).unwrap();
//         await dispatch(getAllBuyerCategories());
//         toast.success("Buyer Category Deleted Successfully!");
//       } catch (error) {
//         const errorMessage =
//           error?.message || error?.error?.message || "Unknown Error";
//         toast.error(`Failed to delete buyer category: ${errorMessage}`);
//       }
//     }
//   };

//   // --- Seller Handlers ---
//   // const handleOpenSellerModal = (category = null) => {
//   //   if (category) {
//   //     setEditingSeller(category);
//   //     setSellerCategoryName(category.name);
//   //     setGst(String(category.gst));
//   //   } else {
//   //     setEditingSeller(null);
//   //     setSellerCategoryName("");
//   //     setGst("");
//   //   }
//   //   setSellerModalOpen(true);
//   // };

//   const handleOpenSellerModal = (category = null) => {
//     if (category) {
//       setEditingSeller(category);
//       setSellerCategoryName(category.name);
//       setGst(String(category.gst));
//       setSellerImageBase64(category.image || "");
//       setSellerImagePreview(category.image || "");
//     } else {
//       setEditingSeller(null);
//       setSellerCategoryName("");
//       setGst("");
//       setSellerImageBase64("");
//       setSellerImagePreview("");
//     }
//     setSellerModalOpen(true);
//   };

//   const handleSaveSellerCategory = async () => {
//     if (!sellerCategoryName || gst === "") return;

//     const categoryData = {
//       name: sellerCategoryName,
//       gst: Number(gst),
//       image: sellerImageBase64,
//     };

//     try {
//       if (editingSeller) {
//         await dispatch(
//           updateSellerCategory({
//             id: editingSeller._id,
//             categoryData: categoryData,
//           })
//         ).unwrap();
//         await dispatch(getAllSellerCategories());
//         toast.success("Product Category Updated Successfully!");
//       } else {
//         await dispatch(createSellerCategory(categoryData)).unwrap();
//         await dispatch(getAllSellerCategories());
//         toast.success("Product Category Added Successfully!");
//       }
//       setSellerModalOpen(false);
//     } catch (error) {
//       const errorMessage =
//         error?.message || error?.error?.message || "Unknown Error";
//       toast.error(`Failed to save product category: ${errorMessage}`);
//     }
//   };

//   const handleDeleteSellerCategory = async (id) => {
//     if (
//       window.confirm("Are you sure you want to delete this product category?")
//     ) {
//       try {
//         await dispatch(deleteSellerCategory(id)).unwrap();
//         await dispatch(getAllSellerCategories());
//         toast.success("Product Category Deleted Successfully!");
//       } catch (error) {
//         const errorMessage =
//           error?.message || error?.error?.message || "Unknown Error";
//         toast.error(`Failed to delete product category: ${errorMessage}`);
//       }
//     }
//   };

//   return (
//     <div style={styles.catalogManagement}>
//       <h2>Catalog Management</h2>
//       <hr style={styles.hr} />

//       {/* Tabs */}
//       <Box sx={{ width: "100%" }}>
//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             aria-label="category tabs"
//           >
//             <Tab label="Buyer Category" {...a11yProps(0)} />
//             <Tab label="Product Category" {...a11yProps(1)} />
//           </Tabs>
//         </Box>

//         {/* Buyer Category Tab */}
//         <CustomTabPanel value={tabValue} index={0}>
//           <button onClick={() => handleOpenBuyerModal()} style={styles.addBtn}>
//             Add Buyer Category
//           </button>
//           {/* Display Redux state: buyerCategories */}
//           {buyerCategories && buyerCategories.length > 0 ? (
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.th}>Name</th>
//                   <th style={styles.th}>Discount (%)</th>
//                   <th style={styles.th}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {buyerCategories.map((cat) => (
//                   <tr key={cat._id || cat.name}>
//                     <td style={styles.td}>{cat.name}</td>
//                     <td style={styles.td}>{cat.discount}%</td>
//                     <td style={styles.td}>
//                       <button
//                         onClick={() => handleOpenBuyerModal(cat)}
//                         style={styles.actionBtn}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteBuyerCategory(cat._id)}
//                         style={{
//                           ...styles.actionBtn,
//                           ...styles.deleteBtn,
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No Buyer Categories found.</p>
//           )}
//         </CustomTabPanel>

//         {/* Seller Category Tab */}
//         <CustomTabPanel value={tabValue} index={1}>
//           <button onClick={() => handleOpenSellerModal()} style={styles.addBtn}>
//             Add Product Category
//           </button>
//           {/* Display Redux state: sellerCategories */}
//           {sellerCategories && sellerCategories.length > 0 ? (
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.th}>Image</th>
//                   <th style={styles.th}>Name</th>
//                   <th style={styles.th}>GST (%)</th>
//                   <th style={styles.th}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sellerCategories.map((cat) => (
//                   <tr key={cat._id || cat.name}>
//                     <td style={styles.td}>
//                       <Avatar
//                         src={cat.image}
//                         alt={cat.name}
//                         sx={{ width: 50, height: 50 }}
//                       />
//                     </td>

//                     <td style={styles.td}>{cat.name}</td>
//                     <td style={styles.td}>{cat.gst}%</td>
//                     <td style={styles.td}>
//                       <button
//                         onClick={() => handleOpenSellerModal(cat)}
//                         style={styles.actionBtn}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteSellerCategory(cat._id)}
//                         style={{
//                           ...styles.actionBtn,
//                           ...styles.deleteBtn,
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No Seller Categories found.</p>
//           )}
//         </CustomTabPanel>
//       </Box>

//       {/* Buyer Modal */}
//       {buyerModalOpen && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modal}>
//             <div style={styles.modalHeader}>
//               <h3 style={styles.modalHeaderText}>
//                 {editingBuyer ? "Edit" : "Add"} Buyer Category
//               </h3>
//               <button
//                 onClick={() => setBuyerModalOpen(false)}
//                 style={styles.closeBtn}
//               >
//                 &times;
//               </button>
//             </div>
//             <div style={styles.modalBody}>
//               <input
//                 type="text"
//                 placeholder="Buyer Category Name *"
//                 value={buyerCategoryName}
//                 onChange={(e) => setBuyerCategoryName(e.target.value)}
//                 style={styles.input}
//               />
//               <input
//                 type="number"
//                 placeholder="Discount (%) *"
//                 value={discount}
//                 onChange={(e) => setDiscount(e.target.value)}
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.modalFooter}>
//               <button
//                 onClick={() => setBuyerModalOpen(false)}
//                 style={styles.cancelBtn}
//               >
//                 CANCEL
//               </button>
//               <button onClick={handleSaveBuyerCategory} style={styles.saveBtn}>
//                 {editingBuyer ? "SAVE" : "ADD"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Seller Modal */}
//       {sellerModalOpen && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modal}>
//             <div style={styles.modalHeader}>
//               <h3 style={styles.modalHeaderText}>
//                 {editingSeller ? "Edit" : "Add"} Product Category
//               </h3>
//               <button
//                 onClick={() => setSellerModalOpen(false)}
//                 style={styles.closeBtn}
//               >
//                 &times;
//               </button>
//             </div>
//             <div style={styles.modalBody}>
//               <input
//                 type="text"
//                 placeholder="Product Category Name *"
//                 value={sellerCategoryName}
//                 onChange={(e) => setSellerCategoryName(e.target.value)}
//                 style={styles.input}
//               />
//               <input
//                 type="number"
//                 placeholder="GST (%) *"
//                 value={gst}
//                 onChange={(e) => setGst(e.target.value)}
//                 style={styles.input}
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleSellerImageChange}
//                 style={styles.input}
//               />

//               {sellerImagePreview && (
//                 <img
//                   src={sellerImagePreview}
//                   alt="Preview"
//                   style={{
//                     width: "80px",
//                     height: "80px",
//                     objectFit: "cover",
//                     marginTop: "10px",
//                   }}
//                 />
//               )}
//             </div>
//             <div style={styles.modalFooter}>
//               <button
//                 onClick={() => setSellerModalOpen(false)}
//                 style={styles.cancelBtn}
//               >
//                 CANCEL
//               </button>
//               <button onClick={handleSaveSellerCategory} style={styles.saveBtn}>
//                 {editingSeller ? "SAVE" : "ADD"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryManagement;

import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getAllBuyerCategories,
  createBuyerCategory,
  deleteBuyerCategory,
  updateBuyerCategory,
} from "../redux/slices/buyerCategoriesSlice";

import {
  getAllSellerCategories,
  createSellerCategory,
  deleteSellerCategory,
  updateSellerCategory,
} from "../redux/slices/sellerCategoriesSlice";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CategoryManagement = () => {
  const dispatch = useDispatch();

  const { categories: buyerCategories } = useSelector(
    (state) => state.buyerCategories
  );

  const { categories: sellerCategories } = useSelector(
    (state) => state.sellerCategory
  );

  useEffect(() => {
    dispatch(getAllBuyerCategories());
    dispatch(getAllSellerCategories());
  }, [dispatch]);

  const [tab, setTab] = useState(0);
  const handleTabChange = (e, v) => setTab(v);
  const [buyerDialogOpen, setBuyerDialogOpen] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [discount, setDiscount] = useState("");
  const [editingBuyer, setEditingBuyer] = useState(null);
  const [sellerDialogOpen, setSellerDialogOpen] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [gst, setGst] = useState("");
  const [sellerImage, setSellerImage] = useState("");
  const [sellerPreview, setSellerPreview] = useState("");
  const [editingSeller, setEditingSeller] = useState(null);

  const handleSellerImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSellerImage(reader.result);
      setSellerPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const openBuyerModal = (cat = null) => {
    if (cat) {
      setEditingBuyer(cat);
      setBuyerName(cat.name);
      setDiscount(cat.discount);
    } else {
      setEditingBuyer(null);
      setBuyerName("");
      setDiscount("");
    }
    setBuyerDialogOpen(true);
  };

  const saveBuyerCategory = async () => {
    if (!buyerName || discount === "") {
      toast.error("Please fill all fields");
      return;
    }
    const data = { name: buyerName, discount: Number(discount) };
    try {
      if (editingBuyer) {
        await dispatch(
          updateBuyerCategory({ id: editingBuyer._id, categoryData: data })
        ).unwrap();
        toast.success("Buyer Category Updated");
      } else {
        await dispatch(createBuyerCategory(data)).unwrap();
        toast.success("Buyer Category Added");
      }
      dispatch(getAllBuyerCategories());
      setBuyerDialogOpen(false);
    } catch (e) {
      toast.error("Failed to save");
    }
  };

  const deleteBuyer = async (id) => {
    if (!window.confirm("Delete this buyer category?")) return;
    await dispatch(deleteBuyerCategory(id)).unwrap();
    dispatch(getAllBuyerCategories());
    toast.success("Buyer Category Deleted");
  };

  const openSellerModal = (cat = null) => {
    if (cat) {
      setEditingSeller(cat);
      setSellerName(cat.name);
      setGst(cat.gst);
      setSellerImage(cat.image);
      setSellerPreview(cat.image);
    } else {
      setEditingSeller(null);
      setSellerName("");
      setGst("");
      setSellerImage("");
      setSellerPreview("");
    }
    setSellerDialogOpen(true);
  };

  const saveSellerCategory = async () => {
    if (!sellerName || gst === "") return;

    const data = {
      name: sellerName,
      gst: Number(gst),
      image: sellerImage,
    };

    try {
      if (editingSeller) {
        await dispatch(
          updateSellerCategory({ id: editingSeller._id, categoryData: data })
        ).unwrap();
        toast.success("Product Category Updated");
      } else {
        await dispatch(createSellerCategory(data)).unwrap();
        toast.success("Product Category Added");
      }
      dispatch(getAllSellerCategories());
      setSellerDialogOpen(false);
    } catch (e) {
      toast.error("Error");
    }
  };

  const deleteSeller = async (id) => {
    if (!window.confirm("Delete product category?")) return;
    await dispatch(deleteSellerCategory(id)).unwrap();
    dispatch(getAllSellerCategories());
    toast.success("Product Category Deleted");
  };

  const [pageBuyer, setPageBuyer] = useState(0);
  const [rowsBuyer, setRowsBuyer] = useState(5);
  const [pageSeller, setPageSeller] = useState(0);
  const [rowsSeller, setRowsSeller] = useState(5);

  return (
    <Box sx={{ p: 3 }}>
      <h2>Category Management</h2>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Buyer Category" {...a11yProps(0)} />
        <Tab label="Product Category" {...a11yProps(1)} />
      </Tabs>
      <hr />
      {tab === 0 && (
        <>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => openBuyerModal()}>
            Add Buyer Category
          </Button>
          <Paper sx={{ mt: 3 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                   <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Discount (%)</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {buyerCategories
                    ?.slice(pageBuyer * rowsBuyer, pageBuyer * rowsBuyer + rowsBuyer)
                    .map((cat, index) => (
                      <TableRow key={cat._id}>
                         <TableCell>{index+1}</TableCell>
                        <TableCell>{cat.name}</TableCell>
                        <TableCell>{cat.discount}%</TableCell>
                        <TableCell>
                          <Button onClick={() => openBuyerModal(cat)}>Edit</Button>
                          <Button color="error" onClick={() => deleteBuyer(cat._id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={buyerCategories?.length || 0}
              page={pageBuyer}
              onPageChange={(e, n) => setPageBuyer(n)}
              rowsPerPage={rowsBuyer}
              onRowsPerPageChange={(e) => {
                setRowsBuyer(parseInt(e.target.value, 10));
                setPageBuyer(0);
              }}
            />
          </Paper>
        </>
      )}

      {/* ---------------- Seller Category ---------------- */}
      {tab === 1 && (
        <>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => openSellerModal()}>
            Add Product Category
          </Button>

          <Paper sx={{ mt: 3 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>GST (%)</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {sellerCategories
                    ?.slice(pageSeller * rowsSeller, pageSeller * rowsSeller + rowsSeller)
                    .map((cat, index) => (
                      <TableRow key={cat._id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>
                          <Avatar src={cat.image} sx={{ width: 50, height: 50 }} />
                        </TableCell>
                        <TableCell>{cat.name}</TableCell>
                        <TableCell>{cat.gst}%</TableCell>
                        <TableCell>
                          <Button onClick={() => openSellerModal(cat)}>Edit</Button>
                          <Button color="error" onClick={() => deleteSeller(cat._id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={sellerCategories?.length || 0}
              page={pageSeller}
              onPageChange={(e, n) => setPageSeller(n)}
              rowsPerPage={rowsSeller}
              onRowsPerPageChange={(e) => {
                setRowsSeller(parseInt(e.target.value, 10));
                setPageSeller(0);
              }}
            />
          </Paper>
        </>
      )}

      {/* Buyer Dialog */}
      <Dialog open={buyerDialogOpen} onClose={() => setBuyerDialogOpen(false)} fullWidth>
        <DialogTitle>{editingBuyer ? "Edit Buyer Category" : "Add Buyer Category"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Buyer Category Name"
            sx={{ mt: 2 }}
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />

          <TextField
            fullWidth
            type="number"
            label="Discount (%)"
            sx={{ mt: 2 }}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setBuyerDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveBuyerCategory}>
            {editingBuyer ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={sellerDialogOpen} onClose={() => setSellerDialogOpen(false)} fullWidth>
        <DialogTitle>
          {editingSeller ? "Edit Product Category" : "Add Product Category"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Product Category Name"
            sx={{ mt: 2 }}
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
          />

          <TextField
            fullWidth
            type="number"
            label="GST (%)"
            sx={{ mt: 2 }}
            value={gst}
            onChange={(e) => setGst(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            style={{ marginTop: "20px" }}
            onChange={handleSellerImageChange}
          />

          {sellerPreview && (
            <Avatar
              src={sellerPreview}
              sx={{ width: 80, height: 80, mt: 2, borderRadius: 1 }}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSellerDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveSellerCategory}>
            {editingSeller ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManagement;
