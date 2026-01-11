import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Switch,
  Stack,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { toggleActive, addScheme } from "../redux/slices/schemesSlice";

const typeOptions = ["Discount", "Freebie", "Other"];

const typeColor = (type) =>
  type === "Discount" ? "default" : type === "Freebie" ? "primary" : "default";

export default function SchemesAdsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const schemes = useSelector((state) => state.schemes);
  const dispatch = useDispatch();

  // Local state for edit/delete since not in slice
  const [localSchemes, setLocalSchemes] = useState(schemes);

  // Sync localSchemes with redux schemes
  React.useEffect(() => {
    setLocalSchemes(schemes);
  }, [schemes]);

  // New scheme form state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    type: "",
    details: "",
    buyersReached: "",
    active: true,
  });

  // Actions menu logic
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionSchemeId, setActionSchemeId] = useState(null);

  // Edit dialog logic
  const [openEdit, setOpenEdit] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({
      title: "",
      type: "",
      details: "",
      buyersReached: "",
      active: true,
    });
  };

  // Update form field
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit new scheme
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.type) {
      alert("Please fill in the required fields (title and type)");
      return;
    }
    const newScheme = {
      id: localSchemes.length + 1,
      ...form,
      buyersReached: Number(form.buyersReached) || 0,
    };
    dispatch(addScheme(newScheme));
    setLocalSchemes((prev) => [...prev, newScheme]);
    handleClose();
  };

  // Actions menu handlers
  const handleActionsMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActionSchemeId(id);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
    setActionSchemeId(null);
  };

  // Edit logic
  const handleEditOpen = (scheme) => {
    setEditForm(scheme);
    setOpenEdit(true);
    handleActionsMenuClose();
  };
  const handleEditClose = () => {
    setOpenEdit(false);
    setEditForm(null);
  };
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setLocalSchemes((prev) =>
      prev.map((s) =>
        s.id === editForm.id
          ? { ...editForm, buyersReached: Number(editForm.buyersReached) || 0 }
          : s
      )
    );
    handleEditClose();
  };

  // Delete logic
  const handleDeleteScheme = (id) => {
    setLocalSchemes((prev) => prev.filter((s) => s.id !== id));
    handleActionsMenuClose();
  };

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
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            mb: 2,
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Schemes & Ads
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            size="small"
            sx={{
              bgcolor: "#2564eb",
              "&:hover": { bgcolor: "#1846b" },
              fontWeight: 600,
              borderRadius: 2,
              minWidth: 190,
              textTransform: "none",
              fontSize: 15,
              height: 36,
              boxShadow: "none",
            }}
            onClick={handleOpen}
          >
            Create New Scheme/Ad
          </Button>
        </Box>

        {/* Content */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            boxShadow: "0 0 15px rgba(140, 156, 178, 0.25)",
            mb: 3,
          }}
        >
          <Box sx={{ p: 2, pb: 0 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
            >
              Your Schemes
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Manage your promotional offers and advertisements.
            </Typography>
          </Box>

          {!isMobile ? (
            <Box sx={{ overflowX: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f6f8fa" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Buyers Reached
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Active</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {localSchemes?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ fontWeight: "600" }}>{row?.id}</TableCell>
                      <TableCell sx={{ fontWeight: "600" }}>
                        {row?.title}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.type}
                          color={typeColor(row.type)}
                          variant="outlined"
                          size="small"
                          sx={{ fontWeight: 600, fontSize: 13 }}
                        />
                      </TableCell>
                      <TableCell>{row.details}</TableCell>
                      <TableCell>{row.buyersReached}</TableCell>
                      <TableCell>
                        <Switch
                          checked={row.active}
                          onChange={() => dispatch(toggleActive(row.id))}
                          color="primary"
                          size="medium"
                          sx={{
                            "& .MuiSwitch-thumb": {
                              backgroundColor: row.active
                                ? "#2564eb"
                                : "#d3d3d3",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleActionsMenuOpen(e, row.id)}
                          size="small"
                          sx={{ p: 0.5 }}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={actionSchemeId === row.id && Boolean(anchorEl)}
                          onClose={handleActionsMenuClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          PaperProps={{
                            sx: {
                              minWidth: 120,
                              borderRadius: 2,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => handleEditOpen(row)}
                            sx={{
                              fontSize: 15,
                              px: 2,
                              py: 1,
                              minHeight: 36,
                            }}
                          >
                            <ListItemIcon>
                              <EditIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDeleteScheme(row.id)}
                            sx={{
                              fontSize: 15,
                              px: 2,
                              py: 1,
                              minHeight: 36,
                            }}
                          >
                            <ListItemIcon>
                              <DeleteIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          ) : (
            <Box px={3} py={3}>
              <Stack spacing={2}>
                {localSchemes.map((row) => (
                  <Card
                    key={row.id}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography fontWeight={600}>{row.id}</Typography>
                        <IconButton
                          onClick={(e) => handleActionsMenuOpen(e, row.id)}
                          size="small"
                          sx={{ p: 0.5 }}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={actionSchemeId === row.id && Boolean(anchorEl)}
                          onClose={handleActionsMenuClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          PaperProps={{
                            sx: {
                              minWidth: 120,
                              borderRadius: 2,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => handleEditOpen(row)}
                            sx={{
                              fontSize: 15,
                              px: 2,
                              py: 1,
                              minHeight: 36,
                            }}
                          >
                            <ListItemIcon>
                              <EditIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDeleteScheme(row.id)}
                            sx={{
                              fontSize: 15,
                              px: 2,
                              py: 1,
                              minHeight: 36,
                            }}
                          >
                            <ListItemIcon>
                              <DeleteIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                          </MenuItem>
                        </Menu>
                      </Box>
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        {row.title}
                      </Typography>
                      <Chip
                        label={row.type}
                        color={typeColor(row.type)}
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 600, fontSize: 13, mt: 1 }}
                      />
                      <Typography sx={{ mt: 1, mb: 1 }}>
                        {row.details}
                      </Typography>
                      <Stack direction="row" spacing={4} mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Buyers Reached: <strong>{row.buyersReached}</strong>
                        </Typography>
                        <Box
                          sx={{
                            ml: "auto",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            Active
                          </Typography>
                          <Switch
                            checked={row.active}
                            onChange={() => dispatch(toggleActive(row.id))}
                            color="primary"
                            size="medium"
                            sx={{
                              "& .MuiSwitch-thumb": {
                                backgroundColor: row.active
                                  ? "#2564eb"
                                  : "#d3d3d3",
                              },
                            }}
                          />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          )}
        </Paper>

        {/* Add Scheme/Ad Dialog */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Create New Scheme/Ad</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                fullWidth
                select
                required
              >
                {typeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Details"
                name="details"
                value={form.details}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={3}
              />
              <TextField
                label="Buyers Reached"
                name="buyersReached"
                value={form.buyersReached}
                onChange={handleChange}
                fullWidth
                type="number"
                inputProps={{ min: 0 }}
              />
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>Active</Typography>
                <Switch
                  checked={form.active}
                  name="active"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, active: e.target.checked }))
                  }
                  color="primary"
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Scheme Dialog */}
        <Dialog
          open={openEdit}
          onClose={handleEditClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Scheme/Ad</DialogTitle>
          <DialogContent>
            {editForm && (
              <Stack
                spacing={2}
                mt={1}
                component="form"
                onSubmit={handleEditSubmit}
              >
                <TextField
                  label="Title"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Type"
                  name="type"
                  value={editForm.type}
                  onChange={handleEditChange}
                  fullWidth
                  select
                  required
                >
                  {typeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Details"
                  name="details"
                  value={editForm.details}
                  onChange={handleEditChange}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label="Buyers Reached"
                  name="buyersReached"
                  value={editForm.buyersReached}
                  onChange={handleEditChange}
                  fullWidth
                  type="number"
                  inputProps={{ min: 0 }}
                />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography>Active</Typography>
                  <Switch
                    checked={editForm.active}
                    name="active"
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        active: e.target.checked,
                      }))
                    }
                    color="primary"
                  />
                </Stack>
                <DialogActions>
                  <Button onClick={handleEditClose}>Cancel</Button>
                  <Button type="submit" variant="contained">
                    Save Changes
                  </Button>
                </DialogActions>
              </Stack>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}
