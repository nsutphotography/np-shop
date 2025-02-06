import { Button, Typography, Paper } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Our Store
      </Typography>
      <Button variant="contained" color="primary">
        Shop Now
      </Button>
    </Paper>
  );
};

export default Home;
