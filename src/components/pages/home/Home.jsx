import { Box } from "@mui/material";

import { Trayectoria } from "./trayectoria/Trayectoria";
import { Marcas } from "./marcas/Marcas";
import { SeccionCatalogo } from "./seccionCatalogo/SeccionCatalogo";
import { Hero } from "./Hero";

const Home = () => {
  return (
    <Box>
      <Hero />
      <Trayectoria />
      <Marcas />
      <SeccionCatalogo />
    </Box>
  );
};

export default Home;
