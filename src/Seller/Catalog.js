import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  useTheme,
  InputAdornment,
  useMediaQuery,
  TableContainer,
  Menu,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBuyerCategoryDialog from "./AddBuyerCategoryDialog";
import AddSellerCategoryDialog from "./AddSellerCategoryDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBuyerCategories,
  createBuyerCategory,
} from "../redux/slices/buyerCategoriesSlice";
import {
  getAllSellerCategories,
  createSellerCategory,
} from "../redux/slices/sellerCategoriesSlice";
import {
  getUserProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByBuyerCategoryId,
  updateProductBuyerCategoryVisibility,
  hideProductsByBuyerCategory,
} from "../redux/slices/sellerProductSlice";
import DownloadCSV from "./DownloadCSV";
import ConfirmDialog from "../Components/ConfirmDialog";
import { toast } from "react-toastify";

export default function Catalog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [productsByBuyerCategory, setProductsByBuyerCategory] = useState([]);
  const [selectedBuyerCategoryId, setSelectedBuyerCategoryId] = useState(null);
  const [selectedBuyerCategory, setSelectedBuyerCategory] =
    useState("MRP Catalog");

  const {
    categories: buyerCategories,
    loading,
    error,
  } = useSelector((state) => state.buyerCategories);

  useEffect(() => {
    dispatch(getAllBuyerCategories());
  }, [dispatch]);

  useEffect(() => {
    const category = buyerCategories.find(
      (b) => b.name === selectedBuyerCategory
    );
    if (category) {
    } else {
      setProductsByBuyerCategory([]);
    }
  }, [selectedBuyerCategory, buyerCategories]);

  const {
    categories: sellerCategories,
    loading: sellerLoading,
    error: sellerError,
  } = useSelector((state) => state.sellerCategory);

  useEffect(() => {
    dispatch(getAllSellerCategories());
  }, [dispatch]);

  const { userProducts, loading: productLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getUserProducts());
  }, [dispatch]);

  // Current buyer category object
  const currentBuyer = buyerCategories.find(
    (b) => b.name === selectedBuyerCategory
  );
  const categories =
    selectedBuyerCategory === "MRP Catalog"
      ? Array.from(new Set(sellerCategories.map((c) => c.name)))
      : currentBuyer
      ? sellerCategories
          .filter((c) => c.buyerCategory === selectedBuyerCategory)
          .map((c) => c.name)
      : [];
  const [addProductCategories, setAddProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openAddBuyerCategory, setOpenAddBuyerCategory] = useState(false);
  const [openAddProductCategory, setOpenAddProductCategory] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    mrp: "",
    description: "",
    specifications: "",
    image: "",
    imageFile: null,
    unit: "",
    customUnit: "",
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [openUploadXLSX, setOpenUploadXLSX] = useState(false);
  const [xlsxFile, setXlsxFile] = useState(null);
  const [xlsxData, setXlsxData] = useState([]);
  const [newBuyerCategory, setNewBuyerCategory] = useState({
    name: "",
    discount: "",
  });
  const visibleCategories = buyerCategories.slice(0, 4);
  const extraCategories = buyerCategories.slice(4);
  const [anchorMore, setAnchorMore] = useState(null);
  const handleMoreOpen = (e) => setAnchorMore(e.currentTarget);
  const handleMoreClose = () => setAnchorMore(null);
  const [newProductCategory, setNewProductCategory] = useState({
    name: "",
    gst: "",
  });
  const [anchorMoreSeller, setAnchorMoreSeller] = useState(null);
  const handleMoreSellerOpen = (e) => setAnchorMoreSeller(e.currentTarget);
  const handleMoreSellerClose = () => setAnchorMoreSeller(null);
  const visibleSellerCategories = sellerCategories.slice(0, 4);
  const extraSellerCategories = sellerCategories.slice(4);

  // === EDIT / ACTIONS STATES ===
  // Full Edit dialog (for MRP Catalog)
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: "",
    unit: "",
    customUnit: "",
    category: null,
    mrp: "",
    price: "",
    description: "",
    specifications: "",
    image: "",
    imageFile: null,
  });
  const [openFullEdit, setOpenFullEdit] = useState(false);

  // Price-only Edit dialog (for Buyer Category)
  const [openPriceEdit, setOpenPriceEdit] = useState(false);
  const [priceEditProduct, setPriceEditProduct] = useState({
    _id: "",
    price: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [actionProductId, setActionProductId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: null,
  });

  useEffect(() => {
    if (!newProduct.buyerCategory === "MRP Catalog") return;

    const buyerId = newProduct.buyerCategory;
    const filteredCategories = sellerCategories.filter(
      (c) => c.buyerCategory === buyerId
    );
    setAddProductCategories(filteredCategories);
    setNewProduct((prev) => ({ ...prev, category: "" }));
  }, [newProduct.buyerCategory, sellerCategories]);

  let filteredProducts = [];
  if (selectedBuyerCategory === "MRP Catalog") {
    filteredProducts =
      selectedCategory === "All"
        ? userProducts
        : userProducts.filter(
            (p) => p.category?.name === selectedCategory?.name
          );
  } else {
    const buyerProducts = productsByBuyerCategory?.products || [];
    filteredProducts =
      selectedCategory === "All"
        ? buyerProducts
        : buyerProducts.filter(
            (p) => p.category?.name === selectedCategory?.name
          );
  }

  // XLSX Upload Handlers
  const handleUploadXLSXOpen = () => {
    setOpenUploadXLSX(true);
    setXlsxFile(null);
    setXlsxData([]);
    setUploadProgress(0);
  };

  const handleUploadXLSXClose = () => {
    setOpenUploadXLSX(false);
    setXlsxFile(null);
    setXlsxData([]);
    setUploadProgress(0);
  };

  const handleXLSXFileSelect = async (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls"))
    ) {
      setXlsxFile(file);
      await parseXLSXFile(file);
    } else {
      toast.info("Please select a valid Excel file (.xlsx or .xls)");
    }
  };

  const parseXLSXFile = async (file) => {
    try {
      const XLSX = await import("xlsx");
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const expectedHeaders = [
          "name",
          "category",
          "mrp",
          "description",
          "specifications",
          "image",
        ];
        if (jsonData.length > 0) {
          const firstRow = jsonData[0];
          const actualHeaders = Object.keys(firstRow);
          const isValidXLSX = expectedHeaders.every((header) =>
            actualHeaders.includes(header)
          );

          if (!isValidXLSX) {
            toast.info(
              "Invalid Excel format. Please use the template from Download XLSX."
            );
            return;
          }
        }
        const parsedData = [];
        jsonData.forEach((row) => {
          if (row.name && row.category && row.mrp !== undefined) {
            parsedData.push({
              name: row.name || "",
              category: row.category || "",
              mrp: row.mrp.toString() || "",
              description: row.description || "",
              specifications: row.specifications || "",
              image: row.image || "",
            });
          }
        });

        setXlsxData(parsedData);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      toast.error(
        "Error reading Excel file. Please make sure it is a valid Excel file."
      );
    }
  };

  const handleBulkUpload = async () => {
    if (!xlsxData.length) {
      toast.warning("No valid data to upload");
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const totalProducts = xlsxData.length;
      let successCount = 0;
      let errorCount = 0;
      for (let i = 0; i < xlsxData.length; i++) {
        const product = xlsxData[i];
        try {
          const category = sellerCategories.find(
            (cat) => cat.name.toLowerCase() === product.category.toLowerCase()
          );
          if (!category) {
            toast.warning(`Category not found: ${product.category}`);
            errorCount++;
            continue;
          }
          const formData = new FormData();
          formData.append("name", product.name);
          formData.append("category", category._id);
          formData.append("mrp", product.mrp);
          formData.append("description", product.description || "");
          formData.append("specifications", product.specifications || "");
          formData.append("image", product.image || "");
          await dispatch(addProduct(formData)).unwrap();
          successCount++;
          // Update progress
          setUploadProgress(Math.round(((i + 1) / totalProducts) * 100));
        } catch (error) {
          errorCount++;
        }
      }
      setIsUploading(false);
      if (successCount > 0) {
        toast.success(
          `Successfully uploaded ${successCount} products. ${errorCount} failed.`
        );
        handleUploadXLSXClose();
        dispatch(getUserProducts());
      } else {
        toast.error(
          "Failed to upload any products. Please check your Excel data."
        );
      }
    } catch (error) {
      setIsUploading(false);
      toast.error("Bulk upload failed: " + (error.message || "Unknown error"));
    }
  };

  // Handlers for Add Product Dialog
  const handleAddProductOpen = () => {
    setNewProduct({
      name: "",
      category: "",
      mrp: "",
      unit: "",
      customUnit: "",
      description: "",
      specifications: "",
      image: "",
      imageFile: null,
    });
    setOpenAddProduct(true);
  };

  const handleAddProductClose = () => {
    setOpenAddProduct(false);
    setNewProduct({
      name: "",
      category: "",
      mrp: "",
      unit: "",
      customUnit: "",
      description: "",
      specifications: "",
      image: "",
      imageFile: null,
    });
  };

  const handleAddProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add Product submit handler with image upload
  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category || !newProduct.mrp) {
      toast.warning("Please fill all fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category", newProduct.category);
    formData.append("mrp", newProduct.mrp);
    const finalUnit =
      newProduct.unit === "other" ? newProduct.customUnit : newProduct.unit;
    formData.append("unit", finalUnit);
    formData.append("description", newProduct.description || "");
    formData.append("specifications", newProduct.specifications || "");
    formData.append("user", user?._id);
    formData.append("image", newProduct.image);
    try {
      await dispatch(addProduct(formData)).unwrap();
      await dispatch(getUserProducts({ page: 1, limit: 100 }));
      toast.success("Product added successfully");
      handleAddProductClose();
    } catch (err) {
      toast.error(err?.message || "Failed to add product");
    }
  };

  // -------------------------
  // FULL EDIT (MRP Catalog) Handlers
  // -------------------------
  const handleFullEditOpen = (product) => {
    const buyerProduct = productsByBuyerCategory?.products?.find(
      (p) => p._id === product._id
    );
    const priceToShow = buyerProduct?.buyerCategory?.price ?? product.price;
    const isCustomUnit = !["kgs", "meters", "pieces"].includes(
      (product.unit || "").toLowerCase()
    );
    const displayUnit = isCustomUnit ? "other" : product.unit || "";

    setEditProduct({
      ...product,
      price: priceToShow,
      unit: displayUnit,
      customUnit: isCustomUnit ? product.unit : "",
    });

    setEditProductId(product?._id);
    setOpenFullEdit(true);
    setAnchorEl(null);
    setActionProductId(null);
  };

  const handleFullEditClose = async () => {
    setOpenFullEdit(false);
    setEditProductId(null);
    setEditProduct({
      name: "",
      category: "",
      price: "",
      unit: "",
      customUnit: "",
      mrp: "",
    });
    await dispatch(getUserProducts({ page: 1, limit: 100 }));
  };

  const handleFullEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "unit") {
      setEditProduct((prev) => ({
        ...prev,
        unit: value,
        customUnit: value === "other" ? prev.customUnit : "",
      }));
    } else {
      setEditProduct((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Edit product submit handler with image upload (full edit)
  const handleFullEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!editProduct.name || !editProduct.category || !editProduct.price) {
        toast.warning("Please fill all required fields");
        return;
      }
      const categoryId = editProduct.category?._id || editProduct.category;
      if (!categoryId) {
        toast.warning("Please select valid categories");
        return;
      }
      if (!selectedBuyerCategoryId) {
        toast.warning("Please select a valid buyer category");
        return;
      }
      // Calculate final unit
      const finalUnit =
        editProduct.unit === "other" ? editProduct.customUnit : editProduct.unit;
      const formData = new FormData();
      formData.append("name", editProduct.name || "");
      formData.append("unit", finalUnit);
      formData.append("category", categoryId);
      formData.append("mrp", editProduct.mrp?.toString() || "0");
      formData.append("price", editProduct.price?.toString() || "0");
      formData.append("user", user?._id || "");
      formData.append("description", editProduct.description || "");
      formData.append("specifications", editProduct.specifications || "");
      formData.append("buyerCategory", selectedBuyerCategoryId || "");
      if (editProduct.imageFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          formData.append("image", reader.result);
          try {
            await dispatch(
              updateProduct({ id: editProductId, formData })
            ).unwrap();
            await dispatch(getUserProducts({ page: 1, limit: 100 }));
            handleFullEditClose();

            if (editProduct.image && editProduct.image.startsWith("blob:")) {
              URL.revokeObjectURL(editProduct.image);
            }
          } catch (err) {
            toast.error(err?.message || "Failed to update product");
          }
        };
        reader.readAsDataURL(editProduct.imageFile);
        return;
      }

      if (editProduct.image) {
        formData.append("image", editProduct.image);
      }
      await dispatch(updateProduct({ id: editProductId, formData })).unwrap();
      await dispatch(getUserProducts({ page: 1, limit: 100 }));
      handleFullEditClose();
    } catch (err) {
      toast.error(err?.message || "Failed to update product");
    }
  };

  // -------------------------
  // PRICE-ONLY (Buyer Category) Handlers
  // -------------------------
  const handlePriceEditOpen = (product) => {
    const buyerProduct = productsByBuyerCategory?.products?.find(
      (p) => p._id === product._id
    );

    setPriceEditProduct({
      _id: product._id,
      price: buyerProduct?.buyerCategory?.price ?? product.price ?? "",
    });

    setOpenPriceEdit(true);
    setAnchorEl(null);
    setActionProductId(null);
  };

  const handlePriceEditClose = () => {
    setOpenPriceEdit(false);
    setPriceEditProduct({ _id: "", price: "" });
  };

  const handlePriceUpdateSubmit = async () => {
    try {
      if (!priceEditProduct._id) {
        toast.info("Invalid product selected");
        return;
      }
      if (priceEditProduct.price === "" || priceEditProduct.price === null) {
        toast.warning("Please enter a valid price");
        return;
      }
      const formData = new FormData();
      formData.append("price", priceEditProduct.price?.toString() || "0");
      // If buyer category id is relevant in API, ensure to append buyerCategory
      if (selectedBuyerCategoryId) {
        formData.append("buyerCategory", selectedBuyerCategoryId);
      }

      await dispatch(
        updateProduct({ id: priceEditProduct._id, formData })
      ).unwrap();

      toast.success("Price updated!");
      setOpenPriceEdit(false);
      setPriceEditProduct({ _id: "", price: "" });
      // Refresh lists
      if (selectedBuyerCategory === "MRP Catalog") {
        await dispatch(getUserProducts({ page: 1, limit: 100 }));
      } else {
        await dispatch(getProductsByBuyerCategoryId(selectedBuyerCategoryId));
        await dispatch(getUserProducts({ page: 1, limit: 100 }));
      }
    } catch (err) {
      toast.error(err?.message || "Price update failed");
    }
  };

  // Actions menu handlers
  const handleActionsMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActionProductId(id);
  };

  const handleActionsMenuClose = () => {
    setAnchorEl(null);
    setActionProductId(null);
  };

  // Toggle product visibility handler
  const handleToggleProductVisible = async (productId) => {
    try {
      const productInBuyerCategory = productsByBuyerCategory?.products?.find(
        (p) => p._id === productId
      );
      if (!productInBuyerCategory) {
        toast.info("Product not found in buyer category");
        return;
      }
      const currentVisibility =
        productInBuyerCategory.buyerCategory?.visible ?? false;
      const newVisibility = !currentVisibility;
      // API call to update visibility
      await dispatch(
        updateProductBuyerCategoryVisibility({
          productId,
          buyerCategory: selectedBuyerCategoryId,
          visible: newVisibility,
        })
      ).unwrap();
      await dispatch(getUserProducts({ page: 1, limit: 100 }));
      setProductsByBuyerCategory((prev) => ({
        ...prev,
        products: prev.products?.map((p) =>
          p._id === productId
            ? {
                ...p,
                buyerCategory: {
                  ...p.buyerCategory,
                  visible: newVisibility,
                },
              }
            : p
        ),
      }));
    } catch (error) {
      toast.error("Failed to update visibility");
    }
  };

  // Buyer category selection handler
  const handleBuyerCategorySelect = async (category) => {
    setSelectedBuyerCategory(category.name || category);
    setSelectedBuyerCategoryId(category._id);
    setSelectedCategory("All");
    if (category._id) {
      dispatch(getProductsByBuyerCategoryId(category._id));
    }
  };

  useEffect(() => {
    if (selectedBuyerCategoryId) {
      const fetchProducts = async () => {
        try {
          const resultAction = await dispatch(
            getProductsByBuyerCategoryId(selectedBuyerCategoryId)
          ).unwrap();
          setProductsByBuyerCategory(resultAction || []);
        } catch (err) {
          toast.error("Failed to fetch products by buyer category:", err);
        }
      };
      fetchProducts();
    } else {
      setProductsByBuyerCategory([]);
    }
  }, [selectedBuyerCategoryId, dispatch]);

  const handleAddBuyerCategoryClose = () => {
    setOpenAddBuyerCategory(false);
    setNewBuyerCategory({ name: "", discount: "" });
  };

  const handleAddBuyerCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewBuyerCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBuyerCategorySubmit = async (e) => {
    e.preventDefault();
    if (!newBuyerCategory.name || newBuyerCategory.discount === "") {
      toast.warning("Please fill all fields");
      return;
    }
    // dispatch API call
    dispatch(createBuyerCategory(newBuyerCategory));
    handleAddBuyerCategoryClose();
  };

  // Add Product Category handlers with GST field
  const handleAddProductCategoryClose = () => {
    setOpenAddProductCategory(false);
    setNewProductCategory({ name: "", gst: "" });
  };

  const handleAddProductCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewProductCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProductCategorySubmit = (e) => {
    e.preventDefault();
    if (!newProductCategory.name || newProductCategory.gst === "") {
      toast.info("Please fill all fields");
      return;
    }
    if (categories?.includes(newProductCategory?.name)) {
      toast.warning("This category already exists in current buyer category");
      return;
    }

    // Dispatch Redux update
    dispatch(createSellerCategory(newProductCategory));
    dispatch(getAllSellerCategories());
    handleAddProductCategoryClose();
  };

  // Delete product handler
  const handleDeleteProduct = (id, productName) => {
    setConfirmDialog({
      open: true,
      title: "Delete Product",
      content: `Are you sure you want to delete "${productName}"?`,
      onConfirm: () => performDeleteProduct(id),
      severity: "error",
      confirmText: "Delete",
    });
    handleActionsMenuClose();
  };

  // Actual delete function
  const performDeleteProduct = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(getUserProducts({ page: 1, limit: 100 }));
      setConfirmDialog((prev) => ({ ...prev, open: false }));

      toast.success("Product deleted successfully!");
    } catch (err) {
      toast.error(err?.message || "Failed to delete product");
      setConfirmDialog((prev) => ({ ...prev, open: false }));
    }
  };

  // Confirm dialog close handler
  const handleConfirmDialogClose = () => {
    setConfirmDialog((prev) => ({ ...prev, open: false }));
  };

  // Updated hide products function with category
  const handleHideProducts = async (buyerCategoryId, productCategoryId) => {
    try {
      if (!buyerCategoryId || !productCategoryId) {
        toast.warning("Please select both buyer category and product category");
        return;
      }
      const res = await dispatch(
        hideProductsByBuyerCategory({
          buyerCategoryId,
          productCategoryId: selectedCategory._id,
        })
      );

      if (res?.payload?.success) {
        toast.success(
          res.payload.message || "Visibility updated successfully!"
        );
        if (selectedBuyerCategory === "MRP Catalog") {
          await dispatch(getUserProducts({ page: 1, limit: 100 }));
        } else {
          await dispatch(getProductsByBuyerCategoryId(selectedBuyerCategoryId));
        }
      } else {
        toast.error(res?.payload?.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to update visibility!");
    }
  };

  useEffect(() => {
    if (
      selectedBuyerCategory === "MRP Catalog" &&
      sellerCategories.length > 0
    ) {
      const firstCategory = sellerCategories[0];
      setSelectedCategory(firstCategory);
    }
  }, [selectedBuyerCategory, sellerCategories]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 2, sm: 4, md: 7, lg: 12 },
        py: { xs: 2, sm: 4, md: 5 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          width: "100%",
          mx: "auto",
          paddingRight: "10px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            mb: 3,
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={700}
            color="text.primary"
            sx={{ mb: isMobile ? 2 : 0 }}
          >
            Catalog Management
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box mb={-2}>
              <DownloadCSV />
            </Box>
            <Button
              variant="outlined"
              startIcon={<CloudUploadOutlinedIcon />}
              sx={{
                bgcolor: "white",
                px: 1.5,
                minWidth: 36,
                fontWeight: 600,
                fontSize: 14,
                borderColor: "#95a4d7",
                "&:hover": {
                  bgcolor: "rgba(30, 94, 255, 0.1)",
                },
              }}
              onClick={handleUploadXLSXOpen}
            >
              Upload XLSX
            </Button>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                bgcolor: "#1344a4",
                px: 2,
                minWidth: 110,
                fontWeight: 700,
                fontSize: 16,
                "&:hover": {
                  bgcolor: "#0e3877",
                },
              }}
              onClick={handleAddProductOpen}
            >
              Add Product
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: 1,
            mb: 3,
            overflowX: isMobile ? "visible" : "auto",
          }}
        >
          <Button
            variant={
              selectedBuyerCategory === "MRP Catalog" ? "contained" : "outlined"
            }
            onClick={() => handleBuyerCategorySelect("MRP Catalog")}
            sx={{
              borderRadius: "40px",
              minWidth: 100,
              fontWeight: 700,
              px: 2,
              bgcolor:
                selectedBuyerCategory === "MRP Catalog" ? "#1344a4" : "white",
              color:
                selectedBuyerCategory === "MRP Catalog" ? "white" : "#1344a4",
            }}
          >
            MRP Catalog
          </Button>
          {visibleCategories.map((cat) => (
            <Button
              key={cat._id}
              variant={
                selectedBuyerCategory === cat.name ? "contained" : "outlined"
              }
              onClick={() => handleBuyerCategorySelect(cat)}
              sx={{
                borderRadius: "40px",
                minWidth: 100,
                fontWeight: 700,
                px: 2,
                bgcolor:
                  selectedBuyerCategory === cat.name ? "#1344a4" : "white",
                color: selectedBuyerCategory === cat.name ? "white" : "#1344a4",
              }}
            >
              {cat.name}
            </Button>
          ))}
          {extraCategories.length > 0 && (
            <>
              <Button
                variant="outlined"
                onClick={handleMoreOpen}
                sx={{
                  borderRadius: "40px",
                  minWidth: 100,
                  fontWeight: 700,
                  px: 2,
                  color: "#1344a4",
                }}
              >
                More
              </Button>
              <Menu
                anchorEl={anchorMore}
                open={Boolean(anchorMore)}
                onClose={handleMoreClose}
              >
                {extraCategories.map(({ name }) => (
                  <MenuItem
                    key={name}
                    onClick={() => {
                      handleBuyerCategorySelect(name);
                      handleMoreClose();
                    }}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: 1,
            mb: 3,
            overflowX: isMobile ? "visible" : "auto",
          }}
        >
          {visibleSellerCategories?.map((cat) => (
            <Button
              key={cat._id}
              variant={
                selectedCategory?.name === cat.name ? "contained" : "outlined"
              }
              onClick={() => setSelectedCategory(cat)}
              sx={{
                borderRadius: "40px",
                minWidth: 140,
                fontWeight: 700,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                textTransform: "none",
                mb: 1,
              }}
            >
              {cat.image && (
                <Avatar
                  src={cat.image}
                  sx={{ width: 30, height: 30, borderRadius: 50 }}
                />
              )}
              {cat.name}
            </Button>
          ))}
          {extraSellerCategories.length > 0 && (
            <>
              <Button
                variant="outlined"
                onClick={handleMoreSellerOpen}
                sx={{
                  borderRadius: "40px",
                  minWidth: 100,
                  fontWeight: 700,
                  px: 2,
                }}
              >
                More
              </Button>
              <Menu
                anchorEl={anchorMoreSeller}
                open={Boolean(anchorMoreSeller)}
                onClose={handleMoreSellerClose}
              >
                {extraSellerCategories.map((cat) => (
                  <MenuItem
                    key={cat._id}
                    onClick={() => {
                      setSelectedCategory(cat);
                      handleMoreSellerClose();
                    }}
                  >
                    {cat.name}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>

        {selectedBuyerCategoryId && selectedCategory?._id && (
          <Button
            variant="outlined"
            onClick={() =>
              handleHideProducts(selectedBuyerCategoryId, selectedCategory._id)
            }
            sx={{ mt: 2, mb: 2 }}
          >
            Hide Products for {selectedCategory?.name || "Selected Category"}
          </Button>
        )}

        {selectedBuyerCategoryId && !selectedCategory?._id && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, mb: 2 }}
          >
            Select a product category to hide products
          </Typography>
        )}
        {/* Product Table */}
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer>
            <Box sx={{ overflowX: "auto" }}>
              <TableContainer>
                <Table stickyHeader sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      {selectedBuyerCategory === "MRP Catalog" ? (
                        <>
                          <TableCell>MRP</TableCell>
                          <TableCell>Actions</TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>Unit</TableCell>
                          <TableCell>MRP</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Visible</TableCell>
                          <TableCell>Change Price</TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts?.map((product, index) => {
                      const buyerProduct =
                        productsByBuyerCategory?.products?.find(
                          (p) => p._id === product._id
                        );

                      const priceToShow =
                        buyerProduct?.buyerCategory?.price ?? product.price;

                      return (
                        <TableRow key={product._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: "#e7fafc",
                                color: "#a0b7a8",
                                fontWeight: 700,
                                fontSize: 15,
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 8,
                                  }}
                                />
                              ) : (
                                "IMG"
                              )}
                            </Box>
                          </TableCell>
                          <TableCell
                            sx={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.name}
                          </TableCell>
                          <TableCell>{product.category?.name}</TableCell>
                          {selectedBuyerCategory === "MRP Catalog" ? (
                            <>
                              <TableCell>{product.mrp?.toFixed(2)}</TableCell>
                              <TableCell>
                                <IconButton
                                  onClick={(e) =>
                                    handleActionsMenuOpen(e, product._id)
                                  }
                                  size="small"
                                  sx={{ p: 0.5 }}
                                >
                                  <MoreHorizIcon />
                                </IconButton>
                                <Menu
                                  anchorEl={anchorEl}
                                  open={
                                    actionProductId === product._id &&
                                    Boolean(anchorEl)
                                  }
                                  onClose={handleActionsMenuClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleActionsMenuClose();
                                      // In MRP Catalog -> open full edit
                                      handleFullEditOpen(product);
                                    }}
                                  >
                                    <ListItemIcon>
                                      <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      handleDeleteProduct(
                                        product._id,
                                        product.name
                                      )
                                    }
                                  >
                                    <ListItemIcon>
                                      <DeleteIcon
                                        fontSize="small"
                                        color="error"
                                      />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                  </MenuItem>
                                </Menu>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell>{product.unit}</TableCell>
                              <TableCell>{product.mrp?.toFixed(2)}</TableCell>
                              <TableCell>{priceToShow?.toFixed(2)}</TableCell>
                              <TableCell>
                                <Switch
                                  checked={
                                    buyerProduct?.buyerCategory?.visible ?? false
                                  }
                                  onChange={() =>
                                    handleToggleProductVisible(product._id)
                                  }
                                  color="primary"
                                  size="small"
                                />
                              </TableCell>
<TableCell>
  <Button
    variant="text"
    sx={{ color: "#1344a4", fontWeight: 600, textTransform: "none" }}
    onClick={() => handlePriceEditOpen(product)}
  >
    Edit
  </Button>
</TableCell>

{/* <TableCell>
  <Button
    variant="text"
    sx={{ color: "#1344a4", fontWeight: 600, textTransform: "none" }}
    onClick={() => handlePriceEditOpen(product)}
  >
    Change Price
  </Button>
</TableCell> */}

                              {/* <TableCell>
                                <IconButton
                                  onClick={(e) =>
                                    handleActionsMenuOpen(e, product._id)
                                  }
                                  size="small"
                                  sx={{ p: 0.5 }}
                                >
                                  <MoreHorizIcon />
                                </IconButton>
                                <Menu
                                  anchorEl={anchorEl}
                                  open={
                                    actionProductId === product._id &&
                                    Boolean(anchorEl)
                                  }
                                  onClose={handleActionsMenuClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleActionsMenuClose();
                                      // In Buyer Category -> open price-only edit
                                      handlePriceEditOpen(product);
                                    }}
                                  >
                                    <ListItemIcon>
                                      <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      handleDeleteProduct(
                                        product._id,
                                        product.name
                                      )
                                    }
                                  >
                                    <ListItemIcon>
                                      <DeleteIcon
                                        fontSize="small"
                                        color="error"
                                      />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                  </MenuItem>
                                </Menu>
                              </TableCell> */}
                            </>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TableContainer>
        </Box>
      </Box>

      {/* ---------------------------
          XLSX Upload Dialog
         --------------------------- */}
      <Dialog
        open={openUploadXLSX}
        onClose={handleUploadXLSXClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Upload Excel File
          <IconButton
            onClick={handleUploadXLSXClose}
            sx={{ position: "absolute", right: 12, top: 12 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 1, sm: 3 }, py: 2 }} dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Upload an Excel file (.xlsx) with the following columns: name,
              category, mrp, description, specifications, image
            </Typography>

            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadOutlinedIcon />}
              sx={{ py: 1.5 }}
            >
              Select Excel File
              <input
                type="file"
                accept=".xlsx,.xls"
                hidden
                onChange={handleXLSXFileSelect}
              />
            </Button>

            {xlsxFile && (
              <Typography variant="body2">
                Selected file: {xlsxFile.name}
              </Typography>
            )}

            {xlsxData.length > 0 && (
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Found {xlsxData.length} products to upload:
                </Typography>
                <Box
                  sx={{
                    maxHeight: 200,
                    overflow: "auto",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  {xlsxData.map((product, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ fontSize: "0.8rem", py: 0.5 }}
                    >
                      • {product.name} - {product.category} - ₹{product.mrp}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}

            {isUploading && (
              <Box sx={{ width: "100%" }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Uploading... {uploadProgress}%
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: 8,
                    bgcolor: "#f0f0f0",
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      width: `${uploadProgress}%`,
                      height: "100%",
                      bgcolor: "#1344a4",
                      borderRadius: 4,
                      transition: "width 0.3s ease",
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleUploadXLSXClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button
            onClick={handleBulkUpload}
            variant="contained"
            disabled={!xlsxData.length || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Products"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---------------------------
          Add Product Dialog
         --------------------------- */}
      <Dialog
        open={openAddProduct}
        onClose={handleAddProductClose}
        fullWidth
        maxWidth="sm"
        scroll="body"
      >
        <DialogTitle>
          Add Product
          <IconButton
            onClick={handleAddProductClose}
            sx={{ position: "absolute", right: 12, top: 12 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 1, sm: 3 }, py: 2 }} dividers>
          <Box
            component="form"
            onSubmit={handleAddProductSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Product Category"
              name="category"
              value={newProduct.category}
              onChange={handleAddProductChange}
              select
              required
              fullWidth
              size="small"
            >
              {sellerCategories?.map((cat) => (
                <MenuItem key={cat?._id} value={cat?._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleAddProductChange}
              required
              fullWidth
              size="small"
            />
            {/* Unit Selection */}
            <TextField
              label="Unit"
              name="unit"
              value={newProduct.unit}
              onChange={handleAddProductChange}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="kgs">Kgs</MenuItem>
              <MenuItem value="meters">Meters</MenuItem>
              <MenuItem value="pieces">Pieces</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>

            {/* Custom unit field appears only when "other" selected */}
            {newProduct.unit === "other" && (
              <TextField
                label="Enter Unit"
                name="customUnit"
                value={newProduct.customUnit}
                onChange={handleAddProductChange}
                fullWidth
                size="small"
                placeholder="Type your custom unit"
              />
            )}

            <TextField
              label="MRP"
              name="mrp"
              value={newProduct.mrp}
              onChange={handleAddProductChange}
              type="number"
              required
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Description"
              name="description"
              value={newProduct.description}
              onChange={handleAddProductChange}
              multiline
              rows={3}
              fullWidth
              size="small"
              placeholder="Optional"
            />
            <TextField
              label="Specifications"
              name="specifications"
              value={newProduct.specifications}
              onChange={handleAddProductChange}
              multiline
              rows={3}
              fullWidth
              size="small"
              placeholder="Optional"
            />
            <TextField
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewProduct((prev) => ({
                      ...prev,
                      image: reader.result,
                    })); // Base64 string
                  };
                  reader.readAsDataURL(file);
                }
              }}
              fullWidth
              size="small"
            />
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={handleAddProductClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Add Product
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* ---------------------------
          FULL EDIT Dialog (MRP Catalog) - renamed to openFullEdit
         --------------------------- */}
      <Dialog
        open={openFullEdit}
        onClose={handleFullEditClose}
        fullWidth
        maxWidth="sm"
        scroll="body"
      >
        <DialogTitle>
          Edit Product
          <IconButton
            onClick={handleFullEditClose}
            sx={{ position: "absolute", right: 12, top: 12 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 1, sm: 3 }, py: 2 }} dividers>
          <Box
            component="form"
            onSubmit={handleFullEditSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Seller Categories */}
            <TextField
              label="Category"
              name="category"
              value={editProduct.category?.name || ""}
              onChange={handleFullEditChange}
              select
              required
              fullWidth
              size="small"
            >
              {sellerCategories?.map((cat) => (
                <MenuItem
                  key={cat._id}
                  value={cat.name} // display name
                  onClick={
                    () => setEditProduct((prev) => ({ ...prev, category: cat })) // save full object
                  }
                >
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Product Name */}
            <TextField
              label="Product Name"
              name="name"
              value={editProduct.name}
              onChange={handleFullEditChange}
              required
              fullWidth
              size="small"
            />

            {/* Unit Selection */}
            <TextField
              label="Unit"
              name="unit"
              value={editProduct.unit || ""}
              onChange={handleFullEditChange}
              select
              fullWidth
              size="small"
            >
              <MenuItem value="kgs">Kgs</MenuItem>
              <MenuItem value="meters">Meters</MenuItem>
              <MenuItem value="pieces">Pieces</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            {/* Custom unit field appears only when "other" selected */}
            {editProduct.unit === "other" && (
              <TextField
                label="Enter Unit"
                name="customUnit"
                value={editProduct.customUnit}
                onChange={handleFullEditChange}
                fullWidth
                size="small"
                placeholder="Type your custom unit"
                required={editProduct.unit === "other"}
              />
            )}

            <TextField
              label="MRP"
              name="mrp"
              value={editProduct.mrp}
              onChange={handleFullEditChange}
              type="number"
              required
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
            />

            {/* Price (kept in full edit) */}
            <TextField
              label="Price"
              name="price"
              value={editProduct.price}
              onChange={handleFullEditChange}
              type="number"
              required
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Description"
              name="description"
              value={editProduct.description}
              onChange={handleFullEditChange}
              multiline
              rows={3}
              fullWidth
              size="small"
              placeholder="Optional"
            />
            <TextField
              label="Specifications"
              name="specifications"
              value={editProduct.specifications}
              onChange={handleFullEditChange}
              multiline
              rows={3}
              fullWidth
              size="small"
              placeholder="Optional"
            />

            <TextField
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const objectUrl = URL.createObjectURL(file);
                  setEditProduct((prev) => ({
                    ...prev,
                    image: objectUrl,
                    imageFile: file,
                  }));
                } else {
                  setEditProduct((prev) => ({
                    ...prev,
                    image: "",
                    imageFile: null,
                  }));
                }
              }}
              fullWidth
              size="small"
            />

            {/* Preview */}
            {editProduct.image && (
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  overflow: "hidden",
                  mt: 1,
                }}
              >
                <img
                  src={editProduct.image}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            )}
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={handleFullEditClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* ---------------------------
          PRICE ONLY Dialog (Buyer Category)
         --------------------------- */}
      <Dialog
        open={openPriceEdit}
        onClose={handlePriceEditClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          Edit Price
          <IconButton
            onClick={handlePriceEditClose}
            sx={{ position: "absolute", right: 12, top: 12 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Price"
              name="price"
              value={priceEditProduct.price}
              onChange={(e) =>
                setPriceEditProduct((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              fullWidth
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePriceEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handlePriceUpdateSubmit}>
            Update Price
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Buyer Category Dialog */}
      <AddBuyerCategoryDialog
        open={openAddBuyerCategory}
        handleClose={handleAddBuyerCategoryClose}
        newBuyerCategory={newBuyerCategory}
        handleChange={handleAddBuyerCategoryChange}
        handleSubmit={handleAddBuyerCategorySubmit}
      />

      {/* Add Seller Category Dialog */}
      <AddSellerCategoryDialog
        open={openAddProductCategory}
        handleClose={handleAddProductCategoryClose}
        newSellerCategory={newProductCategory}
        handleChange={handleAddProductCategoryChange}
        handleSubmit={handleAddProductCategorySubmit}
      />
      {/* Confirm Dialog for Delete */}
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        content={confirmDialog.content}
        onConfirm={confirmDialog.onConfirm}
        onClose={handleConfirmDialogClose}
      />
    </Box>
  );
}
