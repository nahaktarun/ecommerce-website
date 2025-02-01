import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { addItemToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
const Products = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const {items: products,loading, error} = useSelector(
    (state)=> state.products
)


const {token} = useSelector((state)=> state.auth)

useEffect(()=> {
    dispatch(fetchProducts())
},[dispatch])


const handleAddToCart = (product) => {
  if (!token){
    navigate("/login");
    return
  }

  dispatch(addItemToCart({ productId: product._id, quantity: 1 }));
}



if (loading) return <div className="container mx-auto">Loading...</div>
if (error) return <div className="container mx-auto"> Error :{error}</div>

    return (
      <div className="container mx-auto">
       <h2 className="text-2xl font-bold mb-4">Products</h2>
       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 shadow rounded flex flex-col">
            <img src={product.image} alt={product.title} className="h-48 object-cover mb-4 rounded"/>
            <h3 className="text-lg font-bold">{product.title}</h3>
            <p className="text-gray-600 my-2">${product.price}</p>
            <p className="text-gray-500 mb-2">{product.description}</p>
            <button 
            onClick={()=>handleAddToCart(product)}
            className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add to cart</button>
          </div>
        ))}
       </div>
      </div>
    );
  };
  
  export default Products;
  