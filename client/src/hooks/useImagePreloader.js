import { useEffect, useState } from 'react';

/**
 * Custom hook to preload images
 * @param {Array} imageArray - Array of image URLs or objects with image property
 * @returns {Object} - Loading status and any errors
 */
export const useImagePreloader = (imageArray) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [preloadErrors, setPreloadErrors] = useState([]);

  useEffect(() => {
    if (!imageArray || imageArray.length === 0) {
      setImagesPreloaded(true);
      return;
    }

    let loadedCount = 0;
    const errorIndexes = [];
    
    const checkAllLoaded = () => {
      if (loadedCount === imageArray.length) {
        setImagesPreloaded(true);
        setPreloadErrors(errorIndexes);
      }
    };
    
    imageArray.forEach((item, index) => {
      const img = new Image();
      
      img.onload = () => {
        loadedCount++;
        checkAllLoaded();
      };
      
      img.onerror = () => {
        loadedCount++;
        errorIndexes.push(index);
        checkAllLoaded();
      };
      
      // Handle both array of strings and array of objects with image property
      const imgSrc = typeof item === 'string' ? item : item.image;
      img.src = imgSrc;
    });
    
    // Set to true after a timeout as a fallback
    const timeoutId = setTimeout(() => {
      if (!imagesPreloaded) {
        setImagesPreloaded(true);
      }
    }, 5000); // 5 seconds timeout
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [imageArray]);
  
  return { imagesPreloaded, preloadErrors };
}; 