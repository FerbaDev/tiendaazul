import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const Trayectoria = () => {
  return (
    <Box
      sx={{
        paddingInline: "20px",
        paddingBlock: "50px",
        backgroundColor: "#Fefefe",
      }}
    >
      <Card
        sx={{
          maxWidth: "100%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "", md: "", lg: "row" },
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <CardMedia
          sx={{ height: "300px", width: { xs: "100%", lg: "250px" } }}
          image="https://images.pexels.com/photos/19647394/pexels-photo-19647394/free-photo-of-ciudad-camarero-cafeteria-compras.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title=""
        />
        <CardContent sx={{ width: { xs: "100%", sm: "", md: "", lg: "70%" } }}>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ fontFamily: "'Bebas Neue', sans-serif;" }}
          >
            Trayectoria
          </Typography>
          <Typography
            variant="body"
            color="text.secondary"
            sx={{ fontFamily: "'Montserrat', sans-serif;", fontWeight: "bold" }}
            paragraph
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
            cupiditate dolorem nesciunt pariatur optio, quasi minima, sint
            expedita quod iste magni doloribus recusandae, sed odio in a
            perferendis dolore voluptas?.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
