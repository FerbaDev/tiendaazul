import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } =
    useContext(CartContext);

  let total = getTotalPrice();

  return (
    <div>
      <h1 className="bebas" style={{ paddingLeft: "20px", paddingTop: "10px" }}>
        Carrito de compras
      </h1>
      <Box
        sx={{
          backgroundColor: "#F2B0CF",
          paddingLeft: "20px",
          paddingBlock: "20px",
        }}
      >
        {cart.map((product) => {
          return (
            <div key={product.id} className="card-producto montserrat">
              <img
                src={product.image}
                alt=""
                style={{
                  height: "100px",
                  width: "auto",
                  boxShadow: "1px 1px 4px -2px rgba(0,0,0,0.75)",
                }}
              />
              <div className="card-text">
                <div>
                  <h5>{product.title}</h5>
                  <h5>Talle: {product.talle}</h5>
                  <h5>Cantidad: {product.quantity}</h5>
                </div>
                <button onClick={() => deleteById(product.id)}>Eliminar</button>
              </div>
            </div>
          );
        })}
      </Box>
      {cart.length !== 0 && (
        <button onClick={clearCart} style={{ margin: "20px" }}>
          Limpiar carrito
        </button>
      )}
      {cart.length > 0 && (
        <div className="montserrat summary">
          <div className="summary-data">
            <h3 style={{ paddingBottom: "10px" }}>Datos de la compra:</h3>
            <h5>Total: ${total}</h5>
          </div>
          <h4>El total a pagar es ${total}</h4>
        </div>
      )}

      {cart.length == 0 && (
        <div style={{ paddingLeft: "20px" }}>
          <h3>El carrito está vacío</h3>
          <Link to={"/shop"}>
            <Button variant="contained">Ir a la tienda</Button>
          </Link>
        </div>
      )}
      {cart.length > 0 && (
        <Link
          to="/checkout"
          style={{
            color: "steelblue",
            paddingLeft: "20px",
          }}
        >
          <Button variant="contained" sx={{ marginBottom: "50px" }}>
            Finalizar compra
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Cart;
