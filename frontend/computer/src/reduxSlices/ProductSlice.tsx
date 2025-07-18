import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface ProductType {
  id: string | number | null;
  name: string;
  description: string;
  price: number;
}
interface initialStateType {
  products: ProductType[];
}
const initialState: initialStateType = {
  products: [],
};
const ProductSlice = createSlice({
  name: " ProductSlice",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
  },
});
export const { setProducts } = ProductSlice.actions;

export default ProductSlice.reducer;
