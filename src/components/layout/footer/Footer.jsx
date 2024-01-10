import { Link } from "react-router-dom";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "300px",
          backgroundColor: "#1c1c1c",
          color: "whitesmoke",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBlock: "20px",
          }}
        >
          <Typography variant="h5" component="h2" align="center">
            Nos encontrás en:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "2em" }} p={2}>
            <InstagramIcon style={{ fontSize: "3em" }} />

            <FacebookIcon style={{ fontSize: "3em" }} />
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" component="h2" align="center">
            Dirección:
          </Typography>
          <Typography variant="h6" component="h2" align="center">
            Velez Sarsfield 116, Río Tercero, Córdoba.
          </Typography>
        </Box>
      </Box>

      {/* footer talba  */}
      <Box
        sx={{
          backgroundColor: "black",
          width: "100%",
          display: "flex",
          justifyContent: "end",
          p: 2,
          color: "whitesmoke",
        }}
      >
        <p style={{ fontFamily: "monospace" }}>
          Tienda creada por
          <Link to={"https://talba-labs.vercel.app/"} className="talba">
            <span style={{ fontFamily: "monospace" }}> Talba Labs</span>
          </Link>
        </p>
      </Box>
    </>
  );
};
