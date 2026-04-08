import crypto from 'crypto';

// Генерируем 32 байта (256 бит) и переводим в hex
const secret = crypto.randomBytes(32).toString('hex');

console.log('Ваш новый JWT SECRET:');
console.log(secret);