import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BannerSlider({ banners, interval = 5000, autoPlay = true }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      (prevSlide - 1 + banners.length) % banners.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, interval); 

    return () => clearInterval(timer);
  }, [interval, autoPlay, banners.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] lg:h-[700px] overflow-hidden group">
      {/* Banner container */}
      {banners.map((slide, index) => (
        <div 
          key={index}
          className={`${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          } absolute inset-0 transition-opacity duration-1000 ease-in-out`}
        >
          <img
            src={slide.image}
            alt={`Banner slide ${index + 1}`}
            className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-10000 ease-in-out"
          />
          {/* Enhanced gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
          
          {/* Content overlay with enhanced styling */}
          <div className="absolute bottom-24 md:bottom-32 left-6 md:left-20 max-w-xl">
            <div className="space-y-4 bg-black/30 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-xl border border-white/10 animate-fadeIn">
              <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md leading-tight">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90 drop-shadow-lg">
                {slide.description}
              </p>
              <Button 
                onClick={() => navigate('/shop/listing')}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-md shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] font-medium text-md mt-2"
              >
                {slide.buttonText}
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Enhanced navigation controls - initially semi-transparent, more visible on hover */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center px-4 z-20 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="bg-white/70 hover:bg-white border-none shadow-xl rounded-full h-12 w-12 backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="bg-white/70 hover:bg-white border-none shadow-xl rounded-full h-12 w-12 backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Enhanced slide indicators */}
      <div className="absolute bottom-10 inset-x-0 flex justify-center space-x-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? "w-10 bg-primary shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                : "w-3 bg-white/60 hover:bg-white/90"
            } h-3 rounded-full shadow-lg hover:scale-110`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
} 