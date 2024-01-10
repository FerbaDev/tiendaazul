import { Outlet } from "react-router-dom";
import { Footer } from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import { Box } from "@mui/material";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          paddingTop: "36px",
          width: "100%",
          minHeight: "90vh",
        }}
        className="background"
      >
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};
