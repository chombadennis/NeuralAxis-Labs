import dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Manually read and parse the JSON file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();
const imagesDir = path.join(__dirname, 'public', 'images');

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  files.forEach(file => {
    const filePath = path.join(imagesDir, file);

    bucket.upload(filePath, {
      destination: file,
      public: true,
    }, (err, file) => {
      if (err) {
        return console.error('Error uploading file:', err);
      }

      console.log(`Successfully uploaded ${file.name}.`);
    });
  });
});
