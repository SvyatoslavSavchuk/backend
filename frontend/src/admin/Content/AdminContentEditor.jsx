import { useEffect, useState } from 'react';
import { fetchData, fetchDataToken } from '../../utils';

const AdminContentEditor = () => {
    const [selectedPage, setSelectedPage] = useState('home');
    const [content, setContent] = useState({});
    const [updatedContent, setUpdatedContent] = useState({});
    const [loading, setLoading] = useState(false);

  // Получить текущий контент по выбранной странице
    useEffect(() => {
        fetchData(`pageContent/${selectedPage}`, 'GET', null, (data) => {
            setContent(data);
            setUpdatedContent(data);
    });
  }, [selectedPage]);

  // Обработка изменения полей
    const handleChange = (key, value) => {
        setUpdatedContent(prev => ({
        ...prev,
        [key]: value
        }));
    };

  // Сохранить обновлённый контент
    const handleSave = () => {
        setLoading(true);
        fetchDataToken(`pageContent/${selectedPage}`, 'POST', updatedContent, (response) => {
            console.log('RESPONSE:', response);
        if (response?.content) {
            setContent(updatedContent);
            alert('Контент обновлён!');
        } else {
            alert('Ошибка при сохранении!');
        }
        setLoading(false);
        });
    };

  return (
    <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Редактор контента</h2>

        {/* Выбор страницы */}
        <select
            className="mb-6 p-2 border rounded"
            onChange={(e) => setSelectedPage(e.target.value)}
            value={selectedPage}
            >
            <option value="home">Home</option>
            <option value="kontakt">Kontakt</option>
        </select>

      {/* Редактируемые поля */}
        <div className="space-y-4">
            {updatedContent && Object.entries(updatedContent).map(([key, value]) => (
                <div key={key}>
                    <label className="block mb-1 font-semibold">{key}</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows={3}
                        value={value}
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                </div>
            ))}
        </div>

        <button
            onClick={handleSave}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
        >
            {loading ? 'Сохранение...' : 'Сохранить'}
        </button>
    </div>
  );
};

export default AdminContentEditor;
