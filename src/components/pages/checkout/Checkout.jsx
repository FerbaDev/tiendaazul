import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CompraRealizada } from "./CompraRealizada";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const publickey = "APP_USR-ff96fe80-6866-4888-847e-c69250754d38";

  initMercadoPago(publickey, {
    locale: "es-AR",
  });
  const [preferenceId, setPreferenceId] = useState(null);

  const [orderId, setOrderId] = useState(null);

  const [isClicked, setIsClicked] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("status"); // approved --- reject

  useEffect(() => {
    // ACA ES DONDE GUARDAMOS LA ORDEN EN FIREBASE
    // CONDICIONADO A QUE YA ESTE EL PAGO REALIZADO
    let order = JSON.parse(localStorage.getItem("order"));
    if (paramValue === "approved") {
      let ordersCollection = collection(db, "orders");
      addDoc(ordersCollection, { ...order, date: serverTimestamp() }).then(
        (res) => {
          setOrderId(res.id);
        }
      );

      order.items.forEach((elemento) => {
        updateDoc(doc(db, "products", elemento.id), {
          stock: elemento.stock - elemento.quantity,
        });
      });

      localStorage.removeItem("order");
      clearCart();
    }
  }, [paramValue]);

  let total = getTotalPrice();

  const createPreference = async () => {
    const newArray = cart.map((product) => {
      return {
        id: product.id,
        title: product.title,
        currency_id: "USD",
        quantity: product.quantity,
        unit_price: product.unit_price,
        picture_url: product.image,
        description: product.description,
      };
    });
    const newPayer = (userData) => {
      return {
        name: userData.nombre,
        surname: userData.apellido,
        email: userData.email,
        phone: userData.phone,
        address: {
          street_name: userData.calle,
          street_number: userData.num,
          zip_code: userData.cp,
        },
      };
    };
    try {
      let response = await axios.post(
        "https://backend-maria.vercel.app/create_preference",
        {
          items: newArray,
          payer: newPayer,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async (userData) => {
    setIsClicked(true);
    let order = {
      nombre: userData.nombre,
      apellido: userData.apellido,
      email: userData.email,
      calle: userData.calle,
      num: userData.num,
      cp: userData.cp,
      phone: userData.phone,
      items: cart,
      total: total,
    };
    console.log(userData.phone);
    localStorage.setItem("order", JSON.stringify(order));
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  // const handleChange = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  // };

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      calle: "",
      num: "",
      cp: "",
      phone: "",
    },
    onSubmit: handleBuy,
    validateOnChange: false,
    validationSchema: Yup.object({
      nombre: Yup.string()
        .typeError("Ingrese un nombre válido")
        .required("Campo obligatorio")
        .min(3, "Ingrese un nombre válido"),
      apellido: Yup.string()
        .typeError("Ingrese un apellido válido")
        .required("Campo obligatorio")
        .min(2, "Ingrese información válida"),
      calle: Yup.string().required("Campo obligatorio"),
      num: Yup.number().required("Campo obligatorio"),
      cp: Yup.number()
        .typeError("ingrese un CP válido")
        .required("Campo obligatorio")
        .min(4, "Ingrese un CP válido"),
      phone: Yup.number()
        .typeError("Ingrese un teléfono válido")
        .required("Campo obligatorio")
        .min(10, "Ingrese un teléfono válido"),
      email: Yup.string()
        .typeError("Ingrese un email válido")
        .required("Campo obligatorio")
        .email("Ingrese un email válido"),
    }),
  });

  return (
    <div style={{ padding: "20px" }}>
      {!orderId ? (
        <div>
          <h2 className="bebas" style={{ fontSize: "1.8em" }}>
            Complete los datos para el envío
          </h2>
          <form onSubmit={handleSubmit}>
            <TextField
              name="nombre"
              variant="outlined"
              label="Nombre"
              onChange={handleChange}
              error={errors.nombre ? true : false}
              helperText={errors.nombre}
            />
            <TextField
              name="apellido"
              variant="outlined"
              label="Apellido"
              onChange={handleChange}
              error={errors.apellido ? true : false}
              helperText={errors.apellido}
            />
            <TextField
              name="calle"
              variant="outlined"
              label="Calle"
              onChange={handleChange}
              error={errors.calle ? true : false}
              helperText={errors.calle}
            />
            <TextField
              name="num"
              variant="outlined"
              label="Número"
              onChange={handleChange}
              error={errors.num ? true : false}
              helperText={errors.num}
            />

            <TextField
              name="cp"
              variant="outlined"
              label="Código postal"
              onChange={handleChange}
              error={errors.cp ? true : false}
              helperText={errors.cp}
            />
            <TextField
              name="phone"
              variant="outlined"
              label="Teléfono"
              onChange={handleChange}
              error={errors.phone ? true : false}
              helperText={errors.phone}
            />
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
            />
            {isClicked ? (
              !preferenceId ? (
                <h2>espere...</h2>
              ) : null
            ) : (
              <Button
                variant="contained"
                // onClick={handleBuy}
                sx={{ marginBlock: "20px" }}
                type="submit"
              >
                Seleccione metodo de pago
              </Button>
            )}
          </form>
        </div>
      ) : (
        <CompraRealizada order={orderId} />
      )}

      {preferenceId && (
        <Wallet initialization={{ preferenceId, redirectMode: "self" }} />
      )}
    </div>
  );
};

export default Checkout;
