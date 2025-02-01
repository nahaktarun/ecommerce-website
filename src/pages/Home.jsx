import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getHomePageData } from '../features/homepageSlice';
import HeroCarousel from '../components/HeroCarousel';

const Home = () => {
  const dispatch = useDispatch();
  const {data: homepageData, loading , error}  = useSelector(
    (state)=> state.homepage
  )

 
  useEffect(()=> {
    dispatch(getHomePageData());
  },[dispatch])

  if(loading){
    return(
      <div className='container mx-auto px-4 mt-4 text-center'>
        <p>Loading homepage data...</p>
      </div>
    )
  }
  if(error){
    return(
      <div className='container mx-auto px-4 mt-4 text-center text-red-500'>
        <p>Error: {error}</p>
      </div>
    )
  }
  const images = homepageData?.carousel || [];

  return (
    <div className="container mx-auto px-4">

      {/* TODO: carousel */}
      <HeroCarousel images={images} />

      {/* Welcome header */}
      <section className='mt-10 text-center'>
        <h1 className='text-3xl md:text-5xl font-bold mb-4'>Welcome to the Store</h1>
        <p className='text-gray-700 mb-6 text-lg max-w-2xl mx-auto'>Discover the latest trends, offers, top-notch products all in one place</p>
        <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition'>Shop now</button>
      </section>
      
      {/* Homework: Featured products */}
    </div>
  );
};

export default Home;
