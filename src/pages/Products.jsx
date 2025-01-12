import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
const Products = () => {
const dispatch = useDispatch();
const {items: products,loading, error} = useSelector(
    (state)=> state.products
)

useEffect(()=> {
    dispatch(fetchProducts())
},[dispatch])

if (loading) return <div className="container mx-auto">Loading...</div>
if (error) return <div className="container mx-auto"> Error :{error}</div>

    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Welcome to the store</h1>
        <p className="text-gray-700 mb-6">Product page!</p>
      </div>
    );
  };
  
  export default Products;
  