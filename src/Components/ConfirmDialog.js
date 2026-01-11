// import React from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   Typography,
// } from "@mui/material";

// const ConfirmDialog = ({ open, title, content, onConfirm, onClose }) => {
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>{title}</DialogTitle>

//       <DialogContent>
//         <Typography>{content}</Typography>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose} color="error">
//           Cancel
//         </Button>

//         <Button onClick={onConfirm} color="primary" variant="contained">
//           Confirm
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ConfirmDialog;

// ConfirmDialog.js - Updated with better styling
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";

const ConfirmDialog = ({ 
  open, 
  title = "Confirm Action", 
  content, 
  onConfirm, 
  onClose,
  confirmText = "Confirm",
  cancelText = "Cancel",
  severity = "warning"
}) => {
  
  const getSeverityColor = () => {
    switch (severity) {
      case "error": return "#d32f2f";
      case "warning": return "#ed6c02";
      case "info": return "#0288d1";
      case "success": return "#2e7d32";
      default: return "#ed6c02";
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        color: getSeverityColor(),
        pb: 1
      }}>
        <WarningAmberIcon />
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1, pb: 2 }}>
        <Typography variant="body1">
          {content}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ minWidth: 80 }}
        >
          {cancelText}
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained"
          sx={{ 
            minWidth: 80,
            bgcolor: getSeverityColor(),
            '&:hover': {
              bgcolor: getSeverityColor(),
              opacity: 0.9
            }
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
