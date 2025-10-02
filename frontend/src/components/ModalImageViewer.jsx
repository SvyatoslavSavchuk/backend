import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";


const ModalImageViewer = ({ images, onClose, onPrev, onNext, currentIndex }) => {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose, onNext, onPrev]);

    if (!images || images.length === 0 || currentIndex === null) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={images[currentIndex]} alt="full" className="modal-image" />

                <button className="nav-button left" onClick={onPrev} aria-label="Previous">
                    <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                </button>
                <button className="nav-button right" onClick={onNext} aria-label="Next">
                    <FontAwesomeIcon icon={faChevronRight} size="2x" />
                </button>
            </div>

            <button className="close-button" onClick={onClose} aria-label="Close">✖</button>
        </div>
    );
};

export default ModalImageViewer;
