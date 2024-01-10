import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { CartContext } from "../../../context/CartContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ItemDetail = () => {
  const { id } = useParams();
  const { addToCart, getQuantityById } = useContext(CartContext);
  let quantity = getQuantityById(id);
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(quantity || 1);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    let refCollection = collection(db, "products");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => setProduct({ ...res.data(), id: res.id }))
      .catch((error) => console.log(error));
  }, [id]);

  // SUMAR
  const addOne = () => {
    if (counter < product.stock) {
      setCounter(counter + 1);
    } else {
      alert("stock maximo");
    }
  };

  // RESTAR

  const subOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      alert("no podes agregar menos de 1 elemento al carrito");
    }
  };
  // AGREGAR AL CARRITO

  const onAdd = () => {
    let obj = {
      ...product,
      quantity: counter,
    };
    addToCart(obj);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <h1 className="bebas">Detalle</h1>

      {product && (
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "100%", md: "70%", lg: "30%" },
            }}
          >
            <img
              src={product.image}
              alt=""
              style={{ height: "200px", objectFit: "contain", padding: "4px" }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography>{product.description}</Typography>
              <Typography>Precio: ${product.unit_price}</Typography>
              <Typography>Talle: {product.talle}</Typography>
              {quantity && (
                <Link to={"/cart"}>
                  <Typography
                    sx={{
                      marginTop: "10px",
                      backgroundColor: "rgba(255, 44, 255, 0.2)",
                      padding: "4px",
                      borderRadius: "2px",
                      textAlign: "center",
                    }}
                  >
                    Ya tienes {quantity} en el carrito
                  </Typography>
                </Link>
              )}
              {product?.stock === quantity && (
                <h6>Ya tienes el máximo en el carrito</h6>
              )}
            </CardContent>
            <CardActions>
              {isAdd ? (
                <div style={{ marginBlock: "10px" }}>
                  <Link to={"/cart"}>
                    <Button size="small" color="success" variant="contained">
                      Ir al carrito
                    </Button>
                  </Link>
                  <Link to={"/shop"}>
                    <Button size="small" color="secondary">
                      Seguir comprando
                    </Button>
                  </Link>
                </div>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingInline: "5px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <Button variant="contained" onClick={addOne}>
                      +
                    </Button>
                    <h4>{counter}</h4>
                    <Button variant="contained" onClick={subOne}>
                      -
                    </Button>
                  </div>
                  <Button
                    onClick={(quantity) => {
                      onAdd(quantity);
                      setIsAdd(true);
                    }}
                    size="small"
                    color="secondary"
                    variant="contained"
                    sx={{ marginBlock: "20px" }}
                  >
                    Agregar al carrito
                  </Button>
                  <Link to={-1}>
                    <ArrowBackIcon />
                  </Link>
                </Box>
              )}
            </CardActions>
          </Card>
        </Grid>
      )}
      {/* {quantity && (
        <h6 style={{ marginTop: "10px" }}>
          Ya tienes {quantity} en el carrito
        </h6>
      )} */}
      {/* {product?.stock === quantity && (
        <h6>Ya tienes el máximo en el carrito</h6>
      )} */}
      {/* <div style={{ display: "flex" }}>
        {isAdd ? (
          <div style={{ marginBlock: "10px" }}>
            <Link to={"/cart"}>
              <Button variant="contained" color="success">
                Ir al carrito
              </Button>
            </Link>
            <Link to={"/shop"}>
              <Button variant="contained" color="secondary">
                Seguir comprando
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <Button
              onClick={(quantity) => {
                onAdd(quantity);
                setIsAdd(true);
              }}
              variant="contained"
              color="secondary"
              sx={{ marginBlock: "20px" }}
            >
              Agregar al carrito
            </Button>
          </>
        )}
      </div> */}
    </Box>
  );
};

export default ItemDetail;
