import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routerUser from './routes/user.js';
import routerPageContent from './routes/pageContent.js';
import routerPicture from './routes/picture.js';
// import routerEmail from './routes/email.js';
import path from 'path';
// import routerCatalog from './routes/catalog.js';
import { fileURLToPath } from 'url';



dotenv.config();




const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/user', routerUser)
app.use('/api/pageContent', routerPageContent)
app.use('/api/picture', routerPicture)
// app.use('/api/email', routerEmail)
app.use('/uploads', express.static(path.resolve('uploads')));
// app.use('/api/catalogs', routerCatalog);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/public', express.static(path.join(__dirname, 'public')));

const CONNECTION_STRING = process.env.MONGODB_URI;
const DATABASE_NAME = 'sufitymontaz';
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(`${CONNECTION_STRING}/${DATABASE_NAME}`)
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log('DB error:', error));
  console.log('MONGODB_URI:', CONNECTION_STRING);
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Application ended work.');
  process.exit();
});
