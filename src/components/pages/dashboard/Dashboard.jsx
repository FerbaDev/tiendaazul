import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import ProductsList from "./ProductsList";
import { Box, Button, Modal, TextField } from "@mui/material";
import { Link } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [shipmentCost, setShipmentCost] = useState(null);

  useEffect(() => {
    setIsChange(false);
    let prodcutsCollection = collection(db, "products");
    getDocs(prodcutsCollection).then((res) => {
      const newArr = res.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(newArr);
    });
  }, [isChange]);

  const handleClose = () => {
    setOpen(false);
  };

  const updateShipment = async () => {
    updateDoc(doc(db, "shipment", "HxMuNKLUglVoHjAyosML"), {
      cost: shipmentCost,
    });
    setOpen(false);
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingBlock: "30px",
        }}
      >
        <h1>Dashboard de administrador</h1>
        <Link to={"/ordenes"}>
          <Button variant="contained">Ver órdenes</Button>
        </Link>
      </header>
      <Box sx={{ margin: "20px" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Costo de envio
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              label="Costo"
              onChange={(e) => setShipmentCost(+e.target.value)}
            />
            <Button onClick={updateShipment}>Modificar</Button>
          </Box>
        </Modal>
      </Box>
      <Box sx={{ paddingInline: "20px" }}>
        <ProductsList products={products} setIsChange={setIsChange} />
      </Box>
    </div>
  );
};

export default Dashboard;
