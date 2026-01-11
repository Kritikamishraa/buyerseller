import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export function useSuccessSnackbar() {
  const [snack, setSnack] = useState({ open: false, msg: "" });

  const showSuccess = (msg) => setSnack({ open: true, msg });

  const snackElem = (
    <Snackbar
      open={snack.open}
      autoHideDuration={1800}
      onClose={() => setSnack({ open: false, msg: "" })}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={() => setSnack({ open: false, msg: "" })}
        severity="success"
      >
        {snack.msg}
      </MuiAlert>
    </Snackbar>
  );

  return [showSuccess, snackElem];
}
