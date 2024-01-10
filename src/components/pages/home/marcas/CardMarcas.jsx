import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export const CardMarcas = ({ nombre, descripcion, img, path }) => {
  return (
    <Card sx={{ maxWidth: 345, height: "232px" }}>
      <Link to={path}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={img}
            alt={nombre}
            style={{ objectFit: "contain", padding: "20px" }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {descripcion}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
