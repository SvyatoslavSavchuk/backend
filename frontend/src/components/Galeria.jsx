import { useState, useEffect } from 'react';

import { fetchDataToken } from '../utils'
import { ServerUrl } from '../constants';
import ModalImageViewer from './ModalImageViewer';
import Loader from './Loader';


const Galeria = () => {
    const [categories, setCategories] = useState([]);
    const [imagesByCategory, setImagesByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewer, setViewer] = useState({images: null, index: null})


    useEffect(() => {
        fetchDataToken('picture/categories', 'GET', null, (res) => {
            if (Array.isArray(res)) {
                setCategories(res);
            } else {
                setError('Не удалось загрузить категории');
            }
        });
    }, []);

    useEffect(() => {
        const loadImages = async () => {
            const allImages = {};

            for (const { category } of categories) {
                await new Promise((resolve) => {
                fetchDataToken(`picture/${category}`, 'GET', null, (res) => {
                    if (res?.pictures) {
                    allImages[category] = res.pictures;
                    } else {
                    allImages[category] = [];
                    }
                    resolve();
                });
                });
            }

            setImagesByCategory(allImages);
            setLoading(false);
        };

        if (categories.length > 0) {
            loadImages();
        }
    }, [categories]);

    const openViewer = (category, index) => {
        const imgs = (imagesByCategory[category] || []).map(p => `${ServerUrl}${p}`);
        setViewer({images: imgs, index})
    }

    const closeViewer = () => setViewer({ images: null, index: null });

    const prevImage = () =>
        setViewer(v => {
            if (!v.images) return v;
            const nextIndex = (v.index - 1 + v.images.length) % v.images.length;
            return { ...v, index: nextIndex };
        });

    const nextImage = () =>
        setViewer(v => {
            if (!v.images) return v;
            const nextIndex = (v.index + 1) % v.images.length;
            return { ...v, index: nextIndex };
        });

  if (loading) return <Loader/>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;


    return (
        <div className='container-gallery pd-t-5p'>
            {categories.map(({ category, label }) => (
                <div className='padd-b-3p' key={category}>
                    <h2 className='text-centre-mobile '>
                        {label}
                    </h2>
                    <div className='gallery'>
                        {imagesByCategory[category]?.length > 0 ? (
                        imagesByCategory[category].map((imgPath, index) => (
                            <img
                                key={index}
                                src={`${ServerUrl}${imgPath}`}
                                alt={`${label} #${index}`}
                                className='image-in-gallery'
                                onClick={() => openViewer(category, index)}
                            />
                        ))
                        ) : (
                            <p>Brak obrazów w tej kategorii</p>
                        )}
                    </div>
                </div>
            ))}
            <ModalImageViewer
                images={viewer.images}
                currentIndex={viewer.index}
                onClose={closeViewer}
                onPrev={prevImage}
                onNext={nextImage}/>
        </div>
    )
}

export default Galeria;