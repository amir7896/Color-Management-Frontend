import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProductApi from "../../services/Apis/Product.Api";

const CreateProduct = () => {
  const [colorCount, setColorCount] = useState("");
  const [colors, setColors] = useState([]);
  const [tonesAndShades, setTonesAndShades] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Create product function
  async function createProduct(body) {
    const response = await ProductApi.createProduct(body);
    return response;
  }

  // Create product mutation
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        navigate("/");
      } else {
        toast.error(res.message);
      }
    },
  });

  const handleColorCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setColorCount(event.target.value);
    if (!isNaN(count)) {
      setColors(Array(count).fill(""));
    } else {
      setColors([]);
    }
  };

  const handleColorNameChange = (index, event) => {
    const newColors = [...colors];
    newColors[index] = event.target.value;
    setColors(newColors);
  };

  const handleAddRow = () => {
    setTonesAndShades([
      ...tonesAndShades,
      { tone: "", shades: Array(colors.length).fill("") },
    ]);
  };

  const handleToneChange = (index, event) => {
    const newTonesAndShades = [...tonesAndShades];
    newTonesAndShades[index].tone = event.target.value;
    setTonesAndShades(newTonesAndShades);
  };

  const handleShadeChange = (rowIndex, shadeIndex, event) => {
    const newTonesAndShades = [...tonesAndShades];
    newTonesAndShades[rowIndex].shades[shadeIndex] = event.target.value;
    setTonesAndShades(newTonesAndShades);
  };

  const handleDeleteRow = (index) => {
    const newTonesAndShades = tonesAndShades.filter((_, i) => i !== index);
    setTonesAndShades(newTonesAndShades);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const colorsWithTones = colors.map((color, index) => ({
      name: color,
      tones: tonesAndShades.map((row) => ({
        name: row.tone,
        shade: row.shades[index],
      })),
    }));

    const data = {
      title,
      description,
      colors: colorsWithTones,
    };

    console.log("Data:", data);
    mutation.mutate(data);
  };

  return (
    <Container>
      <Box mt={4}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            {/* Left Grid */}
            <Grid item xs={2} sx={{ mt: 29 }}>
              {tonesAndShades.map((row, rowIndex) => (
                <Box key={rowIndex} mt={2} display="flex" alignItems="center">
                  <TextField
                    label={`Tone ${rowIndex + 1}`}
                    value={row.tone}
                    onChange={(event) => handleToneChange(rowIndex, event)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <IconButton
                    onClick={() => handleDeleteRow(rowIndex)}
                    sx={{ mt: 1.5, color: "#d32f2f" }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              {colors && colors.length > 0 && (
                <Button
                  variant="contained"
                  onClick={handleAddRow}
                  startIcon={<AddCircleOutline />}
                >
                  Addition
                </Button>
              )}
            </Grid>
            {/* Right Grid */}
            <Grid item xs={10}>
              <Box mb={4}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Product Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={4}>
                <TextField
                  label="Number of Colors"
                  value={colorCount}
                  onChange={handleColorCountChange}
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Box>
              {colors.length > 0 && (
                <Box mb={4}>
                  <Grid container spacing={2}>
                    {colors.map((color, index) => (
                      <Grid item xs={3} key={index}>
                        <TextField
                          label={`Color ${index + 1}`}
                          value={color}
                          onChange={(event) =>
                            handleColorNameChange(index, event)
                          }
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              {tonesAndShades.map((row, rowIndex) => (
                <Box key={rowIndex} mb={4}>
                  <Grid container spacing={2}>
                    {row.shades.map((shade, shadeIndex) => (
                      <Grid item xs={3} key={shadeIndex}>
                        <TextField
                          label={`Shade ${shadeIndex + 1}`}
                          value={shade}
                          onChange={(event) =>
                            handleShadeChange(rowIndex, shadeIndex, event)
                          }
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}

              <Box mt={4}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProduct;
