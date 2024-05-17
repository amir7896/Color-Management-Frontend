import { api } from "../../utils";
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
} from "../apisConstants";

class ProductApi {
  static sharedInstance = new ProductApi();

  constructor() {
    if (ProductApi.sharedInstance != null) {
      return ProductApi.sharedInstance;
    }
  }

  //   Get product list
  async getProducts() {
    try {
      const response = await api.get(GET_PRODUCTS);
      const { success, data } = response.data;
      return success ? data : null;
    } catch (error) {
      return error.response.data;
    }
  }

  //   Get Product detail
  async getProductDetail(id) {
    try {
      const response = await api.get(`${GET_PRODUCT_DETAIL}/${id}`);
      const { success, data } = response.data;
      return success ? data : null;
    } catch (error) {
      return error.response.data;
    }
  }

  // Create Product
  async createProduct(body) {
    try {
      const response = await api.post(CREATE_PRODUCT, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default ProductApi.sharedInstance;
