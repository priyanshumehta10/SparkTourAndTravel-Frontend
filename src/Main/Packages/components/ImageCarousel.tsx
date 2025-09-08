// -------------------- Carousel Component --------------------
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ImageCarousel = ({ images, title }: { images: any[]; title: string }) => {
  const [index, setIndex] = useState(0);

  const prevImage = () =>
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // -------------------- Auto Slide --------------------
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000); // ⏱ 3 seconds per slide

      return () => clearInterval(interval);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <motion.img
        key={index}
        src={images[index]?.url}
        alt={title}
        className="w-full h-48 object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 text-gray-700 hover:bg-opacity-100"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 text-gray-700 hover:bg-opacity-100"
          >
            ▶
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
