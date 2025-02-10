import { Button, Typography, Paper } from "@mui/material";
import log from "../debugging/debug";
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  log("hola form home page");
  return (
    <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Our Store
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/products">
        Shop Now
      </Button>
    </Paper>
  );
};

export default Home;
