// components/ScrollToSectionButton.jsx
import React, { useState, useEffect } from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToSectionButton({
  targetId = null, // null means scroll to top
  tooltip = "",
  showAfter = 200,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      setVisible(window.scrollY > showAfter);
    };
    window.addEventListener("scroll", handleScrollVisibility);
    return () => window.removeEventListener("scroll", handleScrollVisibility);
  }, [showAfter]);

  const handleScroll = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // No targetId → scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Zoom in={visible}>
      <Tooltip
        title={tooltip || (targetId ? `Scroll to ${targetId}` : "Scroll to top")}
        placement="left"
      >
        <Fab
          aria-label="scroll"
          onClick={handleScroll}
          sx={{
            position: "fixed",
            bottom: { xs: 10, sm: 15 },
            right: { xs: 20, sm: 30 },
            zIndex: 1200,
            width: 56,
            height: 56,
            background: "#388e3c", // Green color
            boxShadow: 4,
            "&:hover": { background: "#388e3c" }, // Darker green on hover
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: 32, color: "#fff" }} />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
