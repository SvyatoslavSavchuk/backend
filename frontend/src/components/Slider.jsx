import { useState, useEffect, useRef } from "react";
import ModalImageViewer from "./ModalImageViewer";

const Slider = () => {
  const images = [
    "/slide1.jpg",
    "/slide2.jpg",
    "/slide3.jpg",
    "/slide4.jpg",
    "/slide5.jpg",
    "/slide6.jpg",
    "/slide7.jpg",
  ];

  const gap = 10;
  const [itemWidth, setItemWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  // состояние для модалки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  const extendedImages = [...images, ...images];

  // --- измеряем ширину одного слайда ---
  useEffect(() => {
    const updateWidth = () => {
      const firstItem = document.querySelector(".slider-item");
      if (firstItem) {
        setItemWidth(firstItem.getBoundingClientRect().width + gap);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // автопрокрутка
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // бесконечная прокрутка
  useEffect(() => {
    if (index >= images.length) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          setIndex(0);
          containerRef.current.style.transform = `translateX(0px)`;
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.transition = "transform 0.5s ease-in-out";
            }
          }, 50);
        }
      }, 1000);
    }
  }, [index, images.length]);

  // функции для модалки
  const openModal = (idx) => {
    setModalIndex(idx % images.length); // берём реальный индекс
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const prevImage = () => {
    setModalIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextImage = () => {
    setModalIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <div className="slider-container">
        <div
          ref={containerRef}
          className="slider-track"
          style={{ transform: `translateX(-${index * itemWidth}px)` }}
        >
          {extendedImages.map((img, idx) => (
            <div
              key={idx}
              className="slider-item"
              onClick={() => openModal(idx)}
            >
              <img src={img} alt={`slide-${idx}`} />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ModalImageViewer
          images={images}
          currentIndex={modalIndex}
          onClose={closeModal}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
};

export default Slider;
