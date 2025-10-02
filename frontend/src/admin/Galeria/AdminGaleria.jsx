import { useState, useEffect } from "react";
import { fetchDataFileToken } from "../../utils";
import { ServerUrl } from "../../constants";
import ModalImageViewer from "../../components/ModalImageViewer";

const AdminGaleria = () => {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState('Matte');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [status, setStatus] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    // Загрузка изображения с категорией
    const handleUpload = () => {

        if (!file || !category.trim()) {
            setStatus('Пожалуйста, выберите файл и укажите категорию.');
            return;
        }
        
        const formData = new FormData();
        formData.append('image', file)
        formData.append('category', category.trim())
        fetchDataFileToken(`picture/upload`, 'POST', formData, (response) => {
            if (response?.path) {
                setStatus('Все хорошо отправилось');
                setUploadedImages(prev => [...prev, response.path])
            } else {
                setStatus('Ошибка загрузки: ' + (response.message || 'неизвестная ошибка'));
            }
        }, true );
    };

    const fetchImagesByCategory = (cat) => {
        if (!cat.trim) {
            setUploadedImages([])
            return
        }

        fetchDataFileToken(`picture/${cat}`, 'GET', null, (response) => {
            if (response?.pictures) {
                setUploadedImages(response.pictures)
            } else {
                setUploadedImages([])
                console.log('не удалось получить картинки')
            }
        })
    }

    useEffect(() => {
        fetchImagesByCategory(category)
    }, [category])

    const handleDelete = (imgPath) => {
        if (window.confirm('Вы уверены что хотите удалить эту картинку?')) {
            fetchDataFileToken('picture/delete', 'POST', {
                path: imgPath,
                category
            }, (response) => {
                if (response?.message === 'Файл успешно удален') {
                    setUploadedImages(prev => prev.filter(img => img !== imgPath));
                    setStatus('Картинка успешно удалена');
                } else {
                    setStatus('Ошибка при удалении');
                }
            })
        } else {
            
        }
        
    }

    return (
        <div className="flex">
            <div className="sendPictureForm">
                <h2>Загрузка картинки в категорию</h2>
                <select
                    className="mb-6 p-2 border rounded"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    >
                    <option value="Matte">Матовые</option>
                    <option value="StarrySky">Звездное небо</option>
                    <option value="Print">Принт</option>
                    <option value="lustrzaneSufit">зеркальный потолок</option>
                    <option value="satynowe">сатиновый потолок</option>
                    <option value="oswietleniem">Натяжные потолки с подсветкой</option>
                </select>
                <input onChange={(e) => setFile(e.target.files[0])} type="file" name="Выберите файл" id="" />
                <button onClick={handleUpload} type="submit">Сохранить</button>
                <span>{status}</span>
            </div>
            <div className="deletePictureForm">
                {uploadedImages.map((imgPath, i)=> (
                    <div>
                        <img
                            key={i}
                            src={`${ServerUrl}${imgPath}`}
                            alt={`Категория ${category} #${i}`}
                            className="imgesFromCategory" 
                            onClick={() => setSelectedImage(`${ServerUrl}${imgPath}`)}
                            style={{ cursor: 'pointer'}}/>
                        <button onClick={() => handleDelete(imgPath)}>
                            Удалить
                        </button>
                    </div>
                    
                ))}
                {uploadedImages.length === 0 && <p>Нет картинок для отображения</p>}
            </div>
            <ModalImageViewer
                imageSrc={selectedImage}
                onClose={() => setSelectedImage(null)}/> 

        </div>
    );
};


export default AdminGaleria;