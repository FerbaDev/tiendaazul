import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <Box
      sx={{
        height: { xs: "95vh", md: "100vh", lg: "92vh" },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        // marginTop: { lg: "8px" },
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "3.5em",
          textAlign: "center",
          backgroundColor: "#1c1c1c",
          width: "auto",
          paddingInline: "20px",
        }}
        className="bebas"
      >
        Tienda Azul
      </h1>
      <Link to={"/shop"}>
        <Button variant="contained" color="secondary">
          Ver tienda
        </Button>
      </Link>
    </Box>
  );
};
