import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddCircleOutlined } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

import ProductApi from "../../services/Apis/Product.Api";

const ProductList = () => {
  const navigate = useNavigate();

  const { data: products } = useQuery({
    queryKey: ["GET_PRODUCTS"],
    queryFn: async () => {
      const response = await ProductApi.getProducts();
      return response;
    },
  });

  //  create product navigate
  const handleCreate = () => {
    navigate("/create");
  };

  // Product detail navigate
  const handleDetail = (id) => {
    navigate(`product/${id}`);
  };

  return (
    <Grid container spacing={2} alignItems="flex-start">
      {/* Create button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
          startIcon={<AddCircleOutlined />}
          onClick={handleCreate}
        >
          Create Product
        </Button>
      </Grid>
      {/* Card Grid */}
      {products &&
        products.map((dt) => (
          <Grid item xs={12} md={3} sm={4} key={dt?._id}>
            <Card
              sx={{ boxShadow: 3, cursor: "pointer" }}
              onClick={() => handleDetail(dt?._id)}
            >
              <CardContent>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {dt?.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {dt?.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default ProductList;
