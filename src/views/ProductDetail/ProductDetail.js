import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductApi from "../../services/Apis/Product.Api";

const ProductDetail = () => {
  const { id } = useParams();

  const { data: products } = useQuery({
    queryKey: ["GET_PRODUCTS", id],
    queryFn: async () => {
      const response = await ProductApi.getProductDetail(id);
      return response;
    },
    enabled: !!id,
  });
  console.log("Product detail", products);

  return <div>ProductDetail</div>;
};

export default ProductDetail;
