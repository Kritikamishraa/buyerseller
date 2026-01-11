import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddBuyerCategoryDialog = ({
  open,
  handleClose,
  newBuyerCategory,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      scroll="body"
    >
      <DialogTitle>
        Buyer Category
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 12, top: 12 }}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 1, sm: 3 }, py: 2 }} dividers>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Buyer Category Name"
            name="name"
            value={newBuyerCategory?.name}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />

          <TextField
            label="Discount (%)"
            name="discount"
            value={newBuyerCategory?.discount}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />

          <DialogActions sx={{ px: 0 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Add Buyer Category
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddBuyerCategoryDialog;
