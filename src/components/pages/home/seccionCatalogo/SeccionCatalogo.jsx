import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const SeccionCatalogo = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#Fafafa",
        paddingBlock: "20px",
        paddingLeft: "20px",
      }}
    >
      <h1 className="bebas">Catálogo</h1>
      <Link to={"/shop"}>
        <Button variant="contained" color="secondary">
          Ver productos
        </Button>
      </Link>
    </Box>
  );
};
