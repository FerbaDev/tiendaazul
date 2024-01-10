import { Paper } from "@mui/material";

export const Item = ({ item }) => {
  return (
    <Paper>
      <img src={item.image} alt="" style={{ width: "100%", height: "auto" }} />
    </Paper>
  );
};
