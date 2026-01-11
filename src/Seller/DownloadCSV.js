import React, { useState } from "react";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ConfirmDialog from "../Components/ConfirmDialog";

const DownloadCSV = () => {
  const [open, setOpen] = useState(false);

  const downloadCSV = () => {
    setOpen(true);
  };

  const handleDownload = () => {
    setOpen(false);
    const csvFilePath = "/downloaded_sample.xlsx";

    fetch(csvFilePath)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "downloaded_sample.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        alert("Failed to download the CSV file");
      });
  };

  return (
    <>
      <Button
        onClick={downloadCSV}
        color="primary"
        variant="contained"
        startIcon={<DownloadIcon />}
        sx={{
          mb: 2,
          borderRadius: "5px",
          textTransform: "none",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Download Sample XLSX
      </Button>

      <ConfirmDialog
        open={open}
        title="Download Sample XLSX"
        content="Would you like to download the sample XLSX file?"
        onConfirm={handleDownload}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default DownloadCSV;
