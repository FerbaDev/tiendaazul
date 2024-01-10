import { Box } from "@mui/material";
import { CardMarcas } from "./CardMarcas";
import marcas from "./marcas.json";

export const Marcas = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ paddingBottom: "30px" }}>
        <h2 className="bebas titulos-medios">Productos</h2>
        <p className="montserrat" style={{ fontWeight: "bold" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          enim quo, non facere asperiores expedita quos labore. Vero iste
          repellat recusandae nesciunt eaque, doloribus debitis nostrum
          accusantium perferendis ab suscipit.
        </p>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1em",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          justifyContent: "center",

          alignItems: "center",
        }}
      >
        {marcas.map((marca) => (
          <CardMarcas key={marca.id} {...marca} />
        ))}
      </Box>
    </Box>
  );
};
