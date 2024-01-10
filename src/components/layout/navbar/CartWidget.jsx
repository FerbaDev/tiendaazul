import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const CartWidget = () => {
  const { cart } = useContext(CartContext);
  let totalItems = cart.length;
  return (
    <IconButton aria-label="cart" sx={{ color: "aliceblue" }}>
      <StyledBadge badgeContent={totalItems} showZero color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
};
