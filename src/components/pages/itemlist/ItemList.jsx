import { Container } from "@mui/material";
import { ItemCard } from "./ItemCard";

export const ItemList = ({ products }) => {
  return (
    <div>
      <Container
        sx={{
          maxWidth: "100%",
          paddingBlock: "20px",
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
          gap: "1.5em",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {products.map((product) => {
          return <ItemCard key={product.id} product={product} />;
        })}
      </Container>
    </div>
  );
};
