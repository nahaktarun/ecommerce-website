import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
const HeroCarousel = ({images = []}) => {

    const [currentImage, setCurrentImage] = useState(0);

    const totalImages = images.length;

    const nextImage =()=>{
        setCurrentImage((prev)=> (prev + 1) % totalImages)
    }
    // 3+1 = 4 % 5 => 4

    const prevImage = ()=> {
        setCurrentImage((prev)=> (prev - 1 + totalImages) % totalImages)
    }

    // 3 -> 3-1 = 2 + 5 = 7 % 5 = 2

    if(!totalImages){
        return(
            <div className="relative bg-gray-900 md:h-[600px] flex items-center justify-center">
                <p className="text-white text-xl">No Carousel images found.</p>
            </div>
        )
    }


    return (
        <div className="relative bg-gray-900 h-[450px] md:h-[600px]">
            <div className="absolute inset-0 overflow-hidden">
                {images.map((image, index)=> (
                    <img 
                    className={`absolute inset-0 h-full w-full object-cover 
                        transition-opacity 
                        duration-700 ${index === currentImage ? 'opacity-100': 'opacity-0'}`}
                    key={image.imageUrl || index }
                    src={image.imageUrl}
                    alt={image.alt}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
            </div>

            <button onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-color z-10"
                >
                <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button  className= "absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-color z-10"onClick={nextImage}>
                <ChevronRight className="h-6 w-6 text-white" />
            </button>
        </div>
    )

}

export default HeroCarousel