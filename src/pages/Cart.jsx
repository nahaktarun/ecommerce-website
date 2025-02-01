import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCart, removeItemFromCart} from '../features/cartSlice'
import { Link } from "react-router-dom";
const Cartpage = () => {

    const dispatch = useDispatch()
    const {items, loading, error} = useSelector((state) => state.cart);
    const {user} = useSelector((state)=> state.auth) || {}

    useEffect(()=> {
        if(user?._id){
            dispatch(fetchCart(user._id))
        }
    },[dispatch, user])


    const handleRemove = (productId ) => {
        if(user?._id){
            console.log(productId)
            dispatch(removeItemFromCart({userId: user._id, productId}))
        }
    };


    if (loading)  return <div className="container mx-auto py-10">Loading cart...</div>
    if (error)  return <div className="container mx-auto py-10">Error: {error}</div>


    const total = items.reduce(
        (sum, item)=> sum + (item.product?.price ?? 0) * item.quantity , 0
    )

    return (<div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold mb-6">Your cart</h2>
        {items.length === 0 ? (
            <div className="text-center"> 
                <p className="text-gray-600 text-lg">Your cart is empty </p>
                <Link to="/products" className="text-blue-500 underline">Continue Shopping</Link>
            </div>
        ): (<>
        <div className="">
            {items.map((cartItem)=> {
                const {product, quantity} = cartItem;
                return (
                    <div key={product._id} className="bg-white p-4 shadow rounded">
                        <img  src={product.image}
                        alt={product.title}
                        className="h-40 object-cover mb-2 rounded"
                        />
                        <h3 className="text-lg font-bold">{product.title}</h3>
                        <p className="text-gray-600">{product.price}</p>
                        <p className="text-gray-500 mb-4">Quantity: {quantity}</p>
                        <button 
                        onClick={()=> handleRemove(product._id)}
                         className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Remove</button>
                    </div>
                )
            })}
        </div>
        <div className="mt-6 bg-gray-100 p-4 rounded shadow text-right">
            <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
            <Link to="/checkout" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">Proceed to checkout</Link>
        </div>
        </>)}

    </div>)
}

export default Cartpage;