import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import PictureCategory from '../models/picture.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

const uploadTempPath = path.resolve('uploads/_temp');
if (!fs.existsSync(uploadTempPath)) {
  fs.mkdirSync(uploadTempPath, { recursive: true });
}

// Настройка multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadTempPath); // всё сначала во временную
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// 📤 Загрузка файла с категорией
router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { category } = req.body;

    if (!req.file || !category) {
      return res.status(400).json({ message: 'Файл или категория не указаны' });
    }

    const categoryDir = path.resolve('uploads', category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    const newPath = path.join(categoryDir, req.file.filename);
    fs.renameSync(req.file.path, newPath);

    const relativePath = `/uploads/${category}/${req.file.filename}`;

    // Добавить путь в массив картинок категории
    const result = await PictureCategory.findOneAndUpdate(
      { category },
      { $push: { pictures: relativePath } },
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: 'Файл загружен и добавлен в категорию',
      path: relativePath,
      pictures: result.pictures
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при сохранении изображения' });
  }
});

function getLabel(key) {
    const map = {
        Matte: 'Matowe sufity napinane',
        StarrySky: 'Gwiaździste niebo',
        Print: 'Sufity napinane z nadrukiem',
        lustrzaneSufit: 'Błyszczące (lustrzane) sufity napinane',
        satynowe: 'Sufity napinane satynowe',
        oswietleniem: 'Oświetlenie LED na sufitach napinanych',
    };
    return map[key] || key;
}

router.get('/categories', async (req, res) => {
    try {
        const categories = await PictureCategory.find({}, 'category'); 
        res.json(categories.map(cat => ({
            category: cat.category,
            label: getLabel(cat.category)
        })))
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
        res.status(500).json({ message: 'Ошибка при получении категории', error })
    }
})

// 📥 Получить все картинки категории
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;

    const found = await PictureCategory.findOne({ category });
    if (!found) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    res.json({ pictures: found.pictures });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении' });
  }
});

router.post('/delete', verifyToken, async (req,res) => {
    try {
      const { category, path: imagePath } = req.body;
      if (!req.body || !req.body.path) {
          return res.status(400).json({message: 'Путь к файлу не указан'});
      }
      const fullPath = path.resolve(`.${imagePath}`);
      if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
      } else {
          return console.warn('Файл не найден:', fullPath)
      }
      const result = await PictureCategory.findOneAndUpdate(
          { category },
          { $pull: { pictures: imagePath} },
          { new: true } 
      )

      res.json({
          message: 'Файл успешно удален',
          pictures: result.pictures || []
      })
    } catch (err) {
        console.error('Ошибка при удалении', err);
        res.status(500).json({ message: 'Ошибка при удалении файла' });
    }
})



export default router;
